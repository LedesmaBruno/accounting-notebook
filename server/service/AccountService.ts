import {TransactionBody} from "../../model/TransactionBody";

export class AccountService {

    private SINGLE_ACCONUT_BALANCE = 0;

    public async getAccountBalance(): Promise<number> {
        return Promise.resolve(this.SINGLE_ACCONUT_BALANCE);
    }

    private async deposit(amount: number): Promise<void> {
        this.SINGLE_ACCONUT_BALANCE += amount;
        return Promise.resolve();
    }

    private async extract(amount: number): Promise<void> {
        if (amount > this.SINGLE_ACCONUT_BALANCE) {
            return Promise.reject({status: 400, reason: "Insufficient fonds."});
        } else {
            this.SINGLE_ACCONUT_BALANCE -= amount;
            return Promise.resolve();
        }
    }

    public async commitTransaction(tx: TransactionBody): Promise<void> {
        if (tx.amount < 0) {
            return Promise.reject({status: 400, reason: "Bad Amount Request."});
        }
        if (tx.type === "credit") {
            return await this.deposit(tx.amount);
        } else {
            return await this.extract(tx.amount);
        }
    }
}
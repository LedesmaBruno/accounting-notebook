import {Transaction} from "../../model/Transaction";
import {TransactionBody} from "../../model/TransactionBody";
import Mutex from "async-mutex/lib/Mutex";
import ServiceProvider from "./ServiceProvider";

export class TransactionService {
    private mutex: Mutex = new Mutex();
    private transactions: Transaction[] = [];

    public async getTransactions(): Promise<Transaction[]> {
        return Promise.resolve(this.transactions);
    }

    public async commitTransaction(tx: TransactionBody): Promise<Transaction> {
        if (tx.amount < 0) {
            Promise.reject({status: 400, reason: "Bad Transaction Request"});
        }

        return this.mutex.acquire().then(async (release) => {
            let newTx: Transaction = {
                id: String(this.transactions.length + 1),
                type: tx.type,
                amount: tx.amount,
                effectiveDate: new Date()
            };

            return ServiceProvider.getInstance().accountService.commitTransaction(tx)
                .then(() => this.transactions.push(newTx))
                .then(() => Promise.resolve(newTx))
                .finally(() => release());
        });
    }

    public async getTransactionById(id: string): Promise<Transaction> {
        let transaction = this.transactions.find(tx => tx.id === id);
        if (transaction) {
            return Promise.resolve(transaction);
        }
        return Promise.reject({status: 404, reason: "Transaction not found."});
    }
}
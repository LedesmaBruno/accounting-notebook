import {AccountService} from "./AccountService";
import {TransactionService} from "./TransactionService";

export default class ServiceProvider {
    private static instance: ServiceProvider;
    public readonly accountService: AccountService;
    public readonly transactionService: TransactionService;

    private constructor() {
        this.accountService = new AccountService();
        this.transactionService = new TransactionService();
    }

    public static getInstance(): ServiceProvider {
        if (!this.instance) {
            this.instance = new ServiceProvider();
        }
        return this.instance;
    }
}
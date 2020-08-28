export interface TransactionBody {
    type: 'credit' | 'debit';
    amount: number;
}
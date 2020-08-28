export interface Transaction {
    id: string;
    type: 'credit' | 'debit';
    amount: number;
    effectiveDate: Date;
}
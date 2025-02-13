interface UserDetails {
    id: string;
    name: string;
    created_at: string;
    transactions: Transaction[];
}

interface Transaction {
    id: string;
    total_amount: number;
    created_at: string;
    detail: TransactionDetail[];
}

interface TransactionDetail {
    id: string;
    product_id: string;
    quantity: number;
    total_amount: number;
}
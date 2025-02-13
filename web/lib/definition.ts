export interface CustomerResponse {
    message:      string;
    data:         Customer[];
    total_data:   number;
    current_page: number;
    total_pages:  number;
    per_page:     number;
}

export interface Customer {
    id: string;
    name: string;
    total_transactions: string;
    total_amount: string;
    level_customer: string;
    favourite_menu: string | null;
}
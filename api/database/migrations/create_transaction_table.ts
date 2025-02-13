import db from "../client";

const createTransactionsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS transactions (
            id TEXT PRIMARY KEY,
            customer_id TEXT REFERENCES customer(id),
            total_amount NUMERIC(10, 0) NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_transactions_customer_id ON transactions (customer_id);
    `;

    try {
        await db.query(query);
        console.log('Transaction table created successfully');
    } catch (error) {
        console.error('Error creating transaction table:', error);
    }
}

const dropTransactionsTable = async () => {
    const query = `DROP TABLE IF EXISTS transactions;`;

    try {
        await db.query(query);
        console.log('Transaction table dropped successfully');
    } catch (error) {
        console.error('Error dropping transaction table:', error);
    }
}

export const up = async () => await createTransactionsTable();
export const down = async () => await dropTransactionsTable();
import db from "../client";

const createDetailTransactionTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS transaction_detail (
            id TEXT PRIMARY KEY,
            transaction_id TEXT REFERENCES transactions(id),
            product_id TEXT REFERENCES products(id),
            quantity INTEGER NOT NULL,
            total_amount NUMERIC(10, 0) NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX idx_transaction_detail_transaction_id ON transaction_detail (transaction_id);
    `

    try {
        await db.query(query);
        console.log('Transaction detail table created successfully');
    } catch (error) {
        console.error('Error creating transaction detail table:', error);
    }   
}

const dropDetailTransactionTable = async () => {
    const query = `DROP TABLE IF EXISTS transaction_detail;`;

    try {
        await db.query(query);
        console.log('Transaction detail table dropped successfully');
    } catch (error) {
        console.error('Error dropping transaction detail table:', error);
    }
}

export const up = async () => await createDetailTransactionTable();
export const down = async () => await dropDetailTransactionTable();
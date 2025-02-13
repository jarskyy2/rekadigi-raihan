import db from "../client";

const createCustomerTable = async () => {
    const query =  `
        CREATE TABLE IF NOT EXISTS customer (
            id TEXT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            deleted_at TEXT
        );
    `;

    try {
        await db.query(query);
        console.log('Customer table created successfully');
    } catch (error) {
        console.error('Error creating customer table:', error);
    }
}

const dropCustomerTable = async () => {
    const query = `DROP TABLE IF EXISTS customer;`;
    try {
        await db.query(query);
        console.log('Customer table dropped successfully');
    } catch (error) {
        console.error('Error dropping customer table:', error);
    }
}

export const up = async () => await createCustomerTable();
export const down = async () => await dropCustomerTable();

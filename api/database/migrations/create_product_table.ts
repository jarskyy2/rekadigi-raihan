import db from "../client";

const createProductTabel = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price NUMERIC(10, 0) NOT NULL
        );
    `;

    try {
        await db.query(query);
        console.log('Product table created successfully');
    } catch (error) {
        console.error('Error creating product table:', error);
    }      
}

const dropProductTable = async () => {
    const query = `DROP TABLE IF EXISTS products;`;
    try {
        await db.query(query);
        console.log('Product table dropped successfully');
    } catch (error) {
        console.error('Error dropping product table:', error);
    }
}

export const up = async () => await createProductTabel();
export const down = async () => await dropProductTable();

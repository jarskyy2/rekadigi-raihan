import db from "../../database/client";

export const getTransactionById = async (id: string) => {
    const {rows} = await db.query("SELECT * FROM transactions WHERE id = $1", [id]);

    return rows;
}

export const getTransactionByCustomerId = async (id: string) => {
    const {rows} = await db.query("SELECT id, total_amount, created_at FROM transactions WHERE customer_id = $1", [id]);

    return rows;
}

export const getTransactionDetailById = async (id: string) => {
    const {rows} = await db.query("SELECT * FROM transaction_detail WHERE transaction_id = $1", [id]);

    return rows;
}

export const getProductById = async (id: string) => {
    const {rows} = await db.query("SELECT * FROM products WHERE id = $1", [id]);

    return rows;
}

export const updateDetailTransaction = async (transactionId: string, productId: string, productPrice: number, quantity: number) => {
    await db.query("UPDATE transaction_detail SET quantity = $1, total_amount = $2 WHERE transaction_id = $3 AND product_id = $4", [quantity, quantity*productPrice, transactionId, productId]);

    const sumTotal = await db.query("SELECT SUM(total_amount) FROM transaction_detail WHERE transaction_id = $1", [transactionId]);

    await db.query("UPDATE transactions SET total_amount = $1 WHERE id = $2", [sumTotal.rows[0].sum, transactionId]);
}


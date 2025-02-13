import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import db from "../../database/client";
import { getProductById, getTransactionById, getTransactionDetailById, updateDetailTransaction } from "../lib/action";



export const postNewTransaction = async (req: Request, res: Response) => {
    try {
        const { customer_id, total_amount, items } = req.body;
        const transaction = await db.query(
            "INSERT INTO transactions (id, customer_id, total_amount, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [uuid(), customer_id, total_amount]
        );
        const transactionId = transaction.rows[0].id;

        const transactionDetails = [];

        for (const item of items) {
            const { product_id, quantity, total_amount } = item;

            const product = await getProductById(product_id);
            if (product.length === 0) {
                res.status(400).json({ error: `Product with ID ${product_id} not found` });
            }

            const detail = await db.query(
                "INSERT INTO transaction_detail (id, transaction_id, product_id, quantity, total_amount, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
                [uuid(), transactionId, product_id, quantity, total_amount]
            );

            transactionDetails.push(detail.rows[0]);
        }

        res.status(201).json({
            message: "Transaction created successfully",
            transaction: transaction.rows[0],
            transactionDetails
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};


export const updateTransactionProduct = async (req: Request, res: Response) => {
    try{
        const {transaction_id, product_id, quantity} = req.body;

        const checkTransaction = await getTransactionById(transaction_id);
        if(checkTransaction.length === 0) res.status(404).json({error: "Transaction not found"})

        const checkProduct: any = await getProductById(product_id);
        if(checkProduct.length === 0) res.status(404).json({error: "Product not found"})

        const checkTransactionDetail = await getTransactionDetailById(transaction_id);
        if(checkTransactionDetail.length === 0) res.status(404).json({error: "Transaction detail not found"})

        await updateDetailTransaction(transaction_id, product_id, Number(checkProduct[0].price), quantity);

        res.status(200).json({message: "Transaction detail updated successfully"})

    }catch(error){
        res.status(500).json({error: "Internal server error"})
    }
}
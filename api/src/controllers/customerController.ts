import { Request, Response } from "express";
import db from "../../database/client";
import { getTransactionByCustomerId } from "../lib/action";
import { v4 as uuid } from "uuid";


export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await db.query("SELECT id, name, created_at FROM customer WHERE deleted_at IS NULL");
        res.status(200).json(customers.rows);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCustomersWithDetail = async (req: Request, res: Response) => {
    try {
        const page: number = parseInt(req.query.page as string) || 1;
        const limit: number = parseInt(req.query.limit as string) || 10;
        const offset: number = (page - 1) * limit;

        const customerLevelsQuery = `
                SELECT 
                    c.id,
                    c.name,
                    COUNT(t.id) AS total_transactions,
                    COALESCE(SUM(t.total_amount), 0) AS total_amount,
                    CASE 
                        WHEN COALESCE(SUM(t.total_amount), 0) <= 150000 THEN 'warga'
                        WHEN COALESCE(SUM(t.total_amount), 0) <= 700000 THEN 'juragan'
                        WHEN COALESCE(SUM(t.total_amount), 0) <= 1500000 THEN 'konglomerat'
                        ELSE 'sultan'
                    END AS level_customer
                FROM customer c 
                LEFT JOIN transactions t ON c.id = t.customer_id
                WHERE c.deleted_at IS NULL
                GROUP BY c.id, c.name
                ORDER BY total_amount DESC
                LIMIT $1 OFFSET $2;
        `;

        const favouriteMenuPerCustomerQuery = `
            SELECT DISTINCT ON (t.customer_id)
                t.customer_id,
                m.id AS menu_id,
                m.name AS menu_name,
                SUM(td.quantity) AS total_quantity
            FROM transactions t
            JOIN transaction_detail td ON t.id = td.transaction_id
            JOIN products m ON td.product_id = m.id
            GROUP BY t.customer_id, m.id, m.name
            ORDER BY t.customer_id, total_quantity DESC;
        `

        const totalCountQuery = `
            SELECT COUNT(*) AS total FROM customer WHERE deleted_at IS NULL;
        `;

        const { rows: customers } = await db.query(customerLevelsQuery, [limit, offset]);
        const {rows: favouriteMenus} = await db.query(favouriteMenuPerCustomerQuery);
        const { rows: totalRows } = await db.query(totalCountQuery);

        const totalData: number = parseInt(totalRows[0].total, 10);
        const totalPages: number = Math.ceil(totalData / limit);

        const finalResult = customers.map((customer) => {
            const favouriteMenu = favouriteMenus.find((menu) => menu.customer_id === customer.id);
            return {
                ...customer,
                level_customer: customer.level_customer,
                favourite_menu: favouriteMenu ? favouriteMenu.menu_name : null,
            };
        })

        res.status(200).json({
            message: "Data get successfully", 
            data: finalResult, 
            total_data: totalData,  
            current_page: page,
            total_pages: totalPages,
            per_page: limit
        });

    } catch (error) {
        console.error("Error fetching customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getDetailCustomerWithId = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const checkCustomer = await db.query("SELECT id,name FROM customer WHERE id = $1", [id]);

        if (checkCustomer.rows.length === 0) {
            res.status(404).json({ error: "User not found" });
        }

        const transactions = await getTransactionByCustomerId(id);

        const detail_transaction = await db.query(`
            SELECT 
                id, 
                product_id, 
                transaction_id,
                quantity, 
                total_amount 
            FROM transaction_detail 
            WHERE transaction_id IN (SELECT id FROM transactions WHERE customer_id = $1)`, [id]);

            // merge
            const result = transactions.map((transaction) => {
                const detail: TransactionDetail[] = detail_transaction.rows.filter((detail) => detail.transaction_id === transaction.id).map((detail) => ({
                    id: detail.id,
                    product_id: detail.product_id,
                    quantity: detail.quantity,
                    total_amount: detail.total_amount
                }));
                return {
                    ...transaction,
                    detail,
                };
            });

            const dataWithCustomer = {
                name: checkCustomer.rows[0].name,
                id: checkCustomer.rows[0].id,
                transactions: result,
            }

        res.status(200).json(dataWithCustomer);
    }catch(error){
        res.status(500).json({ error: "Internal server error" });
    }
}

export const postCustomer = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const newCust = await db.query("INSERT INTO customer (id, name) VALUES ($1, $2) RETURNING *", [uuid(), name]);
        res.status(200).json({ message: "Customer added successfully",  customer: newCust.rows[0] });
    } catch (error) {
        console.error("Error adding customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await db.query("UPDATE customer SET deleted_at = NOW() WHERE id = $1", [id]);
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
import db from "../client";
import { v4 as uuid } from "uuid";

const seed = async () => {
    try {
        const dummyCustomers = new Array(5).fill(0).map((_, index) => ({
            id: uuid(),
            name: `Customer ${index + 1}`,
        }));

        const dummyProducts = new Array(5).fill(0).map((_, index) => ({
            id: uuid(),
            name: `Product ${index + 1}`,
            price: Math.floor(Math.random() * 5000),
        }))

        const dummyTransactions = new Array(5).fill(0).map(() => ({
            id: uuid(),
            customer_id: dummyCustomers[Math.floor(Math.random() * dummyCustomers.length)].id,
            total_amount: 0,
            created_at: new Date().toISOString()
        }));

        const dummyDetailTransactions = dummyTransactions.flatMap(transaction => {
            const details = [];
            const numItems = Math.floor(Math.random() * 3) + 1;

            for (let i = 0; i < numItems; i++) {
                let quantityval = Math.floor(Math.random() * 5) + 1;
                let randomProduct = dummyProducts[Math.floor(Math.random() * dummyProducts.length)];
                
                details.push({
                    id: uuid(),
                    transaction_id: transaction.id,
                    product_id: randomProduct.id,
                    quantity: quantityval,
                    total_amount: quantityval * randomProduct.price,
                    created_at: new Date().toISOString()
                });
            }

            return details;
        });

        dummyTransactions.forEach(transaction => {
            transaction.total_amount = dummyDetailTransactions
                .filter(detail => detail.transaction_id === transaction.id)
                .reduce((sum, detail) => sum + detail.total_amount, 0);
        });
        

        const seedUser = async () => {
            let values = dummyCustomers.map((data, index) => {
                return `('${data.id}', '${data.name}')`
            }).join(',')

            const query = `
                INSERT INTO customer (id, name) VALUES
                ${values}
            `

            await db.query(query)
        }

        const seedProduct = async () => {
            let values = dummyProducts.map((data, index) => {
                return `('${data.id}', '${data.name}', '${data.price}')`
            }).join(',')

            const query = `
                INSERT INTO products (id, name, price) VALUES
                ${values}
            `

            await db.query(query)
        }

        const seedTransaction = async () => {
            let values = dummyTransactions.map((data, index) => {
                return `('${data.id}', '${data.customer_id}', '${data.total_amount}', '${data.created_at}')`
            }).join(',')

            const query = `
                INSERT INTO transactions (id, customer_id, total_amount, created_at) VALUES
                ${values}
            `

            await db.query(query)
        }

        const seedDetailTransaction = async () => {
            let values = dummyDetailTransactions.map((data, index) => {
                return `('${data.id}', '${data.transaction_id}', '${data.product_id}', '${data.quantity}', '${data.total_amount}', '${data.created_at}')`
            }).join(',')

            const query = `
                INSERT INTO transaction_detail (id, transaction_id, product_id, quantity, total_amount, created_at) VALUES
                ${values}
            `

            await db.query(query)
        }

        await seedUser();
        await seedProduct();
        await seedTransaction();
        await seedDetailTransaction();

        console.log(`✅ Seeding completed successfully`);
    } catch (e) {
        console.error("❌ Seeding error:", e);
    }
};

seed();
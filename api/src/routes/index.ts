import { Router } from "express";
import { deleteCustomer, getCustomers, getCustomersWithDetail, getDetailCustomerWithId, postCustomer } from "../controllers/customerController";
import { postNewTransaction, updateTransactionProduct } from "../controllers/transactionController";

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/customers', getCustomers);
router.get('/customers-with-detail', getCustomersWithDetail);
router.get('/customers/:id', getDetailCustomerWithId);
router.post('/customers', postCustomer);
router.delete('/customers/:id', deleteCustomer);

router.post('/add-transaction', postNewTransaction);
router.post('/transactions', updateTransactionProduct);

export default router;
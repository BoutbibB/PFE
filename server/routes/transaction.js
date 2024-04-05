import express from "express";
const router = express.Router();
import { createTransaction, getAllTransactions, getAllTransactionsAll, getLatestTransactions, getTransactionById, updateTransaction, deleteTransaction } from '../controllers/TransactionController.js';

router.post('/', createTransaction);
router.get('/', getAllTransactions);
router.get('/all', getAllTransactionsAll);
router.get('/latest', getLatestTransactions);
router.get('/:id', getTransactionById);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export {router};

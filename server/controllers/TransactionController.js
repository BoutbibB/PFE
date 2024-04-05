import { Transaction } from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; 
      const limit = 10; 
      const skip = (page - 1) * limit;
  
      const totalCount = await Transaction.countDocuments();
      const totalPages = Math.ceil(totalCount / limit);
  
      const transactions = await Transaction.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
  
      res.status(200).json({
        transactions,
        totalPages
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const getAllTransactionsAll = async (req, res) => {
    try {
      const transactions = await Transaction.find().sort({ createdAt: -1 });
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getLatestTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(5);
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

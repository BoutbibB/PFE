import express from "express";
const router = express.Router();
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/CategoryController.js';

router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export {router};

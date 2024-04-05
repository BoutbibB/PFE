import express from "express";
const router = express.Router();
import { createDailyStat, getAllDailyStats, getDailyStatByDs, updateDailyStat, deleteDailyStat } from '../controllers/DailyStatsController.js';

router.post('/', createDailyStat);
router.get('/', getAllDailyStats);
router.get('/:id', getDailyStatByDs);
router.put('/:id', updateDailyStat);
router.delete('/:id', deleteDailyStat);

export {router};

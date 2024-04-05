import { DailyStats } from "../models/DailyStats.js"

export const createDailyStat = async (req, res) => {
    try {
      const newDailyStat = await DailyStats.create(req.body);
      res.status(201).json(newDailyStat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const getAllDailyStats = async (req, res) => {
    try {
      const dailyStats = await DailyStats.find();
      res.status(200).json(dailyStats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getDailyStatByDs = async (req, res) => {
    try {
      const dailyStat = await DailyStats.findOne({ ds: req.params.ds });
      if (!dailyStat) {
        return res.status(404).json({ message: 'Daily stat not found' });
      }
      res.status(200).json(dailyStat);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateDailyStat = async (req, res) => {
    try {
      const updatedDailyStat = await DailyStats.findOneAndUpdate({ ds: req.params.ds }, req.body, { new: true });
      if (!updatedDailyStat) {
        return res.status(404).json({ message: 'Daily stat not found' });
      }
      res.status(200).json(updatedDailyStat);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  export const deleteDailyStat = async (req, res) => {
    try {
      const deletedDailyStat = await DailyStats.findOneAndDelete({ ds: req.params.ds });
      if (!deletedDailyStat) {
        return res.status(404).json({ message: 'Daily stat not found' });
      }
      res.status(200).json({ message: 'Daily stat deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
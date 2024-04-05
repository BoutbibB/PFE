import mongoose from "mongoose";

const dailyStatsSchema = new mongoose.Schema({
  ds: {
    type: String,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
});

export const DailyStats = mongoose.model('dailyStats', dailyStatsSchema);

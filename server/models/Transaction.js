import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  }
  
});

transactionSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Transaction.countDocuments();
    this.id = count + 1;
  }
  next();
});

export const Transaction = mongoose.model('transaction', transactionSchema);

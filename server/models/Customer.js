import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  tel: String,
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

customerSchema.pre('save', async function(next) {
    if (!this.id) {
      const count = await Customer.countDocuments();
      this.id = count + 1;
    }
    next();
});

export const Customer = mongoose.model('customer', customerSchema);

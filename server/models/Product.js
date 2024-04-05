import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, 'Discount cannot be negative']
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

productSchema.pre('save', async function(next) {
  if (!this.id) {
    const count = await Product.countDocuments();
    this.id = count + 1;
  }
  next();
});


export const Product = mongoose.model('Product', productSchema);

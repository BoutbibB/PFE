import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as authRoute } from "./routes/auth.js"
import { router as userRoutes } from "./routes/user.js";
import { router as productRoutes } from "./routes/product.js";
import { router as categoryRoutes } from "./routes/category.js";
import { router as customerRoutes } from "./routes/customer.js";
import { router as transactionRoutes } from "./routes/transaction.js";
import { router as dailyStatsRoutes } from "./routes/dailyStats.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env. MONGODB_URI;
const app = express();

app.use(cors());

//Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(cookieParser());
app.use(bodyParser.json());

//Routes
app.use("/", authRoute);
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes);
app.use("/customer", customerRoutes);
app.use("/transaction", transactionRoutes);
app.use("/dailystats", dailyStatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/', 'index.html'));
});

//Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

import mongoose from "mongoose";

// Connect to MongoDB
export const conn = mongoose.connect('mongodb://127.0.0.1:27017/DashboardApp', {
})
.then(() => {console.log('Connected to MongoDB')
})
.catch(err => console.error('Error connecting to MongoDB:', err));
export const PORT = process.env.PORT || 5000;
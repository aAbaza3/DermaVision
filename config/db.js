// import mongoose = require('mongoose')

// const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL);
//     console.log('Connected to DB...', conn.connection.host);  // Success log
//   } catch (error) {
//     console.error('Error connecting to DB:', error);  // Error log
//     process.exit(1);  // Exit process if DB connection fails
//   }
// };

// module.exports = connectDb;

import mongoose from "mongoose";
import 'dotenv/config';

const connectDb = async () => {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI)
    console.log(`Database connected successfully`);
};

export default connectDb;
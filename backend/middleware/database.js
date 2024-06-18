// const mongoose  = require('mongoose');
// const MONGO_URL = process.env.MONGO_URL

// const connectDB = async (err) => {
//   if (err) return 0;
//   await mongoose.connect(MONGO_URL);
//   console.log(`MongoDB connection established`);
//   return 1;
// };
// module.exports = { connectDB };


const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

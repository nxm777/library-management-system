const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to database');
    } catch (err) {
      console.error('Database connection error:', err.message);
      process.exit(1);
    }
  };

  module.exports = connectToDatabase;
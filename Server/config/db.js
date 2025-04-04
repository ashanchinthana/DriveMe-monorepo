const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MongoDB URI:', process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // More detailed error logging
    if (error.name === 'MongoServerSelectionError') {
      console.error('Could not connect to any MongoDB server');
    } else if (error.name === 'MongoNetworkError') {
      console.error('Network error prevented connection to MongoDB');
    } else if (error.message.includes('bad auth')) {
      console.error('Authentication failed. Please check your username and password');
    }
    process.exit(1);
  }
};

module.exports = connectDB;
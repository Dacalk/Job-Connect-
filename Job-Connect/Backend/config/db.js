const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error('MongoDB connection error: MONGO_URI environment variable is not defined');
      console.log('Please create a .env file with MONGO_URI=mongodb://localhost:27017/job-connect');
      process.exit(1);
    }

    // The options object is no longer needed in recent versions of Mongoose
    await mongoose.connect(mongoUri);
    console.log('Successfully connected to MongoDB.');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Exit process with failure if we can't connect
    process.exit(1);
  }
};

module.exports = connectDB;
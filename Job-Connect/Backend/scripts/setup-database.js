const mongoose = require('mongoose');
const User = require('../models/User');
const Job = require('../models/Job');

// Database setup script
const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jobconnect';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Create indexes for better performance
    console.log('Creating database indexes...');
    
    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ username: 1 }, { unique: true });
    await User.collection.createIndex({ role: 1 });
    await User.collection.createIndex({ isActive: 1 });
    
    // Job indexes
    await Job.collection.createIndex({ postedBy: 1 });
    await Job.collection.createIndex({ isActive: 1 });
    await Job.collection.createIndex({ title: 'text', description: 'text', company: 'text' });
    await Job.collection.createIndex({ location: 1 });
    await Job.collection.createIndex({ createdAt: -1 });
    
    console.log('Database indexes created successfully');
    
    // Check if admin user exists, create if not
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      console.log('Creating admin user...');
      const adminUser = new User({
        username: 'admin',
        email: 'admin@jobconnect.com',
        password: 'admin123456', // In production, this should be hashed
        role: 'admin',
        isActive: true
      });
      await adminUser.save();
      console.log('Admin user created: admin@jobconnect.com / admin123456');
    } else {
      console.log('Admin user already exists');
    }

    console.log('Database setup completed successfully');
    
  } catch (error) {
    console.error('Database setup failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run setup if this script is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;

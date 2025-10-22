const mongoose = require('mongoose');
const User = require('../models/User');

// Database migration script to add new fields to existing users
const migrateDatabase = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/jobconnect';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Get all users
    const users = await User.find({});
    console.log(`Found ${users.length} users to migrate`);

    let updatedCount = 0;

    for (const user of users) {
      const updateData = {};
      let needsUpdate = false;

      // Add phone field if not exists
      if (user.phone === undefined) {
        updateData.phone = '';
        needsUpdate = true;
      }

      // Add location field if not exists
      if (user.location === undefined) {
        updateData.location = '';
        needsUpdate = true;
      }

      // Add profileLogo field if not exists
      if (user.profileLogo === undefined) {
        updateData.profileLogo = '';
        needsUpdate = true;
      }

      // For employers, ensure company fields exist
      if (user.role === 'employer') {
        if (user.companyName === undefined) {
          updateData.companyName = user.username || '';
          needsUpdate = true;
        }
        if (user.companySize === undefined) {
          updateData.companySize = '';
          needsUpdate = true;
        }
        if (user.industry === undefined) {
          updateData.industry = '';
          needsUpdate = true;
        }
        if (user.website === undefined) {
          updateData.website = '';
          needsUpdate = true;
        }
        if (user.foundedYear === undefined) {
          updateData.foundedYear = null;
          needsUpdate = true;
        }
        if (user.companyDescription === undefined) {
          updateData.companyDescription = '';
          needsUpdate = true;
        }
      }

      // Update user if needed
      if (needsUpdate) {
        await User.findByIdAndUpdate(user._id, updateData);
        updatedCount++;
        console.log(`Updated user: ${user.username} (${user.role})`);
      }
    }

    console.log(`Migration completed. Updated ${updatedCount} users.`);
    
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
};

// Run migration if this script is executed directly
if (require.main === module) {
  migrateDatabase();
}

module.exports = migrateDatabase;

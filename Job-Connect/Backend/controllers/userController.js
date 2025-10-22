// Controller functions for user management

const User = require('../models/User');
const Job = require('../models/Job');
const path = require('path');

// Get user profile (requires authentication)
exports.getProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile (requires authentication)
exports.updateProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { 
            name,
            username, 
            email, 
            bio, 
            skills, 
            experience, 
            education,
            phone,
            location,
            // Employer-specific fields
            companyName,
            companySize,
            industry,
            website,
            foundedYear,
            companyDescription
        } = req.body;
        
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user fields
        if (name !== undefined) user.username = name; // Store name as username for consistency
        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (phone !== undefined) user.phone = phone;
        if (location !== undefined) user.location = location;
        if (bio !== undefined) user.bio = bio;
        if (skills !== undefined) user.skills = skills;
        if (experience !== undefined) user.experience = experience;
        if (education !== undefined) user.education = education;
        
        // Update employer-specific fields
        if (companyName !== undefined) user.companyName = companyName;
        if (companySize !== undefined) user.companySize = companySize;
        if (industry !== undefined) user.industry = industry;
        if (website !== undefined) user.website = website;
        if (foundedYear !== undefined) user.foundedYear = foundedYear;
        if (companyDescription !== undefined) user.companyDescription = companyDescription;

        await user.save();
        
        const updatedUser = await User.findById(user._id).select('-password');
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user dashboard data
exports.getDashboard = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const user = await User.findById(req.user.id).select('-password');
        const postedJobs = await Job.countDocuments({ postedBy: req.user.id });
        const activeJobs = await Job.countDocuments({ postedBy: req.user.id, isActive: true });
        
        res.status(200).json({
            user,
            stats: {
                postedJobs,
                activeJobs
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users (admin only - for future admin functionality)
exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const users = await User.find({})
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);
        
        res.status(200).json({
            users,
            pagination: {
                currentPage: page,
                totalPages,
                totalUsers,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user account
exports.deleteAccount = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        // Delete all jobs posted by this user
        await Job.deleteMany({ postedBy: req.user.id });
        
        // Delete user account
        await User.findByIdAndDelete(req.user.id);
        
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Upload cover letter
exports.uploadCoverLetter = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Check if file is PDF
        const fileExt = path.extname(req.file.originalname).toLowerCase();
        if (fileExt !== '.pdf') {
            return res.status(400).json({ message: 'Only PDF files are allowed for cover letters' });
        }

        // Update user's cover letter URL
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Construct the file URL
        const fileUrl = `/uploads/${req.file.filename}`;
        user.coverLetterUrl = fileUrl;
        await user.save();

        res.status(200).json({
            message: 'Cover letter uploaded successfully',
            coverLetterUrl: fileUrl
        });
    } catch (error) {
        console.error('Error uploading cover letter:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

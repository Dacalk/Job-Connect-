// Controller functions for authentication

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password, role, phone, location } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with role
        const user = new User({ 
            username, 
            email, 
            password: hashedPassword,
            phone: phone || '',
            location: location || '',
            role: role || 'job_seeker' // Default to job_seeker if no role provided
        });
        await user.save();

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set JWT as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // send over HTTPS only in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        res.status(201).json({
            message: 'User created successfully',
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login existing user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        // Set JWT as HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, username: user.username, email: user.email, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { username, bio, skills, experience, education } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields if provided
        if (username) user.username = username;
        if (bio !== undefined) user.bio = bio;
        if (skills) user.skills = skills;
        if (experience) user.experience = experience;
        if (education) user.education = education;

        await user.save();
        
        res.status(200).json({
            message: 'Profile updated successfully',
            user: { id: user._id, username: user.username, email: user.email, role: user.role, bio: user.bio, skills: user.skills, experience: user.experience, education: user.education }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout user (clear cookie)
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    res.status(200).json({ message: 'Logged out successfully' });
};


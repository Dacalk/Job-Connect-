const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address.'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
  },
  phone: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters.'],
  },
  coverLetterUrl: {
    type: String,
    trim: true,
  },
  skills: [{
    type: String,
    trim: true,
  }],
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    field: String,
    startDate: Date,
    endDate: Date,
    current: { type: Boolean, default: false },
  }],
  role: {
    type: String,
    enum: ['job_seeker', 'employer', 'admin'],
    default: 'job_seeker',
  },
  // Employer-specific fields
  companyName: {
    type: String,
    trim: true,
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
  },
  industry: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  foundedYear: {
    type: Number,
    min: 1800,
    max: new Date().getFullYear(),
  },
  companyDescription: {
    type: String,
    maxlength: [1000, 'Company description cannot exceed 1000 characters.'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

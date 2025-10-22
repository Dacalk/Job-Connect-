const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Shortlisted', 'Rejected', 'Hired'],
    default: 'Pending'
  },
  resumeUrl: {
    type: String,
    trim: true
  },
  coverLetterUrl: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
applicationSchema.index({ jobId: 1, userId: 1 });
applicationSchema.index({ userId: 1 });
applicationSchema.index({ status: 1 });

module.exports = mongoose.model('Application', applicationSchema);
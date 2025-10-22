const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description.'],
  },
  company: {
    type: String,
    required: [true, 'Please provide a company name.'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide the job location.'],
  },
  salary: {
    type: Number,
  },
  // Reference to the user who posted the job
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  applicationDeadline: {
    type: Date,
  },
  applicantsCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;

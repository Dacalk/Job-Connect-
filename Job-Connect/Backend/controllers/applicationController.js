const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const Notification = require('../models/Notification');
const path = require('path');
const fs = require('fs');

// Submit application with file uploads
exports.submitApplication = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { jobId, availability, salary, message } = req.body;
        
        if (!jobId) {
            return res.status(400).json({ message: 'Job ID is required' });
        }

        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if user already applied for this job
        const existingApplication = await Application.findOne({
            jobId: jobId,
            userId: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        // Handle file uploads
        let resumeUrl = '';
        let coverLetterUrl = '';

        if (req.files) {
            // Handle resume file
            const resumeFile = req.files.find(file => file.fieldname === 'resume');
            if (resumeFile) {
                const resumeFileName = `resume-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(resumeFile.originalname)}`;
                const resumePath = path.join(__dirname, '../uploads', resumeFileName);
                
                fs.writeFileSync(resumePath, resumeFile.buffer);
                resumeUrl = `/uploads/${resumeFileName}`;
            }

            // Handle cover letter file
            const coverLetterFile = req.files.find(file => file.fieldname === 'coverLetter');
            if (coverLetterFile) {
                const coverLetterFileName = `coverletter-${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(coverLetterFile.originalname)}`;
                const coverLetterPath = path.join(__dirname, '../uploads', coverLetterFileName);
                
                fs.writeFileSync(coverLetterPath, coverLetterFile.buffer);
                coverLetterUrl = `/uploads/${coverLetterFileName}`;
            }
        }

        // Create application
        const application = new Application({
            jobId: jobId,
            userId: req.user.id,
            status: 'Pending',
            resumeUrl: resumeUrl,
            coverLetterUrl: coverLetterUrl,
            availability: availability || '',
            salary: salary || '',
            message: message || ''
        });

        await application.save();

        res.status(201).json({
            message: 'Application submitted successfully',
            application: application
        });

    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get applications for a specific job (employer view)
exports.getJobApplications = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { jobId } = req.params;
        
        // Check if job exists and belongs to the user
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        if (job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const applications = await Application.find({ jobId: jobId })
            .populate('userId', 'name email phone skills experience')
            .sort({ createdAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get user's applications (job seeker view)
exports.getUserApplications = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const applications = await Application.find({ userId: req.user.id })
            .populate('jobId', 'title company location type salary')
            .sort({ createdAt: -1 });

        res.status(200).json(applications);

    } catch (error) {
        console.error('Error fetching user applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { applicationId } = req.params;
        const { status, notes } = req.body;

        const application = await Application.findById(applicationId)
            .populate('jobId', 'postedBy title');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if the user is the job poster
        if (application.jobId.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        application.status = status;
        if (notes) {
            application.notes = notes;
        }

        await application.save();

        // Create notification for the applicant
        const job = await Job.findById(application.jobId);
        const applicant = await User.findById(application.userId);
        
        let notificationTitle = '';
        let notificationMessage = '';
        
        switch (status) {
            case 'Shortlisted':
                notificationTitle = 'Application Shortlisted';
                notificationMessage = `Your application for ${job.title} at ${job.company} has been shortlisted!`;
                break;
            case 'Rejected':
                notificationTitle = 'Application Update';
                notificationMessage = `Your application for ${job.title} at ${job.company} was not selected for this position.`;
                break;
            case 'Hired':
                notificationTitle = 'Congratulations!';
                notificationMessage = `Great news! You've been selected for ${job.title} at ${job.company}!`;
                break;
        }

        if (notificationTitle && notificationMessage) {
            await Notification.create({
                userId: application.userId,
                title: notificationTitle,
                message: notificationMessage,
                type: `application_${status.toLowerCase()}`,
                applicationId: application._id,
                jobId: application.jobId,
                companyName: job.company,
                jobTitle: job.title
            });
        }

        res.status(200).json({
            message: 'Application status updated successfully',
            application: application
        });

    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete application
exports.deleteApplication = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { applicationId } = req.params;

        const application = await Application.findById(applicationId)
            .populate('jobId', 'postedBy');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if the user is the job poster or the applicant
        if (application.jobId.postedBy.toString() !== req.user.id && 
            application.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Delete associated files
        if (application.resumeUrl) {
            const resumePath = path.join(__dirname, '..', application.resumeUrl);
            if (fs.existsSync(resumePath)) {
                fs.unlinkSync(resumePath);
            }
        }

        if (application.coverLetterUrl) {
            const coverLetterPath = path.join(__dirname, '..', application.coverLetterUrl);
            if (fs.existsSync(coverLetterPath)) {
                fs.unlinkSync(coverLetterPath);
            }
        }

        await Application.findByIdAndDelete(applicationId);

        res.status(200).json({ message: 'Application deleted successfully' });

    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Mark application as viewed
exports.markApplicationAsViewed = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const { applicationId } = req.params;

        const application = await Application.findById(applicationId)
            .populate('jobId', 'postedBy title company');

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        // Check if the user is the job poster
        if (application.jobId.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Create notification for the applicant
        await Notification.create({
            userId: application.userId,
            title: 'Application Viewed',
            message: `Your application for ${application.jobId.title} at ${application.jobId.company} has been viewed by the employer.`,
            type: 'application_viewed',
            applicationId: application._id,
            jobId: application.jobId._id,
            companyName: application.jobId.company,
            jobTitle: application.jobId.title
        });

        res.status(200).json({ message: 'Application marked as viewed' });

    } catch (error) {
        console.error('Error marking application as viewed:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
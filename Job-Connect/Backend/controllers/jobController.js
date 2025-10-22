// Controller functions for job management

const Job = require('../models/Job');
const { authenticateToken } = require('../middleware/middleware');

// Get all jobs with pagination and filtering
exports.getAllJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build filter object
        let filter = { isActive: true };
        
        if (req.query.company) {
            filter.company = { $regex: req.query.company, $options: 'i' };
        }
        if (req.query.location) {
            filter.location = { $regex: req.query.location, $options: 'i' };
        }
        if (req.query.minSalary) {
            filter.salary = { $gte: parseInt(req.query.minSalary) };
        }
        if (req.query.maxSalary) {
            filter.salary = { ...filter.salary, $lte: parseInt(req.query.maxSalary) };
        }
        
        const jobs = await Job.find(filter)
            .populate('postedBy', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const totalJobs = await Job.countDocuments(filter);
        const totalPages = Math.ceil(totalJobs / limit);
        
        res.status(200).json({
            jobs,
            pagination: {
                currentPage: page,
                totalPages,
                totalJobs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('postedBy', 'username email');
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Create new job (requires authentication)
exports.createJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, applicationDeadline } = req.body;
        
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const job = new Job({
            title,
            description,
            company,
            location,
            salary,
            applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
            postedBy: req.user.id
        });

        await job.save();
        
        const populatedJob = await Job.findById(job._id)
            .populate('postedBy', 'username email');
            
        res.status(201).json(populatedJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update job (requires authentication and ownership)
exports.updateJob = async (req, res) => {
    try {
        const { title, description, company, location, salary, isActive, applicationDeadline } = req.body;
        
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Check if user is authenticated and owns the job
        if (!req.user || job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        const updateData = { title, description, company, location, salary, isActive };
        if (applicationDeadline) {
            updateData.applicationDeadline = new Date(applicationDeadline);
        }

        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).populate('postedBy', 'username email');
        
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete job (requires authentication and ownership)
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Check if user is authenticated and owns the job
        if (!req.user || job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Advanced search jobs with full-text search
exports.searchJobs = async (req, res) => {
    try {
        const { q, title, company, location, minSalary, maxSalary, sortBy, sortOrder } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        let query = { isActive: true };
        
        // Full-text search across multiple fields
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { company: { $regex: q, $options: 'i' } },
                { location: { $regex: q, $options: 'i' } }
            ];
        }
        
        // Specific field filters
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }
        if (company) {
            query.company = { $regex: company, $options: 'i' };
        }
        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }
        if (minSalary || maxSalary) {
            query.salary = {};
            if (minSalary) query.salary.$gte = parseInt(minSalary);
            if (maxSalary) query.salary.$lte = parseInt(maxSalary);
        }
        
        // Sort options
        let sortOptions = { createdAt: -1 };
        if (sortBy) {
            sortOptions = {};
            sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;
        }
        
        const jobs = await Job.find(query)
            .populate('postedBy', 'username email')
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);
            
        const totalJobs = await Job.countDocuments(query);
        const totalPages = Math.ceil(totalJobs / limit);
        
        res.status(200).json({
            jobs,
            pagination: {
                currentPage: page,
                totalPages,
                totalJobs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            },
            searchParams: {
                q, title, company, location, minSalary, maxSalary, sortBy, sortOrder
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get jobs by user (for job posters to see their posted jobs)
exports.getJobsByUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const jobs = await Job.find({ postedBy: req.user.id })
            .populate('postedBy', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
            
        const totalJobs = await Job.countDocuments({ postedBy: req.user.id });
        const totalPages = Math.ceil(totalJobs / limit);
        
        res.status(200).json({
            jobs,
            pagination: {
                currentPage: page,
                totalPages,
                totalJobs,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get job statistics
exports.getJobStats = async (req, res) => {
    try {
        const totalJobs = await Job.countDocuments({ isActive: true });
        const totalCompanies = await Job.distinct('company', { isActive: true });
        const avgSalary = await Job.aggregate([
            { $match: { isActive: true, salary: { $exists: true, $ne: null } } },
            { $group: { _id: null, avgSalary: { $avg: '$salary' } } }
        ]);
        
        const jobsByLocation = await Job.aggregate([
            { $match: { isActive: true } },
            { $group: { _id: '$location', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);
        
        res.status(200).json({
            totalJobs,
            totalCompanies: totalCompanies.length,
            averageSalary: avgSalary[0]?.avgSalary || 0,
            topLocations: jobsByLocation
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get applications for a specific job
exports.getJobApplications = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Check if user is authenticated and owns the job
        if (!req.user || job.postedBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to view applications for this job' });
        }
        
        // Get applications for this job
        const Application = require('../models/Application');
        const applications = await Application.find({ jobId: jobId })
            .populate('applicantId', 'username email phone')
            .populate('jobId', 'title company')
            .sort({ appliedAt: -1 });
            
        res.status(200).json({
            job: {
                _id: job._id,
                title: job.title,
                company: job.company
            },
            applications
        });
    } catch (error) {
        console.error('Error fetching job applications:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get jobs by company ID
exports.getJobsByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;
        
        if (!companyId) {
            return res.status(400).json({ message: 'Company ID is required' });
        }

        const jobs = await Job.find({ postedBy: companyId, isActive: true })
            .populate('postedBy', 'username email company')
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            jobs: jobs,
            count: jobs.length
        });

    } catch (error) {
        console.error('Error fetching jobs by company:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
};

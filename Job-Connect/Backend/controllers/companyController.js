const User = require('../models/User');
const Job = require('../models/Job');

// Get all companies (employers) from the database
exports.getCompanies = async (req, res) => {
    try {
        console.log('=== getCompanies called ===');
        console.log('Request URL:', req.url);
        console.log('Request method:', req.method);
        
        // Find all users with role 'employer'
        const employers = await User.find({ role: 'employer' })
            .select('name username email company location industry bio website founded employees')
            .lean();
        
        console.log('Found employers:', employers.length);

        // Transform employer data to company format
        const companies = employers.map(employer => ({
            _id: employer._id,
            name: employer.company || employer.username, // Use username as company name
            industry: employer.industry || 'Technology',
            location: employer.location || 'Not specified',
            employees: employer.employees || '1-10',
            description: employer.bio || `A leading company in the ${employer.industry || 'Technology'} industry, focused on innovation and growth.`,
            website: employer.website || null,
            founded: employer.founded || null,
            rating: 4.0, // Default rating
            logo: null // Can be added later
        }));

        res.status(200).json({
            success: true,
            companies: companies
        });

    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get company details by ID
exports.getCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;

        const employer = await User.findById(companyId)
            .select('name username email company location industry bio website founded employees')
            .lean();

        if (!employer) {
            return res.status(404).json({
                success: false,
                message: 'Company not found'
            });
        }

        // Get jobs posted by this company
        const jobs = await Job.find({ postedBy: companyId })
            .select('title description location salary jobType experience skills')
            .lean();

        const company = {
            _id: employer._id,
            name: employer.company || employer.username, // Use username as company name
            industry: employer.industry || 'Technology',
            location: employer.location || 'Not specified',
            employees: employer.employees || '1-10',
            description: employer.bio || `A leading company in the ${employer.industry || 'Technology'} industry, focused on innovation and growth.`,
            website: employer.website || null,
            founded: employer.founded || null,
            rating: 4.0,
            logo: null,
            jobs: jobs
        };

        res.status(200).json({
            success: true,
            company: company
        });

    } catch (error) {
        console.error('Error fetching company details:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Input validation middleware

// Validate user registration
exports.validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    const errors = [];

    // Username validation
    if (!username || username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    // Email validation - more flexible regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        errors.push('Please provide a valid email address');
    }

    // Password validation
    if (!password || password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

// Validate user login
exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    if (!email) {
        errors.push('Email is required');
    }
    if (!password) {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

// Validate job creation/update
exports.validateJob = (req, res, next) => {
    const { title, description, company, location } = req.body;
    const errors = [];

    if (!title || title.trim().length < 3) {
        errors.push('Job title must be at least 3 characters long');
    }
    if (!description || description.trim().length < 10) {
        errors.push('Job description must be at least 10 characters long');
    }
    if (!company || company.trim().length < 2) {
        errors.push('Company name must be at least 2 characters long');
    }
    if (!location || location.trim().length < 2) {
        errors.push('Location must be at least 2 characters long');
    }

    // Validate salary if provided
    if (req.body.salary && (isNaN(req.body.salary) || req.body.salary < 0)) {
        errors.push('Salary must be a positive number');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

// Validate profile update
exports.validateProfile = (req, res, next) => {
    const { username, email, bio } = req.body;
    const errors = [];

    if (username && username.trim().length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (email) {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            errors.push('Please provide a valid email address');
        }
    }

    if (bio && bio.length > 500) {
        errors.push('Bio cannot exceed 500 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }

    next();
};

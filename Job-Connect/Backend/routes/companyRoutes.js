const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Get all companies
router.get('/', companyController.getCompanies);

// Get company by ID
router.get('/:companyId', companyController.getCompanyById);

module.exports = router;

const express = require('express');
const { 
  getUserLicense, 
  getLicenseStatus, 
  requestRenewal 
} = require('../controllers/licenseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get('/', getUserLicense);
router.get('/status', getLicenseStatus);
router.post('/renewal-request', requestRenewal);

module.exports = router;
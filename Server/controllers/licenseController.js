const License = require('../models/License');
const User = require('../models/User');

// @desc    Get license details for a user
// @route   GET /api/licenses
// @access  Private
exports.getUserLicense = async (req, res) => {
  try {
    const license = await License.findOne({ user: req.user.id });

    if (!license) {
      return res.status(404).json({
        success: false,
        message: 'No license found for this user'
      });
    }

    res.status(200).json({
      success: true,
      data: license
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check license status
// @route   GET /api/licenses/status
// @access  Private
exports.getLicenseStatus = async (req, res) => {
  try {
    const license = await License.findOne({ user: req.user.id });

    if (!license) {
      return res.status(404).json({
        success: false,
        message: 'No license found for this user'
      });
    }

    // Calculate if license is active, expiring soon, or expired
    const today = new Date();
    const expiryDate = new Date(license.expiryDate);
    const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    
    let status = license.status;
    let message = '';

    if (status === 'Active') {
      if (daysUntilExpiry <= 0) {
        status = 'Expired';
        message = 'Your license has expired.';
      } else if (daysUntilExpiry <= 30) {
        message = `Your license will expire in ${daysUntilExpiry} days.`;
      } else {
        message = 'Your license is active.';
      }
    }

    res.status(200).json({
      success: true,
      data: {
        licenseNumber: license.licenseNumber,
        category: license.category,
        status,
        expiryDate: license.expiryDate,
        daysUntilExpiry,
        message
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Request license renewal
// @route   POST /api/licenses/renewal-request
// @access  Private
exports.requestRenewal = async (req, res) => {
  try {
    const license = await License.findOne({ user: req.user.id });

    if (!license) {
      return res.status(404).json({
        success: false,
        message: 'No license found for this user'
      });
    }

    // In a real application, this would create a renewal request in a separate collection
    // For now, we'll just return a successful response
    res.status(200).json({
      success: true,
      message: 'Renewal request submitted successfully',
      data: {
        license: license.licenseNumber,
        requestDate: new Date(),
        status: 'Pending'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const mongoose = require('mongoose');

const LicenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please add license number'],
    unique: true
  },
  issuedDate: {
    type: Date,
    required: [true, 'Please add issued date']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please add expiry date']
  },
  category: {
    type: String,
    required: [true, 'Please add license category']
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Suspended', 'Revoked'],
    default: 'Active'
  },
  restrictions: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('License', LicenseSchema);
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add payment amount']
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'Bank Transfer', 'Cash', 'Mobile Money'],
    required: [true, 'Please add payment method']
  },
  paymentType: {
    type: String,
    enum: ['Fine Payment', 'License Renewal', 'Other'],
    required: [true, 'Please add payment type']
  },
  referenceId: {
    type: String,
    required: [true, 'Please add reference ID']
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  relatedFine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fine'
  },
  relatedLicense: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'License'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);
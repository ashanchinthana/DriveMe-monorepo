const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fineNumber: {
    type: String,
    required: [true, 'Please add fine number'],
    unique: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add fine amount']
  },
  reason: {
    type: String,
    required: [true, 'Please add reason for fine']
  },
  location: {
    type: String,
    required: [true, 'Please add location where fine was issued']
  },
  date: {
    type: Date,
    required: [true, 'Please add date when fine was issued'],
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add due date for payment']
  },
  status: {
    type: String,
    enum: ['Unpaid', 'Paid', 'Overdue', 'Disputed', 'Cancelled'],
    default: 'Unpaid'
  },
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Fine', FineSchema);
const Payment = require('../models/Payment');
const Fine = require('../models/Fine');

// @desc    Get payment history for a user
// @route   GET /api/payments
// @access  Private
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .sort({ paymentDate: -1 })
      .populate('relatedFine relatedLicense');

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Process fine payment
// @route   POST /api/payments/fines/:fineId
// @access  Private
exports.payFine = async (req, res) => {
  try {
    const { paymentMethod } = req.body;

    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide payment method'
      });
    }

    // Find the fine
    const fine = await Fine.findById(req.params.fineId);

    if (!fine) {
      return res.status(404).json({
        success: false,
        message: 'Fine not found'
      });
    }

    // Check if fine belongs to user
    if (fine.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to pay this fine'
      });
    }

    // Check if fine is already paid
    if (fine.status === 'Paid') {
      return res.status(400).json({
        success: false,
        message: 'This fine has already been paid'
      });
    }

    // Generate a reference ID
    const referenceId = `FINE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create payment record
    const payment = await Payment.create({
      user: req.user.id,
      amount: fine.amount,
      paymentMethod,
      paymentType: 'Fine Payment',
      referenceId,
      status: 'Completed',
      relatedFine: fine._id
    });

    // Update fine status
    fine.status = 'Paid';
    fine.paymentId = payment._id;
    await fine.save();

    res.status(201).json({
      success: true,
      message: 'Payment successful',
      data: {
        payment,
        fine
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment receipt
// @route   GET /api/payments/:id/receipt
// @access  Private
exports.getPaymentReceipt = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('relatedFine relatedLicense')
      .populate('user', 'name idNumber email');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    // Check if payment belongs to user
    if (payment.user._id.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this receipt'
      });
    }

    // Format the receipt data
    const receipt = {
      receiptNumber: payment.referenceId,
      paymentDate: payment.paymentDate,
      paymentMethod: payment.paymentMethod,
      amount: payment.amount,
      status: payment.status,
      payerDetails: {
        name: payment.user.name,
        idNumber: payment.user.idNumber,
        email: payment.user.email
      },
      paymentType: payment.paymentType,
      paymentDetails: payment.relatedFine ? {
        type: 'Fine',
        fineNumber: payment.relatedFine.fineNumber,
        reason: payment.relatedFine.reason,
        issueDate: payment.relatedFine.date
      } : payment.relatedLicense ? {
        type: 'License',
        licenseNumber: payment.relatedLicense.licenseNumber,
        category: payment.relatedLicense.category
      } : {
        type: 'Other'
      }
    };

    res.status(200).json({
      success: true,
      data: receipt
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
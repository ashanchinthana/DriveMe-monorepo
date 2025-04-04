const Fine = require('../models/Fine');

// @desc    Get all fines for a user
// @route   GET /api/fines
// @access  Private
exports.getUserFines = async (req, res) => {
  try {
    const fines = await Fine.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('paymentId');

    res.status(200).json({
      success: true,
      count: fines.length,
      data: fines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get outstanding (unpaid) fines for a user
// @route   GET /api/fines/outstanding
// @access  Private
exports.getOutstandingFines = async (req, res) => {
  try {
    const fines = await Fine.find({ 
      user: req.user.id,
      status: { $in: ['Unpaid', 'Overdue'] }
    }).sort({ dueDate: 1 });

    res.status(200).json({
      success: true,
      count: fines.length,
      data: fines
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single fine detail
// @route   GET /api/fines/:id
// @access  Private
exports.getFine = async (req, res) => {
  try {
    const fine = await Fine.findById(req.params.id)
      .populate('paymentId');

    if (!fine) {
      return res.status(404).json({
        success: false,
        message: 'Fine not found'
      });
    }

    // Make sure user owns the fine
    if (fine.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this fine'
      });
    }

    res.status(200).json({
      success: true,
      data: fine
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update fine status (useful for disputes)
// @route   PUT /api/fines/:id
// @access  Private
exports.updateFineStatus = async (req, res) => {
  try {
    let fine = await Fine.findById(req.params.id);

    if (!fine) {
      return res.status(404).json({
        success: false,
        message: 'Fine not found'
      });
    }

    // Make sure user owns the fine
    if (fine.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this fine'
      });
    }

    // Only allow status changes to "Disputed" via this endpoint
    if (req.body.status && req.body.status !== 'Disputed') {
      return res.status(400).json({
        success: false,
        message: 'You can only mark a fine as disputed'
      });
    }

    fine = await Fine.findByIdAndUpdate(
      req.params.id,
      { status: 'Disputed' },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: fine
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
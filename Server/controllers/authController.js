const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const validator = require('validator');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, idNumber, phone, dlNumber, dlExpireDate, email, password } = req.body;

  console.log('Register request body:', req.body);
  // Validate required fields
  if (!name || !idNumber || !phone || !dlNumber || !dlExpireDate || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    console.log('Invalid email format:', email);
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [
      { email },
      { idNumber },
      { dlNumber }
    ] 
  });
  
  if (existingUser) {
    console.log('User already exists with email, ID, or driver\'s license:', { email, idNumber, dlNumber });
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email, ID, or driver\'s license'
    });
  }

  // Create user
  const user = await User.create({
    name,
    idNumber,
    phone,
    dlNumber,
    dlExpireDate,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      idNumber: user.idNumber,
      phone: user.phone,
      dlNumber: user.dlNumber,
      dlExpireDate: user.dlExpireDate,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    // Log request data for debugging
    console.log('Login request body:', req.body);
    
    const { idNumber, password } = req.body;

    // Validate inputs
    if (!idNumber || !password) {
      console.log('Missing required fields:', { idNumber: !!idNumber, password: !!password });
      return res.status(400).json({
        success: false,
        message: 'Please provide ID number and password'
      });
    }

    // Check for user
    const user = await User.findOne({ idNumber }).select('+password');

    if (!user) {
      console.log('No user found with ID:', idNumber);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Helper function to create token and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};

module.exports = {
  register,
  login,
  getMe,
};
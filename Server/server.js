const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Import routes
const authRoutes = require('./routes/authRoutes');
const fineRoutes = require('./routes/fineRoutes');
const licenseRoutes = require('./routes/licenseRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/fines', fineRoutes);
app.use('/api/licenses', licenseRoutes);
app.use('/api/payments', paymentRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('DriveME API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
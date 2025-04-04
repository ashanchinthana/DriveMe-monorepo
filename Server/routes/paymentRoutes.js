const express = require('express');
const { 
  getPaymentHistory, 
  payFine, 
  getPaymentReceipt 
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get('/', getPaymentHistory);
router.post('/fines/:fineId', payFine);
router.get('/:id/receipt', getPaymentReceipt);

module.exports = router;
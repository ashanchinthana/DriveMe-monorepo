const express = require('express');
const { 
  getUserFines, 
  getOutstandingFines, 
  getFine, 
  updateFineStatus 
} = require('../controllers/fineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router.get('/', getUserFines);
router.get('/outstanding', getOutstandingFines);
router.get('/:id', getFine);
router.put('/:id', updateFineStatus);

module.exports = router;
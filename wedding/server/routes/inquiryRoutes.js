const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Public route to submit inquiry (used by the frontend contact form)
router.post('/', inquiryController.createInquiry);

// Admin / protected routes to manage inquiries
router.get('/', inquiryController.getInquiries);
router.get('/:id', inquiryController.getInquiryById);
router.patch('/:id', inquiryController.updateInquiry);
router.delete('/:id', authenticateToken, requireAdmin, inquiryController.deleteInquiry);

module.exports = router;

const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

router.get('/traditions', contentController.getTraditions);
router.get('/services', contentController.getServices);
router.get('/destinations', contentController.getDestinations);

module.exports = router;

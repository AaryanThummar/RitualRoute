const express = require('express');
const router = express.Router();
const curationController = require('../controllers/curationController');

// Generate and persist new AI wedding curation plan
router.post('/generate', curationController.generateBoard);

// List saved wedding curation boards
router.get('/', curationController.getBoards);

// Get specific curation board by ID or shareId
router.get('/:id', curationController.getBoardById);

module.exports = router;

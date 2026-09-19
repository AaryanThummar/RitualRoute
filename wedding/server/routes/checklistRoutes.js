const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

router.get('/', checklistController.getChecklist);
router.post('/', checklistController.createTask);
router.put('/:id', checklistController.updateTask);
router.delete('/:id', checklistController.deleteTask);

module.exports = router;

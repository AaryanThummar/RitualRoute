const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

router.get('/', budgetController.getBudget);
router.post('/', budgetController.createBudgetItem);
router.put('/:id', budgetController.updateBudgetItem);
router.delete('/:id', budgetController.deleteBudgetItem);

module.exports = router;

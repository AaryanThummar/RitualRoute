const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET all budget items
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    let items = await dbService.getCollection('budget');

    if (category && category !== 'All') {
      items = items.filter(i => i.category && i.category.toLowerCase() === category.toLowerCase());
    }
    if (status && status !== 'All') {
      items = items.filter(i => i.status && i.status.toLowerCase() === status.toLowerCase());
    }

    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET budget analytics & summary
router.get('/summary', async (req, res) => {
  try {
    const items = await dbService.getCollection('budget');
    const profile = await dbService.getWeddingProfile();

    const overallBudget = Number(profile.totalBudget) || 3500000;
    const currency = profile.currencySymbol || '₹';

    let totalEstimated = 0;
    let totalActual = 0;
    let totalPaid = 0;

    const categoryBreakdown = {};

    items.forEach(item => {
      const est = Number(item.estimatedCost) || 0;
      const act = Number(item.actualCost) || est;
      const paid = Number(item.paidAmount) || 0;

      totalEstimated += est;
      totalActual += act;
      totalPaid += paid;

      const cat = item.category || 'General';
      if (!categoryBreakdown[cat]) {
        categoryBreakdown[cat] = { estimated: 0, actual: 0, paid: 0, count: 0 };
      }
      categoryBreakdown[cat].estimated += est;
      categoryBreakdown[cat].actual += act;
      categoryBreakdown[cat].paid += paid;
      categoryBreakdown[cat].count += 1;
    });

    const pendingBalance = Math.max(0, totalActual - totalPaid);
    const budgetRemaining = Math.max(0, overallBudget - totalActual);
    const percentSpent = overallBudget > 0 ? Math.round((totalActual / overallBudget) * 100) : 0;

    res.json({
      success: true,
      data: {
        overallBudget,
        currency,
        totalEstimated,
        totalActual,
        totalPaid,
        pendingBalance,
        budgetRemaining,
        percentSpent,
        categoryBreakdown
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new budget item
router.post('/', async (req, res) => {
  try {
    const { category, title, estimatedCost, actualCost, paidAmount, status, vendor, notes } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, message: 'Item title and category are required' });
    }

    const est = Number(estimatedCost) || 0;
    const act = Number(actualCost) || est;
    const paid = Number(paidAmount) || 0;

    let computedStatus = status;
    if (!computedStatus) {
      if (paid >= act && act > 0) computedStatus = 'Paid';
      else if (paid > 0) computedStatus = 'Partial';
      else computedStatus = 'Pending';
    }

    const newItem = await dbService.createDoc('budget', {
      category,
      title,
      estimatedCost: est,
      actualCost: act,
      paidAmount: paid,
      status: computedStatus,
      vendor: vendor || 'TBD',
      notes: notes || ''
    });

    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update budget item
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbService.updateDoc('budget', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Budget item not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE budget item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbService.deleteDoc('budget', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Budget item not found' });
    }
    res.json({ success: true, message: 'Budget item deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

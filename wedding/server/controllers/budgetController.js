const Budget = require('../models/Budget');
const { getDbStatus } = require('../config/db');

const fallbackBudget = [
  { _id: 'bud_1', category: 'Venues', item: 'Heritage Palace Mandap & Ballroom', allocated: 2500000, actual: 2400000, culturalTag: 'Both Traditions', paid: true },
  { _id: 'bud_2', category: 'Decor & Florals', item: 'Jasmine & Marigold Mandap Architecture', allocated: 1200000, actual: 1150000, culturalTag: 'Fusion Setup', paid: true },
  { _id: 'bud_3', category: 'Gastronomy', item: 'Dual Regional Feasts & Botanical Spice Bar', allocated: 1800000, actual: 1750000, culturalTag: 'Punjabi & Tamil Spread', paid: false },
  { _id: 'bud_4', category: 'Attire & Jewellery', item: 'Handloom Silk Kanjeevaram & Sabyasachi Sherwani', allocated: 1500000, actual: 1500000, culturalTag: 'Both Families', paid: true }
];

exports.getBudget = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const items = await Budget.find().sort({ createdAt: -1 });
      const totalAllocated = items.reduce((sum, item) => sum + (item.allocated || 0), 0);
      const totalActual = items.reduce((sum, item) => sum + (item.actual || 0), 0);
      return res.json({
        success: true,
        summary: { totalAllocated, totalActual, balance: totalAllocated - totalActual },
        count: items.length,
        data: items,
      });
    }

    const totalAllocated = fallbackBudget.reduce((sum, item) => sum + (item.allocated || 0), 0);
    const totalActual = fallbackBudget.reduce((sum, item) => sum + (item.actual || 0), 0);
    res.json({
      success: true,
      summary: { totalAllocated, totalActual, balance: totalAllocated - totalActual },
      count: fallbackBudget.length,
      data: fallbackBudget,
      source: 'memory-fallback'
    });
  } catch (err) {
    next(err);
  }
};

exports.createBudgetItem = async (req, res, next) => {
  try {
    const { category, item, allocated, actual, culturalTag, paid, vendor, notes } = req.body;
    if (!item) {
      return res.status(400).json({ success: false, error: 'Budget item name is required' });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const budgetItem = await Budget.create({
        category: category || 'General',
        item: item.trim(),
        allocated: Number(allocated) || 0,
        actual: Number(actual) || 0,
        culturalTag: culturalTag || 'Both Traditions',
        paid: Boolean(paid),
        vendor: vendor || '',
        notes: notes || '',
      });
      return res.status(201).json({ success: true, data: budgetItem });
    }

    const newItem = {
      _id: 'bud_' + Date.now(),
      category: category || 'General',
      item: item.trim(),
      allocated: Number(allocated) || 0,
      actual: Number(actual) || 0,
      culturalTag: culturalTag || 'Both Traditions',
      paid: Boolean(paid),
      vendor: vendor || '',
      notes: notes || '',
    };
    fallbackBudget.push(newItem);
    res.status(201).json({ success: true, data: newItem });
  } catch (err) {
    next(err);
  }
};

exports.updateBudgetItem = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const item = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!item) return res.status(404).json({ success: false, error: 'Budget item not found' });
      return res.json({ success: true, data: item });
    }

    const idx = fallbackBudget.findIndex(b => b._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Budget item not found' });
    fallbackBudget[idx] = { ...fallbackBudget[idx], ...req.body };
    res.json({ success: true, data: fallbackBudget[idx] });
  } catch (err) {
    next(err);
  }
};

exports.deleteBudgetItem = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const item = await Budget.findByIdAndDelete(req.params.id);
      if (!item) return res.status(404).json({ success: false, error: 'Budget item not found' });
      return res.json({ success: true, message: 'Budget item deleted' });
    }

    const idx = fallbackBudget.findIndex(b => b._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Budget item not found' });
    fallbackBudget.splice(idx, 1);
    res.json({ success: true, message: 'Budget item deleted' });
  } catch (err) {
    next(err);
  }
};

const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET all rituals (with optional ?culture= filter)
router.get('/', async (req, res) => {
  try {
    const { culture } = req.query;
    let rituals = await dbService.getCollection('rituals');
    if (culture && culture !== 'All') {
      rituals = rituals.filter(r => r.culture.toLowerCase() === culture.toLowerCase());
    }
    res.json({ success: true, count: rituals.length, data: rituals });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single ritual
router.get('/:id', async (req, res) => {
  try {
    const ritual = await dbService.getDoc('rituals', req.params.id);
    if (!ritual) {
      return res.status(404).json({ success: false, message: 'Ritual not found' });
    }
    res.json({ success: true, data: ritual });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new custom ritual
router.post('/', async (req, res) => {
  try {
    const { culture, name, subtitle, durationHours, typicalDay, significance, dressCode, itemsNeeded, dosAndDonts, guestNotes } = req.body;
    if (!name || !culture) {
      return res.status(400).json({ success: false, message: 'Ritual name and culture are required' });
    }
    const newRitual = await dbService.createDoc('rituals', {
      culture,
      name,
      subtitle: subtitle || '',
      durationHours: Number(durationHours) || 1.5,
      typicalDay: typicalDay || 'Custom Timeline',
      significance: significance || '',
      dressCode: dressCode || 'Festive Indian / Western Attire',
      itemsNeeded: Array.isArray(itemsNeeded) ? itemsNeeded : (itemsNeeded ? itemsNeeded.split(',').map(s => s.trim()) : []),
      dosAndDonts: dosAndDonts || { dos: [], donts: [] },
      guestNotes: guestNotes || ''
    });
    res.status(201).json({ success: true, data: newRitual });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update ritual
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbService.updateDoc('rituals', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Ritual not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE ritual
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbService.deleteDoc('rituals', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Ritual not found' });
    }
    res.json({ success: true, message: 'Ritual deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET all vendors
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let vendors = await dbService.getCollection('vendors');

    if (category && category !== 'All') {
      vendors = vendors.filter(v => v.category && v.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      vendors = vendors.filter(v =>
        (v.name && v.name.toLowerCase().includes(q)) ||
        (v.specialty && v.specialty.toLowerCase().includes(q)) ||
        (v.city && v.city.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: vendors.length, data: vendors });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new vendor
router.post('/', async (req, res) => {
  try {
    const { name, category, specialty, rating, phone, city, priceRange, description } = req.body;
    if (!name || !category) {
      return res.status(400).json({ success: false, message: 'Vendor name and category are required' });
    }

    const newVendor = await dbService.createDoc('vendors', {
      name,
      category,
      specialty: specialty || 'General Wedding Services',
      rating: Number(rating) || 5.0,
      phone: phone || '',
      city: city || 'Local',
      priceRange: priceRange || 'Contact for Quote',
      description: description || ''
    });

    res.status(201).json({ success: true, data: newVendor });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update vendor
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbService.updateDoc('vendors', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE vendor
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbService.deleteDoc('vendors', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }
    res.json({ success: true, message: 'Vendor removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

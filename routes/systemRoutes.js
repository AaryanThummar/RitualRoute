const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET system & database connection status
router.get('/status', async (req, res) => {
  try {
    const mode = dbService.getMode();
    const profile = await dbService.getWeddingProfile();

    res.json({
      success: true,
      data: {
        app: 'RitualRoute',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        databaseMode: mode,
        databaseProvider: mode === 'firebase' ? 'Firebase Firestore Cloud' : 'Local JSON Fallback Engine (data/db.json)',
        serverTimestamp: new Date().toISOString(),
        wedding: profile
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET wedding profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await dbService.getWeddingProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update wedding profile
router.put('/profile', async (req, res) => {
  try {
    const updated = await dbService.updateWeddingProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

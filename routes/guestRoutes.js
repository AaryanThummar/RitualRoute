const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// GET all guests
router.get('/', async (req, res) => {
  try {
    const { side, rsvp, search } = req.query;
    let guests = await dbService.getCollection('guests');

    if (side && side !== 'All') {
      guests = guests.filter(g => g.side && g.side.toLowerCase() === side.toLowerCase());
    }
    if (rsvp && rsvp !== 'All') {
      guests = guests.filter(g => g.rsvpStatus && g.rsvpStatus.toLowerCase() === rsvp.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      guests = guests.filter(g =>
        (g.name && g.name.toLowerCase().includes(q)) ||
        (g.email && g.email.toLowerCase().includes(q)) ||
        (g.dietary && g.dietary.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: guests.length, data: guests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET guest analytics & RSVP statistics
router.get('/stats', async (req, res) => {
  try {
    const guests = await dbService.getCollection('guests');
    const totalGuests = guests.length;

    let confirmed = 0;
    let pending = 0;
    let declined = 0;
    let totalHeadcount = 0;

    const bySide = { Bride: 0, Groom: 0, Mutual: 0 };
    const dietaryMap = {};

    guests.forEach(g => {
      const headcount = 1 + (Number(g.plusOnes) || 0);
      totalHeadcount += headcount;

      if (g.rsvpStatus === 'Confirmed') confirmed += headcount;
      else if (g.rsvpStatus === 'Declined') declined += headcount;
      else pending += headcount;

      const sideKey = g.side || 'Mutual';
      bySide[sideKey] = (bySide[sideKey] || 0) + headcount;

      const diet = g.dietary || 'Standard';
      dietaryMap[diet] = (dietaryMap[diet] || 0) + headcount;
    });

    res.json({
      success: true,
      data: {
        totalInvitees: totalGuests,
        totalHeadcount,
        confirmed,
        pending,
        declined,
        bySide,
        dietaryBreakdown: dietaryMap
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST new guest
router.post('/', async (req, res) => {
  try {
    const { name, relationship, side, email, phone, rsvpStatus, dietary, ceremoniesAttending, plusOnes, tableNumber } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Guest name is required' });
    }

    const newGuest = await dbService.createDoc('guests', {
      name,
      relationship: relationship || 'Family Friend',
      side: side || 'Mutual',
      email: email || '',
      phone: phone || '',
      rsvpStatus: rsvpStatus || 'Pending',
      dietary: dietary || 'No Restrictions',
      ceremoniesAttending: Array.isArray(ceremoniesAttending) ? ceremoniesAttending : (ceremoniesAttending ? ceremoniesAttending.split(',').map(s => s.trim()) : ['Ceremony', 'Reception']),
      plusOnes: Number(plusOnes) || 0,
      tableNumber: tableNumber || 'Unassigned'
    });

    res.status(201).json({ success: true, data: newGuest });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update guest
router.put('/:id', async (req, res) => {
  try {
    const updated = await dbService.updateDoc('guests', req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Guest not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE guest
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await dbService.deleteDoc('guests', req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Guest not found' });
    }
    res.json({ success: true, message: 'Guest removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

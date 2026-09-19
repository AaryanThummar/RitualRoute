const Guest = require('../models/Guest');
const { getDbStatus } = require('../config/db');

const fallbackGuests = [
  { _id: 'gst_1', name: 'Kabir & Aria Mehta', side: 'Bride', culture: 'Punjabi', email: 'kabir@example.com', status: 'Confirmed', dietary: 'Vegetarian', plusOne: true, invitedEvents: ['Anand Karaj', 'Reception'] },
  { _id: 'gst_2', name: 'Rajesh & Malini Iyer', side: 'Groom', culture: 'Tamil', email: 'rajesh@example.com', status: 'Confirmed', dietary: 'South Indian Vegan', plusOne: true, invitedEvents: ['Muhurtham', 'Reception'] },
  { _id: 'gst_3', name: 'Sean & Meera O\'Brien', side: 'Both', culture: 'Irish / Tamil', email: 'sean@example.com', status: 'Confirmed', dietary: 'Gluten-Free', plusOne: false, invitedEvents: ['All Ceremonies'] }
];

exports.getGuests = async (req, res, next) => {
  try {
    const { side, status } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = {};
      if (side && side !== 'ALL') filter.side = side;
      if (status && status !== 'ALL') filter.status = status;
      const guests = await Guest.find(filter).sort({ createdAt: -1 });
      return res.json({ success: true, count: guests.length, data: guests });
    }

    let result = fallbackGuests;
    if (side && side !== 'ALL') result = result.filter(g => g.side === side);
    if (status && status !== 'ALL') result = result.filter(g => g.status === status);
    res.json({ success: true, count: result.length, data: result, source: 'memory-fallback' });
  } catch (err) {
    next(err);
  }
};

exports.createGuest = async (req, res, next) => {
  try {
    const { name, side, culture, email, phone, status, dietary, invitedEvents, plusOne, notes } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, error: 'Guest name is required' });
    }

    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const guest = await Guest.create({
        name: name.trim(),
        side: side || 'Both',
        culture: culture || '',
        email: email || '',
        phone: phone || '',
        status: status || 'Pending',
        dietary: dietary || 'No Restrictions',
        invitedEvents: Array.isArray(invitedEvents) ? invitedEvents : [],
        plusOne: Boolean(plusOne),
        notes: notes || '',
      });
      return res.status(201).json({ success: true, data: guest });
    }

    const newGuest = {
      _id: 'gst_' + Date.now(),
      name: name.trim(),
      side: side || 'Both',
      culture: culture || '',
      email: email || '',
      phone: phone || '',
      status: status || 'Pending',
      dietary: dietary || 'No Restrictions',
      invitedEvents: Array.isArray(invitedEvents) ? invitedEvents : [],
      plusOne: Boolean(plusOne),
      notes: notes || '',
    };
    fallbackGuests.push(newGuest);
    res.status(201).json({ success: true, data: newGuest });
  } catch (err) {
    next(err);
  }
};

exports.updateGuest = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const guest = await Guest.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!guest) return res.status(404).json({ success: false, error: 'Guest not found' });
      return res.json({ success: true, data: guest });
    }

    const idx = fallbackGuests.findIndex(g => g._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Guest not found' });
    fallbackGuests[idx] = { ...fallbackGuests[idx], ...req.body };
    res.json({ success: true, data: fallbackGuests[idx] });
  } catch (err) {
    next(err);
  }
};

exports.deleteGuest = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const guest = await Guest.findByIdAndDelete(req.params.id);
      if (!guest) return res.status(404).json({ success: false, error: 'Guest not found' });
      return res.json({ success: true, message: 'Guest deleted' });
    }

    const idx = fallbackGuests.findIndex(g => g._id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Guest not found' });
    fallbackGuests.splice(idx, 1);
    res.json({ success: true, message: 'Guest deleted' });
  } catch (err) {
    next(err);
  }
};

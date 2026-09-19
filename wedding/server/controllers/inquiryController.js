const Inquiry = require('../models/Inquiry');
const { getDbStatus } = require('../config/db');

// In-memory fallback if MongoDB is not connected
const fallbackInquiries = [];

// @desc    Submit a new contact / consultation inquiry
// @route   POST /api/inquiries
exports.createInquiry = async (req, res, next) => {
  try {
    const { name, email, tradition, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Name and email are required fields',
      });
    }

    let inquiry;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      inquiry = await Inquiry.create({
        name: name.trim(),
        email: email.trim(),
        tradition: tradition ? tradition.trim() : '',
        message: message ? message.trim() : '',
      });
    } else {
      // Fallback
      inquiry = {
        _id: 'inq_' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        tradition: tradition ? tradition.trim() : '',
        message: message ? message.trim() : '',
        status: 'New',
        createdAt: new Date().toISOString(),
      };
      fallbackInquiries.unshift(inquiry);
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully. Our private concierge will contact you within 24 hours.',
      data: inquiry,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
exports.getInquiries = async (req, res, next) => {
  try {
    const { status } = req.query;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const filter = status ? { status } : {};
      const inquiries = await Inquiry.find(filter).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: inquiries.length,
        data: inquiries,
      });
    }

    // Fallback
    let result = fallbackInquiries;
    if (status) {
      result = result.filter(i => i.status === status);
    }
    res.json({
      success: true,
      count: result.length,
      data: result,
      source: 'memory-fallback',
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get inquiry by ID
// @route   GET /api/inquiries/:id
exports.getInquiryById = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const inquiry = await Inquiry.findById(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      return res.json({ success: true, data: inquiry });
    }

    const item = fallbackInquiries.find(i => i._id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// @desc    Update inquiry status or internal notes
// @route   PATCH /api/inquiries/:id
exports.updateInquiry = async (req, res, next) => {
  try {
    const { status, internalNotes } = req.body;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const inquiry = await Inquiry.findByIdAndUpdate(
        req.params.id,
        { ...(status && { status }), ...(internalNotes !== undefined && { internalNotes }) },
        { new: true, runValidators: true }
      );
      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      return res.json({ success: true, data: inquiry });
    }

    const idx = fallbackInquiries.findIndex(i => i._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    if (status) fallbackInquiries[idx].status = status;
    if (internalNotes !== undefined) fallbackInquiries[idx].internalNotes = internalNotes;

    res.json({ success: true, data: fallbackInquiries[idx] });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
exports.deleteInquiry = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
      if (!inquiry) {
        return res.status(404).json({ success: false, error: 'Inquiry not found' });
      }
      return res.json({ success: true, message: 'Inquiry deleted' });
    }

    const idx = fallbackInquiries.findIndex(i => i._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, error: 'Inquiry not found' });
    }
    fallbackInquiries.splice(idx, 1);
    res.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    next(err);
  }
};

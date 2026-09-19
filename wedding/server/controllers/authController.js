const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { getDbStatus } = require('../config/db');

// In-memory fallback
const fallbackUsers = [];

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET || 'heritage_harmony_super_secret_jwt_key_2026';
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user / couple account
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, partnerName, traditions, weddingDate } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters',
      });
    }

    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const existing = await User.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({ success: false, error: 'User with this email already exists' });
      }

      const user = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role: role === 'admin' ? 'admin' : 'couple',
        partnerName: partnerName || '',
        traditions: Array.isArray(traditions) ? traditions : [],
        weddingDate: weddingDate || null,
      });

      const token = generateToken(user);

      return res.status(201).json({
        success: true,
        message: 'Registration successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          partnerName: user.partnerName,
          traditions: user.traditions,
        },
      });
    }

    // Fallback
    const existing = fallbackUsers.find(u => u.email === email.toLowerCase().trim());
    if (existing) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = {
      _id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: role === 'admin' ? 'admin' : 'couple',
      partnerName: partnerName || '',
      traditions: Array.isArray(traditions) ? traditions : [],
      weddingDate: weddingDate || null,
      createdAt: new Date().toISOString(),
    };
    fallbackUsers.push(newUser);

    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'Registration successful (in-memory mode)',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        partnerName: newUser.partnerName,
        traditions: newUser.traditions,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      });
    }

    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = generateToken(user);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          partnerName: user.partnerName,
          traditions: user.traditions,
        },
      });
    }

    // Fallback
    const user = fallbackUsers.find(u => u.email === email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        partnerName: user.partnerName,
        traditions: user.traditions,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};

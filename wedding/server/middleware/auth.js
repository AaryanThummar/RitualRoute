const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'heritage_harmony_super_secret_jwt_key_2026';
    const decoded = jwt.verify(token, secret);
    
    // Attempt to attach user if DB is accessible
    try {
      const user = await User.findById(decoded.id).select('-password');
      req.user = user || decoded;
    } catch {
      req.user = decoded;
    }

    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, error: 'Admin privileges required' });
};

module.exports = { authenticateToken, requireAdmin };

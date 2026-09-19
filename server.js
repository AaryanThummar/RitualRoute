const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Import API Routes
const ritualsRoutes = require('./routes/ritualsRoutes');
const harmonizerRoutes = require('./routes/harmonizerRoutes');
const guestRoutes = require('./routes/guestRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const taskRoutes = require('./routes/taskRoutes');
const systemRoutes = require('./routes/systemRoutes');

// Mount API Routes
app.use('/api/rituals', ritualsRoutes);
app.use('/api/harmonizer', harmonizerRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/system', systemRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'RitualRoute Backend'
  });
});

// Single Page Application route fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n✨ ====================================================== ✨`);
  console.log(`✨  RitualRoute - Cross-Cultural Wedding Planner         ✨`);
  console.log(`✨  Server active on: http://localhost:${PORT}             ✨`);
  console.log(`✨  Environment: ${process.env.NODE_ENV || 'development'}                           ✨`);
  console.log(`✨ ====================================================== ✨\n`);
});

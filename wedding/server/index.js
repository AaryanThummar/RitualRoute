require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { connectDB, getDbStatus } = require('./config/db');

// Route imports
const inquiryRoutes = require('./routes/inquiryRoutes');
const curationRoutes = require('./routes/curationRoutes');
const authRoutes = require('./routes/authRoutes');
const guestRoutes = require('./routes/guestRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const contentRoutes = require('./routes/contentRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Core Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger for development
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'online',
    app: 'Heritage & Harmony - Cross-Cultural Wedding Planner API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    endpoints: {
      inquiries: '/api/inquiries',
      curation: '/api/curation',
      curationGenerate: '/api/curation/generate (POST)',
      auth: '/api/auth',
      guests: '/api/guests',
      budget: '/api/budget',
      checklist: '/api/checklist',
      traditions: '/api/traditions',
      services: '/api/services',
      destinations: '/api/destinations'
    }
  });
});

// API Explorer / Documentation route
app.get('/api', (req, res) => {
  const dbStatus = getDbStatus();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Heritage & Harmony API Portal</title>
      <style>
        :root {
          --bg: #0d0407;
          --card: #18090f;
          --gold: #d4af37;
          --gold-light: #f3e5ab;
          --ivory: #faf8f5;
          --border: rgba(212, 175, 55, 0.2);
          --text-dim: #bda99e;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background: var(--bg);
          color: var(--ivory);
          margin: 0;
          padding: 2.5rem 1.5rem;
          line-height: 1.6;
        }
        .container {
          max-width: 900px;
          margin: 0 auto;
        }
        header {
          border-bottom: 1px solid var(--border);
          padding-bottom: 1.5rem;
          margin-bottom: 2rem;
        }
        h1 {
          font-family: Georgia, serif;
          color: var(--gold);
          font-size: 2.2rem;
          margin: 0 0 0.5rem;
          letter-spacing: 1px;
        }
        .tagline {
          color: var(--text-dim);
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          background: ${dbStatus.connected ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)'};
          color: ${dbStatus.connected ? '#4ade80' : '#facc15'};
          border: 1px solid ${dbStatus.connected ? '#22c55e' : '#eab308'};
          margin-top: 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.25rem;
          margin-top: 1.5rem;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 1.25rem;
          transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
        }
        .card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          color: var(--gold-light);
        }
        .card p {
          color: var(--text-dim);
          font-size: 0.85rem;
          margin: 0 0 1rem;
        }
        .endpoint {
          display: inline-block;
          font-family: monospace;
          background: rgba(0,0,0,0.4);
          padding: 4px 8px;
          border-radius: 4px;
          color: #93c5fd;
          font-size: 0.85rem;
          text-decoration: none;
        }
        .endpoint:hover {
          color: #bfdbfe;
          text-decoration: underline;
        }
        .method {
          font-weight: bold;
          color: #a78bfa;
          font-size: 0.75rem;
          margin-right: 4px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <div class="tagline">The Art of Traditions — Backend API Service</div>
          <h1>Heritage & Harmony</h1>
          <p style="color: var(--text-dim); margin: 0.5rem 0 0;">Production-grade RESTful API engine supporting Cross-Cultural Wedding Planning, AI Board synthesis, and inquiries.</p>
          <div class="status-badge">
            <span style="font-size: 10px;">●</span> Server Online &bull; DB: ${dbStatus.connected ? 'MongoDB Active' : 'Memory Cache Active'}
          </div>
        </header>

        <h2 style="font-size: 1.3rem; color: var(--gold); margin-top: 2rem;">Available API Endpoints</h2>
        <div class="grid">
          <div class="card">
            <h3>Health & Telemetry</h3>
            <p>Check server health, uptime, and database connectivity.</p>
            <a class="endpoint" href="/api/health" target="_blank"><span class="method">GET</span>/api/health</a>
          </div>

          <div class="card">
            <h3>Contact Inquiries</h3>
            <p>Handles inquiries submitted from the website's contact form.</p>
            <a class="endpoint" href="/api/inquiries" target="_blank"><span class="method">GET</span>/api/inquiries</a>
          </div>

          <div class="card">
            <h3>AI Wedding Board</h3>
            <p>Curated synthesis engine and persistent wedding boards.</p>
            <a class="endpoint" href="/api/curation" target="_blank"><span class="method">GET</span>/api/curation</a>
          </div>

          <div class="card">
            <h3>Rituals Knowledge Base</h3>
            <p>Detailed ceremonial protocols across regional cultures.</p>
            <a class="endpoint" href="/api/traditions" target="_blank"><span class="method">GET</span>/api/traditions</a>
          </div>

          <div class="card">
            <h3>Curated Services</h3>
            <p>Catalog of bespoke cross-cultural wedding services.</p>
            <a class="endpoint" href="/api/services" target="_blank"><span class="method">GET</span>/api/services</a>
          </div>

          <div class="card">
            <h3>Heritage Destinations</h3>
            <p>Palace, beach, and backwater destination venues.</p>
            <a class="endpoint" href="/api/destinations" target="_blank"><span class="method">GET</span>/api/destinations</a>
          </div>

          <div class="card">
            <h3>Guests & RSVPs</h3>
            <p>Multi-cultural guest tracking with dietary & event tagging.</p>
            <a class="endpoint" href="/api/guests" target="_blank"><span class="method">GET</span>/api/guests</a>
          </div>

          <div class="card">
            <h3>Smart Budget Tracker</h3>
            <p>Dual-tradition expense management and allocation.</p>
            <a class="endpoint" href="/api/budget" target="_blank"><span class="method">GET</span>/api/budget</a>
          </div>

          <div class="card">
            <h3>Multi-Ceremony Checklist</h3>
            <p>Milestone planning checklist organized by traditions.</p>
            <a class="endpoint" href="/api/checklist" target="_blank"><span class="method">GET</span>/api/checklist</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

// ======================================================
//  VERSIONED API ROUTERS
// ======================================================

// --- Version 1.0: Core Foundation / MVP ---
const v1Router = express.Router();
v1Router.get('/health', (req, res) => res.json({
  status: 'online',
  version: '1.0.0',
  tier: 'Core Foundation / MVP',
  database: getDbStatus(),
  endpoints: ['/api/v1/inquiries', '/api/v1/traditions', '/api/v1/services', '/api/v1/destinations']
}));
v1Router.use('/inquiries', inquiryRoutes);
v1Router.use('/', contentRoutes);
app.use('/api/v1', v1Router);

// --- Version 2.0: Intelligence & Coordination ---
const v2Router = express.Router();
v2Router.get('/health', (req, res) => res.json({
  status: 'online',
  version: '2.0.0',
  tier: 'Intelligence & Coordination',
  database: getDbStatus(),
  endpoints: ['/api/v2/inquiries', '/api/v2/traditions', '/api/v2/services', '/api/v2/destinations', '/api/v2/curation', '/api/v2/auth']
}));
v2Router.use('/inquiries', inquiryRoutes);
v2Router.use('/', contentRoutes);
v2Router.use('/curation', curationRoutes);
v2Router.use('/auth', authRoutes);
app.use('/api/v2', v2Router);

// --- Version 3.0: Enterprise Wedding Management ---
const v3Router = express.Router();
v3Router.get('/health', (req, res) => res.json({
  status: 'online',
  version: '3.0.0',
  tier: 'Enterprise Wedding Management',
  database: getDbStatus(),
  endpoints: ['/api/v3/inquiries', '/api/v3/traditions', '/api/v3/services', '/api/v3/destinations', '/api/v3/curation', '/api/v3/auth', '/api/v3/guests', '/api/v3/budget', '/api/v3/checklist']
}));
v3Router.use('/inquiries', inquiryRoutes);
v3Router.use('/', contentRoutes);
v3Router.use('/curation', curationRoutes);
v3Router.use('/auth', authRoutes);
v3Router.use('/guests', guestRoutes);
v3Router.use('/budget', budgetRoutes);
v3Router.use('/checklist', checklistRoutes);
app.use('/api/v3', v3Router);

// Default /api routes (alias to latest v3.0 for frontend compatibility)
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/curation', curationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api', contentRoutes);

// Static frontend serving if client build exists
const clientDistPath = path.join(__dirname, '..', '..', 'client-old', 'dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[Frontend] Serving static frontend from: ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback for client-side routing in Express 5
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` ✨ Heritage & Harmony API Backend Server Running!`);
  console.log(` 🌐 Server URL:        http://localhost:${PORT}`);
  console.log(` 📋 API Documentation: http://localhost:${PORT}/api`);
  console.log(` 🩺 Health Check:      http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

module.exports = app;

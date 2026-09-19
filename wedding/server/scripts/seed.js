require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');
const WeddingBoard = require('../models/WeddingBoard');
const Tradition = require('../models/Tradition');
const Guest = require('../models/Guest');
const Budget = require('../models/Budget');
const Checklist = require('../models/Checklist');
const seedData = require('../data/seedData.json');
const { DEFAULT_TRADITIONS } = require('../controllers/contentController');

async function seedDB() {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wedding_planner';
  console.log(`[Seed] Connecting to ${mongoURI}...`);

  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('[Seed] Connected to MongoDB.');

    // Seed Admin User
    if (seedData.admin) {
      const existingAdmin = await User.findOne({ email: seedData.admin.email });
      if (!existingAdmin) {
        await User.create(seedData.admin);
        console.log(`[Seed] Admin user created: ${seedData.admin.email}`);
      } else {
        console.log(`[Seed] Admin user already exists.`);
      }
    }

    // Seed Inquiries
    if (seedData.inquiries && seedData.inquiries.length) {
      const count = await Inquiry.countDocuments();
      if (count === 0) {
        await Inquiry.insertMany(seedData.inquiries);
        console.log(`[Seed] Inserted ${seedData.inquiries.length} sample inquiries.`);
      }
    }

    // Seed Curation Board
    if (seedData.curation) {
      const existingBoard = await WeddingBoard.findOne({ shareId: seedData.curation.shareId });
      if (!existingBoard) {
        await WeddingBoard.create(seedData.curation);
        console.log(`[Seed] Sample wedding curation board created.`);
      }
    }

    // Seed Traditions
    const traditionCount = await Tradition.countDocuments();
    if (traditionCount === 0 && DEFAULT_TRADITIONS && DEFAULT_TRADITIONS.length) {
      await Tradition.insertMany(DEFAULT_TRADITIONS);
      console.log(`[Seed] Inserted ${DEFAULT_TRADITIONS.length} regional traditions.`);
    }

    // Seed Sample Guests
    const guestCount = await Guest.countDocuments();
    if (guestCount === 0) {
      await Guest.insertMany([
        { name: 'Kabir & Aria Mehta', side: 'Bride', culture: 'Punjabi', email: 'kabir@example.com', status: 'Confirmed', dietary: 'Vegetarian', plusOne: true, invitedEvents: ['Anand Karaj', 'Reception'] },
        { name: 'Rajesh & Malini Iyer', side: 'Groom', culture: 'Tamil', email: 'rajesh@example.com', status: 'Confirmed', dietary: 'South Indian Vegan', plusOne: true, invitedEvents: ['Muhurtham', 'Reception'] },
        { name: 'Sean & Meera O\'Brien', side: 'Both', culture: 'Irish / Tamil', email: 'sean@example.com', status: 'Confirmed', dietary: 'Gluten-Free', plusOne: false, invitedEvents: ['All Ceremonies'] }
      ]);
      console.log('[Seed] Inserted sample guests.');
    }

    // Seed Sample Budget
    const budgetCount = await Budget.countDocuments();
    if (budgetCount === 0) {
      await Budget.insertMany([
        { category: 'Venues', item: 'Heritage Palace Mandap & Ballroom', allocated: 2500000, actual: 2400000, culturalTag: 'Both Traditions', paid: true },
        { category: 'Decor & Florals', item: 'Jasmine & Marigold Mandap Architecture', allocated: 1200000, actual: 1150000, culturalTag: 'Fusion Setup', paid: true },
        { category: 'Gastronomy', item: 'Dual Regional Feasts & Botanical Spice Bar', allocated: 1800000, actual: 1750000, culturalTag: 'Punjabi & Tamil Spread', paid: false },
        { category: 'Attire & Jewellery', item: 'Handloom Silk Kanjeevaram & Sabyasachi Sherwani', allocated: 1500000, actual: 1500000, culturalTag: 'Both Families', paid: true }
      ]);
      console.log('[Seed] Inserted sample budget items.');
    }

    // Seed Sample Checklist
    const checkCount = await Checklist.countDocuments();
    if (checkCount === 0) {
      await Checklist.insertMany([
        { task: 'Meet with both family priests / celebrants to align ritual timings', timeline: '6 Months Before', category: 'Ceremony Protocol', ceremonyTag: 'Both Rites', assignedTo: 'Couple & Elders', completed: true },
        { task: 'Finalize bilingual dual-script letterpress invitation wording', timeline: '4 Months Before', category: 'Stationery', ceremonyTag: 'Shared', assignedTo: 'Couple', completed: true },
        { task: 'Curate regional folk musicians (Nadaswaram & Punjabi Dhol)', timeline: '3 Months Before', category: 'Entertainment', ceremonyTag: 'Cultural Performers', assignedTo: 'Planner', completed: false },
        { task: 'Schedule dual-cultural food tasting & signature botanical spice cocktail trials', timeline: '2 Months Before', category: 'Gastronomy', ceremonyTag: 'Culinary Team', assignedTo: 'Couple', completed: false }
      ]);
      console.log('[Seed] Inserted sample checklist tasks.');
    }

    console.log('[Seed] Database initialization complete!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('[Seed] Error seeding database:', err.message);
    process.exit(1);
  }
}

seedDB();

const Tradition = require('../models/Tradition');
const { getDbStatus } = require('../config/db');

// Built-in verified knowledge matching Heritage & Harmony
const DEFAULT_TRADITIONS = [
  {
    culture: 'Punjabi Sikh',
    name: 'Anand Karaj',
    script: 'ਅਨੰਦ ਕਾਰਜ',
    line: 'The blissful union. Sacred rounds of the Guru Granth Sahib under saffron silk canopies, accompanied by Shabad Kirtan.',
    primaryCeremony: 'Anand Karaj',
    preCeremony: 'Maiya & Chooda ceremony',
    music: 'Dhol & Bhangra',
    flower: 'Marigold & Rose',
    palette: 'Saffron, Red, Gold',
    keyRituals: [
      { name: 'Milni', description: 'Ceremonial meeting of the two families with exchange of garlands and gifts', timing: 'Morning Arrival' },
      { name: 'Anand Karaj', description: 'Four sacred Lavan rounds around the Guru Granth Sahib', timing: 'Late Morning' },
      { name: 'Doli', description: 'The emotional farewell of the bride with rice throwing', timing: 'Afternoon' }
    ]
  },
  {
    culture: 'Tamil Hindu',
    name: 'Muhurtham',
    script: 'முகூர்த்தம்',
    line: 'At dawn, purification bathed in sacred water. The auspicious moment chosen by the stars, marked by the tying of the Thali.',
    primaryCeremony: 'Muhurtham',
    preCeremony: 'Mangala Snaanam & Vratham',
    music: 'Nadaswaram & Thavil',
    flower: 'Jasmine & Banana leaf',
    palette: 'Gold, Red, White',
    keyRituals: [
      { name: 'Kasi Yatra', description: 'The symbolic journey of the groom towards Kasi before choosing the householder life', timing: 'Dawn' },
      { name: 'Maalai Maatral', description: 'Garland exchange between the couple three times', timing: 'Morning' },
      { name: 'Mangalya Dharanam', description: 'Tying the sacred Thali around the bride\'s neck at the auspicious Muhurtham', timing: 'Auspicious Hour' }
    ]
  },
  {
    culture: 'Bengali Hindu',
    name: 'Shubho Drishti',
    script: 'শুভদৃষ্টি',
    line: 'The ceremonial first look. The bride shields her eyes with betel leaves, then reveals herself to her beloved.',
    primaryCeremony: 'Shubho Drishti & Saat Paak',
    preCeremony: 'Aiburo Bhaat & Gaye Holud',
    music: 'Shehnai & Ululation (Ulu Dhwani)',
    flower: 'Shiuli & Tuberose',
    palette: 'Red, White, Gold',
    keyRituals: [
      { name: 'Saat Paak', description: 'The bride is carried on a wooden stool (piri) around the groom 7 times', timing: 'Evening' },
      { name: 'Shubho Drishti', description: 'The auspicious first look behind betel leaves', timing: 'Evening' },
      { name: 'Mala Badal', description: 'Exchange of floral garlands 3 times', timing: 'Evening' }
    ]
  },
  {
    culture: 'Gujarati Hindu',
    name: 'Mangalfera',
    script: 'મંગલફેરા',
    line: 'Seven sacred rounds of the fire. Each round a vow. Each vow a lifetime promise spoken through ancient Sanskrit verse.',
    primaryCeremony: 'Mangalfera & Hastamelap',
    preCeremony: 'Pithi & Mameru ceremony',
    music: 'Garba & Dandiya Raas',
    flower: 'Marigold & Mogra',
    palette: 'Yellow, Red, Green',
    keyRituals: [
      { name: 'Ponkhana', description: 'Welcoming the groom with sweets and playful nose-pulling by the mother-in-law', timing: 'Baraat Arrival' },
      { name: 'Jaimala & Hastamelap', description: 'Joining of hands under sacred chantings', timing: 'Mandap' },
      { name: 'Mangalfera', description: 'Four rounds around the sacred fire representing Dharma, Artha, Kama, Moksha', timing: 'Ceremony Core' }
    ]
  },
  {
    culture: 'Marathi Hindu',
    name: 'Saptapadi',
    script: 'सप्तपदी',
    line: 'Sacred seven steps with the blessing of Maharashtrian heritage, marked by Mundavalya pearl strands.',
    primaryCeremony: 'Saptapadi & Kanyadaan',
    preCeremony: 'Kelvan & Sakhar Puda',
    music: 'Dhol-Tasha & Shehnai',
    flower: 'Jasmine & Genda',
    palette: 'Golden-Yellow, Peacock Green, Crimson',
    keyRituals: [
      { name: 'Seeman Puja', description: 'Welcoming the groom\'s family with respect and gifts', timing: 'Arrival' },
      { name: 'Antarpat', description: 'Silk cloth held between bride and groom before the first look', timing: 'Mandap' },
      { name: 'Saptapadi', description: 'Seven steps taken together around the sacred fire', timing: 'Culmination' }
    ]
  },
  {
    culture: 'Parsi',
    name: 'Ashirvad',
    script: 'Achu Michu',
    line: 'Ancient Zoroastrian blessings under a shower of rice grains and rose water, uniting two souls in divine harmony.',
    primaryCeremony: 'Ashirvad',
    preCeremony: 'Achu Michu & Madhavsoro',
    music: 'Persian classical strings',
    flower: 'White rose & Tuberose',
    palette: 'White, Ivory, Gold',
    keyRituals: [
      { name: 'Achu Michu', description: 'Purification ritual performed with egg, coconut, betel leaves, and water', timing: 'Stage Entry' },
      { name: 'Ara Antar', description: 'White cloth held between the couple while thread is wound around them seven times', timing: 'Blessing' },
      { name: 'Ashirvad', description: 'Senior priests recite prayers in Pazand shower rice grains upon the couple', timing: 'Nuptials' }
    ]
  }
];

const SERVICES = [
  { num: '01', title: 'Complete Wedding Planning', path: '/services/complete-planning', detail: 'End-to-end orchestration across every logistics layer — suppliers, timelines, legal ceremonies, and on-the-day direction.' },
  { num: '02', title: 'Destination Weddings', path: '/services/destination-weddings', detail: 'Royal palaces in Rajasthan, cliff-top resorts in Goa, Backwater retreats in Kerala.' },
  { num: '03', title: 'Cross-Cultural Ceremonies', path: '/services/cross-cultural', detail: 'When two traditions meet, we choreograph both. Unified timelines that honour each family\'s rituals without compromise.' },
  { num: '04', title: 'Traditional Ceremonies', path: '/services/traditional-ceremonies', detail: 'Deep-protocol traditional weddings rooted in regional authenticity.' },
  { num: '05', title: 'Venue Selection', path: '/services/venue-selection', detail: 'Exclusive access to private estates, heritage havelis, five-star ballrooms, and intimate garden courtyards.' },
  { num: '06', title: 'Decor & Floral Styling', path: '/services/decor-styling', detail: 'Handcrafted mandap structures, fresh-flower chandelier installations, calibrated ambient lighting, and regional textile staging.' },
  { num: '07', title: 'Photography & Film', path: '/services/photography-film', detail: 'Cinematic medium-format captures, vintage prime lenses, and Vogue-style visual storytelling.' },
  { num: '08', title: 'Entertainment Curation', path: '/services/entertainment', detail: 'Classical Bharatnatyam troupes, Sufi jugalbandis, folk dhols, and live ghazal quartets.' },
  { num: '09', title: 'Guest Experience', path: '/services/guest-experience', detail: 'Private seating ledgers, dietary management, accommodation logistics, and personalised itinerary booklets.' }
];

const DESTINATIONS = [
  { city: 'Udaipur', tag: 'City of Lakes', desc: 'Floating palace receptions on Lake Pichola. Royal processions through the City of Lakes.', venues: ['The Oberoi Udaivilas', 'Taj Lake Palace', 'Jagmandir Island Palace'] },
  { city: 'Jaipur', tag: 'The Pink City', desc: 'Heritage havelis and palace courtyards where every wall tells a story.', venues: ['Samode Palace', 'Rambagh Palace', 'Jai Mahal Palace'] },
  { city: 'Goa', tag: 'Coastal Heritage', desc: 'Clifftop chapels, beachside mandaps and Portuguese-heritage ballrooms.', venues: ['Taj Fort Aguada', 'Alila Diwa', 'Grand Hyatt Goa'] },
  { city: 'Kerala', tag: 'God\'s Own Country', desc: 'Backwater houseboats, temple courtyards, and spice-garden celebrations.', venues: ['Kumarakom Lake Resort', 'The Leela Kovalam', 'Brunton Boatyard'] }
];

exports.getTraditions = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const traditions = await Tradition.find().sort({ culture: 1 });
      if (traditions.length > 0) {
        return res.json({ success: true, count: traditions.length, data: traditions });
      }
    }
    res.json({ success: true, count: DEFAULT_TRADITIONS.length, data: DEFAULT_TRADITIONS });
  } catch (err) {
    next(err);
  }
};

exports.getServices = (req, res) => {
  res.json({ success: true, count: SERVICES.length, data: SERVICES });
};

exports.getDestinations = (req, res) => {
  res.json({ success: true, count: DESTINATIONS.length, data: DESTINATIONS });
};

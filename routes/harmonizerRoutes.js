const express = require('express');
const router = express.Router();
const dbService = require('../services/firebaseService');

// POST /api/harmonizer/blend
// Generates a tailored, harmonized cross-cultural wedding timeline
router.post('/blend', async (req, res) => {
  try {
    const { cultureA, cultureB, days = 2, preferences = {} } = req.body;

    if (!cultureA || !cultureB) {
      return res.status(400).json({
        success: false,
        message: 'Both cultureA and cultureB are required to generate a harmonized itinerary.'
      });
    }

    const allRituals = await dbService.getCollection('rituals');

    // Filter rituals matching both selected cultures
    const ritualsA = allRituals.filter(r => r.culture.toLowerCase() === cultureA.toLowerCase());
    const ritualsB = allRituals.filter(r => r.culture.toLowerCase() === cultureB.toLowerCase());

    // Generate harmonized multi-day schedule
    const timeline = [];
    const synergies = [];
    const guestGuideTips = [];

    // Cultural synergies & etiquette rules
    const key = [cultureA.toLowerCase(), cultureB.toLowerCase()].sort().join('_');

    if (key.includes('hindu') && key.includes('sikh')) {
      synergies.push(
        'Vedic Agni Ceremony and Anand Karaj can be scheduled on consecutive mornings or Day 2 morning & afternoon.',
        'Sangeet and Mehndi naturally blend both Punjabi and North Indian folk dances (Bhangra & Giddha + Garba).',
        'Head coverings (Rumal/Chunni) are provided for all guests attending the Gurdwara ceremony.'
      );
      guestGuideTips.push(
        { event: 'Haldi & Maiyan', tip: 'Wear bright yellow or mustard; oil and turmeric paste are applied joyously.' },
        { event: 'Anand Karaj', tip: 'Strictly cover head, remove footwear, and sit respectfully on the floor during Laavan hymns.' },
        { event: 'Saat Phere', tip: 'Auspicious flower petal showers during the 7 sacred steps around the holy fire.' }
      );
    } else if (key.includes('christian') && key.includes('hindu')) {
      synergies.push(
        'Dual-Ceremony Harmony: Church/Vows service followed by Evening Sangeet or Western Vows on Day 1 and Traditional Hindu Mandap on Day 2.',
        'Attire Elegance: Tuxedos/Gowns for the Western ceremony, colorful Lehengas/Sherwanis for Indian rituals.',
        'Bilingual vows with symbolic lighting of both Unity Candle and Sacred Agni Lamp.'
      );
      guestGuideTips.push(
        { event: 'Western Vows', tip: 'Formal cocktail or black-tie attire. Arrive 15 minutes before the bridal entrance.' },
        { event: 'Sangeet & Henna', tip: 'Festive Indian wear. Henna artists are stationed to decorate guests hands.' },
        { event: 'Mandap Ceremony', tip: 'Bright festive colors (avoid black or plain white). Shoes removed before mandap.' }
      );
    } else if (key.includes('muslim') && key.includes('hindu')) {
      synergies.push(
        'Shared Celebrations: Manjha & Haldi, followed by joint Mehndi & Sangeet musical evening.',
        'Nikah contract signing followed by celebratory royal reception feast with strictly segregated Halal and Jain/Vegetarian dining counters.',
        'Arsi Mushaf (mirror ceremony) and Joota Chupai (shoe stealing) create joyous shared family bonding.'
      );
      guestGuideTips.push(
        { event: 'Mehndi Night', tip: 'Emerald, teal, and gold colors. High-energy family dance performances.' },
        { event: 'Nikah', tip: 'Modest and elegant attire. Respectful silence while the Qazi recites the holy Khutbah.' }
      );
    } else {
      synergies.push(
        `Balanced schedule honoring both ${cultureA} and ${cultureB} heritage equally.`,
        'Bilingual ceremony program booklets provided to guests explaining each ritual in clear English.',
        'Fusion culinary banquet celebrating traditional recipes from both backgrounds.'
      );
      guestGuideTips.push(
        { event: 'Main Ceremonies', tip: 'Respectful festive attire honoring both traditions.' }
      );
    }

    // Build timeline blocks
    if (days >= 2) {
      // Day 1: Welcoming, Cleansing & Celebrations
      timeline.push({
        dayNumber: 1,
        dayTitle: 'Day 1: Cleansing, Artistry & Musical Sangeet',
        themeColor: '#D4AF37',
        events: [
          {
            time: '10:00 AM - 12:30 PM',
            title: `${cultureA} Cleansing Ritual (Haldi / Welcoming)`,
            origin: cultureA,
            dressCode: 'Yellow, Ochre, or Pastel Florals',
            description: 'Blessing the couple with auspicious cleansing herbs, rose petals, and joyful folk songs.'
          },
          {
            time: '02:00 PM - 05:00 PM',
            title: 'Joint Mehndi & Henna Lounge',
            origin: 'Shared Cultural Heritage',
            dressCode: 'Teal, Mint, or Emerald Green',
            description: 'Intricate henna application with artisanal chai, cocktails, and cultural music for all guests.'
          },
          {
            time: '07:30 PM - 11:30 PM',
            title: 'The Grand Sangeet & Welcome Reception',
            origin: 'Shared Celebration',
            dressCode: 'Regal Jewel Tones & Sequins',
            description: 'Synchronized family dances, live musical performances, and open dance floor.'
          }
        ]
      });

      // Day 2: Ceremonies & Grand Reception
      timeline.push({
        dayNumber: 2,
        dayTitle: `Day 2: Sacred Marriage Ceremonies (${cultureA} & ${cultureB})`,
        themeColor: '#6B1D2F',
        events: [
          {
            time: '09:30 AM - 11:00 AM',
            title: 'Baraat & Royal Greeting Procession',
            origin: cultureA,
            dressCode: 'Formal Traditional with Safa/Turban',
            description: 'High-voltage celebratory procession with live dhol beats and floral garland greeting.'
          },
          {
            time: '11:15 AM - 01:30 PM',
            title: `Sacred Vows / ${cultureA} Main Ceremony`,
            origin: cultureA,
            dressCode: 'Royal Red, Gold, or Crimson Attire',
            description: 'Solemn traditional nuptials with blessings from elders and community.'
          },
          {
            time: '03:30 PM - 05:30 PM',
            title: `${cultureB} Wedding Blessing / Nuptial Service`,
            origin: cultureB,
            dressCode: 'Elegant Ceremony Attire',
            description: `Ceremony honoring ${cultureB} faith and heritage with exchange of sacred covenants.`
          },
          {
            time: '07:30 PM - Late',
            title: 'Royal Fusion Gala Reception & Feast',
            origin: 'Unified Celebration',
            dressCode: 'Black Tie or Royal Luxury Lehengas',
            description: 'Gourmet banquet with dedicated dietary stations, toasts, cake cutting, and first dance.'
          }
        ]
      });
    }

    res.json({
      success: true,
      data: {
        cultureA,
        cultureB,
        totalDays: Number(days),
        synergies,
        guestGuideTips,
        timeline,
        applicableRituals: [...ritualsA, ...ritualsB]
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

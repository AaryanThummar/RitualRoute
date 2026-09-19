const WeddingBoard = require('../models/WeddingBoard');
const { getDbStatus } = require('../config/db');
const crypto = require('crypto');

// Cultural Knowledge Base
const RITUALS = {
  Punjabi: {
    primary: 'Anand Karaj',
    pre: 'Maiya & Chooda ceremony',
    music: 'Dhol & Bhangra',
    flower: 'Marigold & Rose',
    palette: 'Saffron, Red, Gold',
    script: 'Gurmukhi (ਅਨੰਦ ਕਾਰਜ)'
  },
  Tamil: {
    primary: 'Muhurtham',
    pre: 'Mangala Snaanam',
    music: 'Nadaswaram',
    flower: 'Jasmine & Banana leaf',
    palette: 'Gold, Red, White',
    script: 'Tamil (முகூர்த்தம்)'
  },
  Bengali: {
    primary: 'Shubho Drishti',
    pre: 'Aiburo Bhaat',
    music: 'Shanai & Ululation',
    flower: 'Shiuli & Tuberose',
    palette: 'Red, White, Gold',
    script: 'Bengali (শুভদৃষ্টি)'
  },
  Gujarati: {
    primary: 'Mangalfera',
    pre: 'Pithi ceremony',
    music: 'Garba & Dandiya',
    flower: 'Marigold & Mogra',
    palette: 'Yellow, Red, Green',
    script: 'Gujarati (મંગલફેરા)'
  },
  Marathi: {
    primary: 'Saptapadi',
    pre: 'Haldi & Kelvan',
    music: 'Dhol-Tasha & Shehnai',
    flower: 'Jasmine & Genda',
    palette: 'Golden-Yellow, Red',
    script: 'Devanagari (सप्तपदी)'
  },
  Rajasthani: {
    primary: 'Pheras',
    pre: 'Pithi & Mehendi',
    music: 'Kalbeliya folk',
    flower: 'Rose & Marigold',
    palette: 'Pink, Orange, Gold',
    script: 'Rajasthani (फेरा)'
  },
  Goan: {
    primary: 'Church Nuptials / Civil Rites',
    pre: 'Roce ceremony',
    music: 'Mando folk ensemble & Brass Band',
    flower: 'Orchid & Frangipani',
    palette: 'White, Gold, Coral',
    script: 'Konkani / Latin script'
  },
  Parsi: {
    primary: 'Ashirvad',
    pre: 'Achu Michu',
    music: 'Persian classical strings & Western ensemble',
    flower: 'White rose & Tuberose',
    palette: 'White, Ivory, Gold',
    script: 'Avestan / Gujarati script'
  },
  'Kerala (Malayali)': {
    primary: 'Sadya feast & Tying the Thali',
    pre: 'Nischayathartham',
    music: 'Panchavadyam drums & Sopana Sangeetham',
    flower: 'Jasmine & Tender Coconut Leaf',
    palette: 'Kasavu Gold, White, Temple Green',
    script: 'Malayalam (താലികെട്ട്)'
  },
  Kashmiri: {
    primary: 'Lagan',
    pre: 'Klivam & Devgon',
    music: 'Santoor & Chakri folk',
    flower: 'Saffron blossom & Almond petals',
    palette: 'Crimson, Brocade Gold, Turquoise',
    script: 'Sharada / Devanagari'
  },
  Sindhi: {
    primary: 'Lada & Hathiyalo',
    pre: 'Sanwree & Jenya',
    music: 'Shehnai & Sufi Qawwali',
    flower: 'Rose & Lily',
    palette: 'Bright Vermilion, Royal Gold',
    script: 'Sindhi'
  },
  default: {
    primary: 'Sacred Vows Ceremony',
    pre: 'Pre-wedding blessing',
    music: 'Classical chamber ensemble',
    flower: 'Mixed seasonal heirloom florals',
    palette: 'Gold, Ivory, Maroon',
    script: 'Classical Devanagari'
  }
};

function synthesizeCuration({ bride, groom, prefs }) {
  const isFusion = bride.religion !== groom.religion || bride.community !== groom.community;
  const b = bride.community || 'Punjabi';
  const g = groom.community || 'Tamil';
  const br = bride.religion || 'Hindu';
  const gr = groom.religion || 'Hindu';

  const bR = RITUALS[b] || RITUALS.default;
  const gR = RITUALS[g] || RITUALS.default;

  if (!isFusion) {
    const r = bR;
    return {
      isFusion: false,
      weddingType: `Traditional ${b} ${br} Wedding`,
      overview: `A complete traditional ${b} wedding experience rooted in authentic protocol and heritage. Every element — from the pre-wedding ceremonies to the post-ceremony feast — honours the ${b} ${br} tradition with precision and reverence.`,
      ceremony: {
        title: r.primary,
        description: `The central ceremony follows the sacred rites of the ${b} ${br} tradition. Pre-wedding events begin with ${r.pre}, building through to the main ceremony with all family rituals observed in their correct order.`,
        timeline: [
          { time: '6:00 AM', event: r.pre, detail: 'Sacred pre-wedding preparation involving family elders and priests.' },
          { time: '9:00 AM', event: 'Baraat / Arrival Procession', detail: `The groom's arrival, accompanied by ${r.music}.` },
          { time: '11:00 AM', event: r.primary, detail: 'The central sacred ceremony. Vows exchanged under the consecrated mandap.' },
          { time: '2:00 PM', event: 'The Grand Feast', detail: `Traditional ${b} cuisine served to all guests, family style.` },
          { time: '7:00 PM', event: 'Reception & Celebration', detail: 'An evening reception with music, dance, and family blessings.' },
        ]
      },
      decor: {
        title: `${b} Heritage Decor Language`,
        palette: r.palette,
        florals: r.flower,
        description: `A stunning mandap built around the architectural aesthetic of the ${b} tradition. Draped in ${r.flower} arrangements with a colour palette of ${r.palette}.`,
      },
      cuisine: {
        title: `Authentic ${b} Gastronomy`,
        description: `An authentic ${b} spread curated by regional specialists. From welcome appetisers through to dessert, every dish is sourced from ancestral recipes.`,
        highlights: [
          `Traditional ${b} main course spread with 12+ signature dishes`,
          `Regional sweet preparations and artisanal mithai`,
          `Welcome botanical drinks featuring local flavours`,
          `Late-night street food station with regional bites`,
        ]
      },
      venue: {
        title: 'Curated Heritage Venues',
        recommendations: [
          { name: 'Samode Palace, Jaipur', detail: 'Heritage palace with ornate courtyards perfect for traditional ceremonies.' },
          { name: 'The Oberoi Udaivilas, Udaipur', detail: 'Lakeside luxury with private wedding pavilions.' },
          { name: 'Taj Falaknuma Palace, Hyderabad', detail: 'Royal Nizam palace with unmatched grand scale.' },
        ],
      },
      outfit: {
        title: 'Heirloom Couture Direction',
        bride: `Traditional ${b} bridal ensemble — regional handloom textiles in ${r.palette} with heirloom jewellery.`,
        groom: `Traditional ${b} groom's attire — regional formal attire with handcrafted accessories.`,
      },
      invite: {
        title: 'Heritage Boxed Invitation Suite',
        description: `A luxury boxed invitation suite in ${r.palette} tones. Handmade deckle-edge paper with letterpress printing, regional floral motifs, and traditional ${r.script} script.`,
      },
      photography: {
        title: 'Visual Chronicle Direction',
        description: `Documentary photography briefed on every sacred moment of the ${b} ceremony — from pre-dawn blessings to the final farewell.`,
        style: 'Editorial documentary — medium format film aesthetic',
      },
      music: {
        title: 'Traditional Ensemble Curation',
        description: `${r.music} performers sourced from heritage troupes. Devotional classical music at dawn, transitioning to celebratory compositions at night.`,
      }
    };
  }

  // FUSION WEDDING
  return {
    isFusion: true,
    weddingType: `${b} × ${g} Fusion Wedding`,
    overview: `A beautifully choreographed union of the ${b} (${br}) and ${g} (${gr}) traditions. Our concierge has synthesized a dual-protocol timeline that gives equal prominence to both families' sacred rituals, with zero compromise on either side.`,
    ceremony: {
      title: `${bR.primary} & ${gR.primary}`,
      description: `Two ceremonies, one cohesive day. We have structured the timeline to give both families their full ritual experiences — not shortened approximations, but complete ceremonies that coexist harmoniously.`,
      timeline: [
        { time: '6:30 AM', event: `Bride's ${bR.pre}`, detail: `Sacred preparation from the ${b} tradition with the bride's family.` },
        { time: '9:00 AM', event: `Groom's ${gR.pre}`, detail: `Sacred preparation from the ${g} tradition with the groom's family.` },
        { time: '11:00 AM', event: bR.primary, detail: `The ${b} ceremony in full, with all sacred rituals observed. Groom's family warmly invited to witness.` },
        { time: '3:30 PM', event: gR.primary, detail: `The ${g} ceremony in full, with all rituals observed. Bride's family warmly invited to witness.` },
        { time: '7:30 PM', event: 'The Joint Grand Reception', detail: 'A shared celebratory evening bringing both families together, featuring music and culinary creations from both heritages.' },
      ]
    },
    decor: {
      title: 'Fusion Decor Language',
      palette: `${bR.palette} × ${gR.palette}`,
      florals: `${bR.flower} & ${gR.flower}`,
      description: `A thoughtfully designed space that speaks both visual languages simultaneously. ${bR.flower} on one wing of the pavilion; ${gR.flower} on the other — seamlessly converging where the couple stands. Colour transitions from ${bR.palette} to ${gR.palette} across the grounds.`,
    },
    cuisine: {
      title: 'Dual-Heritage Gastronomy Experience',
      description: `A curated culinary dialogue between both traditions. Designed to introduce each family's signature flavours to the other with context cards and guided tastings.`,
      highlights: [
        `${b} signature appetisers paired alongside ${g} welcome delicacies`,
        `A dual-buffet spread with cultural provenance storytelling cards`,
        `Harmonized dessert pavilion featuring traditional sweets from both regions`,
        `Bespoke botanical cocktail bar infused with regional spices from both traditions`,
      ]
    },
    venue: {
      title: 'Fusion-Ready Multi-Courtyard Venues',
      recommendations: [
        { name: 'Taj Fort Aguada, Goa', detail: 'Versatile Portuguese-heritage coastal resort accommodating dual ceremony spaces with ease.' },
        { name: 'The Leela Palace, Bengaluru', detail: 'Grand ballrooms and garden terraces handling dual-protocol logistics with distinction.' },
        { name: 'Suján Jawai, Rajasthan', detail: 'Intimate luxury wilderness retreat under open skies for bespoke ceremonial transitions.' },
      ],
    },
    outfit: {
      title: 'Cross-Cultural Couture Synthesis',
      bride: `Wears traditional ${b} bridal attire for the ${bR.primary}, then transitions into a ${g}-inspired reception ensemble referencing ${g} textile craftsmanship.`,
      groom: `Wears traditional ${g} attire for the ${gR.primary}, complemented by an heirloom accent in the ${b} tradition (safa, shawl, or brooch) honoring his partner.`,
    },
    invite: {
      title: 'Dual-Script Letterpress Invitation Suite',
      description: `A layered invitation box displaying ${bR.script} alongside ${gR.script} with equal visual weight. Crafted on handmade deckle-edge paper and sealed with custom monograms.`,
    },
    photography: {
      title: 'Dual-Chronicle Photography',
      description: `Two specialized photography units shooting in synchrony. The final chronicle weaves both morning preparations and ceremonies into a single unified heirloom album.`,
      style: 'Parallel documentary + joint fine-art portraits',
    },
    music: {
      title: 'Curated Two-Tradition Musical Dialogue',
      description: `${bR.music} during morning ceremonies; ${gR.music} during afternoon rituals. For the evening gala, an acoustic ensemble weaves both traditions into a sophisticated celebratory soundscape.`,
    }
  };
}

// Fallback memory cache
const fallbackBoards = [];

// @desc    Generate a new wedding curation plan and persist it
// @route   POST /api/curation/generate
exports.generateBoard = async (req, res, next) => {
  try {
    const { bride, groom, prefs } = req.body;

    if (!bride || !groom) {
      return res.status(400).json({
        success: false,
        error: 'Bride and groom profiles are required',
      });
    }

    const curation = synthesizeCuration({ bride, groom, prefs: prefs || {} });
    const shareId = 'board_' + crypto.randomBytes(4).toString('hex');

    const boardData = {
      shareId,
      bride,
      groom,
      prefs: prefs || {},
      curation,
    };

    let savedBoard;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      savedBoard = await WeddingBoard.create(boardData);
    } else {
      savedBoard = {
        _id: 'wb_' + Date.now(),
        ...boardData,
        createdAt: new Date().toISOString(),
      };
      fallbackBoards.unshift(savedBoard);
    }

    res.status(201).json({
      success: true,
      message: 'Wedding curation board generated successfully',
      data: savedBoard,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all saved wedding curation boards
// @route   GET /api/curation
exports.getBoards = async (req, res, next) => {
  try {
    const dbStatus = getDbStatus();
    if (dbStatus.connected) {
      const boards = await WeddingBoard.find({ isPublic: true }).sort({ createdAt: -1 }).limit(20);
      return res.json({ success: true, count: boards.length, data: boards });
    }

    res.json({
      success: true,
      count: fallbackBoards.length,
      data: fallbackBoards,
      source: 'memory-fallback'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get a specific board by shareId or MongoDB ID
// @route   GET /api/curation/:id
exports.getBoardById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const dbStatus = getDbStatus();

    if (dbStatus.connected) {
      const board = await WeddingBoard.findOne({
        $or: [{ shareId: id }, ...(id.match(/^[0-9a-fA-F]{24}$/) ? [{ _id: id }] : [])]
      });

      if (!board) {
        return res.status(404).json({ success: false, error: 'Wedding board not found' });
      }
      return res.json({ success: true, data: board });
    }

    const item = fallbackBoards.find(b => b.shareId === id || b._id === id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Wedding board not found' });
    }
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

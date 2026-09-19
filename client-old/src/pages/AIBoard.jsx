import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Calendar, Heart, MapPin, Camera, Music, BookOpen, Utensils, Shirt } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../components/foundation';
import coupleImg  from '../assets/hero_couple.png';
import decorImg   from '../assets/luxury_wedding_decor.png';
import mandapImg  from '../assets/mandap_hero.png';
import palaceImg  from '../assets/palace_destination.png';
import bridalImg  from '../assets/bridal_details.png';

/* ─────────────────────────────────────────────────────────
   DATA LAYER — Curation Knowledge Base
───────────────────────────────────────────────────────── */
const RELIGIONS = ['Hindu', 'Sikh', 'Muslim', 'Christian', 'Parsi (Zoroastrian)', 'Jain', 'Buddhist', 'Jewish'];
const COMMUNITIES = ['Punjabi', 'Tamil', 'Bengali', 'Gujarati', 'Marathi', 'Rajasthani', 'Goan', 'Parsi', 'Kashmiri', 'Sindhi', 'Kerala (Malayali)', 'Kannada'];
const STATES = ['Delhi', 'Punjab', 'Tamil Nadu', 'West Bengal', 'Gujarat', 'Maharashtra', 'Rajasthan', 'Goa', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Uttar Pradesh'];
const BUDGETS = ['₹25–50 Lakhs (Intimate)', '₹50L–1 Cr (Premium)', '₹1–3 Cr (Luxury)', '₹3 Cr+ (Royal)'];
const GUEST_COUNTS = ['Under 100', '100–250', '250–500', '500–1000', '1000+'];
const VENUE_TYPES = ['Heritage Palace', 'Luxury Hotel Ballroom', 'Beach Resort', 'Garden Estate', 'Temple Complex', 'Haveli / Farmhouse'];

/* ─────────────────────────────────────────────────────────
   CURATION ENGINE — Generates structured wedding plan
───────────────────────────────────────────────────────── */
function generateCuration({ bride, groom, prefs }) {
  const isFusion = bride.religion !== groom.religion || bride.community !== groom.community;
  const b = bride.community;
  const g = groom.community;
  const br = bride.religion;
  const gr = groom.religion;

  // Ritual knowledge
  const rituals = {
    Punjabi:   { primary: 'Anand Karaj', pre: 'Maiya & Chooda ceremony', music: 'Dhol & Bhangra', flower: 'Marigold & Rose', palette: 'Saffron, Red, Gold' },
    Tamil:     { primary: 'Muhurtham', pre: 'Mangala Snaanam', music: 'Nadaswaram', flower: 'Jasmine & Banana leaf', palette: 'Gold, Red, White' },
    Bengali:   { primary: 'Shubho Drishti', pre: 'Aiburo Bhaat', music: 'Shanai & Ululation', flower: 'Shiuli & Tuberose', palette: 'Red, White, Gold' },
    Gujarati:  { primary: 'Mangalfera', pre: 'Pithi ceremony', music: 'Garba & Dandiya', flower: 'Marigold & Mogra', palette: 'Yellow, Red, Green' },
    Marathi:   { primary: 'Saptapadi', pre: 'Haldi & Kelvan', music: 'Dhol-Tasha & Shehnai', flower: 'Jasmine & Genda', palette: 'Golden-Yellow, Red' },
    Rajasthani:{ primary: 'Pheras', pre: 'Pithi & Mehendi', music: 'Kalbeliya folk', flower: 'Rose & Marigold', palette: 'Pink, Orange, Gold' },
    Goan:      { primary: 'Church / Civil', pre: 'Roce ceremony', music: 'Mando folk band', flower: 'Orchid & Frangipani', palette: 'White, Gold, Coral' },
    Parsi:     { primary: 'Ashirvad', pre: 'Achu Michu', music: 'Persian classical strings', flower: 'White rose & Tuberose', palette: 'White, Ivory, Gold' },
    'Kerala (Malayali)': { primary: 'Sadya feast & Tying the Thali', pre: 'Nischayathartham', music: 'Panchavadyam drums', flower: 'Jasmine & Banana', palette: 'Gold, White, Green' },
    default:   { primary: 'Sacred Vows Ceremony', pre: 'Pre-wedding blessing', music: 'Classical ensemble', flower: 'Mixed seasonal flowers', palette: 'Gold, Ivory, Maroon' },
  };

  const bR = rituals[b] || rituals.default;
  const gR = rituals[g] || rituals.default;

  // Generate based on fusion or traditional
  if (!isFusion) {
    const r = bR;
    return {
      isFusion: false,
      weddingType: `Traditional ${b} ${br} Wedding`,
      coverImg: coupleImg,
      overview: `A complete traditional ${b} wedding experience, rooted in authentic protocol and regional heritage. Every element — from the pre-wedding ceremonies to the post-ceremony feast — follows the ${b} ${br} tradition with precision and reverence.`,
      ceremony: {
        title: r.primary,
        description: `The central ceremony follows the sacred rites of the ${b} ${br} tradition. Pre-wedding events begin with ${r.pre}, building through to the main ceremony with all family rituals observed in their correct order.`,
        timeline: [
          { time: '6:00 AM', event: r.pre, detail: 'Sacred pre-wedding preparation involving family elders and priests.' },
          { time: '9:00 AM', event: 'Baraat / Arrival Procession', detail: `The groom's arrival, accompanied by ${r.music}.` },
          { time: '11:00 AM', event: r.primary, detail: 'The central sacred ceremony. Vows exchanged under the mandap.' },
          { time: '2:00 PM', event: 'The Grand Feast', detail: `Traditional ${b} cuisine served to all guests, family style.` },
          { time: '7:00 PM', event: 'Reception & Celebration', detail: 'An evening reception with music, dance, and family blessings.' },
        ]
      },
      decor: {
        title: `${b} Heritage Decor`,
        palette: r.palette,
        florals: r.flower,
        description: `A stunning mandap built around the aesthetic language of the ${b} tradition. Draped in ${r.flower} arrangements with a colour palette of ${r.palette}, the space is designed to feel both sacred and spectacular.`,
        img: mandapImg,
      },
      cuisine: {
        title: `Traditional ${b} Feast`,
        description: `An authentic ${b} spread curated by our regional specialists. From the welcome appetisers through to the dessert service, every dish is sourced from traditional recipes, using regional spices and preparation methods.`,
        highlights: [
          `Traditional ${b} main course spread with 12+ signature dishes`,
          `Regional sweet preparations and mithai`,
          `Welcome drinks featuring local specialties`,
          `Late-night street food station with regional snacks`,
        ]
      },
      venue: {
        title: 'Curated Venue Suggestions',
        recommendations: [
          { name: 'Samode Palace, Jaipur', detail: 'Heritage palace with ornate courtyards perfect for traditional ceremonies.' },
          { name: 'The Oberoi Udaivilas, Udaipur', detail: 'Lakeside luxury with private wedding pavilions.' },
          { name: 'Taj Falaknuma Palace, Hyderabad', detail: 'Royal Nizam palace with unmatched grandeur.' },
        ],
        img: palaceImg,
      },
      outfit: {
        title: 'Couture Direction',
        bride: `Traditional ${b} bridal ensemble — regional handloom textiles in ${r.palette} with heritage jewellery.`,
        groom: `Traditional ${b} groom's attire — ${b === 'Punjabi' ? 'cream sherwani with zardozi embroidery' : b === 'Tamil' ? 'silk Veshti with gold border' : 'regional formal attire'} and traditional accessories.`,
        img: bridalImg,
      },
      invite: {
        title: 'Invitation Design',
        description: `A luxury boxed invitation suite in ${r.palette} tones. Handmade paper with letterpress printing, regional floral motifs, and traditional script. Enclosed with ${r.flower} dried petals and a personalised calligraphy card.`,
      },
      photography: {
        title: 'Visual Chronicle Direction',
        description: `Our photographers are briefed on every moment of the ${b} ceremony — from the emotional pre-dawn ${r.pre} to the final farewell. The edit combines cinematic wide-angle ritual documentation with intimate portrait sessions during natural golden-hour light.`,
        style: `Editorial documentary — medium format film aesthetic`,
        img: decorImg,
      },
      music: {
        title: 'Entertainment Curation',
        description: `${r.music} performers sourced from the finest regional troupes. Morning ceremony accompanied by classical devotional music. Evening reception featuring a curated playlist that transitions from traditional to contemporary.`,
      }
    };
  }

  // FUSION
  return {
    isFusion: true,
    weddingType: `${b} × ${g} Fusion Wedding`,
    coverImg: coupleImg,
    overview: `A beautifully choreographed fusion of the ${b} (${br}) and ${g} (${gr}) traditions. Our concierge has designed a dual-protocol timeline that gives equal prominence to both families' most important rituals, with zero compromise on either side.`,
    ceremony: {
      title: `${bR.primary} & ${gR.primary}`,
      description: `Two ceremonies, one cohesive day. We have structured the timeline to give both families their full ritual experiences — not shortened versions, not combined approximations, but complete ceremonies that coexist harmoniously.`,
      timeline: [
        { time: '6:30 AM', event: `Bride's ${bR.pre}`, detail: `Sacred preparation from the ${b} tradition with the bride's family.` },
        { time: '9:00 AM', event: gR.pre, detail: `Sacred preparation from the ${g} tradition with the groom's family.` },
        { time: '11:00 AM', event: bR.primary, detail: `The ${b} ceremony in full, with all rituals observed. Groom's family invited to witness.` },
        { time: '3:00 PM', event: gR.primary, detail: `The ${g} ceremony in full, with all rituals observed. Bride's family invited to witness.` },
        { time: '7:00 PM', event: 'The Joint Reception', detail: 'A shared celebration bringing both families together, featuring music from both traditions.' },
      ]
    },
    decor: {
      title: 'Fusion Decor Language',
      palette: `${bR.palette} × ${gR.palette}`,
      florals: `${bR.flower} & ${gR.flower}`,
      description: `A thoughtfully designed space that speaks both visual languages simultaneously. ${bR.flower} on one side of the mandap; ${gR.flower} on the other — merging at the centre point where the couple stands. Colour transitions from ${bR.palette} tones to ${gR.palette} tones across the venue layout.`,
      img: mandapImg,
    },
    cuisine: {
      title: 'Fusion Gastronomy Experience',
      description: `A curated culinary dialogue between both traditions. Our culinary team has designed a menu that introduces each family's signature flavours to the other — creating genuine moments of discovery alongside the familiar comfort of home cooking.`,
      highlights: [
        `${b} signature appetisers alongside ${g} welcome bites`,
        `A dual main course spread with labelled cultural context cards`,
        `Combined mithai and dessert table featuring both traditions`,
        `Regional spice-pairing cocktail bar designed around both cuisines`,
      ]
    },
    venue: {
      title: 'Fusion-Ready Venue Suggestions',
      recommendations: [
        { name: 'Taj Fort Aguada, Goa', detail: 'Versatile Portuguese-heritage resort that accommodates multi-ceremony formats across separate courtyards.' },
        { name: 'The Leela Palace, Bangalore', detail: 'Grand ballrooms and outdoor spaces that handle dual-ceremony logistics with elegance.' },
        { name: 'Suján Jawai, Rajasthan', detail: 'Remote luxury tented camp with intimate spaces for private ceremonies under open skies.' },
      ],
      img: palaceImg,
    },
    outfit: {
      title: 'Cross-Cultural Couture Direction',
      bride: `The bride wears a traditional ${b} bridal ensemble for the ${bR.primary}, then changes into a ${g}-inspired contemporary reception look that references ${g} textile traditions without literal costume.`,
      groom: `The groom wears traditional ${g} attire for the ${gR.primary}, with a subtle accent accessory in the ${b} tradition — a safa, dupatta, or jewellery piece — that acknowledges his partner's heritage.`,
      img: bridalImg,
    },
    invite: {
      title: 'Dual-Script Invitation Suite',
      description: `A layered invitation box featuring both scripts — ${br === 'Sikh' ? 'Gurmukhi' : br === 'Hindu' ? 'Devanagari' : 'Arabic/Perso-Arabic'} and ${gr === 'Hindu' ? 'Sanskrit/Regional' : gr === 'Christian' ? 'Latin script' : 'Regional script'} — on the same card, side by side, with equal visual weight. The outer box carries a unified motif derived from the artistic traditions of both cultures.`,
    },
    photography: {
      title: 'Dual-Chronicle Photography',
      description: `Two photography teams, each specialising in one tradition, shooting in parallel throughout the day. The final edit is woven together into a single visual narrative that traces the full emotional arc — from both families' morning preparations to the joint reception finale.`,
      style: `Parallel documentary + joint editorial portraits`,
      img: decorImg,
    },
    music: {
      title: 'Two-Tradition Music Curation',
      description: `${bR.music} for the ${b} ceremony. ${gR.music} for the ${g} ceremony. For the reception, our music director designs a transitional set that weaves both musical heritages into a shared celebratory sound — not a mashup, but a curated dialogue.`,
    }
  };
}

/* ─────────────────────────────────────────────────────────
   OUTPUT MODULE CARD
───────────────────────────────────────────────────────── */
function ModuleCard({ icon: Icon, label, index, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="ai-module-card"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <span className="editorial-overline">{label}</span>
      </div>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────
   GENERATED BOARD OUTPUT
───────────────────────────────────────────────────────── */
function CurationBoard({ data }) {
  return (
    <div id="board-output" className="space-y-6 md:space-y-8">

      {/* Cover card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden border border-gold/20"
        style={{ height: '360px' }}
      >
        <img src={data.coverImg} alt="Wedding Cover" className="w-full h-full object-cover filter brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-black/90 via-maroon-black/40 to-transparent flex items-center px-10 md:px-16">
          <div>
            <span className={`inline-block px-3 py-1 text-[9px] font-semibold tracking-[0.2em] uppercase mb-4 ${data.isFusion ? 'bg-gold text-maroon-black' : 'border border-gold/50 text-gold'}`}>
              {data.isFusion ? 'Fusion Wedding' : 'Traditional Wedding'}
            </span>
            <h2 className="font-cinzel text-2xl md:text-4xl font-bold text-ivory mb-3 tracking-wide">{data.weddingType}</h2>
            <p className="editorial-pullquote text-base md:text-lg text-champagne/80 max-w-md leading-relaxed">{data.overview}</p>
          </div>
        </div>
      </motion.div>

      {/* 8 Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Ceremony */}
        <ModuleCard icon={Calendar} label="01 / Ceremony Design" index={1}>
          <h3 className="font-cinzel text-base font-bold text-ivory mb-3">{data.ceremony.title}</h3>
          <p className="editorial-body mb-5">{data.ceremony.description}</p>
          <div className="space-y-3">
            {data.ceremony.timeline.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="font-cinzel text-[9px] text-gold font-bold w-16 flex-shrink-0 mt-0.5">{step.time}</span>
                <div>
                  <p className="font-cinzel text-[11px] text-ivory font-semibold tracking-wide">{step.event}</p>
                  <p className="editorial-body text-[11px]">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </ModuleCard>

        {/* Decor */}
        <ModuleCard icon={Heart} label="02 / Decor & Florals" index={2}>
          <div className="relative overflow-hidden border border-gold/15 mb-5" style={{ height: '160px' }}>
            <img src={data.decor.img} alt="Decor" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-2">{data.decor.title}</h3>
          <div className="flex gap-4 mb-3">
            <div>
              <span className="editorial-overline block mb-1">Palette</span>
              <p className="text-ivory/70 text-[11px]">{data.decor.palette}</p>
            </div>
            <div>
              <span className="editorial-overline block mb-1">Florals</span>
              <p className="text-ivory/70 text-[11px]">{data.decor.florals}</p>
            </div>
          </div>
          <p className="editorial-body">{data.decor.description}</p>
        </ModuleCard>

        {/* Cuisine */}
        <ModuleCard icon={Utensils} label="03 / Cuisine Curation" index={3}>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-3">{data.cuisine.title}</h3>
          <p className="editorial-body mb-5">{data.cuisine.description}</p>
          <ul className="space-y-2">
            {data.cuisine.highlights.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-gold text-xs flex-shrink-0 mt-0.5">✦</span>
                <span className="editorial-body text-[11px]">{item}</span>
              </li>
            ))}
          </ul>
        </ModuleCard>

        {/* Venue */}
        <ModuleCard icon={MapPin} label="04 / Venue Recommendations" index={4}>
          <div className="relative overflow-hidden border border-gold/15 mb-5" style={{ height: '130px' }}>
            <img src={data.venue.img} alt="Venue" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-4">{data.venue.title}</h3>
          <div className="space-y-4">
            {data.venue.recommendations.map((v, i) => (
              <div key={i} className="border-l border-gold/20 pl-4">
                <p className="font-cinzel text-[11px] font-bold text-ivory tracking-wide">{v.name}</p>
                <p className="editorial-body text-[11px] mt-0.5">{v.detail}</p>
              </div>
            ))}
          </div>
        </ModuleCard>

        {/* Outfit */}
        <ModuleCard icon={Shirt} label="05 / Couture Direction" index={5}>
          <div className="relative overflow-hidden border border-gold/15 mb-5" style={{ height: '160px' }}>
            <img src={data.outfit.img} alt="Couture" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-4">{data.outfit.title}</h3>
          <div className="space-y-4">
            <div>
              <span className="editorial-overline block mb-2">Bride</span>
              <p className="editorial-body">{data.outfit.bride}</p>
            </div>
            <div>
              <span className="editorial-overline block mb-2">Groom</span>
              <p className="editorial-body">{data.outfit.groom}</p>
            </div>
          </div>
        </ModuleCard>

        {/* Invitation */}
        <ModuleCard icon={BookOpen} label="06 / Invitation Design" index={6}>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-3">{data.invite.title}</h3>
          <p className="editorial-body">{data.invite.description}</p>
        </ModuleCard>

        {/* Photography */}
        <ModuleCard icon={Camera} label="07 / Photography Direction" index={7}>
          <div className="relative overflow-hidden border border-gold/15 mb-5" style={{ height: '130px' }}>
            <img src={data.photography.img} alt="Photography" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-2">{data.photography.title}</h3>
          <span className="editorial-overline block mb-3">{data.photography.style}</span>
          <p className="editorial-body">{data.photography.description}</p>
        </ModuleCard>

        {/* Music */}
        <ModuleCard icon={Music} label="08 / Music & Entertainment" index={8}>
          <h3 className="font-cinzel text-sm font-bold text-ivory mb-3">{data.music.title}</h3>
          <p className="editorial-body">{data.music.description}</p>
          <div className="mt-6 border-t border-gold/10 pt-5">
            <span className="editorial-overline block mb-3">Ready to proceed?</span>
            <Link to="#contact">
              <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 cursor-pointer">
                Contact the Atelier →
              </span>
            </Link>
          </div>
        </ModuleCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FIELD GROUP COMPONENT
───────────────────────────────────────────────────────── */
function FieldGroup({ label, children }) {
  return (
    <div>
      <label className="editorial-overline block mb-2.5">{label}</label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN AI BOARD PAGE
───────────────────────────────────────────────────────── */
export default function AIBoard() {
  const [bride, setBride] = useState({ religion: 'Hindu', community: 'Punjabi', state: 'Delhi', language: 'Punjabi' });
  const [groom, setGroom] = useState({ religion: 'Hindu', community: 'Tamil', state: 'Tamil Nadu', language: 'Tamil' });
  const [prefs, setPrefs] = useState({ budget: '₹1–3 Cr (Luxury)', guests: '250–500', venue: 'Heritage Palace', decor: 'Marigold & Lotus', food: 'Traditional + Fusion Buffet' });
  const [board, setBoard] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setBoard(null);

    try {
      const res = await fetch('/api/curation/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bride, groom, prefs }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.curation) {
          const c = json.data.curation;
          // Hydrate with local visual assets for rich rendering
          c.coverImg = coupleImg;
          if (c.decor) c.decor.img = mandapImg;
          if (c.venue) c.venue.img = palaceImg;
          if (c.outfit) c.outfit.img = bridalImg;
          if (c.photography) c.photography.img = decorImg;
          setBoard(c);
        } else {
          setBoard(generateCuration({ bride, groom, prefs }));
        }
      } else {
        setBoard(generateCuration({ bride, groom, prefs }));
      }
    } catch {
      setBoard(generateCuration({ bride, groom, prefs }));
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        document.getElementById('board-output')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  };

  return (
    <div className="min-h-screen bg-maroon-black pt-24 pb-20">

      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-champagne/40 hover:text-gold text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Heritage & Harmony
          </Link>
        </div>

        <ScrollFade>
          <span className="editorial-overline block mb-5">The Intelligence</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            AI Wedding<br />
            <span className="text-gold">Concierge</span><br />
            Board
          </h1>
          <span className="gold-line block mb-7" />
          <p className="editorial-pullquote text-lg md:text-2xl text-champagne/75 max-w-2xl leading-relaxed">
            Enter the details of both partners. Our concierge generates a complete, personalised wedding plan — either deeply traditional or beautifully fused.
          </p>
        </ScrollFade>
      </div>

      {/* Questionnaire */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <form onSubmit={handleGenerate}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10">

            {/* Bride Profile */}
            <div className="lg:col-span-5 border border-gold/15 p-8 md:p-10 bg-maroon/30 relative">
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-gold/5 pointer-events-none" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center">
                  <span className="text-gold text-[10px]">♀</span>
                </div>
                <span className="editorial-overline">Bride's Profile</span>
              </div>

              <div className="space-y-6">
                <FieldGroup label="Religion">
                  <select value={bride.religion} onChange={e => setBride({...bride, religion: e.target.value})} className="luxury-select">
                    {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Community">
                  <select value={bride.community} onChange={e => setBride({...bride, community: e.target.value})} className="luxury-select">
                    {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Home State">
                  <select value={bride.state} onChange={e => setBride({...bride, state: e.target.value})} className="luxury-select">
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Primary Language">
                  <input type="text" value={bride.language} onChange={e => setBride({...bride, language: e.target.value})}
                    placeholder="e.g. Punjabi, Hindi..." className="luxury-input" />
                </FieldGroup>
              </div>
            </div>

            {/* Centre connector */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center py-4 lg:py-0">
              <div className="flex flex-row lg:flex-col items-center gap-3">
                <span className="w-8 h-px lg:w-px lg:h-8 bg-gold/20 block" />
                <span className="text-gold font-cinzel text-xs tracking-widest">✦</span>
                <span className="w-8 h-px lg:w-px lg:h-8 bg-gold/20 block" />
              </div>
            </div>

            {/* Groom Profile */}
            <div className="lg:col-span-5 border border-gold/15 p-8 md:p-10 bg-maroon/30 relative">
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-gold/5 pointer-events-none" />
              <div className="flex items-center gap-3 mb-8">
                <div className="w-7 h-7 rounded-full border border-gold/40 flex items-center justify-center">
                  <span className="text-gold text-[10px]">♂</span>
                </div>
                <span className="editorial-overline">Groom's Profile</span>
              </div>

              <div className="space-y-6">
                <FieldGroup label="Religion">
                  <select value={groom.religion} onChange={e => setGroom({...groom, religion: e.target.value})} className="luxury-select">
                    {RELIGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Community">
                  <select value={groom.community} onChange={e => setGroom({...groom, community: e.target.value})} className="luxury-select">
                    {COMMUNITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Home State">
                  <select value={groom.state} onChange={e => setGroom({...groom, state: e.target.value})} className="luxury-select">
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </FieldGroup>
                <FieldGroup label="Primary Language">
                  <input type="text" value={groom.language} onChange={e => setGroom({...groom, language: e.target.value})}
                    placeholder="e.g. Tamil, Telugu..." className="luxury-input" />
                </FieldGroup>
              </div>
            </div>
          </div>

          {/* Wedding Preferences */}
          <div className="border border-gold/15 p-8 md:p-10 bg-maroon/30 relative mb-10">
            <div className="absolute top-3 left-3 right-3 bottom-3 border border-gold/5 pointer-events-none" />
            <span className="editorial-overline block mb-7">Wedding Preferences</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <FieldGroup label="Budget Tier">
                <select value={prefs.budget} onChange={e => setPrefs({...prefs, budget: e.target.value})} className="luxury-select">
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Guest Count">
                <select value={prefs.guests} onChange={e => setPrefs({...prefs, guests: e.target.value})} className="luxury-select">
                  {GUEST_COUNTS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Venue Preference">
                <select value={prefs.venue} onChange={e => setPrefs({...prefs, venue: e.target.value})} className="luxury-select">
                  {VENUE_TYPES.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </FieldGroup>
              <FieldGroup label="Decor Theme">
                <input type="text" value={prefs.decor} onChange={e => setPrefs({...prefs, decor: e.target.value})}
                  placeholder="e.g. Marigold & Rose..." className="luxury-input" />
              </FieldGroup>
              <FieldGroup label="Food Style">
                <input type="text" value={prefs.food} onChange={e => setPrefs({...prefs, food: e.target.value})}
                  placeholder="e.g. Fusion buffet..." className="luxury-input" />
              </FieldGroup>
            </div>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              disabled={isGenerating}
              className="border border-gold/60 px-12 md:px-20 py-4 text-[10px] font-semibold tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-500 cursor-pointer disabled:opacity-50 inline-flex items-center gap-3"
            >
              {isGenerating ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}>
                    <Sparkles className="w-4 h-4" />
                  </motion.span>
                  Curating Your Wedding Board...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate My Wedding Board
                </>
              )}
            </motion.button>
            <p className="editorial-body text-[10px] mt-4 text-champagne/30">
              Generates a complete 8-module wedding plan tailored to your traditions
            </p>
          </div>
        </form>

        {/* Generated Board */}
        <AnimatePresence>
          {board && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 md:mt-24"
            >
              <div className="border-t border-gold/15 pt-12 mb-10">
                <span className="editorial-overline block mb-3">Your Curated Wedding Board</span>
                <p className="editorial-body">
                  {board.isFusion
                    ? 'We detected two distinct traditions. The board below presents a complete fusion wedding plan.'
                    : 'We have curated a complete traditional wedding plan rooted in your heritage.'}
                </p>
              </div>
              <CurationBoard data={board} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

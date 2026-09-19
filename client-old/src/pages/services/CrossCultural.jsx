import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, BookOpen, Heart, Shirt, Utensils } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

const TRADITIONS_MAP = {
  Punjabi: {
    ritual: 'Anand Karaj / Pheras',
    significance: 'The blissful union under a saffron silk canopy, revolving around the Guru Granth Sahib.',
    attire: 'Saffron/Red lehenga with Kalire; Cream embroidered sherwani with safa.',
    cuisine: 'Dal Makhani, Butter Chicken, Amritsari Kulcha, Malpua.',
    decor: 'Marigolds, gold metallic hangings, vibrant red drapes.',
  },
  Tamil: {
    ritual: 'Muhurtham / Kanyadaanam',
    significance: 'Dawn purification Mangala Snaanam, stars alignment vow, tying the Thali.',
    attire: 'Kanjeevaram silk saree with traditional temple jewellery; Silk Veshti with angavastram.',
    cuisine: 'Bisi Bele Bath, Mysore Pak, Chettinad spices, Elaneer Payasam.',
    decor: 'Banana leaves, fresh Madurai jasmine columns, brass urlis with floating candles.',
  },
  Bengali: {
    ritual: 'Shubho Drishti / Saat Paak',
    significance: 'The ceremonial first look behind betel leaves, carrying the bride on a piri.',
    attire: 'Red Banarasi silk saree with crown-like Mukut; Tussar silk dhoti and Topor.',
    cuisine: 'Kosha Mangsho, Luchi, Shondesh, Mishti Doi.',
    decor: 'Shiuli flowers, hand-painted alpana floor patterns, red and white floral strings.',
  },
  Gujarati: {
    ritual: 'Mangalfera / Jaimala',
    significance: 'Four sacred rounds of the fire. Madhuparka welcoming ceremony.',
    attire: 'Panetar / Gharchola saree with traditional bandhani work; Silk sherwani with bandhej stole.',
    cuisine: 'Dhokla, Khandvi, Shrikhand, Basundi, Gujarati Kadhi.',
    decor: 'Brass bells, mango leaves garlands, colorful mirror-work umbrellas.',
  },
  Goan: {
    ritual: 'Roce ceremony & Nuptial Mass',
    significance: 'Blessing the couple with coconut milk, followed by exchange of vows in church.',
    attire: 'White lace bridal gown with veil; Black tux or beige linen summer suit.',
    cuisine: 'Fish Curry, Bebinca, Pork Vindaloo, Sanna.',
    decor: 'Orchids, white roses, frangipani blossoms, glass lanterns.',
  },
};

export default function CrossCultural() {
  const [brideCulture, setBrideCulture] = useState('Punjabi');
  const [groomCulture, setGroomCulture] = useState('Tamil');

  const bData = TRADITIONS_MAP[brideCulture];
  const gData = TRADITIONS_MAP[groomCulture];

  return (
    <div className="min-h-screen bg-maroon-black pt-24 pb-20">
      
      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-champagne/40 hover:text-gold text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Atelier
          </Link>
        </div>

        <ScrollFade>
          <span className="editorial-overline block mb-5">Atelier Offering 03</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Cross-Cultural<br />
            <span className="text-gold">Ceremonies</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Interactive Curation Block ── */}
      <SectionLayout bg="dark" frame={true} className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-gold" />
            <span className="editorial-overline">01 / Culture Matching Board</span>
          </div>

          <p className="editorial-body text-xs mb-8">
            Select both partners' community backgrounds below to instantly view how our Atelier maps and integrates customs, couture, menus, and styling protocols side-by-side.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="editorial-overline block mb-2 text-gold">Bride's Heritage</label>
              <select
                value={brideCulture}
                onChange={(e) => setBrideCulture(e.target.value)}
                className="luxury-select w-full"
              >
                {Object.keys(TRADITIONS_MAP).map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="editorial-overline block mb-2 text-gold">Groom's Heritage</label>
              <select
                value={groomCulture}
                onChange={(e) => setGroomCulture(e.target.value)}
                className="luxury-select w-full"
              >
                {Object.keys(TRADITIONS_MAP).map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-gold/15 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bride side column */}
            <div className="space-y-6">
              <span className="editorial-overline text-gold/60 text-[8px] block border-b border-gold/10 pb-2">
                {brideCulture} Traditions
              </span>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Ritual Profile</span>
                <h4 className="font-cinzel text-sm font-bold text-ivory mb-2">{bData.ritual}</h4>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{bData.significance}</p>
              </div>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Couture Coordinates</span>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{bData.attire}</p>
              </div>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Signature Cuisines</span>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{bData.cuisine}</p>
              </div>
            </div>

            {/* Groom side column */}
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-gold/10 pt-6 md:pt-0 md:pl-8">
              <span className="editorial-overline text-gold/60 text-[8px] block border-b border-gold/10 pb-2">
                {groomCulture} Traditions
              </span>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Ritual Profile</span>
                <h4 className="font-cinzel text-sm font-bold text-ivory mb-2">{gData.ritual}</h4>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{gData.significance}</p>
              </div>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Couture Coordinates</span>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{gData.attire}</p>
              </div>
              <div>
                <span className="text-[10px] text-champagne/40 uppercase block mb-1">Signature Cuisines</span>
                <p className="text-xs text-champagne/70 leading-relaxed font-light">{gData.cuisine}</p>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

      {/* ── Blending Insights ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-gold/15 p-6 bg-maroon/20 relative">
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          <Shirt className="w-5 h-5 text-gold mb-4" />
          <h3 className="font-cinzel text-xs font-bold text-ivory tracking-wide mb-2">Blended Couture Curation</h3>
          <p className="text-xs text-champagne/70 leading-relaxed font-light">
            We advise coordinate palettes that bridge both sides, blending regional fabrics (e.g. Banarasi silks or Kanjeevarams) with modern cuts.
          </p>
        </div>
        <div className="border border-gold/15 p-6 bg-maroon/20 relative">
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          <Utensils className="w-5 h-5 text-gold mb-4" />
          <h3 className="font-cinzel text-xs font-bold text-ivory tracking-wide mb-2">Dual-Line Gastronomy</h3>
          <p className="text-xs text-champagne/70 leading-relaxed font-light">
            Menus that present core dishes of both families side-by-side with clear signage, preventing spice overlaps and honoring dietary requirements.
          </p>
        </div>
        <div className="border border-gold/15 p-6 bg-maroon/20 relative">
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          <BookOpen className="w-5 h-5 text-gold mb-4" />
          <h3 className="font-cinzel text-xs font-bold text-ivory tracking-wide mb-2">Dual-Script Stationery</h3>
          <p className="text-xs text-champagne/70 leading-relaxed font-light">
            Custom boxed invitations combining scripts (Devanagari, Gurmukhi, Tamil, etc.) with unified layout art referencing both heritages.
          </p>
        </div>
      </div>

      <div className="text-center pt-16">
        <Link to="/ai-board">
          <button className="border border-gold/60 px-10 py-3.5 text-[9px] font-semibold tracking-[0.3em] uppercase text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-500 cursor-pointer inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Enter Full Wedding Board
          </button>
        </Link>
      </div>

    </div>
  );
}

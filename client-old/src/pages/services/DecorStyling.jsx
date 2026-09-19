import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, LayoutGrid, Palette, Flower } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

// Images
import mandapImg from '../../assets/mandap_hero.png';
import decorImg from '../../assets/luxury_wedding_decor.png';
import coupleImg from '../../assets/real_wedding_couple.png';
import palaceImg from '../../assets/palace_destination.png';

const DECOR_THEMES = [
  {
    id: 'royal-gold',
    name: 'Royal Ivory & Gold',
    desc: 'An iconic heritage look built on pristine white shades, glistening golden metallic structures, and thousands of fresh white roses.',
    palettes: [
      { name: 'Warm Ivory', hex: '#FAF9F6' },
      { name: 'Polished Gold', hex: '#D4AF37' },
      { name: 'Champagne Gold', hex: '#F2E7D8' },
    ],
    florals: 'Mogra garlands, White Lotus, Madurai Jasmine.',
    mandap: 'Ornate temple arches draped with jasmine columns.',
    img: mandapImg,
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest & Rose',
    desc: 'A lush botanical fantasy merging deep forest moss greens, gold highlights, and delicate blush pink roses.',
    palettes: [
      { name: 'Forest Green', hex: '#1C352D' },
      { name: 'Blush Rose', hex: '#F3C5C5' },
      { name: 'Antique Brass', hex: '#C5A059' },
    ],
    florals: 'Pink Hydrangeas, Eucalyptus leaves, Cherry blossoms.',
    mandap: 'Circular branch dome with hundreds of hanging globes.',
    img: decorImg,
  },
  {
    id: 'saffron-sunset',
    name: 'Saffron & Marigold Sunset',
    desc: 'A vibrant celebration of regional folk traditions using rich shades of turmeric yellow, fiery marigold, and warm copper accents.',
    palettes: [
      { name: 'Deep Saffron', hex: '#FF9933' },
      { name: 'Marigold Yellow', hex: '#FFCC00' },
      { name: 'Warm Copper', hex: '#B87333' },
    ],
    florals: 'Orange Marigold, Saffron roses, Mango leaves.',
    mandap: 'Canopy frame suspended entirely with dense flower rows.',
    img: coupleImg,
  },
  {
    id: 'royal-maroon',
    name: 'Heritage Maroon & Jewel',
    desc: 'A regal evening court aesthetic utilizing velvety maroon, royal sapphire highlights, and sparkling crystal structures.',
    palettes: [
      { name: 'Deep Maroon', hex: '#651B2A' },
      { name: 'Gold Dust', hex: '#D4AF37' },
      { name: 'Ruby Dust', hex: '#4C0813' },
    ],
    florals: 'Red roses, Crimson Carnations, Gold-dipped leaves.',
    mandap: 'Sandstone pillars draped with dark red velvet cloth.',
    img: palaceImg,
  },
];

export default function DecorStyling() {
  const [activeThemeIdx, setActiveThemeIdx] = useState(0);
  const theme = DECOR_THEMES[activeThemeIdx];

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
          <span className="editorial-overline block mb-5">Atelier Offering 06</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Decor &amp; Floral<br />
            <span className="text-gold">Styling</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Moodboards Tab Switcher ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left panel: Swatches & Options */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-4 h-4 text-gold" />
                <span className="editorial-overline text-[8px]">01 / Custom Theme Curation</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {DECOR_THEMES.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveThemeIdx(idx)}
                    className={`text-left px-5 py-4 border transition-all cursor-pointer ${
                      activeThemeIdx === idx
                        ? 'border-gold bg-maroon/20 text-ivory'
                        : 'border-gold/15 hover:border-gold/40 text-champagne/60'
                    }`}
                  >
                    <span className="font-cinzel text-xs font-bold block">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Theme Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeThemeIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <p className="editorial-body text-xs leading-relaxed">{theme.desc}</p>

                {/* Swatches block */}
                <div>
                  <span className="editorial-overline text-[8px] block mb-3">Color Swatches</span>
                  <div className="flex gap-4">
                    {theme.palettes.map((swatch, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div
                          className="w-12 h-12 rounded-full border border-gold/10 shadow-lg"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span className="text-[9px] text-champagne/50 font-poppins">{swatch.name}</span>
                        <span className="text-[8px] text-gold/40 font-poppins">{swatch.hex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details specs */}
                <div className="border-t border-gold/15 pt-5 space-y-4">
                  <div className="flex gap-3 items-start">
                    <Flower className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="editorial-overline text-[8px] block">Florals</span>
                      <span className="text-xs text-champagne/70">{theme.florals}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <LayoutGrid className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="editorial-overline text-[8px] block">Mandap Structure</span>
                      <span className="text-xs text-champagne/70">{theme.mandap}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel: Moodboard image */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-gold/15" style={{ height: '440px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeThemeIdx}
                  src={theme.img}
                  alt={theme.name}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

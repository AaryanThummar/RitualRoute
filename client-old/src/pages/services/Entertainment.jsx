import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Music, Radio, Star, ChevronDown, Check } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

const ROSTER = [
  {
    name: 'DJ Zaheer',
    cat: 'Premium Club DJ',
    desc: 'Specializes in high-energy custom electronic sets, transitioning smoothly from classic regional folk/retro to global dance beats.',
    highlight: 'Sound design and customized retro remixes',
    duration: 'Up to 5 Hours',
  },
  {
    name: 'The Sufi Jugalbandi',
    cat: 'Live Fusion Band',
    desc: 'An evocative acoustic performance combining traditional qawwalis, sitar melodies, and modern percussion rhythms.',
    highlight: 'Live interactive classical sitar dialogues',
    duration: '2.5 Hours Set',
  },
  {
    name: 'Rajasthan Folk ensemble',
    cat: 'Cultural performance',
    desc: 'Authentic Kalbeliya, Ghoomar, and fire dancers accompanied by traditional dholak, khartal, and sarangi instruments.',
    highlight: 'Grand Baraat entrance integration',
    duration: '1.5 Hours Set',
  },
  {
    name: 'Madurai Nadaswaram Group',
    cat: 'Classical Devotional',
    desc: 'Sacred classical morning music featuring traditional wind instruments and percussion (Thavil) for Muhurtham rituals.',
    highlight: 'Morning prayer ceremony background',
    duration: '3 Hours Set',
  },
];

export default function Entertainment() {
  const [selectedArtist, setSelectedArtist] = useState(0);
  const artist = ROSTER[selectedArtist];

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
          <span className="editorial-overline block mb-5">Atelier Offering 08</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Entertainment<br />
            <span className="text-gold">Curation</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Interactive Artist Roster ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left panel: Artist list */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Music className="w-4 h-4 text-gold" />
              <span className="editorial-overline text-[8px]">01 / Curated Artist Registry</span>
            </div>

            <div className="flex flex-col gap-3">
              {ROSTER.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedArtist(idx)}
                  className={`text-left p-5 border transition-all cursor-pointer ${
                    selectedArtist === idx
                      ? 'border-gold bg-maroon/20'
                      : 'border-gold/15 hover:border-gold/40'
                  }`}
                >
                  <span className="text-[9px] tracking-wider text-gold block uppercase mb-1 font-poppins">{item.cat}</span>
                  <span className="font-cinzel text-sm font-bold text-ivory tracking-wide block">{item.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Details of selected artist */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedArtist}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="border border-gold/15 p-8 bg-maroon/20 relative"
              >
                <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
                
                <span className="editorial-overline text-gold/60 text-[8px] block mb-2">{artist.cat}</span>
                <h3 className="font-cinzel text-xl font-bold text-ivory tracking-wide mb-4">{artist.name}</h3>
                
                <p className="editorial-pullquote text-base text-champagne/70 leading-relaxed mb-6">
                  {artist.desc}
                </p>

                <div className="border-t border-gold/15 pt-5 space-y-4">
                  <div className="flex gap-3 items-center">
                    <Star className="w-4 h-4 text-gold" />
                    <div>
                      <span className="editorial-overline text-[8px] block">Key Highlight</span>
                      <span className="text-xs text-champagne/70">{artist.highlight}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <Radio className="w-4 h-4 text-gold" />
                    <div>
                      <span className="editorial-overline text-[8px] block">Performance Duration</span>
                      <span className="text-xs text-champagne/70">{artist.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gold/10 mt-6 flex justify-between items-center">
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1.5 font-light">
                    <Check className="w-3.5 h-3.5" /> Checked &amp; Available
                  </span>
                  <Link to="#contact">
                    <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 cursor-pointer">
                      Inquire Artist Booking →
                    </span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

    </div>
  );
}

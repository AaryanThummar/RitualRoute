import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Compass, Info, Heart } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

const TRADITIONS_RITUALS = {
  Hindu: [
    { title: 'Varmala', desc: 'Exchange of floral garlands symbolizing mutual acceptance and respect.' },
    { title: 'Kanyadaan', desc: 'The father places the bride\'s hand in the groom\'s, representing giving away.' },
    { title: 'Mangalfera', desc: 'Revolving around the sacred fire four times, speaking core vows of life.' },
    { title: 'Saptapadi', desc: 'Taking seven steps together, each step representing a specific marital promise.' },
  ],
  Sikh: [
    { title: 'Milni', desc: 'Formal introduction and embrace of matching family elders at the entrance.' },
    { title: 'Anand Karaj', desc: 'The sacred bliss marriage ceremony within the presence of Guru Granth Sahib.' },
    { title: 'Lavan', desc: 'Four wedding rounds of the holy book, cementing the spiritual union.' },
    { title: 'Karah Prasad', desc: 'Distribution of the sacred sweet flour offering to all guests.' },
  ],
  Muslim: [
    { title: 'Baraat Arrival', desc: 'The groom\'s grand arrival with family and welcome treats.' },
    { title: 'Nikah Ceremony', desc: 'The contract signing under a partition, overseen by the Qazi.' },
    { title: 'Mehar Agreement', desc: 'Vow of financial security agreed and gifted to the bride.' },
    { title: 'Rukhsat', desc: 'Emotional farewell ceremony as the bride leaves her parental house.' },
  ],
  Christian: [
    { title: 'Procession', desc: 'The bride walks down the aisle with her father to meet the groom.' },
    { title: 'Holy Matrimony Vows', desc: 'Exchanging traditional rings and lifelong vows before the altar.' },
    { title: 'The Kiss', desc: 'Solemn seal of the union declared by the priest.' },
    { title: 'Signing Register', desc: 'Official registry signed by witnesses, couple and priest.' },
  ],
};

export default function TraditionalCeremonies() {
  const [selectedRel, setSelectedRel] = useState('Hindu');
  const rituals = TRADITIONS_RITUALS[selectedRel];

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
          <span className="editorial-overline block mb-5">Atelier Offering 04</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Traditional<br />
            <span className="text-gold">Ceremonies</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Interactive Tradition Switcher ── */}
      <SectionLayout bg="dark" frame={true} className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-5 h-5 text-gold" />
            <span className="editorial-overline">01 / Explore Ritual Sequences</span>
          </div>

          <p className="editorial-body text-xs mb-8">
            Select a religion/community path below to view the authentic sequence of ceremonies, spiritual definitions, and details managed by our traditional protocols team.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-10 border-b border-gold/15 pb-6">
            {Object.keys(TRADITIONS_RITUALS).map((rel) => (
              <button
                key={rel}
                onClick={() => setSelectedRel(rel)}
                className={`px-6 py-2.5 text-[9px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer ${
                  selectedRel === rel
                    ? 'bg-gold text-maroon-black border border-gold'
                    : 'border border-gold/25 text-champagne/70 hover:border-gold'
                }`}
              >
                {rel} Traditions
              </button>
            ))}
          </div>

          {/* Staggered cards list */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedRel}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                {rituals.map((r, i) => (
                  <div key={i} className="border border-gold/10 p-5 bg-maroon-black/30 flex gap-5 items-start">
                    <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold font-cinzel text-[10px] font-bold flex-shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-ivory tracking-wide mb-1 uppercase">{r.title}</h4>
                      <p className="text-xs text-champagne/60 leading-relaxed font-light font-poppins">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SectionLayout>

      {/* ── Significance Explanation Cards ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gold/15 p-8 bg-maroon/20 relative">
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Info className="w-4 h-4" />
            <span className="editorial-overline text-[8px]">Heritage Authenticity</span>
          </div>
          <p className="editorial-body leading-relaxed text-xs">
            We work alongside certified regional priests and experts who understand local protocols, Sanskrit mantras, and specific community requirements, preserving ritual sanctity fully.
          </p>
        </div>
        <div className="border border-gold/15 p-8 bg-maroon/20 relative">
          <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
          <div className="flex items-center gap-2 mb-4 text-gold">
            <Heart className="w-4 h-4" />
            <span className="editorial-overline text-[8px]">Lineage & Family Rites</span>
          </div>
          <p className="editorial-body leading-relaxed text-xs">
            Every step is designed in coordination with parent elders to respect ancestral lineages, family legacy structures, and traditional gift-giving ceremonies (Shor).
          </p>
        </div>
      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Compass, ChevronLeft, ChevronRight, Calendar, Calculator, MapPin } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

// Images
import coupleImg from '../../assets/about_couple.png';
import decorImg from '../../assets/luxury_wedding_decor.png';
import mandapImg from '../../assets/mandap_hero.png';
import palaceImg from '../../assets/palace_destination.png';

const destinations = [
  {
    id: 'udaipur',
    city: 'Udaipur',
    state: 'Rajasthan',
    title: 'The Lake Palace Splendour',
    season: 'October to March (Winter)',
    desc: 'Exchange vows with a backdrop of shimmering lake waters, heritage havelis, and majestic royal palaces reflecting the sunset.',
    img: palaceImg,
    venues: ['The Taj Lake Palace', 'The Oberoi Udaivilas', 'Jagmandir Island Palace'],
    basePrice: 8500000, // 85 Lakhs base
    pricePerGuest: 18000,
  },
  {
    id: 'jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    title: 'The Royal Heritage Citadel',
    season: 'November to February (Winter)',
    desc: 'Celebrate within historic fortress walls, carved sandstone archways, and vibrant courtyards echoing with desert folk songs.',
    img: mandapImg,
    venues: ['Rambagh Palace', 'City Palace Jaipur', 'Fairmont Jaipur'],
    basePrice: 7500000, // 75 Lakhs base
    pricePerGuest: 15000,
  },
  {
    id: 'goa',
    city: 'Goa',
    state: 'Goa Coast',
    title: 'Coastal Heritage & Clifftops',
    season: 'November to February (Breezy Coast)',
    desc: 'Golden beaches, clifftop views, Portuguese estates, and late-night seaside banquets under coconut palms.',
    img: decorImg,
    venues: ['Taj Exotica Resort', 'The Leela Goa', 'W Goa Resort'],
    basePrice: 6000000, // 60 Lakhs base
    pricePerGuest: 12000,
  },
  {
    id: 'kerala',
    city: 'Kerala',
    state: 'South Coast',
    title: 'Backwaters & Tropical Groves',
    season: 'September to March (Moderate)',
    desc: 'Lush spice gardens, backwater shores, traditional wooden houseboats, and coconut canopy mandaps.',
    img: coupleImg,
    venues: ['Kumarakom Lake Resort', 'The Raviz Ashtamudi', 'Taj Green Cove Kovalam'],
    basePrice: 5000000, // 50 Lakhs base
    pricePerGuest: 10000,
  },
];

export default function DestinationWeddings() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDest = destinations[activeIdx];

  /* ── Interactive Calculator State ── */
  const [guestCount, setGuestCount] = useState(150);
  const [eventDays, setEventDays] = useState(3);

  const prevDest = () => setActiveIdx(c => (c - 1 + destinations.length) % destinations.length);
  const nextDest = () => setActiveIdx(c => (c + 1) % destinations.length);

  /* ── Estimate Calculation ── */
  const estimatedTotal = activeDest.basePrice + (guestCount * activeDest.pricePerGuest * (eventDays / 3));

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
          <span className="editorial-overline block mb-5">Atelier Offering 02</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Destination<br />
            <span className="text-gold">Weddings</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Carousel Slider ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left panel: Info */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span className="font-cinzel text-xs font-bold text-gold tracking-widest">{activeDest.city}, {activeDest.state}</span>
                </div>

                <h2 className="font-cinzel text-2xl md:text-3xl text-ivory font-bold">{activeDest.title}</h2>
                <p className="editorial-pullquote text-base text-champagne/70 leading-relaxed">{activeDest.desc}</p>

                <div className="border-t border-gold/15 pt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gold" />
                    <div>
                      <span className="editorial-overline text-[8px] block">Best Season</span>
                      <span className="text-xs text-ivory">{activeDest.season}</span>
                    </div>
                  </div>
                  <div>
                    <span className="editorial-overline text-[8px] block mb-2">Signature Partners</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDest.venues.map((venue, idx) => (
                        <span key={idx} className="border border-gold/10 px-3 py-1 bg-maroon-black/30 text-[10px] text-champagne/60">
                          {venue}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4 pt-4">
              <button onClick={prevDest} className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-400 cursor-pointer">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button onClick={nextDest} className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-400 cursor-pointer">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right panel: Images */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-gold/15 aspect-[16/10]" style={{ height: '420px' }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  src={activeDest.img}
                  alt={activeDest.city}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* ── Estimate Calculator ── */}
      <SectionLayout bg="card" frame={true}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-5 h-5 text-gold" />
            <span className="editorial-overline">02 / Dynamic Investment Estimator</span>
          </div>

          <p className="editorial-body text-xs mb-8">
            Estimate average cost factors for accommodation, venue fees, fine dining, and structural setups for a destination celebration in <strong className="text-gold">{activeDest.city}</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-cinzel text-gold">Guest Count</span>
                  <span className="font-cinzel text-ivory font-bold">{guestCount} Guests</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[9px] text-champagne/40 mt-1">
                  <span>50 guests</span>
                  <span>500 guests</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-cinzel text-gold">Event Duration</span>
                  <span className="font-cinzel text-ivory font-bold">{eventDays} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={eventDays}
                  onChange={(e) => setEventDays(Number(e.target.value))}
                  className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
                />
                <div className="flex justify-between text-[9px] text-champagne/40 mt-1">
                  <span>1 day</span>
                  <span>5 days</span>
                </div>
              </div>
            </div>

            <div className="border border-gold/10 p-6 bg-maroon-black/40 flex flex-col justify-between relative">
              <div className="absolute inset-1 border border-gold/5 pointer-events-none" />
              <div>
                <span className="editorial-overline text-[8px] text-gold/60 block mb-1">Estimated Wedding Budget</span>
                <span className="font-cinzel text-2xl md:text-3xl text-gold font-bold">
                  ₹{(estimatedTotal / 10000000).toFixed(2)} Cr
                </span>
                <p className="text-[10px] text-champagne/40 font-light mt-3 leading-relaxed">
                  *Estimates include full palace rental, luxury boarding, regional menu spreads, floral designs, stage styling, and logistics setup. Actual costs may vary depending on vendors and decor themes.
                </p>
              </div>
              <div className="pt-4 border-t border-gold/10 mt-4">
                <Link to="#contact">
                  <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 cursor-pointer">
                    Book Private Venue Consultation →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionLayout>

    </div>
  );
}

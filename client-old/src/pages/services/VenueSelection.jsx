import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Sparkles, SlidersHorizontal, IndianRupee, Users } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

// Images
import mandapImg from '../../assets/mandap_hero.png';
import palaceImg from '../../assets/palace_destination.png';
import decorImg from '../../assets/luxury_wedding_decor.png';
import coupleImg from '../../assets/about_couple.png';

const VENUES = [
  {
    name: 'Taj Falaknuma Palace',
    location: 'Hyderabad',
    capacity: 'Grand (500+ guests)',
    capVal: 600,
    price: '₹2.5 Crore+ starting',
    style: 'Heritage Palace',
    amenities: ['101-seat dining hall', 'Royal carriage rides', 'Nizam gardens'],
    img: palaceImg,
  },
  {
    name: 'The Oberoi Udaivilas',
    location: 'Udaipur',
    capacity: 'Medium (150–350 guests)',
    capVal: 300,
    price: '₹1.8 Crore+ starting',
    style: 'Lakeside Resort',
    amenities: ['Private boat arrival', 'Lakeside lawns', 'Heritage architecture'],
    img: mandapImg,
  },
  {
    name: 'Taj Exotica Resort & Spa',
    location: 'Goa',
    capacity: 'Grand (500+ guests)',
    capVal: 550,
    price: '₹1.2 Crore+ starting',
    style: 'Beach Resort',
    amenities: ['Private beach access', 'Sea-facing lawns', 'Luxury pool villas'],
    img: decorImg,
  },
  {
    name: 'Kumarakom Lake Resort',
    location: 'Kerala',
    capacity: 'Intimate (Under 100 guests)',
    capVal: 80,
    price: '₹95 Lakhs+ starting',
    style: 'Backwater shore',
    amenities: ['Houseboat transfers', 'Tropical coconut groves', 'Infinity pool decks'],
    img: coupleImg,
  },
];

export default function VenueSelection() {
  const [filterStyle, setFilterStyle] = useState('All');
  const [filterCap, setFilterCap] = useState('All');

  const filteredVenues = VENUES.filter(v => {
    const styleMatch = filterStyle === 'All' || v.style === filterStyle;
    const capMatch =
      filterCap === 'All' ||
      (filterCap === 'Intimate' && v.capVal < 150) ||
      (filterCap === 'Medium' && v.capVal >= 150 && v.capVal < 400) ||
      (filterCap === 'Grand' && v.capVal >= 400);
    return styleMatch && capMatch;
  });

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
          <span className="editorial-overline block mb-5">Atelier Offering 05</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Venue<br />
            <span className="text-gold">Selection</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Filter bar ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
        <div className="border border-gold/15 p-6 bg-maroon/20 relative flex flex-col md:flex-row gap-6 md:items-center justify-between">
          <div className="absolute inset-1 border border-gold/5 pointer-events-none" />
          
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-4 h-4 text-gold" />
            <span className="editorial-overline text-[8px]">Interactive Filters</span>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Style Selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-cinzel text-gold uppercase">Venue Style</span>
              <select
                value={filterStyle}
                onChange={(e) => setFilterStyle(e.target.value)}
                className="luxury-select min-w-[150px]"
              >
                <option value="All">All Styles</option>
                <option value="Heritage Palace">Heritage Palace</option>
                <option value="Lakeside Resort">Lakeside Resort</option>
                <option value="Beach Resort">Beach Resort</option>
                <option value="Backwater shore">Backwater Shore</option>
              </select>
            </div>

            {/* Capacity Selector */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-cinzel text-gold uppercase">Scale / Capacity</span>
              <select
                value={filterCap}
                onChange={(e) => setFilterCap(e.target.value)}
                className="luxury-select min-w-[150px]"
              >
                <option value="All">All Sizes</option>
                <option value="Intimate">Intimate (Under 150)</option>
                <option value="Medium">Medium (150 - 350)</option>
                <option value="Grand">Grand (400+)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Venues Grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredVenues.map((venue, idx) => (
              <motion.div
                key={venue.name}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
                className="border border-gold/15 p-6 bg-maroon/20 relative flex flex-col justify-between"
              >
                <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
                
                <div>
                  {/* Photo cover */}
                  <div className="relative overflow-hidden border border-gold/10 aspect-video mb-6" style={{ height: '200px' }}>
                    <img src={venue.img} alt={venue.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-maroon-black/85 border border-gold/30 px-3 py-1 text-[9px] text-gold uppercase tracking-wider">
                      {venue.style}
                    </div>
                  </div>

                  {/* Title & Info */}
                  <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-ivory tracking-wide leading-snug">{venue.name}</h3>
                      <div className="flex items-center gap-1 text-champagne/40 mt-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-poppins">{venue.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-gold/10 py-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gold/60" />
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-gold-muted block">Capacity</span>
                        <span className="text-xs text-champagne/70">{venue.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-gold/60" />
                      <div>
                        <span className="text-[8px] uppercase tracking-wider text-gold-muted block">Rental Range</span>
                        <span className="text-xs text-champagne/70">{venue.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <span className="editorial-overline text-[8px] block mb-2">Amenities Highlights</span>
                    <div className="flex flex-wrap gap-2">
                      {venue.amenities.map((a, i) => (
                        <span key={i} className="text-[9px] text-champagne/60 border border-gold/10 px-2 py-0.5 bg-maroon-black/30">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gold/10 mt-auto">
                  <Link to="#contact">
                    <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 cursor-pointer">
                      Inquire Availability →
                    </span>
                  </Link>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

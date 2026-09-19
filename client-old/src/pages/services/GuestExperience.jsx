import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Home, Gift, Check, Send } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

const MOCK_GUESTS = ['Aria Davar', 'Kabir Chawla', 'Sean O\'Brien', 'Meera Pillai', 'Fatima Sheikh', 'Arjun Sharma', 'Rohan Mehta', 'Priya Roy'];

export default function GuestExperience() {
  /* ── State: RSVP lookup ── */
  const [rsvpQuery, setRsvpQuery] = useState('');
  const [rsvpResult, setRsvpResult] = useState(null);

  const handleRSVPSearch = (e) => {
    e.preventDefault();
    if (!rsvpQuery.trim()) return;
    // Mock response
    setRsvpResult({
      name: rsvpQuery,
      status: 'Confirmed',
      table: 'Table 01 - Royal Court',
      rooms: '2 Palace Deluxe Rooms',
    });
  };

  /* ── State: Seating Planner ── */
  const [tables, setTables] = useState({
    'Table 01 (Royal)': ['Kabir Chawla', 'Aria Davar'],
    'Table 02 (Heritage)': ['Sean O\'Brien', 'Meera Pillai'],
    'Table 03 (Classic)': [],
  });

  const assignGuest = (guest, tableName) => {
    // Remove guest from any table they are already in
    const updatedTables = {};
    Object.keys(tables).forEach(key => {
      updatedTables[key] = tables[key].filter(g => g !== guest);
    });
    // Add to new table
    updatedTables[tableName].push(guest);
    setTables(updatedTables);
  };

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
          <span className="editorial-overline block mb-5">Atelier Offering 09</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Guest<br />
            <span className="text-gold">Experience Ledger</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left column: Seating Planner & RSVP look */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Seating Plan Designer */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gold" />
              <span className="editorial-overline">01 / Interactive Table Assigner</span>
            </div>

            <p className="editorial-body text-xs mb-6">
              Click a guest name, then click a table to assign them to their seats. See your table limits and arrangement update instantly.
            </p>

            {/* Guests Bank */}
            <div className="mb-8">
              <span className="text-[9px] font-cinzel text-gold block mb-3 uppercase">Available Guests</span>
              <div className="flex flex-wrap gap-2">
                {MOCK_GUESTS.map(guest => {
                  const currentTable = Object.keys(tables).find(t => tables[t].includes(guest));
                  return (
                    <button
                      key={guest}
                      className={`px-3 py-1.5 border text-[10px] transition-all cursor-pointer ${
                        currentTable
                          ? 'border-gold/30 text-gold bg-gold/5'
                          : 'border-white/10 text-champagne/70 hover:border-gold/40'
                      }`}
                    >
                      {guest} {currentTable && `(Assigned)`}
                      <select
                        onChange={(e) => assignGuest(guest, e.target.value)}
                        value={currentTable || ''}
                        className="bg-transparent border-none text-gold text-[9px] ml-2 outline-none cursor-pointer"
                      >
                        <option value="" disabled>Assign...</option>
                        {Object.keys(tables).map(t => (
                          <option key={t} value={t} className="bg-maroon text-ivory">{t}</option>
                        ))}
                      </select>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tables Deck */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(tables).map(tableName => (
                <div key={tableName} className="border border-gold/10 p-5 bg-maroon-black/40 relative">
                  <div className="absolute inset-1 border border-gold/5 pointer-events-none" />
                  <span className="font-cinzel text-[10px] text-gold font-bold block mb-3 border-b border-gold/10 pb-2">
                    {tableName} ({tables[tableName].length}/4)
                  </span>
                  
                  <div className="space-y-2 min-h-[80px]">
                    {tables[tableName].length > 0 ? (
                      tables[tableName].map((g, i) => (
                        <div key={i} className="flex justify-between items-center bg-maroon/20 p-2 text-xs text-champagne/80">
                          <span>{g}</span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] text-champagne/20 italic block text-center pt-6">No guests seated</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RSVP look */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6">
              <Check className="w-5 h-5 text-gold" />
              <span className="editorial-overline">02 / RSVP Registry Lookup</span>
            </div>

            <form onSubmit={handleRSVPSearch} className="flex gap-4 mb-6">
              <input
                type="text"
                required
                value={rsvpQuery}
                onChange={e => setRsvpQuery(e.target.value)}
                placeholder="Enter guest name (e.g. Aria Davar)"
                className="luxury-input flex-1"
              />
              <button
                type="submit"
                className="border border-gold/50 px-6 py-2 text-[9px] font-semibold tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-maroon-black transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            <AnimatePresence mode="wait">
              {rsvpResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="border border-gold/10 p-5 bg-maroon-black/35 grid grid-cols-2 gap-4 text-xs text-champagne/80"
                >
                  <div>
                    <span className="text-[9px] text-gold/60 uppercase block mb-1">RSVP Status</span>
                    <span className="text-emerald-400 font-bold uppercase tracking-wider">{rsvpResult.status}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-gold/60 uppercase block mb-1">Assigned Seating</span>
                    <span>{rsvpResult.table}</span>
                  </div>
                  <div className="col-span-2 border-t border-gold/10 pt-3 mt-1">
                    <span className="text-[9px] text-gold/60 uppercase block mb-1">Accommodation booked</span>
                    <span>{rsvpResult.rooms}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right column: Welcome Kits & Favors details */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Welcome kits */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <Home className="w-5 h-5 text-gold mb-4" />
            <span className="editorial-overline block mb-4">03 / Palace Welcome Hampers</span>
            
            <p className="editorial-body text-[11px] mb-6">
              Placed in each room ahead of guest check-in. Custom boxes showcasing local heritage items.
            </p>

            <ul className="space-y-3 text-xs text-champagne/70 font-light">
              <li className="flex gap-2"><span>✦</span> <span>Hand-painted blue pottery jars</span></li>
              <li className="flex gap-2"><span>✦</span> <span>Organic saffron tea blends</span></li>
              <li className="flex gap-2"><span>✦</span> <span>Custom sandalwood perfume roll-ons</span></li>
              <li className="flex gap-2"><span>✦</span> <span>Personalized celebration itineraries</span></li>
            </ul>
          </div>

          {/* Return gifts */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <Gift className="w-5 h-5 text-gold mb-4" />
            <span className="editorial-overline block mb-4">04 / Heritage Return Gifts</span>
            
            <p className="editorial-body text-[11px] mb-6">
              Shared on the departure day as tokens of gratitude from the families.
            </p>

            <ul className="space-y-3 text-xs text-champagne/70 font-light">
              <li className="flex gap-2"><span>✦</span> <span>Handwoven Banarasi silk stoles</span></li>
              <li className="flex gap-2"><span>✦</span> <span>Brass spice containers with matching spoons</span></li>
              <li className="flex gap-2"><span>✦</span> <span>Customized calligraphed thank-you folios</span></li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

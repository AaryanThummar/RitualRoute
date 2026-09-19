import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, Download, CheckSquare, Users, BarChart3, Wallet, CalendarRange, Star } from 'lucide-react';
import { ScrollFade, SectionLayout, LuxuryButton } from '../../components/foundation';
import coupleImg from '../../assets/hero_couple.png';

export default function CompletePlanning() {
  /* ── State: Budget Planner ── */
  const [totalBudget, setTotalBudget] = useState(2500000); // 25 Lakhs default
  const budgetBreakdown = [
    { name: 'Venue & Stay', share: 0.40, desc: 'Palace rent, rooms, banquets' },
    { name: 'Decor & Flowers', share: 0.20, desc: 'Mandap, lighting, florals' },
    { name: 'Catering & Beverages', share: 0.22, desc: 'Fusion fine dining, signature cocktails' },
    { name: 'Apparel & Couture', share: 0.10, desc: 'Sabyasachi/Heritage coordinates' },
    { name: 'Photography & Film', share: 0.05, desc: 'Cinematic crew, editorial albums' },
    { name: 'Entertainment & Sound', share: 0.03, desc: 'Live performances, lighting rigs' },
  ];

  /* ── State: Guest Management ── */
  const [guests, setGuests] = useState([
    { id: 1, name: 'Dr. Kabir Chawla', side: 'Groom Side', rsvp: 'Confirmed', role: 'Immediate Family' },
    { id: 2, name: 'Aria Davar', side: 'Bride Side', rsvp: 'Confirmed', role: 'Bride' },
    { id: 3, name: 'Sean O\'Brien', side: 'Groom Side', rsvp: 'Pending', role: 'Groomsman' },
    { id: 4, name: 'Meera Pillai', side: 'Bride Side', rsvp: 'Confirmed', role: 'Maid of Honour' },
  ]);
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestSide, setNewGuestSide] = useState('Bride Side');
  const [newGuestRole, setNewGuestRole] = useState('Guest');

  const addGuest = (e) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    setGuests([
      ...guests,
      { id: Date.now(), name: newGuestName, side: newGuestSide, rsvp: 'Pending', role: newGuestRole }
    ]);
    setNewGuestName('');
  };

  const removeGuest = (id) => {
    setGuests(guests.filter(g => g.id !== id));
  };

  const toggleRSVP = (id) => {
    setGuests(guests.map(g => {
      if (g.id === id) {
        const nextRSVP = g.rsvp === 'Confirmed' ? 'Declined' : g.rsvp === 'Pending' ? 'Confirmed' : 'Pending';
        return { ...g, rsvp: nextRSVP };
      }
      return g;
    }));
  };

  /* ── State: Checklist ── */
  const [checklist, setChecklist] = useState([
    { id: 1, task: 'Secure Palace/Venue booking deposit', done: true },
    { id: 2, task: 'Finalise Dual-Heritage timeline structure', done: true },
    { id: 3, task: 'Confirm Couture Designer orders', done: false },
    { id: 4, task: 'Send out Boxed Custom Invitations', done: false },
    { id: 5, task: 'Curate Fusion Gastronomy Menu tasting session', done: false },
  ]);

  const toggleCheck = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  /* ── Calculation stats ── */
  const rsvpsCount = guests.filter(g => g.rsvp === 'Confirmed').length;
  const doneTasks = checklist.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-maroon-black pt-24 pb-20">
      
      {/* ── 1. Page Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-champagne/40 hover:text-gold text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Atelier
          </Link>
        </div>

        <ScrollFade>
          <span className="editorial-overline block mb-5">Atelier Offering 01</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Complete<br />
            <span className="text-gold">Wedding</span><br />
            Planning
          </h1>
          <span className="gold-line block mb-7" />
          <p className="editorial-pullquote text-lg md:text-xl text-champagne/75 max-w-2xl leading-relaxed">
            End-to-end orchestration designed to alleviate logistics, allowing you to inhabit the poetry of the celebration fully.
          </p>
        </ScrollFade>
      </div>

      {/* ── 2. Interactive Dashboard Stats ── */}
      <SectionLayout bg="dark" frame={true} className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 border border-gold/15 bg-maroon/20">
            <BarChart3 className="w-6 h-6 text-gold mx-auto mb-3" />
            <span className="editorial-overline text-[8px]">Budget Progress</span>
            <p className="font-cinzel text-xl font-bold text-ivory mt-1">₹{(totalBudget / 100000).toFixed(1)} Lakhs</p>
          </div>
          <div className="p-6 border border-gold/15 bg-maroon/20">
            <Users className="w-6 h-6 text-gold mx-auto mb-3" />
            <span className="editorial-overline text-[8px]">Guests Attending</span>
            <p className="font-cinzel text-xl font-bold text-ivory mt-1">{rsvpsCount} / {guests.length}</p>
          </div>
          <div className="p-6 border border-gold/15 bg-maroon/20">
            <CheckSquare className="w-6 h-6 text-gold mx-auto mb-3" />
            <span className="editorial-overline text-[8px]">Tasks Complete</span>
            <p className="font-cinzel text-xl font-bold text-ivory mt-1">{doneTasks} / {checklist.length}</p>
          </div>
          <div className="p-6 border border-gold/15 bg-maroon/20">
            <CalendarRange className="w-6 h-6 text-gold mx-auto mb-3" />
            <span className="editorial-overline text-[8px]">Timeline Status</span>
            <p className="font-cinzel text-xl font-bold text-ivory mt-1">12 Months Out</p>
          </div>
        </div>
      </SectionLayout>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Budget Planner & Guest Table */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Dynamic Budget Planner */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <Wallet className="w-5 h-5 text-gold" />
              <span className="editorial-overline">01 / Dynamic Budget Allocator</span>
            </div>

            <p className="editorial-body text-xs mb-6">
              Move the slider below to update your total wedding budget. Our algorithm instantly distributes allocations across key visual and logistical categories.
            </p>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="font-cinzel text-xs text-gold">Total Investment</span>
                <span className="font-cinzel text-base text-ivory font-bold">₹{totalBudget.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="10000000"
                step="250000"
                value={totalBudget}
                onChange={(e) => setTotalBudget(Number(e.target.value))}
                className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[9px] text-champagne/40 mt-1">
                <span>₹10 Lakhs</span>
                <span>₹50 Lakhs</span>
                <span>₹1 Crore</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetBreakdown.map((item, idx) => (
                <div key={idx} className="border border-gold/10 p-4 bg-maroon-black/40 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-cinzel text-xs font-bold text-ivory">{item.name}</span>
                      <span className="text-[10px] text-gold">{(item.share * 100)}%</span>
                    </div>
                    <p className="text-[10px] text-champagne/50 font-light leading-relaxed mb-3">{item.desc}</p>
                  </div>
                  <span className="font-cinzel text-sm text-gold font-semibold">
                    ₹{(totalBudget * item.share).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Guest List */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-5 h-5 text-gold" />
              <span className="editorial-overline">02 / Guest Ledger</span>
            </div>

            <form onSubmit={addGuest} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="md:col-span-2">
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="Guest full name"
                  className="luxury-input w-full"
                />
              </div>
              <div>
                <select value={newGuestSide} onChange={(e) => setNewGuestSide(e.target.value)} className="luxury-select w-full">
                  <option value="Bride Side">Bride Side</option>
                  <option value="Groom Side">Groom Side</option>
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="border border-gold/50 px-4 py-2.5 text-[8.5px] font-semibold tracking-[0.2em] uppercase text-gold hover:bg-gold hover:text-maroon-black transition-colors w-full cursor-pointer"
                >
                  Add Guest
                </button>
              </div>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gold/20 text-gold/60 font-cinzel text-[10px]">
                    <th className="py-2.5">Name</th>
                    <th className="py-2.5">Allegiance</th>
                    <th className="py-2.5">Role</th>
                    <th className="py-2.5">RSVP Status</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((g) => (
                    <tr key={g.id} className="border-b border-gold/10 text-champagne/80 font-poppins">
                      <td className="py-3 font-medium text-ivory">{g.name}</td>
                      <td className="py-3 text-[10px] uppercase tracking-wider">{g.side}</td>
                      <td className="py-3 text-[10px] italic">{g.role}</td>
                      <td className="py-3">
                        <button
                          onClick={() => toggleRSVP(g.id)}
                          className={`text-[9px] uppercase tracking-widest px-2.5 py-1 border transition-colors cursor-pointer ${
                            g.rsvp === 'Confirmed'
                              ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5'
                              : g.rsvp === 'Declined'
                              ? 'border-red-500/30 text-red-400 bg-red-500/5'
                              : 'border-gold/30 text-gold bg-gold/5'
                          }`}
                        >
                          {g.rsvp}
                        </button>
                      </td>
                      <td className="py-3 text-right">
                        <button onClick={() => removeGuest(g.id)} className="text-champagne/40 hover:text-red-400 transition-colors cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Side: Timeline checklist & Recommendations */}
        <div className="lg:col-span-4 space-y-10">
          
          {/* Checklist */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <span className="editorial-overline">03 / Checklist</span>
              <button className="text-gold/60 hover:text-gold transition-colors flex items-center gap-1.5 text-[9px] uppercase tracking-widest cursor-pointer">
                <Download className="w-3 h-3" />
                Checklist PDF
              </button>
            </div>

            <div className="space-y-4">
              {checklist.map((item) => (
                <div key={item.id} className="flex gap-3 items-start cursor-pointer" onClick={() => toggleCheck(item.id)}>
                  <div className={`w-4 h-4 border border-gold/40 flex items-center justify-center mt-0.5 transition-colors ${item.done ? 'bg-gold text-maroon-black' : ''}`}>
                    {item.done && <span className="text-[10px] font-bold">✓</span>}
                  </div>
                  <span className={`text-[11px] leading-relaxed transition-all ${item.done ? 'text-champagne/30 line-through' : 'text-champagne/80'}`}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Vendors */}
          <div className="border border-gold/15 p-8 bg-maroon/20 relative">
            <div className="absolute inset-2 border border-gold/5 pointer-events-none" />
            <span className="editorial-overline block mb-6">04 / Premium Partners</span>

            <div className="space-y-4">
              {[
                { name: 'House of Sabyasachi', cat: 'Bridal Couture & Styling', rating: 5 },
                { name: 'The Leela Venues', cat: 'Luxury Palace Bookings', rating: 5 },
                { name: 'Joseph Radhik Films', cat: 'Cinematic Wedding Portfolios', rating: 5 },
              ].map((v, i) => (
                <div key={i} className="border border-gold/10 p-4 bg-maroon-black/40 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-cinzel text-xs font-bold text-ivory">{v.name}</span>
                      <div className="flex text-gold">
                        {[...Array(v.rating)].map((_, r) => <Star key={r} className="w-2.5 h-2.5 fill-current" />)}
                      </div>
                    </div>
                    <span className="text-[9px] tracking-wider text-gold-muted block uppercase font-light">{v.cat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

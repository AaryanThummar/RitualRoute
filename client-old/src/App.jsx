import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Pages
import Home    from './pages/Home';
import AIBoard from './pages/AIBoard';

// Services sub-pages
import CompletePlanning     from './pages/services/CompletePlanning';
import DestinationWeddings   from './pages/services/DestinationWeddings';
import CrossCultural        from './pages/services/CrossCultural';
import TraditionalCeremonies from './pages/services/TraditionalCeremonies';
import VenueSelection       from './pages/services/VenueSelection';
import DecorStyling         from './pages/services/DecorStyling';
import PhotographyFilm      from './pages/services/PhotographyFilm';
import Entertainment        from './pages/services/Entertainment';
import GuestExperience      from './pages/services/GuestExperience';

// Layout
import Navbar         from './components/Navbar';
import CinematicIntro from './components/CinematicIntro';
import { SmoothScrollProvider } from './components/foundation';

/* ── Scroll-to-top on route change ── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ── Site Footer ── */
function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-maroon-black border-t border-gold/10 relative overflow-hidden">
      <span className="gold-line-full absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-16">

          <div className="md:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-gold/60 flex items-center justify-center group-hover:border-gold transition-colors duration-500">
                <Heart className="w-4 h-4 text-gold fill-gold/10" />
              </div>
              <div>
                <p className="font-cinzel text-sm font-bold tracking-[0.22em] text-gold uppercase leading-none">Heritage & Harmony</p>
                <p className="font-cormorant text-[10px] italic tracking-[0.2em] text-ivory/50 mt-0.5 uppercase">The Art of Traditions</p>
              </div>
            </Link>
            <p className="editorial-body max-w-xs leading-relaxed">
              India's first AI-powered Cross-Cultural Wedding Board. We help couples from different traditions create a wedding that honours both families equally.
            </p>
            <p className="text-[9px] tracking-[0.25em] uppercase text-gold/50 font-poppins">Mumbai · Delhi · Jaipur · Udaipur</p>
          </div>

          <div className="md:col-span-2 md:col-start-6 space-y-4">
            <p className="editorial-overline mb-6">Explore</p>
            {['About', 'Services', 'Destinations', 'Traditions'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="block text-xs text-champagne/60 hover:text-gold tracking-wider font-light transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>

          <div className="md:col-span-2 space-y-4">
            <p className="editorial-overline mb-6">Experience</p>
            {[
              { label: 'Wedding Board', href: '/ai-board' },
              { label: 'Real Weddings', href: '#weddings' },
              { label: 'Gallery',       href: '#gallery'  },
              { label: 'Contact',       href: '#contact'  },
            ].map(link => (
              link.href.startsWith('#')
                ? <a key={link.label} href={link.href} className="block text-xs text-champagne/60 hover:text-gold tracking-wider font-light transition-colors duration-300">{link.label}</a>
                : <Link key={link.label} to={link.href} className="block text-xs text-champagne/60 hover:text-gold tracking-wider font-light transition-colors duration-300">{link.label}</Link>
            ))}
          </div>

          <div className="md:col-span-3 md:col-start-10 space-y-4">
            <p className="editorial-overline mb-6">Begin Your Story</p>
            <p className="editorial-body">Ready to start planning your extraordinary celebration?</p>
            <Link to="/ai-board"
              className="inline-block mt-3 border border-gold/40 px-5 py-2.5 text-[9px] font-semibold tracking-[0.22em] uppercase text-gold hover:bg-gold hover:text-maroon-black transition-all duration-500">
              Enter Planning Board
            </Link>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-poppins text-champagne/30 uppercase tracking-widest">
            © {year} Heritage & Harmony. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gold/30">
            <span className="text-[10px]">✦</span>
          </div>
          <p className="text-[9px] font-poppins text-champagne/30 uppercase tracking-widest">
            Crafted with intention · India's First AI Wedding Concierge
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Root App ── */
export default function App() {
  // Show intro only on first visit; checked once on mount
  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !localStorage.getItem('hh_intro_seen');
    } catch {
      return false;
    }
  });

  const handleIntroComplete = () => setShowIntro(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <SmoothScrollProvider>

        {/* ── Cinematic Intro (first visit only) ── */}
        <AnimatePresence>
          {showIntro && (
            <CinematicIntro onComplete={handleIntroComplete} />
          )}
        </AnimatePresence>

        {/* ── App Shell ── */}
        <motion.div
          initial={{ opacity: showIntro ? 0 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: showIntro ? 0 : 0 }}
        >
          <Navbar />
          <Routes>
            <Route path="/"          element={<Home />}    />
            <Route path="/ai-board"  element={<AIBoard />} />
            
            {/* Services sub-pages */}
            <Route path="/services/complete-planning"     element={<CompletePlanning />} />
            <Route path="/services/destination-weddings"   element={<DestinationWeddings />} />
            <Route path="/services/cross-cultural"        element={<CrossCultural />} />
            <Route path="/services/traditional-ceremonies" element={<TraditionalCeremonies />} />
            <Route path="/services/venue-selection"       element={<VenueSelection />} />
            <Route path="/services/decor-styling"         element={<DecorStyling />} />
            <Route path="/services/photography-film"      element={<PhotographyFilm />} />
            <Route path="/services/entertainment"        element={<Entertainment />} />
            <Route path="/services/guest-experience"      element={<GuestExperience />} />
          </Routes>
          <SiteFooter />
        </motion.div>

      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

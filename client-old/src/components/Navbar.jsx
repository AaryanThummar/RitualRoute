import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [hoveredIdx,  setHoveredIdx]  = useState(null);

  const location = useLocation();
  const isHome   = location.pathname === '/';

  /* ── Scroll listener ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close mobile on route change ── */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const navLinks = [
    { name: 'About',         href: '#about'        },
    { name: 'Services',      href: '#services'      },
    { name: 'Destinations',  href: '#destinations'  },
    { name: 'Traditions',    href: '#traditions'    },
    { name: 'Weddings',      href: '#weddings'      },
    { name: 'Wedding Board', href: '/ai-board', isRoute: true },
  ];

  const handleSectionClick = (e, link) => {
    setMobileOpen(false);
    if (link.isRoute) return;
    e.preventDefault();
    if (isHome) {
      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/' + link.href;
    }
  };

  /* ── Shared nav item styles ── */
  const linkBase = 'relative py-1 text-[9.5px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer';

  return (
    <>
      {/* ══════════════════════════════════════════════════
          FLOATING HEADER CONTAINER
         ══════════════════════════════════════════════════ */}
      <motion.div
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl"
        style={{ x: '-50%' }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.header
          animate={{
            backgroundColor: scrolled
              ? 'rgba(34,3,6,0.92)'
              : 'rgba(34,3,6,0.6)',
            borderColor: scrolled
              ? 'rgba(200,166,70,0.32)'
              : 'rgba(200,166,70,0.18)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.65), 0 0 20px rgba(200,166,70,0.15) inset'
              : '0 4px 20px rgba(0,0,0,0.35)',
          }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          className="border rounded-[4px] px-5 md:px-8"
          style={{
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Logo */}
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 select-none cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full border border-gold/50 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-3 h-3 text-gold fill-gold/15" />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-cinzel text-[12px] md:text-[13px] font-bold tracking-[0.2em] text-gold uppercase">
                    Heritage & Harmony
                  </span>
                  <span className="font-cormorant text-[8.5px] italic tracking-[0.2em] text-ivory/40 uppercase mt-0.5">
                    The Art of Traditions
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link, idx) =>
                link.isRoute ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`${linkBase} text-gold hover:text-ivory`}
                  >
                    {link.name}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.span
                          layoutId="nav-ul"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute bottom-0 left-0 w-full h-px bg-gold origin-left"
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link)}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    className={`${linkBase} text-champagne/65 hover:text-ivory`}
                  >
                    {link.name}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.span
                          layoutId="nav-ul"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute bottom-0 left-0 w-full h-px bg-gold/60 origin-left"
                        />
                      )}
                    </AnimatePresence>
                  </a>
                )
              )}
            </nav>

            {/* Right CTA + mobile trigger */}
            <div className="flex items-center gap-3">
              <Link to="/ai-board" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.03, backgroundColor: '#D4AF37', color: '#1C0509' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  className="border border-gold/45 px-4 py-2 text-[8.5px] font-semibold tracking-[0.2em] uppercase text-gold transition-colors duration-400 cursor-pointer rounded-[2px]"
                >
                  Begin Planning
                </motion.button>
              </Link>

              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-1.5 text-ivory/70 hover:text-gold transition-colors cursor-pointer"
                aria-label="Open navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </motion.header>
      </motion.div>

      {/* ══════════════════════════════════════════════════
          MOBILE DRAWER
         ══════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-maroon-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[82vw] max-w-sm bg-maroon border-l border-gold/15 flex flex-col p-8"
            >
              <div className="flex justify-between items-center pb-7 mb-8 border-b border-gold/10">
                <span className="editorial-overline">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="text-ivory/60 hover:text-gold transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-5 flex-1">
                {navLinks.map(link =>
                  link.isRoute ? (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-cinzel text-sm font-semibold tracking-[0.2em] uppercase text-gold hover:text-ivory transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleSectionClick(e, link)}
                      className="font-cinzel text-sm font-semibold tracking-[0.2em] uppercase text-ivory/80 hover:text-gold transition-colors duration-300 cursor-pointer"
                    >
                      {link.name}
                    </a>
                  )
                )}
              </nav>

              <div className="border-t border-gold/10 pt-6 mt-4">
                <Link
                  to="/ai-board"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center border border-gold/40 py-3 text-[9px] font-semibold tracking-[0.22em] uppercase text-gold hover:bg-gold hover:text-maroon-black transition-all duration-500"
                >
                  Begin Planning
                </Link>
                <p className="text-center editorial-overline mt-5 text-gold/30">Heritage & Harmony</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

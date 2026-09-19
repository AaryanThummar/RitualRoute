import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Star, Compass } from 'lucide-react';

import {
  SectionLayout, LuxuryButton, TextReveal,
  ImageReveal, ScrollFade, ParallaxContainer
} from '../components/foundation';

// Assets
import heroCoupleImg   from '../assets/hero_couple.png';
import aboutCoupleImg  from '../assets/about_couple.png';
import realCoupleImg   from '../assets/real_wedding_couple.png';
import decorImg        from '../assets/luxury_wedding_decor.png';
import mandapImg       from '../assets/mandap_hero.png';
import palaceImg       from '../assets/palace_destination.png';
import bridalImg       from '../assets/bridal_details.png';

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const services = [
  { num: '01', title: 'Complete Wedding Planning',    path: '/services/complete-planning',     detail: 'End-to-end orchestration across every logistics layer — suppliers, timelines, legal ceremonies, and on-the-day direction. You enjoy every moment; we execute every detail.' },
  { num: '02', title: 'Destination Weddings',         path: '/services/destination-weddings',   detail: 'Royal palaces in Rajasthan, cliff-top resorts in Goa, Backwater retreats in Kerala. We curate destination celebrations that become the backdrop of a lifetime.' },
  { num: '03', title: 'Cross-Cultural Ceremonies',    path: '/services/cross-cultural',        detail: "When two traditions meet, we choreograph both. Our specialists design unified timelines that honour each family's rituals without compromise." },
  { num: '04', title: 'Traditional Ceremonies',       path: '/services/traditional-ceremonies', detail: 'Deep-protocol traditional weddings rooted in regional authenticity — from Muhurtham and Saptapadi to Anand Karaj and Nikah, executed with reverence.' },
  { num: '05', title: 'Venue Selection',              path: '/services/venue-selection',       detail: 'Exclusive access to private estates, heritage havelis, five-star ballrooms, and intimate garden courtyards. We present options your guests will never forget.' },
  { num: '06', title: 'Decor & Floral Styling',       path: '/services/decor-styling',         detail: 'Handcrafted mandap structures, fresh-flower chandelier installations, calibrated ambient lighting, and regional textile staging by our in-house design team.' },
  { num: '07', title: 'Photography & Film',           path: '/services/photography-film',      detail: 'Cinematic medium-format captures, vintage prime lenses, and Vogue-style visual storytelling. Your wedding becomes an editorial. Not an album.' },
  { num: '08', title: 'Entertainment Curation',       path: '/services/entertainment',        detail: 'Classical Bharatnatyam troupes, Sufi jugalbandis, folk dhols, and live ghazal quartets. We source and coordinate authentic regional performers.' },
  { num: '09', title: 'Guest Experience',             path: '/services/guest-experience',      detail: 'Private seating ledgers, dietary management, accommodation logistics, welcome hampers with regional specialties, and personalised itinerary booklets.' },
];

const destinations = [
  { city: 'Udaipur',   tag: 'City of Lakes',       img: palaceImg,       desc: 'Floating palace receptions on Lake Pichola. Royal processions through the City of Lakes.' },
  { city: 'Jaipur',    tag: 'The Pink City',        img: mandapImg,       desc: 'Heritage havelis and palace courtyards where every wall tells a story.' },
  { city: 'Goa',       tag: 'Coastal Heritage',     img: decorImg,        desc: 'Clifftop chapels, beachside mandaps and Portuguese-heritage ballrooms.' },
  { city: 'Kerala',    tag: 'God\'s Own Country',   img: aboutCoupleImg,  desc: 'Backwater houseboats, temple courtyards, and spice-garden celebrations.' },
];

const traditions = [
  { culture: 'Punjabi Sikh',    name: 'Anand Karaj',     script: 'ਅਨੰਦ ਕਾਰਜ',  line: 'The blissful union. Sacred rounds of the Guru Granth Sahib under saffron silk canopies, accompanied by Shabad Kirtan.' },
  { culture: 'Tamil Hindu',     name: 'Muhurtham',        script: 'முகூர்த்தம்',    line: 'At dawn, purification bathed in sacred water. The auspicious moment chosen by the stars, marked by the tying of the Thali.' },
  { culture: 'Bengali Hindu',   name: 'Shubho Drishti',   script: 'শুভদৃষ্টি',       line: 'The ceremonial first look. The bride shields her eyes with betel leaves, then reveals herself to her beloved.' },
  { culture: 'Gujarati Hindu',  name: 'Mangalfera',       script: 'ਮੰਗਲਫੇਰਾ',       line: 'Seven sacred rounds of the fire. Each round a vow. Each vow a lifetime promise spoken through ancient Sanskrit verse.' },
];

const weddings = [
  { names: 'Aria & Kabir', cultures: 'Parsi — Punjabi Sikh', location: 'Falaknuma Palace, Hyderabad', img: realCoupleImg, story: 'The Achu Michu blessing of the Parsi tradition flowed seamlessly into the evening Anand Karaj. Two ancient faiths, one extraordinary celebration that left 340 guests in silence and then in song.' },
  { names: 'Meera & Sean', cultures: 'Tamil Hindu — Irish',   location: 'Taj Fort Aguada, Goa',        img: decorImg,       story: 'A Muhurtham at golden hour, jasmine columns reaching the ceiling, followed by an Irish fiddle band reception as the Goan coast turned crimson. A story we still speak of.' },
  { names: 'Fatima & Arjun', cultures: 'Muslim — Hindu',     location: 'Samode Palace, Jaipur',       img: mandapImg,      story: 'The Nikah under a carved Rajasthani arch in the morning, the Saptapadi by firelight in the evening. Both priests present. Both families moved to tears.' },
];

const testimonials = [
  { quote: 'Heritage & Harmony didn\'t just plan our wedding. They gave us something no one else could — a day where both our entire families felt seen, honoured, and celebrated equally.', name: 'Dr. Aria & Kabir Chawla', wedding: 'Parsi–Punjabi Wedding, Mumbai' },
  { quote: 'The AI Board gave us a complete fusion plan in minutes. But it was their human team that made every single tradition feel personal and sacred. Extraordinary.', name: 'Meera & Sean O\'Brien', wedding: 'Tamil–Irish Wedding, Goa' },
  { quote: 'I was worried blending a Muslim Nikah with a Hindu Saptapadi would feel forced. Heritage & Harmony made it the most natural, beautiful thing I have ever witnessed.', name: 'Fatima & Arjun Sharma', wedding: 'Muslim–Hindu Wedding, Jaipur' },
];

/* ─────────────────────────────────────────────────────────
   SECTION: INTERACTIVE SERVICES
───────────────────────────────────────────────────────── */
function ServicesSection() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  return (
    <SectionLayout bg="dark" frame={false} id="services" className="border-t border-gold/10">
      <div className="mb-16">
        <ScrollFade>
          <span className="editorial-overline block mb-4">The Atelier</span>
          <h2 className="editorial-h2 text-3xl md:text-5xl text-ivory">Our Services</h2>
          <span className="gold-line block mt-5" />
        </ScrollFade>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20 items-start">
        {/* Numbered List */}
        <div className="lg:col-span-5 space-y-0 border-t border-gold/10">
          {services.map((s, idx) => (
            <div
              key={s.num}
              onMouseEnter={() => setActive(idx)}
              onClick={() => {
                setActive(idx);
                // On mobile, navigate immediately, on desktop clicking works too
                navigate(s.path);
              }}
              className={`group flex items-start gap-5 py-5 border-b border-gold/10 cursor-pointer transition-all duration-400 ${active === idx ? 'pl-3' : 'pl-0'}`}
            >
              <span className={`font-cinzel text-[10px] font-bold tracking-widest transition-colors duration-400 mt-0.5 ${active === idx ? 'text-gold' : 'text-gold/30'}`}>
                {s.num}
              </span>
              <span className={`font-cinzel text-sm md:text-base font-semibold tracking-wide transition-colors duration-400 leading-snug ${active === idx ? 'text-ivory' : 'text-ivory/40'}`}>
                {s.title}
              </span>
              <motion.span
                animate={{ opacity: active === idx ? 1 : 0, x: active === idx ? 0 : -5 }}
                transition={{ duration: 0.3 }}
                className="ml-auto text-gold"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-7 hidden lg:block sticky top-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative border border-gold/15 p-10 bg-maroon/40"
            >
              <div className="absolute top-3 left-3 right-3 bottom-3 border border-gold/5 pointer-events-none" />
              <span className="editorial-overline block mb-3">{services[active].num} / {services[active].title}</span>
              <p className="editorial-pullquote text-2xl md:text-3xl text-ivory leading-relaxed mb-6">
                {services[active].detail}
              </p>
              <Link to={services[active].path}>
                <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold border-b border-gold/30 pb-0.5 hover:border-gold transition-colors duration-300 cursor-pointer">
                  Explore Service Page →
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SectionLayout>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: DESTINATIONS MARQUEE + EDITORIAL
───────────────────────────────────────────────────────── */
function DestinationsSection() {
  const marqueeItems = ['Udaipur', '✦', 'Jaipur', '✦', 'Goa', '✦', 'Kerala', '✦', 'Jodhpur', '✦', 'Mysore', '✦', 'Shimla', '✦', 'Pondicherry', '✦'];
  return (
    <section id="destinations" className="bg-maroon border-t border-gold/10 overflow-hidden">
      {/* Marquee */}
      <div className="py-5 border-b border-gold/10 overflow-hidden">
        <div className="flex">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={`px-6 font-cinzel text-sm tracking-[0.25em] uppercase ${item === '✦' ? 'text-gold/50 text-xs' : 'text-ivory/30'}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Editorial grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <ScrollFade>
          <span className="editorial-overline block mb-4">Wedding Destinations</span>
          <h2 className="editorial-h2 text-3xl md:text-5xl text-ivory mb-5">Extraordinary Venues</h2>
          <span className="gold-line block mb-16" />
        </ScrollFade>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Large Feature */}
          <ScrollFade direction="left" className="lg:col-span-7">
            <div className="relative overflow-hidden group border border-gold/15" style={{ height: '520px' }}>
              <img src={palaceImg} alt={destinations[0].city} className="img-cover ken-burns-slow" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/90 via-maroon-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <span className="editorial-overline block mb-2">{destinations[0].tag}</span>
                <h3 className="font-cinzel text-4xl font-bold text-ivory mb-3">{destinations[0].city}</h3>
                <p className="editorial-body max-w-xs">{destinations[0].desc}</p>
              </div>
            </div>
          </ScrollFade>

          {/* Right stack */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ScrollFade direction="right" delay={0.15}>
              <div className="relative overflow-hidden group border border-gold/15" style={{ height: '246px' }}>
                <img src={mandapImg} alt={destinations[1].city} className="img-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="editorial-overline block mb-1">{destinations[1].tag}</span>
                  <h3 className="font-cinzel text-2xl font-bold text-ivory">{destinations[1].city}</h3>
                </div>
              </div>
            </ScrollFade>
            <ScrollFade direction="right" delay={0.3}>
              <div className="relative overflow-hidden group border border-gold/15" style={{ height: '246px' }}>
                <img src={decorImg} alt={destinations[2].city} className="img-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="editorial-overline block mb-1">{destinations[2].tag}</span>
                  <h3 className="font-cinzel text-2xl font-bold text-ivory">{destinations[2].city}</h3>
                </div>
              </div>
            </ScrollFade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: TRADITIONS — TYPOGRAPHIC MAP
───────────────────────────────────────────────────────── */
function TraditionsSection() {
  return (
    <SectionLayout bg="dark" id="traditions" className="border-t border-gold/10">
      <ScrollFade>
        <span className="editorial-overline block mb-4">Indian Heritage</span>
        <h2 className="editorial-h2 text-3xl md:text-5xl text-ivory mb-5">Sacred Traditions</h2>
        <span className="gold-line block mb-16" />
      </ScrollFade>

      <div className="space-y-0">
        {traditions.map((t, idx) => (
          <ScrollFade key={idx} delay={idx * 0.12} direction={idx % 2 === 0 ? 'left' : 'right'}>
            <div className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-10 md:py-12 border-b border-gold/10 ${idx === 0 ? 'border-t border-gold/10' : ''}`}>

              {/* Culture tag + Script */}
              <div className={`md:col-span-3 ${idx % 2 === 0 ? 'md:col-start-1' : 'md:col-start-10 md:order-last'}`}>
                <span className="editorial-overline block mb-2">{t.culture}</span>
                <p className="font-cormorant text-3xl text-gold/40 italic leading-none">{t.script}</p>
              </div>

              {/* Gold vertical divider */}
              <div className="hidden md:flex md:col-span-1 justify-center">
                <span className="w-px h-20 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
              </div>

              {/* Name + Line */}
              <div className={`md:col-span-7 ${idx % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                <h3 className="font-cinzel text-2xl md:text-3xl lg:text-4xl font-bold text-ivory mb-3 group-hover:text-gold transition-colors duration-500">
                  {t.name}
                </h3>
                <p className="font-cormorant text-lg md:text-xl italic text-champagne/70 leading-relaxed max-w-xl">{t.line}</p>
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>
    </SectionLayout>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: AI BOARD — EDITORIAL DARK
───────────────────────────────────────────────────────── */
function AISection() {
  const pairs = [
    'Gujarati  ✦  Bengali',
    'Tamil  ✦  Punjabi',
    'Marathi  ✦  Christian',
    'Muslim  ✦  Hindu',
    'Sikh  ✦  Jain',
    'Parsi  ✦  Sikh',
  ];
  return (
    <section id="ai-board" className="relative bg-maroon border-t border-gold/10 overflow-hidden py-28 md:py-40">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,175,55,0.3) 40px, rgba(212,175,55,0.3) 41px)' }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* Left: editorial headline */}
          <div className="lg:col-span-6 space-y-7">
            <ScrollFade direction="left">
              <span className="editorial-overline block mb-4">The Intelligence</span>
              <h2 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory leading-none">
                Tradition<br />
                <span className="text-gold">Meets</span><br />
                Intelligence
              </h2>
            </ScrollFade>
            <ScrollFade direction="left" delay={0.2}>
              <p className="editorial-pullquote text-xl md:text-2xl text-champagne/80 max-w-md leading-relaxed">
                Enter two traditions. Our AI concierge designs a unified wedding that honours both — completely and without compromise.
              </p>
            </ScrollFade>
            <ScrollFade direction="left" delay={0.35}>
              <p className="editorial-body max-w-sm">
                Blended ceremony timelines. Dual-cuisine menus. Parallel ritual scheduling. Venue coordination across both families. Outfit coordination across cultural dress codes.
              </p>
            </ScrollFade>
            <ScrollFade direction="left" delay={0.5}>
              <Link to="/ai-board">
                <LuxuryButton variant="gold-solid">Enter the Planning Board</LuxuryButton>
              </Link>
            </ScrollFade>
          </div>

          {/* Right: Animated tradition pairs */}
          <div className="lg:col-span-5 lg:col-start-8 space-y-3">
            <ScrollFade direction="right">
              <p className="editorial-overline mb-6">We have curated weddings for</p>
            </ScrollFade>
            {pairs.map((pair, idx) => (
              <motion.div
                key={pair}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="border border-gold/15 px-6 py-4 font-cinzel text-sm tracking-[0.15em] text-ivory/70 hover:text-ivory hover:border-gold/40 hover:bg-maroon-black/30 transition-all duration-400 cursor-default"
              >
                {pair}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: REAL WEDDINGS — ALTERNATING EDITORIAL
───────────────────────────────────────────────────────── */
function WeddingsSection() {
  return (
    <SectionLayout bg="dark" id="weddings" className="border-t border-gold/10">
      <ScrollFade>
        <span className="editorial-overline block mb-4">The Chronicle</span>
        <h2 className="editorial-h2 text-3xl md:text-5xl text-ivory mb-5">Real Weddings</h2>
        <span className="gold-line block mb-16" />
      </ScrollFade>

      <div className="space-y-20 md:space-y-32">
        {weddings.map((w, idx) => (
          <ScrollFade key={idx} delay={0.1}>
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${idx % 2 === 1 ? 'direction-rtl' : ''}`}>
              {/* Photo */}
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:col-start-6 lg:order-last' : 'lg:col-start-1'}`}>
                <div className="relative overflow-hidden border border-gold/15 group" style={{ height: '480px' }}>
                  <img
                    src={w.img}
                    alt={w.names}
                    className="img-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <span className="editorial-overline block mb-1">{w.location}</span>
                  </div>
                </div>
              </div>

              {/* Text */}
              <div className={`lg:col-span-4 space-y-5 ${idx % 2 === 1 ? 'lg:col-start-1 lg:order-first' : 'lg:col-start-9'}`}>
                <span className="editorial-overline block">{w.cultures}</span>
                <h3 className="font-cinzel text-2xl md:text-3xl font-bold text-ivory">{w.names}</h3>
                <span className="gold-line block" />
                <p className="font-cormorant text-lg italic text-champagne/80 leading-relaxed">{w.story}</p>
                <p className="text-[9px] font-semibold tracking-[0.25em] uppercase text-gold/50 border-b border-gold/15 pb-3 cursor-pointer hover:text-gold transition-colors duration-300">
                  Read Full Story →
                </p>
              </div>
            </div>
          </ScrollFade>
        ))}
      </div>
    </SectionLayout>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: GALLERY — DRAGGABLE FILMSTRIP
───────────────────────────────────────────────────────── */
function GallerySection() {
  const dragRef = useRef(null);
  const galleryImages = [
    { src: heroCoupleImg,   label: 'The First Look'         },
    { src: mandapImg,       label: 'The Mandap'             },
    { src: decorImg,        label: 'Floral Arrangements'    },
    { src: palaceImg,       label: 'The Venue'              },
    { src: bridalImg,       label: 'Bridal Details'         },
    { src: realCoupleImg,   label: 'The Ceremony'           },
    { src: aboutCoupleImg,  label: 'The Celebration'        },
  ];

  return (
    <section id="gallery" className="bg-maroon border-t border-gold/10 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <ScrollFade>
          <span className="editorial-overline block mb-4">The Archive</span>
          <h2 className="editorial-h2 text-3xl md:text-5xl text-ivory mb-2">Gallery</h2>
          <p className="editorial-body mt-3">Drag to explore →</p>
        </ScrollFade>
      </div>

      <div className="pl-6 md:pl-12">
        <motion.div
          ref={dragRef}
          drag="x"
          dragConstraints={{ right: 0, left: -(galleryImages.length * 360 - window.innerWidth + 80) }}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 40 }}
          className="filmstrip flex gap-4 w-max"
        >
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              className="relative overflow-hidden border border-gold/15 flex-shrink-0 group"
              style={{ width: '320px', height: '420px' }}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              <img src={img.src} alt={img.label} className="img-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="font-cinzel text-[9px] tracking-[0.2em] uppercase text-ivory/70">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: TESTIMONIALS — CAROUSEL
───────────────────────────────────────────────────────── */
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  return (
    <SectionLayout bg="dark" id="testimonials" className="border-t border-gold/10">
      <ScrollFade>
        <span className="editorial-overline block mb-4 text-center">Voices</span>
        <h2 className="editorial-h2 text-3xl md:text-4xl text-ivory mb-5 text-center">Couples We've Celebrated</h2>
        <span className="gold-line block mx-auto mb-16" />
      </ScrollFade>

      <div className="max-w-3xl mx-auto">
        <div className="relative text-center px-8 md:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              <div className="text-gold text-3xl font-cormorant leading-none">"</div>
              <p className="font-cormorant text-xl md:text-2xl lg:text-3xl italic text-ivory leading-relaxed font-light">
                {testimonials[current].quote}
              </p>
              <div className="flex justify-center gap-1 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <div>
                <p className="font-cinzel text-[11px] font-bold tracking-[0.2em] uppercase text-ivory">{testimonials[current].name}</p>
                <p className="editorial-overline mt-1">{testimonials[current].wedding}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-14">
          <button onClick={prev} className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-400 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`testimonial-dot ${i === current ? 'active' : ''}`} />
            ))}
          </div>
          <button onClick={next} className="w-10 h-10 border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-400 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </SectionLayout>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION: CONTACT
───────────────────────────────────────────────────────── */
function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', tradition: '', message: '' });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        setSent(true);
      } else {
        setError(data.error || 'Unable to submit inquiry. Please try again.');
      }
    } catch {
      // Graceful local completion if offline
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-maroon border-t border-gold/10 py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left editorial text */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollFade direction="left">
              <span className="editorial-overline block mb-4">Begin Your Story</span>
              <h2 className="editorial-h1 text-4xl md:text-5xl text-ivory leading-none">
                Let's Create<br />
                <span className="text-gold">Something</span><br />
                Extraordinary
              </h2>
              <span className="gold-line block mt-6 mb-8" />
              <p className="editorial-pullquote text-lg md:text-xl text-champagne/75 leading-relaxed max-w-sm">
                Write to our private studio. Our concierge will reach you within 24 hours to begin your curation.
              </p>
              <div className="pt-4 space-y-3">
                <p className="editorial-body">hello@heritageharmony.in</p>
                <p className="editorial-body">+91 98765 43210</p>
                <p className="editorial-body">Mumbai · Delhi · Jaipur</p>
              </div>
            </ScrollFade>
          </div>

          {/* Right form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <ScrollFade direction="right">
              {sent ? (
                <div className="border border-gold/25 p-10 text-center bg-maroon-black/30 relative">
                  <div className="absolute inset-3 border border-gold/8 pointer-events-none" />
                  <span className="text-2xl text-gold block mb-4">✦</span>
                  <p className="font-cinzel text-sm tracking-[0.2em] uppercase text-ivory mb-2">Inquiry Received</p>
                  <p className="editorial-body">Our private concierge will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="editorial-overline block mb-3">Full Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="Your name" className="luxury-input" />
                    </div>
                    <div>
                      <label className="editorial-overline block mb-3">Email Address</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                        placeholder="your@email.com" className="luxury-input" />
                    </div>
                  </div>
                  <div>
                    <label className="editorial-overline block mb-3">Your Traditions</label>
                    <input type="text" value={form.tradition} onChange={e => setForm({...form, tradition: e.target.value})}
                      placeholder="e.g. Punjabi Sikh + Tamil Hindu" className="luxury-input" />
                  </div>
                  <div>
                    <label className="editorial-overline block mb-3">Tell Us About Your Celebration</label>
                    <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                      placeholder="Share your vision, date, guest count, or any questions..."
                      rows={4} className="luxury-input resize-none" />
                  </div>
                  {error && (
                    <p className="editorial-body text-xs text-red-400 mb-4">{error}</p>
                  )}
                  <button type="submit" disabled={submitting}
                    className="border border-gold/50 px-8 py-3.5 text-[9px] font-semibold tracking-[0.25em] uppercase text-gold hover:bg-gold hover:text-maroon-black hover:border-gold transition-all duration-500 cursor-pointer w-full md:w-auto disabled:opacity-50">
                    {submitting ? 'Sending Private Inquiry...' : 'Send Private Inquiry'}
                  </button>
                </form>
              )}
            </ScrollFade>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO CANVAS FLOATING GOLDEN PARTICLES
───────────────────────────────────────────────────────── */
function GoldParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(width / 25), 55);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 0.4 + 0.15,
      swayFreq: Math.random() * 0.02 + 0.005,
      angle: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#D4AF37' : '#F9F5EF',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.angle += p.swayFreq;
        p.x += Math.sin(p.angle) * 0.4;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.angle));
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
}

/* ─────────────────────────────────────────────────────────
   HERO SECTION — LOUIS VUITTON LUXURY SPEC
───────────────────────────────────────────────────────── */
function HeroSection() {
  const containerRef = useRef(null);

  // Mouse Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 90, damping: 25, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Layer parallax transforms
  const bgX = useTransform(smoothX, (v) => -v * 0.7);
  const bgY = useTransform(smoothY, (v) => -v * 0.7);
  const raysX = useTransform(smoothX, (v) => v * 1.5);
  const raysY = useTransform(smoothY, (v) => v * 1.5);
  const textX = useTransform(smoothX, (v) => v * 0.35);
  const textY = useTransform(smoothY, (v) => v * 0.35);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xNorm = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yNorm = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(xNorm * 22);
    mouseY.set(yNorm * 22);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const headlineLines = [
    { text: 'Two Families.', isGold: false },
    { text: 'Two Traditions.', isGold: false },
    { text: 'One Extraordinary', isGold: true },
    { text: 'Wedding.', isGold: false },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-maroon-black flex items-center justify-start overflow-hidden select-none"
      style={{ minHeight: 'max(100vh, 720px)' }}
    >
      {/* 1. Cinematic Page Load Curtain Reveal */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-0 bg-maroon-black z-50 origin-top pointer-events-none"
      />

      {/* 2. Cinematic Background Image with Ken Burns & Parallax */}
      <motion.div style={{ x: bgX, y: bgY }} className="absolute inset-0 scale-105">
        <motion.img
          src={heroCoupleImg}
          alt="Heritage & Harmony Wedding"
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 2.2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1.4 },
          }}
          className="img-cover ken-burns-slow"
          fetchPriority="high"
        />
      </motion.div>

      {/* 3. Soft Ambient Light Rays */}
      <motion.div
        style={{ x: raysX, y: raysY }}
        className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      >
        <div className="absolute -top-32 -right-32 w-[650px] h-[650px] ambient-ray-1 rounded-full opacity-60" />
        <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] ambient-ray-2 rounded-full opacity-40" />
      </motion.div>

      {/* 4. Canvas Floating Golden Particles */}
      <GoldParticles />

      {/* 5. Luxury Dark Overlay Gradient (Multi-Layer Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Central luxury radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_45%,rgba(28,5,9,0.15)_0%,rgba(28,5,9,0.85)_80%)]" />
        {/* Left vignette protecting typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-black/95 via-maroon-black/60 to-transparent" />
        {/* Top vignette for navbar integration */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-maroon-black/80 via-maroon-black/30 to-transparent" />
        {/* Bottom vignette transitioning seamlessly */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-maroon-black via-maroon-black/60 to-transparent" />
      </div>

      {/* 6. Content Container — Editorial Left Grid with Text Parallax */}
      <motion.div
        style={{ x: textX, y: textY }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-14 lg:px-16 pt-28 pb-24 md:pt-36 md:pb-32 pointer-events-auto"
      >
        <div className="max-w-xl md:max-w-2xl">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="editorial-overline block mb-3 md:mb-4 tracking-[0.3em]">
              Heritage & Harmony · Est. 2024
            </span>
          </motion.div>

          {/* Gold Underline Animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="origin-left mb-6 md:mb-8"
          >
            <span className="gold-line gold-line-animated w-16 h-[2px]" />
          </motion.div>

          {/* Masked Line-by-Line Headline Text Reveal */}
          <h1 className="editorial-h1 text-[clamp(2.6rem,7vw,5.5rem)] text-ivory leading-[0.92] mb-8 md:mb-10">
            {headlineLines.map((line, idx) => (
              <div key={idx} className="overflow-hidden block py-0.5">
                <motion.span
                  className={`block ${line.isGold ? 'text-gold' : 'text-ivory'}`}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 1.1,
                    delay: 0.75 + idx * 0.14,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </div>
            ))}
          </h1>

          {/* Paragraph Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-pullquote text-lg md:text-xl text-champagne/80 max-w-md leading-relaxed mb-12 md:mb-14"
          >
            When two different cultures fall in love, neither tradition should be left behind.
            Heritage & Harmony uses AI to respectfully weave both families' rituals, customs and
            values into a single, seamless celebration — honouring every heritage, compromising none.
          </motion.p>

          {/* Buttons with Ambient Gold Glow */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-5"
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="relative group inline-block"
            >
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-ivory/20 via-gold/10 to-ivory/20 blur-md opacity-40 group-hover:opacity-90 transition duration-500" />
              <LuxuryButton variant="ivory-outline" className="btn-glow-ivory">
                Explore Our Story
              </LuxuryButton>
            </a>

            <Link to="/ai-board" className="relative group inline-block">
              <div className="absolute -inset-1 rounded-sm bg-gradient-to-r from-gold/40 via-gold to-gold/40 blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />
              <LuxuryButton variant="gold-solid" className="btn-glow-gold">
                Begin Planning
              </LuxuryButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* 7. Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 1 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-3 text-ivory/40 hover:text-gold transition-colors duration-400 cursor-pointer z-30 group"
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="editorial-overline text-[8px] tracking-[0.3em] rotate-90 origin-center mb-4 transition-transform group-hover:translate-y-1">
          SCROLL
        </span>

        {/* Animated vertical track line */}
        <div className="relative w-[1px] h-10 bg-gold/20 overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-gold to-transparent"
          />
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-gold/70 group-hover:text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN HOME PAGE
───────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="relative w-full">

      {/* ── 1. HERO ── */}
      <HeroSection />

      {/* ── 2. ABOUT ── */}
      <section id="about" className="bg-maroon border-t border-gold/10 py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Left large image with tilt effect */}
            <ScrollFade direction="left" className="lg:col-span-5">
              <div className="relative">
                <div className="relative overflow-hidden border border-gold/20 transform -rotate-1 hover:rotate-0 transition-transform duration-700 shadow-2xl"
                  style={{ height: '580px' }}>
                  <img src={aboutCoupleImg} alt="Sacred Wedding Mandap" className="img-cover" />
                  <div className="absolute inset-0 bg-maroon-black/15" />
                </div>
                {/* Offset accent frame */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/20 -z-10" />
              </div>
            </ScrollFade>

            {/* Right editorial text */}
            <div className="lg:col-span-6 lg:col-start-7 space-y-7">
              <ScrollFade direction="right">
                <span className="editorial-overline block mb-4">About the Atelier</span>
              </ScrollFade>
              <ScrollFade direction="right" delay={0.15}>
                <h2 className="editorial-h2 text-3xl md:text-4xl lg:text-5xl text-ivory leading-snug">
                  Celebrating<br />Both Legacies.<br />Equally.
                </h2>
              </ScrollFade>
              <ScrollFade direction="right" delay={0.25}>
                <span className="gold-line block" />
              </ScrollFade>
              <ScrollFade direction="right" delay={0.3}>
                <p className="editorial-pullquote text-xl md:text-2xl text-champagne/80 leading-relaxed">
                  "A wedding is not a negotiation of compromises. It is the amplification of both traditions."
                </p>
              </ScrollFade>
              <ScrollFade direction="right" delay={0.4}>
                <p className="editorial-body leading-loose">
                  Heritage & Harmony was founded because too many couples from different backgrounds were forced to choose. Choose which rituals to keep. Which family to disappoint. Which traditions to set aside.
                </p>
                <p className="editorial-body leading-loose mt-4">
                  We rejected that premise entirely. We build dual-protocol wedding timelines, blended ceremonial structures, unified culinary experiences, and cohesive visual languages that honour both families — without a single compromise.
                </p>
              </ScrollFade>
              <ScrollFade direction="right" delay={0.5}>
                <Link to="/ai-board">
                  <LuxuryButton variant="gold-outline">Discover the AI Board</LuxuryButton>
                </Link>
              </ScrollFade>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES ── */}
      <ServicesSection />

      {/* ── 4. DESTINATIONS ── */}
      <DestinationsSection />

      {/* ── 5. TRADITIONS ── */}
      <TraditionsSection />

      {/* ── 6. AI BOARD PREVIEW ── */}
      <AISection />

      {/* ── 7. REAL WEDDINGS ── */}
      <WeddingsSection />

      {/* ── 8. GALLERY ── */}
      <GallerySection />

      {/* ── 9. TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── 10. CONTACT ── */}
      <ContactSection />

    </div>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Camera, Play, Image, Award, Heart } from 'lucide-react';
import { ScrollFade, SectionLayout } from '../../components/foundation';

// Images
import coupleImg from '../../assets/real_wedding_couple.png';
import decorImg from '../../assets/luxury_wedding_decor.png';
import mandapImg from '../../assets/mandap_hero.png';
import palaceImg from '../../assets/palace_destination.png';
import bridalImg from '../../assets/bridal_details.png';

const GALLERY_PHOTOS = [
  { src: coupleImg, label: 'The Couple Portrait' },
  { src: mandapImg, label: 'The Ceremony Stage' },
  { src: decorImg, label: 'The Reception Decor' },
  { src: palaceImg, label: 'The Palace Venue' },
  { src: bridalImg, label: 'Bridal Details' },
];

export default function PhotographyFilm() {
  const [activeStyle, setActiveStyle] = useState('editorial');
  const [playingVideo, setPlayingVideo] = useState(false);

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
          <span className="editorial-overline block mb-5">Atelier Offering 07</span>
          <h1 className="editorial-h1 text-4xl md:text-6xl lg:text-7xl text-ivory mb-6 leading-none">
            Photography<br />
            <span className="text-gold">&amp; Cinema Film</span>
          </h1>
          <span className="gold-line block mb-7" />
        </ScrollFade>
      </div>

      {/* ── Photography Style Explorer ── */}
      <SectionLayout bg="dark" frame={true} className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-5 h-5 text-gold" />
            <span className="editorial-overline">01 / Visual Style Guide</span>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8 border-b border-gold/15 pb-6">
            <button
              onClick={() => setActiveStyle('editorial')}
              className={`py-3 text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                activeStyle === 'editorial' ? 'text-gold border-b border-gold' : 'text-champagne/50 hover:text-champagne'
              }`}
            >
              Editorial Fine-Art
            </button>
            <button
              onClick={() => setActiveStyle('cinematic')}
              className={`py-3 text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                activeStyle === 'cinematic' ? 'text-gold border-b border-gold' : 'text-champagne/50 hover:text-champagne'
              }`}
            >
              Cinematic Documentary
            </button>
            <button
              onClick={() => setActiveStyle('vintage')}
              className={`py-3 text-[9px] font-semibold tracking-[0.2em] uppercase transition-colors cursor-pointer ${
                activeStyle === 'vintage' ? 'text-gold border-b border-gold' : 'text-champagne/50 hover:text-champagne'
              }`}
            >
              Vintage Medium Format
            </button>
          </div>

          <div className="min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {activeStyle === 'editorial' && (
                <motion.div
                  key="editorial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="editorial-pullquote text-lg text-ivory">
                    "Every frame looks like a Vogue weddings cover — structured compositions, clean backdrops, and timeless poses."
                  </p>
                  <p className="text-xs text-champagne/70 leading-relaxed font-light">
                    We use high-end prime lenses and Hasselblad digital cameras to create crisp, high-fashion portraits that highlight couture details, jewelry textures, and architectural grandeur.
                  </p>
                </motion.div>
              )}
              {activeStyle === 'cinematic' && (
                <motion.div
                  key="cinematic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="editorial-pullquote text-lg text-ivory">
                    "A movie-like capture of movements, speeches, and spontaneous interactions with rich color tones."
                  </p>
                  <p className="text-xs text-champagne/70 leading-relaxed font-light">
                    We film on high-end Arri Alexa systems with vintage cinema lenses. Our coverage combines slow-motion ritual details, clean sound bites, and emotional speeches into an extraordinary wedding film.
                  </p>
                </motion.div>
              )}
              {activeStyle === 'vintage' && (
                <motion.div
                  key="vintage"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="editorial-pullquote text-lg text-ivory">
                    "Authentic analog grain, rich shadows, and romantic soft focuses capturing nostalgia."
                  </p>
                  <p className="text-xs text-champagne/70 leading-relaxed font-light">
                    For couples who appreciate analog charm, we shoot alongside digital with 120mm medium-format film cameras (Hasselblad 503CW). The resulting gallery is processed by boutique labs for authentic colors.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SectionLayout>

      {/* ── Mock Cinema Player ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="relative overflow-hidden border border-gold/15 group aspect-video" style={{ height: '400px' }}>
          <img src={palaceImg} alt="Palace Venue Video" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-maroon-black/55 flex items-center justify-center">
            {playingVideo ? (
              <div className="text-center space-y-4 p-8">
                <span className="editorial-overline text-[8px] block">Now playing sample reel</span>
                <p className="font-cinzel text-xs text-gold">REEL: FALAKNUMA PALACE WEDDING (Aria &amp; Kabir)</p>
                <button
                  onClick={() => setPlayingVideo(false)}
                  className="text-[9px] text-champagne/40 hover:text-gold uppercase tracking-widest border border-gold/25 px-4 py-2 cursor-pointer mt-4"
                >
                  Close Player
                </button>
              </div>
            ) : (
              <button
                onClick={() => setPlayingVideo(true)}
                className="w-16 h-16 rounded-full border border-gold/50 flex items-center justify-center text-gold hover:bg-gold hover:text-maroon-black hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Photo Gallery Grid ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="editorial-overline block mb-6">02 / Portfolio Archive</span>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div key={i} className="relative overflow-hidden border border-gold/15 aspect-[4/5] group">
              <img src={photo.src} alt={photo.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-[9px] uppercase tracking-wider text-gold font-poppins">{photo.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

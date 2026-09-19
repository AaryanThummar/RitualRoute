import React from 'react';
import { motion } from 'framer-motion';

export default function ImageReveal({
  src,
  alt,
  className = '',
  containerClassName = '',
  curtainColor = 'bg-gold' // bg-gold, bg-maroon, bg-champagne
}) {
  const curtainVariants = {
    hidden: { x: 0 },
    visible: {
      x: '101%',
      transition: { duration: 1.5, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.15, opacity: 0.7 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 2, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Visual Border Overlay */}
      <div className="absolute inset-0 border border-gold/15 pointer-events-none z-10" />

      {/* Mask curtain block */}
      <motion.div
        variants={curtainVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className={`absolute inset-0 z-20 ${curtainColor}`}
      />

      {/* Inner Image */}
      <motion.img
        variants={imageVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover filter contrast-[1.03] brightness-[0.98] ${className}`}
      />
    </div>
  );
}

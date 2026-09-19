import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function LuxuryButton({
  children,
  onClick,
  variant = 'gold-outline', // gold-solid, maroon-solid, gold-outline, ivory-outline
  className = '',
  type = 'button',
  magnetic = true
}) {
  const containerRef = useRef(null);
  
  // Motion spring physics offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.7 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!magnetic || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull range: 30% of pointer distance
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Luxury button variant CSS map
  const variantStyles = {
    'gold-solid': 'bg-gold border border-gold text-maroon-black shadow-[0_0_20px_rgba(200,166,70,0.3)] hover:bg-ivory hover:border-ivory hover:text-maroon hover:shadow-[0_0_35px_rgba(247,241,233,0.5)]',
    'maroon-solid': 'bg-maroon border border-gold/40 text-ivory shadow-[0_0_20px_rgba(74,7,20,0.5)] hover:bg-gold hover:text-maroon-black hover:border-gold hover:shadow-[0_0_30px_rgba(200,166,70,0.4)]',
    'gold-outline': 'bg-transparent border border-gold/60 text-gold shadow-[0_0_15px_rgba(200,166,70,0.15)] hover:bg-gold hover:text-maroon-black hover:shadow-[0_0_30px_rgba(200,166,70,0.4)]',
    'ivory-outline': 'bg-transparent border border-ivory/40 text-ivory shadow-[0_0_15px_rgba(247,241,233,0.1)] hover:border-ivory hover:bg-ivory hover:text-maroon-black hover:shadow-[0_0_30px_rgba(247,241,233,0.4)]'
  };

  const buttonStyle = `px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-500 font-poppins relative z-10 cursor-pointer ${variantStyles[variant] || variantStyles['gold-outline']} ${className}`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative p-2 select-none"
    >
      <motion.button
        type={type}
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={magnetic ? { x: springX, y: springY } : {}}
        className={buttonStyle}
      >
        {children}
      </motion.button>
    </div>
  );
}

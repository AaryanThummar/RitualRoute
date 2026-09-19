import React, { useEffect, createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScrollContext = createContext(null);

export const SmoothScrollProvider = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      smoothWheel: true,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Animation frame hook
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const animFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animFrame);
      lenis.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenisRef.current}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);

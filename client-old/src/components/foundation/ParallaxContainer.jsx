import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ParallaxContainer({ children, speed = -0.15, className = '' }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const outer = outerRef.current;
    if (!inner || !outer) return;

    const anim = gsap.to(inner, {
      y: speed * 120, // Translation range multiplier
      ease: 'none',
      scrollTrigger: {
        trigger: outer,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [speed]);

  return (
    <div ref={outerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={innerRef} className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

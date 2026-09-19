import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import palaceDoorImg from '../assets/palace_door.png';
import coupleImg from '../assets/hero_couple.png';

export default function CinematicIntro({ onComplete }) {
  const containerRef   = useRef(null);
  const canvasRef      = useRef(null);
  const doorLeftRef    = useRef(null);
  const doorRightRef   = useRef(null);
  const doorGlowRef    = useRef(null);
  const logoRef        = useRef(null);
  const blackOverRef   = useRef(null);
  const heroImgRef     = useRef(null);
  const skipRef        = useRef(null);
  const tlRef          = useRef(null);
  const rafRef         = useRef(null);

  /* ── Dust Particles ── */
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.6 + 0.1,
    }));

    let running = true;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,166,70,${p.alpha})`;
        ctx.fill();
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -4) {
          p.y = canvas.height + 4;
          p.x = Math.random() * canvas.width;
        }
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { running = false; };
  }, []);

  /* ── Complete handler ── */
  const complete = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    localStorage.setItem('hh_intro_seen', '1');
    onComplete();
  }, [onComplete]);

  /* ── Skip ── */
  const handleSkip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    // Instant fade-out
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: complete,
    });
  }, [complete]);

  /* ── Main timeline ── */
  useEffect(() => {
    // Pre-load hero image during intro
    const heroPreload = new Image();
    heroPreload.src = coupleImg;

    const stopParticles = initParticles();

    const tl = gsap.timeline({ onComplete: complete });
    tlRef.current = tl;

    const isMobile = window.innerWidth < 768;

    // Scene 1 — particles drift in darkness (0s → 1s)
    tl.set(containerRef.current, { opacity: 1 })
      .set(canvasRef.current,    { opacity: 0 })
      .set([doorLeftRef.current, doorRightRef.current], {
        rotateY: 0,
        transformOrigin: '0% 50%',
        transformStyle: 'preserve-3d',
        opacity: 0,
      })
      .set(doorGlowRef.current,  { opacity: 0 })
      .set(logoRef.current,      { opacity: 0, scale: 0.85 })
      .set(blackOverRef.current, { opacity: 1 })
      .to(canvasRef.current, { opacity: 1, duration: 1.2, ease: 'power2.in' })

    // Scene 2 — palace door fades in (1s → 2s)
      .to([doorLeftRef.current, doorRightRef.current], {
        opacity: 1,
        duration: 1.0,
        ease: 'power2.inOut',
        stagger: 0.05,
      }, '+=0.3')

    // Warm glow pulses through the gap
      .to(doorGlowRef.current, { opacity: 0.55, duration: 0.8, ease: 'power2.in' }, '-=0.4')

    // Scene 3 — doors swing open (2s → 3.5s)
      .to(doorLeftRef.current, {
        rotateY: isMobile ? 70 : 85,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power1.inOut',
      }, '+=0.25')
      .to(doorRightRef.current, {
        rotateY: isMobile ? -70 : -85,
        transformOrigin: 'right center',
        duration: 1.4,
        ease: 'power1.inOut',
      }, '<')
      .to(doorGlowRef.current, { opacity: 1, duration: 1.0, ease: 'power2.out' }, '<+0.3')

    // Scene 4 — Logo appears at centre (3.5s → 4.3s)
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, '-=0.3')
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.5,
        ease: 'power2.in',
      }, '+=0.6')

    // Scene 5 — camera push + fade-out to homepage (4.3s → 5s)
      .to(doorGlowRef.current, { opacity: 0, duration: 0.5 }, '-=0.2')
      .to(canvasRef.current, { opacity: 0, duration: 0.4 }, '<')
      .to([doorLeftRef.current, doorRightRef.current], { opacity: 0, duration: 0.35 }, '<')
      .to(containerRef.current, {
        opacity: 0,
        scale: 1.04,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '-=0.1');

    return () => {
      tl.kill();
      if (stopParticles) stopParticles();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [complete, initParticles]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#220306] flex items-center justify-center overflow-hidden"
      style={{ perspective: '900px' }}
    >
      {/* Canvas — golden dust particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Palace door — left leaf */}
      <div
        ref={doorLeftRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 50% 0 0)', transformStyle: 'preserve-3d' }}
      >
        <img
          src={palaceDoorImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* Palace door — right leaf */}
      <div
        ref={doorRightRef}
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: 'inset(0 0 0 50%)', transformStyle: 'preserve-3d' }}
      >
        <img
          src={palaceDoorImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          draggable={false}
        />
      </div>

      {/* Golden light that floods through as doors open */}
      <div
        ref={doorGlowRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 80% at 50% 55%, rgba(200,166,70,0.35) 0%, rgba(180,100,20,0.18) 45%, transparent 75%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Logo — Scene 4 */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border border-gold/60 flex items-center justify-center mb-1"
            style={{ borderColor: 'rgba(200,166,70,0.6)' }}>
            <span style={{ color: '#C8A646', fontSize: '22px' }}>♥</span>
          </div>
          <p style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#C8A646',
            lineHeight: 1,
          }}>
            Heritage &amp; Harmony
          </p>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(11px, 1.5vw, 14px)',
            fontStyle: 'italic',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(249,245,239,0.55)',
            marginTop: '-4px',
          }}>
            The Art of Traditions
          </p>
        </div>
      </div>

      {/* Black overlay — dims fully at start, removed at end */}
      <div
        ref={blackOverRef}
        className="absolute inset-0 bg-black pointer-events-none z-[1]"
        style={{ opacity: 0.85 }}
      />

      {/* Skip Intro button */}
      <button
        ref={skipRef}
        onClick={handleSkip}
        className="absolute bottom-7 right-7 z-20 text-[9px] font-semibold tracking-[0.25em] uppercase cursor-pointer border border-white/15 px-4 py-2 transition-colors duration-300"
        style={{ color: 'rgba(249,245,239,0.45)', fontFamily: '"Poppins", sans-serif' }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(212,175,55,0.9)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(249,245,239,0.45)'}
      >
        Skip Intro
      </button>
    </div>
  );
}

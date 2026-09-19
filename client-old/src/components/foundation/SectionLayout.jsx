import React from 'react';

export default function SectionLayout({
  children,
  bg = 'dark', // dark, card, champagne, ivory
  frame = false,
  width = 'centered', // centered, full
  className = '',
  id = ''
}) {
  // Background style mapper
  const bgStyles = {
    dark: 'bg-maroon-black text-ivory',
    card: 'bg-maroon text-ivory border border-gold/15',
    champagne: 'bg-champagne text-maroon-black',
    ivory: 'bg-ivory text-maroon-black'
  };

  const selectedBg = bgStyles[bg] || bgStyles.dark;
  const containerClass = width === 'centered' ? 'max-w-7xl mx-auto px-6 md:px-12 w-full' : 'w-full';

  return (
    <section
      id={id}
      className={`relative py-28 md:py-36 overflow-hidden flex flex-col justify-center ${selectedBg} ${className}`}
    >
      {/* Editorial outer borders */}
      {frame && (
        <div className="absolute inset-4 md:inset-8 border border-gold/20 pointer-events-none z-10">
          <div className="absolute inset-1 border border-gold/5" />
        </div>
      )}

      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
}

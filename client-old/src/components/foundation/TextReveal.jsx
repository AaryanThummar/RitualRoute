import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ text, delay = 0, className = '' }) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '100%',
      transition: { ease: [0.76, 0, 0.24, 1], duration: 0.9 },
    },
    visible: {
      y: 0,
      transition: { ease: [0.76, 0, 0.24, 1], duration: 1.2 },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-8%' }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="relative overflow-hidden mr-2 md:mr-3 inline-block py-1">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

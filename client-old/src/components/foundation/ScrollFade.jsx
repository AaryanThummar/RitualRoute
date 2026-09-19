import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollFade({
  children,
  delay = 0,
  duration = 1,
  direction = 'up', // up, down, left, right
  className = ''
}) {
  const getDirections = () => {
    switch (direction) {
      case 'down': return { y: -30, x: 0 };
      case 'left': return { y: 0, x: 30 };
      case 'right': return { y: 0, x: -30 };
      case 'up':
      default:
        return { y: 30, x: 0 };
    }
  };

  const offsets = getDirections();

  const fadeVariants = {
    hidden: {
      opacity: 0,
      x: offsets.x,
      y: offsets.y
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // clean luxury ease out
      }
    }
  };

  return (
    <motion.div
      variants={fadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-5%' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

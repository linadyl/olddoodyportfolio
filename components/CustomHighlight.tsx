"use client";

import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface CustomHighlightProps {
  children: ReactNode;
  color?: string;
  animate?: boolean;
  height?: string;
  rounded?: boolean;
  hoverEffect?: boolean;
  opacity?: number;
}

const CustomHighlight: React.FC<CustomHighlightProps> = ({ 
  children, 
  color = "#a3b1ff", 
  animate = true,
  height = "33%",
  rounded = true,
  hoverEffect = true,
  opacity = 0.4
}) => {
  const highlightVariants: Variants = {
    initial: {
      width: '0%',
    },
    animate: {
      width: '100%',
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const hoverVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: [0, -2, 0, 2, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <motion.span 
      className="relative inline-block z-10"
      variants={hoverEffect ? hoverVariants : undefined}
      initial="initial"
      whileHover={hoverEffect ? "hover" : undefined}
    >
      {animate ? (
        <motion.span
          variants={highlightVariants}
          initial="initial"
          animate="animate"
          className="absolute bottom-0 left-0 z-[-1]"
          style={{
            height: height,
            backgroundColor: color,
            borderRadius: rounded ? '4px' : '0',
            opacity: opacity 
          }}
        />
      ) : (
        <span 
          className="absolute bottom-0 left-0 w-full z-[-1]"
          style={{
            height: height,
            backgroundColor: color,
            borderRadius: rounded ? '4px' : '0',
            opacity: opacity 
          }}
        />
      )}
      {children}
    </motion.span>
  );
};

export default CustomHighlight;
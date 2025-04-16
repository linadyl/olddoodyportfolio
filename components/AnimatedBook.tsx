"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";

interface StickerType {
  id: string;
  src: string;
  alt: string;
  link: string;
  position: {
    top: string;
    left: string;
  };
  size: {
    width: number;
    height: number;
  };
  rotationDeg?: number;
}

interface AnimatedBookProps {
  bookImageSrc: string;
  stickers?: StickerType[];
}

const AnimatedBook: React.FC<AnimatedBookProps> = ({ bookImageSrc, stickers = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Use state to track hover and animation states instead of animation controls
  const [animatedStickers, setAnimatedStickers] = useState<boolean[]>(Array(stickers.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Handle animation entry
  useEffect(() => {
    // Create a ref to the current container element
    const currentContainer = containerRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate stickers in sequence
          stickers.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedStickers(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, 700 + (index * 80));
          });
        }
      },
      { threshold: 0.5 }
    );
    
    if (currentContainer) {
      observer.observe(currentContainer);
    }
    
    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, [stickers]); // Add stickers as a dependency

  const bookVariants: Variants = {
    offscreen: {
      y: 100,
      opacity: 0.5,
      scale: 0.95,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full py-32 overflow-hidden" ref={containerRef}>
      <motion.div
        className="relative flex justify-center items-center"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: false, amount: 0.5 }}
      >
        <motion.div 
          className="relative"
          variants={bookVariants}
        >
          <Image
            src={bookImageSrc}
            alt="Open book"
            width={1300}
            height={900}
            priority
            className="w-full"
          />
          
          {stickers.map((sticker, index) => (
            <motion.div
              key={sticker.id}
              className="absolute cursor-pointer"
              style={{
                top: sticker.position.top,
                left: sticker.position.left,
                zIndex: hoveredIndex === index ? 20 : 10,
                cursor: "none",
              }}
              initial={{
                y: 20,
                opacity: 0,
                scale: 0.9,
                rotate: 0
              }}
              animate={{
                y: animatedStickers[index] ? 0 : 20,
                opacity: animatedStickers[index] ? 1 : 0,
                scale: hoveredIndex === index ? 1.05 : 1,
                rotate: hoveredIndex === index ? 0 : (index % 2 === 0 ? 8 : -8),
                zIndex: hoveredIndex === index ? 20 : 10
              }}
              transition={{
                duration: hoveredIndex === index ? 0.1 : 0.5,
                ease: "easeOut"
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={sticker.src}
                alt={sticker.alt}
                width={sticker.size.width}
                height={sticker.size.height}
                className="drop-shadow-md"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedBook;
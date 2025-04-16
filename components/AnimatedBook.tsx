"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, Variants, useAnimationControls } from "motion/react";

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

  const stickerVariants: Variants = {
    offscreen: {
      y: 20,
      opacity: 0,
      scale: 0.9,
      rotate: 0,
    },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: i % 2 === 0 ? 8 : -8, 
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.7 + (i * 0.08),
      },
    }),
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
          
          {stickers.map((sticker, index) => {
            const controls = useAnimationControls();
            
            return (
              <motion.div
                key={sticker.id}
                className="absolute cursor-pointer"
                style={{
                  top: sticker.position.top,
                  left: sticker.position.left,
                  zIndex: 10,
                  cursor: "none",
                }}
                variants={stickerVariants}
                custom={index}
                initial="offscreen"
                animate={controls}
                onViewportEnter={() => {
                  controls.start({
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: index % 2 === 0 ? 8 : -8,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.7 + (index * 0.08),
                    }
                  });
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 20,
                  transition: {
                    duration: 0.1,
                    ease: "easeOut"
                  }
                }}
                onHoverEnd={() => {
                  controls.start({
                    scale: 1,
                    rotate: index % 2 === 0 ? 8 : -8,
                    zIndex: 10,
                    transition: {
                      duration: 0.05,
                      ease: "easeOut"
                    }
                  });
                }}
              >
                <Image
                  src={sticker.src}
                  alt={sticker.alt}
                  width={sticker.size.width}
                  height={sticker.size.height}
                  className="drop-shadow-md"
                />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedBook;
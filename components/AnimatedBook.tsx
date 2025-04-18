"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "motion/react";
import { useCursor } from "./CursorContext";
import StickerPopup from "./StickerPopup";

interface StickerType {
  id: string;
  src: string;
  alt: string;
  link: string;
  title?: string;
  position: {
    top: string;
    left: string;
  };
  size: {
    width: number;
    height: number;
  };
  rotationDeg?: number;
  desc: string; // This is for the hover tooltip
  popupDesc?: string; // This is for the popup description
  popupImage?: string; // This is for the popup image
  buttonText?: string; // This is for the button text
  disableLink?: boolean; // This is to disable the link
  popupColor?: string;
  textColor?: string;
  tags?: Array<{
    name: string;
    color?: string;
    textColor?: string;
  }>;
}

interface AnimatedBookProps {
  bookImageSrc: string;
  stickers?: StickerType[];
}

// Tag component for the hover tooltip
interface TooltipTagProps {
  name: string;
  color?: string;
  textColor?: string;
}

const TooltipTag: React.FC<TooltipTagProps> = ({ name, color = "#d4d4d4", textColor = "#271918" }) => {
  return (
    <div 
      className="px-2 py-0.5 rounded-full text-xs font-mono inline-flex items-center justify-center"
      style={{ 
        backgroundColor: color,
        color: textColor,
        border: "1px solid #271918",
        margin: "2px",
        fontSize: "0.65rem"
      }}
    >
      {name}
    </div>
  );
};

const AnimatedBook: React.FC<AnimatedBookProps> = ({ bookImageSrc, stickers = [] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedStickers, setAnimatedStickers] = useState<boolean[]>(Array(stickers.length).fill(false));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { setHoverColor, setIsStickerHovered } = useCursor();
  
  // New states for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState<StickerType | null>(null);
  const [activeStickerEl, setActiveStickerEl] = useState<HTMLElement | null>(null);
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
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
  }, [stickers]);

  // Set hover color when hovering over a sticker
  useEffect(() => {
    if (hoveredIndex !== null && stickers[hoveredIndex]?.popupColor) {
      setHoverColor(stickers[hoveredIndex].popupColor);
      setIsStickerHovered(true);
    } else {
      setHoverColor(null);
      setIsStickerHovered(false);
    }
    
    return () => {
      setHoverColor(null);
      setIsStickerHovered(false);
    };
  }, [hoveredIndex, stickers, setHoverColor, setIsStickerHovered]);

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

  const handleStickerClick = (sticker: StickerType, index: number) => {
    // Store the sticker element for positioning
    const stickerElement = document.getElementById(`sticker-${sticker.id}`);
    
    if (stickerElement) {
      setActiveStickerEl(stickerElement);
      setSelectedSticker(sticker);
      setIsPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedSticker(null);
    setActiveStickerEl(null);
  };

  return (
    <div className="w-full py-32 overflow-hidden relative" ref={containerRef}>
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
              id={`sticker-${sticker.id}`}
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
                rotate: hoveredIndex === index ? 0 : (sticker.rotationDeg || (index % 2 === 0 ? 8 : -8)),
                zIndex: hoveredIndex === index ? 20 : 10
              }}
              transition={{
                duration: hoveredIndex === index ? 0.1 : 0.5,
                ease: "easeOut"
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleStickerClick(sticker, index)}
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
          
          {/* Tooltip that follows cursor when hovering a sticker */}
          {hoveredIndex !== null && !isPopupOpen && (
            <motion.div
              className="fixed pointer-events-none z-50 rounded-md font-mono text-sm"
              style={{
                left: `${mousePosition.x + 15}px`, // Offset from cursor
                top: `${mousePosition.y + 15}px`,
                backgroundColor: stickers[hoveredIndex].popupColor || "#e3e7ff",
                color: stickers[hoveredIndex].textColor || "#271918",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                border: "2px solid #271918",
                overflow: "hidden",
                maxWidth: "250px"
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <div className="px-3 py-2">
                {stickers[hoveredIndex].desc}
              </div>
              
              {/* Tags section below description */}
              {stickers[hoveredIndex].tags && stickers[hoveredIndex].tags.length > 0 && (
                <div 
                  className="flex flex-wrap gap-1 p-2 mt-1"
                  style={{ 
                    borderTop: `1px solid ${stickers[hoveredIndex].textColor || "#271918"}`,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  {stickers[hoveredIndex].tags.map((tag, tagIndex) => (
                    <TooltipTag 
                      key={tagIndex} 
                      name={tag.name} 
                      color={tag.color}
                      textColor={tag.textColor}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Popup component */}
      <StickerPopup 
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        sticker={selectedSticker}
        position={{ x: 0, y: 0 }} // Not used anymore but kept for interface compatibility
        stickerEl={activeStickerEl}
        tags={selectedSticker?.tags || []} 
      />
    </div>
  );
};

export default AnimatedBook;
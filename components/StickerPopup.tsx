"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import Link from "next/link";

interface TagProps {
  name: string;
  color?: string;
  textColor?: string;
}

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

interface StickerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  sticker: StickerType | null;
  position: { x: number; y: number };
  stickerEl?: HTMLElement | null;
  tags?: TagProps[];
  isMobile?: boolean;
  zIndex?: number;
  onInteraction?: () => void;
}

const Tag: React.FC<TagProps> = ({ name, color = "#d4d4d4", textColor = "#271918" }) => {
  return (
    <div 
      className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono inline-flex items-center justify-center"
      style={{ 
        backgroundColor: color,
        color: textColor,
        border: "1px solid #271918",
        cursor: 'none'
      }}
    >
      {name}
    </div>
  );
};

const StickerPopup: React.FC<StickerPopupProps> = ({ 
  isOpen, 
  onClose, 
  sticker, 
  stickerEl,
  tags = [],
  isMobile: propIsMobile = false,
  zIndex = 100,
  onInteraction
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(propIsMobile);
  
  // Motion values for tracking drag position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Handle interactions that should bring popup to front
  const handleInteraction = () => {
    if (!isMobile && onInteraction) {
      onInteraction();
    }
  };
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen && isMobile) { // Only use click outside to close on mobile
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isMobile]);
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
    };
    
    // Initial check
    checkIsMobile();
    
    // Check on resize
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);
  
  // Function to calculate and update popup position
  const updatePopupPosition = () => {
    if (!isOpen) return;
    
    // Always check current screen width directly
    const currentIsMobile = window.innerWidth < 768;
    
    if (currentIsMobile) {
      // For mobile, position in the center of the viewport at a fixed position
      setPopupPosition({
        top: window.innerHeight * 0.15, // Position at 15% from the top
        left: (window.innerWidth - 280) / 2  // Center horizontally (assuming 280px width)
      });
    } else if (stickerEl) {
      // For desktop, position near the sticker
      const stickerRect = stickerEl.getBoundingClientRect();
      const popupWidth = 380;
      
      // Center horizontally over the sticker
      const left = stickerRect.left + (stickerRect.width / 2) - (popupWidth / 2);
      
      // Position above the sticker
      const top = stickerRect.top - 450; // Place 450px above the top of sticker
      
      // Handle case where popup would go off the top of the screen
      const finalTop = top < 20 ? 20 : top;
      
      // Handle case where popup would go off the sides
      const finalLeft = Math.max(20, Math.min(left, window.innerWidth - popupWidth - 20));
      
      setPopupPosition({ 
        top: finalTop, 
        left: finalLeft 
      });
    }
    
    // Reset motion values when position changes
    x.set(0);
    y.set(0);
  };

  // Calculate position when popup opens and handle window resize
  useEffect(() => {
    if (isOpen) {
      // Initial positioning
      updatePopupPosition();
      
      // Add resize listener
      window.addEventListener('resize', updatePopupPosition);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', updatePopupPosition);
      };
    }
  }, [isOpen, stickerEl]);

  if (!sticker) return null;
  
  const backgroundColor = sticker.popupColor || "#e3e7ff";
  const textColor = sticker.textColor || "#271918";
  
  // Use popup description if available, otherwise fall back to hover description
  const description = sticker.popupDesc || sticker.desc;
  
  // Use popup image if available, otherwise use the sticker image
  const imageSrc = sticker.popupImage || sticker.src;
  
  // Use custom button text if available, otherwise use default
  const buttonText = sticker.buttonText || "VIEW PROJECT →";

  // Decide whether to render a Link or a div based on disableLink
  const ActionButton = () => {
    const buttonStyle = {
      backgroundColor: textColor,
      color: backgroundColor,
      width: '100%',
      border: `2px outset ${textColor}`
    };
    
    const className = "py-2 px-4 text-center text-xs sm:text-sm cursor-pointer";
    
    // If link is disabled, render a div instead
    if (sticker.disableLink) {
      return (
        <div 
          className={className}
          style={{ ...buttonStyle, cursor: 'none' }}
        >
          {buttonText}
        </div>
      );
    }
    
    // Determine if the link is external (starts with http:// or https://)
    const isExternalLink = sticker.link.startsWith('http://') || sticker.link.startsWith('https://');
    
    // Otherwise render a Link component
    return (
      <Link 
        href={sticker.link} 
        style={{ cursor: 'none' }}
        target={isExternalLink ? "_blank" : undefined}
        rel={isExternalLink ? "noopener noreferrer" : undefined}
      >
        <div 
          className={className}
          style={{ ...buttonStyle, cursor: 'none' }}
        >
          {buttonText}
        </div>
      </Link>
    );
  };

  // Determine whether we should show mobile or desktop version based on current window size
  const currentIsMobile = window.innerWidth < 768;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className={`fixed ${currentIsMobile ? 'max-h-[70vh] overflow-y-auto w-[280px]' : 'w-[380px]'} font-mono`}
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
            x,
            y,
            cursor: 'none',
            zIndex: zIndex, // Use provided zIndex
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: 0,
            transition: {
              duration: 0.2
            }
          }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          // Only enable dragging on desktop
          drag={!currentIsMobile}
          dragMomentum={false}
          dragElastic={0.1}
          onDragStart={() => {
            setIsDragging(true);
            handleInteraction(); // Bring to front when starting drag
          }}
          onDragEnd={() => setIsDragging(false)}
          onMouseDown={handleInteraction} // Bring to front on any interaction
          onTouchStart={handleInteraction}
          // Prevent default behavior on the entire popup to avoid image dragging issues
          onDragOver={(e) => e.preventDefault()}
        >
          {/* Drag handle at the top-center (desktop only) */}
          {!currentIsMobile && (
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3 opacity-70 text-xs flex justify-center w-10 h-6 z-10" 
              title="Drag to move"
              style={{ cursor: 'none' }}
            >
              <span className="inline-block px-2 py-1 bg-gray-100 rounded-t-md border border-gray-300" style={{ cursor: 'none' }}>⚬⚬⚬</span>
            </div>
          )}
          
          {/* Retro-style popup container with user-select-none to prevent text selection while dragging */}
          <div 
            className="p-3 sm:p-4 rounded-md shadow-md select-none"
            style={{ 
              backgroundColor: backgroundColor,
              color: textColor,
              border: `3px solid #271918`,
              boxShadow: `4px 4px 0px #271918`,
              cursor: 'none',
              WebkitUserSelect: 'none', // For Safari
              MozUserSelect: 'none', // For Firefox
              msUserSelect: 'none' // For IE/Edge
            }}
          >
            {/* Header with title */}
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <div className="text-base sm:text-lg font-bold uppercase">
                {sticker.title || sticker.id}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onInteraction
                  onClose();
                }}
                className="w-6 h-6 flex items-center justify-center rounded-full"
                style={{ 
                  backgroundColor: textColor,
                  color: backgroundColor,
                  cursor: 'none'
                }}
              >
                ×
              </button>
            </div>
            
            {/* Project image - with pointer-events-none to prevent it from interfering with dragging */}
            <div 
              className="w-full h-28 sm:h-48 mb-2 sm:mb-3 relative bg-gray-200 flex items-center justify-center overflow-hidden"
              style={{ border: `2px solid ${textColor}` }}
            >
              <Image
                src={imageSrc}
                alt={sticker.alt || sticker.title || sticker.id}
                fill
                style={{ objectFit: 'cover' }}
                className="pointer-events-none" // Prevent image from interfering with drag
                draggable="false" // Explicitly prevent dragging
                unselectable="on" // Additional prevention for older browsers
              />
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
              {tags.map((tag, index) => (
                <Tag 
                  key={index} 
                  name={tag.name} 
                  color={tag.color}
                  textColor={tag.textColor}
                />
              ))}
            </div>
            
            {/* Description */}
            <div 
              className="mb-3 sm:mb-4 text-xs sm:text-sm"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                border: `1px solid ${textColor}`,
                padding: '8px',
                borderRadius: '2px'
              }}
            >
              {description}
            </div>
            
            {/* Action Button (Link or div) */}
            <ActionButton />
            
            {/* Desktop-only draggable hint text */}
            {!currentIsMobile && (
              <div className="text-[10px] mt-2 opacity-60 text-center" style={{ cursor: 'none' }}>
                Click and drag to move this popup
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickerPopup;
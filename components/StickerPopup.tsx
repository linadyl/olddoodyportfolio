"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
}

const Tag: React.FC<TagProps> = ({ name, color = "#d4d4d4", textColor = "#271918" }) => {
  return (
    <div 
      className="px-3 py-1 rounded-full text-xs font-mono inline-flex items-center justify-center"
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
  tags = []
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Calculate position directly above the sticker element
  useEffect(() => {
    if (stickerEl && isOpen) {
      const stickerRect = stickerEl.getBoundingClientRect();
      const popupWidth = 380; // Approximate width
      
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
    
    const className = "py-2 px-4 text-center text-sm cursor-pointer";
    
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={popupRef}
          className="fixed z-[100] w-96 font-mono"
          style={{
            top: `${popupPosition.top}px`,
            left: `${popupPosition.left}px`,
          }}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {/* Retro-style popup container */}
          <div 
            className="p-4 rounded-md shadow-md"
            style={{ 
              backgroundColor: backgroundColor,
              color: textColor,
              border: `3px solid #271918`,
              boxShadow: `4px 4px 0px #271918`,
              cursor: 'none'
            }}
          >
            {/* Close button */}
            <div className="flex justify-between items-center mb-3">
              <div className="text-lg font-bold uppercase">
                {sticker.title || sticker.id}
              </div>
              <button 
                onClick={onClose}
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
            
            {/* Project image */}
            <div 
              className="w-full h-48 mb-3 relative bg-gray-200 flex items-center justify-center overflow-hidden"
              style={{ border: `2px solid ${textColor}` }}
            >
              <Image
                src={imageSrc}
                alt={sticker.alt || sticker.title || sticker.id}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
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
              className="mb-4 text-sm"
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickerPopup;
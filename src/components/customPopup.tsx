import React, { useState, useEffect, useRef } from 'react';
import '../styles/popup.css';

interface OptimizedPopupProps {
  isOpen: boolean;
  onClose: () => void;
  backgroundImage: string;
  children?: React.ReactNode;
  width?: string;
  height?: string;
}

const imageCache: Record<string, boolean> = {};

const OptimizedPopup: React.FC<OptimizedPopupProps> = ({
  isOpen,
  onClose,
  backgroundImage,
  children,
  width = '80%',
  height = '80%'
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(imageCache[backgroundImage] || false);
  const [isAnimating, setIsAnimating] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageCache[backgroundImage]) {
      const img = new Image();
      img.onload = () => {
        imageCache[backgroundImage] = true;
        if (isOpen) {
          setIsImageLoaded(true);
        }
      };
      img.src = backgroundImage;
    }
  }, [backgroundImage]);

  useEffect(() => {
    if (isOpen) {
      if (imageCache[backgroundImage]) {
        setIsImageLoaded(true);
      }
      
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, backgroundImage]);

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

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div 
        ref={popupRef}
        className={`popup-container ${isAnimating ? 'popup-active' : ''}`}
        style={{ width, height }}
      >
        {!isImageLoaded && (
          <div className="popup-placeholder"></div>
        )}
        
        <img 
          src={backgroundImage} 
          alt="Popup content"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: isImageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
          onLoad={() => {
            imageCache[backgroundImage] = true;
            setIsImageLoaded(true);
          }}
        />
        
        <button 
          className="popup-close-btn" 
          onClick={() => onClose()}
          type="button"
          aria-label="Close popup"
        >×</button>
        
        <div className="popup-content" style={{ opacity: isImageLoaded ? 1 : 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default OptimizedPopup;
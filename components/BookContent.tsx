"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BookContentProps {
  children: ReactNode;
}

const BookContent: React.FC<BookContentProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div 
      className={`absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 lg:p-16 ${isMobile ? 'overflow-y-auto' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{ 
        touchAction: 'auto',
        overscrollBehavior: 'contain',
      }}
    >
      <div 
        className="w-full h-full flex flex-col relative"
        style={{
          transform: "rotate(-1deg)",
          backgroundImage: "url('/paper-texture.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-mono px-3 py-4 sm:p-4 sm:px-6 md:p-8 md:px-12 lg:p-16 lg:px-24 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default BookContent;
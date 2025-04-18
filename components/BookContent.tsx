"use client";

import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface BookContentProps {
  children: ReactNode;
}

const BookContent: React.FC<BookContentProps> = ({ children }) => {
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <div 
        className="w-full h-full flex flex-col"
        style={{
          transform: "rotate(-1deg)",
          backgroundImage: "url('/paper-texture.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="font-mono p-16 px-24 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default BookContent;
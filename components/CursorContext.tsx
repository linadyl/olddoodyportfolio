"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CursorContextType {
  hoverColor: string | null;
  setHoverColor: (color: string | null) => void;
  isStickerHovered: boolean;
  setIsStickerHovered: (isHovered: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [isStickerHovered, setIsStickerHovered] = useState<boolean>(false);

  return (
    <CursorContext.Provider value={{ 
      hoverColor, 
      setHoverColor, 
      isStickerHovered, 
      setIsStickerHovered 
    }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
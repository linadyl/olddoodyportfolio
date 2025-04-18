"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useCursor } from "./CursorContext";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { hoverColor, isStickerHovered } = useCursor();

  const X_OFFSET = 10;
  const Y_OFFSET = 10;

  useEffect(() => {
    const updateInitialPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateInitialPosition, { once: true });
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      
      if (
        !relatedTarget ||
        !(
          relatedTarget.tagName === "A" ||
          relatedTarget.tagName === "BUTTON" ||
          relatedTarget.tagName === "INPUT" ||
          relatedTarget.closest("a") ||
          relatedTarget.closest("button") ||
          relatedTarget.closest("input") ||
          relatedTarget.classList.contains("cursor-pointer") ||
          relatedTarget.closest(".cursor-pointer")
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", handleMouseOver as EventListener);
    document.addEventListener("mouseout", handleMouseOut as EventListener);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver as EventListener);
      document.removeEventListener("mouseout", handleMouseOut as EventListener);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!position) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[999]" // Highest z-index to stay on top
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      animate={{
        x: -X_OFFSET,
        y: -Y_OFFSET,
      }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300,
        mass: 0.5,
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isHovering ? (
          <motion.div
            key="hover-cursor"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.9, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.08, ease: "easeOut" }}
            className="w-3.5 h-3.5 border border-foreground"
            style={{ 
              backgroundColor: isStickerHovered && hoverColor ? hoverColor : '#a3b1ff'
            }}
          />
        ) : (
          <motion.div
            key="default-cursor"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            <Image src="/cursor.svg" alt="custom cursor" width={54} height={46} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CustomCursor;
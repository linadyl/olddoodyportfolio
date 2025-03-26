import React, { useState, useEffect } from "react";
import "./customCursor.css";
import cursorSvg from "../assets/cursor.svg";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const X_OFFSET = 20;
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
        target.tagName === "INPUT"
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseover", handleMouseOver as EventListener);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseover", handleMouseOver as EventListener);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  if (!position) {
    return null;
  }

  return (
    <div
      className={`custom-cursor ${isHovering ? "hovering" : ""}`}
      style={{
        left: `${position.x + X_OFFSET}px`,
        top: `${position.y + Y_OFFSET}px`,
      }}
    >
      <img src={cursorSvg} alt="custom cursor" />
    </div>
  );
};

export default CustomCursor;

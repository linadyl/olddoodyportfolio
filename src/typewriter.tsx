import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [showCursor, setShowCursor] = useState<boolean>(true);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, text, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500); 
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <p className="text-[30px]">
      {displayedText}
      <span
        className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}
      >
        |
      </span>
    </p>
  );
};

export default TypewriterText;

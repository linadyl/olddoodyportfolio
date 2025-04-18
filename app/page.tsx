"use client";

import Header from '@/components/Header';
import CustomCursor from "@/components/cursor";
import AnimatedBook from "@/components/AnimatedBook";
import CustomHighlight from "@/components/CustomHighlight";
import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";
import WigglingAsciiBackground from "@/components/WigglingAsciiBackground";

const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  const controls = useAnimationControls();
  
  const cursorVariants = {
    blink: {
      opacity: [1, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  };

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText('');
    
    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText(text.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextCharacter, 50);
      }
    };
    
    setTimeout(() => {
      typeNextCharacter();
      controls.start("blink");
    }, 500);
    
    return () => {
      currentIndex = text.length;
    };
  }, [text, controls]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span>{displayedText}</span>
      <motion.span
        variants={cursorVariants}
        animate="blink"
        style={{
          display: 'inline-block',
          width: '0.2em',
          height: '1.2em',
          backgroundColor: '#a3b1ff',
          marginLeft: '2px',
          verticalAlign: 'middle',
        }}
      />
    </div>
  );
};

export default function Home() {
  const stickers = [
    {
      id: "brewmatch",
      src: "/stickers/bm.png",
      alt: "brewmatch project logo sticker",
      link: "/brewmatch",
      title: "brewmatch",
      position: { top: "18%", left: "17%" },
      size: { width: 280, height: 280 },
      rotationDeg: 10,
      role: "full-stack"
    },
    {
      id: "quickcatch",
      src: "/stickers/qc.png",
      alt: "quickcatch project logo sticker",
      link: "/quickcatch",
      title: "quickcatch",
      position: { top: "20%", left: "60%"},
      size: { width: 250, height: 250 },
      rotationDeg: 15,
      role: "full-stack"
    },
    {
      id: "portfolio",
      src: "/stickers/site.png",
      alt: "portfolio site logo sticker",
      link: "/porfolio",
      title: "my portfolio!",
      position: { top: "60%", left: "25%" },
      size: { width: 250, height: 250 },
      rotationDeg: 8,
      role: "full-stack"
    },
    {
      id: "handmotion",
      src: "/stickers/arduino.gif",
      alt: "gif of hand instrument demo",
      link: "/arduinoproj",
      title: "hand instrument",
      position: { top: "60%", left: "60%" },
      size: { width: 300, height: 200 },
      rotationDeg: 10,
      role: "full-stack"
    }
  ];

  return (
    <main>
      <WigglingAsciiBackground />
      <CustomCursor />
      <Header />
      <div className="font-mono p-44 w-3/5 text-[50px] leading-[119.958%] tracking-[-3.5px] text-foreground">
        ʕ•ᴥ•ʔ&lt; hi! my name is <span className="text-accent"><CustomHighlight>lina</CustomHighlight></span> and i&apos;m a <span className="text-3xl -ml-5">(n aspiring)</span> <span className="text-accent">design engineer</span> based in toronto
        <div className="mt-2 text-[25px]">
          <TypewriterText text="↪ studying interactive media @ sheridan college 🥸" />
        </div>
      </div>
      
      <div className="flex justify-center mt-13">
        <motion.div 
          animate={{ 
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="font-mono text-accent text-center"
        >
          my project book!
          <div className="mt-2 -mb-5">↓</div>
        </motion.div>
      </div>
      
      <AnimatedBook 
        bookImageSrc="/book.png" 
        stickers={stickers}
      />
    </main>
  );
}
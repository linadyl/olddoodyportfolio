"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'motion/react';
import { useState, useEffect, ReactNode } from "react";
import CustomHighlight from "@/components/CustomHighlight"; 

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered ? (
        <CustomHighlight 
          opacity={0.6} 
          height="30%" 
          animate={true}
          hoverEffect={true}
        >
          <Link href={href}>
            {children}
          </Link>
        </CustomHighlight>
      ) : (
        <Link href={href}>
          {children}
        </Link>
      )}
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="w-full p-16 relative">
      <div className="fixed top-16 left-16 z-10 flex flex-col items-center">
        <motion.div 
          animate={{ 
            rotate: isScrolled ? 360 : 0
          }}
          transition={{
            rotate: {
              duration: isScrolled ? 5 : 0.5,
              repeat: isScrolled ? Infinity : 0,
              ease: "linear"
            }
          }}
          onClick={scrollToTop}
          className="cursor-pointer"
          style={{ cursor: 'none' }}
        >
          <Image 
            src="/logo.svg" 
            alt="logo image" 
            width={100} 
            height={100} 
          />
        </motion.div>
        
        <motion.div
          className="mt-3 text-xs font-mono text-accent"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isScrolled ? 1 : 0
          }}
          transition={{
            duration: 0.3
          }}
        >
          back to top
        </motion.div>
      </div>
      
      <div className="flex justify-end w-full">
        <nav className="font-mono flex gap-10 text-accent">
          <NavLink href="/">home</NavLink>
          <NavLink href="/about">about</NavLink>
          <NavLink href="https://linkedin.com/in/lina-lee0718">linkedin</NavLink>
          <NavLink href="https://github.com/linadyl">github</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
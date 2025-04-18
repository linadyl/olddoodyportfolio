"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'motion/react';
import { useState, useEffect, ReactNode } from "react";
import CustomHighlight from "@/components/CustomHighlight"; 

interface NavLinkProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    // Initial checks
    handleScroll();
    checkMobile();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full p-4 sm:p-8 md:p-16 relative">
      {/* Logo - centered on mobile */}
      <div className={`${isMobile ? 'fixed w-full flex justify-center top-4 left-0' : 'fixed top-4 sm:top-8 md:top-16 left-4 sm:left-8 md:left-16'} z-30`}>
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
          className="cursor-pointer flex flex-col items-center"
          style={{ cursor: 'none' }}
        >
          <Image 
            src="/logo.svg" 
            alt="logo image" 
            width={isMobile ? 55 : 100} 
            height={isMobile ? 55 : 100} 
          />
          
          <motion.div
            className="mt-1 text-[9px] sm:text-xs font-mono text-accent"
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
        </motion.div>
      </div>
      
      {/* Desktop navigation */}
      <div className="hidden md:flex justify-end w-full">
        <nav className="font-mono flex gap-10 text-accent">
          <NavLink href="/">home</NavLink>
          <NavLink href="/about">about</NavLink>
          <NavLink href="https://linkedin.com/in/lina-lee0718">linkedin</NavLink>
          <NavLink href="https://github.com/linadyl">github</NavLink>
        </nav>
      </div>
      
      {/* Mobile menu button - smaller and accent colored */}
      <div className="fixed top-4 right-4 z-30 md:hidden">
        <button 
          className="p-1.5 rounded-md bg-transparent"
          onClick={toggleMobileMenu}
          style={{ cursor: 'none' }}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <div 
              className={`h-0.5 transition-all bg-accent ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`}
            ></div>
            <div 
              className={`h-0.5 transition-all bg-accent ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            ></div>
            <div 
              className={`h-0.5 transition-all bg-accent ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}
            ></div>
          </div>
        </button>
      </div>
      
      {/* Mobile menu */}
      <motion.div 
        className="fixed top-0 right-0 h-screen bg-background/95 border-l border-foreground/20 z-20 md:hidden overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
        style={{ width: '60%' }}
      >
        <div className="pt-20 px-6">
          <nav className="font-mono flex flex-col gap-6 text-accent text-base">
            <NavLink href="/" onClick={closeMobileMenu}>home</NavLink>
            <NavLink href="/about" onClick={closeMobileMenu}>about</NavLink>
            <NavLink href="https://linkedin.com/in/lina-lee0718" onClick={closeMobileMenu}>linkedin</NavLink>
            <NavLink href="https://github.com/linadyl" onClick={closeMobileMenu}>github</NavLink>
          </nav>
        </div>
      </motion.div>
      
      {/* Light overlay for mobile menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-foreground/10 z-10 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeMobileMenu}
        />
      )}
    </header>
  );
};

export default Header;
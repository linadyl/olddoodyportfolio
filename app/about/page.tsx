"use client";
import Header from '@/components/Header';
import CustomCursor from "@/components/cursor";
import CustomHighlight from "@/components/CustomHighlight";
import { CursorProvider } from '@/components/CursorContext';
import { motion } from "motion/react";
import { useState, useEffect, ReactNode } from "react";
import WigglingAsciiBackground from "@/components/WigglingAsciiBackground";
import Image from "next/image";
import BookContent from "@/components/BookContent";
import ContactForm from '@/components/ContactForm';

export default function About() {
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  // Combined state for animation (either hovering or form is open)
  const isContactActive = isContactHovered || isContactOpen;
  
  // Check device size
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    // Initial check
    checkDeviceSize();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkDeviceSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);
  
  // Shared content elements
  const pageTitle = (
    <div className={`flex justify-center ${isMobile ? 'mb-6' : isTablet ? 'mb-8 mt-2' : 'mb-4 sm:mb-6 md:mb-10 lg:mb-14 mt-1 sm:mt-2 md:mt-4'}`}>
      <div className={`${isMobile ? 'text-3xl' : isTablet ? 'text-3xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} text-foreground relative inline-block font-mono`}>
        <h1><CustomHighlight color="#3f764c">about me!</CustomHighlight></h1>
      </div>
    </div>
  );
  
  // Content elements
  const aboutContent = (
    <>
      <p className={isMobile ? "text-base" : isTablet ? "text-base mb-4" : "text-sm sm:text-base md:text-lg"}>
        Hi again! i&apos;m <span className='text-accent'>Lina</span>, a full stack developer with a computer science background thats passionate about making <span className='text-accent'>playful</span> and <span className='text-accent'>inclusive</span> digital spaces!
      </p>
      <p className={isMobile ? "text-base" : isTablet ? "text-base" : "text-sm sm:text-base md:text-lg"}>
        Currently studying Interactive Media Management at Sheridan College, where I&apos;m learning to bridge the gap between design and development and hone my UX design + research skills...
      </p>
    </>
  );
  
  const hobbyContent = (
    <div>
      <h3 className={isMobile ? "text-xl mb-2 text-foreground" : isTablet ? "text-xl mb-3 text-foreground" : "text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-foreground"}>
        <CustomHighlight color="#3f764c">when I&apos;m not coding</CustomHighlight>
      </h3>
      <p className={isMobile ? 'text-base' : isTablet ? 'text-base mb-2' : 'text-sm sm:text-base md:text-lg'}>you&apos;ll find me...</p>
      <p className={isMobile ? "text-base" : isTablet ? "text-base" : "text-sm sm:text-base md:text-lg"}>
        frolicking Toronto, caffeinated beverage in hand OR consuming media in every form (books, film, tv, games, the list goes on...), or playing guitar!
      </p>
    </div>
  );
  
  const currentlyContent = (
    <div>
      <h3 className={isMobile ? "text-xl mb-2 text-foreground" : isTablet ? "text-xl mb-3 mt-5 text-foreground" : "text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-foreground"}>
        <CustomHighlight color="#3f764c">currently...</CustomHighlight>
      </h3>
      <p className={isMobile ? "text-base" : isTablet ? "text-base mb-2" : "text-sm sm:text-base md:text-lg"}>
        📖: The Three-Body Problem by Liu Cixin
      </p>
      <p className={isMobile ? "text-base" : isTablet ? "text-base mb-2" : "text-sm sm:text-base md:text-lg"}>
        📺: The White Lotus S3
      </p>
      <p className={isMobile ? "text-base" : isTablet ? "text-base" : "text-sm sm:text-base md:text-lg"}>
        🎮: Split Fiction
      </p>
    </div>
  );
  
  // Contact form with logo
  const contactSection = (
    <div className={`${isMobile ? "mt-8 mb-2" : isTablet ? "mt-12 mb-6" : "mt-4 sm:mt-6 md:mt-auto mb-2 sm:mb-4 md:mb-8"} flex justify-center items-center relative`}>
      <div className="relative inline-block">
        <ContactForm 
          onSubmit={(data) => {
            // demo submission!!!!!
            console.log('Form submitted:', data);
          }}
          onOpenChange={(isOpen) => setIsContactOpen(isOpen)}
          onHoverChange={(isHovered) => setIsContactHovered(isHovered)}
        />
        
        {/* Logo sticker positioned at an angle */}
        <motion.div
          className={`absolute ${isMobile ? "-right-8 -top-4" : isTablet ? "-right-10 -top-6" : "-right-8 sm:-right-12 md:-right-16 -top-4 sm:-top-8 md:-top-12"} z-[40]`}
          initial={{ rotate: 0 }}
          animate={{ 
            rotate: isContactActive ? 25 : 15,
            y: isContactActive ? -5 : 0,
            scale: isContactActive ? 1.05 : 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 15
            }
          }}
        >
          <Image 
            src="/stickers/site.png" 
            alt="Lina's logo" 
            width={isMobile ? 60 : isTablet ? 90 : 120} 
            height={isMobile ? 60 : isTablet ? 90 : 120}
            className="drop-shadow-md"
          />
        </motion.div>
      </div>
    </div>
  );
  
  return (
    <CursorProvider>
      <main className="relative overflow-x-hidden min-h-screen font-mono">
        <WigglingAsciiBackground/>
        <CustomCursor />
        <Header />
        
        {/* Mobile version - content without book image */}
        {isMobile ? (
          <div className="px-4 sm:px-8 pt-28 pb-10">
            <div className="bg-background rounded-md p-6 border-2 border-foreground shadow-md" style={{ 
              backgroundImage: "url('/paper-texture.png')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}>
              <div className="w-full flex flex-col">
                {pageTitle}
                
                <div className="space-y-6">
                  <div className="space-y-4">
                    {aboutContent}
                  </div>
                  <div className="space-y-4">
                    {hobbyContent}
                    {currentlyContent}
                  </div>
                </div>
                
                {/* Contact button and logo section */}
                {contactSection}
              </div>
            </div>
          </div>
        ) : (
          // Desktop version - with book image
          <div className={`px-4 ${isTablet ? 'px-8 py-8' : 'sm:px-8 md:px-16 lg:px-44'} flex justify-center`}>
            <div className={`relative ${isTablet ? 'w-[95%]' : 'w-full'}`}>
              <Image
                src="/book.png"
                alt="Open book"
                width={1300}
                height={900}
                className="w-full"
              />
              <BookContent>
                <div className="relative w-full h-full flex flex-col">
                  {pageTitle}
                  
                  <div className={`grid grid-cols-1 ${isTablet ? 'md:grid-cols-1 gap-y-6 mx-auto w-[85%]' : 'md:grid-cols-2 gap-x-6 md:gap-x-10 lg:gap-x-20 gap-y-4 sm:gap-y-6 mx-auto w-[95%] md:w-[90%]'} relative`}>
                    {/* Divider line - hidden on mobile and tablet */}
                    {!isTablet && (
                      <div className="hidden md:block absolute h-[90%] w-[1px] bg-gray-300 left-1/2 top-[5%] transform -translate-x-1/2"></div>
                    )}
                    
                    {isTablet ? (
                      // Tablet layout - vertical arrangement with more space
                      <>
                        <div className="space-y-4">
                          {aboutContent}
                        </div>
                        <div className="space-y-4">
                          {hobbyContent}
                          {currentlyContent}
                        </div>
                      </>
                    ) : (
                      // Desktop layout - two column
                      <>
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 md:pr-8">
                          {aboutContent}
                        </div>
                        <div className="space-y-3 sm:space-y-4 md:space-y-6 md:pl-8">
                          {hobbyContent}
                          {currentlyContent}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Contact button and logo section */}
                  {contactSection}
                </div>
              </BookContent>
            </div>
          </div>
        )}
      </main>
    </CursorProvider>
  );
}
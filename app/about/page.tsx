"use client";
import Header from '@/components/Header';
import CustomCursor from "@/components/cursor";
import CustomHighlight from "@/components/CustomHighlight";
import { CursorProvider } from '@/components/CursorContext';
import { motion } from "motion/react";
import { useState } from "react";
import WigglingAsciiBackground from "@/components/WigglingAsciiBackground";
import Image from "next/image";
import BookContent from "@/components/BookContent";
import ContactForm from '@/components/ContactForm';

export default function About() {
  const [isContactHovered, setIsContactHovered] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // Combined state for animation (either hovering or form is open)
  const isContactActive = isContactHovered || isContactOpen;
  
  return (
    <CursorProvider>
      <main className="relative">
        <WigglingAsciiBackground/>
        <CustomCursor />
        <Header />
        <div className="px-44 flex justify-center">
          <div className="relative">
            <Image
              src="/book.png"
              alt="Open book"
              width={1300}
              height={900}
              className="w-full"
            />
            <BookContent>
              <div className="relative w-full h-full flex flex-col">
                <div className="flex justify-center mb-14 mt-4">
                  <div className="text-5xl text-foreground relative inline-block">
                    <h1><CustomHighlight color="#3f764c">about me!</CustomHighlight></h1>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-20 gap-y-8 mx-auto w-[90%] relative">
                  <div className="absolute h-[90%] w-[1px] bg-gray-300 left-1/2 top-[5%] transform -translate-x-1/2"></div>
                  
                  <div className="space-y-6 pr-8">
                    <p className="text-lg">
                        Hi again! i&apos;m <span className='text-accent'>Lina</span>, a full stack developer with a computer science background thats passionate about making <span className='text-accent'>playful</span> and <span className='text-accent'>inclusive</span> digital spaces!
                    </p>
                    <p className="text-lg">
                        Currently studying Interactive Media Management at Sheridan College, where I&apos;m learning to bridge the gap between design and development and hone my UX design + research skills...
                    </p>
                  </div>
                  <div className="space-y-6 pl-8">
                    <div>
                      <h3 className="text-2xl mb-2 text-foreground"><CustomHighlight color="#3f764c">when I&apos;m not coding</CustomHighlight></h3>
                      <p className='text-lg'>you&apos;ll find me...</p>
                      <p className="text-lg">
                        frolicking Toronto, caffeinated beverage in hand OR consuming media in every form (books, film, tv, games, the list goes on...), or playing guitar!
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl mb-2 text-foreground"><CustomHighlight color="#3f764c">currently...</CustomHighlight></h3>
                      <p className="text-lg">
                        📖: The Three-Body Problem by Liu Cixin
                      </p>
                      <p className="text-lg">
                        📺: The White Lotus S3
                      </p>
                      <p className="text-lg">
                        🎮: Split Fiction
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Contact button and logo section */}
                <div className="mt-auto mb-8 flex justify-center items-center relative">
                  <div 
                    className="relative inline-block"
                  >
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
                      className="absolute -right-16 -top-12 z-[40]"
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
                        width={120} 
                        height={120}
                        className="drop-shadow-md"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </BookContent>
          </div>
        </div>
      </main>
    </CursorProvider>
  );
}
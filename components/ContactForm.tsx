"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import CustomHighlight from './CustomHighlight';

interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  onOpenChange?: (isOpen: boolean) => void;
  onHoverChange?: (isHovered: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit, onOpenChange, onHoverChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Notify parent component when open state changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  // Notify parent component when hover state changes
  useEffect(() => {
    if (onHoverChange) {
      onHoverChange(isHovered);
    }
  }, [isHovered, onHoverChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Demo submission - replace later!!!!!
    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      // Reset the form after successful submission
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(true);
      
      // Auto-close after successful submission
      setTimeout(() => {
        setIsOpen(false);
        // Reset submission state after form is closed
        setTimeout(() => setIsSubmitted(false), 300);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Contact Button */}
      <motion.button
        onClick={handleToggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="font-mono inline-block px-8 py-3 text-white bg-accent border-2 border-foreground rounded-md"
        style={{ 
          boxShadow: '3px 3px 0 var(--foreground)',
          cursor: 'none'
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <span className="text-lg">contact me!</span>
      </motion.button>

      {/* Form Popup */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 w-80 bg-background border-2 border-foreground rounded-md overflow-hidden z-[50]"
        initial={{ opacity: 0, y: 20, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          y: isOpen ? 0 : 20,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        style={{ 
          boxShadow: '4px 4px 0 var(--foreground)',
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-mono text-accent">
              <CustomHighlight color="#a3b1ff" height="40%">say hello!</CustomHighlight>
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-foreground text-background"
              style={{ cursor: 'none' }}
            >
              ×
            </button>
          </div>

          {isSubmitted ? (
            <div className="py-4 text-center">
              <p className="text-accent font-mono mb-2">Message sent!</p>
              <p className="text-sm">Thanks for reaching out.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 font-mono text-sm bg-transparent border border-foreground rounded-sm"
                  style={{ cursor: 'none' }}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 font-mono text-sm bg-transparent border border-foreground rounded-sm"
                  style={{ cursor: 'none' }}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="your message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 font-mono text-sm bg-transparent border border-foreground rounded-sm resize-none"
                  style={{ cursor: 'none' }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 font-mono text-white bg-accent border border-foreground rounded-sm"
                style={{ cursor: 'none' }}
              >
                {isSubmitting ? "sending..." : "send message"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
'use client';

import { useState } from 'react';
import ContactForm from './components/ContactForm';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const openContactForm = () => setIsContactFormOpen(true);
  const closeContactForm = () => setIsContactFormOpen(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      {/* Header/Logo */}
      <div className="flex items-center justify-center mb-16">
        {/* Logo Image */}
        <div className="relative">
          <img 
            src="/logo.png" 
            alt="Daakye Digital Logo" 
            className="w-40 h-40 object-contain"
            onError={(e) => {
              // Fallback if image doesn't load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          {/* Fallback logo if image doesn't load */}
          <div className="hidden w-16 h-16 bg-gradient-to-b from-orange-500 to-pink-500 rounded-r-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute left-2 top-2 w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
                <path 
                  d="M24 8L8 24M8 24L8 16M8 24L16 24" 
                  stroke="white" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl sm:text-6xl font-bold text-black mb-8 leading-tight max-w-4xl">
        Fintech solutions <br />
        that drive <span className="font-bold">Growth</span>
      </h1>

      {/* Descriptive Text/Sub-headline */}
      <p className="text-lg sm:text-xl text-black mb-12 max-w-3xl leading-relaxed">
        Custom-built financial technology products and <br />
        expert consulting to help you unlock revenue, <br />
        streamline operations, and stay future-ready.
      </p>

      {/* Call to Action Button */}
      <button
        onClick={openContactForm}
        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 text-white font-bold px-12 py-4 rounded-full text-lg transition-all duration-200 transform hover:scale-105"
      >
        Let's talk
      </button>

      {/* Footer */}
      <footer className="mt-20 text-black text-sm">
        Copyright © 2025 Daakye digital
      </footer>

      {/* Contact Form Popup */}
      <ContactForm 
        isOpen={isContactFormOpen} 
        onClose={closeContactForm} 
      />
    </main>
  );
}

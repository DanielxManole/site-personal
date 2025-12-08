"use client";

import React, { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ContactModal from "./ContactModal";
import GradientButton from "./GradientButton";

export default function Footer() {
  const { ref, isVisible } = useScrollReveal(0.4);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEmailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      setIsModalOpen(true);
      localStorage.setItem('modalOpen', 'true');
      setIsProcessing(false);
    }, 150);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    localStorage.removeItem('modalOpen');
    (document.activeElement as HTMLElement)?.blur();
  };

  return (
    <footer
      id="contact"
      ref={ref}
      className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 bg-[#e0e5ec]"
    >
      <ContactModal isOpen={isModalOpen} onClose={handleClose} />

      <div
        className={`
          max-w-4xl w-full text-center relative z-10
          transition-all duration-1000 md:duration-500 ease-out transform will-change-transform
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        <div className="relative bg-[#e0e5ec] p-10 md:p-14 rounded-3xl border border-white/50 group mx-auto shadow-[15px_15px_30px_#bec3c9,-15px_-15px_30px_rgba(255,255,255,0.5)] transform-gpu">
          <h2 className="text-3xl md:text-5xl font-black text-slate-700 mb-6 tracking-tight select-none">
            CONTACT{'\u00A0'}& COLABORARE
          </h2>

          <div className="text-slate-600 mb-10 max-w-3xl mx-auto font-medium text-lg leading-relaxed select-none">
            <p className="mb-6">
              Sunt în căutare de noi{'\u00A0'}oportunități: <br />
              <strong>Programe{'\u00A0'}de{'\u00A0'}Internship</strong>
              <br />
              <strong>Joburi{'\u00A0'}Part{'\u2011'}Time</strong>
              <br />
              <strong>Proiecte</strong>
            </p>
            <p className="text-slate-600 max-w-lg mx-auto font-medium text-lg leading-relaxed select-none">
              Aștept cu interes să discutăm detaliile proiectelor sau
              oportunităților{'\u00A0'}dvs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 select-none">
            
            <GradientButton 
              variant="blue" 
              onClick={handleEmailClick}
              disabled={isProcessing}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-white"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
              Trimite{'\u00A0'}Email
            </GradientButton>

            <GradientButton 
              variant="gray"
              href="https://www.linkedin.com/in/manoledaniel/"
              target="_blank"
            >
              <div className="flex items-center justify-center gap-0.5">
                
                <span className="text-[#0a66c2]">Linked</span>
                <svg 
                  className="w-5 h-5 text-[#0a66c2]"
                  fill="currentColor" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </GradientButton>

          </div>

          <div className="mt-16 pt-8 border-t border-slate-300 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest gap-2 select-none">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: Online
            </span>
            <span>
              © 2025 [{'\u00A0'}Manole{'\u00A0'}Daniel{'\u00A0'}]. Engineering{'\u00A0'}&{'\u00A0'}Dev.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState, useEffect, useRef } from 'react';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import About from './components/About';
import BackToTop from './components/BackToTop'; 

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  useEffect(() => {
    const updateSize = () => {
      if (heroRef.current) {
        setDimensions({
          width: heroRef.current.offsetWidth,
          height: heroRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return ( 
    <main className="flex min-h-screen flex-col bg-[#e0e5ec] text-slate-700 overflow-x-hidden relative z-0">
      
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full py-20 **overflow-hidden**">
        
        <div className="absolute inset-0 pointer-events-none opacity-40 -z-10 will-change-transform"
            style={{ 
              backgroundImage: 'linear-gradient(0deg, transparent 24%, #a3b1c6 25%, #a3b1c6 26%, transparent 27%, transparent 74%, #a3b1c6 75%, #a3b1c6 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #a3b1c6 25%, #a3b1c6 26%, transparent 27%, transparent 74%, #a3b1c6 75%, #a3b1c6 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #a3b1c6 25%, #a3b1c6 26%, transparent 27%, transparent 74%, #a3b1c6 75%, #a3b1c6 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, #a3b1c6 25%, #a3b1c6 26%, transparent 27%, transparent 74%, #a3b1c6 75%, #a3b1c6 76%, transparent 77%, transparent)',
              backgroundSize: '14px 14px',
              transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2) translateZ(0)',
              maskImage: 'linear-gradient(to bottom, transparent 5%, black 40%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 5%, black 40%)' 
            }}>
        </div>

        <div ref={heroRef} className="z-10 bg-[#e0e5ec] p-7 md:p-16 rounded-3xl shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_rgba(255,255,255,0.5)] max-w-4xl w-[85%] md:w-full text-center border border-white/40 relative mx-auto mt-10">
          
          <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-px bg-slate-400 flex flex-col justify-center items-center opacity-60 select-none">
              <span className="bg-[#e0e5ec] py-2 text-[10px] font-mono font-bold -rotate-90 text-slate-500 whitespace-nowrap">‎ HEIGHT: {dimensions.height}px ‎ </span>
              <div className="absolute top-0 w-2 h-px bg-slate-400"></div>
              <div className="absolute bottom-0 w-2 h-px bg-slate-400"></div>
          </div>
          <div className="absolute -top-4 md:-top-12 left-0 right-0 h-px bg-slate-400 flex justify-center items-center opacity-60 select-none">
              <span className="bg-[#e0e5ec] px-2 text-[10px] font-mono font-bold text-slate-500">WIDTH: {dimensions.width}px</span>
              <div className="absolute left-0 h-2 w-px bg-slate-400"></div>
              <div className="absolute right-0 h-2 w-px bg-slate-400"></div>
          </div>

          <span className="text-blue-600 font-bold tracking-widest text-xs md:text-sm uppercase mb-6 block font-mono select-none">
            // Designed & Built by
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-slate-700 mb-8 tracking-tighter text-center">
             <span className="inline-block leading-[0.9] py-1 select-text">
              [{'\u00A0'}Manole Daniel{'\u00A0'}]
             </span>
          </h1>

          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8 rounded-full"></div>

          <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto">
            Inginerie Industrială{'\u00A0'}& Robotică<span className="text-blue-500 px-2 select-none">•</span>Programare{'\u00A0'}{"\u007C"}{"\u007C"}{'\u00A0'}Proiectare
            <br/>
            <span className="text-sm text-slate-500 mt-4 block font-mono bg-slate-200/50 inline-block px-2 py-1 rounded border border-slate-300 select-none">
              &lt;System.Ready /&gt;
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 select-none">
            
            <div className="relative group/btn">
              <a href="#proiecte" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#e0e5ec] text-blue-600 font-bold shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out group-hover/btn:shadow-[inset_6px_6px_12px_#bec3c9,inset_-6px_-6px_12px_rgba(255,255,255,0.5)] group-hover/btn:scale-95 active:scale-[0.95]">
                Proiecte
                <span className="font-mono font-black text-lg opacity-50 transition-all duration-300 group-hover/btn:translate-x-1 group-hover/btn:opacity-100">&gt;&gt;</span>
              </a>
            </div>
            
            <div className="relative group/btn">
              <a href="#contact" className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold shadow-[6px_6px_12px_#a1a6ac,-6px_-6px_12px_rgba(255,255,255,0.5)] transition-all duration-300 ease-out group-hover/btn:bg-blue-700 group-hover/btn:-translate-y-1 active:scale-[0.95]">
                Contact
                <span className="font-mono font-black text-lg opacity-50 transition-all duration-300 group-hover/btn:translate-y-1 group-hover/btn:opacity-100">&darr;</span> 
              </a>
            </div>

          </div>

        </div>
      </div>

      <About />
      <Projects />
      <TechStack />
      <Footer />
      <BackToTop />

    </main>
  );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import About from './components/About';
import BackToTop from './components/BackToTop'; 
import GradientButton from "./components/GradientButton";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
  if (!sessionStorage.getItem("first-visit")) {
    window.scrollTo(0, 0);
    sessionStorage.setItem("first-visit", "true");
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
      
      <div className="relative flex flex-col items-center justify-center min-h-screen w-full py-20">
        
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
            Inginerie Industrială & Robotică<span className="text-blue-500 px-2 select-none">•</span>Programare || Proiectare
            <br/>
            <span className="text-sm text-slate-500 mt-4 block font-mono bg-slate-200/50 inline-block px-2 py-1 rounded border border-slate-300 select-none">
              &lt;System.Ready /&gt;
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 select-none w-full">

            <GradientButton
              href="#proiecte"
              variant="gray"
              className="w-full !w-full sm:!w-full flex-1 group text-blue-600 md:transition-all md:duration-300 md:ease-out md:hover:scale-100 md:active:scale-100"
            >
              <span className="flex items-center justify-center gap-2 w-full text-xl">
                Proiecte
                <span className="font-mono font-black text-xl opacity-50 transition-all duration-300 
                  md:group-hover:translate-x-1 md:group-hover:opacity-100">
                  &gt;&gt;
                </span>
              </span>
            </GradientButton>

            <GradientButton
              href="#contact"
              variant="blue"
              className="w-full !w-full sm:!w-full flex-1 group md:transition-all md:duration-300 md:ease-out md:active:scale-95"
            >
              <span className="flex items-center justify-center gap-2 w-full text-xl">
                Contact
                <span className="font-mono font-black text-xl opacity-50 transition-all
                  md:group-hover:animate-bounce md:group-hover:opacity-100">
                  ↓
                </span>
              </span>
            </GradientButton>

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

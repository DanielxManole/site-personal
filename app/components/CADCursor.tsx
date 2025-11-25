"use client";

import React, { useEffect, useRef } from 'react';

export default function CADCursor() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const updateCoords = (e: MouseEvent) => {
      if (xRef.current && yRef.current) {
        xRef.current.innerText = Math.round(e.clientX).toString().padStart(4, '0');
        yRef.current.innerText = Math.round(e.clientY).toString().padStart(4, '0');
      }
    };

    window.addEventListener('mousemove', updateCoords);
    return () => window.removeEventListener('mousemove', updateCoords);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[9999] pointer-events-none hidden md:flex">
      
      {/* Container */}
      <div className="
        flex items-center gap-5 px-8 py-2
        bg-[#e0e5ec]/90 backdrop-blur-md 
        
        border border-white/20 
        
        rounded-xl

        shadow-[5px_5px_10px_#bec3c9,-5px_-5px_24px_rgba(255,255,255,0.8)]
      ">
        
        {/* Led Verde */}
        <div className="relative flex items-center justify-center">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
        </div>

        {/* Font */}
        <div className="flex gap-3 font-mono text-l font-bold text-slate-700 tracking-widest">
          <span className="flex gap-1 items-center">
            <span className="text-blue-600 font-black">X:</span>
            <span ref={xRef} className="min-w-[35px]">0000</span>
          </span>
          
          {/* Linie separatoare */}
          <span className="w-0.5 h-8 bg-slate-400/50"></span>

          <span className="flex gap-1 items-center">
            <span className="text-blue-600 font-black">Y:</span>
            <span ref={yRef} className="min-w-[35px]">0000</span>
          </span>
        </div>

      </div>

    </div>
  );
}
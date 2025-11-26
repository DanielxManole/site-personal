"use client";

import React, { useEffect, useRef, useState } from 'react';

export default function CADCursor() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover)');
    
    setHasMouse(mediaQuery.matches);

    const updateCoords = (e: MouseEvent) => {
      if (xRef.current && yRef.current) {
        xRef.current.innerText = Math.round(e.clientX).toString().padStart(4, '0');
        yRef.current.innerText = Math.round(e.clientY).toString().padStart(4, '0');
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', updateCoords);
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener('mousemove', updateCoords);
      }
    };
  }, []);

  if (!hasMouse) return null;

  return (
    <div className="fixed bottom-8 left-8 z-[9999] flex">
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        title={isExpanded ? "Ascunde Coordonate" : "Arată Coordonate"}
        className={`
            group flex items-center
            h-12 
            bg-[#e0e5ec]/90 backdrop-blur-md 
            border border-white/20 rounded-xl
            shadow-[5px_5px_10px_#bec3c9,-5px_-5px_24px_rgba(255,255,255,0.8)]
            transition-all duration-500 ease-in-out
            overflow-hidden
            active:scale-95
        `}
      >
        
        <div className="w-12 h-full flex items-center justify-center flex-shrink-0">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
        </div>

        <div className={`
            flex items-center overflow-hidden whitespace-nowrap
            transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-w-[200px] opacity-100 pr-6' : 'max-w-0 opacity-0 pr-0'}
        `}>
            
            <div className="flex gap-4 font-mono text-l font-bold text-slate-700 tracking-widest pl-1">
                <span className="flex gap-1 items-center">
                    <span className="text-blue-600 font-black">X:</span>
                    <span ref={xRef} className="min-w-[35px]">0000</span>
                </span>
                
                <span className="w-0.5 h-6 bg-slate-400/50"></span>

                <span className="flex gap-1 items-center">
                    <span className="text-blue-600 font-black">Y:</span>
                    <span ref={yRef} className="min-w-[35px]">0000</span>
                </span>
            </div>

        </div>

      </button>

    </div>
  );
}
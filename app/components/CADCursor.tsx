"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CADCursor() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);

  const [isExpanded, setIsExpanded] = useState(true);
  const [hasMouse, setHasMouse] = useState(false);
  const [interactionReady, setInteractionReady] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasMouse(mediaQuery.matches);
    setInteractionReady(true);

    const updateCoords = (e: MouseEvent) => {
      if (xRef.current && yRef.current) {
        xRef.current.innerText = Math.round(e.clientX)
          .toString()
          .padStart(4, "0");
        yRef.current.innerText = Math.round(e.clientY)
          .toString()
          .padStart(4, "0");
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", updateCoords);
    }

    return () => {
      if (mediaQuery.matches) {
        window.removeEventListener("mousemove", updateCoords);
      }
    };
  }, []);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    setInteractionReady(false);
  };

  const handleMouseLeave = () => {
    setInteractionReady(true);
  };

  if (!hasMouse) return null;

  const transitionClass =
    "transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]";

  return (
    <div className="fixed bottom-8 left-8 z-[9999]">
      <div
        onClick={handleClick}
        onMouseLeave={handleMouseLeave}
        className={`
            relative group cursor-pointer flex items-center
            h-12 group
            ${transitionClass}
            ${isExpanded ? "w-[240px]" : "w-12 hover:w-16"}
        `}
      >
        <div
          className={`
            absolute left-0 top-0 h-full
            flex items-center overflow-hidden
            border border-white/20 rounded-xl
            shadow-[0_10px_20px_rgba(37,99,235,0.1)]
            ${transitionClass}

            ${isExpanded
              ? `bg-[#e0e5ec]/90 backdrop-blur-md ${
                  interactionReady ? "group-hover:bg-slate-200/90" : ""
                }`
              : `bg-slate-200 ${
                  interactionReady ? "group-hover:bg-[#e0e5ec]/90" : ""
                }`}

            ${isExpanded 
              ? `w-full origin-left ${
                  interactionReady ? "group-hover:w-[215px]" : ""
                }`
              : "w-full"}
        `}
        >
          <div className="w-12 h-full flex items-center justify-center flex-shrink-0 z-10">
            <div
              className={`
                    w-3 h-3 rounded-full 
                    ${transitionClass}
                    
                    ${isExpanded 
                        ? `bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)] 
                           ${interactionReady ? 'group-hover:bg-slate-400 group-hover:animate-none group-hover:shadow-none group-hover:scale-90' : ''}`
                        : `bg-slate-400 
                           ${interactionReady ? 'group-hover:bg-green-500 group-hover:shadow-[0_0_8px_rgba(34,197,94,0.8)] group-hover:scale-110' : ''}`
                    }
                `}
            ></div>
          </div>

          <div
            className={`
                flex items-center whitespace-nowrap
                ${transitionClass}
                
                ${isExpanded 
                    ? `opacity-100 blur-0 ${interactionReady ? 'group-hover:opacity-50 group-hover:blur-[0.5px]' : ''}` 
                    : 'opacity-0' 
                }
            `}
          >
            <div
              className={`
                   flex gap-4 font-mono text-l font-bold text-slate-700 min-w-max 
                   ${transitionClass}
                   pl-1
                   ${isExpanded ? 'tracking-widest' : ''}
                   ${isExpanded && interactionReady ? 'group-hover:tracking-tight' : ''}
                `}
            >
              <span className="flex gap-1 items-center">
                <span className="text-blue-600 font-black">X:</span>
                <span ref={xRef} className="min-w-[35px]">
                  0000
                </span>
              </span>

              <span className="w-0.5 h-6 bg-slate-400/50"></span>

              <span className="flex gap-1 items-center">
                <span className="text-blue-600 font-black">Y:</span>
                <span ref={yRef} className="min-w-[35px]">
                  0000
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
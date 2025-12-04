"use client";

import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// --- 1. Definim tipurile pentru props ---
interface SkillBadgeProps {
  name: string;
  type: 'software' | 'engineering';
}

// --- 2. Componenta reutilizabilă SkillBadge ---
const SkillBadge = ({ name, type }: SkillBadgeProps) => {
  const [isActive, setIsActive] = useState(false);
  const isSoftware = type === 'software';

  // Logica de click: funcționează DOAR pe mobil
  const handleClick = () => {
    // Verificăm lățimea ferestrei. Dacă e desktop (>= 768px), ignorăm click-ul.
    // Astfel, nu se "blochează" culoarea pe desktop.
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return;
    }
    // Pe mobil, facem toggle la stare
    setIsActive(!isActive);
  };

  // --- Clase CSS ---
  
  // 1. Base: Tranzitia de 200ms asigură efectul fluid (smooth) la hover pe desktop
  const baseClasses = "px-3 py-1 text-sm font-mono font-bold border transition-all duration-200 ease-out select-none";
  
  // 2. Interacțiune: 
  // - touch-manipulation: optimizează tap-ul pe mobil
  // - cursor-pointer (mobil) vs md:cursor-default (desktop)
  // - active:scale (doar pe mobil se simte apăsarea fizică, pe desktop scoatem scale-ul)
  const interactionClasses = "cursor-pointer md:cursor-default touch-manipulation active:scale-[0.95] md:active:scale-100";

  // 3. Culori Default (când nu e activ/hover)
  const defaultClasses = "text-slate-700 bg-transparent border-slate-600";

  // 4. Culori Active (când e selectat pe mobil)
  const activeColorClasses = isSoftware
    ? "bg-slate-800 border-slate-800 text-white"
    : "bg-orange-900 border-orange-900 text-white";

  // 5. Culori Hover (când treci cu mouse-ul pe desktop)
  // Acestea se aplică automat peste cele default datorită CSS-ului, păstrând tranziția
  const hoverClasses = isSoftware
    ? "hover:bg-slate-800 hover:border-slate-800 hover:text-white"
    : "hover:bg-orange-900 hover:border-orange-900 hover:text-white";

  return (
    <span
      onClick={handleClick}
      className={`
        ${baseClasses}
        ${interactionClasses}
        ${isActive ? activeColorClasses : defaultClasses} 
        ${hoverClasses} 
      `}
    >
      {name}
    </span>
  );
};

// --- 3. Componenta Principală ---
export default function TechStack() {
  const { ref, isVisible } = useScrollReveal(0.4);

  return (
    <section
      id="tehnologii"
      ref={ref}
      className="relative z-10 min-h-screen flex flex-col justify-center py-24 px-4 scroll-mt-20"
    >

      <div className={`
        max-w-7xl mx-auto w-full
        transition-all duration-1000 md:duration-500 ease-out transform will-change-transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>

        {/* HEADER SECTION */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4 transform-gpu">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
            03_COMPETENȚE
          </h2>
          <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
            // TECHNICAL_SKILLS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ================= CARD 1: SOFTWARE ================= */}
          <div className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu">
            {/* Colțuri decorative */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>

            <div className="flex justify-between items-center mb-8 border-b border-dashed border-slate-400 pb-4">
              <h3 className="text-[25px] font-bold text-slate-800 font-mono tracking-tight select-none">
                SECTOR{'\u00A0'}01: <span className="text-blue-600">SOFTWARE</span>
              </h3>
              <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 border border-blue-200 rounded shadow-sm">
                <div className="flex gap-0.5">
                  <div className="w-1 h-1.5 bg-blue-500 animate-[pulse_0.5s_infinite]"></div>
                  <div className="w-1 h-1.5 bg-blue-400 animate-[pulse_0.5s_infinite_0.2s]"></div>
                  <div className="w-1 h-1.5 bg-blue-300 animate-[pulse_0.5s_infinite_0.4s]"></div>
                </div>
                <span className="text-[9px] font-mono font-bold text-blue-700 tracking-widest select-none">
                  COMPILING
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Grup Software 1 */}
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Scripting & AI
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["Python", "Tkinter", "C / C++", "PyTorch", "OpenCV"].map(item => (
                    <SkillBadge key={item} name={item} type="software" />
                  ))}
                </div>
              </div>

              {/* Grup Software 2 */}
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Web & Cloud
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git / Github", "Vercel"].map(item => (
                    <SkillBadge key={item} name={item} type="software" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: ENGINEERING ================= */}
          <div className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu">
            {/* Colțuri decorative */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>

            <div className="flex justify-between items-center mb-8 border-b border-dashed border-slate-400 pb-4">
              <h3 className="text-[25px] font-bold text-slate-800 font-mono tracking-tight select-none">
                SECTOR{'\u00A0'}02: <span className="text-orange-600">INGINERIE</span>
              </h3>
              <div className="flex items-center gap-2 px-2 py-1 bg-orange-50 border border-orange-200 rounded shadow-sm">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </div>
                <span className="text-[10px] font-mono font-bold text-orange-700 tracking-widest select-none">
                  MECH_ACTIVE
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Grup Inginerie 1 */}
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Proiectare CAD / CAE
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["CATIA V5", "Fusion 360", "SolidWorks", "AutoCAD"].map(item => (
                    <SkillBadge key={item} name={item} type="engineering" />
                  ))}
                </div>
              </div>

              {/* Grup Inginerie 2 */}
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Sisteme Integrate{'\u00A0'}& Automatizări
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["LabVIEW", "C / C++ Embedded", "Programare CNC", "Matlab / Simulink", "Data Acquisition"].map(item => (
                    <SkillBadge key={item} name={item} type="engineering" />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

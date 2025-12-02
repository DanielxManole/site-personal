"use client";

import React, { useState } from 'react'; 
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function TechStack() {
  const { ref, isVisible } = useScrollReveal(0.4);
  
  const [activeSkills, setActiveSkills] = useState<string[]>([]);

  const handleSkillClick = (skillName: string) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      return; 
    }

    // Previne double-tap zoom pe iOS și click multiplu
    if (activeSkills.includes(skillName)) return;

    setActiveSkills((prev) => [...prev, skillName]);

    setTimeout(() => {
      setActiveSkills((prev) => prev.filter((item) => item !== skillName));
    }, 2000);
  };

  const isActive = (skillName: string) => activeSkills.includes(skillName);

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

        <div className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4 transform-gpu">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
            03_COMPETENȚE
          </h2>
          <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
            // TECHNICAL_SKILLS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu">
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
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Scripting & AI
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["Python", "Tkinter", "C / C++", "PyTorch", "OpenCV"].map(item => (
                    <span 
                      key={item} 
                      onClick={() => handleSkillClick(item)} 
                      className={`
                        touch-manipulation
                        px-3 py-1 text-sm font-mono font-bold border cursor-pointer active:scale-[0.95] 
                        transition-all ease-out delay-50

                        ${isActive(item) ? 'duration-50' : 'duration-300'} 

                        ${isActive(item)
                            ? 'bg-slate-800 border-slate-800 text-white' 
                            : 'text-slate-700 bg-transparent border-slate-600 hover:bg-slate-800 hover:border-slate-800 hover:text-white'
                        }
                      `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Web & Cloud
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git / Github", "Vercel"].map(item => (
                    <span 
                      key={item} 
                      onClick={() => handleSkillClick(item)}
                      className={`
                        touch-manipulation
                        px-3 py-1 text-sm font-mono font-bold border cursor-pointer active:scale-[0.95] 
                        transition-all ease-out delay-50

                        ${isActive(item) ? 'duration-50' : 'duration-300'}

                        ${isActive(item) 
                            ? 'bg-slate-800 border-slate-800 text-white' 
                            : 'text-slate-700 bg-transparent border-slate-600 hover:bg-slate-800 hover:border-slate-800 hover:text-white'
                        }
                      `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu">
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
              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Proiectare CAD / CAE
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["CATIA V5", "Fusion 360", "SolidWorks", "AutoCAD"].map(item => (
                    <span 
                        key={item} 
                        onClick={() => handleSkillClick(item)}
                        className={`
                            touch-manipulation
                            px-3 py-1 text-sm font-mono font-bold border cursor-pointer active:scale-[0.95] 
                            transition-all ease-out delay-50

                            ${isActive(item) ? 'duration-50' : 'duration-300'}

                            ${isActive(item) 
                                ? 'bg-orange-900 border-orange-900 text-white' 
                                : 'text-slate-700 bg-transparent border-slate-600 hover:bg-orange-900 hover:border-orange-900 hover:text-white'
                            }
                        `}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Sisteme Integrate{'\u00A0'}& Automatizări
                </p>
                <div className="flex flex-wrap gap-3 select-none">
                  {["LabVIEW", "C / C++ Embedded", "Programare CNC", "Matlab / Simulink", "Data Acquisition"].map(item => (
                    <span 
                        key={item} 
                        onClick={() => handleSkillClick(item)}
                        className={`
                            touch-manipulation
                            px-3 py-1 text-sm font-mono font-bold border cursor-pointer active:scale-[0.95] 
                            transition-all ease-out delay-50
                            
                            ${isActive(item) ? 'duration-50' : 'duration-300'}

                            ${isActive(item)
                                ? 'bg-orange-900 border-orange-900 text-white' 
                                : 'text-slate-700 bg-transparent border-slate-600 hover:bg-orange-900 hover:border-orange-900 hover:text-white'
                            }
                        `}
                    >
                      {item}
                    </span>
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
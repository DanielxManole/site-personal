"use client";

import React, {useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    z: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    }
  }
};

interface SkillBadgeProps {
  name: string;
  type: 'software' | 'engineering';
}

const SkillBadge = ({ name, type }: SkillBadgeProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const isSoftware = type === 'software';

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleClick = () => {
    if (isDesktop || isAnimating) return; 

    setIsAnimating(true);
    setIsClicked(!isClicked);
  };

  const desktopHoverClasses = isSoftware
    ? "md:hover:bg-slate-800 md:hover:border-slate-800 md:hover:text-white"
    : "md:hover:bg-orange-900 md:hover:border-orange-900 md:hover:text-white";

  const mobileActiveBorder = isSoftware ? "border-slate-800" : "border-orange-900";
  const mobileOverlayBg = isSoftware ? "bg-slate-800" : "bg-orange-900";

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      disabled={isAnimating && !isDesktop}
      className={`
        relative px-3 py-1 text-sm font-mono font-bold border rounded-sm
        cursor-pointer md:cursor-default touch-manipulation select-none overflow-hidden
        transition-colors duration-200 ease-out
        text-slate-700
        
        ${(!isDesktop && isClicked) ? mobileActiveBorder : "border-slate-600"}
        
        ${desktopHoverClasses}
      `}
    >
      <span className="relative z-0">
        {name}
      </span>

      {!isDesktop && (
        <motion.div
          initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
          animate={
            isClicked
              ? { clipPath: "inset(0% 0% 0% 0%)" } 
              : { 
                  clipPath: "inset(0% 0% 0% 100%)",
                  transitionEnd: { clipPath: "inset(0% 100% 0% 0%)" }
                }
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
          
          onAnimationComplete={() => setIsAnimating(false)}

          className={`
            absolute -inset-[1px] z-10 flex items-center justify-center
            ${mobileOverlayBg}
          `}
        >
          <span className="text-white whitespace-nowrap px-3">
            {name}
          </span>
        </motion.div>
      )}
    </motion.button>
  );
};

export default function TechStack() {
  return (
    <section
      id="tehnologii"
      className="relative z-10 min-h-screen flex flex-col justify-center py-24 px-4 scroll-mt-20"
    >

      <motion.div 
        className="max-w-7xl mx-auto w-full will-change-transform"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        <motion.div 
          variants={itemVariants}
          className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4 transform-gpu"
        >
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
            03_COMPETENȚE
          </h2>
          <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
            // TECHNICAL_SKILLS
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <motion.div 
            variants={itemVariants}
            className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu"
          >
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
                    <SkillBadge key={item} name={item} type="software" />
                  ))}
                </div>
              </div>

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
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="relative p-8 border-2 border-slate-400 bg-[#f5f7fa] h-full shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu"
          >
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
                    <SkillBadge key={item} name={item} type="engineering" />
                  ))}
                </div>
              </div>

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
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
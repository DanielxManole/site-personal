"use client";

import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" className="min-h-screen w-full relative flex flex-col items-center justify-center py-20 px-4">


     <div className="max-w-4xl w-full text-center relative z-10">
        
        {/* CARDUL PRINCIPAL */}
        <div className="
          relative bg-[#e0e5ec] p-10 md:p-14 rounded-3xl border border-white/50 group mx-auto 
          shadow-[15px_15px_30px_#bec3c9,-15px_-15px_30px_rgba(255,255,255,0.5)]
          transform-gpu 
        ">
          
          {/* Șuruburi decorative */}
          <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-slate-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] border border-slate-400 group-hover:rotate-360 transition-transform duration-1000 flex items-center justify-center"><div className="w-full h-px bg-slate-500"></div></div>
          <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-slate-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] border border-slate-400 group-hover:rotate-360 transition-transform duration-1000 flex items-center justify-center"><div className="w-full h-px bg-slate-500"></div></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-slate-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] border border-slate-400 group-hover:rotate-360 transition-transform duration-1000 flex items-center justify-center"><div className="w-full h-px bg-slate-500"></div></div>
          <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-slate-300 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2)] border border-slate-400 group-hover:rotate-360 transition-transform duration-1000 flex items-center justify-center"><div className="w-full h-px bg-slate-500"></div></div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-700 mb-6 tracking-tight select-none">
            CONTACT & COLABORARE
          </h2>
          
          {/* TEXTUL NOU: PROFI & DIRECT */}
          <p className="text-slate-600 mb-10 max-w-3xl mx-auto font-medium text-lg leading-relaxed select-none">
            Sunt în căutare de noi oportunități: <br/>
            <strong>Proiecte, Programe de Internship sau Joburi Part-Time.</strong>
            <br/><br/>
            <span className="text-slate-600 mb-12 max-w-lg mx-auto font-medium text-lg leading-relaxed select-none">
              Aștept cu interes să discutăm detaliile proiectelor sau oportunităților dvs.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 select-none">
            
            <div className="relative group/btn">
                <a href="mailto:manoledaniel2004@gmail.com" className="flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-[6px_6px_12px_#a1a6ac,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu transition-all duration-300 ease-out group-hover/btn:bg-blue-700 group-hover/btn:-translate-y-1">
                  <span>📩</span> Trimite Email
                </a>
            </div>
            
            <div className="relative group/btn">
                <a href="https://www.linkedin.com/in/manoledaniel/" target="_blank" className="flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-[#e0e5ec] text-slate-700 font-bold text-lg shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_rgba(255,255,255,0.5)] transform-gpu transition-all duration-300 ease-out group-hover/btn:shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_rgba(255,255,255,0.5)] group-hover/btn:scale-95">
                  <span>🔗</span> LinkedIn
                </a>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-slate-300 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-400 uppercase tracking-widest gap-2 select-none">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              System Status: Online
            </span>
            <span>© 2025 [ Manole Daniel ]. Engineering & Dev.</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
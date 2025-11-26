  import React from 'react';

  export default function TechStack() {
    return (
      <section id="tehnologii" className="**relative z-10 bg-[#e0e5ec]** min-h-screen flex flex-col justify-center py-24 px-4 max-w-7xl mx-auto">
        
        <div className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4 transform-gpu">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
            03_COMPETENȚE
          </h2>
          <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
            // TECHNICAL_SKILLS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="relative p-8 border-2 border-slate-400 bg-white/40 backdrop-blur-3xl h-full">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>

            <div className="flex justify-between items-center mb-8 border-b border-dashed border-slate-400 pb-4">
              <h3 className="text-[25px] font-bold text-slate-800 font-mono tracking-tight select-none">
                SECTOR 01: <span className="text-blue-600">SOFTWARE</span>
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
                <div className="flex flex-wrap gap-3">
                  {["Python", "Tkinter", "C / C++", "PyTorch", "OpenCV"].map(item => (
                    <span key={item} className="px-3 py-1 text-sm font-mono font-bold text-slate-700 border border-slate-600 bg-transparent hover:bg-slate-800 hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Web & Cloud
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git / Github", "Vercel"].map(item => (
                    <span key={item} className="px-3 py-1 text-sm font-mono font-bold text-slate-700 border border-slate-600 bg-transparent hover:bg-slate-800 hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative p-8 border-2 border-slate-400 bg-white/40 backdrop-blur-3xl h-full">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-slate-800"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-slate-800"></div>

            <div className="flex justify-between items-center mb-8 border-b border-dashed border-slate-400 pb-4">
              <h3 className="text-[25px] font-bold text-slate-800 font-mono tracking-tight select-none">
                SECTOR 02: <span className="text-orange-600">INGINERIE</span>
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
                <div className="flex flex-wrap gap-3">
                  {["CATIA V5", "Fusion 360", "SolidWorks", "AutoCAD"].map(item => (
                    <span key={item} className="px-3 py-1 text-sm font-mono font-bold text-slate-700 border border-slate-600 bg-transparent hover:bg-orange-900 hover:border-orange-900 hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-[14px] font-bold text-slate-500 mb-1 uppercase tracking-widest">
                  Sisteme Integrate & Automatizări
                </p>
                <div className="flex flex-wrap gap-3">
                  {["LabVIEW", "C / C++ Embedded", "Programare CNC", "Matlab / Simulink", "Data Acquisition"].map(item => (
                    <span key={item} className="px-3 py-1 text-sm font-mono font-bold text-slate-700 border border-slate-600 bg-transparent hover:bg-orange-900 hover:border-orange-900 hover:text-white transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }

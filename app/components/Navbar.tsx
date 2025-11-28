"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null); 
  const router = useRouter();

  const menuItems = [
    { id: 'despre', label: 'DESPRE', sub: 'Cine sunt eu?' },
    { id: 'proiecte', label: 'PROIECTE', sub: 'Portofoliu' },
    { id: 'tehnologii', label: 'COMPETENȚE', sub: 'Stack Tehnic' },
    { id: 'contact', label: 'CONTACT', sub: 'Hai să vorbim' }
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.overscrollBehavior = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
      document.body.style.overscrollBehavior = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          
          if (progressBarRef.current) {
            const totalScroll = window.scrollY || document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            if (windowHeight > 0) {
                const scrollPercent = totalScroll / windowHeight;
                const safePercent = Math.min(100, Math.max(0, scrollPercent * 100));
                progressBarRef.current.style.width = `${safePercent}%`;
            }
          }

          for (const item of menuItems) {
            const element = document.getElementById(item.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top >= 0 && rect.top <= 500) {
                setActiveSection(item.id);
                break; 
              } else if (rect.top < 0 && rect.bottom > 150) {
                 setActiveSection(item.id);
              }
            }
          }
          if (window.scrollY < 100) setActiveSection('');

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [menuItems]);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    router.push("/");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20">
      
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#e0e5ec]/90 backdrop-blur-md border-b border-slate-300 z-50 transition-all duration-300"> 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full w-full">
            
            {/* LOGO */}
            <div className="flex-shrink-0 z-50">
              <Link href="/" onClick={scrollToTop} className="flex items-center gap-4 group cursor-pointer">
                <div className="scene w-10 h-10 flex items-center justify-center">
                  <div className="cube-wrapper group-hover:scale-125 transition-transform duration-500">
                      <div className="cube">
                        <div className="face front"></div>
                        <div className="face back"></div>
                        <div className="face right"></div>
                        <div className="face left"></div>
                        <div className="face top"></div>
                        <div className="face bottom"></div>
                        <div className="nucleu"></div>
                      </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[20px] font-black text-slate-700 leading-none tracking-tight group-hover:text-blue-600 transition-colors duration-300 tracking-tighter">ManoleDaniel.cad</span>
                  <span className="font-mono text-[14px] text-slate-400 leading-none mt-1 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 tracking-tighter">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-500">
                      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z"/>
                    </svg>
                    Part1
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {menuItems.map((item) => (
                  <Link 
                    key={item.id}
                    href={`#${item.id}`} 
                    className={`
                      font-sans px-3 py-2 rounded-md text-sm font-bold transition-all active:scale-[0.95]
                      ${item.id === 'contact'
                        ? `ml-4 px-6 shadow-[4px_4px_8px_#a1a6ac,-4px_-4px_8px_rgba(255,255,255,0.5)] bg-blue-600 text-white hover:bg-blue-700`
                        : `${activeSection === item.id ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`
                      }
                    `}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden flex items-center z-[60]">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group relative w-12 h-12 rounded-xl bg-[#e0e5ec] flex flex-col justify-center items-center gap-[6px] shadow-[3px_3px_6px_#bec3c9,-3px_-3px_6px_white] active:shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] transition-all duration-300">
                <span className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                <span className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'}`}></span>
                <span className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[9px] bg-slate-800 mr-0 self-center' : ''}`}></span>
              </button>
            </div>

          </div>
        </div>
        
        <div 
            ref={progressBarRef} 
            className="absolute bottom-[-1px] left-0 h-[3px] bg-gradient-to-r from-blue-700 to-blue-400 z-50 w-0 will-change-[width]"
        ></div>
      </div>

      <div 
        className={`
          md:hidden fixed inset-0 z-40 bg-[#e0e5ec] 
          flex flex-col justify-center items-center
          transition-all duration-500 cubic-bezier(0.77, 0, 0.175, 1)
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        `}
        style={{ touchAction: 'none' }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-20" 
             style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-slate-400 opacity-50"></div>
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-slate-400 opacity-50"></div>

        <div className="w-full max-w-sm px-6 space-y-8 relative z-50">
          
          {menuItems.map((item, index) => (
            <Link 
              key={item.id}
              href={`#${item.id}`} 
              onClick={handleLinkClick}
              style={{ transitionDelay: `${isMobileMenuOpen ? 150 + (index * 100) : 0}ms` }}
              className={`
                group block relative w-full
                transition-all duration-500 ease-out transform
                ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
            >
              <div className="flex items-baseline justify-between group-active:border-blue-500 transition-colors active:scale-[0.95]">
                <span className="font-mono text-sm text-slate-400 font-bold group-hover:text-blue-500 transition-colors">
                  0{index + 1}
                </span>
                <span className={`font-sans text-4xl font-black tracking-tighter transition-colors ${activeSection === item.id ? 'text-blue-600' : 'text-slate-800 group-hover:text-blue-600'}`}>
                  {item.label}
                </span>
              </div>
              <div className="flex justify-end mt-1 overflow-hidden">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {item.sub}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-12 text-center font-bold">
            <p className="font-mono text-xs text-slate-600 tracking-widest">LOC_COORDS: <span className="text-blue-500 font-bold font-bold">44.3678° N, 26.1440° E</span></p>
        </div>

      </div>

      <style jsx>{`
        .scene { perspective: 800px; }
        .cube { width: 30px; height: 30px; position: relative; transform-style: preserve-3d; transform: rotateX(-20deg) rotateY(-20deg); animation: spin 10s infinite linear; }
        .face { position: absolute; width: 30px; height: 30px; border: 2px solid #314158; background: rgba(255, 255, 255, 0.05); transition: all 0.3s ease; }
        .front  { transform: translateZ(15px); }
        .back   { transform: rotateY(180deg) translateZ(15px); }
        .right  { transform: rotateY(90deg) translateZ(15px); }
        .left   { transform: rotateY(-90deg) translateZ(15px); }
        .top    { transform: rotateX(90deg) translateZ(15px); }
        .bottom { transform: rotateX(-90deg) translateZ(15px); }
        @keyframes spin { 0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); } }
        .cubic-bezier { transition-timing-function: cubic-bezier(0.77, 0, 0.175, 1); }
      `}</style>
    </nav>
  );
}
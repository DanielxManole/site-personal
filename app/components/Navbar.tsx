"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['despre', 'proiecte', 'tehnologii', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 500) {
            setActiveSection(section);
            return; 
          } else if (rect.top < 0 && rect.bottom > 150) {
             setActiveSection(section);
          }
        }
      }
      if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    router.push("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#e0e5ec]/90 backdrop-blur-sm border-b border-white/20 shadow-sm select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Link 
              href="#" 
              onClick={scrollToTop} 
              className="flex items-center gap-4 group cursor-pointer"
            >

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
                <span className="font-bold text-black-slate-700 leading-none tracking-tight group-hover:text-blue-600 tracking-tighter transition-colors duration-300">
                  Manole.cad
                </span>
                <span className="text-[10px] text-slate-400 font-mono leading-none mt-1 group-hover:text-blue-400 transition-colors duration-300">
                  Part1
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="#despre" className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${activeSection === 'despre' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Despre</Link>
              <Link href="#proiecte" className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${activeSection === 'proiecte' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Proiecte</Link>
              <Link href="#tehnologii" className={`px-3 py-2 rounded-md text-sm font-bold transition-colors ${activeSection === 'tehnologii' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Competențe</Link>
              <Link href="#contact" className={`px-6 py-2 ml-4 rounded-xl text-sm font-bold transition-all duration-300 ease-out active:scale-95 shadow-[4px_4px_8px_#bec3c9,-4px_-4px_8px_rgba(255,255,255,0.5)] ${activeSection === 'contact' ? 'bg-blue-600 text-white' : 'bg-[#e0e5ec] text-slate-600 hover:bg-blue-600 hover:text-white'}`}>Contact</Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scene {
          perspective: 800px;
        }

        .cube {
          width: 30px;
          height: 30px;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(-20deg) rotateY(-20deg);
          animation: spin 10s infinite linear;
        }

        .face {
          position: absolute;
          width: 30px;
          height: 30px;
          border: 2px solid #314158;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .front  { transform: translateZ(15px); }
        .back   { transform: rotateY(180deg) translateZ(15px); }
        .right  { transform: rotateY(90deg) translateZ(15px); }
        .left   { transform: rotateY(-90deg) translateZ(15px); }
        .top    { transform: rotateX(90deg) translateZ(15px); }
        .bottom { transform: rotateX(-90deg) translateZ(15px); }

        @keyframes spin {
        0% {
          transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        }
        100% {
          transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
        }
      `}</style>
    </nav>
  );
}
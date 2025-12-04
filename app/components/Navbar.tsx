"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// 1. MUTĂM DEFINIȚIA AICI (În afara componentei)
// Astfel, nu se mai recreează la fiecare render și nu mai cauzează erori.
const menuItems = [
  { id: "despre", label: "DESPRE", sub: "Cine sunt eu?" },
  { id: "proiecte", label: "PROIECTE", sub: "Portofoliu" },
  { id: "tehnologii", label: "COMPETENȚE", sub: "Stack Tehnic" },
  { id: "contact", label: "CONTACT", sub: "Hai să vorbim" },
];

function AnimatedLink({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);
    if (onClick) onClick();
    window.location.href = href;
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${className} transform transition-transform duration-150 ${
        isClicked ? "scale-95" : "scale-100"
      }`}
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // (menuItems nu mai este aici)

  const touchStartRef = useRef(0);

  // 1. Scroll Lock Effect
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Când meniul e deschis, doar ascundem bara de scroll a body-ului
      // Asta previne scroll-ul în spate fără să schimbe poziția paginii (fără position: fixed)
      document.body.style.overflow = "hidden";
    } else {
      // Când meniul se închide, revenim la normal
      document.body.style.overflow = "";
    }

    // Cleanup: ne asigurăm că dacă se demontează componenta, scroll-ul revine
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // 2. Swipe Gestures Effect
// 2. Swipe Gestures Effect
  useEffect(() => {
    const minSwipeDistance = 70; 
    
    // AICI E SCHIMBAREA:
    // 50 = doar marginea (foarte strict)
    // window.innerWidth / 2 = jumătate de ecran (mai relaxat)
    // 0 = tot ecranul (ce ai cerut tu, dar riscant)
    
    // Recomandarea mea: 
    const triggerZoneStart = window.innerWidth - (window.innerWidth * 0.40); // Activ pe ultimii 40% din dreapta

    // Variabile locale pentru a nu depinde de re-render
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - touchStartX;
      const deltaY = e.touches[0].clientY - touchStartY;

      // Dacă mișcarea e preponderent orizontală, prevenim scroll-ul paginii
      // DOAR dacă suntem în zona de trigger sau meniul e deja deschis
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        if (isMobileMenuOpen || touchStartX > triggerZoneStart) {
             e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const swipeDistance = endX - touchStartX;

      // DESCHIDERE: Swipe Stânga (valoare negativă)
      if (
        swipeDistance < -minSwipeDistance && 
        !isMobileMenuOpen &&
        touchStartX > triggerZoneStart // <--- AICI SE VERIFICĂ ZONA DE START
      ) {
        setIsMobileMenuOpen(true);
      }

      // ÎNCHIDERE: Swipe Dreapta (valoare pozitivă)
      if (swipeDistance > minSwipeDistance && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobileMenuOpen]);


  const [hideHamburger, setHideHamburger] = useState(false);
  useEffect(() => {
    const checkModal = () => {
      setHideHamburger(localStorage.getItem('modalOpen') === 'true');
    };
    
    checkModal();
    window.addEventListener('storage', checkModal);
    const interval = setInterval(checkModal, 100);
    
    return () => {
      window.removeEventListener('storage', checkModal);
      clearInterval(interval);
    };
  }, []);

  // 3. Scroll Spy Effect (MODIFICAT FINAL)
  useEffect(() => {
    if (isMobileMenuOpen) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (progressBarRef.current) {
            const totalScroll =
              window.scrollY || document.documentElement.scrollTop;
            const windowHeight =
              document.documentElement.scrollHeight -
              document.documentElement.clientHeight;

            if (windowHeight > 0) {
              const scrollPercent = totalScroll / windowHeight;
              const safePercent = Math.min(
                100,
                Math.max(0, scrollPercent * 100)
              );
              progressBarRef.current.style.width = `${safePercent}%`;
            }
          }
        
          // Aici folosim variabila externă menuItems, care e stabilă
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
          if (window.scrollY < 100) setActiveSection("");

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    
    // 2. DEPENDENCY CLEAN: Doar isMobileMenuOpen. 
    // menuItems nu mai trebuie pus aici pentru că e constantă externă.
  }, [isMobileMenuOpen]);

  const pathname = usePathname();
  const isErrorPage = pathname !== "/";
  const logoHref = isErrorPage ? "/" : "#top";

  const scrollToTop = () => {
    setIsMobileMenuOpen(false);
    if (isErrorPage) {
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20">
       {/* RESTUL CODULUI ESTE IDENTIC, DOAR ASIGURĂ-TE CĂ HTML-UL DE MAI JOS E COMPLET */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-[#e0e5ec]/90 backdrop-blur-md border-b border-slate-300 z-50 transition-all duration-300 will-change-transform">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full w-full">
            <div className="flex-shrink-0 z-50">
              <AnimatedLink
                href={logoHref}
                className="flex items-center gap-4 group cursor-pointer"
                onClick={scrollToTop}
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
                  <span className="font-sans text-[20px] font-black text-slate-700 leading-none tracking-tight group-hover:text-blue-600 transition-colors duration-300 tracking-tighter">
                    ManoleDaniel.cad
                  </span>
                  <span className="font-mono text-[14px] text-slate-400 leading-none mt-1 group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-1 tracking-tighter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 text-blue-500"
                    >
                      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
                      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
                    </svg>
                    Part1
                  </span>
                </div>
              </AnimatedLink>
            </div>

            <div className="hidden md:block">
              <div className="hidden md:flex items-baseline ml-auto space-x-4 md:space-x-8">
                {menuItems.map((item) => (
                  <AnimatedLink
                    key={item.id}
                    href={isErrorPage ? `/#${item.id}` : `#${item.id}`}
                    className={`
                      font-sans px-3 py-2 rounded-md text-sm font-bold transition-all
                      ${
                        item.id === "contact"
                          ? "ml-4 px-6 bg-blue-600 text-white shadow-[4px_4px_8px_#a1a6ac,-4px_-4px_8px_rgba(255,255,255,0.5)] hover:bg-blue-700"
                          : activeSection === item.id
                          ? "text-blue-600"
                          : "text-slate-600 hover:text-blue-600"
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </AnimatedLink>
                ))}
              </div>
            </div>

            <div className="md:hidden flex items-center z-[60]">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`group relative w-12 h-12 rounded-xl bg-[#e0e5ec] flex flex-col justify-center items-center gap-[6px] shadow-[3px_3px_6px_#bec3c9,-3px_-3px_6px_white] active:shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] transition-all duration-300 ${
      hideHamburger ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
    }`}
  >
                <span
                  className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? "rotate-45 translate-y-[9px]" : ""
                  }`}
                ></span>
                <span
                  className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "scale-x-0 opacity-0"
                      : "scale-x-100 opacity-100"
                  }`}
                ></span>
                <span
                  className={`w-6 h-[3px] bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen
                      ? "w-6 -rotate-45 -translate-y-[9px]"
                      : ""
                  }`}
                ></span>
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
        className={`md:hidden fixed inset-0 z-40 bg-[#e0e5ec] flex flex-col justify-center items-center transition-all duration-500 cubic-bezier(0.77, 0, 0.175, 1) ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-slate-400 opacity-50 select-none"></div>
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-slate-400 opacity-50 select-none"></div>

        <div className="w-full max-w-sm px-6 space-y-8 relative z-50">
          {menuItems.map((item, index) => (
            <AnimatedLink
              key={item.id}
              href={isErrorPage ? `/#${item.id}` : `#${item.id}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group block relative w-full transition-all duration-500 ease-out transform ${
                isMobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex items-baseline justify-between group-active:border-blue-500 transition-colors">
                <span
                  className={`font-mono text-sm font-bold transition-colors ${
                    activeSection === item.id
                      ? "text-blue-500"
                      : "text-slate-400 group-hover:text-blue-500"
                  }`}
                >
                  0{index + 1}
                </span>
                <span
                  className={`font-sans text-4xl font-black tracking-tighter transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600"
                      : "text-slate-800 group-hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </span>
              </div>
              <div className="flex justify-end mt-1 overflow-hidden">
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {item.sub}
                </span>
              </div>
            </AnimatedLink>
          ))}
        </div>
        <div className="absolute bottom-20 text-center font-bold">
          <p className="font-mono text-xs text-slate-600 tracking-widest select-none">
            LOC_COORDS:{" "}
            <span className="text-blue-500 font-bold font-bold select-none">
              44.3678° N, 26.1440° E
            </span>
          </p>
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
        }
        .front {
          transform: translateZ(15px);
        }
        .back {
          transform: rotateY(180deg) translateZ(15px);
        }
        .right {
          transform: rotateY(90deg) translateZ(15px);
        }
        .left {
          transform: rotateY(-90deg) translateZ(15px);
        }
        .top {
          transform: rotateX(90deg) translateZ(15px);
        }
        .bottom {
          transform: rotateX(-90deg) translateZ(15px);
        }
        @keyframes spin {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }
      `}</style>
    </nav>
  );
}
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '../hooks/useScrollReveal';

const projectsData = [
  {
    id: "01",
    title: "CAD & PROIECTARE\u00A03D",
    category: "// Industrial Design",
    description: "Colecție extinsă de ansambluri mecanice și piese complexe, completate de desene tehnice 2D de precizie. Demonstrează expertiză în design parametric și documentație de execuție folosind CATIA V5, Fusion 360, SolidWorks și AutoCAD.",
    tech: ["CATIA V5", "Fusion 360", "SolidWorks", "AutoCAD"],
    status: "PORTFOLIO",
    link: "https://grabcad.com/library/3d-cad-manole-daniel-1",
    hasSlideshow: true, 
    images: [
      "/images/fusion2.jpg",
      "/images/catia5.jpg",
      "/images/solidworks1.jpg",
      "/images/catia4.jpg",
      "/images/catia7.jpg",
      "/images/fusion1.jpg",
      "/images/fusion6.jpg",
      "/images/fusion5.jpg",
      "/images/catia6.jpg",
      "/images/catia9.jpg",
      "/images/catia3.jpg",
      "/images/catia1.jpg",
      "/images/catia8.jpg",
      "/images/catia10.jpg",
      "/images/catia12.jpg",
      "/images/catia13.jpg",
      "/images/catia11.jpg",
      "/images/solidworks2.jpg",
      "/images/solidworks3.jpg",
      "/images/solidworks4.jpg",
      "/images/solidworks5.jpg",
      "/images/fusion3.jpg",
      "/images/catia2.jpg",
      "/images/fusion4.jpg",
      "/images/cad2.jpg",
      "/images/cad1.jpg",
      "/images/cad3.jpg"
    ]
  },
  {
    id: "02",
    title: "CALCULATOR TOLERANȚE\u00A0ISO",
    category: "// Python & Engineering",
    description: "Calculator pentru toleranțe și abateri dimensionale conform standardelor ISO, pentru arbori și alezaje, implementat în Python cu o interfață grafică simplă și intuitivă, realizată complet local, fără conexiune la internet.",
    tech: ["Python", "Tkinter", "NumPy", "PyInstaller", "Git / Github"],
    status: "V1.0 STABLE",
    link: "https://github.com/DanielxManole/ISOcalc",
    hasSlideshow: false, 
    images: [
      "/images/isocalc-preview.jpg" 
    ]
  },
  {
    id: "03",
    title: "SISTEM MONITORIZARE",
    category: "// Embedded AI & Computer Vision",
    description: "Proiectul propune un sistem de siguranță auto (ADAS) bazat pe inteligență artificială și rețele neuronale convoluționale (CNN), folosit pentru a detecta somnolența șoferilor în timp real prin analiza clipitului și a expresiilor faciale.",
    tech: ["LabVIEW", "PyTorch", "OpenCV", "Raspberry Pi 4"],
    status: "IN DEVELOPMENT",
    link: "/proiect3.pdf",
    hasSlideshow: false, 
    images: [
       "/images/driver-ai.jpg"
    ]
  }
];

const ProjectCard = ({ project }: { project: any }) => {

  const hasSlideshow = project.hasSlideshow && project.images.length > 1;
  const [currentIndex, setCurrentIndex] = useState(hasSlideshow ? 1 : 0); 
  
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const [isVisible, setIsVisible] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50; // Distanța minimă în pixeli pentru a considera că e swipe

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
        triggerPrev(); 
    }
  };
  
  const slides = hasSlideshow 
    ? [project.images[project.images.length - 1], ...project.images, project.images[0]]
    : project.images;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!hasSlideshow || isHovered || project.images.length <= 1 || isAnimating || !isVisible || !isTabActive) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
          setCurrentIndex(prev => prev + 1);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [hasSlideshow, isHovered, project.images, isAnimating, isVisible, isTabActive]);

  useEffect(() => {
    if (!hasSlideshow) return;

    if (currentIndex === slides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
        setIsAnimating(false);
      }, 700);
    }
    else if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
        setIsAnimating(false);
      }, 700);
    } 
    else {
      if (isAnimating) {
        setTimeout(() => {
          setIsAnimating(false);
        }, 700);
      }
    }

    if (!isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
    }
  }, [currentIndex, slides.length, hasSlideshow, isAnimating, isTransitioning]);

  const handleNext = (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const triggerPrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerPrev();
  };

  let displayIndex = 1;
  if (hasSlideshow) {
    if (currentIndex === 0) displayIndex = project.images.length;
    else if (currentIndex === slides.length - 1) displayIndex = 1;
    else displayIndex = currentIndex;
  }

  const showImage = project.images && project.images.length > 0;

  const getStatusColor = (status: string) => {
    if (status === 'PORTFOLIO') return 'border-purple-500 text-purple-600 bg-purple-50/50 select-none';
    if (status === 'V1.0 STABLE' || status === 'OPEN SOURCE') return 'border-green-500 text-green-600 bg-green-50/50 select-none';
    if (status === 'IN DEVELOPMENT' || status === 'IN PROGRESS') return 'border-orange-500 text-orange-500 bg-orange-50/50 select-none';
    return 'border-slate-400 text-slate-500 select-none';
  };

  const getButtonText = () => {
    if (project.id === "03") return "Vezi Prezentarea";
    if (project.hasSlideshow) return "Vezi Galerie Completa";
    return "Vezi Repository";
  };

  return (
    <div 
      ref={cardRef}
      className="group/card relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full bg-[#e0e5ec] rounded-2xl p-8 relative z-10 backface-hidden shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out group-hover/card:-translate-y-2 group-hover/card:shadow-[12px_12px_24px_rgb(163,177,198,0.7),-12px_-12px_24px_rgba(255,255,255,0.5)] transform-gpu">
        
        <div className="flex justify-between items-start mb-6 border-b border-slate-300 pb-3 border-dashed">
          <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100/50 px-2 py-1 rounded border border-blue-200 select-none">
            ID: {project.id}
          </span>
          <span className={`font-mono text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(project.status)}`}>
            [{project.status}]
          </span>
        </div>

        <h3 className="text-xl font-black text-slate-800 mb-2 group-hover/card:text-blue-700 transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 font-mono mb-4 uppercase tracking-wider select-none">
          {project.category}
        </p>

        {showImage ? (
          <div 
            className="mb-6 w-full aspect-video relative rounded-xl overflow-hidden border-2 border-white shadow-inner group/slider bg-slate-200 select-none touch-pan-y"
            onTouchStart={hasSlideshow ? onTouchStart : undefined}
            onTouchMove={hasSlideshow ? onTouchMove : undefined}
            onTouchEnd={hasSlideshow ? onTouchEnd : undefined}
          >
            <div 
              className="flex h-full ease-in-out" 
              style={{ 
                transform: `translateX(-${hasSlideshow ? currentIndex * 100 : 0}%)`,
                transitionDuration: isTransitioning && hasSlideshow ? '700ms' : '0ms',
                transitionProperty: 'transform'
              }}
            >
              {hasSlideshow ? (
                slides.map((imgSrc: string, idx: number) => (
                  <div key={idx} className="min-w-full h-full relative">
                    <Image 
                      src={imgSrc} 
                      alt={`${project.title} slide`} 
                      fill 
                      className="object-cover pointer-events-none"
                      priority={idx === 1} 
                    />
                  </div>
                ))
              ) : (
                <div className="min-w-full h-full relative">
                    <Image 
                      src={project.images[0]} 
                      alt={project.title} 
                      fill 
                      className="object-cover"
                    />
                </div>
              )}
            </div>
            
            {hasSlideshow && (
              <>
                <button onClick={handlePrev} className={`absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-slate-800 hover:bg-blue-600 hover:text-white transition-all duration-300 z-20 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}>←</button>
                <button onClick={handleNext} className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-slate-800 hover:bg-blue-600 hover:text-white transition-all duration-300 z-20 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-0'}`}>→</button>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 z-20">
                  {displayIndex} / {project.images.length}
                </div>
              </>
            )}
          </div>
        ) : null}

        <p className="text-slate-600 text-sm mb-8 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="space-y-3 mb-8 mt-auto select-none">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Tech Stack:
          </p>
          <div className="flex flex-wrap gap-2 transform-gpu">
            {project.tech.map((tech: string) => (
              <span key={tech} className="text-xs font-bold text-slate-600 px-3 py-1 rounded-lg bg-[#e0e5ec] shadow-[inset_2px_2px_5px_#bec3c9,inset_-2px_-2px_5px_rgba(255,255,255,0.5)] active:scale-[0.95]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="relative w-fit group/link select-none active:scale-[0.95]">
          <a href={project.link} target={project.link !== "#" ? "_blank" : "_self"} className="inline-flex items-center text-sm font-bold text-blue-600 transition-colors group-hover/link:text-blue-800">
            {getButtonText()}
            <span className="ml-1 transition-transform group-hover/link:translate-x-1 duration-500">→</span>
          </a>
        </div>

      </div>
    </div>
  );
};

export default function Projects() {
  const { ref, isVisible } = useScrollReveal(0.4); 

  return (
    <section 
      id="proiecte" 
      ref={ref}
      className="min-h-screen flex flex-col justify-center py-24 px-4 max-w-7xl mx-auto relative scroll-mt-20"
    >
      
      <div className={`
        transition-all duration-1000 md:duration-500 ease-out transform will-change-transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>

        <div className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4">
          <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
            02_PROIECTE
          </h2>
          <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
            // SYSTEM_MODULES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}

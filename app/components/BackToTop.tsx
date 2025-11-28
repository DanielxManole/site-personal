"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    router.push("/");
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 50);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-[9999] 
        p-3 rounded-xl
        
        bg-blue-600 
        text-white
        border border-blue-500
        
        shadow-[0_10px_20px_rgba(37,99,235,0.1)]
        
        transform-gpu transition-all duration-300 ease-out
        
        hover:bg-blue-700
        hover:shadow-[0_15px_30px_rgba(37,99,235,0.1)]
        hover:-translate-y-1
        active:scale-95

        cursor-pointer

        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
      `}
      aria-label="Back to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2.5}
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 3h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V6m0 0L5.25 12.75M12 6l6.75 6.75" />
      </svg>
    </button>
  );
}
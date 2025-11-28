"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const router = useRouter();

  const transitionClass = "transition-all duration-300 ease-out";

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);

    const toggleVisibility = () => setIsVisible(window.scrollY > 400);

    // Inițial
    handleResize();
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollToTop = () => {
    if (window.location.hash !== "#top") {
      router.push("#top");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => {
    setTimeout(() => {
      setIsPressed(false);
      setTimeout(() => {
        handleScrollToTop();
      }, 100);
    }, 50);
  };

  if (!isDesktop) return null; // ascunde pe ecrane <768px

  return (
    <button
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      onTouchCancel={() => setIsPressed(false)}
      className={`
        fixed bottom-8 right-8 z-[9999]
        group p-0 py-1 cursor-pointer select-none
        transform-gpu transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}
        ${isPressed ? "scale-95" : "scale-100"}
        ${transitionClass}
      `}
      aria-label="Back to top"
    >
      <div
        className={`
          p-3 rounded-xl flex items-center justify-center
          bg-blue-600 text-white border border-blue-500
          shadow-[0_10px_20px_rgba(37,99,235,0.1)]
          ${transitionClass}
          group-hover:bg-blue-700
          group-hover:shadow-[0_15px_30px_rgba(37,99,235,0.1)]
          group-hover:-translate-y-1
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform duration-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l7-7 7 7" />
        </svg>
      </div>
    </button>
  );
}

"use client";

import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "gray";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  target?: string;
  disabled?: boolean;
  className?: string;
  isClicked?: boolean;
}

export default function GradientButton({
  children,
  variant = "blue",
  onClick,
  href,
  target,
  disabled,
  className = "",
  isClicked = false,
}: GradientButtonProps) {
  
  const gradientClass = variant === "blue" ? "gradient-btn-blue" : "gradient-btn-gray";

  const baseStyles = `
    relative flex items-center justify-center gap-2 px-10 py-4 
    rounded-xl font-bold text-lg leading-tight
    overflow-hidden
    
    border-0
    
    will-change-transform
    transition-all duration-300 ease-out
    
    focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500
    
    ${gradientClass}
  `;

  const desktopInteraction = variant === "blue" 
    ? `
      /* Blue Button */
      md:shadow-[3px_3px_12px_#a1a6ac,-3px_-3px_12px_rgba(255,255,255,0.5)]
      md:active:scale-[0.95] cursor-pointer 
      text-white
      ${isClicked ? "md:scale-[0.95]" : "md:scale-100"}
    ` 
    : `
      /* Gray Button */
      md:shadow-[3px_3px_32px_#bec3c9,-3px_-3px_12px_rgba(255,255,255,0.5)]
      md:active:scale-[0.95]
      cursor-pointer
      ${isClicked ? "md:scale-[0.95]" : "md:scale-100"} 
    `;

  const combinedClasses = `${baseStyles} ${desktopInteraction} ${className}`;

  const GlobalStyles = () => (
    <style jsx global>{`
      .gradient-btn-blue::before,
      .gradient-btn-gray::before {
        content: "";
        position: absolute;
        
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        
        z-index: -1;
        background-size: 200% auto;
        transition: background-position 0.5s ease;
      }

      .gradient-btn-blue::before {
        background-image: linear-gradient(45deg, #1d4ed8 0%, #2563eb 51%, #1d4ed8 100%);
      }

      .gradient-btn-gray::before {
        background-image: linear-gradient(45deg, #f0f4f8 0%, #e6ebf2 51%, #f0f4f8 100%);
      }

      .gradient-btn-blue:hover::before, .gradient-btn-blue:active::before,
      .gradient-btn-gray:hover::before, .gradient-btn-gray:active::before {
        background-position: right center;
      }

      @media (max-width: 767px) {
        .gradient-btn-blue:hover::before, .gradient-btn-gray:hover::before {
          background-position: 0 0; 
        }

        .gradient-btn-blue:active::before, .gradient-btn-gray:active::before {
          background-position: right center !important;
          transition: background-position 0.3s ease-out !important;
        }
      }
    `}</style>
  );

  if (href) {
    return (
      <>
        <GlobalStyles />
        <a href={href} target={target} className={combinedClasses}>
          <span className="relative z-10 flex items-center gap-2 justify-center w-full h-full">
            {children}
          </span>
        </a>
      </>
    );
  }

  return (
    <>
      <GlobalStyles />
      <button onClick={onClick} disabled={disabled} className={combinedClasses}>
        <span className="relative z-10 flex items-center gap-2 justify-center w-full h-full">
          {children}
        </span>
      </button>
    </>
  );
}
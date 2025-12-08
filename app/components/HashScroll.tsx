"use client";

import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: y,
            behavior: "instant"
          });
        }
      }
    };
    const timer = setTimeout(scrollToHash, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}

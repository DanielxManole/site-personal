"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const el = document.querySelector(hash);
      if (!el) return;

      // Dacă elementul e deja vizibil (opacity>0), scroll imediat smooth
      const bodyOpacity = parseFloat(getComputedStyle(document.body).opacity || "1");
      if (bodyOpacity > 0) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Dacă fade-ul încă rulează, scroll după timeout mic
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50); // foarte scurt, doar ca fade să fie aproape gata
      }
    };

    // Scroll inițial la mount
    scrollToHash();

    // Ascultăm Back/Forward
    window.addEventListener("popstate", scrollToHash);

    return () => window.removeEventListener("popstate", scrollToHash);
  }, []);

  return null;
}
"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    // 1. Prevenim browserul să facă scroll haotic
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
      
      // Setăm o limită de timp (de ex: încercăm timp de 3 secunde)
      let attempts = 0;
      const maxAttempts = 60; // 60 * 50ms = 3 secunde

      const checkElement = () => {
        const element = document.getElementById(id);

        if (element) {
          // L-am găsit! Facem scroll și ne oprim.
          // scrollIntoView va respecta scroll-margin-top din CSS-ul tău
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // Nu l-am găsit încă. Mai încercăm.
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(checkElement, 50); // Verifică din nou peste 50ms
          }
        }
      };

      checkElement();
    };

    // Pornim căutarea imediat ce componenta se montează
    scrollToHash();

    // Ascultăm și click-urile pe link-uri (navigare internă)
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
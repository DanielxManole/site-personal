"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    // Oprim browserul din a face scroll automat (care e glitchy)
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const element = document.getElementById(hash);
      if (!element) return;

      const headerOffset = 80; // Înălțimea navbar-ului
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "instant" // IMPORTANT: Instant la load, nu smooth
      });
    };

    // Logica de întârziere - Cheia succesului
    const handleLoad = () => {
        // Așteptăm 100ms
        setTimeout(() => {
            scrollToHash();
            
            // MAI FACEM O DATĂ SCROLL DUPĂ ÎNCĂ 300ms
            // Asta repară cazul în care imaginile/background-ul au împins conținutul
            setTimeout(scrollToHash, 300);
        }, 100);
    };

    // Dacă pagina e deja încărcată (cazul Next.js navigate), rulăm direct
    if (document.readyState === "complete") {
        handleLoad();
    } else {
        window.addEventListener("load", handleLoad);
        // Fallback pentru Next.js route changes
        handleLoad(); 
    }

    // Ascultăm schimbările de hash (click pe meniu)
    const handleHashChange = () => {
        const hash = window.location.hash.replace("#", "");
        if(hash) {
             const element = document.getElementById(hash);
             if (!element) return;
             const headerOffset = 80;
             const elementPosition = element.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
             
             window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
             });
        }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return null;
}
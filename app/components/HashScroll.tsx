"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    // 1. Setăm manual scroll doar la montare
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToTarget = (targetId: string, behaviorType: ScrollBehavior) => {
      const element = document.getElementById(targetId);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const headerOffset = 80; // Ajustează după navbar

      // Calculăm poziția finală
      const absoluteElementTop = rect.top + scrollTop - headerOffset;

      // Folosim requestAnimationFrame pentru a ne asigura că scroll-ul se întâmplă
      // în următorul frame de randare, nu în mijlocul calculelor
      window.requestAnimationFrame(() => {
        window.scrollTo({
          top: absoluteElementTop,
          behavior: behaviorType,
        });
      });

      return true;
    };

    const handleInitialScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      // Mărim delay-ul inițial puțin pentru a lăsa React să termine hidratarea
      // Uneori 100ms e prea puțin dacă pagina e grea
      setTimeout(() => {
        let attempts = 0;
        const maxAttempts = 20; // Reducem numărul de încercări, dar le facem mai rare

        const attemptScroll = () => {
          // La initial load folosim 'auto' (instant) sau 'smooth'? 
          // 'auto' e mai sigur pentru a evita glitch-uri vizuale mari la load
          const success = scrollToTarget(hash, "auto"); 
          
          if (!success && attempts < maxAttempts) {
            attempts++;
            // Mărim intervalul la 100ms pentru a nu spama browserul
            setTimeout(attemptScroll, 100); 
          }
        };

        attemptScroll();
      }, 300); // Un delay inițial mai sănătos
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToTarget(hash, "smooth");
      }
    };

    // Ascultăm evenimentul de load complet al ferestrei, nu doar montarea React
    if (document.readyState === "complete") {
      handleInitialScroll();
    } else {
      window.addEventListener("load", handleInitialScroll);
    }
    
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("load", handleInitialScroll);
      // OPTIONAL: Nu reseta scrollRestoration la 'auto' la unmount 
      // dacă navighezi între pagini, pentru că Next.js s-ar putea să o ia razna.
      // Lasă-l pe manual sau testează dacă linia de mai jos e sursa problemelor.
      // if ("scrollRestoration" in history) history.scrollRestoration = "auto";
    };
  }, []);

  return null;
}

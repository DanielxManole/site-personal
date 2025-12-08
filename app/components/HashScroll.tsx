"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // AICI SUNT TIPURILE ADĂUGATE: (targetId: string, behaviorType: ScrollBehavior)
    const scrollToTarget = (targetId: string, behaviorType: ScrollBehavior) => {
      const element = document.getElementById(targetId);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Ajustează 80 cu înălțimea navbar-ului tău
      const headerOffset = 80; 
      
      const absoluteElementTop = rect.top + scrollTop - headerOffset;

      window.scrollTo({
        top: absoluteElementTop,
        behavior: behaviorType,
      });

      return true;
    };

    const handleInitialScroll = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      let attempts = 0;
      const maxAttempts = 50;

      const attemptScroll = () => {
        const success = scrollToTarget(hash, "auto");
        
        if (!success && attempts < maxAttempts) {
          attempts++;
          setTimeout(attemptScroll, 50);
        }
      };

      setTimeout(attemptScroll, 100);
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        scrollToTarget(hash, "smooth");
      }
    };

    handleInitialScroll();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
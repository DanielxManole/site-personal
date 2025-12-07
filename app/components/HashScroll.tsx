"use client";
import { useEffect, useRef } from "react";

export default function HashScroll() {
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
      
      let attempts = 0;
      const maxAttempts = 60;

      const checkElement = () => {
        const element = document.getElementById(id);

        if (element) {
          const behavior = isInitialLoad.current ? "auto" : "smooth";
          
          element.scrollIntoView({ behavior: behavior, block: "start" });
          
          isInitialLoad.current = false;
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(checkElement, 50);
          }
        }
      };

      setTimeout(checkElement, 100);
    };

    scrollToHash();

    const handleHashChange = () => {
        isInitialLoad.current = false; 
        scrollToHash();
    };

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
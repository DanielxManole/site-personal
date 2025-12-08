"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const id = hash.replace("#", "");
      
      let attempts = 0;
      const maxAttempts = 100;

      const checkElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          attempts++;
          if (attempts < maxAttempts) {
            setTimeout(checkElement, 50);
          }
        }
      };
      setTimeout(() => {
        checkElement();
      }, 2000);
    };

    scrollToHash();
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

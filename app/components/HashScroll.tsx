"use client";
import { useEffect } from "react";

export default function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const el = document.querySelector(hash);
      if (!el) return;

      const bodyOpacity = parseFloat(getComputedStyle(document.body).opacity || "1");
      if (bodyOpacity > 0) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    };

    scrollToHash();

    window.addEventListener("popstate", scrollToHash);

    return () => window.removeEventListener("popstate", scrollToHash);
  }, []);

  return null;
}
"use client";

import { useEffect } from "react";

export default function GlobalPointerLock() {
  useEffect(() => {
    let lock = false;

    const handlePointerDown = (e: PointerEvent) => {
      if (lock) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      lock = true;
      setTimeout(() => {
        lock = false;
      }, 300);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, []);

  return null;
}
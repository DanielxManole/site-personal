"use client";

import { useEffect } from "react";

export default function ConsoleHello() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(
        "\n%c SYSTEM_READY %c \n\nSalut! Contactează-mă pentru o colaborare: manoledaniel2004@gmail.com",
        "background: #2563eb; color: white; padding: 10px; border-radius: 4px; font-weight: bold;",
        "color: #F00;"
      );
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

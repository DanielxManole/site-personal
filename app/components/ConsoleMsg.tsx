"use client";

import { useEffect } from "react";

export default function ConsoleHello() {
  useEffect(() => {
    console.log(
      "%c SYSTEM_READY %c \nSalut! Contactează-mă pentru o colaborare: manoledaniel2004@gmail.com",
      "background: #2563eb; color: white; padding: 4px; border-radius: 4px; font-weight: bold;",
      "color: #64748b;"
    );
  }, []);

  return null;
}
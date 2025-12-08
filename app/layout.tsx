import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConsoleMsg from "./components/ConsoleMsg";
import HashScroll from "./components/HashScroll";
import Navbar from "./components/Navbar";
import CADCursor from "./components/CADCursor"; 
import GlobalPointerLock from "./components/GlobalPointerLock";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space", 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-jetbrains", 
});

export const metadata: Metadata = {
  // ... metadata-ul tău ...
  title: "Manole Daniel | Inginerie & Robotică",
  description: "Portofoliu personal",
};

export const viewport = {
  themeColor: "#e0e5ec",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="bg-[#e0e5ec]"> 
      {/* 1. SCOATE 'opacity-0' și 'fade-in-on-load' DE PE BODY !!!
         Asta repara bug-ul vizual cu Navbar-ul.
      */}
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#e0e5ec] min-h-screen antialiased`}>
        
        <HashScroll />
        <ConsoleMsg />
        <CADCursor />
        
        {/* Navbar-ul stă "liber" în body, neafectat de animații */}
        <Navbar />
        
        <GlobalPointerLock />

        {/* 2. Mutăm animația aici, doar pe conținutul paginii.
           Astfel, pagina face fade-in, dar Navbar-ul rămâne țeapăn.
        */}
        <div className="opacity-0 fade-in-on-load">
            {children}
        </div>

      </body>
    </html>
  );
}
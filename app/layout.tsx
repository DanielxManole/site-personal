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
  preload: false,
  variable: "--font-space", 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  preload: false,
  variable: "--font-jetbrains", 
});

export const metadata: Metadata = {
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
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#e0e5ec] min-h-screen antialiased`}>
        
        <HashScroll />
        <ConsoleMsg />
        <CADCursor />
        <Navbar />
        <GlobalPointerLock />
        <div className="opacity-0 fade-in-on-load">
            {children}
        </div>

      </body>
    </html>
  );
}
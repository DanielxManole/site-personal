import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CADCursor from "./components/CADCursor"; 

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space", 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains", 
});

export const metadata: Metadata = {
  title: "Portofoliu Inginerie & Web",
  description: "Portofoliu student robotică",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#e0e5ec] antialiased opacity-0 fade-in-on-load`}>
        
        <CADCursor />
        
        <Navbar />
        {children}
        
      </body>
    </html>
  );
}
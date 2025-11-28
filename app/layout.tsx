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
  title: "Manole Daniel | Inginerie & Robotică",
  description: "Portofoliu personal - Student la Inginerie Industrială și Robotică (UNSTPB).",
  keywords: ["Manole Daniel", "Inginerie", "Robotică", "CAD", "CATIA", "Portofoliu", "Next.js", "Student"],
  authors: [{ name: "Manole Daniel" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://manoledaniel.vercel.app",
    title: "Manole Daniel | Portfolio",
    description: "Vezi proiectele mele de CAD, Robotică și Software.",
    siteName: "Manole Daniel Portfolio",
    images: [
       {
         url: '/opengraph-image.png',
         width: 1200,
         height: 630,
         alt: 'Manole Daniel Portfolio Preview',
       },
     ],
  },
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
    <html lang="ro" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-[#e0e5ec] antialiased opacity-0 fade-in-on-load`}>
        
        <ConsoleMsg />
        <CADCursor />
        <HashScroll />
        <Navbar />
        <GlobalPointerLock />
        {children}
      </body>
    </html>
  );
}
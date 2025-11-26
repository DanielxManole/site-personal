"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#e0e5ec] text-slate-700 px-4 text-center select-none">
      
      <h1 className="text-9xl font-black text-slate-300/50 absolute z-0">404</h1>
      
      <div className="relative z-10 flex flex-col items-center">
         <div className="w-16 h-16 bg-[#e0e5ec] rounded-full shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_rgba(255,255,255,0.8)] flex items-center justify-center mb-6 text-2xl">
            ⚠️
         </div>

         <h2 className="text-2xl md:text-3xl font-bold mb-2 text-slate-800">SYSTEM_ERROR</h2>
         <p className="font-mono text-sm mb-8 text-slate-500 max-w-md">
           Destinația specificată nu există în baza de date. <br/>
           Te rugăm să te întorci la consolă.
         </p>

         <Link 
           href="/" 
           className="px-8 py-3 bg-[#e0e5ec] text-blue-600 rounded-xl font-bold shadow-[5px_5px_10px_#bec3c9,-5px_-5px_10px_rgba(255,255,255,0.8)] hover:text-blue-700 active:scale-95 transition-all"
         >
           ← ÎNAPOI LA BAZĂ
         </Link>
      </div>
    </div>
  );
}
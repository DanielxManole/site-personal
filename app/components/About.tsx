"use client";

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="despre" className="min-h-screen flex flex-col justify-center py-24 px-4 max-w-7xl mx-auto relative">
      
      <div className="mb-16 flex flex-col md:flex-row md:items-end gap-4 border-b-2 border-slate-800 pb-4">
        <h2 className="text-4xl md:text-5xl font-mono font-bold text-slate-800 tracking-tighter">
          01_DESPRE
        </h2>
        <span className="font-mono text-blue-600 mb-2 text-sm font-bold select-none">
          // OPERATOR_PROFILE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="
            bg-[#e0e5ec] p-6 rounded-2xl border border-white/50 relative overflow-hidden group 
            shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)]
            z-20 transform-gpu
          ">
            
            <div className="aspect-square rounded-xl relative overflow-hidden mb-4 select-none">
              
              <div className="absolute inset-0 bg-white z-10"></div> 
              
              <img
                src="/images/manole-daniel-profile.jpg"
                alt="Manole Daniel Profile Picture"
                className="object-cover w-full h-full absolute inset-0 rounded-xl border-2 border-slate-300 z-20" 
              />
              
              <div className="absolute inset-0 bg-blue-500/10 animate-subtle-pulse z-30"></div> 
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800">Manole Daniel</h3>
              <p className="text-sm text-blue-600 font-mono font-bold mt-1">STUDENT @ ROBOTICĂ</p>
              <div className="mt-4 flex justify-center gap-2 items-center">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                 <span className="text-xs font-mono text-slate-500 select-none">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
              <p className="text-[10px] font-mono text-slate-400 uppercase">Locație</p>
              <p className="text-sm font-bold text-slate-700">București, România</p>
            </div>
            <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
              <p className="text-[10px] font-mono text-slate-400 uppercase">Domeniu Cheie</p>
              <p className="text-sm font-bold text-slate-700">Programare & CAD</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#e0e5ec] p-8 md:p-10 rounded-3xl relative shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] z-20 transform-gpu">
          <div className="absolute top-4 left-4 w-2 h-2 border-t-2 border-l-2 border-slate-400"></div>
          <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-slate-400"></div>
          <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-slate-400"></div>
          <div className="absolute bottom-4 right-4 w-2 h-2 border-b-2 border-r-2 border-slate-400"></div>

          {/* 01. BIO LOG */}
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-mono">
            <span className="text-blue-600">01.</span> BIO_LOG
          </h3>
          <div className="text-base text-slate-600 leading-relaxed mb-10 font-medium space-y-4"> 
            <p>Student în anul 3 la <strong>Facultatea de Inginerie Industrială și Robotică</strong>, din cadrul <strong>Politehnica București</strong>.</p>
            <p>Sunt pasionat de CAD, Programare, Robotică, Machine Learning și Baze de Date, cu un talent pentru rezolvarea creativă a problemelor și livrarea de rezultate bune, fiind o persoană adaptabilă.</p>
          </div>

          {/* 02. EXPERIENȚĂ (NOU) */}
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-mono">
            <span className="text-blue-600">02.</span> EXPERIENȚĂ
          </h3>
          <div className="space-y-6 relative pl-6 border-l-2 border-slate-200 ml-2 mb-10">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-[#e0e5ec]"></div>
              <h4 className="font-bold text-slate-800">Internship Departamentul Dezvoltare Produs</h4>
              <p className="text-sm text-slate-500 font-mono">Saint-Gobain Sekurit | Iunie - August 2025</p>
              <ul className="text-sm text-slate-600 mt-2 ml-4 list-disc space-y-1">
                <li>Pregătirea și ajustarea sitelor de printare 2D pentru proiecte auto (Renault Master III, VW Touran II).</li>
                <li>Dezvoltarea unui script Python pentru extragerea datelor critice privind controlul temperaturii și curburii sticlei.</li>
                <li>Analiză și centralizare date pentru materii prime pentru reducerea diversității și optimizarea producției.</li>
              </ul>
            </div>
          </div>
          {/* SFÂRȘIT EXPERIENȚĂ */}

          {/* Coloane: EDUCAȚIE și SKILL FOCUS (Numerotarea actualizată) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Coloana 1: EDUCAȚIE */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-mono">
                <span className="text-orange-500">03.</span> EDUCAȚIE
              </h3>
              <div className="space-y-6 relative pl-6 border-l-2 border-slate-200 ml-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-orange-400 border-4 border-[#e0e5ec]"></div>
                  <h4 className="font-bold text-slate-800">Facultatea de Inginerie Industrială și Robotică - UNSTPB</h4>
                  <p className="text-sm text-slate-500 font-mono">Informatică Industrială | 2023 - Prezent</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-400 border-4 border-[#e0e5ec]"></div>
                  <h4 className="font-bold text-slate-800">Colegiul Național Barbu Știrbei, Călărași</h4>
                  <p className="text-sm text-slate-500 font-mono">Matematică-Informatică ‎ | 2019 - 2023</p>
                </div>
              </div>
            </div>

            {/* Coloana 2: SKILL FOCUS */}
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2 font-mono">
                <span className="text-orange-500">04.</span> CERTIFICĂRI
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
                  <p className="text-s font-bold text-slate-700">Python Certificate</p>
                  <p className="text-[12px] font-mono text-green-800">Emis de HackerRank în Ianuarie 2025</p>
                </div>
                
                <div className="p-4 rounded-xl bg-[#e0e5ec] shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_rgba(255,255,255,0.5)]">
                  <p className="text-s font-bold text-slate-700">Software Engineer Intern Certificate</p>
                  <p className="text-[12px] font-mono text-green-800">Emis de HackerRank în Ianuarie 2025</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
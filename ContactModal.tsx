"use client";

import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'IDLE' | 'SENDING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State inputuri
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });

  // State Metronom (Pulse erori)
  const [pulseHigh, setPulseHigh] = useState(true);

  // === STATE NOU: CRONOMETRU ===
  const [countdown, setCountdown] = useState(3);

  // Închidere cu ESC optimizată (Fără Lag)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        
        // 1. Scoatem focusul imediat
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }

        // 2. Așteptăm un singur frame (aprox 16ms) ca browserul să termine randarea vizuală a blur-ului
        requestAnimationFrame(() => {
            // 3. Abia acum închidem modalul
            onClose();
        });
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);
  
  // 1. Efectul de Metronom (pentru erori)
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setPulseHigh(prev => !prev), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // 2. Efectul de Cronometru (Rulează doar când e SUCCESS)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (status === 'SUCCESS' && isOpen) {
      if (countdown > 0) {
        // Scădem numărul la fiecare secundă
        timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      } else {
        // Când ajunge la 0: Închidem modalul și resetăm tot
        onClose();
        // Mic delay ca userul să nu vadă resetarea vizuală
        setTimeout(() => {
          setStatus('IDLE');
          setErrors({});
          setFormData({ user_name: '', user_email: '', message: '' });
          setCountdown(3); // Resetăm contorul pentru data viitoare
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [status, countdown, isOpen, onClose]);


  if (!isOpen) return null;

  // --- LOGICA INPUT & VALIDARE (Neschimbată) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'user_name') finalValue = value.replace(/\b\w/g, (char) => char.toUpperCase());
    if (name === 'message') finalValue = value.charAt(0).toUpperCase() + value.slice(1);

    setFormData(prev => ({ ...prev, [name]: finalValue }));

    if (errors[name]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const getFieldError = (name: string, value: string) => {
    if (name === 'user_name') {
      if (!value || value.trim().length < 2) return "MINIM 2 CARACTERE";
    }
    if (name === 'user_email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
      if (!value || !emailRegex.test(value)) return "FORMAT INVALID";
    }
    if (name === 'message') {
      if (!value || value.trim().length < 10) return "MINIM 10 CARACTERE";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const nameErr = getFieldError('user_name', formData.user_name);
    if (nameErr) newErrors.user_name = nameErr;
    const emailErr = getFieldError('user_email', formData.user_email);
    if (emailErr) newErrors.user_email = emailErr;
    const msgErr = getFieldError('message', formData.message);
    if (msgErr) newErrors.message = msgErr;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = getFieldError(name, value);
    setErrors(prev => {
      const newErrors = { ...prev };
      if (error) newErrors[name] = error;
      else delete newErrors[name];
      return newErrors;
    });
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('SENDING');

    if (form.current) {
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        // DOAR setăm statusul. useEffect-ul de sus se ocupă de numărătoare.
        setStatus('SUCCESS');
        setCountdown(3); 
      }, (error) => {
        console.log('FULL ERROR:', error);
        setStatus('ERROR');
      });
    }
  };

  const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-sm animate-in zoom-in duration-300">
      <path fill="#ef4444" d="M4.47 20.504h15.06c1.54 0 2.5-1.67 1.73-3l-7.53-13.01c-.77-1.33-2.69-1.33-3.46 0L2.74 17.504c-.77 1.33.19 3 1.73 3z" />
      <path fill="#ffffff" d="M12 14a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 2 0V13a1 1 0 0 1-1 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );

  const syncPulseClass = `text-[10px] text-red-500 font-mono font-bold transition-opacity duration-1000 ease-in-out ${pulseHigh ? 'opacity-100' : 'opacity-40'}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      
      <div 
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-none transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="
        relative w-full max-w-md bg-[#e0e5ec] p-8 rounded-2xl 
        shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_rgba(255,255,255,0.5)]
        border border-white/50 
        transform transition-all animate-in zoom-in-95 duration-300
      ">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#e0e5ec] text-slate-500 flex items-center justify-center shadow-[3px_3px_6px_#bec3c9,-3px_-3px_6px_white] active:shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] transition-all active:scale-95 hover:text-blue-400 select-none"
        >
          ✕
        </button>

        <h3 className="text-2xl font-black text-slate-700 mb-1 select-none">TRIMITE UN EMAIL</h3>
        <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-widest select-none">// SECURE_CONNECTION</p>

        {status === 'SUCCESS' ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            
            {/* Mesaj Succes */}
            <div className="flex flex-col items-center text-green-600">
               <div className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_white] flex items-center justify-center text-3xl mb-2">
                 ✓
               </div>
               <p className="font-bold text-lg">Mesaj recepționat!</p>
            </div>

            {/* SEPARAREA VIZUALĂ */}
            <div className="w-full h-px bg-slate-300/50"></div>

            {/* CRONOMETRUL 3... 2... 1... */}
            <div className="flex flex-col items-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Se închide automat în</p>
                
                {/* AICI FOLOSIM 'key={countdown}' 
                    Asta forțează animația 'animate-countdown' să repornească la fiecare secundă.
                */}
                <div 
                    key={countdown} 
                    className="text-6xl font-black text-slate-700 animate-countdown drop-shadow-md select-none"
                >
                    {countdown}
                </div>
            </div>

          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="space-y-5" noValidate>
            
            {/* Input Nume */}
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase select-none">Nume</label>
                {errors.user_name && <span className={syncPulseClass}>{errors.user_name}</span>}
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  name="user_name"
                  value={formData.user_name}
                  className="select-none w-full bg-[#e0e5ec] border-none rounded-xl pl-4 pr-10 py-3 text-slate-700 font-medium outline-none shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] focus:shadow-[inset_4px_4px_8px_#b1b5b9,inset_-4px_-4px_8px_white] transition-all placeholder:text-slate-400"
                  placeholder="Nume"
                  onChange={handleInputChange}
                  onBlur={handleBlur} 
                />
                {errors.user_name && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><WarningIcon /></div>
                )}
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase select-none">Email</label>
                {errors.user_email && <span className={syncPulseClass}>{errors.user_email}</span>}
              </div>
              <div className="relative">
                <input 
                  type="email"
                  inputMode="email"
                  name="user_email" 
                  value={formData.user_email}
                  className="select-none w-full bg-[#e0e5ec] border-none rounded-xl pl-4 pr-10 py-3 text-slate-700 font-medium outline-none shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] focus:shadow-[inset_4px_4px_8px_#b1b5b9,inset_-4px_-4px_8px_white] transition-all placeholder:text-slate-400"
                  placeholder="contact@email.com"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {errors.user_email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><WarningIcon /></div>
                )}
              </div>
            </div>

            {/* Input Mesaj */}
            <div className="space-y-1">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 ml-1 uppercase select-none">Mesaj</label>
                {errors.message && <span className={syncPulseClass}>{errors.message}</span>}
              </div>
              <div className="relative">
                <textarea 
                  name="message" 
                  rows={4}
                  value={formData.message}
                  className="select-none w-full bg-[#e0e5ec] border-none rounded-xl pl-4 pr-10 py-3 text-slate-700 font-medium outline-none shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] focus:shadow-[inset_4px_4px_8px_#b1b5b9,inset_-4px_-4px_8px_white] transition-all resize-none placeholder:text-slate-400"
                  placeholder="Salut! Te contactez în legătură cu..."
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                />
                {errors.message && (
                  <div className="absolute right-3 top-3 pointer-events-none"><WarningIcon /></div>
                )}
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === 'SENDING'}
              className={`
                w-full py-4 rounded-xl font-bold text-white shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_white] 
                transition-all active:scale-[0.95] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)]
                flex justify-center items-center gap-2 select-none cursor-pointer
                ${status === 'SENDING' ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
              `}
            >
              {status === 'SENDING' ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  SE TRIMITE...
                </>
              ) : (
                'TRIMITE'
              )}
            </button>

            {status === 'ERROR' && (
              <p className="text-xs text-red-500 text-center font-bold bg-red-100 py-2 rounded-lg">
                Eroare de sistem. Încearcă pe mail direct.
              </p>
            )}

          </form>
        )}
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Variantele de animație
const modalVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring",
      damping: 25, 
      stiffness: 300 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 20,
    transition: { duration: 0.2 }
  }
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({ nume: "", email: "", mesaj: "" });
  const [pulseHigh, setPulseHigh] = useState(true);
  const [countdown, setCountdown] = useState(3);

  const pathname = usePathname();

  // Reset la schimbarea rutei
  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  // ---------------------------------------------------------
  // 1. LOGICA TA ORIGINALĂ DE SCROLL LOCK (RESTAURATĂ)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    // Setăm flag-ul în localStorage (din codul tău original)
    localStorage.setItem('modalOpen', 'true');
    window.dispatchEvent(new Event("storage"));

    const isMobile = window.innerWidth <= 767;
    
    // Logica critică pentru Mobile Safari / Scroll
    if (isMobile) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Fallback pentru desktop
      document.body.style.overflow = 'hidden';
    }
    

    // CLEANUP FUNCTION - Se execută DOAR când componenta dispare complet din DOM
    // (adică după ce se termină animația de Exit din Framer Motion)
    return () => {
      // Executăm cleanup doar dacă body a fost modificat
      const isBodyFixed = document.body.style.position === 'fixed';
      const savedScroll = Math.abs(parseInt(document.body.style.top || '0'));

      // Resetăm tot
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';

      // Dacă am fost pe mobil și aveam scroll salvat, sărim înapoi acolo
      if (isBodyFixed) {
        window.scrollTo({
          top: savedScroll,
          behavior: 'instant'
        });
      }

      if (!isOpen) {
        localStorage.setItem('modalOpen', 'false');
        window.dispatchEvent(new Event("storage"));
      }
    };
  }, [isOpen]);
  // Notă: Chiar dacă isOpen se schimbă în false, AnimatePresence ține componenta
  // montată până la finalul animației, deci cleanup-ul rulează la momentul perfect.

  // ---------------------------------------------------------
  // 2. LOGICA HASH CHANGE & LINK CLICK (RESTAURATĂ)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;

    const handleHashChange = () => {
        // Logica ta pentru hash change
        const isMobile = window.innerWidth <= 767;
        if (isMobile) {
            const savedScroll = Math.abs(parseInt(document.body.style.top || '0'));
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            // Dacă e nevoie să scrollezi la hash, browserul o va face natural după ce scoatem fixed
        }
        onClose();
    };

    const handleGlobalLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (target) {
        const href = target.getAttribute("href");
        if (href && (href.startsWith("#") || href.includes("/#"))) {
          setTimeout(() => onClose(), 10);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("click", handleGlobalLinkClick, true);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("click", handleGlobalLinkClick, true);
    };
  }, [isOpen, onClose]);


  // Resetare stare după închidere
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStatus("IDLE");
        setErrors({});
        setFormData({ nume: "", email: "", mesaj: "" });
        setCountdown(3);
      }, 500); // Un pic mai mult timp să fim siguri că animația e gata
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Pulse Error
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setPulseHigh((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "SUCCESS" && isOpen) {
      if (countdown > 0) timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      else onClose();
    }
    return () => clearTimeout(timer);
  }, [status, countdown, isOpen, onClose]);


  // --- RESTUL FUNCȚIILOR (FORM HANDLERS) RĂMÂN NESCHIMBATE ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "nume") finalValue = value.replace(/\b\w/g, (c) => c.toUpperCase());
    if (name === "mesaj") finalValue = value.charAt(0).toUpperCase() + value.slice(1);

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const getFieldError = (name: string, value: string) => {
    if (name === "nume" && (!value || value.trim().length < 2)) return "MINIM 2 CARACTERE";
    if (name === "email") {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
      if (!value || !regex.test(value)) return "FORMAT INVALID";
    }
    if (name === "mesaj" && (!value || value.trim().length < 10)) return "MINIM 10 CARACTERE";
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    ["nume", "email", "mesaj"].forEach((field) => {
      const error = getFieldError(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = getFieldError(name, value);
    setErrors((prev) => {
      const newErr = { ...prev };
      if (error) newErr[name] = error;
      else delete newErr[name];
      return newErr;
    });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("SENDING");
    const dataToSend = {
      access_key: "57970ddb-901c-4dca-aff4-b5ebceaf43ea",
      name: formData.nume,
      email: formData.email,
      message: formData.mesaj,
      subject: `Am primit un mesaj nou de la 👤 ${formData.nume}`,
      from_name: "🚀 Mesaj Portofoliu",
      botcheck: false
    };

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify(dataToSend),
        });
        const result = await response.json();
        if (result.success) setStatus("SUCCESS");
        else setStatus("ERROR");
    } catch (error) {
        setStatus("ERROR");
    }
  };

  const WarningIcon = ({ shake }: { shake?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-7 h-7 drop-shadow-sm ${shake ? "animate-shake" : ""}`}>
      <path fill="#ef4444" d="M4.47 20.504h15.06c1.54 0 2.5-1.67 1.73-3l-7.53-13.01c-.77-1.33-2.69-1.33-3.46 0L2.74 17.504c-.77 1.33.19 3 1.73 3z" />
      <path fill="#fff" d="M12 14a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 2 0V13a1 1 0 0 1-1 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );

  const inputClass = (hasError: boolean) =>
    `select-none w-full bg-[#e0e5ec] border-none rounded-xl pl-4 pr-10 py-3 text-slate-700 font-medium outline-none
     shadow-[inset_3px_3px_6px_#bec3c9] 
     focus:shadow-[inset_4px_4px_8px_#b1b5b9]
     transition-all placeholder:text-slate-400 
     ${hasError ? "animate-shake border-red-500" : ""}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 will-change-transform">
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-slate-900/20 bg-slate-900/20"
            onClick={onClose}
          />

          <motion.div
            key="modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-[#e0e5ec] p-8 rounded-2xl 
            shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_rgba(255,255,255,0.5)]
            border border-white/50 overflow-hidden"
          >
            <motion.button
              whileHover={{ scale: 1.1, color: "#60a5fa" }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#e0e5ec] 
                text-slate-500 flex items-center justify-center 
                shadow-[3px_3px_6px_#bec3c9] z-10 cursor-pointer"
            >
              ✕
            </motion.button>

            <h3 className="text-2xl font-black text-slate-700 mb-1 select-none">TRIMITE UN EMAIL</h3>
            <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-widest select-none">
              // SECURE_CONNECTION
            </p>

            <AnimatePresence mode="wait">
              {status === "SUCCESS" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-10 space-y-6"
                >
                  <div className="flex flex-col items-center text-green-600">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3c9] flex items-center justify-center text-3xl mb-2"
                    >
                      ✓
                    </motion.div>
                    <p className="font-bold text-lg">Mesaj trimis cu succes!</p>
                  </div>
                  <div className="w-full h-px bg-slate-300/50"></div>
                  <div className="flex flex-col items-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      Fereastra se închide automat în
                    </p>
                    <motion.div 
                      key={countdown}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-black text-slate-700"
                    >
                        {countdown}
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  ref={form}
                  onSubmit={sendEmail}
                  className="space-y-5"
                  noValidate
                >
                  {["nume", "email", "mesaj"].map((field) => (
                    <div key={field} className="space-y-1">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-500 ml-1 uppercase select-none">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {errors[field] && (
                          <span className={`text-[10px] text-red-500 font-mono font-bold transition-opacity duration-1000 ease-in-out ${pulseHigh ? "opacity-100" : "opacity-40"}`}>
                            {errors[field]}
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        {field !== "mesaj" ? (
                          <input
                            type={field === "email" ? "email" : "text"}
                            name={field}
                            value={formData[field as keyof typeof formData]}
                            className={inputClass(!!errors[field])}
                            placeholder={field === "email" ? "contact@email.com" : "Nume"}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                          />
                        ) : (
                          <textarea
                            name="mesaj"
                            rows={4}
                            value={formData.mesaj}
                            className={inputClass(!!errors.mesaj)}
                            placeholder="Salut! Te contactez în legătură cu..."
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            onFocus={handleFocus}
                          />
                        )}

                        {errors[field] && (
                          <div className="absolute right-3 top-3 pointer-events-none">
                            <WarningIcon shake />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  <motion.button
                    type="submit"
                    disabled={status === "SENDING"}
                    whileHover={status !== "SENDING" ? { scale: 1.02 } : {}}
                    whileTap={status !== "SENDING" ? { scale: 0.98 } : {}}
                    className={`
                      mobile-submit-gradient
                      w-full py-4 rounded-xl font-bold select-none text-white cursor-pointer
                      shadow-[6px_6px_12px_#bec3c9]
                      transition-colors flex justify-center items-center gap-2
                      ${status === "SENDING" ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600"}
                    `}
                  >
                    {status === "SENDING" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        SE TRIMITE...
                      </>
                    ) : (
                      "TRIMITE"
                    )}
                  </motion.button>

                  {status === "ERROR" && (
                    <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-red-500 text-center font-bold bg-red-100 py-2 rounded-lg"
                    >
                      Eroare de sistem. Încearcă pe mail direct.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <style jsx>{`
            @keyframes shake {
              0% { transform: translateX(0); }
              20% { transform: translateX(-4px); }
              40% { transform: translateX(4px); }
              60% { transform: translateX(-4px); }
              80% { transform: translateX(4px); }
              100% { transform: translateX(0); }
            }
            .animate-shake {
              animation: shake 0.3s ease-in-out;
            }
            @media (max-width: 767px) {
              .mobile-submit-gradient {
                background-image: linear-gradient(45deg, #1d4ed8 0%, #2563eb 51%, #1d4ed8 100%) !important;
                background-size: 200% auto !important;
                background-color: transparent !important;
                color: white !important;
                border: none !important;
                box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
              }
            }
          `}</style>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({ numele: "", email: "", mesajul: "" });
  const [pulseHigh, setPulseHigh] = useState(true);
  const [countdown, setCountdown] = useState(3);

  // --- Stări pentru animații ---
  const [showModal, setShowModal] = useState(false); 
  const [isMounted, setIsMounted] = useState(false); 

  // --- State-uri pentru animatii delay ---
  const [emailBtnClicked, setEmailBtnClicked] = useState(false);
  const [closeBtnClicked, setCloseBtnClicked] = useState(false);

  useEffect(() => {
    let domTimer: NodeJS.Timeout;
    let animationFrame: number;

    if (isOpen) {
      setShowModal(true);
      animationFrame = requestAnimationFrame(() => setIsMounted(true));
      document.body.classList.add('modal-open-neumorphism');
    } else {
      setIsMounted(false);
      domTimer = setTimeout(() => {
        setShowModal(false);
        setStatus("IDLE");
        setErrors({});
        setFormData({ numele: "", email: "", mesajul: "" });
        setCountdown(3);
      }, 300);
      document.body.classList.remove('modal-open-neumorphism');
    }

    return () => {
      clearTimeout(domTimer);
      cancelAnimationFrame(animationFrame);
      document.body.classList.remove('modal-open-neumorphism');
    };
  }, [isOpen]);

  // ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Puls pentru erori
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => setPulseHigh((prev) => !prev), 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Cronometru SUCCESS
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "SUCCESS" && isOpen) {
      if (countdown > 0) timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      else onClose();
    }
    return () => clearTimeout(timer);
  }, [status, countdown, isOpen, onClose]);

  if (!showModal) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let finalValue = value;
    if (name === "numele") finalValue = value.replace(/\b\w/g, (c) => c.toUpperCase());
    if (name === "mesajul") finalValue = value.charAt(0).toUpperCase() + value.slice(1);
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
    if (name === "numele" && (!value || value.trim().length < 2)) return "MINIM 2 CARACTERE";
    if (name === "email") {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
      if (!value || !regex.test(value)) return "FORMAT INVALID";
    }
    if (name === "mesajul" && (!value || value.trim().length < 10)) return "MINIM 10 CARACTERE";
    return "";
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    ["numele", "email", "mesajul"].forEach((field) => {
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

  // 🌟 Fix iOS / Android input focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setStatus("SENDING");
    
    if (!form.current) return;

    const formDataObj = new FormData(form.current);
    formDataObj.append("_subject", `🚀 Mesaj nou de la 👤 ${formData.numele}`);
    formDataObj.append("_captcha", "false");
    formDataObj.append("_template", "box");

    const myEmail = "manoledaniel2004@gmail.com";

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${myEmail}`, {
        method: "POST",
        body: formDataObj,
        headers: { Accept: "application/json" },
      });
      if (response.ok) setStatus("SUCCESS");
      else setStatus("ERROR");
    } catch {
      setStatus("ERROR");
    }
  };

  const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7 drop-shadow-sm">
      <path fill="#ef4444" d="M4.47 20.504h15.06c1.54 0 2.5-1.67 1.73-3l-7.53-13.01c-.77-1.33-2.69-1.33-3.46 0L2.74 17.504c-.77 1.33.19 3 1.73 3z" />
      <path fill="#fff" d="M12 14a1 1 0 0 1-1-1v-2.5a1 1 0 0 1 2 0V13a1 1 0 0 1-1 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </svg>
  );

  const syncPulseClass = `text-[10px] text-red-500 font-mono font-bold transition-opacity duration-1000 ease-in-out ${
    pulseHigh ? "opacity-100" : "opacity-40"
  }`;

  const inputClass = (hasError: boolean) =>
    `select-none w-full bg-[#e0e5ec] border-none rounded-xl pl-4 pr-10 py-3 text-slate-700 font-medium outline-none 
     shadow-[inset_3px_3px_6px_#bec3c9,inset_-3px_-3px_6px_white] focus:shadow-[inset_4px_4px_8px_#b1b5b9,inset_-4px_-4px_8px_white] transition-all placeholder:text-slate-400 ${
      hasError ? "animate-shake border-red-500" : ""
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div
        className={`absolute inset-0 bg-slate-900/20 transition-opacity duration-300 ${isMounted ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md bg-[#e0e5ec] p-8 rounded-2xl shadow-[20px_20px_60px_#bec3c9,-20px_-20px_60px_rgba(255,255,255,0.5)] border border-white/50 transform transition-all duration-300 ${
          isMounted ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <button
          onClick={() => {
            setCloseBtnClicked(true);
            setTimeout(() => {
              setCloseBtnClicked(false);
              onClose();
            }, 150);
          }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full bg-[#e0e5ec] select-none text-slate-500 flex items-center justify-center shadow-[3px_3px_6px_#bec3c9,-3px_-3px_6px_white] transition-all
            ${closeBtnClicked ? "scale-[0.95]" : "scale-100"} 
            active:scale-95 hover:text-blue-400`}
        >
          ✕
        </button>

        <h3 className="text-2xl font-black text-slate-700 mb-1 select-none">TRIMITE UN EMAIL</h3>
        <p className="text-xs font-mono text-slate-400 mb-6 uppercase tracking-widest select-none">// SECURE_CONNECTION</p>

        {status === "SUCCESS" ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-center text-green-600">
              <div className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[inset_4px_4px_8px_#bec3c9,inset_-4px_-4px_8px_white] flex items-center justify-center text-3xl mb-2">✓</div>
              <p className="font-bold text-lg">Mesaj trimis cu succes!</p>
            </div>
            <div className="w-full h-px bg-slate-300/50"></div>
            <div className="flex flex-col items-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Fereastra se închide automat în</p>
              <div className="text-6xl font-black text-slate-700">{countdown}</div>
            </div>
          </div>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="space-y-5" noValidate>
            {["numele", "email", "mesajul"].map((field) => (
              <div key={field} className="space-y-1">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-slate-500 ml-1 uppercase select-none">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {errors[field] && <span className={syncPulseClass}>{errors[field]}</span>}
                </div>
                <div className="relative">
                  {field !== "mesajul" ? (
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
                      name="mesajul"
                      rows={4}
                      value={formData.mesajul}
                      className={inputClass(!!errors.mesajul)}
                      placeholder="Salut! Te contactez în legătură cu..."
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      onFocus={handleFocus}
                    />
                  )}
                  {errors[field] && (
                    <div className="absolute right-3 top-3 pointer-events-none"><WarningIcon /></div>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={status === "SENDING"}
              onClick={(e) => {
                e.preventDefault();
                setEmailBtnClicked(true);
                setTimeout(() => {
                  setEmailBtnClicked(false);
                  sendEmail(e as unknown as React.FormEvent);
                }, 150);
              }}
              className={`w-full py-4 rounded-xl font-bold select-none text-white cursor-pointer shadow-[6px_6px_12px_#bec3c9,-6px_-6px_12px_white] transition-all active:scale-[0.95] active:shadow-[inset_3px_3px_6px_rgba(0,0,0,0.2)] flex justify-center items-center gap-2 ${
                status === "SENDING" ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } ${emailBtnClicked ? "scale-[0.95]" : "scale-100"}`}
            >
              {status === "SENDING" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  SE TRIMITE...
                </>
              ) : (
                "TRIMITE"
              )}
            </button>

            {status === "ERROR" && (
              <p className="text-xs text-red-500 text-center font-bold bg-red-100 py-2 rounded-lg">Eroare de sistem. Încearcă pe mail direct.</p>
            )}
          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
          100% { transform: translateX(0); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}


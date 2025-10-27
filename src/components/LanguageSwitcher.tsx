// File: src/components/LanguageSwitcher.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/components/LanguageProvider";

type LangItem = { code: "tr" | "es" | "ar" | "de" | "en" | "fr"; label: string; flag?: string };

const LANGS: LangItem[] = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ar", label: "العربية", flag: "🇦🇪" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white/90 px-3 py-2 text-sm shadow-sm hover:bg-white"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="text-base">{current.flag}</span>
        <span className="font-medium">{current.label}</span>
        <svg width="14" height="14" viewBox="0 0 20 20" className="opacity-70">
          <path d="M5 7l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-neutral-200 bg-white p-1 shadow-2xl ring-1 ring-black/5 z-50"
            role="menu"
          >
            {LANGS.map((item) => (
              <button
                key={item.code}
                onClick={() => {
                  setLang(item.code as any);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-neutral-100 ${
                  lang === item.code ? "bg-neutral-100 font-semibold" : ""
                }`}
                role="menuitem"
              >
                <span className="text-base">{item.flag}</span>
                <span dir={item.code === "ar" ? "rtl" : "ltr"} className="truncate">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

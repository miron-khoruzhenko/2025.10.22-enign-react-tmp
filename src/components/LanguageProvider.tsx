// File: src/components/LanguageProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { messages, type Lang } from "@/lib/i18n";

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: (k: string) => string;
  setLang: (l: Lang) => void;
};

const LangCtx = createContext<Ctx | null>(null);
const COOKIE = "svd_lang";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}
function setCookie(name: string, value: string, days = 365) {
  if (typeof document === "undefined") return;
  const exp = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/; SameSite=Lax`;
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  // Инициализация: cookie → navigator → "tr"
  useEffect(() => {
    const saved = getCookie(COOKIE) as Lang | null;
    if (saved && ["tr", "es", "ar", "de", "en", "fr"].includes(saved)) {
      setLangState(saved);
    } else {
      const nav =
        ((typeof navigator !== "undefined" && navigator.language) || "tr")
          .slice(0, 2)
          .toLowerCase();
      if (["tr", "es", "ar", "de", "en", "fr"].includes(nav)) {
        setLangState(nav as Lang);
      }
    }
  }, []);

  // Выставляем lang/dir на <html>
  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", dir);
    }
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    setCookie(COOKIE, l);
  };

  const dict = messages[lang];
  const t = (k: string) => dict[k] ?? k;

  const value = useMemo<Ctx>(() => ({ lang, dir, t, setLang }), [lang, dir]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}

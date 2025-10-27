// File: app/QRVerifyDemo.tsx
// Ecuador theme (TR) + sessionStorage persistence for activations

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VerifyForm from "@/components/VerifyForm";
import ResultCard from "@/components/ResultCard";
import ActivateModal from "@/components/ActivateModal";
import EcuadorFlag from "@/components/EcuadorFlag";
import {
  SAMPLE_CODES,
  VerifyResult,
  PRESET_ACTIVATION_META,
  ActivationMeta,
  CodeStatus,
} from "@/lib/data";

// ---- sessionStorage keys ----
const SKEY_META = "svd_activationMeta";
const SKEY_OVERRIDES = "svd_statusOverrides";

// Тип для переопределений статуса в сессии
type StatusOverride = { status: CodeStatus; note?: string };
type StatusOverridesMap = Record<string, StatusOverride>;

// Утилиты для sessionStorage
function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function saveJSON<T>(key: string, value: T) {
  try {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch {
    // ignore quota errors
  }
}

export default function QRVerifyDemo() {
  const [serial, setSerial] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState<VerifyResult>(null);

  // Aktivasyon sahibi meta (demo) — лениво гидратируем из sessionStorage
  const [activationMeta, setActivationMeta] = useState<Record<string, ActivationMeta>>(() =>
    ({ ...PRESET_ACTIVATION_META, ...loadJSON<Record<string, ActivationMeta>>(SKEY_META, {}) })
  );

  // Переопределения статусов (активации) по кодам — тоже из сессии
  const [statusOverrides, setStatusOverrides] = useState<StatusOverridesMap>(() =>
    loadJSON<StatusOverridesMap>(SKEY_OVERRIDES, {})
  );

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false);

  // Success-only davranışı
  const [successMsg, setSuccessMsg] = useState("");
  const [activatedNow, setActivatedNow] = useState(false);

  const normalized = useMemo(() => serial.trim().toUpperCase(), [serial]);

  // Сохраняем изменения в сессию
  useEffect(() => {
    saveJSON(SKEY_META, activationMeta);
  }, [activationMeta]);
  useEffect(() => {
    saveJSON(SKEY_OVERRIDES, statusOverrides);
  }, [statusOverrides]);

  function handleSubmitVerify() {
    setSuccessMsg("");
    setActivatedNow(false);

    // 1) базовая запись из демо-списка
    const base = SAMPLE_CODES[normalized];

    // 2) применяем переопределение из сессии (если есть)
    const override = statusOverrides[normalized];
    const info = base
      ? (override ? { ...base, ...override } : base)
      : (override
          // если вдруг кода нет в SAMPLE_CODES, но он есть в overrides (маловероятно для демо),
          // соберём минимальную карточку
          ? { status: override.status, product: "Bilinmeyen Ürün", category: "—", note: override.note }
          : undefined);

    setResult({ code: normalized, info });
  }

  function handleOpenModal() {
    setFirstName("");
    setLastName("");
    setPhone("");
    setAgreePolicy(false);
    setConfirmAccuracy(false);
    setFormError("");
    setConfirmStep(false);
    setModalOpen(true);
  }

  function validatePhone(p: string) {
    return /^\+?[0-9\s-]{10,14}$/.test(p);
  }

  function handleSubmitFormStep() {
    if (!confirmStep) {
      if (!firstName || !lastName || !phone) {
        setFormError("Lütfen ad, soyad ve telefon alanlarını doldurun");
        return;
      }
      if (!validatePhone(phone)) {
        setFormError("Telefon formatı geçersiz");
        return;
      }
      if (!agreePolicy || !confirmAccuracy) {
        setFormError("Lütfen gerekli onay kutucuklarını işaretleyin");
        return;
      }
      setFormError("");
      setConfirmStep(true);
    } else {
      setConfirmStep(false);
    }
  }

  async function handleConfirmActivate() {
    if (!result?.info || !result.code) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const dateStr = new Date().toLocaleDateString("tr-TR");
    const noteText = `${dateStr} tarihinde etkinleştirildi`;

    // Обновляем состояние результата (для текущей сессии рендера)
    const updated = { ...result.info!, status: "ACTIVATED" as const, note: noteText };
    setResult({ ...result, info: updated });

    // 1) Сохраняем метаданные владельца (в сессии)
    setActivationMeta((prev) => {
      const next = { ...prev, [result.code!]: { firstName, lastName, phone } };
      // сохранится useEffect'ом
      return next;
    });

    // 2) Сохраняем переопределение статуса (в сессии)
    setStatusOverrides((prev) => {
      const next = { ...prev, [result.code!]: { status: "ACTIVATED", note: noteText } };
      // сохранится useEffect'ом
      return next;
    });

    setSubmitting(false);
    setModalOpen(false);

    // Sadece başarı + ekranı temizle
    setActivatedNow(true);
    setSuccessMsg("Ürün başarıyla etkinleştirildi!");
    setSerial("");
    setCategory("");
    setResult(null);

    setTimeout(() => {
      setSuccessMsg("");
      setActivatedNow(false);
    }, 4000);
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Ecuador renkli arka plan */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 blur-sm"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), linear-gradient(160deg, #FFD100 0%, #FFD100 45%, #0055A4 45%, #0055A4 72%, #EF3340 72%, #EF3340 100%)",
        }}
      />
      {/* Yumuşak doku */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.25) 0 8%, transparent 9%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.15) 0 10%, transparent 11%)",
        }}
      />

      <div className="max-w-2xl mx-auto rounded-b-2xl ring-black/10 min-h-screen flex flex-col gap-6 justify-between px-4 py-4">
        {/* Header */}
        <header className="px-6 py-6 md:py-8 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-black/10">
          <div className="mx-auto max-w-6xl flex items-center justify-between text-neutral-900">
            <div className="flex items-center gap-3">
              <EcuadorFlag className="h-6 w-9 rounded-sm shadow-md" />
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight">
                  Ekvador Savunma Doğrulama Portalı
                </h1>
                <p className="text-sm md:text-base opacity-80">
                  Güvenli ürün, güvenli sistem • Ekvador
                </p>
              </div>
            </div>
            <div className="hidden md:block text-sm opacity-70">
              Ekvador için balistik ekipman doğrulama demosu
            </div>
          </div>
        </header>

        {/* Content panel (narrow) */}
        <main className="">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mx-auto w-full max-w-2xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-black/10 p-6 md:p-8"
            >
              <div className="mb-6">
                <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">
                  Ürün Doğrulama (Ekvador)
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  Seri numarasını girin ve kategori seçin. Örnek seri: <code>TR-BAL-001</code>
                </p>
              </div>

              {/* Success banner */}
              <AnimatePresence>
                {successMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mb-4 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
                  >
                    {successMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <VerifyForm
                serial={serial}
                category={category}
                onChangeSerial={setSerial}
                onChangeCategory={setCategory}
                onSubmit={handleSubmitVerify}
              />

              <div className="mt-6 min-h-[180px]">
                <ResultCard
                  result={result}
                  category={category}
                  activatedNow={activatedNow}
                  onClickActivate={handleOpenModal}
                  activationMeta={activationMeta}
                />
              </div>
            </motion.div>
          </div>
        </main>

        <ActivateModal
          open={isModalOpen}
          code={result?.code}
          product={result?.info?.product}
          productCategory={result?.info?.category}
          confirmStep={confirmStep}
          firstName={firstName}
          lastName={lastName}
          phone={phone}
          agreePolicy={agreePolicy}
          confirmAccuracy={confirmAccuracy}
          error={formError}
          submitting={submitting}
          onChangeFirst={setFirstName}
          onChangeLast={setLastName}
          onChangePhone={setPhone}
          onToggleAgreePolicy={setAgreePolicy}
          onToggleConfirmAccuracy={setConfirmAccuracy}
          onClose={() => !submitting && setModalOpen(false)}
          onSubmitForm={handleSubmitFormStep}
          onConfirmActivate={handleConfirmActivate}
        />

        <div className="py-6 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-black/10">
          {/* KVKK (Ekvador temalı not) */}
          <footer className="px-6">
            <div className="mx-auto max-w-6xl text-[11px] leading-snug text-neutral-900/80">
              KVKK: Bu demo arayüzde girilen kişisel veriler sadece gösterim amaçlıdır. Gerçek sistemde verileriniz; Ekvador’da
              sunulan ürünlerin doğrulama güvenliği, sahtecilik önleme ve destek süreçleri için ilgili mevzuata uygun şekilde işlenir ve saklanır.
            </div>

            <div className="text-center text-xs text-neutral-800 mt-6">
              © {new Date().getFullYear()} Ekvador Savunma Doğrulama Portalı • “Güvenli ürün, güvenli sistem”
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

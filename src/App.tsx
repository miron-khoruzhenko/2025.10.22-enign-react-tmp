// File: app/QRVerifyDemo.tsx
// Composed page using split components (DRY)

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VerifyForm from "@/components/VerifyForm";
import ResultCard from "@/components/ResultCard";
import ActivateModal from "@/components/ActivateModal";
import {
  SAMPLE_CODES,
  VerifyResult,
  PRESET_ACTIVATION_META,
  ActivationMeta,
} from "@/lib/data";

export default function QRVerifyDemo() {
  const [serial, setSerial] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState<VerifyResult>(null);

  // Activation meta (демо-хранилище)
  const [activationMeta, setActivationMeta] = useState<Record<string, ActivationMeta>>(
    PRESET_ACTIVATION_META
  );

  // Activation modal state
  const [isModalOpen, setModalOpen] = useState(false);

  // Form fields (modal)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);

  // Modal UI state
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [confirmStep, setConfirmStep] = useState(false); // false: form, true: confirmation

  // Success toast and flag to suppress the "already activated" warning if activation just happened now
  const [successMsg, setSuccessMsg] = useState("");
  const [activatedNow, setActivatedNow] = useState(false);

  const normalized = useMemo(() => serial.trim().toUpperCase(), [serial]);

  function handleSubmitVerify() {
    setSuccessMsg("");
    setActivatedNow(false);
    const info = SAMPLE_CODES[normalized];
    setResult({ code: normalized, info });
  }

  function handleOpenModal() {
    // reset modal fields on open
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

  // Step 1 → Step 2 (validate), or Step 2 → Step 1 (edit)
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
      setConfirmStep(false); // back to edit
    }
  }

  // Final confirm: activate and clean screen
  async function handleConfirmActivate() {
    if (!result?.info || !result.code) return;
    setSubmitting(true);

    // Simulate request
    await new Promise((r) => setTimeout(r, 600));

    const dateStr = new Date().toLocaleDateString("tr-TR");
    const updated = {
      ...result.info!,
      status: "ACTIVATED" as const,
      note: `${dateStr} tarihinde etkinleştirildi`,
    };
    // обновляем статус кода
    setResult({ ...result, info: updated });

    // сохраняем метаданные владельца (для экрана проверки в будущем)
    setActivationMeta((prev) => ({
      ...prev,
      [result.code!]: { firstName, lastName, phone },
    }));

    setSubmitting(false);
    setModalOpen(false);

    // Show only success + clear form/result so «already activated» won't appear
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
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(135deg, #2f3b22 0%, #222b1a 35%, #1c2416 70%, #12170e 100%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 10px, rgba(0,0,0,0) 10px 20px)",
        }}
      />

      {/* Header */}
      <header className="px-6 py-6 md:py-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-[#e8e8e8]">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl" role="img" aria-label="military">
              🪖
            </span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Savunma Doğrulama Portalı</h1>
              <p className="text-sm md:text-base opacity-80">Güvenli ürün, güvenli sistem</p>
            </div>
          </div>
          <div className="hidden md:block text-sm opacity-70">Balistik ekipman doğrulama demosu</div>
        </div>
      </header>

      {/* Content panel (narrow) */}
      <main className="px-4 pb-14">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto w-full max-w-2xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-black/10 p-6 md:p-8"
          >
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">Ürün Doğrulama</h2>
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
                  className="mb-4 rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800"
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
                activationMeta={activationMeta} // ← передаём метаданные владельца
              />
            </div>
          </motion.div>

          <div className="text-center text-xs text-neutral-300 mt-6">
            © {new Date().getFullYear()} Savunma Doğrulama Portalı • "Güvenli ürün, güvenli sistem"
          </div>
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

      {/* Footer KVKK */}
      <footer className="px-6 pb-8">
        <div className="mx-auto max-w-6xl text-[11px] leading-snug text-neutral-300">
          KVKK: Bu demo arayüzde girilen kişisel veriler sadece gösterim amaçlıdır. Gerçek sistemде verileriniz; doğrulama güvenliği, sahtecilik önleme ve destek süreçleri için ilgili mevzuata uygun şekilde işlenir ve saklanır.
        </div>
      </footer>
    </div>
  );
}

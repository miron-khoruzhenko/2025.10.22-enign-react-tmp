// File: components/ActivateModal.tsx — personal info + KVKK + checkboxes + confirmation step
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ActivateModalProps = {
  open: boolean;
  // current code info for summary step
  code?: string;
  product?: string;
  productCategory?: string;

  // step control
  confirmStep: boolean; // false: form, true: confirmation

  // form fields
  firstName: string;
  lastName: string;
  phone: string;
  agreePolicy: boolean;
  confirmAccuracy: boolean;

  error: string;
  submitting: boolean;

  onChangeFirst: (v: string) => void;
  onChangeLast: (v: string) => void;
  onChangePhone: (v: string) => void;
  onToggleAgreePolicy: (v: boolean) => void;
  onToggleConfirmAccuracy: (v: boolean) => void;

  onClose: () => void;
  onSubmitForm: () => void; // advance to confirm OR back to edit
  onConfirmActivate: () => void; // final confirm
};

export default function ActivateModal({ open, code, product, productCategory, confirmStep, firstName, lastName, phone, agreePolicy, confirmAccuracy, error, submitting, onChangeFirst, onChangeLast, onChangePhone, onToggleAgreePolicy, onToggleConfirmAccuracy, onClose, onSubmitForm, onConfirmActivate }: ActivateModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 grid place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="absolute inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-4 rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-black/10"
            role="dialog"
            aria-modal
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Aktivasyon Bilgileri</h3>
                <p className="text-sm text-neutral-600 mt-1">Daha güvenli doğrulama için bilgilerinizi girin.</p>
              </div>
              <button onClick={onClose} className="text-neutral-500 hover:text-neutral-800">✕</button>
            </div>

            {/* Slider container */}
            <div className="mt-4 overflow-hidden p-2">
              <motion.div
                className="flex w-[200%]"
                animate={{ x: confirmStep ? "-50%" : "0%" }}
                transition={{ type: "spring", stiffness: 240, damping: 28 }}
              >
                {/* STEP 1: Form (slide 1) */}
                <form
                  onSubmit={(e) => { e.preventDefault(); onSubmitForm(); }}
                  className="w-1/2 pr-3 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      value={firstName}
                      onChange={(e) => onChangeFirst(e.target.value)}
                      placeholder="Ad"
                      className="rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
                    />
                    <input
                      value={lastName}
                      onChange={(e) => onChangeLast(e.target.value)}
                      placeholder="Soyad"
                      className="rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
                    />
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => onChangePhone(e.target.value)}
                    placeholder="Telefon (örn: +90 555 555 55 55)"
                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
                  />

                  <label className="flex items-start gap-3 text-sm text-neutral-700">
                    <input type="checkbox" checked={agreePolicy} onChange={(e) => onToggleAgreePolicy(e.target.checked)} className="mt-1" />
                    <span>
                      Politikayı okudum ve kabul ediyorum.
                      <span className="block text-[11px] text-neutral-500">KVKK Aydınlatma Metni kapsamında bilgilerimin işlenmesini onaylıyorum.</span>
                    </span>
                  </label>

                  <label className="flex items-start gap-3 text-sm text-neutral-700">
                    <input type="checkbox" checked={confirmAccuracy} onChange={(e) => onToggleConfirmAccuracy(e.target.checked)} className="mt-1" />
                    <span>Bilgilerimin doğru olduğunu beyan ederim.</span>
                  </label>

                  {error && (
                    <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{error}</div>
                  )}

                  <p className="text-[11px] leading-snug text-neutral-500">
                    KVKK Aydınlatma Metni: Sağladığınız ad, soyad ve telefon bilgileri; ürün doğrulama güvenliğini arttırmak, sahtecilik tespitini geliştirmek ve destek süreçlerinde sizinle iletişime geçmek amacıyla işlenecektir. Bilgileriniz üçüncü kişilerle paylaşılmaz ve ilgili mevzuat kapsamında saklanır.
                  </p>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50" disabled={submitting}>
                      İptal
                    </button>
                    <button type="submit" className="rounded-lg bg-[#495e2a] text-white px-4 py-2 hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60" disabled={submitting}>
                      Devam et
                    </button>
                  </div>
                </form>

                {/* STEP 2: Confirmation (slide 2) */}
                <div className="w-1/2 pl-3">
                  <div className="border-t pt-2" />
                  <h4 className="text-sm font-semibold text-neutral-900 mb-2">Özet ve Onay</h4>
                  <ul className="text-sm text-neutral-700 space-y-1">
                    {code && (
                      <li>
                        <span className="text-neutral-500">Kod:</span> <span className="font-mono">{code}</span>
                      </li>
                    )}
                    {product && (
                      <li>
                        <span className="text-neutral-500">Ürün:</span> {product}
                      </li>
                    )}
                    {productCategory && (
                      <li>
                        <span className="text-neutral-500">Kategori:</span> {productCategory}
                      </li>
                    )}
                    <li>
                      <span className="text-neutral-500">Ad Soyad:</span> {firstName} {lastName}
                    </li>
                    <li>
                      <span className="text-neutral-500">Telefon:</span> {phone}
                    </li>
                  </ul>
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button type="button" onClick={onSubmitForm} className="rounded-lg px-3 py-2 border text-sm">Düzenle</button>
                    <button type="button" onClick={onConfirmActivate} className="rounded-lg bg-[#495e2a] text-white px-4 py-2 text-sm hover:brightness-110 active:scale-[0.99] transition" disabled={submitting}>
                      {submitting ? "Onaylanıyor…" : "Aktivasyonu Onayla"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// File: app/QRVerifyDemo.tsx
// React demo: Military industry theme (TR), dropdown category check,
// outer container (narrow) + modal for activation (PIN girişi) + uyarılar.
// Tech: React + Tailwind + Framer Motion.

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------------------------------------
// Veri modeli
// ---------------------------------------------------------------------

type CodeStatus = "UNUSED" | "ACTIVATED" | "BLOCKED";

type CodeInfo = {
  status: CodeStatus;
  product: string;
  category: string; // Doğrulama için ek alan
  pin?: string;     // Demo amaçlı: gerçek hayatta hash olur
  note?: string;
};

// Örnek veri kümesi (gerçekte backend'den gelir) — daha fazla örnek eklendi
const SAMPLE_CODES: Record<string, CodeInfo> = {
  // UNUSED
  "TR-BAL-001": { status: "UNUSED", product: "Balistik Yelek M12", category: "Balistik yelek", pin: "M12PIN" },
  "TR-PLK-002": { status: "UNUSED", product: "Seramik Plaka S2", category: "Seramik plaka", pin: "S2PIN" },
  "TR-KSK-003": { status: "UNUSED", product: "Balistik Kask K3", category: "Balistik kask", pin: "K3PIN" },
  "TR-BOT-004": { status: "UNUSED", product: "Taktik Bot T4", category: "Taktik bot", pin: "T4PIN" },
  "TR-PTC-005": { status: "UNUSED", product: "Plaka Taşıyıcı P5", category: "Plaka taşıyıcı", pin: "P5PIN" },

  // ACTIVATED
  "TR-PLK-777": { status: "ACTIVATED", product: "Seramik Plaka S4", category: "Seramik plaka", note: "10.10.2025 tarihinde etkinleştirildi", pin: "S4PIN" },
  "TR-KSK-778": { status: "ACTIVATED", product: "Balistik Kask K7", category: "Balistik kask", note: "05.09.2025 tarihinde etkinleştirildi", pin: "K7PIN" },

  // BLOCKED
  "TR-BOT-404": { status: "BLOCKED", product: "Taktik Bot T9", category: "Taktik bot", note: "Tedarikçi tarafından engellendi", pin: "T9PIN" },
  "TR-BAL-999": { status: "BLOCKED", product: "Balistik Yelek M99", category: "Balistik yelek", note: "Seri iptal edildi", pin: "M99PIN" },
};

const CATEGORIES = [
  "Balistik yelek",
  "Seramik plaka",
  "Balistik kask",
  "Taktik bot",
  "Plaka taşıyıcı",
];

const statusMeta: Record<CodeStatus, { label: string; desc: string }> = {
  UNUSED: {
    label: "Orijinal: etkinleştirilmedi",
    desc: "Kod bulundu. Satın alımda etkinleştirilebilir.",
  },
  ACTIVATED: {
    label: "Kod zaten etkinleştirildi",
    desc: "Bu ürün daha önce doğrulandı.",
  },
  BLOCKED: {
    label: "Kod engellendi",
    desc: "Lütfen satıcı veya destek ile iletişime geçin.",
  },
};

export default function QRVerifyDemo() {
  const [serialInput, setSerialInput] = useState("");
  const [category, setCategory] = useState("");
  // Artık categoryOk'u state'te tutmuyoruz; ekrandan dinamik hesaplayacağız (gecikme/yanlış uyarı sorununu çözer)
  const [checked, setChecked] = useState<null | { code: string; info?: CodeInfo }>(null);

  // Modal state
  const [isModalOpen, setModalOpen] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  // Başarı bildirimi (aktivasyon sonrası) ve "şimdi etkinleştirildi" bayrağı
  const [successMsg, setSuccessMsg] = useState("");
  const [activatedNow, setActivatedNow] = useState(false);

  const normalized = useMemo(() => serialInput.trim().toUpperCase(), [serialInput]);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    // Yeni sorguda önce tüm geçici mesajları temizle
    setSuccessMsg("");
    setActivatedNow(false);

    const info = SAMPLE_CODES[normalized];
    setChecked({ code: normalized, info });
  }

  function openActivationModal() {
    setPinInput("");
    setPinError("");
    setModalOpen(true);
  }

  function closeActivationModal() {
    if (isSubmitting) return;
    setModalOpen(false);
    setPinInput("");
    setPinError("");
  }

  async function submitActivation(e: React.FormEvent) {
    e.preventDefault();
    if (!checked?.info) return;

    setSubmitting(true);
    setPinError("");

    // Demo gecikme
    await new Promise((r) => setTimeout(r, 600));

    const expectedPin = checked.info.pin || "";
    if (!pinInput) {
      setPinError("PIN gerekli");
      setSubmitting(false);
      return;
    }
    if (pinInput !== expectedPin) {
      setPinError("PIN doğrulanamadı");
      setSubmitting(false);
      return;
    }

    // Başarılı demo: statüyü etkinleştirildi yapıyoruz
    const now = new Date();
    const dateStr = now.toLocaleDateString("tr-TR");

    const updated: CodeInfo = {
      ...checked.info,
      status: "ACTIVATED",
      note: `${dateStr} tarihinde etkinleştirildi`,
    };

    setChecked({ ...checked, info: updated });
    setSubmitting(false);
    setModalOpen(false);

    // İSTENEN DAVRANIŞ: sadece başarı mesajı göster, diğer uyarıları temizle/sustur
    setActivatedNow(true);
    setSuccessMsg("Ürün başarıyla etkinleştirildi!");
    // 4 sn sonra başarı mesajını kaldır ve bayrağı sıfırla
    setTimeout(() => {
      setSuccessMsg("");
      setActivatedNow(false);
    }, 4000);
  }

  function badgeColor(status: CodeStatus) {
    switch (status) {
      case "UNUSED":
        return "bg-green-100 text-green-800 ring-green-300";
      case "ACTIVATED":
        return "bg-yellow-100 text-yellow-900 ring-yellow-300";
      case "BLOCKED":
        return "bg-red-100 text-red-800 ring-red-300";
    }
  }

  // Dinamik kategori doğrulaması — ekranda hep güncel hesaplanır (gecikme yok)
  const info = checked?.info;
  const hasInfo = !!info;
  const hasCategory = !!category;
  const categoryOk = hasInfo ? (hasCategory ? info!.category === category : false) : undefined;
  let categoryWarning = "";
  if (hasInfo) {
    if (!hasCategory) categoryWarning = "Lütfen kategori seçin";
    else if (!categoryOk) categoryWarning = `Seçilen kategori bu kod ile uyuşmuyor. Beklenen: ${info!.category}`;
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Arka plan: askeri tonlarda desen/gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #2f3b22 0%, #222b1a 35%, #1c2416 70%, #12170e 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 10px, rgba(0,0,0,0) 10px 20px)",
        }}
      />

      {/* Üst şerit (tema) */}
      <header className="px-6 py-6 md:py-8">
        <div className="mx-auto max-w-6xl flex items-center justify-between text-[#e8e8e8]">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl" role="img" aria-label="military">🪖</span>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Savunma Doğrulama Portalı</h1>
              <p className="text-sm md:text-base opacity-80">Güvenli ürün, güvenli sistem</p>
            </div>
          </div>
          <div className="hidden md:block text-sm opacity-70">Balistik ekipman doğrulama demosu</div>
        </div>
      </header>

      {/* Dış (container for container) — Wi‑Fi login tarzı dar pano */}
      <main className="px-4 pb-14">
        <div className="mx-auto max-w-6xl">
          {/* Dar pano */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto w-full max-w-2xl bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 rounded-2xl shadow-2xl ring-1 ring-black/10 p-6 md:p-8"
          >
            <div className="mb-6">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-neutral-900">Ürün Doğrulama</h2>
              <p className="text-sm text-neutral-600 mt-1">Seri numarasını girin ve kategori seçin. Örnek seri: <code>TR-BAL-001</code></p>
            </div>

            {/* Başarı bildirimi (aktivasyon sonrası) — sadece başarı */}
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

            <form onSubmit={handleCheck} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={serialInput}
                onChange={(e) => setSerialInput(e.target.value)}
                placeholder="Seri numarası örn: TR-BAL-001"
                className="sm:col-span-2 rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
                autoFocus
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
              >
                <option value="">Kategori seçin</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="rounded-xl px-5 py-3 font-medium bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] transition"
                >
                  Doğrula
                </button>
              </div>
            </form>

            {/* Sonuç alanı */}
            <div className="mt-6 min-h-[180px]">
              <AnimatePresence mode="popLayout">
                {checked && (
                  <motion.div
                    key={checked.code + (checked.info?.status ?? "NONE") + String(category) + String(activatedNow)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-sm text-neutral-600">Girilen kod: <span className="font-mono font-semibold text-neutral-900">{checked.code || "—"}</span></div>

                    {!checked.info ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-red-200 bg-red-50 p-4">
                        <div className="font-semibold text-red-800">Kod bulunamadı</div>
                        <div className="text-sm text-red-900/80 mt-1">Yazımı kontrol edin veya satıcı ile iletişime geçin.</div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-xl border p-4 ring-1 bg-white"
                        style={{
                          borderColor:
                            checked.info.status === "UNUSED"
                              ? "#86efac"
                              : checked.info.status === "ACTIVATED"
                              ? "#fde68a"
                              : "#fca5a5",
                        }}
                      >
                        {/* Kategori uyarıları — anlık ve doğru */}
                        {checked.info && categoryWarning && (
                          <div className="mb-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
                            {categoryWarning}
                          </div>
                        )}

                        {/* Zaten etkinleştirilmişse — sahte riski uyarısı (ama aktivasyon az önce yapıldıysa SUSTUR) */}
                        {checked.info.status === "ACTIVATED" && !activatedNow && (
                          <div className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                            Bu kod daha önce etkinleştirilmiş. Ürün orijinal olmayabilir, lütfen destek birimi ile iletişime geçin.
                          </div>
                        )}

                        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${checked.info ? badgeColor(checked.info.status) : ""}`}>
                          {checked.info ? statusMeta[checked.info.status].label : ""}
                        </div>
                        <div className="mt-3">
                          <div className="text-sm text-neutral-600">Ürün</div>
                          <div className="text-base font-medium text-neutral-900">{checked.info.product}</div>
                          <div className="text-sm text-neutral-700 mt-1">{checked.info ? statusMeta[checked.info.status].desc : ""}</div>
                          {checked.info?.note && (
                            <div className="text-sm text-neutral-600 mt-2">Not: {checked.info.note}</div>
                          )}
                          {checked.info && (
                            <div className="text-xs text-neutral-500 mt-2">Kategori: {checked.info.category}</div>
                          )}
                        </div>
                        {checked.info?.status === "UNUSED" && categoryOk && (
                          <div className="mt-4">
                            <button
                              onClick={openActivationModal}
                              className="rounded-lg bg-[#495e2a] text-white px-4 py-2 hover:brightness-110 active:scale-[0.99] transition"
                            >
                              Etkinleştir
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Alt bilgi */}
          <div className="text-center text-xs text-neutral-300 mt-6">
            © {new Date().getFullYear()} Savunma Doğrulama Portalı • "Güvenli ürün, güvenli sistem"
          </div>
        </div>
      </main>

      {/* Modal: PIN girişi */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Arka plan örtüsü */}
            <motion.div
              className="absolute inset-0 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeActivationModal}
            />

            {/* Modal kartı */}
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
                  <h3 className="text-lg font-semibold text-neutral-900">PIN Doğrulaması</h3>
                  <p className="text-sm text-neutral-600 mt-1">Silenebilir alanın altındaki PIN'i girin ve onaylayın.</p>
                </div>
                <button onClick={closeActivationModal} className="text-neutral-500 hover:text-neutral-800">✕</button>
              </div>

              <form onSubmit={submitActivation} className="mt-4 space-y-3">
                <input
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.trim())}
                  placeholder="PIN (örn: M12PIN)"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
                />
                {pinError && (
                  <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">{pinError}</div>
                )}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={closeActivationModal}
                    className="rounded-lg px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    disabled={isSubmitting}
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-[#495e2a] text-white px-4 py-2 hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Onaylanıyor…" : "Onayla"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------
// İsteğe bağlı: Ayrı dosyada kodlar
// File: app/codes.ts
// export type CodeStatus = "UNUSED" | "ACTIVATED" | "BLOCKED";
// export type CodeInfo = { status: CodeStatus; product: string; category: string; pin?: string; note?: string };
// export const CODES: Record<string, CodeInfo> = {
//   "TR-BAL-001": { status: "UNUSED", product: "Balistik Yelek M12", category: "Balistik yelek", pin: "M12PIN" },
//   "TR-PLK-002": { status: "UNUSED", product: "Seramik Plaka S2", category: "Seramik plaka", pin: "S2PIN" },
//   "TR-KSK-003": { status: "UNUSED", product: "Balistik Kask K3", category: "Balistik kask", pin: "K3PIN" },
//   "TR-BOT-004": { status: "UNUSED", product: "Taktik Bot T4", category: "Taktik bot", pin: "T4PIN" },
//   "TR-PTC-005": { status: "UNUSED", product: "Plaka Taşıyıcı P5", category: "Plaka taşıyıcı", pin: "P5PIN" },
//   "TR-PLK-777": { status: "ACTIVATED", product: "Seramik Plaka S4", category: "Seramik plaka", note: "10.10.2025 tarihinde etkinleştirildi", pin: "S4PIN" },
//   "TR-KSK-778": { status: "ACTIVATED", product: "Balistik Kask K7", category: "Balistik kask", note: "05.09.2025 tarihinde etkinleştirildi", pin: "K7PIN" },
//   "TR-BOT-404": { status: "BLOCKED", product: "Taktik Bot T9", category: "Taktik bot", note: "Tedarikçi tarafından engellendi", pin: "T9PIN" },
//   "TR-BAL-999": { status: "BLOCKED", product: "Balistik Yelek M99", category: "Balistik yelek", note: "Seri iptal edildi", pin: "M99PIN" },
// };
// Ardından üstteki SAMPLE_CODES'u şu şekilde değiştirin:
// import { CODES as SAMPLE_CODES } from "./codes";

// File: components/ResultCard.tsx — result, warnings, action
import { AnimatePresence, motion } from "framer-motion";
import {
  VerifyResult,
  statusMeta,
  badgeColor,
  ActivationMeta,
  maskFirstTwo,
  maskPhoneLastTwo,
} from "@/lib/data";

export type ResultCardProps = {
  result: VerifyResult;
  category: string;
  activatedNow: boolean; // suppress activated-warning if true
  onClickActivate: () => void;

  // новые: метаданные владельца (демо)
  activationMeta?: Record<string, ActivationMeta>;
};

export default function ResultCard({
  result,
  category,
  activatedNow,
  onClickActivate,
  activationMeta,
}: ResultCardProps) {
  if (!result) return null;
  const info = result.info;
  const hasCategory = !!category;
  const categoryOk = info && hasCategory ? info.category === category : false;

  const categoryWarning = info
    ? !hasCategory
      ? "Lütfen kategori seçin"
      : !categoryOk
      ? `Seçilen kategori bu kod ile uyuşmuyor. Beklenen: ${info.category}`
      : ""
    : "";

  const owner = activationMeta?.[result.code];

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={result.code + (info?.status ?? "NONE") + String(category) + String(activatedNow)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className="space-y-4"
      >
        <div className="text-sm text-neutral-600">
          Girilen kod: <span className="font-mono font-semibold text-neutral-900">{result.code || "—"}</span>
        </div>

        {!info ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-red-200 bg-red-50 p-4"
          >
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
                info.status === "UNUSED"
                  ? "#86efac"
                  : info.status === "ACTIVATED"
                  ? "#fde68a"
                  : "#fca5a5",
            }}
          >
            {/* Kategori uyarıları — anlık ve doğru */}
            {info && categoryWarning && (
              <div className="mb-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
                {categoryWarning}
              </div>
            )}

            {/* Zaten etkinleştirilmişse — sahte riski uyarısı (ama az önce yapıldıysa SUSTUR) */}
            {info.status === "ACTIVATED" && !activatedNow && (
              <div className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                Bu kod daha önce etkinleştirilmiş. Ürün orijinal olmayabilir, lütfen destek birimi ile iletişime geçin.
              </div>
            )}

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                info ? badgeColor(info.status) : ""
              }`}
            >
              {info ? statusMeta[info.status].label : ""}
            </div>

            <div className="mt-3">
              <div className="text-sm text-neutral-600">Ürün</div>
              <div className="text-base font-medium text-neutral-900">{info.product}</div>
              <div className="text-sm text-neutral-700 mt-1">{info ? statusMeta[info.status].desc : ""}</div>
              {info?.note && <div className="text-sm text-neutral-600 mt-2">Not: {info.note}</div>}
              {info && <div className="text-xs text-neutral-500 mt-2">Kategori: {info.category}</div>}
            </div>

            {/* Владелец (маскированно), только если код ACTIVATED и есть метаданные */}
            {info.status === "ACTIVATED" && owner && (
              <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-800">
                <div className="font-semibold mb-1">Kayıtlı Sahip (maskeli)</div>
                <div>Ad: {maskFirstTwo(owner.firstName)}</div>
                <div>Soyad: {maskFirstTwo(owner.lastName)}</div>
                <div>Telefon: {maskPhoneLastTwo(owner.phone)}</div>
              </div>
            )}

            {info.status === "UNUSED" && categoryOk && (
              <div className="mt-4">
                <button
                  onClick={onClickActivate}
                  className="rounded-lg bg-[#495e2a] text-white px-4 py-2 hover:brightness-110 active:scale-[0.99] transition"
                >
                  Etkinleştir
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

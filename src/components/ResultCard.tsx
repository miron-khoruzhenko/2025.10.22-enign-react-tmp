// File: src/components/ResultCard.tsx — result, warnings, action (i18n + category keys)
import { AnimatePresence, motion } from "framer-motion";
import {
  VerifyResult,
  badgeColor,
  ActivationMeta,
  maskFirstTwo,
  maskPhoneLastTwo,
  getStatusMeta,
  categoryLabel,
} from "@/lib/data";
import { useI18n } from "./LanguageProvider";

export type ResultCardProps = {
  result: VerifyResult;
  category: string; // выбранный ключ категории или ""
  activatedNow: boolean; // suppress activated-warning if true
  onClickActivate: () => void;

  // метаданные владельца (демо)
  activationMeta?: Record<string, ActivationMeta>;
};

export default function ResultCard({
  result,
  category,
  activatedNow,
  onClickActivate,
  activationMeta,
}: ResultCardProps) {
  const { t, dir } = useI18n();
  if (!result) return null;

  const info = result.info;
  const hasCategory = !!category;
  const categoryOk = info && hasCategory ? info.category === category : false;

  const meta = getStatusMeta(t);

  const categoryWarning = info
    ? !hasCategory
      ? t("warnSelectCategory")
      : !categoryOk
      ? `${t("warnCategoryMismatch")} ${categoryLabel(t, info.category)}`
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
        dir={dir}
      >
        <div className="text-sm text-neutral-600">
          {t("enteredCode")}{" "}
          <span className="font-mono font-semibold text-neutral-900">
            {result.code || "—"}
          </span>
        </div>

        {!info ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <div className="font-semibold text-red-800">{t("codeNotFound")}</div>
            <div className="text-sm text-red-900/80 mt-1">
              {t("codeNotFoundDesc")}
            </div>
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
            {/* Катеогр. предупреждения */}
            {info && categoryWarning && (
              <div className="mb-3 rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-900">
                {categoryWarning}
              </div>
            )}

            {/* Предупреждение о ранее активированном (если не только что активировали) */}
            {info.status === "ACTIVATED" && !activatedNow && (
              <div className="mb-3 rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                {t("warnAlreadyActivated")}
              </div>
            )}

            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                info ? badgeColor(info.status) : ""
              }`}
            >
              {meta[info.status].label}
            </div>

            <div className="mt-3">
              <div className="text-sm text-neutral-600">{t("product")}</div>
              <div className="text-base font-medium text-neutral-900">
                {info.product}
              </div>
              <div className="text-sm text-neutral-700 mt-1">
                {meta[info.status].desc}
              </div>
              {info?.note && (
                <div className="text-sm text-neutral-600 mt-2">
                  {t("note")} {info.note}
                </div>
              )}
              {info && (
                <div className="text-xs text-neutral-500 mt-2">
                  {t("category")}: {categoryLabel(t, info.category)}
                </div>
              )}
            </div>

            {/* Владелец (маскированно), только если ACTIVATED */}
            {info.status === "ACTIVATED" && owner && (
              <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-800">
                <div className="font-semibold mb-1">{t("registeredOwner")}</div>
                <div>
                  {t("firstName")}: {maskFirstTwo(owner.firstName)}
                </div>
                <div>
                  {t("lastName")}: {maskFirstTwo(owner.lastName)}
                </div>
                <div>
                  {t("phone")}: {maskPhoneLastTwo(owner.phone)}
                </div>
              </div>
            )}

            {info.status === "UNUSED" && categoryOk && (
              <div className="mt-4">
                <button
                  onClick={onClickActivate}
                  className="rounded-lg bg-[#495e2a] text-white px-4 py-2 hover:brightness-110 active:scale-[0.99] transition"
                >
                  {t("activate")}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

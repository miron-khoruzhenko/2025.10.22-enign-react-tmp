// File: src/lib/data.ts
// Types, sample dataset, categories (as keys) + i18n helpers (DRY)

// import type { Lang } from "./i18n";

// ---------------- Types ----------------

export type CodeStatus = "UNUSED" | "ACTIVATED" | "BLOCKED";

// Категории храним как ключи, чтобы значение не зависело от языка UI.
export const CATEGORY_KEYS = ["uniform1", "uniform2", "uniform3"] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number] | string;

export type CodeInfo = {
  status: CodeStatus;
  product: string;
  category: CategoryKey; // internal key; отображение — через i18n
  note?: string;
};

export type VerifyResult = { code: string; info?: CodeInfo } | null;

// ---------------- Sample categories & codes (keys) ----------------

export const SAMPLE_CODES: Record<string, CodeInfo> = {
  // UNUSED
  "TR-BAL-001": { status: "UNUSED", product: "Uniforma 1 M12", category: "uniform1" },
  "TR-PLK-002": { status: "UNUSED", product: "Uniforma 2 S2", category: "uniform2" },
  "TR-KSK-003": { status: "UNUSED", product: "Uniforma 3 K3", category: "uniform3" },
  "TR-KSK-004": { status: "UNUSED", product: "Uniforma 1 K3", category: "uniform1" },
  "TR-KSK-005": { status: "UNUSED", product: "Uniforma 1 K31", category: "uniform1" },
  "TR-KSK-006": { status: "UNUSED", product: "Uniforma 1 K43", category: "uniform1" },
  "TR-KSK-007": { status: "UNUSED", product: "Uniforma 1 K32", category: "uniform1" },
  "TR-KSK-008": { status: "UNUSED", product: "Uniforma 1 K33", category: "uniform1" },
  "TR-KSK-009": { status: "UNUSED", product: "Uniforma 1 K35", category: "uniform1" },
  "TR-KSK-010": { status: "UNUSED", product: "Uniforma 1 K6", category: "uniform1" },

  // ACTIVATED
  "TR-PLK-777": { status: "ACTIVATED", product: "Uniforma 2 S4", category: "uniform2", note: "10.10.2025 tarihinde etkinleştirildi" },
  "TR-KSK-778": { status: "ACTIVATED", product: "Uniforma 3 K7", category: "uniform3", note: "05.09.2025 tarihinde etkinleştirildi" },

  // BLOCKED
  "TR-BAL-999": { status: "BLOCKED", product: "Uniforma 1 M99", category: "uniform1", note: "Seri iptal edildi" },
};

// ---------------- UI helpers ----------------

export function badgeColor(status: CodeStatus) {
  switch (status) {
    case "UNUSED":
      return "bg-green-100 text-green-800 ring-green-300";
    case "ACTIVATED":
      return "bg-yellow-100 text-yellow-900 ring-yellow-300";
    case "BLOCKED":
      return "bg-red-100 text-red-800 ring-red-300";
  }
}

// Локализованные подписи для статусов
export function getStatusMeta(t: (k: string) => string): Record<
  CodeStatus,
  { label: string; desc: string }
> {
  return {
    UNUSED: {
      label: t("status.UNUSED.label"),
      desc: t("status.UNUSED.desc"),
    },
    ACTIVATED: {
      label: t("status.ACTIVATED.label"),
      desc: t("status.ACTIVATED.desc"),
    },
    BLOCKED: {
      label: t("status.BLOCKED.label"),
      desc: t("status.BLOCKED.desc"),
    },
  };
}

// Локализация категорий
export function categoryLabel(t: (k: string) => string, key: CategoryKey): string {
  return t(`category.${key}`);
}

// Опции для dropdown: value = ключ, label = локализованный текст
export function getCategoryOptions(t: (k: string) => string): Array<{ value: CategoryKey; label: string }> {
  return CATEGORY_KEYS.map((k) => ({ value: k, label: categoryLabel(t, k) }));
}

// ---------------- Activation owner meta (for demo) ----------------

export type ActivationMeta = {
  firstName: string;
  lastName: string;
  phone: string;
};

// Пресет для уже активированных кодов (демо)
export const PRESET_ACTIVATION_META: Record<string, ActivationMeta> = {
  "TR-PLK-777": { firstName: "Ahmet", lastName: "Yılmaz", phone: "+90 555 123 45 67" },
  "TR-KSK-778": { firstName: "Zeynep", lastName: "Demir", phone: "+90 530 987 65 43" },
};

// Маскирование: первые 2 буквы видны, далее звёздочки.
export function maskFirstTwo(value: string): string {
  const v = (value || "").trim();
  if (!v) return "****";
  const vis = v.slice(0, 2);
  const hiddenCount = Math.max(4, Math.max(v.length - 2, 0));
  return `${vis}${"*".repeat(hiddenCount)}`;
}

// Для телефона оставляем только последние 2 цифры, остальное — звёздочки.
export function maskPhoneLastTwo(phone: string): string {
  const digits = (phone || "").replace(/\D+/g, "");
  const last2 = digits.slice(-2) || "";
  return `${"*".repeat(6)}${last2}`;
}

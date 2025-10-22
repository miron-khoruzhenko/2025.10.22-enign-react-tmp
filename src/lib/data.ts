// File: lib/data.ts
// Types, sample dataset, categories and small helpers (DRY)

export type CodeStatus = "UNUSED" | "ACTIVATED" | "BLOCKED";

export type CodeInfo = {
  status: CodeStatus;
  product: string;
  category: string; // ek kontrol için
  note?: string;
};

export type VerifyResult = { code: string; info?: CodeInfo } | null;

export const CATEGORIES = [
  "Balistik yelek",
  "Seramik plaka",
  "Balistik kask",
  "Taktik bot",
  "Plaka taşıyıcı",
] as const;

export const SAMPLE_CODES: Record<string, CodeInfo> = {
  // UNUSED
  "TR-BAL-001": { status: "UNUSED", product: "Balistik Yelek M12", category: "Balistik yelek" },
  "TR-PLK-002": { status: "UNUSED", product: "Seramik Plaka S2", category: "Seramik plaka" },
  "TR-KSK-003": { status: "UNUSED", product: "Balistik Kask K3", category: "Balistik kask" },
  "TR-BOT-004": { status: "UNUSED", product: "Taktik Bot T4", category: "Taktik bot" },
  "TR-PTC-005": { status: "UNUSED", product: "Plaka Taşıyıcı P5", category: "Plaka taşıyıcı" },

  // ACTIVATED
  "TR-PLK-777": { status: "ACTIVATED", product: "Seramik Plaka S4", category: "Seramik plaka", note: "10.10.2025 tarihinde etkinleştirildi" },
  "TR-KSK-778": { status: "ACTIVATED", product: "Balistik Kask K7", category: "Balistik kask", note: "05.09.2025 tarihinde etkinleştirildi" },

  // BLOCKED
  "TR-BOT-404": { status: "BLOCKED", product: "Taktik Bot T9", category: "Taktik bot", note: "Tedarikçi tarafından engellendi" },
  "TR-BAL-999": { status: "BLOCKED", product: "Balistik Yelek M99", category: "Balistik yelek", note: "Seri iptal edildi" },
};

export const statusMeta: Record<CodeStatus, { label: string; desc: string }> = {
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
// Если строка короче 2 — показываем как есть + звёздочки.
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

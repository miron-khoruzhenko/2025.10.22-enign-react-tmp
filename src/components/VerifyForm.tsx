// File: src/components/VerifyForm.tsx
import { FormEvent } from "react";
import { useI18n } from "./LanguageProvider";
import { getCategoryOptions } from "@/lib/data";

export type VerifyFormProps = {
  serial: string;
  category: string; // хранится как ключ категории или ""
  onChangeSerial: (v: string) => void;
  onChangeCategory: (v: string) => void;
  onSubmit: () => void;
};

export default function VerifyForm({
  serial,
  category,
  onChangeSerial,
  onChangeCategory,
  onSubmit,
}: VerifyFormProps) {
  const { t, dir } = useI18n();
  const options = getCategoryOptions(t);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      dir={dir}
    >
      <input
        value={serial}
        onChange={(e) => onChangeSerial(e.target.value)}
        placeholder={`${t("serialPlaceholder")}`}
        className="sm:col-span-2 rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
        autoFocus
      />

      <div className="relative">
        <select
          value={category}
          onChange={(e) => onChangeCategory(e.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900 appearance-none"
        >
          <option value="">{t("selectCategory")}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {/* простая стрелка для селекта */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
          ▾
        </div>
      </div>

      <div className="sm:col-span-3 flex justify-end">
        <button
          type="submit"
          className="rounded-xl px-5 py-3 font-medium bg-neutral-900 text-white hover:bg-neutral-800 active:scale-[0.99] transition"
        >
          {t("verify")}
        </button>
      </div>
    </form>
  );
}

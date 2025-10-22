// File: components/VerifyForm.tsx
import React from "react";
import { CATEGORIES } from "@/lib/data";

export type VerifyFormProps = {
  serial: string;
  category: string;
  onChangeSerial: (v: string) => void;
  onChangeCategory: (v: string) => void;
  onSubmit: () => void;
};

export default function VerifyForm({ serial, category, onChangeSerial, onChangeCategory, onSubmit }: VerifyFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-3"
    >
      <input
        value={serial}
        onChange={(e) => onChangeSerial(e.target.value)}
        placeholder="Seri numarası örn: TR-BAL-001"
        className="sm:col-span-2 rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
        autoFocus
      />
      <select
        value={category}
        onChange={(e) => onChangeCategory(e.target.value)}
        className="rounded-xl border border-neutral-200 px-4 py-3 outline-none focus:ring-4 focus:ring-[#9fb87a]/30 focus:border-[#9fb87a] transition bg-white text-neutral-900"
      >
        <option value="">Kategori seçin</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
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
  );
}

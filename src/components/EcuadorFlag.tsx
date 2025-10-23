// File: components/EcuadorFlag.tsx

export default function EcuadorFlag({ className = "h-6 w-9 rounded-sm shadow" }) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-label="Ekvador Bayrağı" role="img">
      {/* Sarı (üstte yarım) */}
      <rect width="3" height="1" y="0" fill="#FFD100" />
      {/* Mavi */}
      <rect width="3" height="0.5" y="1" fill="#0055A4" />
      {/* Kırmızı */}
      <rect width="3" height="0.5" y="1.5" fill="#EF3340" />
    </svg>
  );
}

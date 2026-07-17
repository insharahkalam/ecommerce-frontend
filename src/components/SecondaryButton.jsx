import React from "react";

export default function SecondaryButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-display flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-all ${className}`}
    >
      {children}
    </button>
  );
}

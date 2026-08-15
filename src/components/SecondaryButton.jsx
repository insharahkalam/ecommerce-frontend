import React from "react";

export default function SecondaryButton({ children, onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-display flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-border bg-surface hover:bg-hover text-text-muted hover:text-text transition-all ${className}`}
    >
      {children}
    </button>
  );
}
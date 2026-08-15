import React from "react";

export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-[var(--color-border)] to-transparent shadow-xl shadow-black/40 ${className}`}>
      <div className="rounded-2xl h-full bg-bg/90 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}
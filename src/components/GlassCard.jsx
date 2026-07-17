import React from "react";

/* Gradient-bordered glass card, same recipe as the signup panel */
export default function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-xl shadow-black/40 ${className}`}>
      <div className="rounded-2xl h-full bg-neutral-950/90 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

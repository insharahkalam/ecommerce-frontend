import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import GlassCard from "./GlassCard";

export default function StatCard({ label, value, delta, positive, prefix }) {
  return (
    <GlassCard>
      <div className="p-5 flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] font-serif">{label}</span>
        <span className="font-display text-3xl text-[var(--color-text)] tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
          {prefix}{value}
        </span>
        <div
          className={`flex items-center gap-1 text-xs font-display ${positive
            ? "text-green-600 dark:text-[#7FE0A8]"
            : "text-red-600 dark:text-[#F3897E]"
            }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{delta}</span>
          <span className="text-[var(--color-text-muted)] font-serif ml-1">vs last week</span>
        </div>
      </div>
    </GlassCard>
  );
}
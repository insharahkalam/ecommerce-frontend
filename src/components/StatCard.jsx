import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import GlassCard from "./GlassCard";

export default function StatCard({ label, value, delta, positive, prefix }) {
  return (
    <GlassCard>
      <div className="p-5 flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-neutral-500 font-serif">{label}</span>
        <span className="font-display text-3xl text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
          {prefix}{value}
        </span>
        <div className="flex items-center gap-1 text-xs font-display" style={{ color: positive ? "#7FE0A8" : "#F3897E" }}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{delta}</span>
          <span className="text-neutral-500 font-serif ml-1">vs last week</span>
        </div>
      </div>
    </GlassCard>
  );
}

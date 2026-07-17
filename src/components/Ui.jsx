import React from "react";
import { Search, X, ArrowUpRight, ArrowDownRight } from "lucide-react";

/* Gradient-bordered glass card, same recipe as the signup panel */
export function GlassCard({ children, className = "" }) {
    return (
        <div className={`rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-xl shadow-black/40 ${className}`}>
            <div className="rounded-2xl h-full bg-neutral-950/90 backdrop-blur-xl">
                {children}
            </div>
        </div>
    );
}

export function StatCard({ label, value, delta, positive, prefix }) {
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

export function Pill({ children, color, bg, border }) {
    return (
        <span className="px-2.5 py-1 rounded-full text-xs font-serif border whitespace-nowrap" style={{ background: bg, color, borderColor: border }}>
            {children}
        </span>
    );
}

export function SearchInput({ value, onChange, placeholder }) {
    return (
        <div className="flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
            <Search size={16} color="#A3A3A3" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent outline-none text-sm w-full font-serif text-white placeholder:text-neutral-500"
            />
        </div>
    );
}

export function PrimaryButton({ children, onClick, className = "", disabled = false, type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`font-display flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, onClick, className = "" }) {
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

export function Modal({ title, onClose, children, wide = false }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative w-full ${wide ? "max-w-2xl" : "max-w-md"} rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl max-h-[90vh]`}>
                <div className="rounded-2xl bg-neutral-950 p-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
                    <div className="flex items-center justify-between mb-5 sticky -top-6 bg-neutral-950 pt-0">
                        <h3 className="font-display italic text-lg font-semibold text-white">{title}</h3>
                        <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                            <X size={18} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function FieldLabel({ children, required = false }) {
    return (
        <label className="block text-xs uppercase tracking-[0.14em] text-neutral-500 font-serif mb-1.5">
            {children} {required && <span className="text-orange-400">*</span>}
        </label>
    );
}

export function TextField(props) {
    return (
        <input
            {...props}
            className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white placeholder:text-neutral-600 outline-none focus:border-orange-500/50 transition-colors"
        />
    );
}

export function TextArea(props) {
    return (
        <textarea
            {...props}
            className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white placeholder:text-neutral-600 outline-none focus:border-orange-500/50 transition-colors resize-none"
        />
    );
}
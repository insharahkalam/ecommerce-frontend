import React from "react";

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

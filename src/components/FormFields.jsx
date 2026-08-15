import React from "react";

export function FieldLabel({ children, required = false }) {
  return (
    <label className="block text-xs uppercase tracking-[0.14em] text-text-muted font-serif mb-1.5">
      {children} {required && <span className="text-orange-400">*</span>}
    </label>
  );
}

export function TextField(props) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2.5 rounded-lg border border-border bg-hover text-sm font-serif text-text placeholder:text-text-muted outline-none focus:border-orange-500/50 transition-colors"
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className="w-full px-3 py-2.5 rounded-lg border border-border bg-hover text-sm font-serif text-text placeholder:text-text-muted outline-none focus:border-orange-500/50 transition-colors resize-none"
    />
  );
}
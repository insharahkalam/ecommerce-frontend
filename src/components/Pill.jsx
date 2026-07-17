import React from "react";

export default function Pill({ children, color, bg, border }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs font-serif border whitespace-nowrap" style={{ background: bg, color, borderColor: border }}>
      {children}
    </span>
  );
}

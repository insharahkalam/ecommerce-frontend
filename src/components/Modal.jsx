import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children, wide = false }) {
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

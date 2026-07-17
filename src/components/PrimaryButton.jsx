import React from "react";

export default function PrimaryButton({ children, onClick, className = "", disabled = false, type = "button" }) {
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

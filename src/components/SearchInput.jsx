import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder }) {
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

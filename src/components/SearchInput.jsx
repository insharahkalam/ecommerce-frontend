import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2 w-full max-w-md px-3 py-2 rounded-lg border border-border bg-hover">
      <Search size={16} className="text-text-muted shrink-0" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm w-full font-serif text-text placeholder:text-text-muted"
      />
    </div>
  );
}
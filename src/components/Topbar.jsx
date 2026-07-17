import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { pageTitles } from "../data/mockData";

export default function Topbar({ setMobileNavOpen }) {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "";

  return (
    <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
      <div className="flex items-center gap-3 flex-1">
        <button className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
          <Menu size={22} color="#fff" />
        </button>
        <span className="hidden lg:block font-serif text-sm text-neutral-500">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative">
          <Bell size={19} color="#fff" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            MA
          </div>
          <span className="hidden sm:block text-sm font-serif text-white">Maha A.</span>
          <ChevronDown size={14} color="#A3A3A3" />
        </div>
      </div>
    </header>
  );
}

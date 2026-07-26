import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, ChevronDown, LogOut } from "lucide-react";
import { pageTitles, AUTH_BASE_URL } from "../data/mockData";
import api from "../config/axios";

export default function Topbar({ setMobileNavOpen, admin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const title = pageTitles[location.pathname] || "";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = admin?.username || "Admin";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    try {
      await api.get(`${AUTH_BASE_URL}/logout`);
    } catch (err) {
      // even if the request fails, clear the client-side state and redirect
    } finally {
      navigate("/login");
    }
  }

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

        <div className="relative" ref={menuRef}>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              {initials}
            </div>
            <span className="hidden sm:block text-sm font-serif capitalize text-white">{displayName}</span>
            <ChevronDown size={14} color="#A3A3A3" className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-xl shadow-black/40 py-1 z-50">
              {admin?.email && (
                <div className="px-3 py-2 border-b border-white/10">
                  <p className="text-xs font-serif text-neutral-500 truncate">{admin.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5 hover:text-red-400 transition-colors"
              >
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
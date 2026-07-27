import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, User, LogOut } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../config/axios";
import { AUTH_BASE_URL } from "../../data/mockData";

export default function PublicLayout() {
  const { cartCount } = useCart();
  const { user, logoutUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await api.get(`${AUTH_BASE_URL}/logout`);
    } catch (err) {
      // ignore
    } finally {
      logoutUser();
      setMenuOpen(false);
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-white font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Source+Serif+4:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-serif { font-family: 'Source Serif 4', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <header className="sticky top-0 z-40 flex items-center justify-between gap-4 px-5 lg:px-10 py-4 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <ShoppingBag size={16} color="#fff" />
          </div>
          <span className="font-display italic text-lg font-semibold">ApnaBazar</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingBag size={20} color="#fff" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-orange-500 text-[10px] font-mono flex items-center justify-center text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setMenuOpen((p) => !p)}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
              </div>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-lg border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-sm font-serif text-white truncate">{user.username}</p>
                  </div>
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5"
                  >
                    My orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5 hover:text-red-400"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-serif text-neutral-300 hover:text-white transition-colors"
            >
              <User size={16} /> Login
            </Link>
          )}
        </div>
      </header>

      <main className="px-5 lg:px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}
import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutGrid, ShoppingCart, Package, Users, BarChart3, Settings, X,
} from "lucide-react";
import { IoMdAppstore } from "react-icons/io";

// path must match the routes in Routing.jsx exactly
const navItems = [
  { path: "/adminDashboard", label: "Dashboard", icon: LayoutGrid },
  { path: "/orders", label: "Orders", icon: ShoppingCart },
  { path: "/add-product", label: "Products", icon: Package },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/setting", label: "Settings", icon: Settings },
];

export default function Sidebar({ mobileNavOpen, setMobileNavOpen }) {
  return (
    <>
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-white/10 bg-neutral-950/80 backdrop-blur-xl transition-transform duration-200 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/adminDashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
              <IoMdAppstore />
            </div>
            <span className="font-display italic text-lg font-semibold tracking-tight">ApnaBazar</span>
          </Link>
          <button className="lg:hidden" onClick={() => setMobileNavOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileNavOpen(false)}
                className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif text-left"
                style={({ isActive }) => ({
                  background: isActive ? "rgba(249,115,22,0.12)" : "transparent",
                  color: isActive ? "#FB923C" : "#A3A3A3",
                })}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-5 mx-3 mb-4 rounded-xl border border-white/10 bg-white/[0.03]">
          <p className="text-xs text-neutral-500 font-serif">Store status</p>
          <p className="font-mono text-sm mt-1 text-orange-400">● All systems normal</p>
        </div>
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}
    </>
  );
}

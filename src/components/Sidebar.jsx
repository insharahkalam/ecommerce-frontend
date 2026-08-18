import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutGrid, ShoppingCart, Package, Users, Settings, X, Bell,
} from "lucide-react";
import { IoMdAppstore } from "react-icons/io";
import api from "../config/axios";
import pusherClient from "../config/pusher";
import logo from "../assets/logo.png"

const navItems = [
  { path: "/adminDashboard", label: "Dashboard", icon: LayoutGrid },
  { path: "/orders", label: "Orders", icon: ShoppingCart },
  { path: "/add-product", label: "Products", icon: Package },
  { path: "/customers", label: "Customers", icon: Users },
  { path: "/notifications", label: "Notifications", icon: Bell },
  { path: "/setting", label: "Settings", icon: Settings },
];

export default function Sidebar({ mobileNavOpen, setMobileNavOpen }) {
  return (
    <>
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl transition-transform duration-200 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/adminDashboard" className="flex items-center gap-2">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-r from-orange-400 to-amber-300 p-[2px] ">
              <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[8px] bg-white">
                <img
                  src={logo}
                  alt="UrbanTraders"
                  width={40}
                  height={40}
                  className="h-11 w-11 object-contain"
                />
              </span>
            </span>

            <span className="flex flex-col leading-none">
              <span className="font-serif text-[19px] font-extrabold tracking-[-0.03em] text-neutral-900 dark:text-white">
                Urban<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Traders</span>
              </span>
              <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-neutral-400 dark:text-neutral-500 sm:block">
                Shop Smart
              </span>
            </span>
          </Link>
          <button className="lg:hidden text-[var(--color-text)]" onClick={() => setMobileNavOpen(false)}>
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
                onClick={() => {
                  setMobileNavOpen(false);

                }}
                className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif text-left"
                style={({ isActive }) => ({
                  background: isActive ? "rgba(249,115,22,0.12)" : "transparent",
                  color: isActive ? "#FB923C" : "var(--color-text-muted)",
                })}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-5 mx-3 mb-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-hover)]">
          <p className="text-xs text-[var(--color-text-muted)] font-serif">Store status</p>
          <p className="font-mono text-sm mt-1 text-orange-500 dark:text-orange-400">● All systems normal</p>
        </div>
      </aside>

      {mobileNavOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileNavOpen(false)} />
      )}
    </>
  );
}
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { initialOrders, initialProducts, initialCustomers } from "../../data/mockData";

/* ---------------------------------------------------------
   AdminLayout — the shared shell for every /admin-ish route.
   Mounted once by Routing.jsx as a layout route (no path of
   its own); each admin page (AdminDashboard, Order, Customers,
   AddProduct, Setting) renders inside it via <Outlet />.

   State (orders/products/customers) lives HERE so it survives
   navigation between pages, and is handed down through
   Outlet's `context` — child pages read it with
   `useOutletContext()` instead of props.
   --------------------------------------------------------- */
export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);

  return (
    <div className="relative min-h-screen w-full flex bg-neutral-950 text-white font-sans antialiased overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Source+Serif+4:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-serif { font-family: 'Source Serif 4', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 9999px; }
        .nav-item { transition: background 0.15s ease, color 0.15s ease; }
      `}</style>

      <div className="pointer-events-none fixed -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none fixed -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <Sidebar mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen} />

      <div className="relative flex-1 flex flex-col min-w-0">
        <Topbar setMobileNavOpen={setMobileNavOpen} />

        <main className="flex-1 px-5 lg:px-8 py-6 flex flex-col gap-6 overflow-y-auto">
          <Outlet context={{ orders, setOrders, products, setProducts, customers, setCustomers }} />
        </main>
      </div>
    </div>
  );
}

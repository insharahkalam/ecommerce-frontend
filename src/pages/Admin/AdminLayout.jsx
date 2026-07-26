import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { API_BASE_URL } from "../../data/mockData";
import api from "../../config/axios";

function normalizeProduct(p) {
  return {
    id: p._id || p.id,
    name: p.title || p.name || "",
    description: p.description || "",
    category: p.category || "",
    brand: p.brand || "",
    price: Number(p.price) || 0,
    stock: Number(p.stock) || 0,
    discount: Number(p.discount) || 0,
    featured: !!p.featured,
    specifications: p.specifications || {},
    image: p.image || null,
    sold: Number(p.sold) || 0,
  };
}

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadAll() {
      setLoading(true);
      setLoadError("");
      const errors = [];

      try {
        const res = await api.get(`${API_BASE_URL}/getAllProduct`);
        console.log(res, "check res get");

        const data = res.data;
        const list = data.getProduct || [];
        if (!cancelled) setProducts(list.map(normalizeProduct));
      } catch (err) {
        console.error("Failed to load products:", err);
        errors.push("products");
      }

      // try {
      //   const res = await fetch(ORDERS_API_URL);
      //   const data = await res.json();
      //   const list = data.orders || data.data || (Array.isArray(data) ? data : []);
      //   if (!cancelled) setOrders(list);
      // } catch (err) {
      //   errors.push("orders");
      // }

      // try {
      //   const res = await fetch(CUSTOMERS_API_URL);
      //   const data = await res.json();
      //   const list = data.customers || data.data || (Array.isArray(data) ? data : []);
      //   if (!cancelled) setCustomers(list);
      // } catch (err) {
      //   errors.push("customers");
      // }

      if (!cancelled) {
        if (errors.length) setLoadError(`Could not load: ${errors.join(", ")}. Check your backend/API_BASE_URL.`);
        setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

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
          {loadError && (
            <div className="px-3 py-2 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-xs font-serif w-fit">
              {loadError}
            </div>
          )}
          <Outlet context={{ orders, setOrders, products, setProducts, customers, setCustomers, loading }} />
        </main>
      </div>
    </div>
  );
}
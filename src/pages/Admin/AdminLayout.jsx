import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { API_BASE_URL, AUTH_BASE_URL, ORDERS_API_URL } from "../../data/mockData";
import api from "../../config/axios";
import pusherClient from "../../config/pusher";

function normalizeCustomer(u) {
  return {
    id: u._id || u.id,
    name: u.username || u.name || "Unknown",
    email: u.email || "",
    phone: u.phone || "",
    orders: u.orders || 0,
    spent: u.spent || 0,
    joined: u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "—",
  };
}

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

function normalizeOrder(o) {
  return {
    id: o._id,
    customer: o.user?.username || "Unknown",
    email: o.user?.email || "",
    items: Array.isArray(o.items) ? o.items.length : 0,
    rawItems: o.items || [],
    total: Number(o.totalAmount) || 0,
    status: o.status || "Pending",
    paymentMethod: o.paymentMethod || "COD",
    paymentStatus: o.paymentStatus || "Pending",
    shippingAddress: o.shippingAddress || {},
    transferDetails: o.transferDetails || null,
    date: o.createdAt
      ? new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "—",
  };
}

export default function AdminLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [admin, setAdmin] = useState(null);
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
        console.log(res, "check res getproduct");

        const data = res.data;
        const list = data.getProduct || [];
        if (!cancelled) setProducts(list.map(normalizeProduct));
      } catch (err) {
        console.error("Failed to load products:", err);
        errors.push("products");
      }

      try {
        const res = await api.get(`${ORDERS_API_URL}/getAllOrders`);
        console.log(res, "order res check");

        const list = res.data || [];
        console.log(list, "get all orders=====>");

        if (!cancelled) setOrders(list.map(normalizeOrder));
      } catch (err) {
        console.error("Failed to load orders:", err.message);
        errors.push("order");
      }

      try {
        const res = await api.get(`${AUTH_BASE_URL}/ViewAllUsers`);
        const data = res.data;
        const list = data.allUsers || [];
        if (!cancelled) setCustomers(list.map(normalizeCustomer));
      } catch (err) {
        console.error("Failed to load users:", err);
        errors.push("customers");
      }

      try {
        const res = await api.get(`${AUTH_BASE_URL}/getMe`);
        const data = res.data;
        if (data.user && !cancelled) setAdmin(data.user);
      } catch (err) {
        console.error("Failed to load admin:", err);
      }

      if (!cancelled) {
        if (errors.length) setLoadError(`Could not load: ${errors.join(", ")}. Check your backend/API_BASE_URL.`);
        setLoading(false);
      }
    }

    loadAll();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const channel = pusherClient.subscribe("admin-orders");

    channel.bind("order-updated", (data) => {
      console.log("Pusher event received: in admin layout", data);
      setOrders((prev) =>
        prev.map((o) =>
          o.id === data.orderId
            ? { ...o, status: data.status, paymentStatus: data.paymentStatus }
            : o
        )
      );
    });

    return () => {
      pusherClient.unsubscribe("admin-orders");
    };
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
        <Topbar setMobileNavOpen={setMobileNavOpen} admin={admin} />

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
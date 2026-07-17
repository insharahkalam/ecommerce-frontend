import React, { useState } from "react";
import {
  LayoutGrid, Package, ShoppingCart, Users, BarChart3, Settings,
  Search, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, Menu, X,
  MoreHorizontal, Plus
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

/* ---------------------------------------------------------
   DESIGN SYSTEM — matched to the "Signup" screen:
   neutral-950 ground, ambient orange glows, dotted-noise
   overlay, gradient hairline borders on glass cards,
   italic serif headlines, serif body copy, mono for
   anything countable (money, SKUs, quantities).
   --------------------------------------------------------- */

const revenueData = [
  { day: "Mon", revenue: 4200, orders: 38 },
  { day: "Tue", revenue: 3800, orders: 34 },
  { day: "Wed", revenue: 5100, orders: 47 },
  { day: "Thu", revenue: 4700, orders: 41 },
  { day: "Fri", revenue: 6300, orders: 55 },
  { day: "Sat", revenue: 7400, orders: 63 },
  { day: "Sun", revenue: 6800, orders: 58 },
];

const orders = [
  { id: "ORD-10482", customer: "Ayesha Khan", items: 3, total: 128.5, status: "Fulfilled", date: "Jul 17" },
  { id: "ORD-10481", customer: "Bilal Ahmed", items: 1, total: 42.0, status: "Pending", date: "Jul 17" },
  { id: "ORD-10480", customer: "Sara Malik", items: 5, total: 310.75, status: "Fulfilled", date: "Jul 16" },
  { id: "ORD-10479", customer: "Usman Tariq", items: 2, total: 76.2, status: "Refunded", date: "Jul 16" },
  { id: "ORD-10478", customer: "Hina Sheikh", items: 4, total: 189.99, status: "Pending", date: "Jul 16" },
  { id: "ORD-10477", customer: "Zain Raza", items: 1, total: 25.0, status: "Fulfilled", date: "Jul 15" },
];

const topProducts = [
  { name: "Canvas Tote — Olive", sku: "CT-OL-01", sold: 214, revenue: 6420 },
  { name: "Ceramic Mug Set", sku: "CM-SET-04", sold: 178, revenue: 4272 },
  { name: "Linen Throw Blanket", sku: "LT-BL-02", sold: 96, revenue: 5760 },
  { name: "Desk Lamp — Brass", sku: "DL-BR-07", sold: 61, revenue: 3355 },
];

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Orders", icon: ShoppingCart },
  { label: "Products", icon: Package },
  { label: "Customers", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

function statusStyle(status) {
  switch (status) {
    case "Fulfilled":
      return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)" };
    case "Pending":
      return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)" };
    case "Refunded":
      return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)" };
    default:
      return { color: "#A3A3A3", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" };
  }
}

/* Gradient-bordered glass card, same recipe as the signup panel */
function GlassCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-xl shadow-black/40 ${className}`}>
      <div className="rounded-2xl h-full bg-neutral-950/90 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, positive, prefix }) {
  return (
    <GlassCard>
      <div className="p-5 flex flex-col gap-3">
        <span className="text-xs uppercase tracking-[0.18em] text-neutral-500 font-serif">{label}</span>
        <span className="font-display text-3xl text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
          {prefix}{value}
        </span>
        <div className="flex items-center gap-1 text-xs font-display" style={{ color: positive ? "#7FE0A8" : "#F3897E" }}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          <span>{delta}</span>
          <span className="text-neutral-500 font-serif ml-1">vs last week</span>
        </div>
      </div>
    </GlassCard>
  );
}



const AdminDashboard = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <>
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

        {/* Ambient glow, matched to the signup screen */}
        <div className="pointer-events-none fixed -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
        <div className="pointer-events-none fixed -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
        <div
          className="pointer-events-none fixed inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-white/10 bg-neutral-950/80 backdrop-blur-xl transition-transform duration-200 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          <div className="flex items-center justify-between px-6 py-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
                L
              </div>
              <span className="font-display italic text-lg font-semibold tracking-tight">Ledger</span>
            </div>
            <button className="lg:hidden" onClick={() => setMobileNavOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif text-left"
                  style={{
                    background: item.active ? "rgba(249,115,22,0.12)" : "transparent",
                    color: item.active ? "#FB923C" : "#A3A3A3",
                  }}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
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

        {/* Main */}
        <div className="relative flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
            <div className="flex items-center gap-3 flex-1">
              <button className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
                <Menu size={22} color="#fff" />
              </button>
              <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
                <Search size={16} color="#A3A3A3" />
                <input
                  placeholder="Search orders, products, customers…"
                  className="bg-transparent outline-none text-sm w-full font-serif text-white placeholder:text-neutral-500"
                />
              </div>
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

          {/* Content */}
          <main className="flex-1 px-5 lg:px-8 py-6 flex flex-col gap-6 overflow-y-auto">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Overview</h1>
                <p className="text-sm mt-1 text-neutral-400 font-serif">Friday, 17 July — here's how the store is doing this week.</p>
              </div>
              <button className="font-display flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all">
                <Plus size={16} /> Add product
              </button>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <StatCard label="Revenue" value="38,300" prefix="$" delta="12.4%" positive />
              <StatCard label="Orders" value="336" delta="6.1%" positive />
              <StatCard label="New customers" value="84" delta="2.3%" positive={false} />
              <StatCard label="Avg. order value" value="113.98" prefix="$" delta="4.7%" positive />
            </div>

            {/* Chart + Top products */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <GlassCard className="xl:col-span-2">
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display italic text-base font-semibold text-white">Revenue this week</h2>
                    <span className="font-mono text-xs px-2 py-1 rounded border border-orange-500/25 bg-orange-500/10 text-orange-400">+12.4%</span>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={revenueData} margin={{ left: -20, right: 10, top: 10 }}>
                      <defs>
                        <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
                          <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.08)" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "#0a0a0a", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}
                        labelStyle={{ color: "#fff" }}
                        formatter={(value, name) => [name === "revenue" ? `$${value}` : value, name === "revenue" ? "Revenue" : "Orders"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#rev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="p-5 flex flex-col gap-4">
                  <h2 className="font-display italic text-base font-semibold text-white">Top products</h2>
                  {topProducts.map((p) => (
                    <div key={p.sku} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-serif text-white truncate">{p.name}</p>
                        <p className="font-mono text-xs text-neutral-500">{p.sku} · {p.sold} sold</p>
                      </div>
                      <span className="font-mono text-sm text-white">${p.revenue.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Orders table */}
            <GlassCard>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display italic text-base font-semibold text-white">Recent orders</h2>
                  <button className="text-sm font-serif text-orange-400 hover:text-orange-300">View all</button>
                </div>
                <div className="h-px w-full mb-2" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)" }} />
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-neutral-500">
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Order</th>
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Items</th>
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Total</th>
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Status</th>
                        <th className="py-2 font-serif text-xs uppercase tracking-wide">Date</th>
                        <th className="py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => {
                        const s = statusStyle(o.status);
                        return (
                          <tr key={o.id} className="border-t border-white/10">
                            <td className="py-3 font-mono text-white">{o.id}</td>
                            <td className="py-3 font-serif text-white">{o.customer}</td>
                            <td className="py-3 font-mono text-neutral-400">{o.items}</td>
                            <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
                            <td className="py-3">
                              <span
                                className="px-2.5 py-1 rounded-full text-xs font-serif border"
                                style={{ background: s.bg, color: s.color, borderColor: s.border }}
                              >
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3 font-mono text-neutral-500">{o.date}</td>
                            <td className="py-3 text-right">
                              <MoreHorizontal size={16} color="#A3A3A3" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </GlassCard>
          </main>
        </div>
      </div>




    </>
  )
}

export default AdminDashboard
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import GlassCard from "../../components/GlassCard";
import StatCard from "../../components/StatCard";
import Pill from "../../components/Pill";
import PrimaryButton from "../../components/PrimaryButton";
import { statusStyle } from "../../utils/badgeStyles";
import { revenueData } from "../../data/mockData";

export default function AdminDashboard() {
  const { orders, products, customers } = useOutletContext();
  const navigate = useNavigate();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const recentOrders = orders.slice(0, 6);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Overview</h1>
          <p className="text-sm mt-1 text-neutral-400 font-serif">Friday, 17 July — here's how the store is doing this week.</p>
        </div>
        <PrimaryButton onClick={() => navigate("/add-product")}>
          <Plus size={16} /> Add product
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Revenue" value={totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} prefix="$" delta="12.4%" positive />
        <StatCard label="Orders" value={orders.length} delta="6.1%" positive />
        <StatCard label="Customers" value={customers.length} delta="2.3%" positive />
        <StatCard label="Avg. order value" value={(totalRevenue / Math.max(orders.length, 1)).toFixed(2)} prefix="$" delta="4.7%" positive />
      </div>

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
            <div className="flex items-center justify-between">
              <h2 className="font-display italic text-base font-semibold text-white">Top products</h2>
              <button onClick={() => navigate("/add-product")} className="text-xs font-serif text-orange-400 hover:text-orange-300">View all</button>
            </div>
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-serif text-white truncate">{p.name}</p>
                  <p className="font-mono text-xs text-neutral-500">{p.id} · {p.sold} sold</p>
                </div>
                <span className="font-mono text-sm text-white">${(p.sold * p.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display italic text-base font-semibold text-white">Recent orders</h2>
            <button onClick={() => navigate("/orders")} className="text-sm font-serif text-orange-400 hover:text-orange-300">View all</button>
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
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => {
                  const s = statusStyle(o.status);
                  return (
                    <tr key={o.id} className="border-t border-white/10">
                      <td className="py-3 font-mono text-white">{o.id}</td>
                      <td className="py-3 font-serif text-white">{o.customer}</td>
                      <td className="py-3 font-mono text-neutral-400">{o.items}</td>
                      <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
                      <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
                      <td className="py-3 font-mono text-neutral-500">{o.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </>
  );
}

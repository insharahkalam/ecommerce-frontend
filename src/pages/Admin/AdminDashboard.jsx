import React, { useMemo } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import GlassCard from "../../components/GlassCard";
import StatCard from "../../components/StatCard";
import Pill from "../../components/Pill";
import PrimaryButton from "../../components/PrimaryButton";
import { statusStyle } from "../../utils/badgeStyles";
import { calculateDelta } from "../../utils/calculateDelta";
import { useTheme } from "../../context/ThemeContext";

function getDateFromObjectId(id) {
  if (!id || id.length < 8) return null;
  const timestamp = parseInt(id.substring(0, 8), 16) * 1000;
  return new Date(timestamp);
}

export default function AdminDashboard() {
  const { orders, products, customers } = useOutletContext();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  const recentOrders = orders.slice(0, 6);

  const todayLabel = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const revenueData = useMemo(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - i);
      days.push(d);
    }

    return days.map((day) => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayOrders = orders.filter((o) => {
        const created = getDateFromObjectId(o.id);
        return created && created >= day && created < nextDay;
      });

      return {
        day: day.toLocaleDateString("en-US", { weekday: "short" }),
        revenue: dayOrders.reduce((s, o) => s + (o.total || 0), 0),
        orders: dayOrders.length,
      };
    });
  }, [orders]);

  const revenueDelta = useMemo(() => calculateDelta(orders, (o) => o.total || 0, 30), [orders]);
  const ordersDelta = useMemo(() => calculateDelta(orders, () => 1, 30), [orders]);
  const customersDelta = useMemo(() => calculateDelta(customers, () => 1, 30), [customers]);
  const productsDelta = useMemo(() => calculateDelta(products, () => 1, 30), [products]);

  const gridStroke = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const axisTick = theme === "dark" ? "#A3A3A3" : "#737373";
  const tooltipBg = theme === "dark" ? "#0a0a0a" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-text">Overview</h1>
          <p className="text-sm mt-1 text-text-muted font-serif">{todayLabel} — here's how the store is doing this week.</p>
        </div>
        <PrimaryButton onClick={() => navigate("/add-product")}>
          <Plus size={16} /> Add product
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Revenue"
          value={totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          prefix="Rs "
          delta={revenueDelta.delta}
          positive={revenueDelta.positive}
        />
        <StatCard label="Orders" value={orders.length} delta={ordersDelta.delta} positive={ordersDelta.positive} />
        <StatCard label="Customers" value={customers.length} delta={customersDelta.delta} positive={customersDelta.positive} />
        <StatCard label="Products" value={products.length} delta={productsDelta.delta} positive={productsDelta.positive} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <GlassCard className="xl:col-span-2">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display italic text-base font-semibold text-text">Revenue this week</h2>
              <span className="font-mono text-xs px-2 py-1 rounded border border-orange-500/25 bg-orange-500/10 text-orange-400">
                {revenueDelta.positive ? "+" : "-"}{revenueDelta.delta}
              </span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: axisTick }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: axisTick }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 10,
                    border: `1px solid ${tooltipBorder}`,
                    background: tooltipBg,
                    fontSize: 12,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                  labelStyle={{ color: theme === "dark" ? "#fff" : "#171717" }}
                  formatter={(value, name) => [name === "revenue" ? `Rs ${value}` : value, name === "revenue" ? "Revenue" : "Orders"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display italic text-base font-semibold text-text">Top products</h2>
              <button onClick={() => navigate("/add-product")} className="text-xs font-serif text-orange-400 hover:text-orange-300">View all</button>
            </div>
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-serif text-text truncate">{p.name}</p>
                  <p className="font-mono text-xs text-text-muted">{p.id} </p>
                </div>
                <span className="font-serif text-xs text-text"> {p.sold} sold</span>
              </div>
            ))}
            {topProducts.length === 0 && (
              <p className="text-xs text-text-muted font-serif">No products yet.</p>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display italic text-base font-semibold text-text">Recent orders</h2>
            <button onClick={() => navigate("/orders")} className="text-sm font-serif text-orange-400 hover:text-orange-300">View all</button>
          </div>
          <div
            className="h-px w-full mb-2"
            style={{
              backgroundImage:
                theme === "dark"
                  ? "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)"
                  : "repeating-linear-gradient(to right, rgba(0,0,0,0.15) 0, rgba(0,0,0,0.15) 6px, transparent 6px, transparent 12px)",
            }}
          />
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted">
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
                    <tr key={o.id} className="border-t border-border">
                      <td className="py-3 font-mono text-text">{o.id}</td>
                      <td className="py-3 font-serif text-text">{o.customer}</td>
                      <td className="py-3 font-mono text-text-muted">{o.items}</td>
                      <td className="py-3 font-mono text-text">Rs {o.total.toFixed(2)}</td>
                      <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
                      <td className="py-3 font-mono text-text-muted">{o.date}</td>
                    </tr>
                  );
                })}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-muted font-serif text-sm">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </>
  );
}
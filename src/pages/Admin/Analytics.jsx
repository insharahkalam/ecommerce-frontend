import React from "react";
import { useOutletContext } from "react-router-dom";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import { statusStyle } from "../../utils/badgeStyles";
import { ORDER_STATUSES } from "../../data/mockData";

export default function Analytics() {
  const { orders, products } = useOutletContext();
  const byStatus = ORDER_STATUSES.map((s) => ({
    status: s,
    count: orders.filter((o) => o.status === s).length,
  }));
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const topProducts = [...products].sort((a, b) => b.sold * b.price - a.sold * a.price).slice(0, 5);

  return (
    <>
      <div>
        <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Analytics</h1>
        <p className="text-sm mt-1 text-neutral-400 font-serif">A closer look at revenue and order health.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {byStatus.map((b) => {
          const s = statusStyle(b.status);
          return (
            <GlassCard key={b.status}>
              <div className="p-5 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-[0.18em] text-neutral-500 font-serif">{b.status} orders</span>
                <span className="font-display text-3xl text-white">{b.count}</span>
                <Pill color={s.color} bg={s.bg} border={s.border}>{orders.length ? Math.round((b.count / orders.length) * 100) : 0}% of total</Pill>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard>
        <div className="p-5">
          <h2 className="font-display italic text-base font-semibold text-white mb-4">Revenue leaders</h2>
          <div className="flex flex-col gap-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-600 w-5">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-serif text-white truncate">{p.name}</p>
                  <div className="h-1.5 rounded-full bg-white/[0.06] mt-1.5 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                      style={{ width: `${Math.min(100, (p.sold * p.price / (totalRevenue || 1)) * 300)}%` }}
                    />
                  </div>
                </div>
                <span className="font-mono text-sm text-white">${(p.sold * p.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </>
  );
}

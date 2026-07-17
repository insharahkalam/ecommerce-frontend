import React, { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { Filter, MoreHorizontal, Check, Trash2 } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import SearchInput from "../../components/SearchInput";
import { statusStyle } from "../../utils/badgeStyles";
import { ORDER_STATUSES } from "../../data/mockData";

export default function Order() {
  const { orders, setOrders } = useOutletContext();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        o.id.toLowerCase().includes(query.toLowerCase()) ||
        o.customer.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  function updateStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setOpenMenuId(null);
  }

  function removeOrder(id) {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Orders</h1>
          <p className="text-sm mt-1 text-neutral-400 font-serif">{orders.length} total orders</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SearchInput value={query} onChange={setQuery} placeholder="Search order ID or customer…" />
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} color="#A3A3A3" />
          {["All", ...ORDER_STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-serif border transition-colors"
              style={{
                background: statusFilter === s ? "rgba(249,115,22,0.14)" : "transparent",
                color: statusFilter === s ? "#FB923C" : "#A3A3A3",
                borderColor: statusFilter === s ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.1)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <GlassCard>
        <div className="p-5">
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
                {filtered.map((o) => {
                  const s = statusStyle(o.status);
                  return (
                    <tr key={o.id} className="border-t border-white/10 relative">
                      <td className="py-3 font-mono text-white">{o.id}</td>
                      <td className="py-3 font-serif text-white">{o.customer}</td>
                      <td className="py-3 font-mono text-neutral-400">{o.items}</td>
                      <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
                      <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
                      <td className="py-3 font-mono text-neutral-500">{o.date}</td>
                      <td className="py-3 text-right relative">
                        <button onClick={() => setOpenMenuId(openMenuId === o.id ? null : o.id)}>
                          <MoreHorizontal size={16} color="#A3A3A3" />
                        </button>
                        {openMenuId === o.id && (
                          <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border border-white/10 bg-neutral-900 shadow-xl overflow-hidden">
                            {ORDER_STATUSES.map((s2) => (
                              <button
                                key={s2}
                                onClick={() => updateStatus(o.id, s2)}
                                className="w-full text-left px-3 py-2 text-xs font-serif text-neutral-300 hover:bg-white/5 flex items-center justify-between"
                              >
                                Mark {s2}
                                {o.status === s2 && <Check size={12} color="#FB923C" />}
                              </button>
                            ))}
                            <button
                              onClick={() => { removeOrder(o.id); setOpenMenuId(null); }}
                              className="w-full text-left px-3 py-2 text-xs font-serif text-red-400 hover:bg-white/5 flex items-center gap-1.5 border-t border-white/10"
                            >
                              <Trash2 size={12} /> Delete order
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-neutral-500 font-serif text-sm">No orders match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </>
  );
}

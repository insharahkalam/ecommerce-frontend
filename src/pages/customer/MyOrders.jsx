import React, { useState, useEffect } from "react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import { statusStyle, paymentStatusStyle } from "../../utils/badgeStyles";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await api.get(`${ORDERS_API_URL}/my-orders`);
                if (!cancelled) setOrders(res.data.orders || []);
            } catch (err) {
                console.error("Failed to load orders:", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    if (loading) return <p className="text-neutral-500 font-serif text-sm">Loading…</p>;
    if (orders.length === 0) return <p className="text-neutral-500 font-serif text-sm">You haven't placed any orders yet.</p>;

    return (
        <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="font-display italic text-2xl font-semibold text-white">My orders</h1>
            {orders.map((o) => {
                const s = statusStyle(o.status);
                const ps = paymentStatusStyle(o.paymentStatus);
                return (
                    <GlassCard key={o._id}>
                        <div className="p-5 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-xs text-neutral-500">#{o._id.slice(-8)}</span>
                                <span className="font-mono text-xs text-neutral-500">
                                    {new Date(o.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                {o.items.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm font-serif">
                                        <span className="text-neutral-300">{item.title} × {item.quantity}</span>
                                        <span className="text-white font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill>
                                <Pill color={ps.color} bg={ps.bg} border={ps.border}>{o.paymentMethod} · {o.paymentStatus}</Pill>
                            </div>
                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                <span className="text-sm font-serif text-neutral-400">Total</span>
                                <span className="font-mono text-white">${o.totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    );
}
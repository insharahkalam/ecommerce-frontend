import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import { statusStyle, paymentStatusStyle } from "../../utils/badgeStyles";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState("All");

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
        return () => {
            cancelled = true;
        };
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col gap-3 max-w-3xl">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 rounded-xl bg-white/[0.03] border border-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <Package size={28} color="#525252" />
                </div>
                <div>
                    <p className="font-display italic text-xl text-white">No orders yet</p>
                    <p className="font-serif text-sm text-neutral-500 mt-1">
                        When you place an order, it'll show up here.
                    </p>
                </div>
                <Link
                    to="/shop"
                    className="mt-2 inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-serif"
                >
                    Start shopping →
                </Link>
            </div>
        );
    }

    const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
    const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

    return (
        <div className="flex flex-col gap-5 max-w-3xl">
            <div>
                <h1 className="font-display italic text-3xl font-semibold text-white">My orders</h1>
                <p className="font-serif text-sm text-neutral-500 mt-1">
                    {orders.length} total orders
                </p>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
                {filters.map((f) => {
                    const active = filter === f;
                    return (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className="px-3 py-1.5 rounded-full text-xs font-serif border transition-colors"
                            style={{
                                background: active ? "rgba(249,115,22,0.14)" : "transparent",
                                color: active ? "#FB923C" : "#A3A3A3",
                                borderColor: active ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.1)",
                            }}
                        >
                            {f}
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <p className="text-neutral-500 font-serif text-sm">No orders in this category.</p>
            )}

            {filtered.map((o) => {
                const s = statusStyle(o.status);
                const ps = paymentStatusStyle(o.paymentStatus);
                const isOpen = expanded === o._id;
                const totalItems = o.items.reduce((n, i) => n + i.quantity, 0);

                return (
                    <GlassCard key={o._id}>
                        <div className="p-5 flex flex-col gap-4">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 flex-wrap">
                                <div>
                                    <p className="font-mono text-xs text-neutral-500">
                                        ORDER #{o._id.slice(-8).toUpperCase()}
                                    </p>
                                    <p className="font-serif text-sm text-neutral-300 mt-0.5">
                                        {new Date(o.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                        <span className="text-neutral-600"> · </span>
                                        {totalItems} {totalItems === 1 ? "item" : "items"}
                                    </p>
                                </div>
                                <span className="font-mono text-lg text-white">
                                    ${o.totalAmount.toFixed(2)}
                                </span>
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill>
                                <Pill color={ps.color} bg={ps.bg} border={ps.border}>
                                    {o.paymentMethod} · {o.paymentStatus}
                                </Pill>
                            </div>

                            {/* Preview thumbnails */}
                            <div className="flex items-center gap-2">
                                {o.items.slice(0, 4).map((i, idx) => (
                                    <div
                                        key={idx}
                                        className="w-12 h-12 rounded-lg overflow-hidden ring-1 ring-white/10 bg-white/[0.04]"
                                    >
                                        {i.image ? (
                                            <img src={i.image} alt={i.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <ShoppingBag size={14} color="#525252" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {o.items.length > 4 && (
                                    <span className="text-xs font-mono text-neutral-500">
                                        +{o.items.length - 4}
                                    </span>
                                )}
                            </div>

                            {/* Expand */}
                            <button
                                onClick={() => setExpanded(isOpen ? null : o._id)}
                                className="flex items-center justify-center gap-1.5 text-xs font-serif text-neutral-400 hover:text-orange-300 transition-colors pt-2 border-t border-white/10"
                            >
                                {isOpen ? "Hide details" : "View details"}
                                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {isOpen && (
                                <div className="flex flex-col gap-1.5 pt-1">
                                    {o.items.map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between text-sm font-serif py-1"
                                        >
                                            <span className="text-neutral-300">
                                                {item.title}{" "}
                                                <span className="text-neutral-500 font-mono text-xs">
                                                    × {item.quantity}
                                                </span>
                                            </span>
                                            <span className="text-white font-mono text-xs">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </GlassCard>
                );
            })}
        </div>
    );
}

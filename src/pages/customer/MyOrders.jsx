import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Package, ChevronDown, ChevronUp, ShoppingBag, Clock, Boxes, Truck, CheckCircle2, XCircle, Receipt, Wallet, LifeBuoy, } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import { statusStyle, paymentStatusStyle } from "../../utils/badgeStyles";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";
import pusherClient from "../../config/pusher";
import { useAuth } from "../../context/AuthContext";


/* Fulfillment pipeline — drives the tracker on every order row. */
const FLOW = [
    { key: "Pending", label: "Order placed", icon: Clock },
    { key: "Processing", label: "Preparing", icon: Boxes },
    { key: "Shipped", label: "In transit", icon: Truck },
    { key: "Delivered", label: "Delivered", icon: CheckCircle2 },
];

const ACCENT = "#FB923C";

// Formats a number as Pakistani Rupees, e.g. Rs. 12,500
const formatPKR = (amount) =>
    `Rs. ${Number(amount).toLocaleString("en-PK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;

/* ---------------- Progress tracker (vertical on mobile, horizontal on sm+) --------------- */
function OrderProgress({ status }) {
    if (status === "Cancelled") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/[0.06] px-3.5 py-2.5">
                <XCircle size={15} className="text-rose-400 shrink-0" />
                <span className="font-serif text-xs text-rose-300/90">
                    This order was cancelled. Any amount charged is refunded to the original method.
                </span>
            </div>
        );
    }

    const idx = FLOW.findIndex((s) => s.key === status);
    const activeIdx = idx === -1 ? 0 : idx;

    return (
        <div className="flex items-start w-full">
            {FLOW.map((step, i) => {
                const Icon = step.icon;
                const done = i <= activeIdx;
                const current = i === activeIdx;
                const isLast = i === FLOW.length - 1;
                return (
                    <React.Fragment key={step.key}>
                        <div className="flex flex-col items-center gap-2 shrink-0 w-[68px] sm:w-[88px]">
                            <span className="relative flex items-center justify-center">
                                {current && (
                                    <span
                                        className="absolute inset-0 rounded-full animate-ping"
                                        style={{ background: "rgba(251,146,60,0.25)" }}
                                    />
                                )}
                                <span
                                    className="relative w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300"
                                    style={{
                                        background: done ? "rgba(251,146,60,0.14)" : "rgba(255,255,255,0.03)",
                                        borderColor: done ? "rgba(251,146,60,0.55)" : "rgba(255,255,255,0.10)",
                                    }}
                                >
                                    <Icon size={14} color={done ? ACCENT : "#525252"} />
                                </span>
                            </span>
                            <span
                                className="font-serif text-[10.5px] leading-tight text-center tracking-wide"
                                style={{ color: done ? "#D4D4D4" : "#525252" }}
                            >
                                {step.label}
                            </span>
                        </div>
                        {!isLast && (
                            <div
                                className="h-px flex-1 mt-4 transition-colors duration-300"
                                style={{
                                    background:
                                        i < activeIdx ? "rgba(251,146,60,0.5)" : "rgba(255,255,255,0.08)",
                                }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
}

/* ------------------------------- Small building blocks ------------------------------- */
function StatTile({ icon: Icon, label, value, hint }) {
    return (
        <div className="flex-1 min-w-[150px] rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3.5">
            <div className="flex items-center gap-1.5 text-neutral-500">
                <Icon size={13} />
                <span className="font-serif text-[11px] uppercase tracking-[0.14em]">{label}</span>
            </div>
            <p className="font-mono text-xl text-white mt-2 leading-none">{value}</p>
            {hint && <p className="font-serif text-[11px] text-neutral-600 mt-1.5">{hint}</p>}
        </div>
    );
}

function OrderCardSkeleton() {
    return <div className="h-44 rounded-2xl bg-white/[0.03] border border-white/5 animate-pulse" />;
}

/* -------------------------------------- Page -------------------------------------- */
export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(null);
    const [filter, setFilter] = useState("All");
    const { user } = useAuth();
    const userId = user?._id || user?.id;

    useEffect(() => {
        if (!userId) return;
        console.log("Frontend userId:", userId);

        pusherClient.connection.bind("connected", () => {
            console.log("✅ Pusher connected");
        });
        pusherClient.connection.bind("error", (err) => {
            console.log("❌ Pusher connection error:", err);
        });

        const channel = pusherClient.subscribe(`user-${userId}`);

        channel.bind("pusher:subscription_succeeded", () => {
            console.log("✅ Subscribed to channel:", `user-${userId}`);
        });
        channel.bind("pusher:subscription_error", (err) => {
            console.log("❌ Subscription error:", err);
        });

        channel.bind("order-updated", (data) => {
            console.log("📩 Event received:", data);
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === data.orderId
                        ? { ...o, status: data.status, paymentStatus: data.paymentStatus }
                        : o
                )
            );
        });

        return () => {
            pusherClient.unsubscribe(`user-${userId}`);
        };
    }, [userId]);


    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await api.get(`${ORDERS_API_URL}/myOrders`);
                if (!cancelled) setOrders(res.data.order || []);
            } catch (err) {
                console.error("Failed to load orders:", err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => {
            cancelled = true;
        };
    }, []);

    const filters = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    const counts = useMemo(() => {
        const c = { All: orders.length };
        filters.slice(1).forEach((f) => {
            c[f] = orders.filter((o) => o.status === f).length;
        });
        return c;
    }, [orders]);

    const totalSpent = useMemo(
        () => orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
        [orders]
    );

    const activeCount = useMemo(
        () => orders.filter((o) => ["Pending", "Processing", "Shipped"].includes(o.status)).length,
        [orders]
    );

    const filtered = filter === "All" ? orders : orders.filter((o) => o.status === filter);

    /* ------------------------------- Loading ------------------------------- */
    if (loading) {
        return (
            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                <div className="h-10 w-56 rounded-lg bg-white/[0.03] animate-pulse" />
                <div className="h-20 rounded-2xl bg-white/[0.03] animate-pulse" />
                {[1, 2, 3].map((i) => (
                    <OrderCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    /* -------------------------------- Empty -------------------------------- */
    if (orders.length === 0) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="rounded-3xl border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center flex flex-col items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                        <Package size={26} color="#525252" />
                    </div>
                    <div>
                        <p className="font-display italic text-2xl text-white">No orders yet</p>
                        <p className="font-serif text-sm text-neutral-500 mt-2 max-w-sm mx-auto leading-relaxed">
                            Once you place your first order, you'll be able to follow it here from
                            confirmation through to delivery — with receipts kept on file.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-500/10 px-5 py-2 text-sm font-serif text-orange-300 hover:bg-orange-500/20 transition-colors"
                    >
                        Browse the collection →
                    </Link>
                </div>
            </div>
        );
    }

    /* --------------------------------- List --------------------------------- */
    return (
        <div className="flex flex-col gap-7 max-w-6xl mx-auto">
            {/* Header */}
            <header className="flex flex-col gap-1.5">
                <span className="font-serif text-[11px] uppercase tracking-[0.22em] text-orange-400/80">
                    Order history
                </span>
                <h1 className="font-display italic text-4xl font-semibold text-white">
                    Your orders
                </h1>
                <p className="font-serif text-sm text-neutral-500 max-w-xl leading-relaxed">
                    A complete record of every purchase, with live fulfilment status, itemised
                    breakdowns and payment details — kept in one place.
                </p>
            </header>

            {/* Summary strip */}
            <div className="flex flex-wrap gap-3">
                <StatTile
                    icon={Wallet}
                    label="Total spent"
                    value={formatPKR(totalSpent)}
                    hint="Across all completed and pending orders"
                />
                <StatTile
                    icon={Receipt}
                    label="Orders placed"
                    value={orders.length}
                    hint="Lifetime with your account"
                />
                <StatTile
                    icon={Truck}
                    label="In progress"
                    value={activeCount}
                    hint={activeCount ? "Currently being fulfilled" : "Nothing in transit"}
                />
            </div>

            {/* Sticky filter bar */}
            <div className="sticky top-0 z-10 -mx-1 px-1 py-2 backdrop-blur-xl">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {filters.map((f) => {
                        const active = filter === f;
                        const count = counts[f] ?? 0;
                        if (f !== "All" && count === 0) return null;
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-serif border transition-all duration-200 flex items-center gap-1.5"
                                style={{
                                    background: active ? "rgba(249,115,22,0.14)" : "transparent",
                                    color: active ? "#FB923C" : "#A3A3A3",
                                    borderColor: active
                                        ? "rgba(249,115,22,0.35)"
                                        : "rgba(255,255,255,0.1)",
                                }}
                            >
                                {f}
                                <span
                                    className="font-mono text-[10px]"
                                    style={{ color: active ? "#FDBA74" : "#737373" }}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {filtered.length === 0 && (
                <p className="text-neutral-500 font-serif text-sm py-10 text-center">
                    No orders match this status yet.
                </p>
            )}

            {/* Orders */}
            <div className="flex flex-col gap-4">
                {filtered.map((o) => {
                    const s = statusStyle(o.status);
                    const ps = paymentStatusStyle(o.paymentStatus);
                    const isOpen = expanded === o._id;
                    const totalItems = o.items.reduce((n, i) => n + i.quantity, 0);

                    return (
                        <GlassCard key={o._id}>
                            <div className="flex flex-col">
                                {/* Top bar: reference + status */}
                                <div className="flex items-center justify-between gap-3 flex-wrap px-5 sm:px-6 py-3 border-b border-white/[0.07]">
                                    <div className="flex items-center gap-2.5">
                                        <Receipt size={14} color="#737373" />
                                        <span className="font-mono text-[11px] tracking-wider text-neutral-400">
                                            #{o._id.slice(-8).toUpperCase()}
                                        </span>
                                        <span className="text-neutral-700">|</span>
                                        <span className="font-serif text-xs text-neutral-500">
                                            {new Date(o.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <Pill color={s.color} bg={s.bg} border={s.border}>
                                            {o.status}
                                        </Pill>
                                        <Pill color={ps.color} bg={ps.bg} border={ps.border}>
                                            {o.paymentMethod} · {o.paymentStatus}
                                        </Pill>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="px-5 sm:px-6 py-5 flex flex-col gap-5">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <div className="flex items-center gap-3.5">
                                            <div className="flex -space-x-3 shrink-0">
                                                {o.items.slice(0, 3).map((i, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="w-11 h-11 rounded-xl overflow-hidden ring-2 ring-[#141414] bg-white/[0.05]"
                                                    >
                                                        {i.image ? (
                                                            <img
                                                                src={i.image}
                                                                alt={i.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <ShoppingBag size={14} color="#525252" />
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {o.items.length > 3 && (
                                                    <div className="w-11 h-11 rounded-xl ring-2 ring-[#141414] bg-white/[0.06] flex items-center justify-center">
                                                        <span className="text-[11px] font-mono text-neutral-400">
                                                            +{o.items.length - 3}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-serif text-sm text-neutral-200">
                                                    {o.items[0]?.title || "Order items"}
                                                    {o.items.length > 1 && (
                                                        <span className="text-neutral-500">
                                                            {" "}
                                                            and {o.items.length - 1} more
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="font-serif text-xs text-neutral-500 mt-0.5">
                                                    {totalItems} {totalItems === 1 ? "item" : "items"} in this
                                                    order
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="font-mono text-xl text-white leading-none">
                                                {formatPKR(o.totalAmount)}
                                            </p>
                                            <p className="font-serif text-[11px] text-neutral-500 mt-1.5">
                                                order total
                                            </p>
                                        </div>
                                    </div>

                                    <OrderProgress status={o.status} />
                                </div>

                                {/* Expand */}
                                <button
                                    onClick={() => setExpanded(isOpen ? null : o._id)}
                                    className="flex items-center justify-center gap-1.5 text-xs font-serif text-neutral-400 hover:text-orange-300 transition-colors py-3 border-t border-white/[0.07]"
                                >
                                    {isOpen ? "Hide order details" : "View order details"}
                                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                </button>

                                {isOpen && (
                                    <div className="px-5 sm:px-6 pb-5 pt-1">
                                        <div className="flex items-center justify-between font-serif text-[10.5px] uppercase tracking-[0.14em] text-neutral-600 pb-2 border-b border-white/[0.06]">
                                            <span>Item</span>
                                            <span>Amount</span>
                                        </div>
                                        <div className="flex flex-col divide-y divide-white/[0.06]">
                                            {o.items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-3 py-3">
                                                    <div className="w-9 h-9 rounded-lg overflow-hidden ring-1 ring-white/10 bg-white/[0.04] shrink-0">
                                                        {item.image ? (
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <ShoppingBag size={12} color="#525252" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <span className="flex-1 text-sm font-serif text-neutral-300 truncate">
                                                        {item.title}
                                                    </span>
                                                    <span className="text-xs font-mono text-neutral-500 shrink-0">
                                                        × {item.quantity}
                                                    </span>
                                                    <span className="text-xs font-mono text-white shrink-0 w-16 text-right">
                                                        {formatPKR(item.price * item.quantity)}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/10">
                                            <span className="font-serif text-xs text-neutral-400">
                                                Total charged
                                            </span>
                                            <span className="font-mono text-sm text-white">
                                                {formatPKR(o.totalAmount)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </GlassCard>
                    );
                })}
            </div>

            {/* Support footer */}
            {filtered.length > 0 && (
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-5 py-5 flex items-center gap-4 flex-wrap">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-400/25 flex items-center justify-center shrink-0">
                        <LifeBuoy size={17} color={ACCENT} />
                    </div>
                    <div className="flex-1 min-w-[220px]">
                        <p className="font-serif text-sm text-neutral-200">Need help with an order?</p>
                        <p className="font-serif text-xs text-neutral-500 mt-1 leading-relaxed">
                            Our support team can assist with delivery updates, returns and refunds —
                            usually within one business day.
                        </p>
                    </div>
                    <Link
                        to="/shop"
                        className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-serif text-neutral-300 hover:text-orange-300 hover:border-orange-400/40 transition-colors"
                    >
                        Continue shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
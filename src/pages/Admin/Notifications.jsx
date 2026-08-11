import React, { useState, useMemo } from "react";
import {
    Bell,
    Package,
    AlertTriangle,
    UserPlus,
    Check,
    CheckCheck,
    Circle,
    BadgeCheck,
    EyeOff,
} from "lucide-react";

function GlowCard({ children, className = "" }) {
    return (
        <div
            className={
                "relative rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10 " +
                className
            }
        >
            <div className="relative overflow-hidden rounded-2xl bg-neutral-950/90 backdrop-blur-xl p-6">
                {children}
            </div>
        </div>
    );
}

// Notification "types" map to the same categories as the Settings page toggles.
const TYPE_META = {
    order: { label: "New order", icon: Package, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
    stock: { label: "Low stock", icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
    signup: { label: "New signup", icon: UserPlus, color: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/30" },
};

// Seed data — in a real app this would come from the backend.
const INITIAL_NOTIFICATIONS = [
    { id: "n1", type: "order", title: "New order #2481", message: "Bilal Ahmed placed an order worth Rs. 4,250.", time: "2m ago", read: false },
    { id: "n2", type: "stock", title: "Low stock: Denim Jacket (M)", message: "Only 3 units left in inventory.", time: "18m ago", read: false },
    { id: "n3", type: "signup", title: "New customer signup", message: "Sara Khan created an account.", time: "1h ago", read: false },
    { id: "n4", type: "order", title: "New order #2480", message: "Hamza Tariq placed an order worth Rs. 1,800.", time: "3h ago", read: true },
    { id: "n5", type: "stock", title: "Low stock: Leather Belt", message: "Only 5 units left in inventory.", time: "5h ago", read: true },
    { id: "n6", type: "signup", title: "New customer signup", message: "Usman Ali created an account.", time: "Yesterday", read: true },
    { id: "n7", type: "order", title: "New order #2479", message: "Ayesha Noor placed an order worth Rs. 6,900.", time: "Yesterday", read: false },
];

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
    const [filter, setFilter] = useState("all"); // all | unread | read

    // These mirror the toggles on the Settings page. When a category is off,
    // notifications of that type still arrive and get stored above, but they
    // are hidden from this list instead of being deleted.
    const [notifyOrders, setNotifyOrders] = useState(true);
    const [notifyStock, setNotifyStock] = useState(true);
    const [notifySignups, setNotifySignups] = useState(false);

    const categoryEnabled = {
        order: notifyOrders,
        stock: notifyStock,
        signup: notifySignups,
    };

    const visibleNotifications = useMemo(
        () => notifications.filter((n) => categoryEnabled[n.type]),
        [notifications, notifyOrders, notifyStock, notifySignups]
    );

    const hiddenCount = notifications.length - visibleNotifications.length;

    const filtered = useMemo(() => {
        if (filter === "unread") return visibleNotifications.filter((n) => !n.read);
        if (filter === "read") return visibleNotifications.filter((n) => n.read);
        return visibleNotifications;
    }, [visibleNotifications, filter]);

    const unreadCount = visibleNotifications.filter((n) => !n.read).length;

    function toggleRead(id) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
        );
    }

    function markAllRead() {
        setNotifications((prev) =>
            prev.map((n) => (categoryEnabled[n.type] ? { ...n, read: true } : n))
        );
    }

    return (
        <div className="relative min-h-screen text-white font-sans antialiased">
            <div
                className="pointer-events-none fixed inset-0 z-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative z-10 mx-auto ">
                <div className="mb-8 flex items-start justify-between gap-4">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-500">
                            <BadgeCheck className="h-3.5 w-3.5" /> Admin console
                        </span>
                        <h1 className="mt-3 font-serif italic text-3xl font-bold tracking-tight text-white">
                            Notifications
                        </h1>
                        <p className="mt-1 text-sm text-neutral-400">
                            {unreadCount > 0
                                ? `You have ${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}.`
                                : "You're all caught up."}
                        </p>
                    </div>
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-500">
                        <Bell className="h-5 w-5" />
                    </div>
                </div>

                <GlowCard className="mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 p-1">
                            {[
                                { key: "all", label: "All" },
                                { key: "unread", label: "Unread" },
                                { key: "read", label: "Read" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key)}
                                    className={
                                        "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors " +
                                        (filter === tab.key
                                            ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow shadow-orange-500/20"
                                            : "text-neutral-400 hover:text-white")
                                    }
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={markAllRead}
                            disabled={unreadCount === 0}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 px-3 py-1.5 text-xs font-medium text-neutral-300 transition hover:border-orange-500/40 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <CheckCheck className="h-3.5 w-3.5" />
                            Mark all as read
                        </button>
                    </div>
                </GlowCard>

                {hiddenCount > 0 && (
                    <div className="mb-6 flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-xs text-neutral-400">
                        <EyeOff className="h-3.5 w-3.5 shrink-0 text-neutral-500" />
                        {hiddenCount} notification{hiddenCount === 1 ? "" : "s"} muted by your notification settings — they still arrived, just hidden here.
                    </div>
                )}

                <GlowCard>
                    {filtered.length === 0 ? (
                        <div className="py-10 text-center">
                            <Bell className="mx-auto h-8 w-8 text-neutral-700" />
                            <p className="mt-3 text-sm text-neutral-400">Nothing to show here.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-neutral-800">
                            {filtered.map((n) => {
                                const meta = TYPE_META[n.type];
                                const Icon = meta.icon;
                                return (
                                    <li key={n.id}>
                                        <button
                                            type="button"
                                            onClick={() => toggleRead(n.id)}
                                            className={
                                                "flex w-full items-start gap-3 px-1 py-4 text-left transition hover:bg-neutral-900/40 " +
                                                (n.read ? "opacity-60" : "")
                                            }
                                        >
                                            <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${meta.border} ${meta.bg} ${meta.color}`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="truncate text-sm font-medium text-white">{n.title}</p>
                                                    {!n.read && <Circle className="h-2 w-2 shrink-0 fill-orange-500 text-orange-500" />}
                                                </div>
                                                <p className="mt-0.5 text-xs text-neutral-400">{n.message}</p>
                                                <p className="mt-1.5 text-[11px] text-neutral-500">{n.time}</p>
                                            </div>
                                            <span
                                                className={
                                                    "mt-1 shrink-0 rounded-full p-1.5 " +
                                                    (n.read ? "text-neutral-600" : "text-neutral-500 hover:text-orange-500")
                                                }
                                                title={n.read ? "Mark as unread" : "Mark as read"}
                                            >
                                                <Check className="h-3.5 w-3.5" />
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </GlowCard>
            </div>
        </div>
    );
}
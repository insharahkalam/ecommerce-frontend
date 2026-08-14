import React, { useState, useEffect, useCallback } from "react";
import {
    Bell,
    Package,
    AlertTriangle,
    UserPlus,
    Circle,
    BadgeCheck,
} from "lucide-react";
import api from "../../config/axios";
import pusherClient from "../../config/pusher";
import { NOTIFICATION_API_URL } from "../../data/mockData";

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

const TYPE_META = {
    order: { label: "New order", icon: Package, color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/40" },
    low_stock: { label: "Low stock", icon: AlertTriangle, color: "text-amber-300", bg: "bg-amber-400/15", border: "border-amber-400/40" },
    new_customer: { label: "New signup", icon: UserPlus, color: "text-sky-300", bg: "bg-sky-400/15", border: "border-sky-400/40" },
};

function timeAgo(dateStr) {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 172800) return "Yesterday";
    return new Date(dateStr).toLocaleDateString();
}

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await api.get(NOTIFICATION_API_URL, { withCredentials: true });
                setNotifications(res.data.notifications);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();

        api.patch(`${NOTIFICATION_API_URL}/read-all`, {}, { withCredentials: true })
            .then(() => {
                window.dispatchEvent(new CustomEvent("notifications-read", { detail: { count: 0 } }));
            })
            .catch(() => { });

        const channel = pusherClient.subscribe("admin-notifications");
        channel.bind("new-notification", (newNotif) => {
            setNotifications((prev) => [newNotif, ...prev]);
        });

        return () => {
            channel.unbind_all();
            pusherClient.unsubscribe("admin-notifications");
        };
    }, []);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await api.get(NOTIFICATION_API_URL, { withCredentials: true });
                setNotifications(res.data.notifications);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();

        api.patch(`${NOTIFICATION_API_URL}/read-all`, {}, { withCredentials: true }).catch(() => { });

        const channel = pusherClient.subscribe("admin-notifications");
        channel.bind("new-notification", (newNotif) => {
            setNotifications((prev) => [newNotif, ...prev]);
        });

        return () => {
            channel.unbind_all();
            pusherClient.unsubscribe("admin-notifications");
        };
    }, []);

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const markRead = useCallback(async (notif) => {
        if (notif.isRead) return;
        setNotifications((prev) =>
            prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
        );
        try {
            await api.patch(`${NOTIFICATION_API_URL}/${notif._id}/read`, {}, { withCredentials: true });
        } catch (err) {
            console.error(err);
        }
    }, []);

    if (loading) {
        return <div className="p-10 text-center text-neutral-400 font-serif">Loading notifications...</div>;
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

            <div className="relative z-10 mx-auto">
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

                <GlowCard>
                    {notifications.length === 0 ? (
                        <div className="py-10 text-center">
                            <Bell className="mx-auto h-8 w-8 text-neutral-700" />
                            <p className="mt-3 text-sm text-neutral-400">Nothing to show here.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-neutral-800">
                            {notifications.map((n) => {
                                console.log(n, "notifi show");

                                const meta = TYPE_META[n.type] || TYPE_META.order;
                                const Icon = meta.icon;
                                return (
                                    <li key={n._id}>
                                        <button
                                            type="button"
                                            onClick={() => markRead(n)}
                                            className="flex w-full items-start gap-3 px-1 py-4 text-left transition hover:bg-neutral-900/40"
                                        >
                                            <div className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${meta.border} ${meta.bg} ${meta.color}`}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="truncate text-sm font-medium text-white">{n.title}</p>
                                                    {!n.isRead && <Circle className="h-2 w-2 shrink-0 fill-orange-500 text-orange-500" />}
                                                </div>
                                                <p className="mt-0.5 text-xs text-neutral-300">{n.message}</p>
                                                <p className="mt-1.5 text-[11px] text-neutral-500">{timeAgo(n.createdAt)}</p>
                                            </div>
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
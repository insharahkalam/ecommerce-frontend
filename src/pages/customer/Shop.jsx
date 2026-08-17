import React, { useState, useEffect, useMemo } from "react";
import { X, LayoutGrid, Truck, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";
import pusherClient from "../../config/pusher";

function normalize(p) {
    return {
        id: p._id,
        name: p.title,
        price: Number(p.price) || 0,
        stock: Number(p.stock) || 0,
        discount: Number(p.discount) || 0,
        featured: !!p.featured,
        image: p.image,
        category: p.category || "uncategorized",
        sold: Number(p.sold) || 0,
        brand: p.brand || "",
        description: p.description || "",
    };
}

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");
    const [cat, setCat] = useState("all");
    const [sort, setSort] = useState("featured");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`${API_BASE_URL}/getAllProduct`);
                setProducts((res.data.getProduct || []).map(normalize));
            } catch (err) {
                console.error("Products fetch failed:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Real-time — admin ke product add/update/delete karte hi ye page bina refresh update ho jata hai
    useEffect(() => {
        const channel = pusherClient.subscribe("public-products");

        channel.bind("new-product", (data) => {
            setProducts((prev) => {
                if (prev.some((p) => p.id === data._id)) return prev;
                return [normalize(data), ...prev];
            });
        });

        channel.bind("product-updated", (data) => {
            setProducts((prev) =>
                prev.map((p) => (p.id === data._id ? normalize(data) : p))
            );
        });

        channel.bind("product-deleted", (data) => {
            setProducts((prev) => prev.filter((p) => p.id !== data._id));
        });

        return () => {
            channel.unbind_all();
            pusherClient.unsubscribe("public-products");
        };
    }, []);

    const categories = useMemo(() => {
        const map = new Map();
        products.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
        return [
            { name: "all", count: products.length },
            ...[...map].map(([name, count]) => ({ name, count })),
        ];
    }, [products]);

    const list = useMemo(() => {
        let out = products.filter((p) => {
            const okCat = cat === "all" || p.category === cat;
            const okQ = !q || p.name?.toLowerCase().includes(q.toLowerCase());
            return okCat && okQ;
        });
        const priceOf = (p) => (p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price);
        if (sort === "low") out = [...out].sort((a, b) => priceOf(a) - priceOf(b));
        else if (sort === "high") out = [...out].sort((a, b) => priceOf(b) - priceOf(a));
        else if (sort === "discount") out = [...out].sort((a, b) => b.discount - a.discount);
        else out = [...out].sort((a, b) => Number(b.featured) - Number(a.featured));
        return out;
    }, [products, q, cat, sort]);

    const CategoryList = ({ onPick }) => (
        <ul className="space-y-1">
            {categories.map((c) => (
                <li key={c.name}>
                    <button
                        onClick={() => { setCat(c.name); onPick?.(); }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-serif text-sm capitalize transition-colors ${cat === c.name
                            ? "bg-orange-500/15 text-orange-400"
                            : "text-text-muted hover:bg-hover hover:text-text"
                            }`}
                    >
                        <span>{c.name === "all" ? "All products" : c.name}</span>
                        <span className="text-xs text-text-muted">{c.count}</span>
                    </button>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="min-h-screen bg-bg text-text">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
                {/* Hero */}
                <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-hover to-transparent p-6 sm:p-10">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 font-serif text-xs text-orange-400">
                        <Sparkles size={12} /> New season drop
                    </span>
                    <h1 className="mt-4 font-display text-3xl font-semibold italic sm:text-5xl">Shop the collection</h1>
                    <p className="mt-2 max-w-lg font-serif text-sm text-text-muted">
                        {products.length} curated pieces — {list.length} showing right now.
                    </p>
                    <div className="mt-6 max-w-md">
                        <SearchInput value={q} onChange={setQ} placeholder="Search products…" />
                    </div>
                </div>

                {/* Trust strip */}
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {[
                        { icon: Truck, label: "Fast Delivery" },
                        { icon: RotateCcw, label: "7-day returns" },
                        { icon: ShieldCheck, label: "Secure payment" },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-3">
                            <Icon size={16} className="shrink-0 text-orange-400" />
                            <span className="font-serif text-[11px] text-text-muted sm:text-xs">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex gap-8">
                    {/* Desktop sidebar */}
                    <aside className="hidden w-56 shrink-0 lg:block">
                        <div className="sticky top-24">
                            <h3 className="mb-3 font-serif text-xs uppercase tracking-widest text-text-muted">Categories</h3>
                            <CategoryList />
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        {/* Mobile: sirf drawer trigger + "All" + currently active category dikhega,
                            baaki poori list drawer (sidebar) ke andar hi rahegi */}
                        <div className="-mx-4 mb-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 lg:hidden">
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-hover px-3 py-1.5 font-serif text-xs hover:bg-hover transition-colors"
                            >
                                <LayoutGrid size={13} /> Categories
                            </button>

                            <div className="h-4 w-px shrink-0 bg-border" />

                            <button
                                onClick={() => setCat("all")}
                                className={`shrink-0 rounded-full px-3 py-1.5 font-serif text-xs capitalize transition-colors ${cat === "all" ? "bg-orange-500 text-white" : "border border-border text-text-muted"
                                    }`}
                            >
                                All
                            </button>

                            {cat !== "all" && (
                                <button
                                    onClick={() => setDrawerOpen(true)}
                                    className="flex shrink-0 items-center gap-1.5 rounded-full bg-orange-500 px-3 py-1.5 font-serif text-xs capitalize text-white"
                                >
                                    {cat}
                                    <X
                                        size={12}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCat("all");
                                        }}
                                    />
                                </button>
                            )}
                        </div>

                        {/* Sort bar */}
                        <div className="mb-5 flex items-center justify-between gap-3">
                            <p className="font-serif text-xs text-text-muted">{list.length} products</p>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="rounded-lg border border-border bg-surface px-3 py-2 font-serif text-xs text-text outline-none"
                            >
                                <option value="featured">Featured</option>
                                <option value="low">Price: Low to High</option>
                                <option value="high">Price: High to Low</option>
                                <option value="discount">Biggest discount</option>
                            </select>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div key={i} className="h-72 animate-pulse rounded-2xl border border-border bg-hover" />
                                ))}
                            </div>
                        ) : list.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-border py-20 text-center">
                                <p className="font-serif text-sm text-text-muted">No products found.</p>
                                <button
                                    onClick={() => { setCat("all"); setQ(""); }}
                                    className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-serif text-xs text-white hover:bg-orange-600"
                                >
                                    Reset
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                                {list.map((p) => (
                                    <ProductCard key={p.id} p={p} onAdd={addToCart} />
                                ))}
                            </div>
                        )}

                        {/* Promo */}
                        {!loading && list.length > 0 && (
                            <div className="mt-10 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-r from-orange-500/15 to-transparent p-6 sm:p-8">
                                <h4 className="font-serif text-xl font-semibold text-text">Get 10% off your first order</h4>
                                <p className="mt-1 font-serif text-sm text-text-muted">
                                    Use code <span className="text-orange-400">WELCOME10</span> at checkout.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            {drawerOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-72 border-r border-border bg-bg p-5">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-serif text-sm uppercase tracking-widest text-text-muted">Categories</h3>
                            <button onClick={() => setDrawerOpen(false)} className="text-text"><X size={18} /></button>
                        </div>
                        <CategoryList onPick={() => setDrawerOpen(false)} />
                        <button
                            onClick={() => setDrawerOpen(false)}
                            className="mt-6 w-full rounded-xl bg-orange-500 py-2.5 font-serif text-sm text-white"
                        >
                            Show {list.length} products
                        </button>
                    </aside>
                </div>
            )}
        </div>
    );
}
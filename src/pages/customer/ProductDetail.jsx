import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Check, Star, Tag, PackageCheck } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await api.get(`${API_BASE_URL}/get-Product/${id}`);
                const p = res.data.getOne;
                if (!cancelled && p) {
                    setProduct({
                        id: p._id, name: p.title, description: p.description,
                        price: Number(p.price) || 0, stock: Number(p.stock) || 0,
                        discount: Number(p.discount) || 0, image: p.image,
                        category: p.category, brand: p.brand,
                        specifications: p.specifications || {},
                    });
                }
            } finally { if (!cancelled) setLoading(false); }
        })();
        return () => { cancelled = true; };
    }, [id]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
                <div className="aspect-square rounded-2xl bg-white/[0.04] border border-white/10" />
                <div className="flex flex-col gap-4">
                    <div className="h-4 w-24 rounded bg-white/[0.06]" />
                    <div className="h-9 w-3/4 rounded bg-white/[0.06]" />
                    <div className="h-8 w-32 rounded bg-white/[0.06]" />
                    <div className="h-20 rounded bg-white/[0.04]" />
                    <div className="h-11 rounded bg-white/[0.06]" />
                </div>
            </div>
        );
    }
    if (!product) return <p className="text-neutral-500 font-serif text-sm">Product not found.</p>;

    const discounted = product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;
    const savings = product.price - discounted;
    const specEntries = Object.entries(product.specifications);

    return (
        <div className="flex flex-col gap-8">
            {/* breadcrumb + back */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                    <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-orange-400 transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-neutral-300 truncate max-w-[160px] sm:max-w-none">{product.name}</span>
                </div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-serif text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft size={14} /> Back
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Image column */}
                <div className="md:sticky md:top-24 flex flex-col gap-3">
                    <GlassCard>
                        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden relative">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-600 font-serif text-sm">
                                    No image available
                                </div>
                            )}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                            {product.discount > 0 && (
                                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-mono font-semibold shadow-lg shadow-orange-500/30">
                                    -{product.discount}% OFF
                                </span>
                            )}

                            <div className="absolute top-4 right-4 flex flex-col gap-2">
                                <button
                                    onClick={() => setSaved((s) => !s)}
                                    className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors"
                                >
                                    <Heart size={16} className={saved ? "text-orange-400 fill-orange-400" : "text-white"} />
                                </button>
                                <button className="p-2.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:bg-black/60 transition-colors">
                                    <Share2 size={16} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Trust strip moved under image to fill the empty column space */}
                    <GlassCard>
                        <div className="grid grid-cols-3 divide-x divide-white/10">
                            {[
                                { icon: Truck, label: "Free shipping" },
                                { icon: Shield, label: "Secure pay" },
                                { icon: RotateCcw, label: "30-day returns" },
                            ].map((I) => (
                                <div key={I.label} className="flex flex-col items-center gap-1.5 text-center py-4 px-2">
                                    <I.icon size={17} className="text-orange-400" />
                                    <span className="text-[11px] font-serif text-neutral-400 leading-tight">{I.label}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                {/* Info column */}
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-orange-400">
                                <Tag size={11} /> {product.category}
                            </span>
                            {product.brand && (
                                <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">{product.brand}</span>
                            )}
                        </div>
                        <h1 className="font-display italic text-3xl sm:text-4xl font-semibold text-white leading-tight">{product.name}</h1>

                        {/* Placeholder rating row — fills the empty space under the title nicely */}
                        <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={13} className="text-orange-400 fill-orange-400" />
                                ))}
                            </div>
                            <span className="text-xs font-serif text-neutral-500">Customer favourite</span>
                        </div>

                        <p className="text-sm font-serif text-neutral-400 leading-relaxed">{product.description}</p>
                    </div>

                    <GlassCard>
                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex items-end justify-between flex-wrap gap-2">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-3xl text-white">${discounted.toFixed(2)}</span>
                                    {product.discount > 0 && (
                                        <span className="text-base font-mono text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                                    )}
                                </div>
                                {product.discount > 0 && (
                                    <span className="rounded-md bg-emerald-500/10 border border-emerald-500/25 px-2 py-1 text-[11px] font-mono text-emerald-400">
                                        You save ${savings.toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div className={`flex items-center gap-2 text-sm font-serif ${product.stock > 0 ? "text-emerald-400" : "text-red-400"}`}>
                                {product.stock > 0 ? <PackageCheck size={15} /> : <Check size={15} />}
                                {product.stock > 0 ? `In stock — ${product.stock} available` : "Out of stock"}
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                                <div className="flex items-center justify-between sm:justify-start gap-4 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04]">
                                    <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-1 hover:text-orange-400 transition-colors">
                                        <Minus size={14} color="#A3A3A3" />
                                    </button>
                                    <span className="font-mono text-sm text-white w-6 text-center">{qty}</span>
                                    <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="p-1 hover:text-orange-400 transition-colors">
                                        <Plus size={14} color="#A3A3A3" />
                                    </button>
                                </div>
                                <PrimaryButton onClick={() => addToCart(product, qty)} disabled={product.stock === 0} className="flex-1 justify-center">
                                    {product.stock === 0 ? "Out of stock" : "Add to cart"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </GlassCard>

                    {/* Sirf Specifications — description ab title ke neeche show ho rahi hai */}
                    <GlassCard>
                        <div className="p-4 sm:p-5">
                            <p className="text-xs font-serif uppercase tracking-widest text-neutral-500 mb-3.5 pb-3 border-b border-white/10">
                                Specifications
                                {specEntries.length > 0 && (
                                    <span className="ml-1.5 text-[10px] font-mono text-neutral-600">({specEntries.length})</span>
                                )}
                            </p>
                            <div className="flex flex-col">
                                {specEntries.length === 0 ? (
                                    <p className="text-sm font-serif text-neutral-500">No specifications listed.</p>
                                ) : specEntries.map(([k, v]) => (
                                    <div key={k} className="flex items-center justify-between text-sm font-serif border-b border-white/5 py-2.5 last:border-0">
                                        <span className="text-neutral-500 capitalize">{k}</span>
                                        <span className="text-neutral-200">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
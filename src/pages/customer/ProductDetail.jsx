import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";
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

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                const res = await api.get(`${API_BASE_URL}/get-Product/${id}`);
                const p = res.data.getOne;
                if (!cancelled && p) {
                    setProduct({
                        id: p._id,
                        name: p.title,
                        description: p.description,
                        price: Number(p.price) || 0,
                        stock: Number(p.stock) || 0,
                        discount: Number(p.discount) || 0,
                        image: p.image,
                        category: p.category,
                        brand: p.brand,
                        specifications: p.specifications || {},
                    });
                }
            } catch (err) {
                console.error("Failed to load product:", err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [id]);

    if (loading) return <p className="text-neutral-500 font-serif text-sm">Loading…</p>;
    if (!product) return <p className="text-neutral-500 font-serif text-sm">Product not found.</p>;

    return (
        <div className="flex flex-col gap-6 max-w-4xl">
            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-serif text-neutral-400 hover:text-white w-fit">
                <ArrowLeft size={14} /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard>
                    <div className="aspect-square w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl overflow-hidden">
                        {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                    </div>
                </GlassCard>

                <div className="flex flex-col gap-4">
                    <div>
                        <p className="font-mono text-xs text-neutral-500">{product.category}{product.brand ? ` · ${product.brand}` : ""}</p>
                        <h1 className="font-display italic text-2xl font-semibold text-white mt-1">{product.name}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="font-mono text-2xl text-white">${product.price.toFixed(2)}</span>
                        {product.discount > 0 && <span className="text-sm font-mono text-orange-400">{product.discount}% off</span>}
                    </div>

                    <p className="text-sm font-serif text-neutral-400 leading-relaxed">{product.description}</p>

                    {Object.keys(product.specifications).length > 0 && (
                        <div className="flex flex-col gap-1.5">
                            {Object.entries(product.specifications).map(([k, v]) => (
                                <div key={k} className="flex items-center justify-between text-xs font-serif border-b border-white/5 py-1.5">
                                    <span className="text-neutral-500">{k}</span>
                                    <span className="text-neutral-300">{v}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} color="#A3A3A3" /></button>
                            <span className="font-mono text-sm text-white w-6 text-center">{qty}</span>
                            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><Plus size={14} color="#A3A3A3" /></button>
                        </div>
                        <PrimaryButton
                            onClick={() => addToCart(product, qty)}
                            disabled={product.stock === 0}
                            className="flex-1 justify-center"
                        >
                            {product.stock === 0 ? "Out of stock" : "Add to cart"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
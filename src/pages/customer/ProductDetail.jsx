// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Minus, Plus, ArrowLeft } from "lucide-react";
// import GlassCard from "../../components/GlassCard";
// import PrimaryButton from "../../components/PrimaryButton";
// import SecondaryButton from "../../components/SecondaryButton";
// import { useCart } from "../../context/CartContext";
// import api from "../../config/axios";
// import { API_BASE_URL } from "../../data/mockData";

// export default function ProductDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { addToCart } = useCart();
//     const [product, setProduct] = useState(null);
//     const [qty, setQty] = useState(1);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         let cancelled = false;
//         async function load() {
//             try {
//                 const res = await api.get(`${API_BASE_URL}/get-Product/${id}`);
//                 const p = res.data.getOne;
//                 if (!cancelled && p) {
//                     setProduct({
//                         id: p._id,
//                         name: p.title,
//                         description: p.description,
//                         price: Number(p.price) || 0,
//                         stock: Number(p.stock) || 0,
//                         discount: Number(p.discount) || 0,
//                         image: p.image,
//                         category: p.category,
//                         brand: p.brand,
//                         specifications: p.specifications || {},
//                     });
//                 }
//             } catch (err) {
//                 console.error("Failed to load product:", err);
//             } finally {
//                 if (!cancelled) setLoading(false);
//             }
//         }
//         load();
//         return () => { cancelled = true; };
//     }, [id]);

//     if (loading) return <p className="text-neutral-500 font-serif text-sm">Loading…</p>;
//     if (!product) return <p className="text-neutral-500 font-serif text-sm">Product not found.</p>;

//     return (
//         <div className="flex flex-col gap-6 max-w-4xl">
//             <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-serif text-neutral-400 hover:text-white w-fit">
//                 <ArrowLeft size={14} /> Back
//             </button>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <GlassCard>
//                     <div className="aspect-square w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl overflow-hidden">
//                         {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
//                     </div>
//                 </GlassCard>

//                 <div className="flex flex-col gap-4">
//                     <div>
//                         <p className="font-mono text-xs text-neutral-500">{product.category}{product.brand ? ` · ${product.brand}` : ""}</p>
//                         <h1 className="font-display italic text-2xl font-semibold text-white mt-1">{product.name}</h1>
//                     </div>

//                     <div className="flex items-center gap-3">
//                         <span className="font-mono text-2xl text-white">${product.price.toFixed(2)}</span>
//                         {product.discount > 0 && <span className="text-sm font-mono text-orange-400">{product.discount}% off</span>}
//                     </div>

//                     <p className="text-sm font-serif text-neutral-400 leading-relaxed">{product.description}</p>

//                     {Object.keys(product.specifications).length > 0 && (
//                         <div className="flex flex-col gap-1.5">
//                             {Object.entries(product.specifications).map(([k, v]) => (
//                                 <div key={k} className="flex items-center justify-between text-xs font-serif border-b border-white/5 py-1.5">
//                                     <span className="text-neutral-500">{k}</span>
//                                     <span className="text-neutral-300">{v}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     )}

//                     <div className="flex items-center gap-3 mt-2">
//                         <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
//                             <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} color="#A3A3A3" /></button>
//                             <span className="font-mono text-sm text-white w-6 text-center">{qty}</span>
//                             <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><Plus size={14} color="#A3A3A3" /></button>
//                         </div>
//                         <PrimaryButton
//                             onClick={() => addToCart(product, qty)}
//                             disabled={product.stock === 0}
//                             className="flex-1 justify-center"
//                         >
//                             {product.stock === 0 ? "Out of stock" : "Add to cart"}
//                         </PrimaryButton>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Check } from "lucide-react";
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
    const [tab, setTab] = useState("description");
    const [loading, setLoading] = useState(true);

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

    if (loading) return <p className="text-neutral-500 font-serif text-sm">Loading…</p>;
    if (!product) return <p className="text-neutral-500 font-serif text-sm">Product not found.</p>;

    const discounted = product.discount > 0
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return (
        <div className="flex flex-col gap-6">
            {/* breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <Link to="/" className="hover:text-orange-400">Home</Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-orange-400">Shop</Link>
                <span>/</span>
                <span className="text-neutral-300 truncate">{product.name}</span>
            </div>

            <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm font-serif text-neutral-400 hover:text-white w-fit">
                <ArrowLeft size={14} /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <GlassCard>
                    <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl overflow-hidden relative">
                        {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                        {product.discount > 0 && (
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-orange-500 text-white text-sm font-mono">
                                -{product.discount}%
                            </span>
                        )}
                    </div>
                </GlassCard>

                <div className="flex flex-col gap-5">
                    <div>
                        <p className="font-mono text-xs uppercase tracking-wider text-orange-400">
                            {product.category}{product.brand ? ` · ${product.brand}` : ""}
                        </p>
                        <h1 className="font-display italic text-3xl sm:text-4xl font-semibold text-white mt-2">{product.name}</h1>
                    </div>

                    <div className="flex items-baseline gap-3">
                        <span className="font-mono text-3xl text-white">${discounted.toFixed(2)}</span>
                        {product.discount > 0 && (
                            <span className="text-lg font-mono text-neutral-500 line-through">${product.price.toFixed(2)}</span>
                        )}
                    </div>

                    <div className={`flex items-center gap-2 text-sm font-serif ${product.stock > 0 ? "text-emerald-400" : "text-red-400"}`}>
                        <Check size={14} />
                        {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
                    </div>

                    <p className="text-sm font-serif text-neutral-400 leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04]">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={14} color="#A3A3A3" /></button>
                            <span className="font-mono text-sm text-white w-6 text-center">{qty}</span>
                            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}><Plus size={14} color="#A3A3A3" /></button>
                        </div>
                        <PrimaryButton onClick={() => addToCart(product, qty)} disabled={product.stock === 0} className="flex-1 justify-center">
                            {product.stock === 0 ? "Out of stock" : "Add to cart"}
                        </PrimaryButton>
                        <button className="p-2.5 rounded-lg border border-white/10 hover:bg-white/5"><Heart size={16} className="text-neutral-300" /></button>
                        <button className="p-2.5 rounded-lg border border-white/10 hover:bg-white/5"><Share2 size={16} className="text-neutral-300" /></button>
                    </div>

                    <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                        {[
                            { icon: Truck, label: "Free shipping" },
                            { icon: Shield, label: "Secure pay" },
                            { icon: RotateCcw, label: "30-day returns" },
                        ].map((I) => (
                            <div key={I.label} className="flex flex-col items-center gap-1 text-center">
                                <I.icon size={16} className="text-orange-400" />
                                <span className="text-[11px] font-serif text-neutral-400">{I.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="mt-6">
                <div className="flex gap-6 border-b border-white/10">
                    {["description", "specifications"].map((t) => (
                        <button key={t} onClick={() => setTab(t)}
                            className={`pb-3 text-sm font-serif capitalize transition-colors ${tab === t ? "text-orange-400 border-b-2 border-orange-400" : "text-neutral-400 hover:text-white"}`}>
                            {t}
                        </button>
                    ))}
                </div>
                <div className="py-5">
                    {tab === "description" && (
                        <p className="text-sm font-serif text-neutral-300 leading-relaxed">{product.description}</p>
                    )}
                    {tab === "specifications" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            {Object.keys(product.specifications).length === 0 ? (
                                <p className="text-sm font-serif text-neutral-500">No specifications listed.</p>
                            ) : Object.entries(product.specifications).map(([k, v]) => (
                                <div key={k} className="flex items-center justify-between text-sm font-serif border-b border-white/5 py-2">
                                    <span className="text-neutral-500 capitalize">{k}</span>
                                    <span className="text-neutral-200">{v}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

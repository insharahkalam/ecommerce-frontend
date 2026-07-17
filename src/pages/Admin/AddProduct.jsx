import React, { useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { GlassCard, Pill, SearchInput, PrimaryButton } from "../components/ui.jsx";
import { stockStyle } from "../utils/styles.js";
import ProductFormModal from "./AddProductModal.jsx";

export default function AddProduct({ products, setProducts }) {
    const [query, setQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState(null);
    const [toast, setToast] = useState("");

    const filtered = products.filter(
        (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())
    );

    function openAdd() {
        setEditing(null);
        setShowModal(true);
    }

    function openEdit(p) {
        setEditing(p.id);
        setShowModal(true);
    }

    function removeProduct(id) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    }

    function handleSaved(product, meta = {}) {
        setProducts((prev) => {
            const exists = prev.some((p) => p.id === product.id);
            if (exists) return prev.map((p) => (p.id === product.id ? { ...p, ...product } : p));
            return [product, ...prev];
        });
        setShowModal(false);
        setToast(meta.offline ? "Saved locally (server unreachable)." : editing ? "Product updated." : "Product added.");
        setTimeout(() => setToast(""), 2500);
    }

    const editingProduct = editing ? products.find((p) => p.id === editing) : null;

    return (
        <>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Products</h1>
                    <p className="text-sm mt-1 text-neutral-400 font-serif">{products.length} products in catalog</p>
                </div>
                <PrimaryButton onClick={openAdd}><Plus size={16} /> Add product</PrimaryButton>
            </div>

            {toast && (
                <div className="px-3 py-2 rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-300 text-xs font-serif w-fit">
                    {toast}
                </div>
            )}

            <SearchInput value={query} onChange={setQuery} placeholder="Search products or SKU…" />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => {
                    const st = stockStyle(p.stock);
                    return (
                        <GlassCard key={p.id}>
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="w-11 h-11 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                                        {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {p.featured && <Star size={14} color="#FBBF6B" className="mt-1.5" />}
                                        <button onClick={() => openEdit(p)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
                                            <Pencil size={14} />
                                        </button>
                                        <button onClick={() => removeProduct(p.id)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-red-400 transition-colors">
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-serif text-white">{p.name}</p>
                                    <p className="font-mono text-xs text-neutral-500 mt-0.5">{p.id} · {p.category}{p.brand ? ` · ${p.brand}` : ""}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-lg text-white">${p.price.toFixed(2)}</span>
                                    <Pill color={st.color} bg={st.bg} border={st.border}>{st.label === "In stock" ? `${p.stock} in stock` : st.label}</Pill>
                                </div>
                                <p className="font-mono text-xs text-neutral-500">{p.sold} sold all-time{p.discount ? ` · ${p.discount}% off` : ""}</p>
                            </div>
                        </GlassCard>
                    );
                })}
                {filtered.length === 0 && (
                    <div className="col-span-full text-center py-10 text-neutral-500 font-serif text-sm">No products match your search.</div>
                )}
            </div>

            {showModal && (
                <ProductFormModal
                    editing={editing}
                    initial={editingProduct}
                    onClose={() => setShowModal(false)}
                    onSaved={handleSaved}
                />
            )}
        </>
    );
}
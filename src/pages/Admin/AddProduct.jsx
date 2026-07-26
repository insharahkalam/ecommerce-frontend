import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Star, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import Pill from "../../components/Pill";
import SearchInput from "../../components/SearchInput";
import PrimaryButton from "../../components/PrimaryButton";
import ProductFormModal from "../../components/ProductFormModal";
import { stockStyle } from "../../utils/badgeStyles";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";

export default function AddProduct() {
  const { products, setProducts } = useOutletContext();
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null); // { message, type: "success" | "error" }

  const filtered = products.filter(
    (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())
  );

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  function openAdd() {
    setEditing(null);
    setShowModal(true);
  }

  function openEdit(p) {
    setEditing(p.id);
    setShowModal(true);
  }

  async function removeProduct(id) {
    const prevProducts = products;
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      await api.delete(`${API_BASE_URL}/delete-product/${id}`);
      showToast("Product deleted.", "success");
    } catch (err) {
      setProducts(prevProducts);
      showToast("Could not delete — server unreachable.", "error");
    }
  }

  function handleSaved(product, meta = {}) {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev.map((p) => (p.id === product.id ? { ...p, ...product } : p));
      return [product, ...prev];
    });
    setShowModal(false);
    setQuery("");
    showToast(
      meta.offline ? "Saved locally (server unreachable)." : editing ? "Product updated." : "Product added.",
      meta.offline ? "error" : "success"
    );
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
                    {p.featured && <Star size={14} color="#FBBF6B" className="fill-yellow-500" />}
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

      {/* Floating toast — overlays instead of pushing layout down */}
      {toast && (
        <div className="fixed top-5 right-5 z-[999] animate-[fadeIn_0.2s_ease]">
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-xl shadow-black/40 text-sm font-serif backdrop-blur-xl ${toast.type === "error"
              ? "border-red-500/25 bg-red-500/10 text-red-300"
              : "border-orange-500/25 bg-orange-500/10 text-orange-300"
              }`}
          >
            {toast.type === "error" ? <XCircle size={16} /> : <CheckCircle2 size={16} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
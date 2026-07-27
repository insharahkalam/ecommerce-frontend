import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import SearchInput from "../../components/SearchInput";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";

function normalizeProduct(p) {
  return {
    id: p._id,
    name: p.title,
    price: Number(p.price) || 0,
    stock: Number(p.stock) || 0,
    discount: Number(p.discount) || 0,
    featured: !!p.featured,
    image: p.image,
    category: p.category,
  };
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await api.get(`${API_BASE_URL}/getAllProduct`);
        const list = res.data.getProduct || [];
        if (!cancelled) setProducts(list.map(normalizeProduct));
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display italic text-3xl font-semibold tracking-tight text-white">Shop the collection</h1>
        <p className="text-sm mt-1 text-neutral-400 font-serif">{products.length} products available</p>
      </div>

      <SearchInput value={query} onChange={setQuery} placeholder="Search products…" />

      {loading ? (
        <p className="text-neutral-500 font-serif text-sm">Loading products…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <GlassCard key={p.id}>
              <Link to={`/product/${p.id}`} className="block">
                <div className="aspect-square w-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-t-2xl overflow-hidden">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
              </Link>
              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/product/${p.id}`} className="text-sm font-serif text-white hover:text-orange-400 transition-colors line-clamp-2">
                    {p.name}
                  </Link>
                  {p.featured && <Star size={14} color="#FBBF6B" className="flex-shrink-0 mt-0.5" />}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-lg text-white">${p.price.toFixed(2)}</span>
                  {p.discount > 0 && (
                    <span className="text-xs font-mono text-orange-400">{p.discount}% off</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(p)}
                  disabled={p.stock === 0}
                  className="mt-1 w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white text-sm font-serif transition-colors"
                >
                  {p.stock === 0 ? "Out of stock" : "Add to cart"}
                </button>
              </div>
            </GlassCard>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-10 text-neutral-500 font-serif text-sm">No products match your search.</div>
          )}
        </div>
      )}
    </div>
  );
}
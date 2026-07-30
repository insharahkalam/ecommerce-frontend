import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Sparkles } from "lucide-react";
import HeroSlider from "../../components/HeroSlider";
import ProductCard from "../../components/ProductCard";
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

const perks = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get(`${API_BASE_URL}/getAllProduct`);
        const list = res.data.getProduct || [];
        if (!cancelled) setProducts(list.map(normalizeProduct));
      } catch (e) { console.error(e); }
      finally { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const latest = products.slice(0, 8);

  return (
    <div className="flex flex-col gap-16">
      <HeroSlider />

      {/* Perks */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {perks.map((P) => (
          <div key={P.title} className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-start gap-2">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              <P.icon size={18} />
            </div>
            <h4 className="font-display text-white text-sm">{P.title}</h4>
            <p className="text-xs font-serif text-neutral-400">{P.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-xs text-orange-400 tracking-widest">HANDPICKED</p>
            <h2 className="font-display italic text-3xl font-semibold text-white mt-1">Featured Products</h2>
          </div>
          <Link to="/shop" className="text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p className="text-neutral-500 font-serif text-sm">Loading products…</p>
        ) : featured.length === 0 ? (
          <p className="text-neutral-500 font-serif text-sm">No featured products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
          </div>
        )}
      </section>

      {/* Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
        <div className="max-w-xl">
          <p className="font-mono text-xs text-white/80 tracking-widest">LIMITED TIME</p>
          <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-2">
            Summer Sale — up to 50% off
          </h2>
          <p className="mt-3 font-serif text-white/90">Refresh your wardrobe and gadgets. Ends this weekend.</p>
          <Link to="/shop?sale=1"
            className="inline-flex mt-5 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif">
            Shop the Sale
          </Link>
        </div>
      </section>

      {/* Latest */}
      <section>
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="font-mono text-xs text-orange-400 tracking-widest">FRESH IN</p>
            <h2 className="font-display italic text-3xl font-semibold text-white mt-1">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {latest.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
          </div>
        )}
      </section>
    </div>
  );
}

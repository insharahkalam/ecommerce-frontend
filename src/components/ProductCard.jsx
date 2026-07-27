import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import GlassCard from "./GlassCard";

export default function ProductCard({ p, onAdd }) {
  const discounted = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
  return (
    <GlassCard>
      <Link to={`/product/${p.id}`} className="block relative group">
        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-t-2xl overflow-hidden">
          {p.image && (
            <img src={p.image} alt={p.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          )}
        </div>
        {p.discount > 0 && (
          <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-orange-500 text-white text-xs font-mono">
            -{p.discount}%
          </span>
        )}
        {p.featured && (
          <span className="absolute top-3 right-3 p-1.5 rounded-md bg-black/60 backdrop-blur">
            <Star size={12} color="#FBBF6B" fill="#FBBF6B" />
          </span>
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2">
        <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">{p.category}</p>
        <Link to={`/product/${p.id}`} className="text-sm font-serif text-white hover:text-orange-400 line-clamp-2 min-h-[2.5rem]">
          {p.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-lg text-white">${discounted.toFixed(2)}</span>
          {p.discount > 0 && (
            <span className="text-xs font-mono text-neutral-500 line-through">${p.price.toFixed(2)}</span>
          )}
        </div>
        <button
          onClick={() => onAdd?.(p)}
          disabled={p.stock === 0}
          className="mt-1 w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white text-sm font-serif transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingBag size={14} />
          {p.stock === 0 ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </GlassCard>
  );
}

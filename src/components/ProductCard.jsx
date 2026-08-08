import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Flame, BadgePercent } from "lucide-react";
import GlassCard from "./GlassCard";

function fakeRating(id = "") {
  let h = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const rating = (3.6 + (h % 14) / 10).toFixed(1);
  const reviews = 12 + (h % 480);
  return { rating: Number(rating), reviews };
}

function formatSold(n = 0) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

function formatPKR(n = 0) {
  return `Rs ${Math.round(n).toLocaleString("en-PK")}`;
}

export default function ProductCard({ p, onAdd }) {
  const discounted = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
  const { rating, reviews } = fakeRating(p.id);
  const lowStock = p.stock > 0 && p.stock <= 5;
  const outOfStock = p.stock === 0;

  return (
    <GlassCard className="group/card flex h-full flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <Link to={`/product/${p.id}`} className="relative block overflow-hidden">
        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag size={32} className="text-neutral-600" />
            </div>
          )}
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
              <BadgePercent size={12} />
              {p.discount}% OFF
            </span>
          )}
          {lowStock && (
            <span className="rounded-lg bg-red-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              Only {p.stock} left
            </span>
          )}
        </div>

        {p.featured && (
          <span className="absolute right-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-300 backdrop-blur-sm">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          {p.category}
        </p>

        <Link
          to={`/product/${p.id}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-white transition-colors hover:text-orange-400"
        >
          {p.name}
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                className={i <= Math.round(rating) ? "text-amber-400" : "text-neutral-700"}
                fill={i <= Math.round(rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-neutral-300">{rating.toFixed(1)}</span>
          <span className="text-[11px] text-neutral-600">({reviews} reviews)</span>
        </div>

        <div className="my-0.5 h-px bg-white/5" />

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">
              {formatPKR(discounted)}
            </span>
            {p.discount > 0 && (
              <span className="text-[11px] text-neutral-500 line-through">
                {formatPKR(p.price)}
              </span>
            )}
          </div>

          {p.sold > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-neutral-500">
              <Flame size={12} className="text-orange-400" />
              {formatSold(p.sold)} sold
            </span>
          )}
        </div>

        <button
          onClick={() => onAdd?.(p)}
          disabled={outOfStock}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          <ShoppingBag size={15} />
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </GlassCard>
  );
}

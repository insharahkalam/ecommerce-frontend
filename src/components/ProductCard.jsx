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
  const discounted =
    p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
  const { rating, reviews } = fakeRating(p.id);
  const lowStock = p.stock > 0 && p.stock <= 5;
  const outOfStock = p.stock === 0;

  return (
    <GlassCard className="group/card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      {/* Image area */}
      <Link to={`/product/${p.id}`} className="relative block">
        <div className="aspect-[4/3] w-full overflow-hidden bg-hover">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag size={28} className="text-text-muted" />
            </div>
          )}
        </div>

        {/* Top-left badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {p.discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-orange-700 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
              {p.discount}% OFF
            </span>
          )}
          {lowStock && (
            <span className="rounded-lg bg-red-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              Only {p.stock} left
            </span>
          )}
        </div>

        {/* Top-right featured badge */}
        {p.featured && (
          <span className="absolute right-2 top-2  rounded-lg bg-transparent  px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-orange-500 backdrop-blur-sm">
            Featured
          </span>
        )}

        {/* Out of stock overlay */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg/60 backdrop-blur-[2px]">
            <span className="rounded-lg bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </Link>

      {/* Content area */}
      <div className="flex flex-1 flex-col gap-0.5 p-2">

        {/* Category & Brand */}
        {(p.category || p.brand) && (
          <div className="flex items-center gap-1.5 text-[8px] sm:text-[10px] text-text-muted">
            {p.category && (
              <span className="font-medium truncate">
                {p.category}
              </span>
            )}

            {p.category && p.brand && (
              <span className="text-text-muted/40 truncate">•</span>
            )}

            {p.brand && (
              <span className="font-medium">
                {p.brand}
              </span>
            )}
          </div>
        )}

        {/* Title & Description */}
        <div className="flex flex-col gap-0.5">
          <Link
            to={`/product/${p.id}`}
            className="line-clamp-1 font-serif text-sm font-bold leading-snug text-text transition-colors hover:text-orange-400"
          >
            {p.name}
          </Link>

          {p.description && (
            <p className="line-clamp-2 text-xs text-text-muted/80">
              {p.description}
            </p>
          )}
        </div>

        {/* Rating + Reviews + Sold */}
        <div className="flex items-center gap-2">

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  size={11}
                  className={
                    i <= Math.round(rating)
                      ? "text-amber-400"
                      : "text-text-muted/40"
                  }
                  fill={
                    i <= Math.round(rating)
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>

            <span className="text-[11px] font-medium text-text-muted">
              {rating.toFixed(1)}
            </span>

            <span className="text-[11px] text-text-muted">
              ({reviews})
            </span>
          </div>

          {/* Divider */}
          {p.sold > 0 && (
            <span className="text-text-muted/30">|</span>
          )}

          {/* Sold */}
          {p.sold > 0 && (
            <span className="flex items-center gap-1 text-[8px] sm:text-[11px] text-text-muted">
              <Flame size={12} className="text-orange-400" />
              {formatSold(p.sold)} sold
            </span>
          )}
        </div>

        {/* Price + Discount */}
        <div className="flex items-center gap-2">
          <span className="font-serif font-extrabold text-text">
            {formatPKR(discounted)}
          </span>

          {p.discount > 0 && (
            <del className="text-[12px] font-serif font-bold text-red-400">
              {formatPKR(p.price)}
            </del>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => onAdd?.(p)}
          disabled={outOfStock}
          className="mt-0.5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2 text-sm font-medium text-white transition-all hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-hover disabled:text-text-muted"
        >
          <ShoppingBag size={15} />
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>

      </div>

    </GlassCard>
  );
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Sparkles, Headphones, Volume2, BatteryCharging, Cable, Star, Users, PackageCheck, Mail, CheckCircle2, } from "lucide-react";
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
    brand: p.brand || "",
    description: p.description || "",
  };
}

const perks = [
  { icon: Truck, title: "Fast Delivery", desc: "Fast & reliable delivery" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
];

const categories = [
  {
    key: "airbuds",
    title: "Airbuds",
    desc: "True wireless, all-day comfort",
    icon: Headphones,
    from: "#FB923C",
    to: "#7C2D12",
  },
  {
    key: "speakers",
    title: "Speakers",
    desc: "Room-filling sound, anywhere",
    icon: Volume2,
    from: "#F97316",
    to: "#78350F",
  },
  {
    key: "powerbanks",
    title: "Powerbanks",
    desc: "Fast charging, on the go",
    icon: BatteryCharging,
    from: "#FBBF24",
    to: "#7C2D12",
  },
  {
    key: "cables",
    title: "Cables & Chargers",
    desc: "Everything to keep it charged",
    icon: Cable,
    from: "#FDBA74",
    to: "#9A3412",
  },
];

const stats = [
  { icon: Users, value: "24K+", label: "Happy customers" },
  { icon: PackageCheck, value: "60K+", label: "Orders delivered" },
  { icon: Star, value: "4.8/5", label: "Average rating" },
  { icon: Headphones, value: "120+", label: "Audio & power SKUs" },
];

function EqBars({ className = "", bar = "w-[3px]", tall = "h-3.5" }) {
  const heights = ["40%", "100%", "65%", "85%", "50%"];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end gap-[2px] ${tall} ${className} motion-reduce:hidden`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`${bar} rounded-full bg-orange-400`}
          style={{
            height: h,
            animation: `eq 1.1s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs text-orange-400 tracking-widest uppercase">
      <EqBars />
      {children}
    </p>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="aspect-square bg-hover animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-3/4 rounded bg-hover animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-hover animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-hover animate-pulse mt-1" />
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface py-14 px-6 text-center">
      <p className="text-text-muted font-serif text-sm">{message}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display italic text-2xl sm:text-3xl font-semibold text-text mt-2 leading-tight">
          {title}
        </h2>
        {sub && (
          <p className="font-serif text-sm text-text-muted mt-2 max-w-md">
            {sub}
          </p>
        )}
      </div>
      <Link
        to="/shop"
        className="group shrink-0 text-sm font-serif text-text-muted hover:text-orange-400 flex items-center gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-4 rounded"
      >
        View all
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

function ProductGrid({ loading, items, emptyMessage, onAdd, layout = "grid" }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (items.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  if (layout === "row") {
    return (
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 py-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
        {items.map((p) => (
          <div
            key={p.id}
            className="shrink-0 w-[62vw] xs:w-64 sm:w-auto snap-start"
          >
            <ProductCard p={p} onAdd={onAdd} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} onAdd={onAdd} />
      ))}
    </div>
  );
}


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
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const latest = products.slice(0, 8);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto pb-6">
      <style>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); opacity: 0.55; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <HeroSlider />

      {/* Perks */}
      <section aria-label="Store guarantees" className="rounded-2xl border border-border bg-surface">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {perks.map((P, i) => (
            <div
              key={P.title}
              className={`flex items-center gap-3 px-5 py-5 ${i >= 2 ? "border-t md:border-t-0 border-border" : ""
                }`}
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <P.icon size={17} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-text text-sm leading-tight truncate">
                  {P.title}
                </h3>
                <p className="text-xs font-serif text-text-muted mt-0.5 truncate">
                  {P.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section aria-labelledby="category-heading">
        <div className="mb-6 sm:mb-8">
          <Eyebrow>SHOP BY CATEGORY</Eyebrow>
          <h2
            id="category-heading"
            className="font-display italic text-2xl sm:text-3xl font-semibold text-text mt-2 leading-tight"
          >
            Gear up
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.key}
                to={`/shop?category=${c.key}`}
                className="group relative shrink-0 w-[62vw] xs:w-64 sm:w-auto snap-start rounded-2xl overflow-hidden border border-black/10 aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
                style={{
                  backgroundImage: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                <Icon
                  size={60}
                  className="absolute -right-3 -top-3 text-white/15 group-hover:text-white/20 group-hover:scale-105 transition-all duration-300"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <h3 className="font-display italic text-xl text-white leading-tight">
                    {c.title}
                  </h3>
                  <p className="font-serif text-xs text-white/80 mt-1">
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-serif text-white mt-3 opacity-90 group-hover:translate-x-0.5 transition-transform duration-300">
                    Shop now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured — single scrollable row on mobile */}
      <section aria-label="Featured products">
        <SectionHeader
          eyebrow="HANDPICKED"
          title="Featured Products"
          sub="The pieces our team keeps recommending, on repeat."
        />
        <ProductGrid
          loading={loading}
          items={featured}
          emptyMessage="No featured products yet — check back soon."
          onAdd={addToCart}
          layout="row"
        />
      </section>

      {/* Trust strip */}
      <section aria-label="Store stats" className="rounded-2xl border border-border bg-surface">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center gap-1.5 px-4 py-6 ${i >= 2 ? "border-t md:border-t-0 border-border" : ""
                }`}
            >
              <s.icon size={16} className="text-orange-400" strokeWidth={1.75} />
              <p className="font-mono text-2xl text-text leading-none">{s.value}</p>
              <p className="font-serif text-xs text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner — solid orange gradient block, text intentionally stays white in both themes */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
        <BatteryCharging
          size={200}
          strokeWidth={1}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -bottom-8 text-white opacity-[0.12]"
        />
        <div className="relative max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs text-white/85 tracking-widest uppercase">
            <EqBars className="opacity-90" />
            Limited time
          </p>
          <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-3 leading-tight">
            Summer Sale — up to 50% off
          </h2>
          <p className="mt-3 font-serif text-white/90 text-sm sm:text-base">
            Refresh your audio and charging gear. Ends this weekend.
          </p>
          <Link
            to="/shop?sale=1"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Shop the Sale <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* New Arrivals — 2 per row on mobile */}
      <section aria-label="New arrivals">
        <SectionHeader
          eyebrow="FRESH IN"
          title="New Arrivals"
          sub="Just landed in the warehouse — first come, first charged."
        />
        <ProductGrid
          loading={loading}
          items={latest}
          emptyMessage="No products yet — check back soon."
          onAdd={addToCart}
          layout="grid"
        />
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // Hook this up to a real subscribe endpoint when one is available.
    setSubmitted(true);
  }

  return (
    <section className="rounded-2xl border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.08] to-transparent px-6 py-10 sm:px-12 sm:py-14 flex flex-col items-center text-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-400/25 flex items-center justify-center">
        <Mail size={18} className="text-orange-400" strokeWidth={1.75} />
      </div>
      <div>
        <h2 className="font-display italic text-2xl sm:text-3xl text-text">
          Get first access to drops
        </h2>
        <p className="font-serif text-sm text-text-muted mt-2 max-w-md">
          New airbuds, speakers and power gear, plus the occasional discount
          code. No spam.
        </p>
      </div>

      {submitted ? (
        <p className="flex items-center gap-2 text-sm font-serif text-orange-400 mt-1">
          <CheckCircle2 size={16} /> You're on the list — check your inbox soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mt-1"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full bg-hover border border-border px-4 py-2.5 text-sm font-serif text-text placeholder:text-text-muted outline-none focus:border-orange-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400/40 transition-colors"
          />
          <button
            type="submit"
            className="rounded-full bg-orange-500 hover:bg-orange-400 text-neutral-950 font-serif text-sm font-medium px-5 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
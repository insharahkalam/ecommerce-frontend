import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        title: "New Season Arrivals",
        subtitle: "Discover the latest curated picks with up to 40% off.",
        cta: "Shop Now",
        to: "/shop",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    },
    {
        title: "Tech that Impresses",
        subtitle: "Premium gadgets built for everyday brilliance.",
        cta: "Explore Tech",
        to: "/shop?category=tech",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&q=80",
    },
    {
        title: "Home Essentials",
        subtitle: "Elevate your space with timeless design.",
        cta: "Discover",
        to: "/shop?category=home",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    },
];

export default function HeroSlider() {
    const [i, setI] = useState(0);
    useEffect(() => {
        const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
        return () => clearInterval(t);
    }, []);

    const s = slides[i];
    return (
        <section className="relative w-full h-[70vh] min-h-[420px] overflow-hidden rounded-3xl">
            {slides.map((sl, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
                >
                    <img src={sl.image} alt={sl.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/60 to-transparent" />
                </div>
            ))}

            <div className="relative z-10 h-full flex items-center px-6 sm:px-12 max-w-7xl mx-auto">
                <div className="max-w-xl">
                    <p className="font-mono text-xs text-orange-400 tracking-widest mb-3">FEATURED · {String(i + 1).padStart(2, "0")}</p>
                    <h1 className="font-display italic text-4xl sm:text-6xl font-semibold text-white leading-tight">{s.title}</h1>
                    <p className="mt-4 text-base sm:text-lg font-serif text-neutral-300">{s.subtitle}</p>
                    <Link
                        to={s.to}
                        className="inline-flex mt-6 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-serif transition-colors"
                    >
                        {s.cta}
                    </Link>
                </div>
            </div>

            <button onClick={() => setI((p) => (p - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur">
                <ChevronLeft size={20} className="text-white" />
            </button>
            <button onClick={() => setI((p) => (p + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur">
                <ChevronRight size={20} className="text-white" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                    <button key={idx} onClick={() => setI(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-orange-500" : "w-4 bg-white/40"}`} />
                ))}
            </div>
        </section>
    );
}

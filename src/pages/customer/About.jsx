import React from "react";
import { Users, Target, Award, Heart } from "lucide-react";

export default function About() {
    const stats = [
        { icon: Users, value: "50K+", label: "Happy Customers" },
        { icon: Target, value: "10K+", label: "Products" },
        { icon: Award, value: "15+", label: "Awards Won" },
        { icon: Heart, value: "4.9", label: "Avg Rating" },
    ];
    return (
        <div className="flex flex-col gap-16">
            <section className="text-center max-w-3xl mx-auto pt-10">
                <p className="font-mono text-xs text-orange-400 tracking-widest">ABOUT US</p>
                <h1 className="font-display italic text-4xl sm:text-6xl font-semibold text-white mt-3">
                    Crafted with care, delivered with love
                </h1>
                <p className="mt-5 font-serif text-neutral-400 text-lg leading-relaxed">
                    We started ApnaBazar with one simple idea — bring beautifully designed,
                    honestly priced products to every home. Today, we serve customers across
                    the country with a curated collection you can truly trust.
                </p>
            </section>

            <section className="relative rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" alt="team"
                    className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((S) => (
                    <div key={S.label} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center">
                        <S.icon size={22} className="text-orange-400 mx-auto" />
                        <p className="font-display italic text-3xl text-white mt-3">{S.value}</p>
                        <p className="font-serif text-sm text-neutral-400 mt-1">{S.label}</p>
                    </div>
                ))}
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Our Mission", d: "Make premium products accessible to everyone with transparent pricing and honest service." },
                    { t: "Our Vision", d: "Become the most trusted destination for curated lifestyle goods online." },
                    { t: "Our Promise", d: "Quality you can feel, service you can rely on — every single time." },
                ].map((C) => (
                    <div key={C.t} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
                        <h3 className="font-display italic text-xl text-white">{C.t}</h3>
                        <p className="mt-2 text-sm font-serif text-neutral-400 leading-relaxed">{C.d}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

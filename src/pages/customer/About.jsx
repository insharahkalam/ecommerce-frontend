import React from "react";
import { Users, Headphones, Award, Heart } from "lucide-react";

export default function About() {
    const stats = [
        { icon: Users, value: "24K+", label: "Happy Customers" },
        { icon: Headphones, value: "120+", label: "Audio & Power SKUs" },
        { icon: Award, value: "3+", label: "Years in Business" },
        { icon: Heart, value: "4.8", label: "Avg Rating" },
    ];
    return (
        <div className="flex flex-col gap-16">
            <section className="text-center max-w-3xl mx-auto pt-10">
                <p className="font-mono text-xs text-orange-400 tracking-widest">ABOUT US</p>
                <h1 className="font-display italic text-4xl sm:text-6xl font-semibold text-text mt-3">
                    Sound and power gear, done right
                </h1>
                <p className="mt-5 font-serif text-text-muted text-lg leading-relaxed">
                    Urban Traders started with a simple frustration — good airbuds, speakers
                    and chargers were either overpriced or unreliable, rarely both good and
                    affordable. So we built a store around getting that balance right, and
                    stood behind every product we sell.
                </p>
            </section>

            <section className="relative rounded-3xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80" alt="Urban Traders workspace"
                    className="w-full h-[400px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent" />
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((S) => (
                    <div key={S.label} className="p-6 rounded-2xl border border-border bg-surface text-center">
                        <S.icon size={22} className="text-orange-400 mx-auto" />
                        <p className="font-display italic text-3xl text-text mt-3">{S.value}</p>
                        <p className="font-serif text-sm text-text-muted mt-1">{S.label}</p>
                    </div>
                ))}
            </section>

            <section className="max-w-3xl mx-auto text-center">
                <p className="font-mono text-xs text-orange-400 tracking-widest">OUR STORY</p>
                <h2 className="font-display italic text-3xl font-semibold text-text mt-3">
                    Built in Pakistan, for everyday use
                </h2>
                <p className="mt-4 font-serif text-text-muted leading-relaxed">
                    We're based out of Pakpattan, Pakistan, and we test everything we sell
                    the way you'd actually use it — airbuds on a commute, speakers at a
                    gathering, powerbanks on a long day out. If it doesn't hold up, it doesn't
                    make it onto the shelf. That's the whole standard.
                </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { t: "Our Mission", d: "Make reliable audio and charging gear affordable, with transparent pricing and no gimmicks." },
                    { t: "Our Vision", d: "Become the go-to name for audio and power accessories across Pakistan." },
                    { t: "Our Promise", d: "Every product is checked before it ships, and every order is backed by real support." },
                ].map((C) => (
                    <div key={C.t} className="p-6 rounded-2xl border border-border bg-surface">
                        <h3 className="font-display italic text-xl text-text">{C.t}</h3>
                        <p className="mt-2 text-sm font-serif text-text-muted leading-relaxed">{C.d}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}
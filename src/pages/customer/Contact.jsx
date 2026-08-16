import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);

    function submit(e) {
        e.preventDefault();
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSent(false), 3000);
    }

    const info = [
        { icon: Mail, label: "Email", value: "urbantraders036@gmail.com" },
        { icon: MapPin, label: "Address", value: "Pakpattan, Pakistan" },
    ];

    return (
        <div className="flex flex-col gap-10">
            <section className="text-center max-w-2xl mx-auto pt-8">
                <p className="font-mono text-xs text-orange-400 tracking-widest">GET IN TOUCH</p>
                <h1 className="font-display italic text-4xl sm:text-5xl font-semibold text-text mt-3">Contact us</h1>
                <p className="mt-4 font-serif text-text-muted">
                    Have a question, feedback, or business inquiry? We'd love to hear from you.
                </p>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Info cards */}
                <div className="flex flex-col gap-4">
                    {info.map((I) => (
                        <div key={I.label} className="p-5 rounded-2xl border border-border bg-surface flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                                <I.icon size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-mono uppercase tracking-wider text-text-muted">{I.label}</p>
                                <p className="text-sm font-serif text-text mt-1">{I.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <form onSubmit={submit} className="lg:col-span-2 p-6 sm:p-8 rounded-2xl border border-border bg-surface flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-mono uppercase tracking-wider text-text-muted">Name</label>
                            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="mt-1 w-full px-3 py-2.5 rounded-lg bg-hover border border-border text-sm font-serif text-text focus:outline-none focus:border-orange-500" />
                        </div>
                        <div>
                            <label className="text-xs font-mono uppercase tracking-wider text-text-muted">Email</label>
                            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="mt-1 w-full px-3 py-2.5 rounded-lg bg-hover border border-border text-sm font-serif text-text focus:outline-none focus:border-orange-500" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-text-muted">Message</label>
                        <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="mt-1 w-full px-3 py-2.5 rounded-lg bg-hover border border-border text-sm font-serif text-text focus:outline-none focus:border-orange-500 resize-none" />
                    </div>
                    <button className="self-start inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-serif transition-colors">
                        <Send size={16} /> Send message
                    </button>
                    {sent && (
                        <p className="text-sm font-serif text-emerald-400">✓ Thanks! We'll get back to you soon.</p>
                    )}
                </form>
            </section>
        </div>
    );
}
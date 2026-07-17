import React, { useState } from "react";
import { Check } from "lucide-react";
import { GlassCard, FieldLabel, TextField, PrimaryButton } from "../components/ui.jsx";

export default function Setting() {
    const [storeName, setStoreName] = useState("Ledger");
    const [email, setEmail] = useState("hello@ledgerstore.com");
    const [currency, setCurrency] = useState("USD");
    const [notifyOrders, setNotifyOrders] = useState(true);
    const [notifyStock, setNotifyStock] = useState(true);
    const [saved, setSaved] = useState(false);

    function save() {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    return (
        <>
            <div>
                <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Settings</h1>
                <p className="text-sm mt-1 text-neutral-400 font-serif">Manage your store profile and preferences.</p>
            </div>

            <GlassCard>
                <div className="p-6 flex flex-col gap-5 max-w-xl">
                    <h2 className="font-display italic text-base font-semibold text-white">Store profile</h2>
                    <div>
                        <FieldLabel>Store name</FieldLabel>
                        <TextField value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                    </div>
                    <div>
                        <FieldLabel>Contact email</FieldLabel>
                        <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <FieldLabel>Currency</FieldLabel>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white outline-none focus:border-orange-500/50 transition-colors"
                        >
                            <option className="bg-neutral-900" value="USD">USD — US Dollar</option>
                            <option className="bg-neutral-900" value="PKR">PKR — Pakistani Rupee</option>
                            <option className="bg-neutral-900" value="EUR">EUR — Euro</option>
                            <option className="bg-neutral-900" value="GBP">GBP — British Pound</option>
                        </select>
                    </div>
                </div>
            </GlassCard>

            <GlassCard>
                <div className="p-6 flex flex-col gap-4 max-w-xl">
                    <h2 className="font-display italic text-base font-semibold text-white">Notifications</h2>
                    {[
                        { label: "New order alerts", desc: "Get notified whenever a new order comes in.", value: notifyOrders, set: setNotifyOrders },
                        { label: "Low stock alerts", desc: "Get notified when a product drops below 10 units.", value: notifyStock, set: setNotifyStock },
                    ].map((row) => (
                        <div key={row.label} className="flex items-center justify-between gap-4 py-2 border-t border-white/10 first:border-t-0 first:pt-0">
                            <div>
                                <p className="text-sm font-serif text-white">{row.label}</p>
                                <p className="text-xs font-serif text-neutral-500 mt-0.5">{row.desc}</p>
                            </div>
                            <button
                                onClick={() => row.set(!row.value)}
                                className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                                style={{ background: row.value ? "#F97316" : "rgba(255,255,255,0.12)" }}
                            >
                                <span
                                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                                    style={{ left: row.value ? "22px" : "2px" }}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </GlassCard>

            <div className="flex items-center gap-3">
                <PrimaryButton onClick={save}>{saved ? <><Check size={16} /> Saved</> : "Save changes"}</PrimaryButton>
                {saved && <span className="text-xs font-serif text-neutral-500">Your changes have been saved.</span>}
            </div>
        </>
    );
}
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ArrowRight,
    Truck,
    ShieldCheck,
    RotateCcw,
    Tag,
} from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../context/CartContext";

const FREE_SHIP_THRESHOLD = 100;

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const shipping = cartTotal > FREE_SHIP_THRESHOLD ? 0 : cart.length ? 9.99 : 0;
    const tax = +(cartTotal * 0.05).toFixed(2);
    const grandTotal = +(cartTotal + shipping + tax).toFixed(2);
    const itemCount = cart.reduce((n, i) => n + i.quantity, 0);
    const remaining = Math.max(0, FREE_SHIP_THRESHOLD - cartTotal);
    const progress = Math.min(100, (cartTotal / FREE_SHIP_THRESHOLD) * 100);

    /* ---------------- Empty state ---------------- */
    if (cart.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
                <div className="relative">
                    <div className="absolute inset-0 -z-10 blur-3xl bg-orange-500/20 rounded-full" />
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                        <ShoppingBag size={30} className="text-neutral-400" />
                    </div>
                </div>

                <h1 className="mt-6 font-display italic text-2xl text-white">Your cart is empty</h1>
                <p className="mt-2 max-w-sm font-serif text-sm leading-relaxed text-neutral-500">
                    Looks like you haven’t added anything yet. Explore the latest collection and find
                    something you love.
                </p>

                <Link
                    to="/shop"
                    className="group mt-7 inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-5 py-2.5 font-serif text-sm text-orange-300 transition-all hover:border-orange-400/60 hover:bg-orange-500/20"
                >
                    Continue shopping
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        );
    }

    /* ---------------- Cart ---------------- */
    return (
        <div className="mx-auto w-full max-w-6xl px-1">
            {/* Header */}
            <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.07] pb-6">
                <div>
                    <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                        Shopping bag
                    </p>
                    <h1 className="mt-1.5 font-display italic text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Your cart
                    </h1>
                    <p className="mt-2 font-serif text-sm text-neutral-500">
                        {itemCount} {itemCount === 1 ? "item" : "items"} · {cart.length}{" "}
                        {cart.length === 1 ? "product" : "products"}
                    </p>
                </div>

                <button
                    onClick={clearCart}
                    className="rounded-full border border-white/10 px-4 py-2 font-serif text-xs text-neutral-400 transition-colors hover:border-red-400/40 hover:text-red-400"
                >
                    Clear all
                </button>
            </header>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
                {/* Items */}
                <section className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <GlassCard key={item.productId}>
                            <div className="group flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5">
                                <Link
                                    to={`/product/${item.productId}`}
                                    className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-700/30 ring-1 ring-white/10"
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                </Link>

                                <div className="min-w-0 flex-1">
                                    <Link
                                        to={`/product/${item.productId}`}
                                        className="block truncate font-serif text-[15px] text-white transition-colors hover:text-orange-300"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="mt-1 font-mono text-xs text-neutral-500">
                                        ${item.price.toFixed(2)} each
                                    </p>

                                    <div className="mt-4 flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                                                }
                                                disabled={item.quantity <= 1}
                                                aria-label="Decrease quantity"
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                                            >
                                                <Minus size={13} />
                                            </button>
                                            <span className="w-7 text-center font-mono text-xs text-white">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                                className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                                            >
                                                <Plus size={13} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-serif text-xs text-neutral-500 transition-colors hover:bg-red-500/10 hover:text-red-400"
                                        >
                                            <Trash2 size={13} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right sm:w-24">
                                    <p className="font-mono text-base text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                    {item.quantity > 1 && (
                                        <p className="mt-0.5 font-mono text-[10px] text-neutral-500">
                                            {item.quantity} × ${item.price.toFixed(2)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </GlassCard>
                    ))}

                    <Link
                        to="/shop"
                        className="group mt-1 inline-flex w-max items-center gap-2 font-serif text-sm text-neutral-400 transition-colors hover:text-orange-300"
                    >
                        <ArrowRight size={14} className="rotate-180 transition-transform group-hover:-translate-x-0.5" />
                        Continue shopping
                    </Link>
                </section>

                {/* Summary */}
                <aside className="h-max lg:sticky lg:top-6">
                    <GlassCard>
                        <div className="flex flex-col gap-5 p-6">
                            <p className="font-serif text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                                Order summary
                            </p>

                            <div className="flex flex-col gap-2.5">
                                <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
                                <Row
                                    label="Shipping"
                                    value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    highlight={shipping === 0}
                                />
                                <Row label="Estimated tax (5%)" value={`$${tax.toFixed(2)}`} />
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <div>
                                    <p className="font-serif text-sm text-neutral-300">Total</p>
                                    <p className="font-serif text-[10px] text-neutral-500">Incl. taxes</p>
                                </div>
                                <span className="font-mono text-2xl tracking-tight text-white">
                                    ${grandTotal.toFixed(2)}
                                </span>
                            </div>

                            <PrimaryButton onClick={() => navigate("/checkout")} className="justify-center">
                                Proceed to checkout <ArrowRight size={16} />
                            </PrimaryButton>

                            <div className="grid grid-cols-1 gap-2.5 border-t border-white/[0.07] pt-4">
                                <Perk icon={ShieldCheck} text="Secure encrypted checkout" />
                                <Perk icon={RotateCcw} text="30-day easy returns" />
                                <Perk icon={Tag} text="Prices include all fees" />
                            </div>
                        </div>
                    </GlassCard>
                </aside>
            </div>
        </div>
    );
}

function Row({ label, value, highlight }) {
    return (
        <div className="flex items-center justify-between font-serif text-sm">
            <span className="text-neutral-400">{label}</span>
            <span
                className={`font-mono text-xs ${highlight ? "text-orange-300" : "text-white"}`}
            >
                {value}
            </span>
        </div>
    );
}

function Perk({ icon: Icon, text }) {
    return (
        <div className="flex items-center gap-2.5 font-serif text-[11px] text-neutral-500">
            <Icon size={13} className="text-neutral-400" />
            {text}
        </div>
    );
}

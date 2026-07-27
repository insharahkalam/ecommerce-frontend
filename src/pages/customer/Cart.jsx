import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../context/CartContext";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
                <ShoppingBag size={40} color="#525252" />
                <p className="font-serif text-neutral-400">Your cart is empty.</p>
                <Link to="/" className="text-orange-400 hover:text-orange-300 text-sm font-serif">Continue shopping →</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-2xl">
            <h1 className="font-display italic text-2xl font-semibold text-white">Your cart</h1>

            <div className="flex flex-col gap-3">
                {cart.map((item) => (
                    <GlassCard key={item.productId}>
                        <div className="p-4 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                                {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-serif text-white truncate">{item.title}</p>
                                <p className="font-mono text-xs text-neutral-500 mt-0.5">${item.price.toFixed(2)} each</p>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04]">
                                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={12} color="#A3A3A3" /></button>
                                <span className="font-mono text-xs text-white w-5 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={12} color="#A3A3A3" /></button>
                            </div>
                            <span className="font-mono text-sm text-white w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                            <button onClick={() => removeFromCart(item.productId)} className="text-neutral-500 hover:text-red-400 transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </GlassCard>
                ))}
            </div>

            <GlassCard>
                <div className="p-5 flex items-center justify-between">
                    <span className="font-serif text-neutral-400">Total</span>
                    <span className="font-mono text-xl text-white">${cartTotal.toFixed(2)}</span>
                </div>
            </GlassCard>

            <PrimaryButton onClick={() => navigate("/checkout")} className="justify-center">
                Proceed to checkout
            </PrimaryButton>
        </div>
    );
}
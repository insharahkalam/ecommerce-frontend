// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
// import GlassCard from "../../components/GlassCard";
// import PrimaryButton from "../../components/PrimaryButton";
// import { useCart } from "../../context/CartContext";

// export default function Cart() {
//     const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();
//     const navigate = useNavigate();

//     if (cart.length === 0) {
//         return (
//             <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
//                 <ShoppingBag size={40} color="#525252" />
//                 <p className="font-serif text-neutral-400">Your cart is empty.</p>
//                 <Link to="/" className="text-orange-400 hover:text-orange-300 text-sm font-serif">Continue shopping →</Link>
//             </div>
//         );
//     }

//     return (
//         <div className="flex flex-col gap-6 max-w-2xl">
//             <h1 className="font-display italic text-2xl font-semibold text-white">Your cart</h1>

//             <div className="flex flex-col gap-3">
//                 {cart.map((item) => (
//                     <GlassCard key={item.productId}>
//                         <div className="p-4 flex items-center gap-4">
//                             <div className="w-16 h-16 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
//                                 {item.image && <img src={item.image} alt={item.title} className="w-full h-full object-cover" />}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <p className="text-sm font-serif text-white truncate">{item.title}</p>
//                                 <p className="font-mono text-xs text-neutral-500 mt-0.5">${item.price.toFixed(2)} each</p>
//                             </div>
//                             <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04]">
//                                 <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={12} color="#A3A3A3" /></button>
//                                 <span className="font-mono text-xs text-white w-5 text-center">{item.quantity}</span>
//                                 <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={12} color="#A3A3A3" /></button>
//                             </div>
//                             <span className="font-mono text-sm text-white w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
//                             <button onClick={() => removeFromCart(item.productId)} className="text-neutral-500 hover:text-red-400 transition-colors">
//                                 <Trash2 size={16} />
//                             </button>
//                         </div>
//                     </GlassCard>
//                 ))}
//             </div>

//             <GlassCard>
//                 <div className="p-5 flex items-center justify-between">
//                     <span className="font-serif text-neutral-400">Total</span>
//                     <span className="font-mono text-xl text-white">${cartTotal.toFixed(2)}</span>
//                 </div>
//             </GlassCard>

//             <PrimaryButton onClick={() => navigate("/checkout")} className="justify-center">
//                 Proceed to checkout
//             </PrimaryButton>
//         </div>
//     );
// }


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { useCart } from "../../context/CartContext";

export default function Cart() {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const shipping = cartTotal > 100 ? 0 : cart.length ? 9.99 : 0;
    const tax = +(cartTotal * 0.05).toFixed(2);
    const grandTotal = +(cartTotal + shipping + tax).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
                <div className="w-16 h-16 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center">
                    <ShoppingBag size={28} color="#525252" />
                </div>
                <div>
                    <p className="font-display italic text-xl text-white">Your cart is empty</p>
                    <p className="font-serif text-sm text-neutral-500 mt-1">
                        Discover our latest collection and add your favourites.
                    </p>
                </div>
                <Link
                    to="/shop"
                    className="mt-2 inline-flex items-center gap-1.5 text-orange-400 hover:text-orange-300 text-sm font-serif"
                >
                    Continue shopping <ArrowRight size={14} />
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl">
            {/* Items */}
            <div className="flex flex-col gap-5">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="font-display italic text-3xl font-semibold text-white">Your cart</h1>
                        <p className="font-serif text-sm text-neutral-500 mt-1">
                            {cart.length} {cart.length === 1 ? "item" : "items"} in your bag
                        </p>
                    </div>
                    <button
                        onClick={clearCart}
                        className="text-xs font-serif text-neutral-500 hover:text-red-400 transition-colors"
                    >
                        Clear all
                    </button>
                </div>

                <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <GlassCard key={item.productId}>
                            <div className="p-4 flex items-center gap-4">
                                <Link
                                    to={`/product/${item.productId}`}
                                    className="w-20 h-20 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500/40 to-orange-700/40 overflow-hidden ring-1 ring-white/10"
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </Link>

                                <div className="flex-1 min-w-0">
                                    <Link
                                        to={`/product/${item.productId}`}
                                        className="text-sm font-serif text-white truncate block hover:text-orange-300 transition-colors"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="font-mono text-xs text-neutral-500 mt-1">
                                        ${item.price.toFixed(2)} each
                                    </p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.04]">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.productId, Math.max(1, item.quantity - 1))
                                                }
                                                className="text-neutral-400 hover:text-white transition-colors"
                                                aria-label="Decrease"
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="font-mono text-xs text-white w-5 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                className="text-neutral-400 hover:text-white transition-colors"
                                                aria-label="Increase"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.productId)}
                                            className="flex items-center gap-1 text-xs font-serif text-neutral-500 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 size={13} /> Remove
                                        </button>
                                    </div>
                                </div>

                                <span className="font-mono text-base text-white w-20 text-right">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-6 h-max">
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <p className="text-xs font-serif uppercase tracking-widest text-neutral-500">
                            Order summary
                        </p>

                        <div className="flex flex-col gap-2 text-sm font-serif">
                            <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
                            <Row
                                label="Shipping"
                                value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                            />
                            <Row label="Tax (5%)" value={`$${tax.toFixed(2)}`} />
                        </div>

                        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                            <span className="font-serif text-neutral-300">Total</span>
                            <span className="font-mono text-xl text-white">
                                ${grandTotal.toFixed(2)}
                            </span>
                        </div>

                        <PrimaryButton
                            onClick={() => navigate("/checkout")}
                            className="justify-center mt-1"
                        >
                            Proceed to checkout <ArrowRight size={16} />
                        </PrimaryButton>

                        <Link
                            to="/shop"
                            className="text-center text-xs font-serif text-neutral-500 hover:text-orange-300 transition-colors"
                        >
                            or continue shopping
                        </Link>
                    </div>
                </GlassCard>
            </aside>
        </div>
    );
}

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-neutral-400">{label}</span>
            <span className="text-white font-mono text-xs">{value}</span>
        </div>
    );
}

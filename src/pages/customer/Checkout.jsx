import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { FieldLabel, TextField } from "../../components/FormFields";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [bankName, setBankName] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    function showToast(message, type = "error") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
            showToast("Please fill in your complete shipping address.");
            return;
        }
        if (paymentMethod === "Bank Transfer" && !transactionId.trim()) {
            showToast("Please enter your bank transfer transaction ID.");
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                items: cart.map((i) => ({
                    product: i.productId,
                    title: i.title,
                    price: i.price,
                    quantity: i.quantity,
                    image: i.image,
                })),
                totalAmount: cartTotal,
                paymentMethod,
                shippingAddress: { fullName, phone, address, city },
                ...(paymentMethod === "Bank Transfer" && {
                    bankTransferDetails: { bankName, transactionId },
                }),
            };

            await api.post(`${ORDERS_API_URL}/createOrder`, payload);

            clearCart();
            showToast("Order placed successfully!", "success");
            setTimeout(() => navigate("/my-orders"), 1200);
        } catch (err) {
            showToast(err.response?.data?.message || "Could not place order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (cart.length === 0) {
        return <p className="text-neutral-500 font-serif text-sm">Your cart is empty.</p>;
    }

    return (
        <div className="flex flex-col gap-6 max-w-xl">
            <h1 className="font-display italic text-2xl font-semibold text-white">Checkout</h1>

            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <p className="text-xs font-serif uppercase tracking-wide text-neutral-500">Shipping address</p>
                        <div>
                            <FieldLabel required>Full name</FieldLabel>
                            <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ayesha Khan" />
                        </div>
                        <div>
                            <FieldLabel required>Phone</FieldLabel>
                            <TextField value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />
                        </div>
                        <div>
                            <FieldLabel required>Address</FieldLabel>
                            <TextField value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House 12, Street 5, DHA" />
                        </div>
                        <div>
                            <FieldLabel required>City</FieldLabel>
                            <TextField value={city} onChange={(e) => setCity(e.target.value)} placeholder="Karachi" />
                        </div>
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="p-5 flex flex-col gap-3">
                        <p className="text-xs font-serif uppercase tracking-wide text-neutral-500">Payment method</p>
                        <div className="flex gap-3">
                            {["COD", "Bank Transfer"].map((m) => (
                                <button
                                    type="button"
                                    key={m}
                                    onClick={() => setPaymentMethod(m)}
                                    className="flex-1 px-3 py-2.5 rounded-lg text-sm font-serif border transition-colors"
                                    style={{
                                        background: paymentMethod === m ? "rgba(249,115,22,0.14)" : "transparent",
                                        color: paymentMethod === m ? "#FB923C" : "#A3A3A3",
                                        borderColor: paymentMethod === m ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    {m === "COD" ? "Cash on Delivery" : "Bank Transfer"}
                                </button>
                            ))}
                        </div>

                        {paymentMethod === "Bank Transfer" && (
                            <div className="flex flex-col gap-3 mt-2">
                                <div className="px-3 py-2.5 rounded-lg border border-orange-500/25 bg-orange-500/10 text-xs font-serif text-orange-300">
                                    Transfer ${cartTotal.toFixed(2)} to our account, then enter your transaction ID below. Your order will be marked "Paid" after we verify it.
                                </div>
                                <div>
                                    <FieldLabel>Bank name</FieldLabel>
                                    <TextField value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Meezan Bank" />
                                </div>
                                <div>
                                    <FieldLabel required>Transaction ID</FieldLabel>
                                    <TextField value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder="TXN123456789" />
                                </div>
                            </div>
                        )}
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="p-5 flex items-center justify-between">
                        <span className="font-serif text-neutral-400">Total to pay</span>
                        <span className="font-mono text-xl text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                </GlassCard>

                <PrimaryButton type="submit" disabled={submitting} className="justify-center">
                    {submitting ? "Placing order…" : "Place order"}
                </PrimaryButton>
            </form>

            {toast && (
                <div className="fixed top-5 right-5 z-[999]">
                    <div
                        className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-xl shadow-black/40 text-sm font-serif backdrop-blur-xl ${toast.type === "success"
                                ? "border-orange-500/25 bg-orange-500/10 text-orange-300"
                                : "border-red-500/25 bg-red-500/10 text-red-300"
                            }`}
                    >
                        {toast.type === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
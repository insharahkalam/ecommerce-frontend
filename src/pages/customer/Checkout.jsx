import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Lock, Truck, CreditCard, Copy, Check, UploadCloud, Image as ImageIcon, X, } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { FieldLabel, TextField } from "../../components/FormFields";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";

// Ye account details ek jagah rakh dein taake future me change karna easy ho
const BANK_ACCOUNT = {
    bankName: "Meezan Bank",
    accountTitle: "Insharah Kalam",
    accountNumber: "1234567890123",
};

const MAX_RECEIPT_SIZE_MB = 5;

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [transactionId, setTransactionId] = useState("");

    // Receipt upload state
    const [receiptPreview, setReceiptPreview] = useState(null); // base64 data url (bhejne ke liye)
    const [receiptName, setReceiptName] = useState("");
    const [receiptError, setReceiptError] = useState("");

    // "Maine payment kar di hai" confirmation checkbox — verification step
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const [copied, setCopied] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const shipping = cartTotal > 100 ? 0 : 9.99;
    const tax = +(cartTotal * 0.05).toFixed(2);
    const grandTotal = +(cartTotal + shipping + tax).toFixed(2);

    function showToast(message, type = "error") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function handleCopyAccountNumber() {
        navigator.clipboard.writeText(BANK_ACCOUNT.accountNumber).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        });
    }

    function handleReceiptChange(e) {
        const file = e.target.files?.[0];
        setReceiptError("");
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setReceiptError("Sirf image file (jpg, png, etc.) upload karein.");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_RECEIPT_SIZE_MB * 1024 * 1024) {
            setReceiptError(`Receipt ki size ${MAX_RECEIPT_SIZE_MB}MB se kam honi chahiye.`);
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setReceiptPreview(reader.result);
            setReceiptName(file.name);
        };
        reader.onerror = () => setReceiptError("Receipt read nahi ho saki, dobara try karein.");
        reader.readAsDataURL(file);
    }

    function handleRemoveReceipt() {
        setReceiptPreview(null);
        setReceiptName("");
        setReceiptError("");
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim()) {
            showToast("Please fill in your complete shipping address.");
            return;
        }

        if (paymentMethod === "Bank Transfer") {
            if (!transactionId.trim()) {
                showToast("Please enter your bank transfer transaction ID.");
                return;
            }
            if (!receiptPreview) {
                showToast("Please upload your payment receipt screenshot.");
                return;
            }
            if (!paymentConfirmed) {
                showToast("Please confirm that you have completed the payment.");
                return;
            }
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
                totalAmount: grandTotal,
                paymentMethod,
                shippingAddress: { fullName, phone, address, city },
                ...(paymentMethod === "Bank Transfer" && {
                    bankTransferDetails: {
                        bankName: BANK_ACCOUNT.bankName,
                        accountTitle: BANK_ACCOUNT.accountTitle,
                        accountNumber: BANK_ACCOUNT.accountNumber,
                        transactionId,
                        receiptImage: receiptPreview, // base64 data url
                    },
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
        return (
            <div className="py-20 text-center">
                <p className="font-display italic text-xl text-white">Nothing to check out</p>
                <p className="font-serif text-sm text-neutral-500 mt-2">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl">
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
                <div>
                    <h1 className="font-display italic text-3xl font-semibold text-white">Checkout</h1>
                    <p className="font-serif text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                        <Lock size={12} /> Secure & encrypted
                    </p>
                </div>

                {/* Shipping */}
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Truck size={16} className="text-orange-400" />
                            <p className="text-xs font-serif uppercase tracking-widest text-neutral-400">
                                Shipping address
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <FieldLabel required>Full name</FieldLabel>
                                <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ayesha Khan" />
                            </div>
                            <div>
                                <FieldLabel required>Phone</FieldLabel>
                                <TextField value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />
                            </div>
                            <div className="sm:col-span-2">
                                <FieldLabel required>Address</FieldLabel>
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House 12, Street 5, DHA" />
                            </div>
                            <div className="sm:col-span-2">
                                <FieldLabel required>City</FieldLabel>
                                <TextField value={city} onChange={(e) => setCity(e.target.value)} placeholder="Karachi" />
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Payment */}
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} className="text-orange-400" />
                            <p className="text-xs font-serif uppercase tracking-widest text-neutral-400">
                                Payment method
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: "COD", label: "Cash on Delivery", desc: "Pay when you receive" },
                                { id: "Bank Transfer", label: "Bank Transfer", desc: "Direct to our account" },
                            ].map((m) => {
                                const active = paymentMethod === m.id;
                                return (
                                    <button
                                        type="button"
                                        key={m.id}
                                        onClick={() => setPaymentMethod(m.id)}
                                        className="text-left p-4 rounded-xl border transition-all"
                                        style={{
                                            background: active ? "rgba(249,115,22,0.10)" : "rgba(255,255,255,0.02)",
                                            borderColor: active ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.08)",
                                        }}
                                    >
                                        <p
                                            className="text-sm font-serif"
                                            style={{ color: active ? "#FDBA74" : "#E5E5E5" }}
                                        >
                                            {m.label}
                                        </p>
                                        <p className="text-xs font-serif text-neutral-500 mt-0.5">{m.desc}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {paymentMethod === "Bank Transfer" && (
                            <div className="flex flex-col gap-4 mt-1">
                                {/* Bank details card — makes payment easy for the customer */}
                                <div className="rounded-xl border border-orange-500/25 bg-orange-500/[0.07] p-4 flex flex-col gap-3">
                                    <p className="text-xs font-serif text-orange-300">
                                        Please transfer{" "}
                                        <span className="font-mono text-orange-200">${grandTotal.toFixed(2)}</span>{" "}
                                        to the account below:
                                    </p>

                                    <div className="rounded-lg bg-black/20 divide-y divide-white/5">
                                        <DetailRow label="Bank Name" value={BANK_ACCOUNT.bankName} />
                                        <DetailRow label="Account Title" value={BANK_ACCOUNT.accountTitle} />
                                        <DetailRow
                                            label="Account Number"
                                            value={BANK_ACCOUNT.accountNumber}
                                            action={
                                                <button
                                                    type="button"
                                                    onClick={handleCopyAccountNumber}
                                                    className="flex items-center gap-1 text-[11px] font-serif text-orange-300 hover:text-orange-200 transition-colors"
                                                >
                                                    {copied ? <Check size={12} /> : <Copy size={12} />}
                                                    {copied ? "Copied" : "Copy"}
                                                </button>
                                            }
                                        />
                                    </div>

                                    <p className="text-[11px] font-serif text-neutral-500">
                                        After completing the payment, enter your transaction ID and upload a screenshot of the payment receipt below. Your order will be marked as <strong>"Paid"</strong> once the payment has been verified.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <FieldLabel required>Transaction ID</FieldLabel>
                                        <TextField
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            placeholder="TXN123456789"
                                        />
                                    </div>

                                    <div>
                                        <FieldLabel required>Payment Receipt</FieldLabel>
                                        {!receiptPreview ? (
                                            <label
                                                htmlFor="receipt-upload"
                                                className="flex items-center justify-center gap-2 h-[42px] rounded-lg border border-dashed border-white/15 bg-white/[0.02] text-xs font-serif text-neutral-400 cursor-pointer hover:border-orange-500/40 hover:text-orange-300 transition-colors"
                                            >
                                                <UploadCloud size={14} />
                                                Upload Receipt
                                                <input
                                                    id="receipt-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleReceiptChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        ) : (
                                            <div className="flex items-center gap-2 h-[42px] px-3 rounded-lg border border-white/10 bg-white/[0.03]">
                                                <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0 ring-1 ring-white/10">
                                                    <img src={receiptPreview} alt="Receipt" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-xs font-serif text-neutral-300 truncate flex-1">
                                                    {receiptName}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveReceipt}
                                                    className="text-neutral-500 hover:text-red-400 transition-colors flex-shrink-0"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                        {receiptError && (
                                            <p className="text-[11px] font-serif text-red-400 mt-1">{receiptError}</p>
                                        )}
                                    </div>
                                </div>

                                {receiptPreview && (
                                    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
                                        <ImageIcon size={14} className="text-neutral-500 flex-shrink-0" />
                                        <img
                                            src={receiptPreview}
                                            alt="Receipt Preview"
                                            className="h-16 rounded-md ring-1 ring-white/10 object-cover"
                                        />
                                        <span className="text-[11px] font-serif text-neutral-500">
                                            Receipt Preview
                                        </span>
                                    </div>
                                )}

                                {/* Verification / confirmation step */}
                                <label className="flex items-start gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={paymentConfirmed}
                                        onChange={(e) => setPaymentConfirmed(e.target.checked)}
                                        className="mt-0.5 accent-orange-500"
                                    />
                                    <span className="text-xs font-serif text-neutral-400">
                                        I confirm that I have completed the payment to the account above, and the transaction ID and receipt provided are accurate.
                                    </span>
                                </label>
                            </div>
                        )}

                    </div>
                </GlassCard>
            </form>

            {/* Summary */}
            <aside className="lg:sticky lg:top-6 h-max">
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <p className="text-xs font-serif uppercase tracking-widest text-neutral-500">
                            Order summary
                        </p>

                        <div className="flex flex-col gap-2 max-h-48 overflow-auto pr-1">
                            {cart.map((i) => (
                                <div key={i.productId} className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/[0.04] ring-1 ring-white/10 flex-shrink-0">
                                        {i.image && <img src={i.image} alt={i.title} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-serif text-white truncate">{i.title}</p>
                                        <p className="text-[10px] font-mono text-neutral-500">Qty {i.quantity}</p>
                                    </div>
                                    <span className="font-mono text-xs text-neutral-300">
                                        ${(i.price * i.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-sm font-serif">
                            <Row label="Subtotal" value={`$${cartTotal.toFixed(2)}`} />
                            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
                            <Row label="Tax (5%)" value={`$${tax.toFixed(2)}`} />
                        </div>

                        <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                            <span className="font-serif text-neutral-300">Total</span>
                            <span className="font-mono text-xl text-white">${grandTotal.toFixed(2)}</span>
                        </div>

                        <PrimaryButton
                            type="submit"
                            onClick={handlePlaceOrder}
                            disabled={submitting}
                            className="justify-center"
                        >
                            {submitting ? "Placing order…" : "Place order"}
                        </PrimaryButton>
                    </div>
                </GlassCard>
            </aside>

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

function Row({ label, value }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-neutral-400">{label}</span>
            <span className="text-white font-mono text-xs">{value}</span>
        </div>
    );
}

function DetailRow({ label, value, action }) {
    return (
        <div className="flex items-center justify-between px-3 py-2">
            <div>
                <p className="text-[10px] font-serif uppercase tracking-wide text-neutral-500">{label}</p>
                <p className="text-sm font-mono text-white">{value}</p>
            </div>
            {action}
        </div>
    );
}
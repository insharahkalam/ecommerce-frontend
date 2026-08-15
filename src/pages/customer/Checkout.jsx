import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Lock, Truck, CreditCard, Copy, Check, UploadCloud, Image as ImageIcon, X, } from "lucide-react";
import GlassCard from "../../components/GlassCard";
import PrimaryButton from "../../components/PrimaryButton";
import { FieldLabel, TextField } from "../../components/FormFields";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { ORDERS_API_URL } from "../../data/mockData";

// Keep account details here in one place so they're easy to change later
const BANK_ACCOUNT = {
    bankName: "Habib Bank Limited HBL",
    accountTitle: "ASAD ULLAH",
    accountNumber: "50207900875703",
    iban: "PK03HABB0050207900875703",
};

const EASYPAISA_ACCOUNT = {
    accountTitle: "Asadullah Munir",
    accountNumber: "03706330317",
};

const MAX_RECEIPT_SIZE_MB = 5;

// Real bank/Easypaisa transaction IDs are alphanumeric, no spaces or symbols,
// and are typically between 6 and 20 characters long.
const TRANSACTION_ID_PATTERN = /^[A-Za-z0-9]{6,20}$/;

// Formats a number as Pakistani Rupees, e.g. Rs. 12,500
const formatPKR = (amount) =>
    `Rs. ${Number(amount).toLocaleString("en-PK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })}`;

export default function Checkout() {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("Pakistan");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [transactionId, setTransactionId] = useState("");
    const [transactionIdError, setTransactionIdError] = useState("");

    // Receipt upload state
    const [receiptPreview, setReceiptPreview] = useState(null); // base64 data url (to send)
    const [receiptName, setReceiptName] = useState("");
    const [receiptError, setReceiptError] = useState("");

    // "I have made the payment" confirmation checkbox — verification step
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);

    const [copiedField, setCopiedField] = useState(""); // "account" | "iban"
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const shipping = 200;
    const tax = +(cartTotal * 0.04).toFixed(2);
    const grandTotal = +(cartTotal + shipping + tax).toFixed(2);


    const isDigitalTransfer = paymentMethod === "Bank Transfer" || paymentMethod === "Easypaisa";
    const activeAccount = paymentMethod === "Easypaisa" ? EASYPAISA_ACCOUNT : BANK_ACCOUNT;

    function showToast(message, type = "error") {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }

    function handleCopy(value, field) {
        navigator.clipboard.writeText(value).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(""), 1500);
        });
    }

    function handleReceiptChange(e) {
        const file = e.target.files?.[0];
        setReceiptError("");
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setReceiptError("Please upload an image file only (jpg, png, etc.).");
            e.target.value = "";
            return;
        }
        if (file.size > MAX_RECEIPT_SIZE_MB * 1024 * 1024) {
            setReceiptError(`Receipt size must be less than ${MAX_RECEIPT_SIZE_MB}MB.`);
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setReceiptPreview(reader.result);
            setReceiptName(file.name);
        };
        reader.onerror = () => setReceiptError("Could not read the receipt, please try again.");
        reader.readAsDataURL(file);
    }

    function handleRemoveReceipt() {
        setReceiptPreview(null);
        setReceiptName("");
        setReceiptError("");
    }

    async function handlePlaceOrder(e) {
        e.preventDefault();

        if (!fullName.trim() || !phone.trim() || !address.trim() || !city.trim() || !country.trim()) {
            showToast("Please fill in your complete shipping address.");
            return;
        }

        if (isDigitalTransfer) {
            const trimmedTxnId = transactionId.trim();
            if (!trimmedTxnId) {
                setTransactionIdError("Please enter your transaction ID.");
                showToast("Please enter your transaction ID.");
                return;
            }
            if (!TRANSACTION_ID_PATTERN.test(trimmedTxnId)) {
                setTransactionIdError(
                    "That doesn't look like a valid transaction ID (should be 6–20 letters/numbers, no spaces or symbols)."
                );
                showToast("Please enter a valid transaction ID.");
                return;
            }
            setTransactionIdError("");
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
                shippingAddress: { fullName, phone, address, city, country },
                ...(isDigitalTransfer && {
                    transferDetails: {
                        accountTitle: activeAccount.accountTitle,
                        accountNumber: activeAccount.accountNumber,
                        ...(paymentMethod === "Bank Transfer" && { iban: BANK_ACCOUNT.iban }),
                        transactionId,
                        receiptImage: receiptPreview,
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
                <p className="font-display italic text-xl text-text">Nothing to check out</p>
                <p className="font-serif text-sm text-text-muted mt-2">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 max-w-6xl">
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
                <div>
                    <h1 className="font-display italic text-3xl font-semibold text-text">Checkout</h1>
                    <p className="font-serif text-sm text-text-muted mt-1 flex items-center gap-1.5">
                        <Lock size={12} /> Secure & encrypted
                    </p>
                </div>

                {/* Shipping */}
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Truck size={16} className="text-orange-400" />
                            <p className="text-xs font-serif uppercase tracking-widest text-text-muted">
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
                            <div>
                                <FieldLabel required>City</FieldLabel>
                                <TextField value={city} onChange={(e) => setCity(e.target.value)} placeholder="Karachi" />
                            </div>
                            <div>
                                <FieldLabel required>Country</FieldLabel>
                                <TextField value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Pakistan" />
                            </div>
                            <div className="sm:col-span-2">
                                <FieldLabel required>Address</FieldLabel>
                                <TextField value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House 24, Street 7, Block B, Gulshan-e-Iqbal" />
                            </div>
                        </div>
                    </div>
                </GlassCard>

                {/* Payment */}
                <GlassCard>
                    <div className="p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <CreditCard size={16} className="text-orange-400" />
                            <p className="text-xs font-serif uppercase tracking-widest text-text-muted">
                                Payment method
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { id: "COD", label: "Cash on Delivery", desc: "Pay when you receive" },
                                { id: "Bank Transfer", label: "Bank Transfer", desc: "Direct to our account" },
                                { id: "Easypaisa", label: "Easypaisa", desc: "Mobile wallet transfer" },
                            ].map((m) => {
                                const active = paymentMethod === m.id;
                                return (
                                    <button
                                        type="button"
                                        key={m.id}
                                        onClick={() => setPaymentMethod(m.id)}
                                        className={`text-left p-4 rounded-xl border transition-all ${active
                                            ? "bg-orange-500/10 border-orange-500/40"
                                            : "bg-surface border-border"
                                            }`}
                                    >
                                        <p className={`text-sm font-serif ${active ? "text-orange-500" : "text-text"}`}>
                                            {m.label}
                                        </p>
                                        <p className="text-xs font-serif text-text-muted mt-0.5">{m.desc}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {isDigitalTransfer && (
                            <div className="flex flex-col gap-4 mt-1">
                                {/* Bank details card — makes payment easy for the customer */}
                                <div className="rounded-xl border border-orange-500/25 bg-orange-500/[0.07] p-4 flex flex-col gap-3">
                                    <p className="text-xs font-serif text-orange-500">
                                        Please transfer{" "}
                                        <span className="font-serif">{formatPKR(grandTotal)}</span>{" "}
                                        to the account below:
                                    </p>

                                    <div className="rounded-lg bg-hover divide-y divide-border">
                                        {paymentMethod === "Bank Transfer" && (
                                            <DetailRow label="Bank Name" value={BANK_ACCOUNT.bankName} />
                                        )}
                                        <DetailRow label="Account Title" value={activeAccount.accountTitle} />
                                        <DetailRow
                                            label={paymentMethod === "Easypaisa" ? "Easypaisa Number" : "Account Number"}
                                            value={activeAccount.accountNumber}
                                            action={
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopy(activeAccount.accountNumber, "account")}
                                                    className="flex items-center gap-1 text-[11px] font-serif text-orange-500 hover:text-orange-600 transition-colors"
                                                >
                                                    {copiedField === "account" ? <Check size={12} /> : <Copy size={12} />}
                                                    {copiedField === "account" ? "Copied" : "Copy"}
                                                </button>
                                            }
                                        />
                                        {paymentMethod === "Bank Transfer" && (
                                            <DetailRow
                                                label="IBAN"
                                                value={BANK_ACCOUNT.iban}
                                                action={
                                                    <button
                                                        type="button"
                                                        onClick={() => handleCopy(BANK_ACCOUNT.iban, "iban")}
                                                        className="flex items-center gap-1 text-[11px] font-serif text-orange-500 hover:text-orange-600 transition-colors"
                                                    >
                                                        {copiedField === "iban" ? <Check size={12} /> : <Copy size={12} />}
                                                        {copiedField === "iban" ? "Copied" : "Copy"}
                                                    </button>
                                                }
                                            />
                                        )}
                                    </div>

                                    {paymentMethod === "Bank Transfer" && (
                                        <p className="text-[11px] font-serif text-text-muted">
                                            Use the <strong>Account Number</strong> if transferring from the same bank. Use the <strong>IBAN</strong> for online/IBFT transfers from a different bank.
                                        </p>
                                    )}

                                    <p className="text-[11px] font-serif text-text-muted">
                                        After completing the payment, enter your transaction ID and upload a screenshot of the payment receipt below. Your order will be marked as <strong>"Paid"</strong> once the payment has been verified.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <FieldLabel required>Transaction ID</FieldLabel>
                                        <TextField
                                            value={transactionId}
                                            onChange={(e) => {
                                                setTransactionId(e.target.value);
                                                if (transactionIdError) setTransactionIdError("");
                                            }}
                                            placeholder="e.g. TXN123456789"
                                        />
                                        <p className="text-[10px] font-serif text-text-muted mt-1">
                                            6–20 letters/numbers, exactly as shown on your bank/Easypaisa receipt.
                                        </p>
                                        {transactionIdError && (
                                            <p className="text-[11px] font-serif text-danger mt-1">{transactionIdError}</p>
                                        )}
                                    </div>

                                    <div>
                                        <FieldLabel required>Payment Receipt</FieldLabel>
                                        {!receiptPreview ? (
                                            <label
                                                htmlFor="receipt-upload"
                                                className="flex items-center justify-center gap-2 h-[42px] rounded-lg border border-dashed border-border bg-surface text-xs font-serif text-text-muted cursor-pointer hover:border-orange-500/40 hover:text-orange-300 transition-colors"
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
                                            <div className="flex items-center gap-2 h-[42px] px-3 rounded-lg border border-border bg-surface">
                                                <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0 ring-1 ring-border">
                                                    <img src={receiptPreview} alt="Receipt" className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-xs font-serif text-text truncate flex-1">
                                                    {receiptName}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveReceipt}
                                                    className="text-text-muted hover:text-red-400 transition-colors flex-shrink-0"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        )}
                                        {receiptError && (
                                            <p className="text-[11px] font-serif text-danger mt-1">{receiptError}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Verification / confirmation step */}
                                <label className="flex items-start gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={paymentConfirmed}
                                        onChange={(e) => setPaymentConfirmed(e.target.checked)}
                                        className="mt-0.5 accent-orange-500"
                                    />
                                    <span className="text-xs font-serif text-text-muted">
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
                        <p className="text-xs font-serif uppercase tracking-widest text-text-muted">
                            Order summary
                        </p>

                        <div className="flex flex-col gap-2 max-h-48 overflow-auto pr-1">
                            {cart.map((i) => (
                                <div key={i.productId} className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-hover ring-1 ring-border flex-shrink-0">
                                        {i.image && <img src={i.image} alt={i.title} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-serif text-text truncate">{i.title}</p>
                                        <p className="text-[10px] font-mono text-text-muted">Qty {i.quantity}</p>
                                    </div>
                                    <span className="font-mono text-xs text-text-muted">
                                        {formatPKR(i.price * i.quantity)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-border pt-3 flex flex-col gap-2 text-sm font-serif">
                            <Row label="Subtotal" value={formatPKR(cartTotal)} />
                            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPKR(shipping)} />
                            <Row label="Tax (4%)" value={formatPKR(tax)} />
                        </div>

                        <div className="border-t border-border pt-3 flex items-center justify-between">
                            <span className="font-serif text-text">Total</span>
                            <span className="font-mono text-xl text-text">{formatPKR(grandTotal)}</span>
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
            <span className="text-text-muted">{label}</span>
            <span className="text-text font-mono text-xs">{value}</span>
        </div>
    );
}

function DetailRow({ label, value, action }) {
    return (
        <div className="flex items-center justify-between px-3 py-2">
            <div>
                <p className="text-[10px] font-serif uppercase tracking-wide text-text-muted">{label}</p>
                <p className="text-sm font-mono text-text">{value}</p>
            </div>
            {action}
        </div>
    );
}
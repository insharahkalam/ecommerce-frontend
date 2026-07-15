import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo, Field, inputClass } from "../components/Shared";
import api from "../config/axios";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (!email) return setError("Please enter your email address.");

        try {
            setLoading(true);
            const res = await api.post("/authentication/forgot-password", { email });
            console.log("forgot password:", res.data);
            setSent(true);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-neutral-950 text-white font-sans antialiased flex items-center justify-center px-4 overflow-hidden">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Gradient border wrapper */}
            <div className="relative w-full max-w-md rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10">
                <div className="rounded-2xl bg-neutral-950/90 backdrop-blur-xl p-8 sm:p-10">
                    <div className="flex justify-center mb-8">
                        <Logo />
                    </div>

                    {sent ? (
                        <>
                            <div className="flex justify-center mb-5">
                                <div className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                                    <svg className="h-7 w-7 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>

                            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-center tracking-tight">
                                Check your email
                            </h1>
                            <p className="mt-3 text-sm text-neutral-400 text-center leading-relaxed">
                                We've sent a password reset link to{" "}
                                <span className="text-white font-medium">{email}</span>.
                                <br />
                                The link will expire in 15 minutes.
                            </p>

                            <button
                                onClick={() => setSent(false)}
                                className="mt-8 w-full border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 text-white font-medium rounded-lg py-2.5 transition-colors"
                            >
                                Use a different email
                            </button>

                            <p className="mt-6 text-center text-sm text-neutral-500">
                                <Link to="/login" className="text-orange-500 hover:text-orange-400 hover:underline">
                                    ← Back to login
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="font-serif italic text-2xl sm:text-3xl font-semibold text-center tracking-tight">
                                Forgot password?
                            </h1>
                            <p className="mt-4 text-sm text-neutral-400 text-center">
                                No worries, we'll send you reset instructions.
                            </p>

                            {error && (
                                <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-6 font-serif space-y-4">
                                <Field label="Email">
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="you@example.com"
                                        className={inputClass + " tracking-wide"}
                                    />
                                </Field>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="font-display w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:opacity-60 text-white font-semibold tracking-tight rounded-lg py-2.5 shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                                                <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>Send Reset Link <span aria-hidden>→</span></>
                                    )}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-neutral-500 tracking-wide">
                                Remember your password?{" "}
                                <Link to="/login" className="text-orange-500 hover:text-orange-400 hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Logo, Field, inputClass, EyeIcon } from "../components/Shared";
import api from "../config/axios";
import toast from "react-hot-toast";

export default function ResetPass() {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!password.trim() || !confirmPassword.trim())
            return toast.error("Please fill in all fields");
        if (password.length < 6)
            return toast.error("Password must be at least 6 characters");
        if (password !== confirmPassword)
            return toast.error("Passwords do not match");
        if (!token) return toast.error("Invalid or missing reset token");

        try {
            setLoading(true);
            const res = await api.post("/authentication/reset-password", {
                token,
                password,
            });
            console.log("reset password:", res.data);
            toast.success("Password reset successfully!");
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Token invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    // Password strength (0-3)
    const strength =
        password.length === 0
            ? 0
            : password.length < 6
                ? 1
                : /[A-Z]/.test(password) && /\d/.test(password)
                    ? 3
                    : 2;
    const strengthLabel = ["", "Weak", "Okay", "Strong"][strength];
    const strengthColor = [
        "bg-neutral-800",
        "bg-red-500",
        "bg-yellow-500",
        "bg-emerald-500",
    ][strength];

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans antialiased relative overflow-hidden">
            {/* Ambient glow background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-orange-600/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "22px 22px",
                    }}
                />
            </div>

            <div className="w-full max-w-md relative">
                {/* Gradient border wrapper */}
                <div className="rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-[0_20px_80px_-20px_rgba(249,115,22,0.35)]">
                    <div className="bg-neutral-950/90 backdrop-blur-xl rounded-2xl px-8 py-10">
                        <div className="flex justify-center">
                            <Logo />
                        </div>

                        {success ? (
                            <div className="mt-8 text-center">
                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
                                    <svg
                                        className="h-7 w-7 text-emerald-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>
                                <h1 className="font-display text-white text-2xl font-semibold mt-5 tracking-tight">
                                    Password reset!
                                </h1>
                                <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                                    Your password has been updated successfully.
                                    <br />
                                    Redirecting you to login…
                                </p>
                                <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-neutral-800">
                                    <div className="h-full w-full origin-left animate-[shrink_2s_linear_forwards] bg-gradient-to-r from-orange-500 to-orange-400" />
                                </div>
                                <style>{`@keyframes shrink{from{transform:scaleX(1)}to{transform:scaleX(0)}}`}</style>
                            </div>
                        ) : (
                            <>
                                <div className="mt-8 text-center">
                                    <h1 className="font-display text-white text-2xl md:text-3xl font-semibold tracking-tight">
                                        Reset your password
                                    </h1>
                                    <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                                        Choose a strong new password to secure your account.
                                    </p>
                                </div>

                                {error && (
                                    <div className="mt-6 flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2.5">
                                        <svg
                                            className="h-4 w-4 mt-0.5 flex-shrink-0"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-3a1 1 0 00-1 1v3a1 1 0 002 0V8a1 1 0 00-1-1zm0 7a1 1 0 100 2 1 1 0 000-2z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                                    <Field label="New password">
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Min. 6 characters"
                                                className={inputClass + " pr-11 tracking-wide"}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPass((s) => !s)}
                                                aria-label={showPass ? "Hide password" : "Show password"}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-orange-400 transition-colors"
                                            >
                                                <EyeIcon off={showPass} />
                                            </button>
                                        </div>

                                        {password.length > 0 && (
                                            <div className="mt-2 flex items-center gap-2">
                                                <div className="flex flex-1 gap-1">
                                                    {[1, 2, 3].map((i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor : "bg-neutral-800"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-neutral-500 w-12 text-right">
                                                    {strengthLabel}
                                                </span>
                                            </div>
                                        )}
                                    </Field>

                                    <Field label="Confirm password">
                                        <div className="relative">
                                            <input
                                                type={showPass ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                placeholder="Re-enter password"
                                                className={inputClass + " pr-11 tracking-wide"}
                                            />
                                            {confirmPassword.length > 0 && (
                                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                    {password === confirmPassword ? (
                                                        <svg
                                                            className="h-5 w-5 text-emerald-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2.5}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            className="h-5 w-5 text-red-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2.5}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M6 18L18 6M6 6l12 12"
                                                            />
                                                        </svg>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </Field>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="group relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold py-3 flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-[0.99]"
                                    >
                                        {loading ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                                    />
                                                </svg>
                                                Resetting…
                                            </>
                                        ) : (
                                            <>
                                                Reset Password
                                                <span className="transition-transform group-hover:translate-x-0.5">
                                                    &rarr;
                                                </span>
                                            </>
                                        )}
                                    </button>
                                </form>

                                <div className="mt-8 flex items-center gap-3">
                                    <div className="h-px flex-1 bg-neutral-800" />
                                    <span className="text-xs text-neutral-600 uppercase tracking-wider">
                                        or
                                    </span>
                                    <div className="h-px flex-1 bg-neutral-800" />
                                </div>

                                <p className="text-sm text-neutral-400 mt-6 text-center">
                                    Remembered it?{" "}
                                    <Link
                                        to="/login"
                                        className="text-orange-500 hover:text-orange-400 font-medium hover:underline underline-offset-4"
                                    >
                                        Back to login
                                    </Link>
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <p className="text-center text-xs text-neutral-600 mt-6">
                    Protected by industry-standard encryption
                </p>
            </div>
        </div>
    );
}
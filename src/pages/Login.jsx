import { useState } from "react";
import { Logo, SocialButton, GoogleIcon, Field, inputClass, EyeIcon } from "../components/Shared";
import loginImg from "../assets/login.jpg";
import api from "../config/axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return toast.error("Please fill all the fields");
        if (password.length < 6) return toast.error("Password must be at least 6 characters");

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            setLoading(true);
            const res = await api.post("/authentication/login", formData);
            toast.success(res?.data?.message || "Login successfully!");
            setEmail(""); setPassword("");
            setTimeout(() => {
                navigate(res.data.isAdmin === true ? "/admin" : "/home");
            }, 1500);
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-neutral-950 text-white font-sans antialiased flex items-center justify-center px-4 py-10 overflow-hidden">
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative w-full max-w-5xl rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl shadow-orange-500/10">
                <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden bg-neutral-950/90 backdrop-blur-xl">
                    {/* Left image */}
                    <div className="relative hidden md:block">
                        <img src={loginImg} alt="Login" className="absolute inset-0 h-full w-full object-cover" />
                    </div>

                    {/* Right form */}
                    <div className="p-8 sm:p-10">
                        <div className="flex justify-center md:justify-start mb-8">
                            <Logo />
                        </div>

                        <h1 className="italic font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            Don't have an account?{" "}
                            <Link to="/" className="text-orange-500 hover:text-orange-400 hover:underline">
                                Sign up
                            </Link>
                        </p>

                        <form onSubmit={handleLogin} className="mt-7 space-y-4">
                            <Field label="Email">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="you@example.com"
                                    className={inputClass + " tracking-wide"}
                                />
                            </Field>

                            <Field label="Password">
                                <div className="relative">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showPass ? "text" : "password"}
                                        placeholder="Password"
                                        className={inputClass + " pr-10 tracking-wide"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPass((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-orange-400 transition-colors"
                                    >
                                        <EyeIcon open={showPass} />
                                    </button>
                                </div>
                                <div className="mt-2 text-right">
                                    <Link to="/forgot" className="text-xs text-orange-500 hover:text-orange-400 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </Field>

                            <label className="flex items-center gap-2 text-sm text-neutral-400 select-none">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="accent-orange-500"
                                />
                                Remember me for 30 days
                            </label>

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
                                        Logging in...
                                    </>
                                ) : (
                                    <>Log in <span aria-hidden>→</span></>
                                )}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-neutral-800" />
                            <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">or continue with</span>
                            <div className="h-px flex-1 bg-neutral-800" />
                        </div>

                        <div className="grid">
                            <SocialButton icon={<GoogleIcon />} label="Google" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import toast from "react-hot-toast";
import { Logo, SocialButton, GoogleIcon, FacebookIcon, EyeIcon, Field, inputClass } from "../components/Shared";
import signupImg from '../assets/signup.jpg'
import api from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [showPass, setShowPass] = useState(false);
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleSignup = async (e) => {
        e.preventDefault()

        if (!username || !email || !password) {
            toast.error("Please fill all the fields");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)

        try {
            setLoading(true);
            const res = await api.post('/authentication/register', formData)
            toast.success(res?.data?.message || "Account created successfully!");

            setUserName('')
            setEmail('')
            setPassword('')

            setTimeout(() => {
                navigate('/login')
            }, 2000);

        } catch (error) {
            console.error("Signup error:", error);

            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong. Please try again.";

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="grid md:grid-cols-2 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                {/* Left image panel */}
                <div className="relative hidden md:block">
                    <img
                        src={signupImg}
                        alt="Couple shopping online"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Right form panel */}
                <div className="bg-black px-8 py-8 flex flex-col justify-center">
                    <Logo />

                    <h1 className="text-white text-2xl font-semibold mt-6">Create your account</h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Already have an account?{" "}
                        <a href="/login" className="text-orange-500 hover:underline">
                            Log in
                        </a>
                    </p>

                    <form className="mt-5 flex flex-col gap-4">

                        <Field label="Username">
                            <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" placeholder="John Doe" className={inputClass} />
                        </Field>

                        <Field label="Email address">
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="you@example.com" className={inputClass} />
                        </Field>

                        <Field label="Password">
                            <div className="relative">
                                <input onChange={(e) => setPassword(e.target.value)} value={password}
                                    type={showPass ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    className={inputClass + " pr-10"}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                                >
                                    <EyeIcon off={showPass} />
                                </button>
                            </div>
                        </Field>

                        <button onClick={handleSignup}
                            type="button"
                            disabled={loading}
                            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-black font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2 transition-colors"
                        >
                            {loading ? "Creating..." : "Create Account"} <span>&rarr;</span>
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-neutral-800 flex-1" />
                        <span className="text-xs text-neutral-500">or sign up with</span>
                        <div className="h-px bg-neutral-800 flex-1" />
                    </div>

                    <div className="flex">
                        <SocialButton icon={<GoogleIcon />} label="Google" />
                    </div>
                </div>
            </div>
        </div>
    );
}
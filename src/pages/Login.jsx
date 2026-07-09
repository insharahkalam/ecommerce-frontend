import { useState } from "react";
import {
    Logo,
    SocialButton,
    GoogleIcon,
    FacebookIcon,
    PhoneIcon,
    EyeIcon,
    Field,
    inputClass,
} from "../components/Shared";
import lofinImg from '../assets/login.jpg'

export default function Login() {
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(true);

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
            <div className="grid md:grid-cols-2 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
                {/* Left image panel */}
                <div className="relative hidden md:block">
                    <img
                        src={lofinImg}
                        alt="Man shopping online with credit card"
                        className="w-full h-full object-cover"
                    />
                  
                </div>

                {/* Right form panel */}
                <div className="bg-black px-8 py-8 flex flex-col justify-center">
                    <Logo />

                    <h1 className="text-white text-2xl font-semibold mt-6">Welcome back</h1>
                    <p className="text-sm text-neutral-400 mt-1">
                        Don't have an account?{" "}
                        <a href="/" className="text-orange-500 hover:underline">
                            Sign up
                        </a>
                    </p>

                    <form className="mt-6 flex flex-col gap-4">
                        <Field label="Email address">
                            <input type="email" placeholder="you@example.com" className={inputClass} />
                        </Field>

                        <Field label="Password">
                            <div className="relative">
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Password"
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
                            <div className="flex justify-end">
                                <a href="#" className="text-xs text-orange-500 hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </Field>

                        <label className="flex items-center gap-2 text-xs text-neutral-400">
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
                            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2 transition-colors"
                        >
                            Log in <span>&rarr;</span>
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-neutral-800 flex-1" />
                        <span className="text-xs text-neutral-500">or continue with</span>
                        <div className="h-px bg-neutral-800 flex-1" />
                    </div>

                    <div className="flex gap-3">
                        <SocialButton icon={<PhoneIcon />} label="Phone" />
                        <SocialButton icon={<GoogleIcon />} label="Google" />
                        <SocialButton icon={<FacebookIcon />} label="Facebook" />
                    </div>
                </div>
            </div>
        </div>
    );
}
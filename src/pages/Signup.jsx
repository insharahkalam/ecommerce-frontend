import { useState } from "react";
import {
    Logo,
    SocialButton,
    GoogleIcon,
    FacebookIcon,
    EyeIcon,
    Field,
    inputClass,
} from "../components/Shared";
import signupImg from '../assets/signup.jpg'

export default function Signup() {
    const [role, setRole] = useState("buyer");
    const [showPass, setShowPass] = useState(false);
    const [agree, setAgree] = useState(true);

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

                    {/* Role toggle */}
                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <button
                            type="button"
                            onClick={() => setRole("buyer")}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${role === "buyer"
                                ? "bg-orange-500 border-orange-500 text-black"
                                : "border-neutral-700 text-neutral-300 hover:bg-neutral-900"
                                }`}
                        >
                            Buyer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("seller")}
                            className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${role === "seller"
                                ? "bg-orange-500 border-orange-500 text-black"
                                : "border-neutral-700 text-neutral-300 hover:bg-neutral-900"
                                }`}
                        >
                            Seller
                        </button>
                    </div>

                    <form className="mt-5 flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="First Name">
                                <input type="text" placeholder="Ali" className={inputClass} />
                            </Field>
                            <Field label="Last Name">
                                <input type="text" placeholder="Khan" className={inputClass} />
                            </Field>
                        </div>

                        <Field label="Phone Number">
                            <input type="tel" placeholder="ex: +92 3XX XXXXXXX" className={inputClass} />
                        </Field>

                        <Field label="Email address">
                            <input type="email" placeholder="you@example.com" className={inputClass} />
                        </Field>

                        <Field label="Password">
                            <div className="relative">
                                <input
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

                        <label className="flex items-start gap-2 text-xs text-neutral-400">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                                className="mt-0.5 accent-orange-500"
                            />
                            <span>
                                I agree to the{" "}
                                <a href="#" className="text-orange-500 hover:underline">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-orange-500 hover:underline">
                                    Privacy Policy
                                </a>
                            </span>
                        </label>

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2 transition-colors"
                        >
                            Create Account <span>&rarr;</span>
                        </button>
                    </form>

                    <div className="flex items-center gap-3 my-5">
                        <div className="h-px bg-neutral-800 flex-1" />
                        <span className="text-xs text-neutral-500">or sign up with</span>
                        <div className="h-px bg-neutral-800 flex-1" />
                    </div>

                    <div className="flex gap-3">
                        <SocialButton icon={<GoogleIcon />} label="Google" />
                        <SocialButton icon={<FacebookIcon />} label="Facebook" />
                    </div>
                </div>
            </div>
        </div>
    );
}
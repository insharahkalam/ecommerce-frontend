import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Mail } from "lucide-react";
import { FaInstagram, FaXTwitter, FaFacebookF } from "react-icons/fa6";
import { Logo } from "./Shared"
export default function Footer() {
    return (
        <footer className="border-t border-border bg-bg mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Logo />
                    <p className="text-sm font-serif mt-5 text-text-muted leading-relaxed">
                        Curated products, honest prices, and delivery you can count on.
                    </p>
                </div>

                <div>
                    <h4 className="font-display text-text text-sm mb-3">Shop</h4>
                    <ul className="space-y-2 text-sm font-serif text-text-muted">
                        <li><Link to="/shop" className="hover:text-orange-400">All Products</Link></li>
                        <li><Link to="/shop?featured=1" className="hover:text-orange-400">Featured</Link></li>
                        <li><Link to="/shop?sale=1" className="hover:text-orange-400">On Sale</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-text text-sm mb-3">Company</h4>
                    <ul className="space-y-2 text-sm font-serif text-text-muted">
                        <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
                        <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
                        <li><Link to="/orders" className="hover:text-orange-400">My Orders</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-text text-sm mb-3">Newsletter</h4>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-hover border border-border text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-orange-500"
                        />
                        <button
                            type="submit"
                            aria-label="Subscribe"
                            className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                        >
                            <Mail size={16} />
                        </button>
                    </form>
                    <div className="flex gap-3 mt-4 text-text-muted">
                        <a href="#" aria-label="Instagram" className="hover:text-orange-400 transition-colors">
                            <FaInstagram size={18} />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-orange-400 transition-colors">
                            <FaXTwitter size={18} />
                        </a>
                        <a href="#" aria-label="Facebook" className="hover:text-orange-400 transition-colors">
                            <FaFacebookF size={16} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-border py-4 text-center text-xs font-mono text-text-muted">
                © {new Date().getFullYear()} ApnaBazar. All rights reserved.
            </div>
        </footer>
    );
}
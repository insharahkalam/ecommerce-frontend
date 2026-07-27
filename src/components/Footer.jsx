import React from "react";
import { Link } from "react-router-dom";
// import { ShoppingBag, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-neutral-950 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                            {/* <ShoppingBag size={16} color="white" /> */}
                        </div>
                        <span className="font-display italic text-xl font-semibold text-white">ApnaBazar</span>
                    </Link>
                    <p className="text-sm font-serif text-neutral-400 leading-relaxed">
                        Curated products, honest prices, and delivery you can count on.
                    </p>
                </div>

                <div>
                    <h4 className="font-display text-white text-sm mb-3">Shop</h4>
                    <ul className="space-y-2 text-sm font-serif text-neutral-400">
                        <li><Link to="/shop" className="hover:text-orange-400">All Products</Link></li>
                        <li><Link to="/shop?featured=1" className="hover:text-orange-400">Featured</Link></li>
                        <li><Link to="/shop?sale=1" className="hover:text-orange-400">On Sale</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-white text-sm mb-3">Company</h4>
                    <ul className="space-y-2 text-sm font-serif text-neutral-400">
                        <li><Link to="/about" className="hover:text-orange-400">About</Link></li>
                        <li><Link to="/contact" className="hover:text-orange-400">Contact</Link></li>
                        <li><Link to="/orders" className="hover:text-orange-400">My Orders</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-display text-white text-sm mb-3">Newsletter</h4>
                    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="you@email.com"
                            className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500"
                        />
                        <button className="px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white">
                            {/* <Mail size={16} /> */}
                        </button>
                    </form>
                    <div className="flex gap-3 mt-4 text-neutral-400">
                        {/* <a href="#" className="hover:text-orange-400"><Instagram size={18} /></a>
                        <a href="#" className="hover:text-orange-400"><Twitter size={18} /></a>
                        <a href="#" className="hover:text-orange-400"><Facebook size={18} /></a> */}
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 py-4 text-center text-xs font-mono text-neutral-500">
                © {new Date().getFullYear()} ApnaBazar. All rights reserved.
            </div>
        </footer>
    );
}

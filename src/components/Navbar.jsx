// import React, { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { ShoppingBag, Search, User, LogOut, Menu, X } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import api from "../config/axios";
// import { AUTH_BASE_URL } from "../data/mockData";

// export default function Navbar() {
//     const { cartCount } = useCart();
//     const { user, logoutUser, isLoggedIn } = useAuth();
//     const navigate = useNavigate();
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [mobileOpen, setMobileOpen] = useState(false);

//     async function handleLogout() {
//         try { await api.get(`${AUTH_BASE_URL}/logout`); } catch { }
//         logoutUser();
//         setMenuOpen(false);
//         navigate("/");
//     }

//     const navLink = ({ isActive }) =>
//         `text-sm font-serif transition-colors ${isActive ? "text-orange-400" : "text-neutral-300 hover:text-white"}`;

//     return (
//         <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/70 border-b border-white/10">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
//                 {/* Logo */}
//                 <Link to="/home" className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
//                         <ShoppingBag size={16} color="white" />
//                     </div>
//                     <span className="font-display italic text-xl font-semibold text-white">ApnaBazar</span>
//                 </Link>

//                 {/* Desktop nav */}
//                 <nav className="hidden md:flex items-center gap-8">
//                     <NavLink to="/home" end className={navLink}>Home</NavLink>
//                     <NavLink to="/shop" className={navLink}>Shop</NavLink>
//                         <NavLink to="/about" className={navLink}>About</NavLink>
//                         <NavLink to="/contact" className={navLink}>Contact</NavLink>
//                 </nav>

//                 {/* Right actions */}
//                 <div className="flex items-center gap-3">
//                     <Link to="/shop" className="hidden sm:flex p-2 rounded-lg hover:bg-white/5">
//                         <Search size={18} className="text-neutral-300" />
//                     </Link>

//                     <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/5">
//                         <ShoppingBag size={18} className="text-neutral-300" />
//                         {cartCount > 0 && (
//                             <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-mono w-5 h-5 rounded-full flex items-center justify-center">
//                                 {cartCount}
//                             </span>
//                         )}
//                     </Link>

//                     {isLoggedIn ? (
//                         <div className="relative">
//                             <button
//                                 onClick={() => setMenuOpen((p) => !p)}
//                                 className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-semibold"
//                             >
//                                 {user?.username?.[0]?.toUpperCase() || "U"}
//                             </button>
//                             {menuOpen && (
//                                 <div className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">
//                                     <div className="px-3 py-2 border-b border-white/10">
//                                         <p className="text-sm font-serif text-white truncate">{user?.username}</p>
//                                     </div>
//                                     <Link to="/orders" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-serif text-neutral-300 hover:bg-white/5">
//                                         My orders
//                                     </Link>
//                                     <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm font-serif text-red-400 hover:bg-white/5">
//                                         <LogOut size={14} /> Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-sm font-serif text-neutral-300 hover:bg-white/5">
//                             <User size={14} /> Login
//                         </Link>
//                     )}

//                     <button className="md:hidden p-2" onClick={() => setMobileOpen((p) => !p)}>
//                         {mobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
//                     </button>
//                 </div>
//             </div>

//             {mobileOpen && (
//                 <div className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl">
//                     <div className="px-4 py-3 flex flex-col gap-2">
//                         {[["/", "Home"], ["/shop", "Shop"], ["/about", "About"], ["/contact", "Contact"]].map(([to, label]) => (
//                             <NavLink key={to} to={to} end={to === "/"} onClick={() => setMobileOpen(false)} className={navLink}>
//                                 {label}
//                             </NavLink>
//                         ))}
//                     </div>
//                 </div>
//             )}
//         </header>
//     );
// }



import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, ShoppingCart, Search, User, LogOut, Menu, X, ChevronDown, PackageSearch } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../config/axios";
import { AUTH_BASE_URL } from "../data/mockData";

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logoutUser, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuRef = useRef(null);

    async function handleLogout() {
        try { await api.get(`${AUTH_BASE_URL}/logout`); } catch { }
        logoutUser();
        setMenuOpen(false);
        navigate("/");
    }

    // Bahar click karne par account dropdown band ho jaye
    useEffect(() => {
        if (!menuOpen) return;
        function handleOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener("mousedown", handleOutside);
        return () => document.removeEventListener("mousedown", handleOutside);
    }, [menuOpen]);

    const navLink = ({ isActive }) =>
        `text-sm font-serif transition-colors ${isActive ? "text-orange-400" : "text-neutral-300 hover:text-white"}`;

    const displayName = user?.username || user?.fullName || user?.name || "User";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-neutral-950/70 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                        <ShoppingBag size={16} color="white" />
                    </div>
                    <span className="font-display italic text-xl font-semibold text-white">ApnaBazar</span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink to="/home" end className={navLink}>Home</NavLink>
                    <NavLink to="/shop" className={navLink}>Shop</NavLink>
                    <NavLink to="/about" className={navLink}>About</NavLink>
                    <NavLink to="/contact" className={navLink}>Contact</NavLink>
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <Link to="/shop" className="hidden sm:flex p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Search size={18} className="text-neutral-300" />
                    </Link>

                    <Link to="/cart" className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <ShoppingCart size={19} className="text-neutral-300" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-mono w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-neutral-950">
                                {cartCount > 9 ? "9+" : cartCount}
                            </span>
                        )}
                    </Link>

                    <div className="w-px h-6 bg-white/10 hidden sm:block" />

                    {isLoggedIn ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen((p) => !p)}
                                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                            >
                                <span className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                                    {displayName[0]?.toUpperCase() || "U"}
                                </span>
                                <span className="hidden sm:block text-sm font-serif text-white max-w-[110px] truncate">
                                    {displayName}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`hidden sm:block text-neutral-400 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-neutral-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                                    <div className="px-3.5 py-3 border-b border-white/10 flex items-center gap-2.5">
                                        <span className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                            {displayName[0]?.toUpperCase() || "U"}
                                        </span>
                                        <div className="min-w-0">
                                            <p className="text-sm font-serif text-white truncate">{displayName}</p>
                                            {user?.email && (
                                                <p className="text-xs font-mono text-neutral-500 truncate">{user.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        to="/orders"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-2 px-3.5 py-2.5 text-sm font-serif text-neutral-300 hover:bg-white/5 transition-colors"
                                    >
                                        <PackageSearch size={15} /> My orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-3.5 py-2.5 text-sm font-serif text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                                    >
                                        <LogOut size={15} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-sm font-serif font-medium text-white shadow-sm shadow-orange-500/20 transition-all"
                        >
                            <User size={14} />
                            <span className="hidden sm:inline">Login to continue</span>
                            <span className="sm:hidden">Login</span>
                        </Link>
                    )}

                    <button className="md:hidden p-2" onClick={() => setMobileOpen((p) => !p)}>
                        {mobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden border-t border-white/10 bg-neutral-950/95 backdrop-blur-xl">
                    <div className="px-4 py-3 flex flex-col gap-2">
                        {[["/home", "Home"], ["/shop", "Shop"], ["/about", "About"], ["/contact", "Contact"]].map(([to, label]) => (
                            <NavLink key={to} to={to} end={to === "/home"} onClick={() => setMobileOpen(false)} className={navLink}>
                                {label}
                            </NavLink>
                        ))}

                        <div className="border-t border-white/10 my-1" />

                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-2.5 py-1.5">
                                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-semibold">
                                        {displayName[0]?.toUpperCase() || "U"}
                                    </span>
                                    <span className="text-sm font-serif text-white">{displayName}</span>
                                </div>
                                <Link to="/orders" onClick={() => setMobileOpen(false)} className="text-sm font-serif text-neutral-300 py-1">
                                    My orders
                                </Link>
                                <button
                                    onClick={() => { setMobileOpen(false); handleLogout(); }}
                                    className="flex items-center gap-2 text-sm font-serif text-red-400 py-1"
                                >
                                    <LogOut size={14} /> Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-sm font-serif font-medium text-white"
                            >
                                <User size={14} /> Login to continue
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
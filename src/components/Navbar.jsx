// import React, { useState, useRef, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//     ShoppingBag, ShoppingCart, Search, User, LogOut,
//     Menu, X, ChevronDown, PackageSearch,
// } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import api from "../config/axios";
// import { AUTH_BASE_URL } from "../data/mockData";
// import logo from '../assets/logo.png'
// const NAV_ITEMS = [
//     { to: "/home", label: "Home", end: true },
//     { to: "/shop", label: "Shop" },
//     { to: "/about", label: "About" },
//     { to: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//     const { cartCount } = useCart();
//     const { user, logoutUser, isLoggedIn } = useAuth();
//     const navigate = useNavigate();

//     const [menuOpen, setMenuOpen] = useState(false);
//     const [mobileOpen, setMobileOpen] = useState(false);
//     const [scrolled, setScrolled] = useState(false);
//     const menuRef = useRef(null);

//     const displayName = user?.username || user?.fullName || user?.name || "User";
//     const initial = displayName?.[0]?.toUpperCase() || "U";

//     async function handleLogout() {
//         try { await api.get(`${AUTH_BASE_URL}/logout`); } catch { }
//         logoutUser();
//         setMenuOpen(false);
//         setMobileOpen(false);
//         navigate("/");
//     }

//     useEffect(() => {
//         const onScroll = () => setScrolled(window.scrollY > 8);
//         onScroll();
//         window.addEventListener("scroll", onScroll, { passive: true });
//         return () => window.removeEventListener("scroll", onScroll);
//     }, []);

//     useEffect(() => {
//         if (!menuOpen) return;
//         const onDown = (e) => {
//             if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
//         };
//         document.addEventListener("mousedown", onDown);
//         return () => document.removeEventListener("mousedown", onDown);
//     }, [menuOpen]);

//     useEffect(() => {
//         const onKey = (e) => {
//             if (e.key === "Escape") { setMenuOpen(false); setMobileOpen(false); }
//         };
//         document.addEventListener("keydown", onKey);
//         return () => document.removeEventListener("keydown", onKey);
//     }, []);

//     useEffect(() => {
//         document.body.style.overflow = mobileOpen ? "hidden" : "";
//         return () => { document.body.style.overflow = ""; };
//     }, [mobileOpen]);

//     const desktopLink = ({ isActive }) =>
//         [
//             "relative px-1 py-1 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200",
//             "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full",
//             "after:bg-gradient-to-r after:from-orange-400 after:to-amber-400 after:transition-all after:duration-300",
//             isActive
//                 ? "text-white after:w-full"
//                 : "text-neutral-400 hover:text-white after:w-0 hover:after:w-full",
//         ].join(" ");

//     const mobileLink = ({ isActive }) =>
//         [
//             "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold tracking-[-0.01em] transition-all",
//             isActive
//                 ? "bg-gradient-to-r from-orange-500/15 to-transparent text-orange-300 ring-1 ring-inset ring-orange-500/25"
//                 : "text-neutral-400 hover:bg-white/[0.04] hover:text-white",
//         ].join(" ");

//     const Avatar = ({ size = "h-8 w-8", text = "text-xs" }) => (
//         <span
//             className={`${size} ${text} relative grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 font-display font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_4px_14px_-4px_rgba(249,115,22,0.7)]`}
//         >
//             {initial}
//         </span>
//     );

//     return (
//         <header
//             className={`sticky top-0 z-50 font-sans transition-all duration-300 ${scrolled
//                 ? "border-b border-white/10 bg-neutral-950/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
//                 : "border-b border-white/[0.06] bg-neutral-950/60 backdrop-blur-xl"
//                 }`}
//         >
//             {/* top accent hairline */}
//             <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

//             <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

//                 {/* Logo
//                 <Link to="/home" className="group flex shrink-0 items-center gap-3">
//                     <span className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 shadow-[0_6px_20px_-6px_rgba(249,115,22,0.85)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
//                         <span className="absolute inset-0 rounded-[14px] bg-gradient-to-t from-black/25 to-white/25 opacity-60" />
//                         <img width={50} src={logo} alt="" />
//                     </span>
//                     <span className="flex flex-col leading-none">
//                         <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-white">
//                             Urban<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Traders</span>
//                         </span>
//                         <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:block">
//                             Shop Smart
//                         </span>



//                     </span>
//                 </Link> */}


//                 <Link to="/" className="group flex shrink-0 items-center gap-3">
//                     {/* Logo badge with a clean inner plate so the logo stays visible */}
//                     <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-[2px] shadow-[0_6px_20px_-6px_rgba(249,115,22,0.85)] transition-all duration-300 group-hover:shadow-[0_10px_28px_-10px_rgba(249,115,22,0.95)] group-hover:-rotate-3 group-hover:scale-105">
//                         <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] bg-white">
//                             <img
//                                 src={logo}
//                                 alt="UrbanTraders"
//                                 width={40}
//                                 height={40}
//                                 className="h-10 w-10 object-contain"
//                             />
//                         </span>
//                     </span>

//                     <span className="flex flex-col leading-none">
//                         <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-white">
//                             Urban<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Traders</span>
//                         </span>
//                         <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-neutral-500 sm:block">
//                             Shop Smart
//                         </span>
//                     </span>
//                 </Link>




//                 {/* Desktop nav */}
//                 <nav className="hidden items-center font-display gap-9 md:flex">
//                     {NAV_ITEMS.map((item) => (
//                         <NavLink key={item.to} to={item.to} end={item.end} className={desktopLink}>
//                             {item.label}
//                         </NavLink>
//                     ))}
//                 </nav>

//                 {/* Right actions */}
//                 <div className="flex items-center gap-1 sm:gap-1.5">
//                     <Link
//                         to="/shop"
//                         aria-label="Search products"
//                         className="hidden rounded-xl p-2.5 text-neutral-400 transition-all hover:bg-white/[0.06] hover:text-white sm:flex"
//                     >
//                         <Search size={18} strokeWidth={2.1} />
//                     </Link>

//                     <Link
//                         to="/cart"
//                         aria-label={`Cart, ${cartCount} items`}
//                         className="relative rounded-xl p-2.5 text-neutral-300 transition-all hover:bg-white/[0.06] hover:text-white"
//                     >
//                         <ShoppingCart size={19} strokeWidth={2.1} />
//                         {cartCount > 0 && (
//                             <span className="absolute right-0.5 top-0.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 px-1 font-display text-[10px] font-bold leading-none text-white shadow-[0_0_10px_rgba(249,115,22,0.6)] ring-2 ring-neutral-950">
//                                 {cartCount > 9 ? "9+" : cartCount}
//                             </span>
//                         )}
//                     </Link>

//                     <span className="mx-1.5 hidden h-6 w-px bg-white/10 md:block" />

//                     {/* Account — desktop only */}
//                     {isLoggedIn ? (
//                         <div className="relative font-display hidden md:block" ref={menuRef}>
//                             <button
//                                 onClick={() => setMenuOpen((p) => !p)}
//                                 aria-expanded={menuOpen}
//                                 className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 transition-all hover:border-orange-400/30 hover:bg-white/[0.08]"
//                             >
//                                 <Avatar size="h-7 w-7" />
//                                 <span className="max-w-[120px] truncate text-sm font-semibold tracking-[-0.01em] text-white">
//                                     {displayName}
//                                 </span>
//                                 <ChevronDown
//                                     size={14}
//                                     className={`text-neutral-500 transition-transform duration-300 ${menuOpen ? "rotate-180 text-orange-400" : ""}`}
//                                 />
//                             </button>

//                             {menuOpen && (
//                                 <div className="absolute right-0 mt-2.5 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
//                                     <div className="flex items-center gap-3 border-b border-white/[0.08] bg-gradient-to-br from-orange-500/[0.08] to-transparent px-4 py-4">
//                                         <Avatar size="h-11 w-11" text="text-base" />
//                                         <div className="min-w-0">
//                                             <p className="truncate text-sm font-bold tracking-[-0.01em] text-white">{displayName}</p>
//                                             {user?.email && (
//                                                 <p className="truncate text-xs text-neutral-500">{user.email}</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                     <Link
//                                         to="/my-orders"
//                                         onClick={() => setMenuOpen(false)}
//                                         className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
//                                     >
//                                         <PackageSearch size={16} className="text-orange-400" /> My orders
//                                     </Link>
//                                     <button
//                                         onClick={handleLogout}
//                                         className="flex w-full items-center gap-3 border-t border-white/[0.08] px-4 py-3.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/10"
//                                     >
//                                         <LogOut size={16} /> Logout
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     ) : (
//                         <Link
//                             to="/login"
//                             className="hidden items-center gap-2 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 px-4 py-2.5 text-sm font-bold tracking-[-0.01em] text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.8)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-6px_rgba(249,115,22,0.95)] md:flex"
//                         >
//                             <User size={15} strokeWidth={2.4} /> Login
//                         </Link>
//                     )}

//                     <button
//                         onClick={() => setMobileOpen((p) => !p)}
//                         aria-label="Toggle menu"
//                         aria-expanded={mobileOpen}
//                         className="rounded-xl border border-white/10 bg-white/[0.04] p-2.5 text-white transition-all hover:bg-white/[0.08] md:hidden"
//                     >
//                         {mobileOpen ? <X size={19} /> : <Menu size={19} />}
//                     </button>
//                 </div>
//             </div>

//             {/* Mobile drawer */}
//             <div
//                 className={`fixed inset-x-0 top-[68px] z-40 origin-top border-b border-white/10 bg-neutral-950/97 backdrop-blur-2xl transition-all duration-300 md:hidden ${mobileOpen
//                     ? "pointer-events-auto translate-y-0 opacity-100"
//                     : "pointer-events-none -translate-y-3 opacity-0"
//                     }`}
//             >
//                 <div className="max-h-[calc(100dvh-68px)] overflow-y-auto px-4 pb-8 pt-5">
//                     {isLoggedIn && (
//                         <div className="mb-5 flex items-center gap-3.5 rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/[0.1] to-white/[0.02] p-4">
//                             <Avatar size="h-12 w-12" text="text-lg" />
//                             <div className="min-w-0 flex-1">
//                                 <p className="truncate font-display text-[15px] font-bold tracking-[-0.02em] text-white">
//                                     {displayName}
//                                 </p>
//                                 {user?.email && (
//                                     <p className="truncate text-xs text-neutral-500">{user.email}</p>
//                                 )}
//                             </div>
//                         </div>
//                     )}

//                     <p className="mb-2 px-4 text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-600">
//                         Menu
//                     </p>
//                     <nav className="flex flex-col font-display gap-1.5">
//                         {NAV_ITEMS.map((item) => (
//                             <NavLink
//                                 key={item.to}
//                                 to={item.to}
//                                 end={item.end}
//                                 onClick={() => setMobileOpen(false)}
//                                 className={mobileLink}
//                             >
//                                 {item.label}
//                             </NavLink>
//                         ))}
//                     </nav>

//                     <div className="my-5 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

//                     {isLoggedIn ? (
//                         <div className="flex flex-col font-display gap-1.5">
//                             <Link
//                                 to="/my-orders"
//                                 onClick={() => setMobileOpen(false)}
//                                 className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-neutral-300 transition-colors hover:bg-white/[0.05] hover:text-white"
//                             >
//                                 <PackageSearch size={17} className="text-orange-400" /> My orders
//                             </Link>
//                             <button
//                                 onClick={handleLogout}
//                                 className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-red-400 transition-colors hover:bg-red-500/10"
//                             >
//                                 <LogOut size={17} /> Logout
//                             </button>
//                         </div>
//                     ) : (
//                         <Link
//                             to="/login"
//                             onClick={() => setMobileOpen(false)}
//                             className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 px-4 py-4 font-display text-[15px] font-bold tracking-[-0.01em] text-white shadow-[0_10px_28px_-8px_rgba(249,115,22,0.9)]"
//                         >
//                             <User size={17} strokeWidth={2.4} /> Login to continue
//                         </Link>
//                     )}
//                 </div>
//             </div>

//             {mobileOpen && (
//                 <div
//                     onClick={() => setMobileOpen(false)}
//                     className="fixed inset-0 top-[68px] z-30 bg-black/70 backdrop-blur-[2px] md:hidden"
//                 />
//             )}


//         </header>
//     );
// }



import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    ShoppingBag, ShoppingCart, Search, User, LogOut,
    Menu, X, ChevronDown, PackageSearch, Sun, Moon,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import api from "../config/axios";
import { AUTH_BASE_URL } from "../data/mockData";
import logo from '../assets/logo.png'
const NAV_ITEMS = [
    { to: "/home", label: "Home", end: true },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
];

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logoutUser, isLoggedIn } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuRef = useRef(null);

    const displayName = user?.username || user?.fullName || user?.name || "User";
    const initial = displayName?.[0]?.toUpperCase() || "U";

    async function handleLogout() {
        try { await api.get(`${AUTH_BASE_URL}/logout`); } catch { }
        logoutUser();
        setMenuOpen(false);
        setMobileOpen(false);
        navigate("/");
    }

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const onDown = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        };
        document.addEventListener("mousedown", onDown);
        return () => document.removeEventListener("mousedown", onDown);
    }, [menuOpen]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") { setMenuOpen(false); setMobileOpen(false); }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const desktopLink = ({ isActive }) =>
        [
            "relative px-1 py-1 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-200",
            "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:rounded-full",
            "after:bg-gradient-to-r after:from-orange-400 after:to-amber-400 after:transition-all after:duration-300",
            isActive
                ? "text-neutral-900 dark:text-white after:w-full"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white after:w-0 hover:after:w-full",
        ].join(" ");

    const mobileLink = ({ isActive }) =>
        [
            "flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold tracking-[-0.01em] transition-all",
            isActive
                ? "bg-gradient-to-r from-orange-500/15 to-transparent text-orange-600 dark:text-orange-300 ring-1 ring-inset ring-orange-500/25"
                : "text-neutral-500 dark:text-neutral-400 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:text-neutral-900 dark:hover:text-white",
        ].join(" ");

    const Avatar = ({ size = "h-8 w-8", text = "text-xs" }) => (
        <span
            className={`${size} ${text} relative grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 font-display font-bold text-white shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_4px_14px_-4px_rgba(249,115,22,0.7)]`}
        >
            {initial}
        </span>
    );

    return (
        <header
            className={`sticky top-0 z-50 font-sans transition-all duration-300 ${scrolled
                ? "border-b border-black/10 dark:border-white/10 bg-white/85 dark:bg-neutral-950/85 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.9)] backdrop-blur-2xl"
                : "border-b border-black/[0.06] dark:border-white/[0.06] bg-white/60 dark:bg-neutral-950/60 backdrop-blur-xl"
                }`}
        >
            {/* top accent hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

            <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">

                <Link to="/" className="group flex shrink-0 items-center gap-3">
                    {/* Logo badge with a clean inner plate so the logo stays visible */}
                    <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 p-[2px] shadow-[0_6px_20px_-6px_rgba(249,115,22,0.85)] transition-all duration-300 group-hover:shadow-[0_10px_28px_-10px_rgba(249,115,22,0.95)] group-hover:-rotate-3 group-hover:scale-105">
                        <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-[12px] bg-white">
                            <img
                                src={logo}
                                alt="UrbanTraders"
                                width={40}
                                height={40}
                                className="h-10 w-10 object-contain"
                            />
                        </span>
                    </span>

                    <span className="flex flex-col leading-none">
                        <span className="font-display text-[19px] font-extrabold tracking-[-0.03em] text-neutral-900 dark:text-white">
                            Urban<span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">Traders</span>
                        </span>
                        <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.28em] text-neutral-400 dark:text-neutral-500 sm:block">
                            Shop Smart
                        </span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center font-display gap-9 md:flex">
                    {NAV_ITEMS.map((item) => (
                        <NavLink key={item.to} to={item.to} end={item.end} className={desktopLink}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Right actions */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle light/dark theme"
                        className="relative grid h-9 w-9 place-items-center rounded-xl text-neutral-500 dark:text-neutral-400 transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} strokeWidth={2.1} />
                        ) : (
                            <Moon size={18} strokeWidth={2.1} />
                        )}
                    </button>

                    <Link
                        to="/shop"
                        aria-label="Search products"
                        className="hidden rounded-xl p-2.5 text-neutral-500 dark:text-neutral-400 transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white sm:flex"
                    >
                        <Search size={18} strokeWidth={2.1} />
                    </Link>

                    <Link
                        to="/cart"
                        aria-label={`Cart, ${cartCount} items`}
                        className="relative rounded-xl p-2.5 text-neutral-600 dark:text-neutral-300 transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:text-neutral-900 dark:hover:text-white"
                    >
                        <ShoppingCart size={19} strokeWidth={2.1} />
                        {cartCount > 0 && (
                            <span className="absolute right-0.5 top-0.5 grid h-[19px] min-w-[19px] place-items-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 px-1 font-display text-[10px] font-bold leading-none text-white shadow-[0_0_10px_rgba(249,115,22,0.6)] ring-2 ring-white dark:ring-neutral-950">
                                {cartCount > 9 ? "9+" : cartCount}
                            </span>
                        )}
                    </Link>

                    <span className="mx-1.5 hidden h-6 w-px bg-black/10 dark:bg-white/10 md:block" />

                    {/* Account — desktop only */}
                    {isLoggedIn ? (
                        <div className="relative font-display hidden md:block" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen((p) => !p)}
                                aria-expanded={menuOpen}
                                className="flex items-center gap-2.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 transition-all hover:border-orange-400/30 hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
                            >
                                <Avatar size="h-7 w-7" />
                                <span className="max-w-[120px] truncate text-sm font-semibold tracking-[-0.01em] text-neutral-900 dark:text-white">
                                    {displayName}
                                </span>
                                <ChevronDown
                                    size={14}
                                    className={`text-neutral-400 dark:text-neutral-500 transition-transform duration-300 ${menuOpen ? "rotate-180 text-orange-400" : ""}`}
                                />
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2.5 w-64 origin-top-right overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-900/95 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                                    <div className="flex items-center gap-3 border-b border-black/[0.08] dark:border-white/[0.08] bg-gradient-to-br from-orange-500/[0.08] to-transparent px-4 py-4">
                                        <Avatar size="h-11 w-11" text="text-base" />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-bold tracking-[-0.01em] text-neutral-900 dark:text-white">{displayName}</p>
                                            {user?.email && (
                                                <p className="truncate text-xs text-neutral-400 dark:text-neutral-500">{user.email}</p>
                                            )}
                                        </div>
                                    </div>
                                    <Link
                                        to="/my-orders"
                                        onClick={() => setMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-neutral-900 dark:hover:text-white"
                                    >
                                        <PackageSearch size={16} className="text-orange-400" /> My orders
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 border-t border-black/[0.08] dark:border-white/[0.08] px-4 py-3.5 text-sm font-medium text-red-500 dark:text-red-400 transition-colors hover:bg-red-500/10"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="hidden items-center gap-2 rounded-xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 px-4 py-2.5 text-sm font-bold tracking-[-0.01em] text-white shadow-[0_6px_20px_-6px_rgba(249,115,22,0.8)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_26px_-6px_rgba(249,115,22,0.95)] md:flex"
                        >
                            <User size={15} strokeWidth={2.4} /> Login
                        </Link>
                    )}

                    <button
                        onClick={() => setMobileOpen((p) => !p)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] p-2.5 text-neutral-900 dark:text-white transition-all hover:bg-black/[0.06] dark:hover:bg-white/[0.08] md:hidden"
                    >
                        {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div
                className={`fixed inset-x-0 top-[68px] z-40 origin-top border-b border-black/10 dark:border-white/10 bg-white/97 dark:bg-neutral-950/97 backdrop-blur-2xl transition-all duration-300 md:hidden ${mobileOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-3 opacity-0"
                    }`}
            >
                <div className="max-h-[calc(100dvh-68px)] overflow-y-auto px-4 pb-8 pt-5">
                    {isLoggedIn && (
                        <div className="mb-5 flex items-center gap-3.5 rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-br from-orange-500/[0.1] to-black/[0.02] dark:to-white/[0.02] p-4">
                            <Avatar size="h-12 w-12" text="text-lg" />
                            <div className="min-w-0 flex-1">
                                <p className="truncate font-display text-[15px] font-bold tracking-[-0.02em] text-neutral-900 dark:text-white">
                                    {displayName}
                                </p>
                                {user?.email && (
                                    <p className="truncate text-xs text-neutral-400 dark:text-neutral-500">{user.email}</p>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mb-4 flex items-center justify-between px-4">
                        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-400 dark:text-neutral-600">
                            Menu
                        </p>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-300"
                        >
                            {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
                            {theme === "dark" ? "Light mode" : "Dark mode"}
                        </button>
                    </div>

                    <nav className="flex flex-col font-display gap-1.5">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                end={item.end}
                                onClick={() => setMobileOpen(false)}
                                className={mobileLink}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="my-5 h-px bg-gradient-to-r from-transparent via-black/12 dark:via-white/12 to-transparent" />

                    {isLoggedIn ? (
                        <div className="flex flex-col font-display gap-1.5">
                            <Link
                                to="/my-orders"
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-black/[0.04] dark:hover:bg-white/[0.05] hover:text-neutral-900 dark:hover:text-white"
                            >
                                <PackageSearch size={17} className="text-orange-400" /> My orders
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold text-red-500 dark:text-red-400 transition-colors hover:bg-red-500/10"
                            >
                                <LogOut size={17} /> Logout
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-orange-400 via-orange-500 to-amber-600 px-4 py-4 font-display text-[15px] font-bold tracking-[-0.01em] text-white shadow-[0_10px_28px_-8px_rgba(249,115,22,0.9)]"
                        >
                            <User size={17} strokeWidth={2.4} /> Login to continue
                        </Link>
                    )}
                </div>
            </div>

            {mobileOpen && (
                <div
                    onClick={() => setMobileOpen(false)}
                    className="fixed inset-0 top-[68px] z-30 bg-black/40 dark:bg-black/70 backdrop-blur-[2px] md:hidden"
                />
            )}
        </header>
    );
}
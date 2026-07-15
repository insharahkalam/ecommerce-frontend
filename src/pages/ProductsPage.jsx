// import { useState } from "react";
// import { Search, Heart, ShoppingCart, HelpCircle, Star, ChevronDown, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

// // ---- FAKE DATA (replace with API data later) ----
// const CATEGORIES = ["All Products", "Bags & Sleeves", "Stands & Docks", "Hubs & Adaptors", "Keyboards", "Mice & Trackpads"];

// const BRANDS = [
//     { name: "NexKit", checked: true },
//     { name: "Logitech", checked: false },
//     { name: "Belkin", checked: true },
//     { name: "Keychron", checked: false },
//     { name: "Anker", checked: false },
// ];

// const PRICE_RANGES = [
//     { label: "Under $25", checked: false },
//     { label: "$25 - $75", checked: true },
//     { label: "$75 - $150", checked: false },
//     { label: "$150+", checked: false },
// ];

// const COMPAT = [
//     { label: "MacBook", checked: true },
//     { label: "Windows Laptop", checked: false },
//     { label: "Universal", checked: false },
// ];

// const PRODUCTS = [
//     {
//         id: 1,
//         badge: "NEW",
//         badgeColor: "bg-cyan-400 text-neutral-950",
//         category: "Bags & Sleeves",
//         name: 'NexKit Pro Sleeve 14"',
//         rating: 4.8,
//         reviews: 210,
//         price: 49,
//         oldPrice: null,
//         img: "https://images.unsplash.com/photo-1547949003-9792a18a2645?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 2,
//         badge: "SALE",
//         badgeColor: "bg-rose-500 text-white",
//         category: "Bags & Sleeves",
//         name: 'ArmourShell Backpack 16"',
//         rating: 4.6,
//         reviews: 365,
//         price: 129,
//         oldPrice: 159,
//         img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 3,
//         badge: "BESTSELLER",
//         badgeColor: "bg-neutral-800 text-neutral-200",
//         category: "Stands & Docks",
//         name: "RiseX Aluminum Stand",
//         rating: 4.9,
//         reviews: 501,
//         price: 89,
//         oldPrice: null,
//         img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 4,
//         badge: "SALE",
//         badgeColor: "bg-rose-500 text-white",
//         category: "Stands & Docks",
//         name: "HubLink Pro 9-in-1",
//         rating: 4.4,
//         reviews: 142,
//         price: 74,
//         oldPrice: 99,
//         img: "https://images.unsplash.com/photo-1591290619762-c8ebe8d0f2a4?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 5,
//         badge: null,
//         badgeColor: "",
//         category: "Keyboards",
//         name: "Keychron K3 Low Profile",
//         rating: 4.8,
//         reviews: 890,
//         price: 109,
//         oldPrice: null,
//         img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 6,
//         badge: "HOT",
//         badgeColor: "bg-rose-500 text-white",
//         category: "Keyboards",
//         name: "MX Keys Compact",
//         rating: 4.7,
//         reviews: 654,
//         price: 99,
//         oldPrice: 119,
//         img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 7,
//         badge: "BESTSELLER",
//         badgeColor: "bg-neutral-800 text-neutral-200",
//         category: "Mice & Trackpads",
//         name: "Logitech MX Master 3S",
//         rating: 4.9,
//         reviews: 1203,
//         price: 99,
//         oldPrice: null,
//         img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
//     },
//     {
//         id: 8,
//         badge: "NEW",
//         badgeColor: "bg-cyan-400 text-neutral-950",
//         category: "Mice & Trackpads",
//         name: "NexKit Wireless Trackpad",
//         rating: 4.6,
//         reviews: 331,
//         price: 59,
//         oldPrice: null,
//         img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop&sat=-100",
//     },
// ];

// function Checkbox({ label, defaultChecked }) {
//     return (
//         <label className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-200 cursor-pointer select-none py-1">
//             <input
//                 type="checkbox"
//                 defaultChecked={defaultChecked}
//                 className="h-3.5 w-3.5 rounded-sm accent-cyan-400 bg-neutral-800 border-neutral-700"
//             />
//             {label}
//         </label>
//     );
// }

// function SidebarSection({ title, children }) {
//     return (
//         <div className="py-5 border-b border-neutral-800">
//             <h3 className="text-[11px] font-semibold tracking-[0.15em] text-neutral-500 mb-3">{title}</h3>
//             {children}
//         </div>
//     );
// }

// function ProductCard({ p }) {
//     return (
//         <div className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 transition-colors">
//             <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
//                 <img
//                     src={p.img}
//                     alt={p.name}
//                     className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                 />
//                 {p.badge && (
//                     <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wide px-2 py-1 rounded ${p.badgeColor}`}>
//                         {p.badge}
//                     </span>
//                 )}
//                 <button className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-neutral-950/60 backdrop-blur flex items-center justify-center text-neutral-300 hover:text-rose-400 transition-colors">
//                     <Heart className="h-3.5 w-3.5" />
//                 </button>
//             </div>

//             <div className="p-3.5">
//                 <p className="text-[10px] font-semibold tracking-[0.12em] text-cyan-400 uppercase">{p.category}</p>
//                 <h4 className="mt-1 text-sm font-medium text-neutral-100 truncate">{p.name}</h4>

//                 <div className="mt-1.5 flex items-center gap-1 text-[11px] text-neutral-500">
//                     <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
//                     <span className="text-neutral-300 font-medium">{p.rating}</span>
//                     <span>({p.reviews})</span>
//                 </div>

//                 <div className="mt-3 flex items-center justify-between">
//                     <div className="flex items-baseline gap-2">
//                         <span className="text-base font-semibold text-white">${p.price}</span>
//                         {p.oldPrice && (
//                             <span className="text-xs text-neutral-600 line-through">${p.oldPrice}</span>
//                         )}
//                     </div>
//                     <button className="text-[11px] font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-3 py-1.5 transition-colors">
//                         ADD
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default function ProductsPage() {
//     const [activeCategory, setActiveCategory] = useState("All Products");

//     return (
//         <div className="min-h-screen bg-neutral-950 text-white font-sans">
//             {/* NAVBAR */}
//             <header className="sticky top-0 z-20 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur">
//                 <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
//                     <div className="flex items-center gap-8">
//                         <div className="flex items-center gap-2">
//                             <div className="h-7 w-7 rounded-md bg-cyan-400 flex items-center justify-center text-neutral-950 font-black text-xs">N</div>
//                             <span className="font-bold tracking-wide text-sm">NEXKIT</span>
//                         </div>
//                         <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
//                             <a href="#" className="hover:text-white transition-colors">Bags &amp; Sleeves</a>
//                             <a href="#" className="hover:text-white transition-colors">Stands &amp; Docks</a>
//                             <a href="#" className="hover:text-white transition-colors">Keyboards &amp; Mice</a>
//                             <a href="#" className="text-rose-400 hover:text-rose-300 transition-colors">Bundles</a>
//                         </nav>
//                     </div>

//                     <div className="flex items-center gap-4">
//                         <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 w-56">
//                             <Search className="h-3.5 w-3.5 text-neutral-500" />
//                             <input
//                                 placeholder="Search products..."
//                                 className="bg-transparent text-xs text-neutral-300 placeholder-neutral-600 outline-none w-full"
//                             />
//                         </div>
//                         <button className="text-neutral-400 hover:text-white transition-colors">
//                             <Heart className="h-4.5 w-4.5" />
//                         </button>
//                         <button className="text-neutral-400 hover:text-white transition-colors">
//                             <ShoppingCart className="h-4.5 w-4.5" />
//                         </button>
//                         <button className="text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-4 py-2 transition-colors">
//                             Sign In
//                         </button>
//                     </div>
//                 </div>
//             </header>

//             {/* HERO */}
//             <section className="max-w-[1400px] mx-auto px-6 pt-12 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-800/80">
//                 <div>
//                     <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-3">New Collection · 2026</p>
//                     <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">
//                         Gear Up.
//                         <br />
//                         <span className="text-cyan-400">Work Harder.</span>
//                     </h1>
//                     <p className="mt-3 text-sm text-neutral-500 max-w-sm">
//                         Premium laptop accessories built for performance. Every detail engineered for the power user.
//                     </p>
//                     <div className="mt-6 flex items-center gap-6">
//                         <button className="text-xs font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-5 py-2.5 transition-colors">
//                             SHOP ALL
//                         </button>
//                         <a href="#" className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1">
//                             View Lookbook <span aria-hidden>↓</span>
//                         </a>
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-8">
//                     <div>
//                         <p className="text-2xl font-bold">200+</p>
//                         <p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1">Products</p>
//                     </div>
//                     <div className="h-8 w-px bg-neutral-800" />
//                     <div>
//                         <p className="text-2xl font-bold">50k+</p>
//                         <p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1">Reviews</p>
//                     </div>
//                     <div className="h-8 w-px bg-neutral-800" />
//                     <div>
//                         <p className="text-2xl font-bold flex items-center gap-1">
//                             4.8 <Star className="h-4 w-4 fill-cyan-400 text-cyan-400" />
//                         </p>
//                         <p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1 flex items-center gap-1">
//                             Avg. Rating <HelpCircle className="h-3 w-3" />
//                         </p>
//                     </div>
//                 </div>
//             </section>

//             {/* BODY */}
//             <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
//                 {/* SIDEBAR */}
//                 <aside className="hidden lg:block w-56 shrink-0">
//                     <SidebarSection title="CATEGORY">
//                         <div className="flex flex-col gap-1">
//                             {CATEGORIES.map((c) => (
//                                 <button
//                                     key={c}
//                                     onClick={() => setActiveCategory(c)}
//                                     className={`text-left text-sm rounded-md px-2.5 py-1.5 transition-colors ${activeCategory === c
//                                             ? "bg-cyan-400 text-neutral-950 font-semibold"
//                                             : "text-neutral-400 hover:text-white hover:bg-neutral-900"
//                                         }`}
//                                 >
//                                     {c}
//                                 </button>
//                             ))}
//                         </div>
//                     </SidebarSection>

//                     <SidebarSection title="BRAND">
//                         {BRANDS.map((b) => (
//                             <Checkbox key={b.name} label={b.name} defaultChecked={b.checked} />
//                         ))}
//                     </SidebarSection>

//                     <SidebarSection title="PRICE RANGE">
//                         {PRICE_RANGES.map((p) => (
//                             <Checkbox key={p.label} label={p.label} defaultChecked={p.checked} />
//                         ))}
//                     </SidebarSection>

//                     <SidebarSection title="COMPATIBILITY">
//                         {COMPAT.map((c) => (
//                             <Checkbox key={c.label} label={c.label} defaultChecked={c.checked} />
//                         ))}
//                     </SidebarSection>
//                 </aside>

//                 {/* PRODUCT GRID */}
//                 <main className="flex-1">
//                     <div className="flex items-center justify-between mb-5">
//                         <p className="text-sm text-neutral-500">
//                             Showing <span className="text-neutral-200 font-medium">{PRODUCTS.length}</span> products
//                         </p>
//                         <div className="flex items-center gap-2">
//                             <button className="flex items-center gap-1.5 text-xs text-neutral-300 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 hover:border-neutral-700">
//                                 Sort: Best Selling <ChevronDown className="h-3.5 w-3.5" />
//                             </button>
//                             <button className="h-8 w-8 flex items-center justify-center rounded-md bg-cyan-400 text-neutral-950">
//                                 <LayoutGrid className="h-4 w-4" />
//                             </button>
//                             <button className="h-8 w-8 flex items-center justify-center rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white">
//                                 <List className="h-4 w-4" />
//                             </button>
//                         </div>
//                     </div>

//                     <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
//                         {PRODUCTS.map((p) => (
//                             <ProductCard key={p.id} p={p} />
//                         ))}
//                     </div>

//                     {/* PAGINATION */}
//                     <div className="mt-10 flex items-center justify-center gap-2">
//                         <button className="h-8 w-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-white">
//                             <ChevronLeft className="h-4 w-4" />
//                         </button>
//                         {[1, 2, 3, 4, 5, 6].map((n) => (
//                             <button
//                                 key={n}
//                                 className={`h-8 w-8 flex items-center justify-center rounded-md text-sm transition-colors ${n === 1
//                                         ? "bg-cyan-400 text-neutral-950 font-semibold"
//                                         : "text-neutral-400 hover:text-white hover:bg-neutral-900"
//                                     }`}
//                             >
//                                 {n}
//                             </button>
//                         ))}
//                         <button className="h-8 w-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-white">
//                             <ChevronRight className="h-4 w-4" />
//                         </button>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// }




import { useMemo, useState } from "react";
import {
    Search, Heart, ShoppingCart, HelpCircle, Star, ChevronDown,
    LayoutGrid, List, ChevronLeft, ChevronRight, X, Filter, Check,
    Trash2, Plus, Minus,
} from "lucide-react";

const CATEGORIES = ["All Products", "Bags & Sleeves", "Stands & Docks", "Hubs & Adaptors", "Keyboards", "Mice & Trackpads"];
const BRANDS = ["NexKit", "Logitech", "Belkin", "Keychron", "Anker"];
const PRICE_RANGES = [
    { label: "Under $25", min: 0, max: 25 },
    { label: "$25 - $75", min: 25, max: 75 },
    { label: "$75 - $150", min: 75, max: 150 },
    { label: "$150+", min: 150, max: Infinity },
];
const COMPAT = ["MacBook", "Windows Laptop", "Universal"];

const PRODUCTS = [
    { id: 1, badge: "NEW", badgeColor: "bg-cyan-400 text-neutral-950", category: "Bags & Sleeves", brand: "NexKit", compat: ["MacBook", "Universal"], name: 'NexKit Pro Sleeve 14"', rating: 4.8, reviews: 210, price: 49, oldPrice: null, img: "https://images.unsplash.com/photo-1547949003-9792a18a2645?q=80&w=600&auto=format&fit=crop", createdAt: 8 },
    { id: 2, badge: "SALE", badgeColor: "bg-rose-500 text-white", category: "Bags & Sleeves", brand: "Belkin", compat: ["Universal"], name: 'ArmourShell Backpack 16"', rating: 4.6, reviews: 365, price: 129, oldPrice: 159, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop", createdAt: 5 },
    { id: 3, badge: "BESTSELLER", badgeColor: "bg-neutral-800 text-neutral-200", category: "Stands & Docks", brand: "NexKit", compat: ["MacBook", "Windows Laptop"], name: "RiseX Aluminum Stand", rating: 4.9, reviews: 501, price: 89, oldPrice: null, img: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=600&auto=format&fit=crop", createdAt: 7 },
    { id: 4, badge: "SALE", badgeColor: "bg-rose-500 text-white", category: "Stands & Docks", brand: "Anker", compat: ["Universal"], name: "HubLink Pro 9-in-1", rating: 4.4, reviews: 142, price: 74, oldPrice: 99, img: "https://images.unsplash.com/photo-1591290619762-c8ebe8d0f2a4?q=80&w=600&auto=format&fit=crop", createdAt: 4 },
    { id: 5, badge: null, badgeColor: "", category: "Keyboards", brand: "Keychron", compat: ["MacBook", "Windows Laptop"], name: "Keychron K3 Low Profile", rating: 4.8, reviews: 890, price: 109, oldPrice: null, img: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop", createdAt: 3 },
    { id: 6, badge: "HOT", badgeColor: "bg-rose-500 text-white", category: "Keyboards", brand: "Logitech", compat: ["Windows Laptop", "MacBook"], name: "MX Keys Compact", rating: 4.7, reviews: 654, price: 99, oldPrice: 119, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", createdAt: 6 },
    { id: 7, badge: "BESTSELLER", badgeColor: "bg-neutral-800 text-neutral-200", category: "Mice & Trackpads", brand: "Logitech", compat: ["Windows Laptop", "MacBook"], name: "Logitech MX Master 3S", rating: 4.9, reviews: 1203, price: 99, oldPrice: null, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop", createdAt: 2 },
    { id: 8, badge: "NEW", badgeColor: "bg-cyan-400 text-neutral-950", category: "Mice & Trackpads", brand: "NexKit", compat: ["MacBook"], name: "NexKit Wireless Trackpad", rating: 4.6, reviews: 331, price: 59, oldPrice: null, img: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop&sat=-100", createdAt: 9 },
    { id: 9, badge: null, badgeColor: "", category: "Hubs & Adaptors", brand: "Anker", compat: ["Universal"], name: "Anker 7-in-1 USB-C Hub", rating: 4.5, reviews: 420, price: 39, oldPrice: null, img: "https://images.unsplash.com/photo-1625948515291-69613efd103f?q=80&w=600&auto=format&fit=crop", createdAt: 1 },
    { id: 10, badge: "SALE", badgeColor: "bg-rose-500 text-white", category: "Hubs & Adaptors", brand: "Belkin", compat: ["MacBook", "Universal"], name: "Belkin Thunderbolt Dock", rating: 4.7, reviews: 289, price: 189, oldPrice: 249, img: "https://images.unsplash.com/photo-1625961332771-3f40b0e2bdcf?q=80&w=600&auto=format&fit=crop", createdAt: 10 },
];

const PAGE_SIZE = 6;
const SORTS = [
    { key: "best", label: "Best Selling" },
    { key: "newest", label: "Newest" },
    { key: "priceLow", label: "Price: Low to High" },
    { key: "priceHigh", label: "Price: High to Low" },
    { key: "rating", label: "Top Rated" },
];

function Checkbox({ label, checked, onChange }) {
    return (
        <label className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 cursor-pointer select-none py-1 group">
            <span className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${checked ? "bg-cyan-400 border-cyan-400" : "bg-neutral-900 border-neutral-700 group-hover:border-neutral-500"}`}>
                {checked && <Check className="h-3 w-3 text-neutral-950" strokeWidth={3} />}
            </span>
            <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
            {label}
        </label>
    );
}

function SidebarSection({ title, children }) {
    return (
        <div className="py-5 border-b border-neutral-800">
            <h3 className="text-[11px] font-semibold tracking-[0.15em] text-neutral-500 mb-3">{title}</h3>
            {children}
        </div>
    );
}

function ProductCard({ p, onAdd, onToggleWish, wished }) {
    return (
        <div className="group rounded-xl overflow-hidden bg-neutral-900/60 border border-neutral-800 hover:border-cyan-400/40 hover:shadow-[0_0_0_1px_rgba(34,211,238,0.15),0_10px_40px_-15px_rgba(34,211,238,0.35)] transition-all">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-800">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {p.badge && <span className={`absolute top-2.5 left-2.5 text-[10px] font-bold tracking-wide px-2 py-1 rounded ${p.badgeColor}`}>{p.badge}</span>}
                <button aria-label="Toggle wishlist" onClick={() => onToggleWish(p.id)} className={`absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-neutral-950/70 backdrop-blur flex items-center justify-center transition-colors ${wished ? "text-rose-400" : "text-neutral-300 hover:text-rose-400"}`}>
                    <Heart className={`h-4 w-4 ${wished ? "fill-rose-400" : ""}`} />
                </button>
            </div>
            <div className="p-3.5">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-cyan-400 uppercase">{p.category}</p>
                <h4 className="mt-1 text-sm font-medium text-neutral-100 truncate">{p.name}</h4>
                <div className="mt-1.5 flex items-center gap-1 text-[11px] text-neutral-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-neutral-300 font-medium">{p.rating}</span>
                    <span>({p.reviews})</span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-base font-semibold text-white">${p.price}</span>
                        {p.oldPrice && <span className="text-xs text-neutral-600 line-through">${p.oldPrice}</span>}
                    </div>
                    <button onClick={() => onAdd(p)} className="text-[11px] font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-3 py-1.5 transition-colors active:scale-95">ADD</button>
                </div>
            </div>
        </div>
    );
}

function ProductRow({ p, onAdd, onToggleWish, wished }) {
    return (
        <div className="flex gap-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 p-3 transition-colors">
            <div className="relative w-40 shrink-0 aspect-[4/3] rounded-lg overflow-hidden bg-neutral-800">
                <img src={p.img} alt={p.name} className="h-full w-full object-cover" />
                {p.badge && <span className={`absolute top-1.5 left-1.5 text-[9px] font-bold tracking-wide px-1.5 py-0.5 rounded ${p.badgeColor}`}>{p.badge}</span>}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-cyan-400 uppercase">{p.category} · {p.brand}</p>
                <h4 className="mt-0.5 text-sm font-medium text-neutral-100 truncate">{p.name}</h4>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-neutral-500">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="text-neutral-300 font-medium">{p.rating}</span>
                    <span>({p.reviews} reviews)</span>
                </div>
                <p className="mt-1 text-[11px] text-neutral-500 line-clamp-2">Compatible with {p.compat.join(", ")}. Premium build. Ships free over $50.</p>
                <div className="mt-auto pt-2 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                        <span className="text-base font-semibold text-white">${p.price}</span>
                        {p.oldPrice && <span className="text-xs text-neutral-600 line-through">${p.oldPrice}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                        <button onClick={() => onToggleWish(p.id)} className={`h-8 w-8 rounded-md border border-neutral-800 flex items-center justify-center ${wished ? "text-rose-400" : "text-neutral-400 hover:text-rose-400"}`}>
                            <Heart className={`h-4 w-4 ${wished ? "fill-rose-400" : ""}`} />
                        </button>
                        <button onClick={() => onAdd(p)} className="text-[11px] font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-3 py-1.5">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [brands, setBrands] = useState(["NexKit", "Belkin"]);
    const [prices, setPrices] = useState(["$25 - $75"]);
    const [compat, setCompat] = useState(["MacBook"]);
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("best");
    const [sortOpen, setSortOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [page, setPage] = useState(1);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartOpen, setCartOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const toggle = (arr, v) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

    const filtered = useMemo(() => {
        let list = PRODUCTS.slice();
        if (activeCategory !== "All Products") list = list.filter((p) => p.category === activeCategory);
        if (brands.length) list = list.filter((p) => brands.includes(p.brand));
        if (compat.length) list = list.filter((p) => p.compat.some((c) => compat.includes(c)));
        if (prices.length) {
            list = list.filter((p) => prices.some((label) => {
                const r = PRICE_RANGES.find((x) => x.label === label);
                return p.price >= r.min && p.price < r.max;
            }));
        }
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
        }
        switch (sort) {
            case "priceLow": list.sort((a, b) => a.price - b.price); break;
            case "priceHigh": list.sort((a, b) => b.price - a.price); break;
            case "rating": list.sort((a, b) => b.rating - a.rating); break;
            case "newest": list.sort((a, b) => b.createdAt - a.createdAt); break;
            default: list.sort((a, b) => b.reviews - a.reviews);
        }
        return list;
    }, [activeCategory, brands, compat, prices, query, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const flashToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 1800); };

    const addToCart = (p) => {
        setCart((c) => {
            const found = c.find((i) => i.product.id === p.id);
            if (found) return c.map((i) => (i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i));
            return [...c, { product: p, qty: 1 }];
        });
        flashToast(`Added "${p.name}" to cart`);
    };
    const updateQty = (id, delta) => setCart((c) => c.map((i) => (i.product.id === id ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0));
    const removeFromCart = (id) => setCart((c) => c.filter((i) => i.product.id !== id));
    const toggleWish = (id) => setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const cartTotal = cart.reduce((s, i) => s + i.qty * i.product.price, 0);

    const clearFilters = () => {
        setActiveCategory("All Products"); setBrands([]); setPrices([]); setCompat([]); setQuery(""); setPage(1);
    };

    const activeFilterCount = (activeCategory !== "All Products" ? 1 : 0) + brands.length + prices.length + compat.length + (query ? 1 : 0);

    const Sidebar = (
        <>
            <SidebarSection title="CATEGORY">
                <div className="flex flex-col gap-1">
                    {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => { setActiveCategory(c); setPage(1); }}
                            className={`text-left text-sm rounded-md px-2.5 py-1.5 transition-colors ${activeCategory === c ? "bg-cyan-400 text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white hover:bg-neutral-900"}`}>
                            {c}
                        </button>
                    ))}
                </div>
            </SidebarSection>
            <SidebarSection title="BRAND">
                {BRANDS.map((b) => <Checkbox key={b} label={b} checked={brands.includes(b)} onChange={() => { setBrands((x) => toggle(x, b)); setPage(1); }} />)}
            </SidebarSection>
            <SidebarSection title="PRICE RANGE">
                {PRICE_RANGES.map((p) => <Checkbox key={p.label} label={p.label} checked={prices.includes(p.label)} onChange={() => { setPrices((x) => toggle(x, p.label)); setPage(1); }} />)}
            </SidebarSection>
            <SidebarSection title="COMPATIBILITY">
                {COMPAT.map((c) => <Checkbox key={c} label={c} checked={compat.includes(c)} onChange={() => { setCompat((x) => toggle(x, c)); setPage(1); }} />)}
            </SidebarSection>
            {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="mt-4 w-full text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 rounded-md py-2 transition-colors">
                    Clear all filters ({activeFilterCount})
                </button>
            )}
        </>
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-white font-sans">
            <header className="sticky top-0 z-20 border-b border-neutral-800/80 bg-neutral-950/90 backdrop-blur">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-md bg-cyan-400 flex items-center justify-center text-neutral-950 font-black text-xs">N</div>
                            <span className="font-bold tracking-wide text-sm">NEXKIT</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-400">
                            <a href="#" className="hover:text-white transition-colors">Bags &amp; Sleeves</a>
                            <a href="#" className="hover:text-white transition-colors">Stands &amp; Docks</a>
                            <a href="#" className="hover:text-white transition-colors">Keyboards &amp; Mice</a>
                            <a href="#" className="text-rose-400 hover:text-rose-300 transition-colors">Bundles</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 w-56 focus-within:border-cyan-400/60 transition-colors">
                            <Search className="h-3.5 w-3.5 text-neutral-500" />
                            <input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Search products..." className="bg-transparent text-xs text-neutral-200 placeholder-neutral-600 outline-none w-full" />
                            {query && <button onClick={() => setQuery("")} className="text-neutral-500 hover:text-white"><X className="h-3 w-3" /></button>}
                        </div>
                        <button className="relative text-neutral-400 hover:text-white transition-colors" aria-label="Wishlist">
                            <Heart className="h-5 w-5" />
                            {wishlist.length > 0 && <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full bg-rose-500 text-[10px] font-bold flex items-center justify-center">{wishlist.length}</span>}
                        </button>
                        <button onClick={() => setCartOpen(true)} className="relative text-neutral-400 hover:text-white transition-colors" aria-label="Cart">
                            <ShoppingCart className="h-5 w-5" />
                            {cartCount > 0 && <span className="absolute -top-1.5 -right-1.5 h-4 min-w-4 px-1 rounded-full bg-cyan-400 text-neutral-950 text-[10px] font-bold flex items-center justify-center">{cartCount}</span>}
                        </button>
                        <button className="hidden sm:block text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-4 py-2 transition-colors">Sign In</button>
                    </div>
                </div>
            </header>

            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-12 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-neutral-800/80">
                <div>
                    <p className="text-[11px] font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-3">New Collection · 2026</p>
                    <h1 className="font-serif text-4xl sm:text-5xl font-bold leading-tight">Gear Up.<br /><span className="text-cyan-400">Work Harder.</span></h1>
                    <p className="mt-3 text-sm text-neutral-500 max-w-sm">Premium laptop accessories built for performance. Every detail engineered for the power user.</p>
                    <div className="mt-6 flex items-center gap-6">
                        <button onClick={() => { clearFilters(); window.scrollTo({ top: 500, behavior: "smooth" }); }} className="text-xs font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-5 py-2.5 transition-colors">SHOP ALL</button>
                        <a href="#" className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1">View Lookbook <span aria-hidden>↓</span></a>
                    </div>
                </div>
                <div className="flex items-center gap-6 sm:gap-8">
                    <div><p className="text-2xl font-bold">200+</p><p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1">Products</p></div>
                    <div className="h-8 w-px bg-neutral-800" />
                    <div><p className="text-2xl font-bold">50k+</p><p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1">Reviews</p></div>
                    <div className="h-8 w-px bg-neutral-800" />
                    <div>
                        <p className="text-2xl font-bold flex items-center gap-1">4.8 <Star className="h-4 w-4 fill-cyan-400 text-cyan-400" /></p>
                        <p className="text-[10px] tracking-widest text-neutral-500 uppercase mt-1 flex items-center gap-1">Avg. Rating <HelpCircle className="h-3 w-3" /></p>
                    </div>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 flex gap-8">
                <aside className="hidden lg:block w-56 shrink-0">{Sidebar}</aside>

                <main className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                        <div className="flex items-center gap-3">
                            <button onClick={() => setFiltersOpen(true)} className="lg:hidden flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5">
                                <Filter className="h-3.5 w-3.5" />Filters
                                {activeFilterCount > 0 && <span className="ml-1 h-4 min-w-4 px-1 rounded-full bg-cyan-400 text-neutral-950 text-[10px] font-bold flex items-center justify-center">{activeFilterCount}</span>}
                            </button>
                            <p className="text-sm text-neutral-500">Showing <span className="text-neutral-200 font-medium">{filtered.length}</span> products</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <button onClick={() => setSortOpen((v) => !v)} className="flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 hover:border-neutral-700">
                                    Sort: {SORTS.find((s) => s.key === sort)?.label} <ChevronDown className="h-3.5 w-3.5" />
                                </button>
                                {sortOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                                        <div className="absolute right-0 mt-1 w-48 z-20 rounded-md border border-neutral-800 bg-neutral-900 shadow-xl overflow-hidden">
                                            {SORTS.map((s) => (
                                                <button key={s.key} onClick={() => { setSort(s.key); setSortOpen(false); }}
                                                    className={`w-full text-left text-xs px-3 py-2 transition-colors ${sort === s.key ? "bg-cyan-400/10 text-cyan-300" : "text-neutral-300 hover:bg-neutral-800"}`}>
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <button onClick={() => setView("grid")} aria-label="Grid view" className={`h-8 w-8 flex items-center justify-center rounded-md ${view === "grid" ? "bg-cyan-400 text-neutral-950" : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"}`}><LayoutGrid className="h-4 w-4" /></button>
                            <button onClick={() => setView("list")} aria-label="List view" className={`h-8 w-8 flex items-center justify-center rounded-md ${view === "list" ? "bg-cyan-400 text-neutral-950" : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white"}`}><List className="h-4 w-4" /></button>
                        </div>
                    </div>

                    {paged.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-neutral-800 bg-neutral-900/30 py-20 text-center">
                            <p className="text-neutral-400 text-sm">No products match your filters.</p>
                            <button onClick={clearFilters} className="mt-4 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md px-4 py-2">Reset filters</button>
                        </div>
                    ) : view === "grid" ? (
                        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {paged.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} onToggleWish={toggleWish} wished={wishlist.includes(p.id)} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {paged.map((p) => <ProductRow key={p.id} p={p} onAdd={addToCart} onToggleWish={toggleWish} wished={wishlist.includes(p.id)} />)}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-10 flex items-center justify-center gap-2">
                            <button disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="h-8 w-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-white disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                                <button key={n} onClick={() => setPage(n)} className={`h-8 w-8 flex items-center justify-center rounded-md text-sm transition-colors ${n === currentPage ? "bg-cyan-400 text-neutral-950 font-semibold" : "text-neutral-400 hover:text-white hover:bg-neutral-900"}`}>{n}</button>
                            ))}
                            <button disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="h-8 w-8 flex items-center justify-center rounded-md text-neutral-500 hover:text-white disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
                        </div>
                    )}
                </main>
            </div>

            {filtersOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setFiltersOpen(false)} />
                    <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-neutral-950 border-r border-neutral-800 p-5 overflow-y-auto">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-semibold tracking-wide">FILTERS</h2>
                            <button onClick={() => setFiltersOpen(false)} className="text-neutral-500 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        {Sidebar}
                    </div>
                </div>
            )}

            {cartOpen && (
                <div className="fixed inset-0 z-40">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-96 max-w-[92%] bg-neutral-950 border-l border-neutral-800 flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
                            <h2 className="text-sm font-semibold tracking-wide">YOUR CART ({cartCount})</h2>
                            <button onClick={() => setCartOpen(false)} className="text-neutral-500 hover:text-white"><X className="h-5 w-5" /></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-5">
                            {cart.length === 0 ? (
                                <div className="text-center py-20 text-sm text-neutral-500">
                                    <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-neutral-700" />
                                    Your cart is empty.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {cart.map((i) => (
                                        <div key={i.product.id} className="flex gap-3 pb-4 border-b border-neutral-800/70 last:border-0">
                                            <img src={i.product.img} alt={i.product.name} className="h-16 w-16 rounded-md object-cover bg-neutral-800" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-neutral-100 truncate">{i.product.name}</p>
                                                <p className="text-xs text-neutral-500">${i.product.price} each</p>
                                                <div className="mt-2 flex items-center gap-2">
                                                    <button onClick={() => updateQty(i.product.id, -1)} className="h-6 w-6 rounded border border-neutral-800 text-neutral-300 hover:border-neutral-600 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                                                    <span className="text-xs w-6 text-center">{i.qty}</span>
                                                    <button onClick={() => updateQty(i.product.id, 1)} className="h-6 w-6 rounded border border-neutral-800 text-neutral-300 hover:border-neutral-600 flex items-center justify-center"><Plus className="h-3 w-3" /></button>
                                                    <button onClick={() => removeFromCart(i.product.id)} className="ml-auto text-neutral-500 hover:text-rose-400"><Trash2 className="h-3.5 w-3.5" /></button>
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold whitespace-nowrap">${i.qty * i.product.price}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {cart.length > 0 && (
                            <div className="p-5 border-t border-neutral-800">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs tracking-widest text-neutral-500">SUBTOTAL</span>
                                    <span className="text-lg font-bold">${cartTotal}</span>
                                </div>
                                <button onClick={() => flashToast("Checkout coming soon 🚀")} className="w-full text-xs font-bold tracking-wide bg-cyan-400 hover:bg-cyan-300 text-neutral-950 rounded-md py-3 transition-colors">CHECKOUT</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-neutral-900 border border-neutral-700 text-sm text-neutral-100 px-4 py-2.5 rounded-lg shadow-xl">{toast}</div>
            )}
        </div>
    );
}

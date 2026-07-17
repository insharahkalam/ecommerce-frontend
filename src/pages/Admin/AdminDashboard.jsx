// import React, { useState, useMemo } from "react";
// import {
//   LayoutGrid, Package, ShoppingCart, Users, BarChart3, Settings,
//   Search, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, Menu, X,
//   MoreHorizontal, Plus, Trash2, Pencil, Check, ChevronLeft, ChevronRight,
//   Mail, Phone, Filter, Upload, Tag, Star, Loader2, AlertCircle
// } from "lucide-react";
// import {
//   AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
// } from "recharts";
// import { IoMdAppstore } from "react-icons/io";

// /* ---------------------------------------------------------
//    DESIGN SYSTEM — matched to the original "Signup" screen:
//    neutral-950 ground, ambient orange glows, dotted-noise
//    overlay, gradient hairline borders on glass cards,
//    italic serif headlines, serif body copy, mono for
//    anything countable (money, SKUs, quantities).
//    --------------------------------------------------------- */

// // Point this at your real API. Matches the createProduct controller:
// // expects multipart/form-data with title, description, price, category,
// // brand, stock, discount, featured, specifications (JSON string), image (file)
// const API_BASE_URL = "/api/products";

// const revenueData = [
//   { day: "Mon", revenue: 4200, orders: 38 },
//   { day: "Tue", revenue: 3800, orders: 34 },
//   { day: "Wed", revenue: 5100, orders: 47 },
//   { day: "Thu", revenue: 4700, orders: 41 },
//   { day: "Fri", revenue: 6300, orders: 55 },
//   { day: "Sat", revenue: 7400, orders: 63 },
//   { day: "Sun", revenue: 6800, orders: 58 },
// ];

// const initialOrders = [
//   { id: "ORD-10482", customer: "Ayesha Khan", items: 3, total: 128.5, status: "Fulfilled", date: "Jul 17" },
//   { id: "ORD-10481", customer: "Bilal Ahmed", items: 1, total: 42.0, status: "Pending", date: "Jul 17" },
//   { id: "ORD-10480", customer: "Sara Malik", items: 5, total: 310.75, status: "Fulfilled", date: "Jul 16" },
//   { id: "ORD-10479", customer: "Usman Tariq", items: 2, total: 76.2, status: "Refunded", date: "Jul 16" },
//   { id: "ORD-10478", customer: "Hina Sheikh", items: 4, total: 189.99, status: "Pending", date: "Jul 16" },
//   { id: "ORD-10477", customer: "Zain Raza", items: 1, total: 25.0, status: "Fulfilled", date: "Jul 15" },
//   { id: "ORD-10476", customer: "Fatima Noor", items: 2, total: 64.4, status: "Fulfilled", date: "Jul 15" },
//   { id: "ORD-10475", customer: "Ahmed Raza", items: 6, total: 402.1, status: "Pending", date: "Jul 14" },
// ];

// const initialProducts = [
//   { id: "CT-OL-01", name: "Canvas Tote — Olive", category: "Bags", price: 30, stock: 86, sold: 214 },
//   { id: "CM-SET-04", name: "Ceramic Mug Set", category: "Kitchen", price: 24, stock: 42, sold: 178 },
//   { id: "LT-BL-02", name: "Linen Throw Blanket", category: "Home", price: 60, stock: 12, sold: 96 },
//   { id: "DL-BR-07", name: "Desk Lamp — Brass", category: "Lighting", price: 55, stock: 5, sold: 61 },
//   { id: "WV-RG-03", name: "Woven Jute Rug", category: "Home", price: 90, stock: 0, sold: 38 },
//   { id: "PL-VS-09", name: "Stoneware Vase", category: "Decor", price: 34, stock: 27, sold: 52 },
// ];

// const initialCustomers = [
//   { id: "CUS-001", name: "Ayesha Khan", email: "ayesha.khan@mail.com", phone: "+92 300 1234567", orders: 12, spent: 1420.5, joined: "Feb 2025" },
//   { id: "CUS-002", name: "Bilal Ahmed", email: "bilal.ahmed@mail.com", phone: "+92 301 2345678", orders: 4, spent: 312.0, joined: "May 2025" },
//   { id: "CUS-003", name: "Sara Malik", email: "sara.malik@mail.com", phone: "+92 302 3456789", orders: 21, spent: 2870.75, joined: "Nov 2024" },
//   { id: "CUS-004", name: "Usman Tariq", email: "usman.tariq@mail.com", phone: "+92 303 4567890", orders: 2, spent: 118.2, joined: "Jul 2025" },
//   { id: "CUS-005", name: "Hina Sheikh", email: "hina.sheikh@mail.com", phone: "+92 304 5678901", orders: 8, spent: 940.4, joined: "Jan 2025" },
// ];

// const navItems = [
//   { key: "dashboard", label: "Dashboard", icon: LayoutGrid },
//   { key: "orders", label: "Orders", icon: ShoppingCart },
//   { key: "products", label: "Products", icon: Package },
//   { key: "customers", label: "Customers", icon: Users },
//   { key: "analytics", label: "Analytics", icon: BarChart3 },
//   { key: "settings", label: "Settings", icon: Settings },
// ];

// const ORDER_STATUSES = ["Pending", "Fulfilled", "Refunded"];

// function statusStyle(status) {
//   switch (status) {
//     case "Fulfilled":
//       return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)" };
//     case "Pending":
//       return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)" };
//     case "Refunded":
//       return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)" };
//     default:
//       return { color: "#A3A3A3", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" };
//   }
// }

// function stockStyle(stock) {
//   if (stock === 0) return { color: "#F3897E", bg: "rgba(243,137,126,0.12)", border: "rgba(243,137,126,0.25)", label: "Out of stock" };
//   if (stock <= 10) return { color: "#FBBF6B", bg: "rgba(251,191,107,0.12)", border: "rgba(251,191,107,0.25)", label: "Low stock" };
//   return { color: "#7FE0A8", bg: "rgba(15,107,79,0.18)", border: "rgba(127,224,168,0.25)", label: "In stock" };
// }

// /* Gradient-bordered glass card, same recipe as the signup panel */
// function GlassCard({ children, className = "" }) {
//   return (
//     <div className={`rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-xl shadow-black/40 ${className}`}>
//       <div className="rounded-2xl h-full bg-neutral-950/90 backdrop-blur-xl">
//         {children}
//       </div>
//     </div>
//   );
// }

// function StatCard({ label, value, delta, positive, prefix }) {
//   return (
//     <GlassCard>
//       <div className="p-5 flex flex-col gap-3">
//         <span className="text-xs uppercase tracking-[0.18em] text-neutral-500 font-serif">{label}</span>
//         <span className="font-display text-3xl text-white tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>
//           {prefix}{value}
//         </span>
//         <div className="flex items-center gap-1 text-xs font-display" style={{ color: positive ? "#7FE0A8" : "#F3897E" }}>
//           {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
//           <span>{delta}</span>
//           <span className="text-neutral-500 font-serif ml-1">vs last week</span>
//         </div>
//       </div>
//     </GlassCard>
//   );
// }

// function Pill({ children, color, bg, border }) {
//   return (
//     <span className="px-2.5 py-1 rounded-full text-xs font-serif border whitespace-nowrap" style={{ background: bg, color, borderColor: border }}>
//       {children}
//     </span>
//   );
// }

// function SearchInput({ value, onChange, placeholder }) {
//   return (
//     <div className="flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
//       <Search size={16} color="#A3A3A3" />
//       <input
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder={placeholder}
//         className="bg-transparent outline-none text-sm w-full font-serif text-white placeholder:text-neutral-500"
//       />
//     </div>
//   );
// }

// function PrimaryButton({ children, onClick, className = "", disabled = false, type = "button" }) {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       disabled={disabled}
//       className={`font-display flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/20 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// function SecondaryButton({ children, onClick, className = "" }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`font-display flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white transition-all ${className}`}
//     >
//       {children}
//     </button>
//   );
// }

// function Modal({ title, onClose, children, wide = false }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className={`relative w-full ${wide ? "max-w-2xl" : "max-w-md"} rounded-2xl p-[1px] bg-gradient-to-b from-orange-500/40 via-white/10 to-transparent shadow-2xl max-h-[90vh]`}>
//         <div className="rounded-2xl bg-neutral-950 p-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
//           <div className="flex items-center justify-between mb-5 sticky -top-6 bg-neutral-950 pt-0">
//             <h3 className="font-display italic text-lg font-semibold text-white">{title}</h3>
//             <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
//               <X size={18} />
//             </button>
//           </div>
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// }

// function FieldLabel({ children, required = false }) {
//   return (
//     <label className="block text-xs uppercase tracking-[0.14em] text-neutral-500 font-serif mb-1.5">
//       {children} {required && <span className="text-orange-400">*</span>}
//     </label>
//   );
// }

// function TextField(props) {
//   return (
//     <input
//       {...props}
//       className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white placeholder:text-neutral-600 outline-none focus:border-orange-500/50 transition-colors"
//     />
//   );
// }

// function TextArea(props) {
//   return (
//     <textarea
//       {...props}
//       className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white placeholder:text-neutral-600 outline-none focus:border-orange-500/50 transition-colors resize-none"
//     />
//   );
// }

// /* ---------------------------------------------------------
//    PAGES
//    --------------------------------------------------------- */

// function DashboardPage({ orders, products, customers, goTo }) {
//   const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
//   const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
//   const recentOrders = orders.slice(0, 6);

//   return (
//     <>
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Overview</h1>
//           <p className="text-sm mt-1 text-neutral-400 font-serif">Friday, 17 July — here's how the store is doing this week.</p>
//         </div>
//         <PrimaryButton onClick={() => goTo("products")}>
//           <Plus size={16} /> Add product
//         </PrimaryButton>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//         <StatCard label="Revenue" value={totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} prefix="$" delta="12.4%" positive />
//         <StatCard label="Orders" value={orders.length} delta="6.1%" positive />
//         <StatCard label="Customers" value={customers.length} delta="2.3%" positive />
//         <StatCard label="Avg. order value" value={(totalRevenue / Math.max(orders.length, 1)).toFixed(2)} prefix="$" delta="4.7%" positive />
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
//         <GlassCard className="xl:col-span-2">
//           <div className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-display italic text-base font-semibold text-white">Revenue this week</h2>
//               <span className="font-mono text-xs px-2 py-1 rounded border border-orange-500/25 bg-orange-500/10 text-orange-400">+12.4%</span>
//             </div>
//             <ResponsiveContainer width="100%" height={240}>
//               <AreaChart data={revenueData} margin={{ left: -20, right: 10, top: 10 }}>
//                 <defs>
//                   <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
//                     <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.08)" vertical={false} />
//                 <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
//                 <YAxis tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
//                 <Tooltip
//                   contentStyle={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "#0a0a0a", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}
//                   labelStyle={{ color: "#fff" }}
//                   formatter={(value, name) => [name === "revenue" ? `$${value}` : value, name === "revenue" ? "Revenue" : "Orders"]}
//                 />
//                 <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#rev)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </GlassCard>

//         <GlassCard>
//           <div className="p-5 flex flex-col gap-4">
//             <div className="flex items-center justify-between">
//               <h2 className="font-display italic text-base font-semibold text-white">Top products</h2>
//               <button onClick={() => goTo("products")} className="text-xs font-serif text-orange-400 hover:text-orange-300">View all</button>
//             </div>
//             {topProducts.map((p) => (
//               <div key={p.id} className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
//                   {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
//                 </div>
//                 <div className="min-w-0 flex-1">
//                   <p className="text-sm font-serif text-white truncate">{p.name}</p>
//                   <p className="font-mono text-xs text-neutral-500">{p.id} · {p.sold} sold</p>
//                 </div>
//                 <span className="font-mono text-sm text-white">${(p.sold * p.price).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </GlassCard>
//       </div>

//       <GlassCard>
//         <div className="p-5">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="font-display italic text-base font-semibold text-white">Recent orders</h2>
//             <button onClick={() => goTo("orders")} className="text-sm font-serif text-orange-400 hover:text-orange-300">View all</button>
//           </div>
//           <div className="h-px w-full mb-2" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)" }} />
//           <div className="overflow-x-auto scrollbar-thin">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-neutral-500">
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Order</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Items</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Total</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Status</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {recentOrders.map((o) => {
//                   const s = statusStyle(o.status);
//                   return (
//                     <tr key={o.id} className="border-t border-white/10">
//                       <td className="py-3 font-mono text-white">{o.id}</td>
//                       <td className="py-3 font-serif text-white">{o.customer}</td>
//                       <td className="py-3 font-mono text-neutral-400">{o.items}</td>
//                       <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
//                       <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
//                       <td className="py-3 font-mono text-neutral-500">{o.date}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// function OrdersPage({ orders, setOrders }) {
//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [openMenuId, setOpenMenuId] = useState(null);

//   const filtered = useMemo(() => {
//     return orders.filter((o) => {
//       const matchesQuery =
//         o.id.toLowerCase().includes(query.toLowerCase()) ||
//         o.customer.toLowerCase().includes(query.toLowerCase());
//       const matchesStatus = statusFilter === "All" || o.status === statusFilter;
//       return matchesQuery && matchesStatus;
//     });
//   }, [orders, query, statusFilter]);

//   function updateStatus(id, status) {
//     setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
//     setOpenMenuId(null);
//   }

//   function removeOrder(id) {
//     setOrders((prev) => prev.filter((o) => o.id !== id));
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Orders</h1>
//           <p className="text-sm mt-1 text-neutral-400 font-serif">{orders.length} total orders</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 flex-wrap">
//         <SearchInput value={query} onChange={setQuery} placeholder="Search order ID or customer…" />
//         <div className="flex items-center gap-2 flex-wrap">
//           <Filter size={14} color="#A3A3A3" />
//           {["All", ...ORDER_STATUSES].map((s) => (
//             <button
//               key={s}
//               onClick={() => setStatusFilter(s)}
//               className="px-3 py-1.5 rounded-lg text-xs font-serif border transition-colors"
//               style={{
//                 background: statusFilter === s ? "rgba(249,115,22,0.14)" : "transparent",
//                 color: statusFilter === s ? "#FB923C" : "#A3A3A3",
//                 borderColor: statusFilter === s ? "rgba(249,115,22,0.3)" : "rgba(255,255,255,0.1)",
//               }}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </div>

//       <GlassCard>
//         <div className="p-5">
//           <div className="overflow-x-auto scrollbar-thin">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-neutral-500">
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Order</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Items</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Total</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Status</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Date</th>
//                   <th className="py-2"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((o) => {
//                   const s = statusStyle(o.status);
//                   return (
//                     <tr key={o.id} className="border-t border-white/10 relative">
//                       <td className="py-3 font-mono text-white">{o.id}</td>
//                       <td className="py-3 font-serif text-white">{o.customer}</td>
//                       <td className="py-3 font-mono text-neutral-400">{o.items}</td>
//                       <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
//                       <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
//                       <td className="py-3 font-mono text-neutral-500">{o.date}</td>
//                       <td className="py-3 text-right relative">
//                         <button onClick={() => setOpenMenuId(openMenuId === o.id ? null : o.id)}>
//                           <MoreHorizontal size={16} color="#A3A3A3" />
//                         </button>
//                         {openMenuId === o.id && (
//                           <div className="absolute right-0 top-8 z-20 w-44 rounded-lg border border-white/10 bg-neutral-900 shadow-xl overflow-hidden">
//                             {ORDER_STATUSES.map((s2) => (
//                               <button
//                                 key={s2}
//                                 onClick={() => updateStatus(o.id, s2)}
//                                 className="w-full text-left px-3 py-2 text-xs font-serif text-neutral-300 hover:bg-white/5 flex items-center justify-between"
//                               >
//                                 Mark {s2}
//                                 {o.status === s2 && <Check size={12} color="#FB923C" />}
//                               </button>
//                             ))}
//                             <button
//                               onClick={() => { removeOrder(o.id); setOpenMenuId(null); }}
//                               className="w-full text-left px-3 py-2 text-xs font-serif text-red-400 hover:bg-white/5 flex items-center gap-1.5 border-t border-white/10"
//                             >
//                               <Trash2 size={12} /> Delete order
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {filtered.length === 0 && (
//                   <tr><td colSpan={7} className="py-8 text-center text-neutral-500 font-serif text-sm">No orders match your search.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// /* ---------------------------------------------------------
//    ADD / EDIT PRODUCT MODAL — wired to the createProduct API
//    Sends multipart/form-data: title, description, price,
//    category, brand, stock, discount, featured, specifications
//    (as a JSON string), and image (file).
//    --------------------------------------------------------- */
// function ProductFormModal({ editing, initial, onClose, onSaved }) {
//   const [title, setTitle] = useState(initial?.name || "");
//   const [description, setDescription] = useState(initial?.description || "");
//   const [price, setPrice] = useState(initial ? String(initial.price) : "");
//   const [category, setCategory] = useState(initial?.category || "");
//   const [brand, setBrand] = useState(initial?.brand || "");
//   const [stock, setStock] = useState(initial ? String(initial.stock) : "");
//   const [discount, setDiscount] = useState(initial?.discount ? String(initial.discount) : "");
//   const [featured, setFeatured] = useState(initial?.featured || false);
//   const [specs, setSpecs] = useState(
//     initial?.specifications && Object.keys(initial.specifications).length
//       ? Object.entries(initial.specifications).map(([key, value]) => ({ key, value }))
//       : [{ key: "", value: "" }]
//   );
//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(initial?.image || null);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   function handleImageChange(e) {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile(file);
//     setImagePreview(URL.createObjectURL(file));
//   }

//   function updateSpec(index, field, value) {
//     setSpecs((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
//   }

//   function addSpecRow() {
//     setSpecs((prev) => [...prev, { key: "", value: "" }]);
//   }

//   function removeSpecRow(index) {
//     setSpecs((prev) => prev.filter((_, i) => i !== index));
//   }

//   function validate() {
//     if (!title.trim()) return "Title is required.";
//     if (!description.trim()) return "Description is required.";
//     if (price === "" || Number(price) < 0) return "A valid price is required.";
//     if (!category.trim()) return "Category is required.";
//     if (!editing && !imageFile) return "Product image is required.";
//     return "";
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     const validationError = validate();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }
//     setError("");
//     setSubmitting(true);

//     try {
//       const specifications = {};
//       specs.forEach(({ key, value }) => {
//         if (key.trim()) specifications[key.trim()] = value;
//       });

//       const formData = new FormData();
//       formData.append("title", title.trim());
//       formData.append("description", description.trim());
//       formData.append("price", price);
//       formData.append("category", category.trim());
//       formData.append("brand", brand.trim());
//       formData.append("stock", stock || "0");
//       formData.append("discount", discount || "0");
//       formData.append("featured", featured);
//       formData.append("specifications", JSON.stringify(specifications));
//       if (imageFile) formData.append("image", imageFile);

//       const url = editing ? `${API_BASE_URL}/${editing}` : API_BASE_URL;
//       const res = await fetch(url, {
//         method: editing ? "PUT" : "POST",
//         body: formData,
//       });

//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         throw new Error(data.message || "Something went wrong while saving the product.");
//       }

//       const saved = data.products || data.product || {};

//       onSaved({
//         id: saved._id || saved.id || editing || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
//         name: title.trim(),
//         description: description.trim(),
//         category: category.trim(),
//         brand: brand.trim(),
//         price: Number(price) || 0,
//         stock: Number(stock) || 0,
//         discount: Number(discount) || 0,
//         featured,
//         specifications,
//         image: saved.image || imagePreview,
//         sold: initial?.sold || 0,
//       });
//     } catch (err) {
//       // Backend not reachable in this environment — fall back to saving locally
//       // so the UI still reflects the attempted change, but surface the error.
//       setError(err.message || "Could not reach the server. Saved locally instead.");
//       onSaved({
//         id: editing || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
//         name: title.trim(),
//         description: description.trim(),
//         category: category.trim(),
//         brand: brand.trim(),
//         price: Number(price) || 0,
//         stock: Number(stock) || 0,
//         discount: Number(discount) || 0,
//         featured,
//         specifications: (() => {
//           const s = {};
//           specs.forEach(({ key, value }) => { if (key.trim()) s[key.trim()] = value; });
//           return s;
//         })(),
//         image: imagePreview,
//         sold: initial?.sold || 0,
//       }, { offline: true });
//     } finally {
//       setSubmitting(false);
//     }
//   }

//   return (
//     <Modal title={editing ? "Edit product" : "Add product"} onClose={onClose} wide>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         {error && (
//           <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg border border-red-500/25 bg-red-500/10 text-red-300 text-xs font-serif">
//             <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
//             <span>{error}</span>
//           </div>
//         )}

//         {/* Image upload */}
//         <div>
//           <FieldLabel required={!editing}>Product image</FieldLabel>
//           <label className="flex items-center gap-4 cursor-pointer">
//             <div className="w-20 h-20 rounded-xl flex-shrink-0 border border-white/10 bg-white/[0.04] overflow-hidden flex items-center justify-center">
//               {imagePreview ? (
//                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//               ) : (
//                 <Upload size={20} color="#737373" />
//               )}
//             </div>
//             <div className="flex flex-col gap-1">
//               <span className="font-serif text-sm text-orange-400">Choose file…</span>
//               <span className="font-serif text-xs text-neutral-500">PNG or JPG, up to 5MB.</span>
//             </div>
//             <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//           </label>
//         </div>

//         <div>
//           <FieldLabel required>Title</FieldLabel>
//           <TextField value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Canvas Tote — Olive" />
//         </div>

//         <div>
//           <FieldLabel required>Description</FieldLabel>
//           <TextArea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description of the product…" />
//         </div>

//         <div className="grid grid-cols-2 gap-3">
//           <div>
//             <FieldLabel required>Category</FieldLabel>
//             <TextField value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Bags" />
//           </div>
//           <div>
//             <FieldLabel>Brand</FieldLabel>
//             <TextField value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Ledger Goods" />
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-3">
//           <div>
//             <FieldLabel required>Price ($)</FieldLabel>
//             <TextField type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="30" />
//           </div>
//           <div>
//             <FieldLabel>Stock</FieldLabel>
//             <TextField type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="86" />
//           </div>
//           <div>
//             <FieldLabel>Discount (%)</FieldLabel>
//             <TextField type="number" min="0" max="100" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="0" />
//           </div>
//         </div>

//         {/* Featured toggle */}
//         <div className="flex items-center justify-between gap-4 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03]">
//           <div className="flex items-center gap-2">
//             <Star size={14} color="#FBBF6B" />
//             <div>
//               <p className="text-sm font-serif text-white">Featured product</p>
//               <p className="text-xs font-serif text-neutral-500">Show this product in featured collections.</p>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() => setFeatured(!featured)}
//             className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
//             style={{ background: featured ? "#F97316" : "rgba(255,255,255,0.12)" }}
//           >
//             <span
//               className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
//               style={{ left: featured ? "22px" : "2px" }}
//             />
//           </button>
//         </div>

//         {/* Specifications */}
//         <div>
//           <div className="flex items-center justify-between mb-1.5">
//             <FieldLabel>Specifications</FieldLabel>
//             <button type="button" onClick={addSpecRow} className="text-xs font-serif text-orange-400 hover:text-orange-300 flex items-center gap-1">
//               <Plus size={12} /> Add spec
//             </button>
//           </div>
//           <div className="flex flex-col gap-2">
//             {specs.map((s, i) => (
//               <div key={i} className="flex items-center gap-2">
//                 <div className="flex items-center gap-1.5 flex-1 px-2.5 py-2 rounded-lg border border-white/10 bg-white/[0.04]">
//                   <Tag size={12} color="#737373" />
//                   <input
//                     value={s.key}
//                     onChange={(e) => updateSpec(i, "key", e.target.value)}
//                     placeholder="Material"
//                     className="bg-transparent outline-none text-xs font-serif text-white placeholder:text-neutral-600 w-full"
//                   />
//                 </div>
//                 <input
//                   value={s.value}
//                   onChange={(e) => updateSpec(i, "value", e.target.value)}
//                   placeholder="100% cotton canvas"
//                   className="flex-1 px-2.5 py-2 rounded-lg border border-white/10 bg-white/[0.04] outline-none text-xs font-serif text-white placeholder:text-neutral-600"
//                 />
//                 {specs.length > 1 && (
//                   <button type="button" onClick={() => removeSpecRow(i)} className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors">
//                     <Trash2 size={14} />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="flex items-center gap-3 mt-2">
//           <PrimaryButton type="submit" disabled={submitting} className="justify-center flex-1">
//             {submitting ? (
//               <>
//                 <Loader2 size={16} className="animate-spin" /> Saving…
//               </>
//             ) : editing ? (
//               "Save changes"
//             ) : (
//               "Add product"
//             )}
//           </PrimaryButton>
//           <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
//         </div>
//       </form>
//     </Modal>
//   );
// }

// function ProductsPage({ products, setProducts }) {
//   const [query, setQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [toast, setToast] = useState("");

//   const filtered = products.filter(
//     (p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.toLowerCase().includes(query.toLowerCase())
//   );

//   function openAdd() {
//     setEditing(null);
//     setShowModal(true);
//   }

//   function openEdit(p) {
//     setEditing(p.id);
//     setShowModal(true);
//   }

//   function removeProduct(id) {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//   }

//   function handleSaved(product, meta = {}) {
//     setProducts((prev) => {
//       const exists = prev.some((p) => p.id === product.id);
//       if (exists) return prev.map((p) => (p.id === product.id ? { ...p, ...product } : p));
//       return [product, ...prev];
//     });
//     setShowModal(false);
//     setToast(meta.offline ? "Saved locally (server unreachable)." : editing ? "Product updated." : "Product added.");
//     setTimeout(() => setToast(""), 2500);
//   }

//   const editingProduct = editing ? products.find((p) => p.id === editing) : null;

//   return (
//     <>
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Products</h1>
//           <p className="text-sm mt-1 text-neutral-400 font-serif">{products.length} products in catalog</p>
//         </div>
//         <PrimaryButton onClick={openAdd}><Plus size={16} /> Add product</PrimaryButton>
//       </div>

//       {toast && (
//         <div className="px-3 py-2 rounded-lg border border-orange-500/25 bg-orange-500/10 text-orange-300 text-xs font-serif w-fit">
//           {toast}
//         </div>
//       )}

//       <SearchInput value={query} onChange={setQuery} placeholder="Search products or SKU…" />

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//         {filtered.map((p) => {
//           const st = stockStyle(p.stock);
//           return (
//             <GlassCard key={p.id}>
//               <div className="p-5 flex flex-col gap-3">
//                 <div className="flex items-start justify-between gap-2">
//                   <div className="w-11 h-11 rounded-xl flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
//                     {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     {p.featured && <Star size={14} color="#FBBF6B" className="mt-1.5" />}
//                     <button onClick={() => openEdit(p)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-white transition-colors">
//                       <Pencil size={14} />
//                     </button>
//                     <button onClick={() => removeProduct(p.id)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-red-400 transition-colors">
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-sm font-serif text-white">{p.name}</p>
//                   <p className="font-mono text-xs text-neutral-500 mt-0.5">{p.id} · {p.category}{p.brand ? ` · ${p.brand}` : ""}</p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <span className="font-mono text-lg text-white">${p.price.toFixed(2)}</span>
//                   <Pill color={st.color} bg={st.bg} border={st.border}>{st.label === "In stock" ? `${p.stock} in stock` : st.label}</Pill>
//                 </div>
//                 <p className="font-mono text-xs text-neutral-500">{p.sold} sold all-time{p.discount ? ` · ${p.discount}% off` : ""}</p>
//               </div>
//             </GlassCard>
//           );
//         })}
//         {filtered.length === 0 && (
//           <div className="col-span-full text-center py-10 text-neutral-500 font-serif text-sm">No products match your search.</div>
//         )}
//       </div>

//       {showModal && (
//         <ProductFormModal
//           editing={editing}
//           initial={editingProduct}
//           onClose={() => setShowModal(false)}
//           onSaved={handleSaved}
//         />
//       )}
//     </>
//   );
// }

// function CustomersPage({ customers, setCustomers }) {
//   const [query, setQuery] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", phone: "" });

//   const filtered = customers.filter(
//     (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.email.toLowerCase().includes(query.toLowerCase())
//   );

//   function addCustomer() {
//     if (!form.name.trim() || !form.email.trim()) return;
//     const id = `CUS-${String(customers.length + 1).padStart(3, "0")}`;
//     setCustomers((prev) => [
//       { id, name: form.name, email: form.email, phone: form.phone, orders: 0, spent: 0, joined: "Jul 2026" },
//       ...prev,
//     ]);
//     setForm({ name: "", email: "", phone: "" });
//     setShowModal(false);
//   }

//   function removeCustomer(id) {
//     setCustomers((prev) => prev.filter((c) => c.id !== id));
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between flex-wrap gap-3">
//         <div>
//           <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Customers</h1>
//           <p className="text-sm mt-1 text-neutral-400 font-serif">{customers.length} customers</p>
//         </div>
//         <PrimaryButton onClick={() => setShowModal(true)}><Plus size={16} /> Add customer</PrimaryButton>
//       </div>

//       <SearchInput value={query} onChange={setQuery} placeholder="Search name or email…" />

//       <GlassCard>
//         <div className="p-5">
//           <div className="overflow-x-auto scrollbar-thin">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="text-left text-neutral-500">
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Contact</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Orders</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Spent</th>
//                   <th className="py-2 font-serif text-xs uppercase tracking-wide">Joined</th>
//                   <th className="py-2"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((c) => (
//                   <tr key={c.id} className="border-t border-white/10">
//                     <td className="py-3">
//                       <div className="flex items-center gap-2.5">
//                         <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white flex-shrink-0">
//                           {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
//                         </div>
//                         <div>
//                           <p className="font-serif text-white">{c.name}</p>
//                           <p className="font-mono text-xs text-neutral-500">{c.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-3">
//                       <div className="flex items-center gap-1.5 text-neutral-400 font-serif text-xs">
//                         <Mail size={12} /> {c.email}
//                       </div>
//                       {c.phone && (
//                         <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-xs mt-0.5">
//                           <Phone size={12} /> {c.phone}
//                         </div>
//                       )}
//                     </td>
//                     <td className="py-3 font-mono text-neutral-300">{c.orders}</td>
//                     <td className="py-3 font-mono text-white">${c.spent.toFixed(2)}</td>
//                     <td className="py-3 font-mono text-neutral-500">{c.joined}</td>
//                     <td className="py-3 text-right">
//                       <button onClick={() => removeCustomer(c.id)} className="p-1.5 rounded-md hover:bg-white/5 text-neutral-400 hover:text-red-400 transition-colors">
//                         <Trash2 size={14} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//                 {filtered.length === 0 && (
//                   <tr><td colSpan={6} className="py-8 text-center text-neutral-500 font-serif text-sm">No customers match your search.</td></tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </GlassCard>

//       {showModal && (
//         <Modal title="Add customer" onClose={() => setShowModal(false)}>
//           <div className="flex flex-col gap-4">
//             <div>
//               <FieldLabel>Name</FieldLabel>
//               <TextField value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ayesha Khan" />
//             </div>
//             <div>
//               <FieldLabel>Email</FieldLabel>
//               <TextField type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ayesha.khan@mail.com" />
//             </div>
//             <div>
//               <FieldLabel>Phone</FieldLabel>
//               <TextField value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 300 1234567" />
//             </div>
//             <PrimaryButton onClick={addCustomer} className="justify-center mt-2">Add customer</PrimaryButton>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }

// function AnalyticsPage({ orders, products }) {
//   const byStatus = ORDER_STATUSES.map((s) => ({
//     status: s,
//     count: orders.filter((o) => o.status === s).length,
//   }));
//   const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
//   const topProducts = [...products].sort((a, b) => b.sold * b.price - a.sold * a.price).slice(0, 5);

//   return (
//     <>
//       <div>
//         <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Analytics</h1>
//         <p className="text-sm mt-1 text-neutral-400 font-serif">A closer look at revenue and order health.</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         {byStatus.map((b) => {
//           const s = statusStyle(b.status);
//           return (
//             <GlassCard key={b.status}>
//               <div className="p-5 flex flex-col gap-2">
//                 <span className="text-xs uppercase tracking-[0.18em] text-neutral-500 font-serif">{b.status} orders</span>
//                 <span className="font-display text-3xl text-white">{b.count}</span>
//                 <Pill color={s.color} bg={s.bg} border={s.border}>{orders.length ? Math.round((b.count / orders.length) * 100) : 0}% of total</Pill>
//               </div>
//             </GlassCard>
//           );
//         })}
//       </div>

//       <GlassCard>
//         <div className="p-5">
//           <h2 className="font-display italic text-base font-semibold text-white mb-4">Revenue leaders</h2>
//           <div className="flex flex-col gap-3">
//             {topProducts.map((p, i) => (
//               <div key={p.id} className="flex items-center gap-3">
//                 <span className="font-mono text-xs text-neutral-600 w-5">{String(i + 1).padStart(2, "0")}</span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-serif text-white truncate">{p.name}</p>
//                   <div className="h-1.5 rounded-full bg-white/[0.06] mt-1.5 overflow-hidden">
//                     <div
//                       className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
//                       style={{ width: `${Math.min(100, (p.sold * p.price / (totalRevenue || 1)) * 300)}%` }}
//                     />
//                   </div>
//                 </div>
//                 <span className="font-mono text-sm text-white">${(p.sold * p.price).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </GlassCard>
//     </>
//   );
// }

// function SettingsPage() {
//   const [storeName, setStoreName] = useState("Ledger");
//   const [email, setEmail] = useState("hello@ledgerstore.com");
//   const [currency, setCurrency] = useState("USD");
//   const [notifyOrders, setNotifyOrders] = useState(true);
//   const [notifyStock, setNotifyStock] = useState(true);
//   const [saved, setSaved] = useState(false);

//   function save() {
//     setSaved(true);
//     setTimeout(() => setSaved(false), 2000);
//   }

//   return (
//     <>
//       <div>
//         <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Settings</h1>
//         <p className="text-sm mt-1 text-neutral-400 font-serif">Manage your store profile and preferences.</p>
//       </div>

//       <GlassCard>
//         <div className="p-6 flex flex-col gap-5 max-w-xl">
//           <h2 className="font-display italic text-base font-semibold text-white">Store profile</h2>
//           <div>
//             <FieldLabel>Store name</FieldLabel>
//             <TextField value={storeName} onChange={(e) => setStoreName(e.target.value)} />
//           </div>
//           <div>
//             <FieldLabel>Contact email</FieldLabel>
//             <TextField type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div>
//             <FieldLabel>Currency</FieldLabel>
//             <select
//               value={currency}
//               onChange={(e) => setCurrency(e.target.value)}
//               className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] text-sm font-serif text-white outline-none focus:border-orange-500/50 transition-colors"
//             >
//               <option className="bg-neutral-900" value="USD">USD — US Dollar</option>
//               <option className="bg-neutral-900" value="PKR">PKR — Pakistani Rupee</option>
//               <option className="bg-neutral-900" value="EUR">EUR — Euro</option>
//               <option className="bg-neutral-900" value="GBP">GBP — British Pound</option>
//             </select>
//           </div>
//         </div>
//       </GlassCard>

//       <GlassCard>
//         <div className="p-6 flex flex-col gap-4 max-w-xl">
//           <h2 className="font-display italic text-base font-semibold text-white">Notifications</h2>
//           {[
//             { label: "New order alerts", desc: "Get notified whenever a new order comes in.", value: notifyOrders, set: setNotifyOrders },
//             { label: "Low stock alerts", desc: "Get notified when a product drops below 10 units.", value: notifyStock, set: setNotifyStock },
//           ].map((row) => (
//             <div key={row.label} className="flex items-center justify-between gap-4 py-2 border-t border-white/10 first:border-t-0 first:pt-0">
//               <div>
//                 <p className="text-sm font-serif text-white">{row.label}</p>
//                 <p className="text-xs font-serif text-neutral-500 mt-0.5">{row.desc}</p>
//               </div>
//               <button
//                 onClick={() => row.set(!row.value)}
//                 className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
//                 style={{ background: row.value ? "#F97316" : "rgba(255,255,255,0.12)" }}
//               >
//                 <span
//                   className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
//                   style={{ left: row.value ? "22px" : "2px" }}
//                 />
//               </button>
//             </div>
//           ))}
//         </div>
//       </GlassCard>

//       <div className="flex items-center gap-3">
//         <PrimaryButton onClick={save}>{saved ? <><Check size={16} /> Saved</> : "Save changes"}</PrimaryButton>
//         {saved && <span className="text-xs font-serif text-neutral-500">Your changes have been saved.</span>}
//       </div>
//     </>
//   );
// }

// /* ---------------------------------------------------------
//    APP SHELL — routes between pages via sidebar navigation.
//    Each concern (orders, products, customers…) lives in its
//    own page component, so it's easy to lift into real routes
//    (e.g. react-router) later — just swap goTo/page for a router.
//    --------------------------------------------------------- */

// const AdminDashboard = () => {
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);
//   const [page, setPage] = useState("dashboard");
//   const [orders, setOrders] = useState(initialOrders);
//   const [products, setProducts] = useState(initialProducts);
//   const [customers, setCustomers] = useState(initialCustomers);

//   function goTo(key) {
//     setPage(key);
//     setMobileNavOpen(false);
//   }

//   const pageTitles = {
//     dashboard: "Dashboard",
//     orders: "Orders",
//     products: "Products",
//     customers: "Customers",
//     analytics: "Analytics",
//     settings: "Settings",
//   };

//   return (
//     <div className="relative min-h-screen w-full flex bg-neutral-950 text-white font-sans antialiased overflow-hidden">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Source+Serif+4:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
//         .font-display { font-family: 'Fraunces', serif; }
//         .font-serif { font-family: 'Source Serif 4', serif; }
//         .font-mono { font-family: 'JetBrains Mono', monospace; }
//         .scrollbar-thin::-webkit-scrollbar { height: 6px; width: 6px; }
//         .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 9999px; }
//         .nav-item { transition: background 0.15s ease, color 0.15s ease; }
//       `}</style>

//       {/* Ambient glow, matched to the signup screen */}
//       <div className="pointer-events-none fixed -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-orange-500/20 blur-3xl" />
//       <div className="pointer-events-none fixed -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-orange-600/10 blur-3xl" />
//       <div
//         className="pointer-events-none fixed inset-0 opacity-[0.12]"
//         style={{
//           backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
//           backgroundSize: "28px 28px",
//         }}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-white/10 bg-neutral-950/80 backdrop-blur-xl transition-transform duration-200 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
//       >
//         <div className="flex items-center justify-between px-6 py-6">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20">
//               <IoMdAppstore />
//             </div>
//             <span className="font-display italic text-lg font-semibold tracking-tight">ApnaBazar</span>
//           </div>
//           <button className="lg:hidden" onClick={() => setMobileNavOpen(false)}>
//             <X size={20} />
//           </button>
//         </div>

//         <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             const active = page === item.key;
//             return (
//               <button
//                 key={item.key}
//                 onClick={() => goTo(item.key)}
//                 className="nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif text-left"
//                 style={{
//                   background: active ? "rgba(249,115,22,0.12)" : "transparent",
//                   color: active ? "#FB923C" : "#A3A3A3",
//                 }}
//               >
//                 <Icon size={18} />
//                 {item.label}
//               </button>
//             );
//           })}
//         </nav>

//         <div className="px-4 py-5 mx-3 mb-4 rounded-xl border border-white/10 bg-white/[0.03]">
//           <p className="text-xs text-neutral-500 font-serif">Store status</p>
//           <p className="font-mono text-sm mt-1 text-orange-400">● All systems normal</p>
//         </div>
//       </aside>

//       {mobileNavOpen && (
//         <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setMobileNavOpen(false)} />
//       )}

//       {/* Main */}
//       <div className="relative flex-1 flex flex-col min-w-0">
//         {/* Topbar */}
//         <header className="flex items-center justify-between gap-4 px-5 lg:px-8 py-4 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
//           <div className="flex items-center gap-3 flex-1">
//             <button className="lg:hidden" onClick={() => setMobileNavOpen(true)}>
//               <Menu size={22} color="#fff" />
//             </button>
//             <span className="hidden lg:block font-serif text-sm text-neutral-500">{pageTitles[page]}</span>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="relative">
//               <Bell size={19} color="#fff" />
//               <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
//             </button>
//             <div className="flex items-center gap-2 cursor-pointer">
//               <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-semibold bg-gradient-to-br from-orange-500 to-orange-600 text-white">
//                 MA
//               </div>
//               <span className="hidden sm:block text-sm font-serif text-white">Maha A.</span>
//               <ChevronDown size={14} color="#A3A3A3" />
//             </div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="flex-1 px-5 lg:px-8 py-6 flex flex-col gap-6 overflow-y-auto">
//           {page === "dashboard" && (
//             <DashboardPage orders={orders} products={products} customers={customers} goTo={goTo} />
//           )}
//           {page === "orders" && <OrdersPage orders={orders} setOrders={setOrders} />}
//           {page === "products" && <ProductsPage products={products} setProducts={setProducts} />}
//           {page === "customers" && <CustomersPage customers={customers} setCustomers={setCustomers} />}
//           {page === "analytics" && <AnalyticsPage orders={orders} products={products} />}
//           {page === "settings" && <SettingsPage />}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;



import React from "react";
import { Plus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { GlassCard, StatCard, Pill, PrimaryButton } from "../components/ui.jsx";
import { statusStyle } from "../utils/styles.js";
import { revenueData } from "../data.js";

export default function DashboardPage({ orders, products, customers, goTo }) {
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const topProducts = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const recentOrders = orders.slice(0, 6);

  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display italic text-2xl font-semibold tracking-tight text-white">Overview</h1>
          <p className="text-sm mt-1 text-neutral-400 font-serif">Friday, 17 July — here's how the store is doing this week.</p>
        </div>
        <PrimaryButton onClick={() => goTo("products")}>
          <Plus size={16} /> Add product
        </PrimaryButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Revenue" value={totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })} prefix="$" delta="12.4%" positive />
        <StatCard label="Orders" value={orders.length} delta="6.1%" positive />
        <StatCard label="Customers" value={customers.length} delta="2.3%" positive />
        <StatCard label="Avg. order value" value={(totalRevenue / Math.max(orders.length, 1)).toFixed(2)} prefix="$" delta="4.7%" positive />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <GlassCard className="xl:col-span-2">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display italic text-base font-semibold text-white">Revenue this week</h2>
              <span className="font-mono text-xs px-2 py-1 rounded border border-orange-500/25 bg-orange-500/10 text-orange-400">+12.4%</span>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={revenueData} margin={{ left: -20, right: 10, top: 10 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#A3A3A3" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "#0a0a0a", fontSize: 12, fontFamily: "'JetBrains Mono',monospace" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(value, name) => [name === "revenue" ? `$${value}` : value, name === "revenue" ? "Revenue" : "Orders"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display italic text-base font-semibold text-white">Top products</h2>
              <button onClick={() => goTo("products")} className="text-xs font-serif text-orange-400 hover:text-orange-300">View all</button>
            </div>
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex-shrink-0 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                  {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-serif text-white truncate">{p.name}</p>
                  <p className="font-mono text-xs text-neutral-500">{p.id} · {p.sold} sold</p>
                </div>
                <span className="font-mono text-sm text-white">${(p.sold * p.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display italic text-base font-semibold text-white">Recent orders</h2>
            <button onClick={() => goTo("orders")} className="text-sm font-serif text-orange-400 hover:text-orange-300">View all</button>
          </div>
          <div className="h-px w-full mb-2" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 6px, transparent 6px, transparent 12px)" }} />
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-500">
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Order</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Customer</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Items</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Total</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Status</th>
                  <th className="py-2 font-serif text-xs uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => {
                  const s = statusStyle(o.status);
                  return (
                    <tr key={o.id} className="border-t border-white/10">
                      <td className="py-3 font-mono text-white">{o.id}</td>
                      <td className="py-3 font-serif text-white">{o.customer}</td>
                      <td className="py-3 font-mono text-neutral-400">{o.items}</td>
                      <td className="py-3 font-mono text-white">${o.total.toFixed(2)}</td>
                      <td className="py-3"><Pill color={s.color} bg={s.bg} border={s.border}>{o.status}</Pill></td>
                      <td className="py-3 font-mono text-neutral-500">{o.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </GlassCard>
    </>
  );
}
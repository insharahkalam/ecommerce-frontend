// // // import React, { useState, useEffect } from "react";
// // // import { Link } from "react-router-dom";
// // // import { ArrowRight, Truck, Shield, RotateCcw, Sparkles } from "lucide-react";
// // // import HeroSlider from "../../components/HeroSlider";
// // // import ProductCard from "../../components/ProductCard";
// // // import { useCart } from "../../context/CartContext";
// // // import api from "../../config/axios";
// // // import { API_BASE_URL } from "../../data/mockData";

// // // function normalizeProduct(p) {
// // //   return {
// // //     id: p._id,
// // //     name: p.title,
// // //     price: Number(p.price) || 0,
// // //     stock: Number(p.stock) || 0,
// // //     discount: Number(p.discount) || 0,
// // //     featured: !!p.featured,
// // //     image: p.image,
// // //     category: p.category,
// // //   };
// // // }

// // // const perks = [
// // //   { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
// // //   { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
// // //   { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
// // //   { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
// // // ];

// // // export default function Home() {
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const { addToCart } = useCart();

// // //   useEffect(() => {
// // //     let cancelled = false;
// // //     (async () => {
// // //       try {
// // //         const res = await api.get(`${API_BASE_URL}/getAllProduct`);
// // //         const list = res.data.getProduct || [];
// // //         if (!cancelled) setProducts(list.map(normalizeProduct));
// // //       } catch (e) { console.error(e); }
// // //       finally { if (!cancelled) setLoading(false); }
// // //     })();
// // //     return () => { cancelled = true; };
// // //   }, []);

// // //   const featured = products.filter((p) => p.featured).slice(0, 8);
// // //   const latest = products.slice(0, 8);

// // //   return (
// // //     <div className="flex flex-col gap-16">
// // //       <HeroSlider />

// // //       {/* Perks */}
// // //       <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // //         {perks.map((P) => (
// // //           <div key={P.title} className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] flex flex-col items-start gap-2">
// // //             <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
// // //               <P.icon size={18} />
// // //             </div>
// // //             <h4 className="font-display text-white text-sm">{P.title}</h4>
// // //             <p className="text-xs font-serif text-neutral-400">{P.desc}</p>
// // //           </div>
// // //         ))}
// // //       </section>

// // //       {/* Featured */}
// // //       <section>
// // //         <div className="flex items-end justify-between mb-6">
// // //           <div>
// // //             <p className="font-mono text-xs text-orange-400 tracking-widest">HANDPICKED</p>
// // //             <h2 className="font-display italic text-3xl font-semibold text-white mt-1">Featured Products</h2>
// // //           </div>
// // //           <Link to="/shop" className="text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1">
// // //             View all <ArrowRight size={14} />
// // //           </Link>
// // //         </div>

// // //         {loading ? (
// // //           <p className="text-neutral-500 font-serif text-sm">Loading products…</p>
// // //         ) : featured.length === 0 ? (
// // //           <p className="text-neutral-500 font-serif text-sm">No featured products yet.</p>
// // //         ) : (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //             {featured.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
// // //           </div>
// // //         )}
// // //       </section>

// // //       {/* Banner */}
// // //       <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
// // //         <div className="max-w-xl">
// // //           <p className="font-mono text-xs text-white/80 tracking-widest">LIMITED TIME</p>
// // //           <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-2">
// // //             Summer Sale — up to 50% off
// // //           </h2>
// // //           <p className="mt-3 font-serif text-white/90">Refresh your wardrobe and gadgets. Ends this weekend.</p>
// // //           <Link to="/shop?sale=1"
// // //             className="inline-flex mt-5 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif">
// // //             Shop the Sale
// // //           </Link>
// // //         </div>
// // //       </section>

// // //       {/* Latest */}
// // //       <section>
// // //         <div className="flex items-end justify-between mb-6">
// // //           <div>
// // //             <p className="font-mono text-xs text-orange-400 tracking-widest">FRESH IN</p>
// // //             <h2 className="font-display italic text-3xl font-semibold text-white mt-1">New Arrivals</h2>
// // //           </div>
// // //           <Link to="/shop" className="text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1">
// // //             View all <ArrowRight size={14} />
// // //           </Link>
// // //         </div>
// // //         {!loading && (
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //             {latest.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
// // //           </div>
// // //         )}
// // //       </section>
// // //     </div>
// // //   );
// // // }



// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// // import {
// //   ArrowRight,
// //   Truck,
// //   Shield,
// //   RotateCcw,
// //   Sparkles,
// //   Headphones,
// //   Volume2,
// //   BatteryCharging,
// //   Cable,
// // } from "lucide-react";
// // import HeroSlider from "../../components/HeroSlider";
// // import ProductCard from "../../components/ProductCard";
// // import { useCart } from "../../context/CartContext";
// // import api from "../../config/axios";
// // import { API_BASE_URL } from "../../data/mockData";

// // function normalizeProduct(p) {
// //   return {
// //     id: p._id,
// //     name: p.title,
// //     price: Number(p.price) || 0,
// //     stock: Number(p.stock) || 0,
// //     discount: Number(p.discount) || 0,
// //     featured: !!p.featured,
// //     image: p.image,
// //     category: p.category,
// //   };
// // }

// // const perks = [
// //   { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
// //   { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
// //   { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
// //   { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
// // ];

// // /* Category slider — tuned to your actual catalogue (audio + power gear).
// //    Each tile carries its own gradient + icon so it stays crisp with no external
// //    image dependency, and links straight into a filtered shop view. */
// // const categories = [
// //   {
// //     key: "airbuds",
// //     title: "Airbuds",
// //     desc: "True wireless, all-day comfort",
// //     icon: Headphones,
// //     from: "#FB923C",
// //     to: "#7C2D12",
// //   },
// //   {
// //     key: "speakers",
// //     title: "Speakers",
// //     desc: "Room-filling sound, anywhere",
// //     icon: Volume2,
// //     from: "#F97316",
// //     to: "#78350F",
// //   },
// //   {
// //     key: "powerbanks",
// //     title: "Powerbanks",
// //     desc: "Fast charging, on the go",
// //     icon: BatteryCharging,
// //     from: "#FBBF24",
// //     to: "#7C2D12",
// //   },
// //   {
// //     key: "cables",
// //     title: "Cables & Chargers",
// //     desc: "Everything to keep it charged",
// //     icon: Cable,
// //     from: "#FDBA74",
// //     to: "#9A3412",
// //   },
// // ];

// // function ProductCardSkeleton() {
// //   return (
// //     <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
// //       <div className="aspect-square bg-white/[0.04] animate-pulse" />
// //       <div className="p-4 flex flex-col gap-2">
// //         <div className="h-3 w-3/4 rounded bg-white/[0.06] animate-pulse" />
// //         <div className="h-3 w-1/2 rounded bg-white/[0.06] animate-pulse" />
// //         <div className="h-4 w-1/3 rounded bg-white/[0.08] animate-pulse mt-1" />
// //       </div>
// //     </div>
// //   );
// // }

// // function SectionHeader({ eyebrow, title }) {
// //   return (
// //     <div className="flex items-end justify-between gap-4 mb-6">
// //       <div>
// //         <p className="font-mono text-xs text-orange-400 tracking-widest">{eyebrow}</p>
// //         <h2 className="font-display italic text-3xl font-semibold text-white mt-1 leading-tight">
// //           {title}
// //         </h2>
// //       </div>
// //       <Link
// //         to="/shop"
// //         className="shrink-0 text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
// //       >
// //         View all <ArrowRight size={14} />
// //       </Link>
// //     </div>
// //   );
// // }

// // export default function Home() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { addToCart } = useCart();

// //   useEffect(() => {
// //     let cancelled = false;
// //     (async () => {
// //       try {
// //         const res = await api.get(`${API_BASE_URL}/getAllProduct`);
// //         const list = res.data.getProduct || [];
// //         if (!cancelled) setProducts(list.map(normalizeProduct));
// //       } catch (e) {
// //         console.error(e);
// //       } finally {
// //         if (!cancelled) setLoading(false);
// //       }
// //     })();
// //     return () => {
// //       cancelled = true;
// //     };
// //   }, []);

// //   const featured = products.filter((p) => p.featured).slice(0, 8);
// //   const latest = products.slice(0, 8);

// //   return (
// //     <div className="flex flex-col gap-16 px-4 sm:px-0 max-w-7xl mx-auto">
// //       <HeroSlider />

// //       {/* Perks */}
// //       <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //         {perks.map((P) => (
// //           <div
// //             key={P.title}
// //             className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-orange-400/25 transition-colors flex flex-col items-start gap-3"
// //           >
// //             <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
// //               <P.icon size={18} />
// //             </div>
// //             <div>
// //               <h4 className="font-display text-white text-sm leading-tight">{P.title}</h4>
// //               <p className="text-xs font-serif text-neutral-400 mt-1 leading-relaxed">{P.desc}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </section>

// //       {/* Shop by category — airbuds / speakers / powerbanks / cables */}
// //       <section>
// //         <div className="mb-6">
// //           <p className="font-mono text-xs text-orange-400 tracking-widest">SHOP BY CATEGORY</p>
// //           <h2 className="font-display italic text-3xl font-semibold text-white mt-1 leading-tight">
// //             Gear up
// //           </h2>
// //         </div>

// //         <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
// //           {categories.map((c) => {
// //             const Icon = c.icon;
// //             return (
// //               <Link
// //                 key={c.key}
// //                 to={`/shop?category=${c.key}`}
// //                 className="group relative shrink-0 w-[62vw] xs:w-64 sm:w-auto snap-start rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-5"
// //                 style={{
// //                   backgroundImage: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)`,
// //                 }}
// //               >
// //                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
// //                 <Icon
// //                   size={64}
// //                   className="absolute -right-3 -top-3 text-white/15 group-hover:text-white/25 group-hover:scale-110 transition-all duration-300"
// //                   strokeWidth={1.25}
// //                 />
// //                 <div className="relative z-10">
// //                   <h3 className="font-display italic text-xl text-white leading-tight">{c.title}</h3>
// //                   <p className="font-serif text-xs text-white/80 mt-1">{c.desc}</p>
// //                   <span className="inline-flex items-center gap-1 text-[11px] font-serif text-white mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
// //                     Shop now <ArrowRight size={12} />
// //                   </span>
// //                 </div>
// //               </Link>
// //             );
// //           })}
// //         </div>
// //       </section>

// //       {/* Featured */}
// //       <section>
// //         <SectionHeader eyebrow="HANDPICKED" title="Featured Products" />

// //         {loading ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {Array.from({ length: 4 }).map((_, i) => (
// //               <ProductCardSkeleton key={i} />
// //             ))}
// //           </div>
// //         ) : featured.length === 0 ? (
// //           <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-14 text-center">
// //             <p className="text-neutral-500 font-serif text-sm">No featured products yet.</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {featured.map((p) => (
// //               <ProductCard key={p.id} p={p} onAdd={addToCart} />
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Banner */}
// //       <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
// //         <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-15">
// //           <BatteryCharging size={220} className="text-white" strokeWidth={1} />
// //         </div>
// //         <div className="relative max-w-xl">
// //           <p className="font-mono text-xs text-white/80 tracking-widest">LIMITED TIME</p>
// //           <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-2 leading-tight">
// //             Summer Sale — up to 50% off
// //           </h2>
// //           <p className="mt-3 font-serif text-white/90">
// //             Refresh your audio and charging gear. Ends this weekend.
// //           </p>
// //           <Link
// //             to="/shop?sale=1"
// //             className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif transition-colors"
// //           >
// //             Shop the Sale <ArrowRight size={14} />
// //           </Link>
// //         </div>
// //       </section>

// //       {/* Latest */}
// //       <section>
// //         <SectionHeader eyebrow="FRESH IN" title="New Arrivals" />

// //         {loading ? (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {Array.from({ length: 4 }).map((_, i) => (
// //               <ProductCardSkeleton key={i} />
// //             ))}
// //           </div>
// //         ) : latest.length === 0 ? (
// //           <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-14 text-center">
// //             <p className="text-neutral-500 font-serif text-sm">No products yet.</p>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {latest.map((p) => (
// //               <ProductCard key={p.id} p={p} onAdd={addToCart} />
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowRight,
//   Truck,
//   Shield,
//   RotateCcw,
//   Sparkles,
//   Headphones,
//   Volume2,
//   BatteryCharging,
//   Cable,
//   Star,
//   Users,
//   PackageCheck,
//   Mail,
// } from "lucide-react";
// import HeroSlider from "../../components/HeroSlider";
// import ProductCard from "../../components/ProductCard";
// import { useCart } from "../../context/CartContext";
// import api from "../../config/axios";
// import { API_BASE_URL } from "../../data/mockData";

// function normalizeProduct(p) {
//   return {
//     id: p._id,
//     name: p.title,
//     price: Number(p.price) || 0,
//     stock: Number(p.stock) || 0,
//     discount: Number(p.discount) || 0,
//     featured: !!p.featured,
//     image: p.image,
//     category: p.category,
//   };
// }

// const perks = [
//   { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
//   { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
//   { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
//   { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
// ];

// const categories = [
//   {
//     key: "airbuds",
//     title: "Airbuds",
//     desc: "True wireless, all-day comfort",
//     icon: Headphones,
//     from: "#FB923C",
//     to: "#7C2D12",
//   },
//   {
//     key: "speakers",
//     title: "Speakers",
//     desc: "Room-filling sound, anywhere",
//     icon: Volume2,
//     from: "#F97316",
//     to: "#78350F",
//   },
//   {
//     key: "powerbanks",
//     title: "Powerbanks",
//     desc: "Fast charging, on the go",
//     icon: BatteryCharging,
//     from: "#FBBF24",
//     to: "#7C2D12",
//   },
//   {
//     key: "cables",
//     title: "Cables & Chargers",
//     desc: "Everything to keep it charged",
//     icon: Cable,
//     from: "#FDBA74",
//     to: "#9A3412",
//   },
// ];

// const stats = [
//   { icon: Users, value: "24K+", label: "Happy customers" },
//   { icon: PackageCheck, value: "60K+", label: "Orders delivered" },
//   { icon: Star, value: "4.8/5", label: "Average rating" },
//   { icon: Headphones, value: "120+", label: "Audio & power SKUs" },
// ];

// /* Signature motif — a small equalizer, standing in for the site's audio-first
//    catalogue. Used sparingly as a prefix to section eyebrows instead of a
//    generic numbered marker, so it actually says something about the brand. */
// function EqBars({ className = "", bar = "w-[3px]", tall = "h-3.5" }) {
//   const heights = ["40%", "100%", "65%", "85%", "50%"];
//   return (
//     <span className={`inline-flex items-end gap-[2px] ${tall} ${className}`}>
//       {heights.map((h, i) => (
//         <span
//           key={i}
//           className={`${bar} rounded-full bg-orange-400`}
//           style={{
//             height: h,
//             animation: `eq 1.1s ease-in-out ${i * 0.12}s infinite`,
//           }}
//         />
//       ))}
//     </span>
//   );
// }

// function Eyebrow({ children }) {
//   return (
//     <p className="flex items-center gap-2 font-mono text-xs text-orange-400 tracking-widest">
//       <EqBars />
//       {children}
//     </p>
//   );
// }

// function ProductCardSkeleton() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
//       <div className="aspect-square bg-white/[0.04] animate-pulse" />
//       <div className="p-4 flex flex-col gap-2">
//         <div className="h-3 w-3/4 rounded bg-white/[0.06] animate-pulse" />
//         <div className="h-3 w-1/2 rounded bg-white/[0.06] animate-pulse" />
//         <div className="h-4 w-1/3 rounded bg-white/[0.08] animate-pulse mt-1" />
//       </div>
//     </div>
//   );
// }

// function SectionHeader({ eyebrow, title, sub }) {
//   return (
//     <div className="flex items-end justify-between gap-4 mb-6">
//       <div>
//         <Eyebrow>{eyebrow}</Eyebrow>
//         <h2 className="font-display italic text-3xl font-semibold text-white mt-1 leading-tight">
//           {title}
//         </h2>
//         {sub && <p className="font-serif text-sm text-neutral-500 mt-1.5 max-w-md">{sub}</p>}
//       </div>
//       <Link
//         to="/shop"
//         className="shrink-0 text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
//       >
//         View all <ArrowRight size={14} />
//       </Link>
//     </div>
//   );
// }

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     let cancelled = false;
//     (async () => {
//       try {
//         const res = await api.get(`${API_BASE_URL}/getAllProduct`);
//         const list = res.data.getProduct || [];
//         if (!cancelled) setProducts(list.map(normalizeProduct));
//       } catch (e) {
//         console.error(e);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     })();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const featured = products.filter((p) => p.featured).slice(0, 8);
//   const latest = products.slice(0, 8);

//   return (
//     <div className="flex flex-col gap-16 sm:gap-20 px-4 sm:px-0 max-w-7xl mx-auto pb-4">
//       <style>{`
//         @keyframes eq {
//           0%, 100% { transform: scaleY(0.4); opacity: 0.55; }
//           50% { transform: scaleY(1); opacity: 1; }
//         }
//       `}</style>

//       <HeroSlider />

//       {/* Perks — editorial strip instead of a boxed grid, divided by hairlines */}
//       <section className="rounded-2xl border border-white/10 bg-white/[0.02]">
//         <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.07]">
//           {perks.map((P, i) => (
//             <div
//               key={P.title}
//               className={`flex items-center gap-3 px-5 py-5 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.07]" : ""}`}
//             >
//               <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
//                 <P.icon size={17} />
//               </div>
//               <div className="min-w-0">
//                 <h4 className="font-display text-white text-sm leading-tight truncate">{P.title}</h4>
//                 <p className="text-xs font-serif text-neutral-500 mt-0.5 truncate">{P.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Shop by category */}
//       <section>
//         <div className="mb-6">
//           <Eyebrow>SHOP BY CATEGORY</Eyebrow>
//           <h2 className="font-display italic text-3xl font-semibold text-white mt-1 leading-tight">
//             Gear up
//           </h2>
//         </div>

//         <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
//           {categories.map((c) => {
//             const Icon = c.icon;
//             return (
//               <Link
//                 key={c.key}
//                 to={`/shop?category=${c.key}`}
//                 className="group relative shrink-0 w-[62vw] xs:w-64 sm:w-auto snap-start rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-5"
//                 style={{ backgroundImage: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)` }}
//               >
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
//                 <Icon
//                   size={64}
//                   className="absolute -right-3 -top-3 text-white/15 group-hover:text-white/25 group-hover:scale-110 transition-all duration-300"
//                   strokeWidth={1.25}
//                 />
//                 <div className="relative z-10">
//                   <h3 className="font-display italic text-xl text-white leading-tight">{c.title}</h3>
//                   <p className="font-serif text-xs text-white/80 mt-1">{c.desc}</p>
//                   <span className="inline-flex items-center gap-1 text-[11px] font-serif text-white mt-3 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
//                     Shop now <ArrowRight size={12} />
//                   </span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </section>

//       {/* Featured */}
//       <section>
//         <SectionHeader
//           eyebrow="HANDPICKED"
//           title="Featured Products"
//           sub="The pieces our team keeps recommending, on repeat."
//         />

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <ProductCardSkeleton key={i} />
//             ))}
//           </div>
//         ) : featured.length === 0 ? (
//           <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-14 text-center">
//             <p className="text-neutral-500 font-serif text-sm">No featured products yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {featured.map((p) => (
//               <ProductCard key={p.id} p={p} onAdd={addToCart} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Trust strip */}
//       <section className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 sm:px-2">
//         <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.07]">
//           {stats.map((s, i) => (
//             <div
//               key={s.label}
//               className={`flex flex-col items-center text-center gap-1.5 px-4 py-6 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.07]" : ""}`}
//             >
//               <s.icon size={16} className="text-orange-400" />
//               <p className="font-mono text-2xl text-white leading-none">{s.value}</p>
//               <p className="font-serif text-xs text-neutral-500">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Banner */}
//       <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
//         <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-15">
//           <BatteryCharging size={220} className="text-white" strokeWidth={1} />
//         </div>
//         <div className="relative max-w-xl">
//           <p className="flex items-center gap-2 font-mono text-xs text-white/80 tracking-widest">
//             <EqBars className="opacity-90" />
//             LIMITED TIME
//           </p>
//           <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-2 leading-tight">
//             Summer Sale — up to 50% off
//           </h2>
//           <p className="mt-3 font-serif text-white/90">
//             Refresh your audio and charging gear. Ends this weekend.
//           </p>
//           <Link
//             to="/shop?sale=1"
//             className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif transition-colors"
//           >
//             Shop the Sale <ArrowRight size={14} />
//           </Link>
//         </div>
//       </section>

//       {/* Latest */}
//       <section>
//         <SectionHeader
//           eyebrow="FRESH IN"
//           title="New Arrivals"
//           sub="Just landed in the warehouse — first come, first charged."
//         />

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {Array.from({ length: 4 }).map((_, i) => (
//               <ProductCardSkeleton key={i} />
//             ))}
//           </div>
//         ) : latest.length === 0 ? (
//           <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-14 text-center">
//             <p className="text-neutral-500 font-serif text-sm">No products yet.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {latest.map((p) => (
//               <ProductCard key={p.id} p={p} onAdd={addToCart} />
//             ))}
//           </div>
//         )}
//       </section>

//       {/* Newsletter */}
//       <section className="rounded-3xl border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.08] to-transparent px-6 py-10 sm:px-12 sm:py-14 flex flex-col items-center text-center gap-4">
//         <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-400/25 flex items-center justify-center">
//           <Mail size={18} className="text-orange-400" />
//         </div>
//         <div>
//           <h3 className="font-display italic text-2xl sm:text-3xl text-white">Get first access to drops</h3>
//           <p className="font-serif text-sm text-neutral-400 mt-2 max-w-md">
//             New airbuds, speakers and power gear, plus the occasional discount code. No spam.
//           </p>
//         </div>
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mt-1"
//         >
//           <input
//             type="email"
//             required
//             placeholder="you@example.com"
//             className="flex-1 rounded-full bg-white/[0.05] border border-white/15 px-4 py-2.5 text-sm font-serif text-white placeholder:text-neutral-500 outline-none focus:border-orange-400/50 transition-colors"
//           />
//           <button
//             type="submit"
//             className="rounded-full bg-orange-500 hover:bg-orange-400 text-neutral-950 font-serif text-sm font-medium px-5 py-2.5 transition-colors"
//           >
//             Subscribe
//           </button>
//         </form>
//       </section>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  Headphones,
  Volume2,
  BatteryCharging,
  Cable,
  Star,
  Users,
  PackageCheck,
  Mail,
  CheckCircle2,
} from "lucide-react";
import HeroSlider from "../../components/HeroSlider";
import ProductCard from "../../components/ProductCard";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";

function normalizeProduct(p) {
  return {
    id: p._id,
    name: p.title,
    price: Number(p.price) || 0,
    stock: Number(p.stock) || 0,
    discount: Number(p.discount) || 0,
    featured: !!p.featured,
    image: p.image,
    category: p.category,
  };
}

const perks = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
  { icon: Shield, title: "Secure Payment", desc: "100% protected checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: Sparkles, title: "Curated Quality", desc: "Handpicked for you" },
];

const categories = [
  {
    key: "airbuds",
    title: "Airbuds",
    desc: "True wireless, all-day comfort",
    icon: Headphones,
    from: "#FB923C",
    to: "#7C2D12",
  },
  {
    key: "speakers",
    title: "Speakers",
    desc: "Room-filling sound, anywhere",
    icon: Volume2,
    from: "#F97316",
    to: "#78350F",
  },
  {
    key: "powerbanks",
    title: "Powerbanks",
    desc: "Fast charging, on the go",
    icon: BatteryCharging,
    from: "#FBBF24",
    to: "#7C2D12",
  },
  {
    key: "cables",
    title: "Cables & Chargers",
    desc: "Everything to keep it charged",
    icon: Cable,
    from: "#FDBA74",
    to: "#9A3412",
  },
];

const stats = [
  { icon: Users, value: "24K+", label: "Happy customers" },
  { icon: PackageCheck, value: "60K+", label: "Orders delivered" },
  { icon: Star, value: "4.8/5", label: "Average rating" },
  { icon: Headphones, value: "120+", label: "Audio & power SKUs" },
];

/* Signature motif — a small equalizer, standing in for the site's audio-first
   catalogue. Used sparingly as a prefix to section eyebrows instead of a
   generic numbered marker, so it actually says something about the brand. */
function EqBars({ className = "", bar = "w-[3px]", tall = "h-3.5" }) {
  const heights = ["40%", "100%", "65%", "85%", "50%"];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex items-end gap-[2px] ${tall} ${className} motion-reduce:hidden`}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`${bar} rounded-full bg-orange-400`}
          style={{
            height: h,
            animation: `eq 1.1s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </span>
  );
}

function Eyebrow({ children }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs text-orange-400 tracking-widest uppercase">
      <EqBars />
      {children}
    </p>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="aspect-square bg-white/[0.04] animate-pulse" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-3/4 rounded bg-white/[0.06] animate-pulse" />
        <div className="h-3 w-1/2 rounded bg-white/[0.06] animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-white/[0.08] animate-pulse mt-1" />
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] py-14 px-6 text-center">
      <p className="text-neutral-500 font-serif text-sm">{message}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="font-display italic text-2xl sm:text-3xl font-semibold text-white mt-2 leading-tight">
          {title}
        </h2>
        {sub && (
          <p className="font-serif text-sm text-neutral-500 mt-2 max-w-md">
            {sub}
          </p>
        )}
      </div>
      <Link
        to="/shop"
        className="group shrink-0 text-sm font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-4 rounded"
      >
        View all
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

function ProductGrid({ loading, items, emptyMessage, onAdd }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  if (items.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} onAdd={onAdd} />
      ))}
    </div>
  );
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get(`${API_BASE_URL}/getAllProduct`);
        const list = res.data.getProduct || [];
        if (!cancelled) setProducts(list.map(normalizeProduct));
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const latest = products.slice(0, 8);

  return (
    <div className="flex flex-col gap-16 sm:gap-24 px-4 sm:px-6 lg:px-0 max-w-7xl mx-auto pb-6">
      <style>{`
        @keyframes eq {
          0%, 100% { transform: scaleY(0.4); opacity: 0.55; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>

      <HeroSlider />

      {/* Perks */}
      <section aria-label="Store guarantees" className="rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.07]">
          {perks.map((P, i) => (
            <div
              key={P.title}
              className={`flex items-center gap-3 px-5 py-5 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.07]" : ""
                }`}
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <P.icon size={17} strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-white text-sm leading-tight truncate">
                  {P.title}
                </h3>
                <p className="text-xs font-serif text-neutral-500 mt-0.5 truncate">
                  {P.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by category */}
      <section aria-labelledby="category-heading">
        <div className="mb-6 sm:mb-8">
          <Eyebrow>SHOP BY CATEGORY</Eyebrow>
          <h2
            id="category-heading"
            className="font-display italic text-2xl sm:text-3xl font-semibold text-white mt-2 leading-tight"
          >
            Gear up
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.key}
                to={`/shop?category=${c.key}`}
                className="group relative shrink-0 w-[62vw] xs:w-64 sm:w-auto snap-start rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] sm:aspect-[3/4] flex flex-col justify-end p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400 focus-visible:outline-offset-2"
                style={{
                  backgroundImage: `linear-gradient(155deg, ${c.from} 0%, ${c.to} 100%)`,
                }}
              >
                <div className="absolute inset-0 bg-black/15 group-hover:bg-black/5 transition-colors duration-300" />
                <Icon
                  size={60}
                  className="absolute -right-3 -top-3 text-white/15 group-hover:text-white/20 group-hover:scale-105 transition-all duration-300"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <h3 className="font-display italic text-xl text-white leading-tight">
                    {c.title}
                  </h3>
                  <p className="font-serif text-xs text-white/80 mt-1">
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-serif text-white mt-3 opacity-90 group-hover:translate-x-0.5 transition-transform duration-300">
                    Shop now <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section aria-label="Featured products">
        <SectionHeader
          eyebrow="HANDPICKED"
          title="Featured Products"
          sub="The pieces our team keeps recommending, on repeat."
        />
        <ProductGrid
          loading={loading}
          items={featured}
          emptyMessage="No featured products yet — check back soon."
          onAdd={addToCart}
        />
      </section>

      {/* Trust strip */}
      <section aria-label="Store stats" className="rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.07]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center gap-1.5 px-4 py-6 ${i >= 2 ? "border-t md:border-t-0 border-white/[0.07]" : ""
                }`}
            >
              <s.icon size={16} className="text-orange-400" strokeWidth={1.75} />
              <p className="font-mono text-2xl text-white leading-none">{s.value}</p>
              <p className="font-serif text-xs text-neutral-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-8 sm:p-14">
        <BatteryCharging
          size={200}
          strokeWidth={1}
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -bottom-8 text-white opacity-[0.12]"
        />
        <div className="relative max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs text-white/85 tracking-widest uppercase">
            <EqBars className="opacity-90" />
            Limited time
          </p>
          <h2 className="font-display italic text-3xl sm:text-5xl font-semibold text-white mt-3 leading-tight">
            Summer Sale — up to 50% off
          </h2>
          <p className="mt-3 font-serif text-white/90 text-sm sm:text-base">
            Refresh your audio and charging gear. Ends this weekend.
          </p>
          <Link
            to="/shop?sale=1"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-white font-serif text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Shop the Sale <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Latest */}
      <section aria-label="New arrivals">
        <SectionHeader
          eyebrow="FRESH IN"
          title="New Arrivals"
          sub="Just landed in the warehouse — first come, first charged."
        />
        <ProductGrid
          loading={loading}
          items={latest}
          emptyMessage="No products yet — check back soon."
          onAdd={addToCart}
        />
      </section>

      {/* Newsletter */}
      <NewsletterSection />
    </div>
  );
}

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // Hook this up to a real subscribe endpoint when one is available.
    setSubmitted(true);
  }

  return (
    <section className="rounded-2xl border border-orange-400/20 bg-gradient-to-b from-orange-500/[0.08] to-transparent px-6 py-10 sm:px-12 sm:py-14 flex flex-col items-center text-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-400/25 flex items-center justify-center">
        <Mail size={18} className="text-orange-400" strokeWidth={1.75} />
      </div>
      <div>
        <h2 className="font-display italic text-2xl sm:text-3xl text-white">
          Get first access to drops
        </h2>
        <p className="font-serif text-sm text-neutral-400 mt-2 max-w-md">
          New airbuds, speakers and power gear, plus the occasional discount
          code. No spam.
        </p>
      </div>

      {submitted ? (
        <p className="flex items-center gap-2 text-sm font-serif text-orange-300 mt-1">
          <CheckCircle2 size={16} /> You're on the list — check your inbox soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2 w-full max-w-sm mt-1"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-full bg-white/[0.05] border border-white/15 px-4 py-2.5 text-sm font-serif text-white placeholder:text-neutral-500 outline-none focus:border-orange-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-400/40 transition-colors"
          />
          <button
            type="submit"
            className="rounded-full bg-orange-500 hover:bg-orange-400 text-neutral-950 font-serif text-sm font-medium px-5 py-2.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
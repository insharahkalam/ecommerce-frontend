// import React from "react";
// import { Link } from "react-router-dom";
// import { Star, ShoppingBag } from "lucide-react";
// import GlassCard from "./GlassCard";

// // // deterministic fake rating from product id
// // function fakeRating(id = "") {
// //   let h = 0;
// //   for (let i = 0; i < String(id).length; i++) h = (h * 31 + String(id).charCodeAt(i)) >>> 0;
// //   const rating = (3.6 + (h % 14) / 10).toFixed(1); // 3.6 – 4.9
// //   const reviews = 12 + (h % 480);
// //   return { rating: Number(rating), reviews };
// // }

// // export default function ProductCard({ p, onAdd }) {
// //   const discounted = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
// //   const { rating, reviews } = fakeRating(p.id);

// //   return (
// //     <GlassCard>
// //       <Link to={`/product/${p.id}`} className="block relative group">
// //         <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-t-2xl overflow-hidden">
// //           {p.image && (
// //             <img
// //               src={p.image}
// //               alt={p.name}
// //               loading="lazy"
// //               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
// //             />
// //           )}
// //         </div>
// //         {p.discount > 0 && (
// //           <span className="absolute top-3 left-3 px-2 py-1 rounded-md bg-orange-500 text-white text-xs font-mono">
// //             -{p.discount}%
// //           </span>
// //         )}
// //         {p.featured && (
// //           <span className="absolute top-3 right-3 p-1.5 rounded-md bg-black/60 backdrop-blur">
// //             <Star size={12} color="#FBBF6B" fill="#FBBF6B" />
// //           </span>
// //         )}
// //       </Link>

// //       <div className="p-4 flex flex-col gap-2">
// //         <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">{p.category}</p>

// //         <Link
// //           to={`/product/${p.id}`}
// //           className="text-sm font-serif text-white hover:text-orange-400 line-clamp-2 min-h-[2.5rem]"
// //         >
// //           {p.name}
// //         </Link>

// //         {/* rating */}
// //         <div className="flex items-center gap-1.5">
// //           <div className="flex items-center gap-0.5">
// //             {[1, 2, 3, 4, 5].map((i) => (
// //               <Star
// //                 key={i}
// //                 size={12}
// //                 className={i <= Math.round(rating) ? "text-amber-400" : "text-neutral-700"}
// //                 fill={i <= Math.round(rating) ? "currentColor" : "none"}
// //               />
// //             ))}
// //           </div>
// //           <span className="font-mono text-[11px] text-neutral-300">{rating.toFixed(1)}</span>
// //           <span className="font-mono text-[11px] text-neutral-600">({reviews})</span>
// //         </div>

// //         <div className="flex items-baseline gap-2">
// //           <span className="font-mono text-lg text-white">${discounted.toFixed(2)}</span>
// //           {p.discount > 0 && (
// //             <span className="text-xs font-mono text-neutral-500 line-through">${p.price.toFixed(2)}</span>
// //           )}
// //         </div>

// //         <div className="flex items-baseline gap-2">
// //           <span className="font-mono text-lg text-white">{p.sold}</span>
// //         </div>

// //         <button
// //           onClick={() => onAdd?.(p)}
// //           disabled={p.stock === 0}
// //           className="mt-1 w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white text-sm font-serif transition-colors flex items-center justify-center gap-2"
// //         >
// //           <ShoppingBag size={14} />
// //           {p.stock === 0 ? "Out of stock" : "Add to cart"}
// //         </button>
// //       </div>
// //     </GlassCard>
// //   );
// // }



// import React from "react";
// import { Link } from "react-router-dom";
// import { Star, ShoppingBag, Flame } from "lucide-react";
// import GlassCard from "./GlassCard";

// // deterministic fake rating from product id
// function fakeRating(id = "") {
//   let h = 0;
//   for (let i = 0; i < String(id).length; i++) h = (h * 31 + String(id).charCodeAt(i)) >>> 0;
//   const rating = (3.6 + (h % 14) / 10).toFixed(1); // 3.6 – 4.9
//   const reviews = 12 + (h % 480);
//   return { rating: Number(rating), reviews };
// }

// function formatSold(n = 0) {
//   if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
//   return `${n}`;
// }

// export default function ProductCard({ p, onAdd }) {
//   const discounted = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
//   const { rating, reviews } = fakeRating(p.id);
//   const lowStock = p.stock > 0 && p.stock <= 5;

//   return (
//     <GlassCard className="group/card transition-transform duration-300 hover:-translate-y-0.5">
//       <Link to={`/product/${p.id}`} className="block relative group">
//         <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-t-2xl overflow-hidden">
//           {p.image ? (
//             <img
//               src={p.image}
//               alt={p.name}
//               loading="lazy"
//               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             />
//           ) : (
//             <div className="flex h-full w-full items-center justify-center">
//               <ShoppingBag size={28} className="text-neutral-700" />
//             </div>
//           )}
//         </div>

//         {/* top badges */}
//         <div className="absolute top-3 left-3 flex flex-col gap-1.5">
//           {p.discount > 0 && (
//             <span className="px-2 py-1 rounded-md bg-orange-500 text-white text-xs font-mono shadow-sm">
//               -{p.discount}%
//             </span>
//           )}
//           {lowStock && (
//             <span className="px-2 py-1 rounded-md bg-red-500/90 text-white text-[10px] font-mono shadow-sm">
//               {p.stock} left
//             </span>
//           )}
//         </div>

//         {p.featured && (
//           <span className="absolute top-3 right-3 p-1.5 rounded-md bg-black/60 backdrop-blur">
//             <Star size={12} color="#FBBF6B" fill="#FBBF6B" />
//           </span>
//         )}

//         {/* sold count, bottom-left of image, only when there's real signal */}
//         {p.sold > 0 && (
//           <span className="absolute bottom-3 left-3 flex items-center gap-1 rounded-md bg-black/60 backdrop-blur px-2 py-1 text-[10px] font-mono text-neutral-200">
//             <Flame size={11} className="text-orange-400" />
//             {formatSold(p.sold)} sold
//           </span>
//         )}
//       </Link>

//       <div className="p-4 flex flex-col gap-2">
//         <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">{p.category}</p>

//         <Link
//           to={`/product/${p.id}`}
//           className="text-sm font-serif text-white hover:text-orange-400 line-clamp-2 min-h-[2.5rem] transition-colors"
//         >
//           {p.name}
//         </Link>

//         {/* rating */}
//         <div className="flex items-center gap-1.5">
//           <div className="flex items-center gap-0.5">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <Star
//                 key={i}
//                 size={12}
//                 className={i <= Math.round(rating) ? "text-amber-400" : "text-neutral-700"}
//                 fill={i <= Math.round(rating) ? "currentColor" : "none"}
//               />
//             ))}
//           </div>
//           <span className="font-mono text-[11px] text-neutral-300">{rating.toFixed(1)}</span>
//           <span className="font-mono text-[11px] text-neutral-600">({reviews})</span>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-baseline gap-2">
//             <span className="font-mono text-lg text-white">${discounted.toFixed(2)}</span>
//             {p.discount > 0 && (
//               <span className="text-xs font-mono text-neutral-500 line-through">${p.price.toFixed(2)}</span>
//             )}
//           </div>
//           {p.sold > 0 && (
//             <span className="font-mono text-[11px] text-neutral-500">{formatSold(p.sold)} sold</span>
//           )}
//         </div>

//         <button
//           onClick={() => onAdd?.(p)}
//           disabled={p.stock === 0}
//           className="mt-1 w-full py-2 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed text-white text-sm font-serif transition-all flex items-center justify-center gap-2"
//         >
//           <ShoppingBag size={14} />
//           {p.stock === 0 ? "Out of stock" : "Add to cart"}
//         </button>
//       </div>
//     </GlassCard>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Flame, BadgePercent } from "lucide-react";
import GlassCard from "./GlassCard";

function fakeRating(id = "") {
  let h = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  const rating = (3.6 + (h % 14) / 10).toFixed(1);
  const reviews = 12 + (h % 480);
  return { rating: Number(rating), reviews };
}

function formatSold(n = 0) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

function formatPKR(n = 0) {
  return `Rs ${Math.round(n).toLocaleString("en-PK")}`;
}

export default function ProductCard({ p, onAdd }) {
  const discounted = p.discount > 0 ? p.price - (p.price * p.discount) / 100 : p.price;
  const { rating, reviews } = fakeRating(p.id);
  const lowStock = p.stock > 0 && p.stock <= 5;
  const outOfStock = p.stock === 0;

  return (
    <GlassCard className="group/card flex h-full flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <Link to={`/product/${p.id}`} className="relative block overflow-hidden">
        <div className="aspect-square w-full bg-gradient-to-br from-neutral-800 to-neutral-900">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingBag size={32} className="text-neutral-600" />
            </div>
          )}
        </div>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {p.discount > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-orange-500 px-2 py-1 text-[11px] font-semibold text-white shadow-sm">
              <BadgePercent size={12} />
              {p.discount}% OFF
            </span>
          )}
          {lowStock && (
            <span className="rounded-lg bg-red-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
              Only {p.stock} left
            </span>
          )}
        </div>

        {p.featured && (
          <span className="absolute right-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-orange-300 backdrop-blur-sm">
            Featured
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
          {p.category}
        </p>

        <Link
          to={`/product/${p.id}`}
          className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-white transition-colors hover:text-orange-400"
        >
          {p.name}
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={12}
                className={i <= Math.round(rating) ? "text-amber-400" : "text-neutral-700"}
                fill={i <= Math.round(rating) ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-neutral-300">{rating.toFixed(1)}</span>
          <span className="text-[11px] text-neutral-600">({reviews} reviews)</span>
        </div>

        <div className="my-0.5 h-px bg-white/5" />

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-white">
              {formatPKR(discounted)}
            </span>
            {p.discount > 0 && (
              <span className="text-[11px] text-neutral-500 line-through">
                {formatPKR(p.price)}
              </span>
            )}
          </div>

          {p.sold > 0 && (
            <span className="flex items-center gap-1 text-[11px] text-neutral-500">
              <Flame size={12} className="text-orange-400" />
              {formatSold(p.sold)} sold
            </span>
          )}
        </div>

        <button
          onClick={() => onAdd?.(p)}
          disabled={outOfStock}
          className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-medium text-white transition-all hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500"
        >
          <ShoppingBag size={15} />
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </GlassCard>
  );
}

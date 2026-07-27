import React from "react";
import { SlidersHorizontal, X } from "lucide-react";

export default function ProductFilters({
    categories, filters, setFilters, maxPrice = 1000, onReset,
}) {
    return (
        <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal size={16} className="text-orange-400" />
                        <h3 className="font-display text-white">Filters</h3>
                    </div>
                    <button onClick={onReset} className="text-xs font-serif text-neutral-400 hover:text-orange-400 flex items-center gap-1">
                        <X size={12} /> Reset
                    </button>
                </div>

                {/* Category */}
                <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Category</p>
                    <div className="flex flex-col gap-1.5">
                        {["all", ...categories].map((c) => (
                            <label key={c} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="cat"
                                    checked={filters.category === c}
                                    onChange={() => setFilters({ ...filters, category: c })}
                                    className="accent-orange-500"
                                />
                                <span className="text-sm font-serif text-neutral-300 capitalize">{c}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                        Max Price: <span className="text-orange-400">${filters.maxPrice}</span>
                    </p>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                        className="w-full accent-orange-500"
                    />
                </div>

                {/* Sort */}
                <div className="mb-5">
                    <p className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">Sort by</p>
                    <select
                        value={filters.sort}
                        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-serif text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="newest">Newest</option>
                        <option value="price-asc">Price: Low → High</option>
                        <option value="price-desc">Price: High → Low</option>
                        <option value="name">Name (A-Z)</option>
                    </select>
                </div>

                {/* Extras */}
                <div className="flex flex-col gap-2 pt-4 border-t border-white/10">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.onlyFeatured}
                            onChange={(e) => setFilters({ ...filters, onlyFeatured: e.target.checked })}
                            className="accent-orange-500"
                        />
                        <span className="text-sm font-serif text-neutral-300">Featured only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.onlySale}
                            onChange={(e) => setFilters({ ...filters, onlySale: e.target.checked })}
                            className="accent-orange-500"
                        />
                        <span className="text-sm font-serif text-neutral-300">On sale</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                            className="accent-orange-500"
                        />
                        <span className="text-sm font-serif text-neutral-300">In stock</span>
                    </label>
                </div>
            </div>
        </aside>
    );
}

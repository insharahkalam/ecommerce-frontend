import React, { useState, useEffect, useMemo } from "react";
import SearchInput from "../../components/SearchInput";
import ProductCard from "../../components/ProductCard";
import ProductFilters from "../../components/ProductFilters";
import { useCart } from "../../context/CartContext";
import api from "../../config/axios";
import { API_BASE_URL } from "../../data/mockData";

function normalize(p) {
    return {
        id: p._id, name: p.title,
        price: Number(p.price) || 0, stock: Number(p.stock) || 0,
        discount: Number(p.discount) || 0, featured: !!p.featured,
        image: p.image, category: p.category || "uncategorized",
    };
}

const defaultFilters = {
    category: "all", maxPrice: 1000, sort: "newest",
    onlyFeatured: false, onlySale: false, inStock: false,
};

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState(defaultFilters);
    const { addToCart } = useCart();

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get(`${API_BASE_URL}/getAllProduct`);
                setProducts((res.data.getProduct || []).map(normalize));
            } finally { setLoading(false); }
        })();
    }, []);

    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))],
        [products]
    );
    const maxPriceCap = useMemo(
        () => Math.max(1000, ...products.map((p) => p.price)),
        [products]
    );

    const list = useMemo(() => {
        let arr = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
        if (filters.category !== "all") arr = arr.filter((p) => p.category === filters.category);
        arr = arr.filter((p) => p.price <= filters.maxPrice);
        if (filters.onlyFeatured) arr = arr.filter((p) => p.featured);
        if (filters.onlySale) arr = arr.filter((p) => p.discount > 0);
        if (filters.inStock) arr = arr.filter((p) => p.stock > 0);

        switch (filters.sort) {
            case "price-asc": arr = [...arr].sort((a, b) => a.price - b.price); break;
            case "price-desc": arr = [...arr].sort((a, b) => b.price - a.price); break;
            case "name": arr = [...arr].sort((a, b) => a.name.localeCompare(b.name)); break;
            default: break;
        }
        return arr;
    }, [products, query, filters]);

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="font-display italic text-3xl font-semibold text-white">Shop the collection</h1>
                <p className="text-sm mt-1 text-neutral-400 font-serif">{list.length} of {products.length} products</p>
            </div>

            <SearchInput value={query} onChange={setQuery} placeholder="Search products…" />

            <div className="flex flex-col lg:flex-row gap-6">
                <ProductFilters
                    categories={categories}
                    filters={filters}
                    setFilters={setFilters}
                    maxPrice={maxPriceCap}
                    onReset={() => { setFilters({ ...defaultFilters, maxPrice: maxPriceCap }); setQuery(""); }}
                />

                <div className="flex-1">
                    {loading ? (
                        <p className="text-neutral-500 font-serif text-sm">Loading products…</p>
                    ) : list.length === 0 ? (
                        <div className="text-center py-20 text-neutral-500 font-serif text-sm">
                            No products match your filters.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {list.map((p) => <ProductCard key={p.id} p={p} onAdd={addToCart} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("cart")) || [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product, quantity = 1) {
        setCart((prev) => {
            const existing = prev.find((i) => i.productId === product.id);
            if (existing) {
                return prev.map((i) =>
                    i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    title: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                },
            ];
        });
    }

    function updateQuantity(productId, quantity) {
        if (quantity < 1) return;
        setCart((prev) => prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)));
    }

    function removeFromCart(productId) {
        setCart((prev) => prev.filter((i) => i.productId !== productId));
    }

    function clearCart() {
        setCart([]);
    }

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used within CartProvider");
    return ctx;
}
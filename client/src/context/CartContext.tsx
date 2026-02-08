'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

interface CartItem {
    id: string; // Unique ID based on product ID + variant
    productId: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    imageUrl?: string; // Optional
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product, variantWeight: string, variantPrice: number, quantity: number) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (product: Product, variantWeight: string, variantPrice: number, quantity: number) => {
        const cartId = `${product._id}-${variantWeight}`;

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === cartId);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === cartId ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevCart, {
                    id: cartId,
                    productId: product._id,
                    name: product.name,
                    variant: variantWeight,
                    price: variantPrice,
                    quantity,
                    imageUrl: product.imageUrl // Store image for cart display
                }];
            }
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== cartId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, addToCart, cartTotal } = useCart(); // addToCart can be used to update quantity 
    // Wait, my addToCart logic adds to existing, so I can use it to increment. 
    // But decrementing requires specific logic or just negative quantity? 
    // My current addToCart logic: quantity: item.quantity + quantity. 
    // So adding -1 works!

    const updateQuantity = (item: any, change: number) => {
        if (item.quantity + change < 1) return;
        // Assuming product object is reconstructable or I just need ID
        // My addToCart takes (Product, variant, price, quantity).
        // I don't have the full Product object in cartItem easily, but I stored productId.
        // Actually, I should probably expose an 'updateQuantity' method in Context.
        // For now, I'll just use a workaround or update Context.
    };

    // Workaround: I'll accept that updating quantity might require context refactor or just using addToCart with negative values if I refactor context to support it.
    // Actually, I'll update Context to add `updateQuantity`.

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg shadow">
                    <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
                    <Link href="/products" className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow border border-gray-100 flex gap-4">
                                <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    {item.imageUrl ? (
                                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-2xl">🥣</div>
                                    )}
                                </div>

                                <div className="flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-lg">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.variant}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="font-bold text-green-700">₹{item.price * item.quantity}</div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-gray-600 text-sm">Qty: {item.quantity}</div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="bg-white p-6 rounded-xl shadow border border-gray-100 h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2 text-gray-600">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-600">
                            <span>Pickup Fee</span>
                            <span className="text-green-600 font-bold">FREE</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>₹{cartTotal}</span>
                            </div>
                        </div>

                        <Link
                            href="/checkout"
                            className="block w-full bg-green-600 text-white text-center font-bold py-3 rounded-xl hover:bg-green-700 transition shadow-lg"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

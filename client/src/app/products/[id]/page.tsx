'use client';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (id) {
            fetchProduct(Array.isArray(id) ? id[0] : id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/products/${productId}`);
            if (res.ok) {
                const data = await res.json();
                setProduct(data);
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-500">Loading product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                <Link href="/products" className="text-green-600 hover:underline mt-4 block">
                    Back to Products
                </Link>
            </div>
        );
    }

    const selectedVariant = product.variants[selectedVariantIndex];
    const totalPrice = selectedVariant ? selectedVariant.price * quantity : 0;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Section */}
                <div className="relative h-96 w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg p-6">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-4"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-6xl text-gray-400">
                            🥣
                        </div>
                    )}
                    {product.isOutOfStock && (
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
                            Out of Stock
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col">
                    <div className="mb-2 text-green-600 font-semibold uppercase tracking-wide text-sm">
                        {product.category}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    {!product.isOutOfStock && selectedVariant ? (
                        <>
                            {/* Variant Selector */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Select Weight:</label>
                                <div className="flex flex-wrap gap-3">
                                    {product.variants.map((variant, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedVariantIndex(index)}
                                            className={`px-4 py-2 border rounded-full text-sm font-medium transition-all ${selectedVariantIndex === index
                                                ? 'bg-green-600 text-white border-green-600 shadow-md transform scale-105'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-600'
                                                }`}
                                        >
                                            {variant.weight} - ₹{variant.price}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="mb-8 flex items-center">
                                <label className="mr-4 text-sm font-medium text-gray-700">Quantity:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-gray-900 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="mt-auto border-t border-gray-200 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-500">Total Price:</span>
                                    <span className="text-3xl font-bold text-green-700">₹{totalPrice}</span>
                                </div>

                                <button
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform active:scale-95 flex items-center justify-center gap-2"
                                    onClick={() => {
                                        addToCart(product, selectedVariant.weight, selectedVariant.price, quantity);
                                        alert(`Added ${quantity} x ${product.name} (${selectedVariant.weight}) to cart!`);
                                    }}
                                >
                                    <span>Add to Cart</span>
                                </button>
                                <p className="text-xs text-center text-gray-500 mt-2">
                                    Free pickup at Malik Tea Stall, Kalikiri.
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="mt-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center font-medium">
                            This product is currently out of stock. Please check back later.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`);
      const data = await res.json();
      setFeaturedProducts(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* 🌿 Minimalist Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-block mb-4 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium tracking-wide">
          100% Natural & Homemade
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Pure Taste. <br className="hidden md:block" />
          <span className="text-gray-400 dark:text-gray-600">Zero Compromise.</span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Experience the authentic flavor of Kalikiri's finest Badam Milk, Ragi Malt, and Tea Powders.
          Handcrafted daily with zero preservatives.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/products"
            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            Shop Now <ArrowRight size={18} />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all flex items-center justify-center"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* 📦 Featured Products - Clean Grid */}
      <section className="py-20 bg-gray-50 dark:bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold">Featured Mixes</h2>
            <Link href="/products" className="hidden sm:inline-flex items-center text-sm font-medium hover:text-amber-600 transition-colors">
              View All <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              )) : (
                <p className="col-span-3 text-center text-gray-500">No products found.</p>
              )}
            </div>
          )}

          <div className="mt-12 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center text-sm font-medium hover:text-amber-600 transition-colors">
              View All Products <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ✅ Why Choose Us - Simple List */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-neutral-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2 mx-auto md:mx-0">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold">100% Organic Ingredients</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              We source directly from trusted farmers. No chemicals, just pure nature in every sip.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-neutral-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2 mx-auto md:mx-0">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold">Handcrafted Daily</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Made in small batches to ensure freshness and authentic homemade taste.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-neutral-800 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400 mb-2 mx-auto md:mx-0">
              <CheckCircle size={24} />
            </div>
            <h3 className="text-xl font-bold">Instant Pickup</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Order online and pick up fresh from our Kalikiri store within minutes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

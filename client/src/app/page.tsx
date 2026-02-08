'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

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
    <div className="bg-white dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 font-sans">

      {/* Simple Banner */}
      <div className="bg-emerald-50 dark:bg-emerald-900/10 py-16 px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-emerald-800 dark:text-emerald-400 mb-4">
          Malik Tea Stall
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Fresh, homemade health mixes and tea powders. Order online, pickup instantly in Kalikiri.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
        >
          View All Products
        </Link>
      </div>

      {/* Featured Products */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white border-b pb-4">Latest Arrivals</h2>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.length > 0 ? featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            )) : (
              <p className="col-span-full text-center text-gray-500 py-10">No products available.</p>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/products" className="text-emerald-600 hover:underline font-medium">
            Browse Full Catalog &rarr;
          </Link>
        </div>
      </section>

      {/* Simple Info Section */}
      <section className="bg-gray-50 dark:bg-neutral-900 py-12 px-6 border-t border-gray-100 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h4 className="font-bold mb-2">🌿 Natural Ingredients</h4>
            <p className="text-gray-500">Made with 100% natural ingredients. No preservatives added.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">⚡ Fast Pickup</h4>
            <p className="text-gray-500">Ready for pickup within minutes of ordering.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">📞 Support</h4>
            <p className="text-gray-500">Call us anytime for bulk orders or questions.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

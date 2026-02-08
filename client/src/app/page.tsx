'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setFeaturedProducts(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-800 text-white py-20 px-6 sm:px-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Pure. Natural. <br />
              <span className="text-yellow-300">Healthy.</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
              Order fresh Badam Milk, Ragi Malt, and Premium Tea Powders online.
              Pick up directly from <strong>Malik Tea Stall, Kalikiri</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/products" className="bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:-translate-y-1">
                Shop Now
              </Link>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-green-700 transition transform hover:-translate-y-1">
                Visit Shop
              </Link>
            </div>
          </div>
          {/* Hero Image / Illustration Placeholder */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20 shadow-2xl skew-y-3 transform hover:skew-y-0 transition duration-500">
              <div className="text-center">
                <span className="text-6xl">🍵</span>
                <p className="mt-4 font-bold text-xl">Freshly Made Daily</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Featured Healthy Mixes</h2>
            <p className="mt-4 text-lg text-gray-500">Handpicked favorites from our customers.</p>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link href="/products" className="text-green-600 font-bold hover:text-green-700 underline text-lg">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Trust/Benefits Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold mb-2">100% Natural</h3>
              <p className="text-gray-600">No preservatives. Just pure, natural ingredients in every mix.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600">Affordable prices for premium quality. Zero hidden fees.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Pickup</h3>
              <p className="text-gray-600">Order online and pick up your ready package instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Teaser Section */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Visit Our Shop in Kalikiri</h2>
          <p className="text-lg text-gray-400 mb-8">
            Experience the freshness directly. Located near the Bus Stand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://www.google.com/maps/place/Kalikiri,+Andhra+Pradesh+517234"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <span>📍 Open in Google Maps</span>
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-green-600 text-green-500 font-bold py-3 px-8 rounded-full hover:bg-green-600 hover:text-white transition transform hover:-translate-y-1"
            >
              View Contact Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

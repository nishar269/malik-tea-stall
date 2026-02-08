'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Leaf, Award, Truck, ShoppingBag } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen font-sans">
      {/* 🌟 Modern Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-8 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-yellow-300 font-semibold text-sm animate-fade-in-up">
              <Leaf size={16} /> 100% Organic & Homemade
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-lg">
              Sip the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Purity</span> <br />
              of Nature.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg mx-auto md:mx-0">
              Handcrafted Badam Milk, Ragi Malt, and Premium Tea Powders.
              Made with love in <strong>Kalikiri</strong> for a healthier you.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-4">
              <Link href="/products" className="group relative px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-full shadow-xl hover:bg-yellow-300 transition-all transform hover:-translate-y-1 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Shop Now <ShoppingBag size={18} /></span>
                <div className="absolute inset-0 bg-white/30 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/10 hover:border-white transition-all transform hover:-translate-y-1 backdrop-blur-sm">
                Visit Store
              </Link>
            </div>
          </div>

          {/* Hero Image / 3D Layout */}
          <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative z-10">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-400 to-yellow-300 rounded-full opacity-30 filter blur-2xl animate-blob"></div>
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <div className="text-8xl mb-4 drop-shadow-2xl filter hover:brightness-110 transition cursor-pointer">🍵</div>
                  <h3 className="text-2xl font-bold text-white mb-1">Premium Quality</h3>
                  <p className="text-green-100 text-sm">Freshly ground every morning</p>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white text-green-800 p-4 rounded-2xl shadow-xl border border-green-100 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">⭐</div>
                  <div>
                    <p className="font-bold text-lg">4.9/5</p>
                    <p className="text-xs text-gray-500">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
          </svg>
        </div>
      </section>

      {/* 🚀 Featured Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Featured <span className="text-green-700">Healthy Mixes</span></h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our best-sellers, crafted with traditional recipes and pure ingredients for maximum health benefits.
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-green-200 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-green-600 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                <div key={product._id} className="transform transition duration-500 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              )) : (
                <p className="text-center col-span-3 text-gray-500">No products found. Please check back later!</p>
              )}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-green-700 font-bold hover:text-green-900 hover:underline text-lg transition-all">
              View All Products <span className="text-xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 🏆 Why Choose Us (Cards) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-green-50 border border-green-100 hover:bg-green-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl cursor-default">
              <div className="w-14 h-14 bg-green-100 text-green-600 group-hover:bg-white group-hover:text-green-600 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-colors">
                <Leaf />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Natural</h3>
              <p className="text-gray-600 group-hover:text-green-100 transition-colors">
                Free from preservatives and artificial flavors. Just pure, wholesome ingredients provided by nature.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-yellow-50 border border-yellow-100 hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl cursor-default">
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 group-hover:bg-white group-hover:text-yellow-600 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-colors">
                <Award />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-600 group-hover:text-yellow-100 transition-colors">
                Sourced from the best farms and processed with care to retain maximum nutritional value.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-blue-50 border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-2xl cursor-default">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 group-hover:bg-white group-hover:text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl transition-colors">
                <Truck />
              </div>
              <h3 className="text-xl font-bold mb-3">Fast Pickup</h3>
              <p className="text-gray-600 group-hover:text-blue-100 transition-colors">
                Order online and pick up your ready package instantly from our Kalikiri store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 Location Parallax Section */}
      <section className="relative py-24 bg-gray-900 text-white text-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=2842')" }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-yellow-400 font-bold tracking-widest uppercase text-sm mb-2 block">Our Store</span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Visit Malik Tea Stall</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Experience the aroma of fresh tea and health mixes. <br /> Located conveniently near the Kalikiri Bus Stand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="https://www.google.com/maps/place/Kalikiri,+Andhra+Pradesh+517234"
              target="_blank"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span>📍 Open Google Maps</span>
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105 shadow-xl"
            >
              Contact Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

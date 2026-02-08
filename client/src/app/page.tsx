'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { Leaf, Award, Truck, ShoppingBag, Coffee } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen font-sans bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
      {/* 🌟 Modern Hero Section */}
      <section className="relative bg-stone-900 dark:bg-black text-white overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 dark:from-slate-950 dark:via-black dark:to-stone-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/coffee-beans.png')] opacity-5 dark:opacity-10 mix-blend-overlay"></div>

        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-600/20 rounded-full filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-stone-500/10 rounded-full filter blur-[80px]"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 py-24 md:py-32 flex flex-col md:flex-row items-center justify-between z-10">
          <div className="md:w-1/2 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-md px-4 py-2.5 rounded-full border border-amber-500/30 text-amber-300 font-semibold text-sm animate-fade-in-up uppercase tracking-widest">
              <Leaf size={14} /> 100% Organic & Homemade
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
              Sip the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Golden</span> <br />
              Taste of Nature.
            </h1>
            <p className="text-lg md:text-xl text-stone-300 dark:text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0 font-medium">
              Handcrafted Badam Milk, Ragi Malt, and Premium Tea Powders.
              Made with traditional care in <strong>Kalikiri</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start pt-6">
              <Link href="/products" className="group relative px-8 py-4 bg-amber-500 text-stone-900 font-bold rounded-2xl shadow-xl shadow-amber-900/20 hover:bg-amber-400 hover:scale-105 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Shop Now <ShoppingBag size={18} /></span>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </Link>
              <Link href="/contact" className="px-8 py-4 border border-stone-600 bg-stone-800/50 backdrop-blur-md text-stone-200 font-bold rounded-2xl hover:bg-stone-700 hover:text-white hover:border-stone-500 transition-all transform hover:-translate-y-1">
                Visit Store
              </Link>
            </div>
          </div>

          {/* Hero Image / 3D Layout */}
          <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500 to-stone-500 rounded-full opacity-20 filter blur-3xl animate-blob"></div>

              {/* Main Card */}
              <div className="relative bg-stone-800/80 dark:bg-slate-900/80 backdrop-blur-xl border border-stone-700/50 p-10 rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 group">
                <div className="text-center group-hover:scale-105 transition-transform duration-500">
                  <div className="text-9xl mb-6 drop-shadow-2xl filter brightness-110 cursor-pointer animate-float">☕</div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-amber-100">Premium Blends</h3>
                    <p className="text-stone-400 text-sm font-medium uppercase tracking-wide">Freshly Ground Daily</p>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500 rounded-full opacity-50 blur-xl animate-pulse delay-700"></div>
              <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-stone-600 rounded-full opacity-30 blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50 dark:fill-slate-950"></path>
          </svg>
        </div>
      </section>

      {/* 🚀 Featured Products Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Mixes</span>
            </h2>
            <p className="text-lg text-stone-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              Our best-sellers, crafted with traditional recipes and pure ingredients for maximum health benefits.
            </p>
            <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full mt-6"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-200 dark:border-slate-700 rounded-full animate-ping"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-amber-600 rounded-full animate-spin"></div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                <div key={product._id} className="transform transition duration-500 hover:scale-105">
                  <ProductCard product={product} />
                </div>
              )) : (
                <p className="text-center col-span-3 text-stone-500 dark:text-gray-500 text-lg">No products found. Please check back later!</p>
              )}
            </div>
          )}

          <div className="mt-20 text-center">
            <Link href="/products" className="inline-flex items-center gap-2 text-stone-900 dark:text-white font-bold hover:text-amber-600 dark:hover:text-amber-400 hover:tracking-wide text-lg transition-all duration-300 border-b-2 border-transparent hover:border-amber-500">
              View All Products <span className="text-xl">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 🏆 Why Choose Us (Cards) */}
      <section className="py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-gray-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-stone-100 dark:border-slate-700 hover:border-amber-500/30 hover:bg-stone-50 dark:hover:bg-slate-800/80 transition-all duration-500 shadow-xl shadow-stone-200/40 dark:shadow-none hover:-translate-y-2">
              <div className="w-16 h-16 bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white rounded-2xl flex items-center justify-center mb-8 text-2xl transition-all duration-500 transform group-hover:rotate-6">
                <Leaf />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">100% Natural</h3>
              <p className="text-stone-600 dark:text-gray-400 leading-relaxed">
                Free from preservatives and artificial flavors. Just pure, wholesome ingredients provided by nature.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-stone-100 dark:border-slate-700 hover:border-amber-500/30 hover:bg-stone-50 dark:hover:bg-slate-800/80 transition-all duration-500 shadow-xl shadow-stone-200/40 dark:shadow-none hover:-translate-y-2">
              <div className="w-16 h-16 bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white rounded-2xl flex items-center justify-center mb-8 text-2xl transition-all duration-500 transform group-hover:rotate-6">
                <Award />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Premium Quality</h3>
              <p className="text-stone-600 dark:text-gray-400 leading-relaxed">
                Sourced from the best farms and processed with care to retain maximum nutritional value.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-10 rounded-[2.5rem] bg-white dark:bg-slate-800 border border-stone-100 dark:border-slate-700 hover:border-amber-500/30 hover:bg-stone-50 dark:hover:bg-slate-800/80 transition-all duration-500 shadow-xl shadow-stone-200/40 dark:shadow-none hover:-translate-y-2">
              <div className="w-16 h-16 bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-amber-400 group-hover:bg-amber-500 group-hover:text-white rounded-2xl flex items-center justify-center mb-8 text-2xl transition-all duration-500 transform group-hover:rotate-6">
                <Truck />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-stone-900 dark:text-white">Fast Pickup</h3>
              <p className="text-stone-600 dark:text-gray-400 leading-relaxed">
                Order online and pick up your ready package instantly from our Kalikiri store.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📍 Location Parallax Section */}
      <section className="relative py-32 bg-stone-900 text-white text-center bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=2842')" }}>
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-amber-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 block animate-fade-in">Our Store</span>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white">Visit Malik Tea Stall</h2>
          <p className="text-xl md:text-2xl text-stone-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Experience the aroma of <span className="text-amber-400 font-medium">freshly ground</span> spices and tea. <br /> Located conveniently near the Kalikiri Bus Stand.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="https://www.google.com/maps/place/Kalikiri,+Andhra+Pradesh+517234"
              target="_blank"
              className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span>📍 Open Google Maps</span>
            </Link>
            <Link
              href="/contact"
              className="bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-stone-900 transition-all transform hover:scale-105 shadow-xl"
            >
              Contact Details
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

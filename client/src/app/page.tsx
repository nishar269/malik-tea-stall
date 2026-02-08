'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import { ArrowRight, Leaf, Coffee, Star } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen font-sans bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-500">

      {/* 🌟 Cinematic Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/50 to-stone-900/30 z-10"></div>
          {/* Replace with your actual high-res image */}
          <div
            className="w-full h-full bg-cover bg-center animate-slow-zoom"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=2574')" }}
          ></div>
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 uppercase tracking-widest text-xs font-bold animate-fade-in-down">
            <Leaf size={12} /> Authentic & Organic
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight leading-tight drop-shadow-2xl animate-fade-in-up">
            Taste the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600">Golden Essence.</span>
          </h1>

          <p className="text-lg md:text-2xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
            Handpicked leaves and traditional recipes from the heart of Kalikiri.
            Experience tea like never before.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8 animate-fade-in-up delay-200">
            <Link
              href="/products"
              className="group relative px-8 py-4 bg-amber-500 text-stone-900 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 shadow-xl shadow-amber-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">Explore Collection <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-white/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105"
            >
              Our Heritage
            </Link>
          </div>
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* ✨ Premium Featured Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-stone-900/5 dark:bg-stone-900/50 -skew-y-3 transform origin-top-left -z-10"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-amber-600 dark:text-amber-400 font-bold tracking-wider uppercase text-sm">Curated Selection</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 text-stone-900 dark:text-white">Our Signature <span className="italic font-serif text-amber-600">Blends</span></h2>
            </div>
            <Link href="/products" className="group flex items-center gap-2 text-stone-600 dark:text-stone-300 hover:text-amber-600 transition-colors font-medium">
              View All Products <span className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full group-hover:bg-amber-500 group-hover:text-white transition-all"><ArrowRight size={16} /></span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[450px] bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                <div key={product._id} className="transform hover:-translate-y-2 transition-transform duration-500">
                  <ProductCard product={product} />
                </div>
              )) : (
                <p className="col-span-full text-center text-gray-500">No products available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 🌿 Immersive Feature Section */}
      <section className="relative py-32 bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-stone-900/90 z-10"></div>
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=2574')] bg-cover bg-fixed bg-center"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 bg-amber-500 text-stone-900 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:rotate-12 transition-transform">
              <Leaf />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">100% Organic</h3>
            <p className="text-stone-300 leading-relaxed">
              Sourced directly from nature with zero artificial additives or preservatives. Pure goodness in every cup.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 bg-amber-500 text-stone-900 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:rotate-12 transition-transform">
              <Coffee />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Master Crafted</h3>
            <p className="text-stone-300 leading-relaxed">
              Blended by experts using traditional methods to preserve the authentic aroma and taste.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
            <div className="w-14 h-14 bg-amber-500 text-stone-900 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:rotate-12 transition-transform">
              <Star />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Premium Quality</h3>
            <p className="text-stone-300 leading-relaxed">
              Only the finest ingredients make it to your cup. Quality you can taste and trust.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

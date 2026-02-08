import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

    return (
        <div className="group relative bg-white dark:bg-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-stone-200/50 dark:hover:shadow-black/50 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-slate-700 h-full flex flex-col">
            {/* Image Container with Gradient Overlay */}
            <div className="relative h-64 w-full bg-gradient-to-br from-amber-50 to-stone-100 dark:from-slate-700 dark:to-slate-600 overflow-hidden">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-6xl text-gray-300 dark:text-gray-500">
                        ☕
                    </div>
                )}

                {/* Overlay Badge for Out of Stock */}
                {product.isOutOfStock && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                        <span className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform rotate-[-10deg]">
                            Out of Stock
                        </span>
                    </div>
                )}

                {/* Category Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-amber-800 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-amber-100 dark:border-amber-900/30 uppercase tracking-wide">
                    {product.category}
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-slate-800 z-20">
                <div className="mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors" title={product.name}>
                        {product.name}
                    </h3>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed opacity-90">
                    {product.description}
                </p>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <p className="text-xs text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wider mb-1">Price</p>
                        <div className="text-2xl font-extrabold text-stone-800 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            ₹{lowestPrice}
                        </div>
                    </div>

                    <Link
                        href={`/products/${product._id}`}
                        className="relative overflow-hidden bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-5 py-3 rounded-2xl font-bold text-sm shadow-lg group-hover:shadow-amber-500/30 dark:group-hover:shadow-amber-400/20 transition-all duration-300 flex items-center gap-2 group-hover:bg-amber-600 dark:group-hover:bg-amber-400 group-hover:pr-6"
                    >
                        <span className="relative z-10">Details</span>
                        <ArrowRight className="w-4 h-4 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

    return (
        <div className="group relative bg-white dark:bg-stone-900 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50 dark:hover:shadow-black/50 border border-stone-100 dark:border-stone-800">
            {/* Image Container with Floating Badge */}
            <div className="relative aspect-[4/5] bg-stone-50 dark:bg-stone-800 overflow-hidden">
                <Link href={`/products/${product._id}`} className="block h-full w-full">
                    {product.imageUrl ? (
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-stone-300 dark:text-stone-600 text-6xl font-light">
                            🍵
                        </div>
                    )}
                </Link>

                {/* Floating Action Button */}
                <button className="absolute bottom-4 right-4 bg-white/90 dark:bg-black/80 backdrop-blur-md p-3 rounded-full text-stone-900 dark:text-white shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-amber-500 hover:text-white">
                    <ShoppingBag size={20} />
                </button>

                {product.isOutOfStock && (
                    <div className="absolute top-4 left-4 bg-red-500/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
                        Sold Out
                    </div>
                )}
            </div>

            {/* Elegant Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <Link href={`/products/${product._id}`} className="group-hover:text-amber-600 transition-colors">
                        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white line-clamp-1 leading-tight">
                            {product.name}
                        </h3>
                    </Link>
                    <Link href={`/products/${product._id}`} className="text-stone-300 hover:text-amber-500 transition-colors">
                        <ArrowUpRight size={20} />
                    </Link>
                </div>

                <p className="text-stone-500 text-sm mb-4 line-clamp-1 font-medium tracking-wide uppercase text-[10px]">
                    {product.category}
                </p>

                <div className="flex items-end justify-between border-t border-stone-100 dark:border-stone-800 pt-4 mt-2">
                    <div>
                        <span className="text-xs text-stone-400 block mb-1">Starting from</span>
                        <span className="text-2xl font-bold text-amber-600 dark:text-amber-500 font-serif">
                            ₹{lowestPrice}
                        </span>
                    </div>
                    <Link
                        href={`/products/${product._id}`}
                        className="text-xs font-bold uppercase tracking-widest text-stone-900 dark:text-white hover:underline decoration-amber-500 underline-offset-4 decoration-2"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}

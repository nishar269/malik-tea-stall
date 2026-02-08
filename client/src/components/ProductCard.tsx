import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { ArrowRight } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

    return (
        <div className="group border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
            <Link href={`/products/${product._id}`} className="block relative aspect-square bg-gray-50 dark:bg-neutral-800">
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-300 dark:text-gray-600 font-bold text-4xl">
                        🍵
                    </div>
                )}
                {product.isOutOfStock && (
                    <div className="absolute top-2 left-2 bg-neutral-900 text-white text-[10px] font-bold px-2 py-1 rounded">
                        SOLD OUT
                    </div>
                )}
            </Link>

            <div className="p-4">
                <Link href={`/products/${product._id}`} className="hover:text-emerald-600 transition-colors">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1" title={product.name}>
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                        ₹{lowestPrice}
                    </span>
                </div>
            </div>

            <Link
                href={`/products/${product._id}`}
                className="block w-full text-center bg-gray-50 dark:bg-neutral-800 hover:bg-emerald-50 dark:hover:bg-emerald-900 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 border-t border-gray-100 dark:border-neutral-800 transition-colors"
            >
                View Details
            </Link>
        </div>
    );
}

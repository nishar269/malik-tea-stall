import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Coffee } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

    return (
        <div className="group relative transition-all duration-300">
            {/* Image Container - Simple aspect ratio with subtle zoom */}
            <div className={`relative w-full aspect-[4/5] bg-gray-100 dark:bg-neutral-800 rounded-xl overflow-hidden mb-4 ${product.isOutOfStock ? 'opacity-75' : ''}`}>
                {product.imageUrl ? (
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-4xl text-gray-300 dark:text-neutral-600">
                        <Coffee size={40} />
                    </div>
                )}

                {product.isOutOfStock && (
                    <div className="absolute top-2 right-2 bg-neutral-900 text-white text-xs font-medium px-2 py-1 rounded">
                        Sold Out
                    </div>
                )}
            </div>

            {/* Clean Content */}
            <div className="space-y-1">
                <Link href={`/products/${product._id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center justify-between">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{product.category}</p>
                    <p className="text-gray-900 dark:text-gray-200 font-semibold">
                        ₹{lowestPrice}
                    </p>
                </div>
            </div>
        </div>
    );
}

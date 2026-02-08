import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
    const lowestPrice = product.variants && product.variants.length > 0
        ? Math.min(...product.variants.map(v => v.price))
        : 0;

    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 group">
            {/* Image Container - Better sizing and centering */}
            <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                {product.imageUrl ? (
                    <div className="relative h-full w-full flex items-center justify-center">
                        <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-5xl">
                        🥣
                    </div>
                )}
                {product.isOutOfStock && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        Out of Stock
                    </div>
                )}
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                    {product.category}
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1" title={product.name}>
                    {product.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-xs text-gray-400">Starts from</span>
                        <div className="text-2xl font-bold text-green-700">₹{lowestPrice}</div>
                    </div>
                    <Link
                        href={`/products/${product._id}`}
                        className="bg-gray-900 hover:bg-green-600 text-white font-medium py-2.5 px-5 rounded-xl transition-colors shadow-md hover:shadow-lg"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

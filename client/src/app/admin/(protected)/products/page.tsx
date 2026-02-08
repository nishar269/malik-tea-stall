'use client';
import { useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/mockProducts';
import Link from 'next/link';
import { Edit2, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
    const [products, setProducts] = useState(initialProducts);

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this product?')) {
            // API Call to delete
            setProducts(products.filter(p => p._id !== id));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Manage Products</h1>
                <Link href="/admin/products/new" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow transition">
                    Add Product
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variants</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">🥣</div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {product.variants.length} Options
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {product.isOutOfStock ? (
                                        <span className="text-red-500 font-bold text-xs">Out of Stock</span>
                                    ) : (
                                        <span className="text-green-600 font-bold text-xs">Available</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end gap-3">
                                        <Link href={`/admin/products/${product._id}`} className="text-indigo-600 hover:text-indigo-900">
                                            <Edit2 className="h-5 w-5" />
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-900">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

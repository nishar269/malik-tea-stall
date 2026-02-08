'use client';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/mockProducts';

const categories = ["All", "Health Mix", "Tea Powder"];

export default function ProductsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* Category Tabs */}
                    <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedCategory === cat
                                        ? 'bg-white text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-green-600'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                    <button
                        onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
                        className="mt-4 text-green-600 font-bold hover:underline"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        category: 'Health Mix',
        description: '',
        imageUrl: '',
        variants: [{ weight: '250g', price: 0, stock: 100 }]
    });

    const handleVariantChange = (index: number, field: string, value: string | number) => {
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { weight: '', price: 0, stock: 0 }]
        });
    };

    const removeVariant = (index: number) => {
        const newVariants = formData.variants.filter((_, i) => i !== index);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // API Call to create product
        console.log("Creating Product:", formData);
        alert("Produc Created (Mock)!");
        router.push('/admin/products');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="Health Mix">Health Mix</option>
                        <option value="Tea Powder">Tea Powder</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                    <input
                        type="url"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Variants (Size & Price)</label>
                    {formData.variants.map((variant, index) => (
                        <div key={index} className="flex gap-4 mb-4 items-end">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 block mb-1">Weight (e.g., 250g)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    value={variant.weight}
                                    onChange={(e) => handleVariantChange(index, 'weight', e.target.value)}
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-gray-500 block mb-1">Price (₹)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    value={variant.price}
                                    onChange={(e) => handleVariantChange(index, 'price', Number(e.target.value))}
                                />
                            </div>
                            <div className="w-24">
                                <label className="text-xs text-gray-500 block mb-1">Stock</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                    value={variant.stock}
                                    onChange={(e) => handleVariantChange(index, 'stock', Number(e.target.value))}
                                />
                            </div>
                            {formData.variants.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeVariant(index)}
                                    className="text-red-500 hover:text-red-700 px-2 py-2"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addVariant}
                        className="text-sm text-green-600 font-bold hover:underline"
                    >
                        + Add Another Variant
                    </button>
                </div>

                <div className="pt-6 border-t border-gray-200">
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}

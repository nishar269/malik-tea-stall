'use client';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export default function AdminOffersPage() {
    const [offers, setOffers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newOffer, setNewOffer] = useState({
        title: '',
        discountType: 'PERCENTAGE',
        discountValue: 0,
        startDate: '',
        endDate: '',
        isActive: true
    });

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/offers?mode=admin');
            const data = await res.json();
            setOffers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/offers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOffer)
            });

            if (res.ok) {
                fetchOffers();
                setNewOffer({
                    title: '',
                    discountType: 'PERCENTAGE',
                    discountValue: 0,
                    startDate: '',
                    endDate: '',
                    isActive: true
                });
            } else {
                alert("Failed to create offer");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this offer?')) return;
        try {
            await fetch(`http://localhost:5000/api/offers/${id}`, { method: 'DELETE' });
            fetchOffers();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Manage Offers</h1>

            {/* Create Offer */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-bold mb-4">Create New Offer</h2>
                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Offer Title</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            placeholder="e.g. Summer Sale"
                            value={newOffer.title}
                            onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={newOffer.discountType}
                                onChange={(e) => setNewOffer({ ...newOffer, discountType: e.target.value })}
                            >
                                <option value="PERCENTAGE">Percentage (%)</option>
                                <option value="FLAT">Flat Amount (₹)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Value</label>
                            <input
                                type="number"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={newOffer.discountValue}
                                onChange={(e) => setNewOffer({ ...newOffer, discountValue: Number(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="date"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={newOffer.startDate}
                                onChange={(e) => setNewOffer({ ...newOffer, startDate: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="date"
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                value={newOffer.endDate}
                                onChange={(e) => setNewOffer({ ...newOffer, endDate: e.target.value })}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                    >
                        Create Offer
                    </button>
                </form>
            </div>

            {/* List Offers */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold">Active Offers</h2>
                {isLoading ? (
                    <p>Loading...</p>
                ) : offers.length === 0 ? (
                    <p className="text-gray-500">No offers found.</p>
                ) : (
                    offers.map((offer) => (
                        <div key={offer._id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{offer.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {offer.discountType === 'PERCENTAGE' ? `${offer.discountValue}% Off` : `₹${offer.discountValue} Off`}
                                </p>
                                <p className="text-xs text-gray-400">
                                    Valid: {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(offer._id)}
                                className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}


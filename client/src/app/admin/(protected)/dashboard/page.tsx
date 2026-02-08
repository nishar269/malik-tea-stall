'use client';
import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: "Today's Sales", value: "₹2,500", color: "bg-green-100 text-green-600" },
        { label: "Pending Orders", value: "3", color: "bg-yellow-100 text-yellow-600" },
        { label: "Low Stock Items", value: "1", color: "bg-red-100 text-red-600" },
        { label: "Total Customers", value: "128", color: "bg-blue-100 text-blue-600" },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                                {/* Icon Placeholder */}
                                📊
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/products" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center font-medium transition">
                            Manage Products
                        </Link>
                        <Link href="/admin/orders" className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg text-center font-medium transition">
                            View Orders
                        </Link>
                        <Link href="/admin/offline-sale" className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center font-medium transition col-span-2 shadow-lg">
                            + New Offline Sale
                        </Link>
                    </div>
                </div>

                {/* Recent Orders Overview */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                    <div className="space-y-4">
                        {/* Mock Order */}
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <p className="font-bold">#ORD-12345</p>
                                <p className="text-sm text-gray-500">2 Items • ₹450</p>
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Pending</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-4">
                            <div>
                                <p className="font-bold">#ORD-12344</p>
                                <p className="text-sm text-gray-500">1 Item • ₹150</p>
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Completed</span>
                        </div>
                    </div>
                    <Link href="/admin/orders" className="block text-center text-green-600 font-bold mt-4 hover:underline">
                        View All Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

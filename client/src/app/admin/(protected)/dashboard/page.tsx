'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';

export default function AdminDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [ordersRes, productsRes] = await Promise.all([
                fetch('http://localhost:5000/api/orders'),
                fetch('http://localhost:5000/api/products')
            ]);

            const ordersData = await ordersRes.json();
            const productsData = await productsRes.json();

            setOrders(ordersData);
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Calculate stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysOrders = orders.filter(o => new Date(o.createdAt) >= today);
    const todaysSales = todaysOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const outOfStockItems = products.filter(p => p.isOutOfStock).length;
    const totalOrders = orders.length;

    const stats = [
        { label: "Today's Sales", value: `₹${todaysSales.toLocaleString()}`, color: "bg-green-100 text-green-600", icon: DollarSign },
        { label: "Pending Orders", value: String(pendingOrders), color: "bg-yellow-100 text-yellow-600", icon: ShoppingBag },
        { label: "Out of Stock", value: String(outOfStockItems), color: "bg-red-100 text-red-600", icon: Package },
        { label: "Total Orders", value: String(totalOrders), color: "bg-blue-100 text-blue-600", icon: Users },
    ];

    const recentOrders = orders.slice(0, 5);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-500">Loading dashboard...</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, i) => {
                            const Icon = stat.icon;
                            return (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                                            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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
                                <Link href="/admin/reports" className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-4 rounded-lg text-center font-medium transition">
                                    Sales Reports
                                </Link>
                                <Link href="/admin/offline-sale" className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center font-medium transition shadow-lg">
                                    + New Offline Sale
                                </Link>
                            </div>
                        </div>

                        {/* Recent Orders Overview */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                            <div className="space-y-4">
                                {recentOrders.length === 0 ? (
                                    <p className="text-gray-500 text-center py-4">No orders yet.</p>
                                ) : (
                                    recentOrders.map((order) => {
                                        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                                        return (
                                            <div key={order._id} className="flex justify-between items-center border-b pb-4">
                                                <div>
                                                    <p className="font-bold">{order._id}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {items?.length || 0} Items • ₹{order.totalAmount}
                                                    </p>
                                                </div>
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${order.status === 'Pending'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                            <Link href="/admin/orders" className="block text-center text-green-600 font-bold mt-4 hover:underline">
                                View All Orders
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

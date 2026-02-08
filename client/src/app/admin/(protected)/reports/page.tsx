'use client';
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Package, DollarSign } from 'lucide-react';

export default function ReportsPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dateFilter, setDateFilter] = useState('today');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Filter orders by date
    const getFilteredOrders = () => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        return orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            switch (dateFilter) {
                case 'today':
                    return orderDate >= today;
                case 'week':
                    return orderDate >= weekAgo;
                case 'month':
                    return orderDate >= monthAgo;
                default:
                    return true;
            }
        });
    };

    const filteredOrders = getFilteredOrders();
    const totalSales = filteredOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrders = filteredOrders.length;
    const completedOrders = filteredOrders.filter(o => o.status === 'Completed').length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalSales / totalOrders) : 0;

    // Get top products
    const productSales: { [key: string]: { name: string; qty: number; revenue: number } } = {};
    filteredOrders.forEach(order => {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        items?.forEach((item: any) => {
            const name = item.name || item.product || 'Unknown';
            if (!productSales[name]) {
                productSales[name] = { name, qty: 0, revenue: 0 };
            }
            productSales[name].qty += item.quantity || 1;
            productSales[name].revenue += (item.price || 0) * (item.quantity || 1);
        });
    });

    const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Sales Reports</h1>

                <select
                    className="border border-gray-300 rounded-lg px-4 py-2"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                >
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="all">All Time</option>
                </select>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <DollarSign className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Sales</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{totalSales.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <Package className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total Orders</p>
                                    <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-full">
                                    <TrendingUp className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Avg Order Value</p>
                                    <p className="text-2xl font-bold text-gray-900">₹{avgOrderValue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <BarChart3 className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Completed</p>
                                    <p className="text-2xl font-bold text-gray-900">{completedOrders}/{totalOrders}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top Products */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
                        <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
                        {topProducts.length === 0 ? (
                            <p className="text-gray-500">No sales data available.</p>
                        ) : (
                            <div className="space-y-3">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <span className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold text-sm">
                                                {index + 1}
                                            </span>
                                            <span className="font-medium">{product.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900">₹{product.revenue.toLocaleString()}</p>
                                            <p className="text-xs text-gray-500">{product.qty} sold</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3 px-2">Order ID</th>
                                        <th className="text-left py-3 px-2">Customer</th>
                                        <th className="text-left py-3 px-2">Amount</th>
                                        <th className="text-left py-3 px-2">Status</th>
                                        <th className="text-left py-3 px-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.slice(0, 10).map((order) => (
                                        <tr key={order._id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-2 font-mono text-sm">{order._id}</td>
                                            <td className="py-3 px-2">{order.customerPhone}</td>
                                            <td className="py-3 px-2 font-bold">₹{order.totalAmount}</td>
                                            <td className="py-3 px-2">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-sm text-gray-500">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

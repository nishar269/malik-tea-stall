'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, Clock, Printer, Trash2 } from 'lucide-react';

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [filter, setFilter] = useState('All');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/orders');
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await fetch(`http://localhost:5000/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            setOrders(orders.map(o => o._id === id ? { ...o, status: newStatus } : o));
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this order?')) return;
        try {
            await fetch(`http://localhost:5000/api/orders/${id}`, { method: 'DELETE' });
            setOrders(orders.filter(o => o._id !== id));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handlePrint = (order: any) => {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        const printContent = `
            <html>
            <head>
                <title>Invoice - ${order._id}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
                    h1 { text-align: center; color: #16a34a; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .order-id { font-size: 14px; color: #666; }
                    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
                    .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
                    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Malik Tea Stall</h1>
                    <p>Kalikiri, Andhra Pradesh</p>
                    <p class="order-id">Order: ${order._id}</p>
                    <p class="order-id">${new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <table>
                    <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
                    ${items?.map((item: any) => `
                        <tr>
                            <td>${item.name || 'Product'} ${item.variant || ''}</td>
                            <td>${item.quantity || 1}</td>
                            <td>₹${item.price || 0}</td>
                        </tr>
                    `).join('') || ''}
                </table>
                <div class="total">Total: ₹${order.totalAmount}</div>
                <p>Payment: ${order.paymentMethod || 'N/A'}</p>
                <p>Customer: ${order.customerPhone}</p>
                <div class="footer">
                    <p>Thank you for your order!</p>
                    <p>📞 +91 73372 74631</p>
                </div>
            </body>
            </html>
        `;
        const printWindow = window.open('', '_blank');
        printWindow?.document.write(printContent);
        printWindow?.document.close();
        printWindow?.print();
    };

    const filteredOrders = orders.filter(order => filter === 'All' || order.status === filter);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setFilter('All')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'All' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600 border'}`}
                    >
                        All ({orders.length})
                    </button>
                    <button
                        onClick={() => setFilter('Pending')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-600 border'}`}
                    >
                        Pending
                    </button>
                    <button
                        onClick={() => setFilter('Completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${filter === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 border'}`}
                    >
                        Completed
                    </button>
                </div>
            </div>

            {isLoading ? (
                <p className="text-center py-10">Loading orders...</p>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order) => {
                        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                        return (
                            <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-bold text-lg text-gray-900">{order._id}</h3>
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mb-2">Customer: {order.customerPhone}</p>
                                    <p className="text-xs text-gray-400 mb-2">{new Date(order.createdAt).toLocaleString()}</p>
                                    <div className="space-y-1">
                                        {items?.map((item: any, idx: number) => (
                                            <p key={idx} className="text-sm text-gray-700">
                                                {item.quantity || 1}x {item.name || 'Product'} {item.variant || ''} - ₹{item.price || 0}
                                            </p>
                                        ))}
                                    </div>
                                    <p className="font-bold text-gray-900 mt-2">Total: ₹{order.totalAmount}</p>
                                </div>

                                <div className="flex flex-col justify-center gap-2 min-w-[150px]">
                                    {order.status === 'Pending' ? (
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'Completed')}
                                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
                                        >
                                            <CheckCircle className="h-4 w-4" />
                                            Mark Paid
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleStatusChange(order._id, 'Pending')}
                                            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-2 px-4 rounded-lg transition"
                                        >
                                            <Clock className="h-4 w-4" />
                                            Revert
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handlePrint(order)}
                                        className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold py-2 px-4 rounded-lg transition"
                                    >
                                        <Printer className="h-4 w-4" />
                                        Print
                                    </button>
                                    <button
                                        onClick={() => handleDelete(order._id)}
                                        className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 px-4 rounded-lg transition"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                    {filteredOrders.length === 0 && (
                        <p className="text-center text-gray-500 py-10">No orders found.</p>
                    )}
                </div>
            )}
        </div>
    );
}

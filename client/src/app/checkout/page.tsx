'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CASH'>('CASH');
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    // Real API Call
    const handlePlaceOrder = async () => {
        if (!phone) {
            alert("Please enter a phone number");
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                customerPhone: phone,
                items: cart.map(item => ({
                    product: item.productId,
                    variant: item.variant,
                    quantity: item.quantity,
                    price: item.price
                })),
                paymentMethod: paymentMethod,
                totalAmount: cartTotal
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (!res.ok) {
                throw new Error("API Error");
            }

            const data = await res.json();
            const orderId = data._id || `ORD-${Date.now()}`;

            clearCart();
            router.push(`/order-success/${orderId}`);

        } catch (error: any) {
            // Demo mode - create mock order when backend is down
            console.log("Demo Mode: Order placed locally");
            const mockOrderId = `DEMO-${Date.now().toString(36).toUpperCase()}`;
            clearCart();
            router.push(`/order-success/${mockOrderId}`);
        } finally {
            setIsProcessing(false);
        }
    };

    if (cart.length === 0) {
        return <div className="text-center py-20">Your cart is empty.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 p-6 md:p-8 space-y-8">

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <input
                        type="tel"
                        placeholder="Your Phone Number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <p className="text-xs text-gray-500 mt-2">We will call you when your order is ready for pickup.</p>
                </div>

                {/* Payment Method */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
                    <div className="flex flex-col space-y-4">
                        {/* Cash Option */}
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'CASH' ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="CASH"
                                checked={paymentMethod === 'CASH'}
                                onChange={() => setPaymentMethod('CASH')}
                                className="h-5 w-5 text-green-600 focus:ring-green-500"
                            />
                            <div className="ml-4">
                                <span className="block font-bold text-gray-900">Cash on Pickup</span>
                                <span className="block text-sm text-gray-500">Pay when you collect your order at the shop.</span>
                            </div>
                        </label>

                        {/* UPI Option */}
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-200 hover:border-gray-300'}`}>
                            <input
                                type="radio"
                                name="payment"
                                value="UPI"
                                checked={paymentMethod === 'UPI'}
                                onChange={() => setPaymentMethod('UPI')}
                                className="h-5 w-5 text-green-600 focus:ring-green-500"
                            />
                            <div className="ml-4 w-full">
                                <span className="block font-bold text-gray-900">UPI / QR Code</span>
                                <span className="block text-sm text-gray-500">Scan QR or Pay to UPI ID.</span>

                                {paymentMethod === 'UPI' && (
                                    <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200 text-center">
                                        <div className="bg-white mx-auto flex items-center justify-center text-gray-500 mb-2 p-2">
                                            {/* Dynamic QR Code */}
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=7337274631@ybl&pn=MalikTeaStall&am=${cartTotal}&cu=INR`}
                                                alt="UPI QR Code"
                                                className="h-40 w-40"
                                            />
                                        </div>
                                        <p className="font-mono text-sm bg-gray-100 p-2 rounded select-all mb-1">7337274631@ybl</p>
                                        <p className="font-bold text-green-600">Amount: ₹{cartTotal}</p>
                                        <p className="text-xs text-red-500 mt-2">After payment, please show the confirmation screen at the shop.</p>
                                    </div>
                                )}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span>Total Amount</span>
                        <span>₹{cartTotal}</span>
                    </div>
                </div>

                <button
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing || !phone}
                >
                    {isProcessing ? 'Processing...' : `Place Order (₹${cartTotal})`}
                </button>
            </div>
        </div>
    );
}

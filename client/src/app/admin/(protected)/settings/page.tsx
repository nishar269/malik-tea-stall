'use client';
import { useState } from 'react';
import { Save, Lock, Store, CreditCard } from 'lucide-react';

export default function AdminSettingsPage() {
    // Shop Details
    const [shopName, setShopName] = useState('Malik Tea Stall');
    const [shopPhone, setShopPhone] = useState('+91 73372 74631');
    const [shopAddress, setShopAddress] = useState('Kalikiri Cross Road, Near Bus Stand, Bustand Road, Kalikiri, Andhra Pradesh 517234');
    const [shopEmail, setShopEmail] = useState('malikteastall@gmail.com');

    // Payment Settings
    const [upiId, setUpiId] = useState('7337274631@ybl');
    const [upiName, setUpiName] = useState('Malik Tea Stall');

    // Password Change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleSaveShopDetails = async () => {
        setSaving(true);
        // In real app: POST to /api/settings
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage('Shop details saved successfully!');
        setSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSavePayment = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMessage('Payment settings saved!');
        setSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }
        if (newPassword.length < 6) {
            setMessage('Password must be at least 6 characters!');
            return;
        }

        setSaving(true);
        try {
            const res = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (res.ok) {
                setMessage('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                const data = await res.json();
                setMessage(data.msg || 'Failed to change password');
            }
        } catch (error) {
            setMessage('Error changing password');
        }
        setSaving(false);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Settings</h1>

            {message && (
                <div className={`mb-6 p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-8">
                {/* Shop Details */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <Store className="h-6 w-6 text-green-600" />
                        <h2 className="text-xl font-bold">Shop Details</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={shopPhone}
                                    onChange={(e) => setShopPhone(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={shopEmail}
                                    onChange={(e) => setShopEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                rows={2}
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleSaveShopDetails}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Save Shop Details
                        </button>
                    </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                        <h2 className="text-xl font-bold">Payment Settings (UPI)</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 font-mono"
                                    placeholder="yourname@upi"
                                    value={upiId}
                                    onChange={(e) => setUpiId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={upiName}
                                    onChange={(e) => setUpiName(e.target.value)}
                                />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500">This UPI ID will be shown in the checkout QR code.</p>
                        <button
                            onClick={handleSavePayment}
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Save Payment Settings
                        </button>
                    </div>
                </div>

                {/* Change Password */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="h-6 w-6 text-red-600" />
                        <h2 className="text-xl font-bold">Change Password</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleChangePassword}
                            disabled={saving || !currentPassword || !newPassword}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 disabled:bg-gray-300"
                        >
                            <Lock className="h-4 w-4" />
                            Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

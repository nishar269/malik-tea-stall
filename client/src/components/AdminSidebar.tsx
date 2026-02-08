'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, ListOrdered, Percent, Settings, LogOut, BarChart3 } from 'lucide-react';

const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: ShoppingBag },
    { href: '/admin/orders', label: 'Orders', icon: ListOrdered },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin/offers', label: 'Offers', icon: Percent },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    const handleLogout = () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
    };

    return (
        <aside className="w-64 bg-gray-900 text-white min-h-screen hidden md:flex flex-col">
            <div className="h-16 flex items-center justify-center border-b border-gray-800">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600">
                    Admin Panel
                </span>
            </div>

            <nav className="flex-grow py-6 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${isActive
                                ? 'bg-green-600 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                }`}
                        >
                            <Icon className="h-5 w-5 mr-3" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}

'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ShoppingCart, Menu, X, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Products' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="border-b border-gray-100 dark:border-neutral-800 bg-white dark:bg-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg tracking-tight hover:text-emerald-600 transition-colors">
                        <Coffee size={20} className="text-emerald-600" />
                        Malik Tea Stall
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${pathname === link.href
                                        ? 'text-emerald-600'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-gray-100 dark:border-neutral-800">
                            <ThemeToggle />

                            <Link
                                href="/cart"
                                className="relative text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors"
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />

                        <Link href="/cart" className="text-gray-900 dark:text-white relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold h-3 w-3 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-900 dark:text-white focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-black">
                    <div className="flex flex-col p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-2 rounded text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-900'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

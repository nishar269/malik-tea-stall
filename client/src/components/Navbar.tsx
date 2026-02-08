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
        { href: '/products', label: 'Our Products' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav className="sticky top-0 w-full z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-neutral-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo - Simple Text */}
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide text-gray-900 dark:text-white hover:text-amber-600 transition-colors">
                        <Coffee size={24} className="text-amber-600" />
                        <span>Malik Tea Stall</span>
                    </Link>

                    {/* Desktop Menu - Clean Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'text-amber-600'
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
                                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute top-1 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />

                        <Link href="/cart" className="text-gray-900 dark:text-white relative">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
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

            {/* Mobile Dropdown - Clean & Simple */}
            {isOpen && (
                <div className="md:hidden border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-black">
                    <div className="flex flex-col p-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${pathname === link.href
                                        ? 'bg-amber-50 dark:bg-neutral-900 text-amber-700 dark:text-amber-500'
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

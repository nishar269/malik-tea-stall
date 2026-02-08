'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const pathname = usePathname();

    // Check if we are on the home page
    const isHome = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine the navbar style state
    // If not home, we always want the "scrolled" (solid/glass) look for readability.
    // If home, we only want it when actually scrolled.
    const useScrolledStyle = !isHome || scrolled;

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${useScrolledStyle
                    ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-2 border-b border-gray-100 dark:border-slate-800'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${useScrolledStyle ? 'py-1' : 'py-2'}`}>
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className={`p-2 rounded-xl transition-colors ${useScrolledStyle
                                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                                : 'bg-white/90 text-amber-700 shadow-lg backdrop-blur-sm'
                            }`}>
                            <Coffee size={24} strokeWidth={2.5} />
                        </div>
                        <span className={`text-2xl font-extrabold tracking-tight ${useScrolledStyle ? 'text-stone-800 dark:text-stone-100' : 'text-white drop-shadow-md'
                            }`}>
                            Malik Tea
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-semibold text-sm uppercase tracking-wide transition-all duration-300 relative group ${useScrolledStyle
                                        ? 'text-stone-600 hover:text-amber-600 dark:text-stone-300 dark:hover:text-amber-400'
                                        : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}></span>
                            </Link>
                        ))}

                        <div className="flex items-center gap-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                            <ThemeToggle />

                            {/* Cart Button */}
                            <Link
                                href="/cart"
                                className={`relative p-2.5 rounded-full transition-all duration-300 group ${useScrolledStyle
                                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40'
                                        : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                    }`}
                            >
                                <ShoppingCart size={20} strokeWidth={2.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white dark:ring-slate-900">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />

                        <Link
                            href="/cart"
                            className={`relative p-2 rounded-full transition-colors ${useScrolledStyle ? 'text-stone-800 dark:text-stone-200' : 'text-white'
                                }`}
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg focus:outline-none transition-colors ${useScrolledStyle ? 'text-stone-800 dark:text-stone-200' : 'text-white'
                                }`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-xl border-t border-gray-100 dark:border-slate-800 transform transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
                <div className="flex flex-col p-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${pathname === link.href
                                    ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'
                                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-slate-800 hover:text-amber-600'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/admin/login"
                        className="block px-4 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mt-4 border-t border-gray-100 dark:border-slate-800 pt-4"
                    >
                        🔐 Owner Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Our Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
];

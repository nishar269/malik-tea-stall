'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Coffee } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const pathname = usePathname();

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

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Our Products' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 backdrop-blur-md shadow-lg py-2 border-b border-gray-100'
                    : 'bg-transparent py-4'
                }`}
        >
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all ${scrolled ? 'py-1' : 'py-2'}`}>
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className={`p-2 rounded-xl transition-colors ${scrolled ? 'bg-green-100 text-green-700' : 'bg-white text-green-700 shadow-lg'}`}>
                            <Coffee size={24} strokeWidth={2.5} />
                        </div>
                        <span className={`text-2xl font-extrabold tracking-tight ${scrolled ? 'text-green-900' : 'text-white drop-shadow-md'}`}>
                            Malik Tea
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-semibold text-sm uppercase tracking-wide transition-all duration-300 relative group ${scrolled ? 'text-gray-600 hover:text-green-600' : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}></span>
                            </Link>
                        ))}

                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className={`relative p-3 rounded-full transition-all duration-300 group ${scrolled
                                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                                }`}
                        >
                            <ShoppingCart size={20} strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link
                            href="/cart"
                            className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-gray-800' : 'text-white'
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
                            className={`p-2 rounded-lg focus:outline-none transition-colors ${scrolled ? 'text-gray-800' : 'text-white'
                                }`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 transform transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
                <div className="flex flex-col p-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl font-bold text-lg transition-colors ${pathname === link.href
                                    ? 'bg-green-50 text-green-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/admin/login"
                        className="block px-4 py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 mt-4 border-t border-gray-100 pt-4"
                    >
                        🔐 Owner Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}

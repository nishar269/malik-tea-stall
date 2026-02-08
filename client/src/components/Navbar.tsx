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
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active State Logic
    const isTransparent = isHome && !scrolled;

    // Text Color Logic
    const textColor = isTransparent ? 'text-white' : 'text-stone-900 dark:text-white';
    const hoverColor = isTransparent ? 'hover:text-amber-300' : 'hover:text-amber-600 dark:hover:text-amber-400';
    const bgColor = isTransparent ? 'bg-transparent border-transparent' : 'bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl border-stone-200 dark:border-stone-800 shadow-lg';

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/products', label: 'Collection' },
        { href: '/about', label: 'Our Story' },
        { href: '/contact', label: 'Visit Us' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${bgColor} border-b`}>
            <div className={`max-w-7xl mx-auto px-6 lg:px-8 transition-all ${scrolled ? 'py-2' : 'py-5'}`}>
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link href="/" className={`flex items-center gap-2 font-serif text-2xl font-bold tracking-tight transition-colors ${textColor}`}>
                        <div className={`p-2 rounded-full transition-all ${isTransparent ? 'bg-white/20 text-white' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-400'}`}>
                            <Coffee size={20} strokeWidth={2.5} />
                        </div>
                        <span className="hidden sm:block">Malik Tea</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors ${textColor} ${hoverColor} relative group`}
                            >
                                {link.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}></span>
                            </Link>
                        ))}

                        <div className={`flex items-center gap-4 pl-8 border-l ${isTransparent ? 'border-white/20' : 'border-stone-200 dark:border-stone-700'}`}>
                            <ThemeToggle />

                            <Link
                                href="/cart"
                                className={`relative p-2 transition-colors ${textColor} ${hoverColor}`}
                            >
                                <ShoppingCart size={22} strokeWidth={2} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-md">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />

                        <Link href="/cart" className={`relative ${textColor}`}>
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`${textColor} focus:outline-none`}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown - Elegant Full Screen Overlay style */}
            <div className={`fixed inset-0 bg-stone-900/95 backdrop-blur-xl z-40 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex justify-center items-center`}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                >
                    <X size={40} />
                </button>

                <div className="flex flex-col items-center gap-8 text-center">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-serif font-bold text-white hover:text-amber-500 transition-colors tracking-wide"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/cart"
                        onClick={() => setIsOpen(false)}
                        className="mt-8 px-8 py-3 bg-amber-500 text-stone-900 font-bold rounded-full hover:bg-white transition-colors"
                    >
                        View Cart ({cartCount})
                    </Link>
                </div>
            </div>
        </nav>
    );
}

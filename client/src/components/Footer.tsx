import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-gray-300">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-600 mb-4">
                            Malik Tea Stall
                        </h3>
                        <p className="text-sm">
                            Authentic Indian Health Mix Powders - Freshly Made.
                        </p>
                        <div className="mt-4 flex items-center space-x-2">
                            <MapPin className="h-5 w-5 text-green-500" />
                            <Link
                                href="https://www.google.com/maps/search/?api=1&query=Kalikiri+Bus+Stand"
                                target="_blank"
                                className="text-sm hover:text-green-400 transition"
                            >
                                Kalikiri Cross Road, Bustand Road
                            </Link>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <Phone className="h-5 w-5 text-green-500" />
                            <span className="text-sm">+91 73372 74631</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            <Mail className="h-5 w-5 text-green-500" />
                            <span className="text-sm">contact@maliktea.com</span>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="hover:text-green-400 transition">Home</Link></li>
                            <li><Link href="/products" className="hover:text-green-400 transition">Products</Link></li>
                            <li><Link href="/about" className="hover:text-green-400 transition">About Us</Link></li>
                            <li><Link href="/admin/login" className="text-gray-500 hover:text-green-400 transition text-xs font-mono mt-4 inline-block">🔐 Owner Login</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Stay Healthy</h4>
                        <p className="text-sm mb-4">Subscribe to our updates for new healthy mixes.</p>
                        {/* Simple subscribe form could go here */}
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
                    &copy; {new Date().getFullYear()} Malik Tea Stall. All rights reserved. <br />
                    <span className="text-xs text-gray-700">API: {process.env.NEXT_PUBLIC_API_URL || 'Using Local'}</span>
                </div>
            </div>
        </footer>
    );
}

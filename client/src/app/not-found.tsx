import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-8xl mb-4">🍵</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
                <p className="text-gray-600 mb-8">
                    Sorry, the page you're looking for doesn't exist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/products"
                        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg transition"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </div>
    );
}

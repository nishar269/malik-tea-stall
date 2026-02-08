import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-green-600 to-emerald-800 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About Malik Tea Stall</h1>
                    <p className="text-xl opacity-90">Serving health & happiness since generations</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                        <div className="prose prose-lg text-gray-600 space-y-4">
                            <p>
                                Located in the heart of <strong>Kalikiri, Andhra Pradesh</strong>, Malik Tea Stall has been a trusted name for
                                premium quality health mixes and beverages. What started as a small tea stall near the bus stand
                                has grown into a beloved local brand known for its authentic, preservative-free products.
                            </p>
                            <p>
                                Our specialty lies in traditional health mixes like <strong>Badam Drink Mix</strong>, <strong>Pista Badam</strong>,
                                <strong> Ragi Malt</strong>, and <strong>Sonti Powder</strong> - all made with carefully selected ingredients
                                and age-old recipes passed down through generations.
                            </p>
                            <p>
                                Every product is prepared fresh with no preservatives, ensuring you get the purest taste and
                                maximum health benefits. We take pride in serving our community with products that nourish
                                both body and soul.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-green-50 rounded-2xl">
                            <div className="text-5xl mb-4">🌿</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">100% Natural</h3>
                            <p className="text-gray-600">No preservatives, no artificial colors. Just pure, natural ingredients.</p>
                        </div>
                        <div className="text-center p-6 bg-yellow-50 rounded-2xl">
                            <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Family Recipe</h3>
                            <p className="text-gray-600">Traditional recipes perfected over generations for authentic taste.</p>
                        </div>
                        <div className="text-center p-6 bg-blue-50 rounded-2xl">
                            <div className="text-5xl mb-4">❤️</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Made with Love</h3>
                            <p className="text-gray-600">Every product is prepared with care and attention to quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Proprietor Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-4xl">👤</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Afrid</h2>
                        <p className="text-green-600 font-medium mb-4">Proprietor, Malik Tea Stall</p>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            "Our mission is simple - to provide healthy, natural products that families can trust.
                            Every packet that leaves our shop carries our promise of quality and purity."
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-4">Visit Us Today</h2>
                    <p className="text-gray-400 mb-8">Taste the difference of truly natural products</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/products"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition"
                        >
                            Browse Products
                        </Link>
                        <Link
                            href="/contact"
                            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-3 px-8 rounded-full transition"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

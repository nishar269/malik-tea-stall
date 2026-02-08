'use client';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-green-700">Get in Touch</h2>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <MapPin className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Visit Our Shop</h3>
                                <p className="text-gray-600">
                                    <strong>Malik Tea Stall</strong><br />
                                    <span className="text-sm font-medium text-green-700">Proprietor: Afrid</span><br />
                                    Kalikiri Cross Road,<br />
                                    Near Bus Stand, Bustand Road,<br />
                                    Kalikiri, Andhra Pradesh 517234
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Phone className="h-6 w-6 text-green-600 flex-shrink-0" />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                                <p className="text-gray-600">
                                    <a href="tel:+917337274631" className="hover:text-green-600 transition">+91 73372 74631</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Mail className="h-6 w-6 text-green-600 flex-shrink-0" />
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                                <p className="text-gray-600">
                                    <a href="mailto:contact@maliktea.com" className="hover:text-green-600 transition">contact@maliktea.com</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Shop Timings</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-medium text-gray-700">Monday - Saturday</p>
                                <p className="text-gray-500">6:00 AM - 9:00 PM</p>
                            </div>
                            <div>
                                <p className="font-medium text-gray-700">Sunday</p>
                                <p className="text-gray-500">7:00 AM - 1:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="h-96 md:h-auto bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3883.310629237072!2d78.7738268!3d13.6922222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb2629b0a6e0e6b%3A0x8e83b8f2d5f0b5!2sKalikiri%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1707328000000!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Malik Tea Stall Location"
                        className="absolute inset-0"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

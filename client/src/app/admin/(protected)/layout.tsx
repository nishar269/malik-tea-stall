'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading Admin Panel...</div>;

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />  {/* Hidden on mobile by default in CSS, need to fix if mobile admin is priority */}

            <div className="flex-1 flex flex-col">
                {/* Mobile Header (Visible only on small screens) */}
                <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
                    <span className="font-bold">Malik Tea Admin</span>
                    {/* Simple menu toggle could go here */}
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

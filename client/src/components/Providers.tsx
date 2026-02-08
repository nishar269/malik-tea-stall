'use client';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <CartProvider>
                {children}
            </CartProvider>
        </ThemeProvider>
    );
}

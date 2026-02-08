import { Product } from '@/types';

export const products: Product[] = [
    {
        _id: '1',
        name: 'Badam Drink Mix',
        category: 'Health Mix',
        description: 'Natural Badam Powder with no preservatives. Add to Milk Hot or Cold for instant energy.',
        imageUrl: '/images/products/badam-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 120 },
            { weight: '250g', price: 280 },
            { weight: '500g', price: 520 },
        ],
    },
    {
        _id: '2',
        name: 'Pista Badam Drink Mix',
        category: 'Health Mix',
        description: 'Natural Pistachio Badam blend. No Preservatives. Add to Milk Hot or Cold.',
        imageUrl: '/images/products/pista-badam-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 150 },
            { weight: '250g', price: 350 },
            { weight: '500g', price: 650 },
        ],
    },
    {
        _id: '3',
        name: 'Ragi Malt',
        category: 'Health Mix',
        description: 'Natural Ragi Health Mix. Rich with Calcium. Delicious & Nutritious.',
        imageUrl: '/images/products/ragi-malt.png',
        isOutOfStock: false,
        variants: [
            { weight: '250g', price: 180 },
            { weight: '500g', price: 340 },
            { weight: '1kg', price: 650 },
        ],
    },
    {
        _id: '4',
        name: 'Sonti Powder (Dry Ginger)',
        category: 'Health Mix',
        description: 'Natural Dry Ginger Powder. No Preservatives. Excellent for cold relief and digestion.',
        imageUrl: '/images/products/sonti-powder.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 100 },
            { weight: '250g', price: 230 },
        ],
    },
    {
        _id: '5',
        name: 'Lemon Tea Mix',
        category: 'Tea Powder',
        description: 'Refreshing Lemon Tea powder. Perfect blend of tea and lemon for a tangy, energizing drink.',
        imageUrl: '/images/products/lemon-tea-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 80 },
            { weight: '250g', price: 180 },
            { weight: '500g', price: 340 },
        ],
    },
    {
        _id: '6',
        name: 'Ginger Tea',
        category: 'Tea Powder',
        description: 'Traditional Ginger Tea powder. Warming and soothing, perfect for monsoons and winters.',
        imageUrl: '/images/products/ginger-tea.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 90 },
            { weight: '250g', price: 200 },
            { weight: '500g', price: 380 },
        ],
    },
    {
        _id: '7',
        name: 'Green Tea Mix',
        category: 'Tea Powder',
        description: 'Premium Green Tea blend. Rich in antioxidants for a healthy lifestyle.',
        imageUrl: '/images/products/green-tea-mix.png',
        isOutOfStock: false,
        variants: [
            { weight: '100g', price: 120 },
            { weight: '250g', price: 280 },
            { weight: '500g', price: 520 },
        ],
    },
];

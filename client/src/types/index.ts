export interface ProductVariant {
    weight: string;
    price: number;
    stock?: number;
}

export interface Product {
    _id: string;
    name: string;
    category: string;
    description: string;
    variants: ProductVariant[];
    imageUrl: string;
    isOutOfStock: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrderItem {
    product: Product;
    variant: string;
    quantity: number;
    priceAtPurchase: number;
}

export interface CartItem {
    product: Product;
    variant: string;
    quantity: number;
    price: number;
}

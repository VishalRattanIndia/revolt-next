import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    product: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
    qty: number;
    color?: string;
    model?: string;
    bookingAmount?: number;
}

interface ShippingAddress {
    fullName?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    mobile?: string;
}

interface CartState {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    saveShippingAddress: (data: ShippingAddress) => void;
    savePaymentMethod: (data: string) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            shippingAddress: {},
            paymentMethod: 'PayPal',
            addToCart: (item) => {
                const items = get().cartItems;
                const existItem = items.find((x) => x.product === item.product);
                if (existItem) {
                    set({
                        cartItems: items.map((x) =>
                            x.product === existItem.product ? item : x
                        ),
                    });
                } else {
                    set({ cartItems: [...items, item] });
                }
            },
            removeFromCart: (id) => {
                set({
                    cartItems: get().cartItems.filter((x) => x.product !== id),
                });
            },
            saveShippingAddress: (data) => {
                set({ shippingAddress: data });
            },
            savePaymentMethod: (data) => {
                set({ paymentMethod: data });
            },
            clearCart: () => {
                set({ cartItems: [] });
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

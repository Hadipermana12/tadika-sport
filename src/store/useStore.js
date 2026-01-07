import { create } from 'zustand';
import { products } from '../utils/mockData';

const useStore = create((set) => ({
    isAdmin: false,
    login: () => set({ isAdmin: true }),
    logout: () => set({ isAdmin: false }),

    products: products,
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    deleteProduct: (id) => set((state) => ({ products: state.products.filter(p => p.id !== id) })),

    cart: [],
    addToCart: (product) => set((state) => {
        // Check if item exists with same ID, Size AND Variant
        const existing = state.cart.find((item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.variant === product.variant
        );

        if (existing) {
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id && item.size === product.size && item.variant === product.variant
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
    removeFromCart: (productId, size, variant) => set((state) => ({
        cart: state.cart.filter((item) => !(item.id === productId && item.size === size && item.variant === variant)),
    })),
    clearCart: () => set({ cart: [] }),
    updateQuantity: (productId, size, variant, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
            item.id === productId && item.size === size && item.variant === variant
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
        ),
    })),
}));

export default useStore;

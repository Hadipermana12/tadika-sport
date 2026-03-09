import { create } from 'zustand';
import { products } from '../utils/mockData';
import toast from 'react-hot-toast';

const useStore = create((set, get) => ({
    isAdmin: false,
    login: () => set({ isAdmin: true }),
    logout: () => set({ isAdmin: false }),

    products: [],
    fetchProducts: async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products');
            const data = await res.json();
            set({ products: data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    },
    
    addProduct: async (product) => {
        try {
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('category', product.category);
            formData.append('price', product.price);
            formData.append('stock_home', product.stock_home || 0);
            formData.append('stock_away', product.stock_away || 0);
            if (product.homeImage) formData.append('homeImage', product.homeImage);
            if (product.awayImage) formData.append('awayImage', product.awayImage);

            await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formData
            });
            await get().fetchProducts();
            toast.success('Product added successfully!');
        } catch (error) {
            console.error("Failed to add product:", error);
            toast.error('Failed to add product');
        }
    },

    updateProduct: async (id, updatedData) => {
        try {
             const formData = new FormData();
             formData.append('name', updatedData.name);
             formData.append('category', updatedData.category);
             formData.append('price', updatedData.price);
             formData.append('stock_home', updatedData.stock_home || 0);
             formData.append('stock_away', updatedData.stock_away || 0);
             if (updatedData.homeImage) formData.append('homeImage', updatedData.homeImage);
             if (updatedData.awayImage) formData.append('awayImage', updatedData.awayImage);
             if (updatedData.existingImage) formData.append('existingImage', updatedData.existingImage);
             if (updatedData.existingAwayImage) formData.append('existingAwayImage', updatedData.existingAwayImage);

             await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                body: formData
            });
            await get().fetchProducts();
            toast.success('Product updated successfully!');
        } catch (error) {
            console.error("Failed to update product:", error);
            toast.error('Failed to update product');
        }
    },

    deleteProduct: async (id) => {
        try {
            await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
            set((state) => ({ products: state.products.filter(p => p.id !== id) }));
            toast.success('Product deleted successfully');
        } catch (error) {
             console.error("Failed to delete product:", error);
             toast.error('Failed to delete product');
        }
    },

    cart: [],
    addToCart: (product) => set((state) => {
        // Check if item exists with same ID, Size AND Variant
        const existing = state.cart.find((item) =>
            item.id === product.id &&
            item.size === product.size &&
            item.variant === product.variant
        );

        if (existing) {
            toast.success(`Increased ${product.name} quantity in cart!`, { duration: 2000, position: 'bottom-center' });
            return {
                cart: state.cart.map((item) =>
                    item.id === product.id && item.size === product.size && item.variant === product.variant
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };
        }
        toast.success(`Added ${product.name} to cart!`, { duration: 2000, position: 'bottom-center' });
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

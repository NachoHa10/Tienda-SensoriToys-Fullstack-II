import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import type { Product, CartItem } from '../models/Product';

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, cantidad: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCart, { ...product, cantidad: 1 }];
        });
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, cantidad: number) => {
        if (cantidad < 1) return;
        setCart(prevCart =>
            prevCart.map(item => (item.id === productId ? { ...item, cantidad } : item))
        );
    };

    const clearCart = () => setCart([]);

    const total = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
    return context;
};
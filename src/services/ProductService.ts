import type { Product } from '../models/Product';

const INITIAL_PRODUCTS: Product[] = [
    { id: 1, name: 'Mordedor Sensorial Silicona', price: 6990, stock: 10, category: 'Táctil', age: '0-3', img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop', status: 'Activo' },
    { id: 2, name: 'Lámpara de Burbujas Calmante', price: 24990, stock: 3, category: 'Visual', age: '3-6', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&h=500&fit=crop', status: 'Activo' },
    { id: 3, name: 'Squishy Anti-Estrés Conejo Rosa', price: 4990, stock: 15, category: 'Táctil', age: '3-6', img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop', status: 'Activo' },
    { id: 4, name: 'Tubo de Burbujas LED', price: 30000, stock: 8, category: 'Visual', age: '6+', img: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=500&h=500&fit=crop', status: 'Activo' }
];

export const ProductService = {
    getProducts: (): Product[] => {
        const stored = localStorage.getItem('db_products');
        if (!stored) {
            localStorage.setItem('db_products', JSON.stringify(INITIAL_PRODUCTS));
            return INITIAL_PRODUCTS;
        }
        return JSON.parse(stored);
    },

    saveProduct: (product: Omit<Product, 'id'> & { id?: number }): Product[] => {
        const products = ProductService.getProducts();
        if (product.id) {
            const index = products.findIndex(p => p.id === product.id);
            if (index !== -1) {
                products[index] = { ...products[index], ...product };
            }
        } else {
            const newProduct: Product = {
                ...product,
                id: Date.now(),
                status: 'Activo'
            };
            products.push(newProduct);
        }
        localStorage.setItem('db_products', JSON.stringify(products));
        return products;
    },

    deleteProduct: (id: number): Product[] => {
        const products = ProductService.getProducts().filter(p => p.id !== id);
        localStorage.setItem('db_products', JSON.stringify(products));
        return products;
    }
};
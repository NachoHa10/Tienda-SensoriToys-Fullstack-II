import { useState, useEffect } from 'react';
import type { Product } from '../models/Product';
import { ProductService } from '../services/ProductService';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        setProducts(ProductService.getProducts());
    }, []);

    const addOrUpdateProduct = (product: Omit<Product, 'id'> & { id?: number }) => {
        const updated = ProductService.saveProduct(product);
        setProducts(updated);
    };

    const removeProduct = (id: number) => {
        const updated = ProductService.deleteProduct(id);
        setProducts(updated);
    };

    return { products, addOrUpdateProduct, removeProduct };
}; 
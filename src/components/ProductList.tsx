import type { Product } from '../models/Product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
    products: Product[];
}

export const ProductList = ({ products }: ProductListProps) => {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {products.map(product => (
                <div className="col" key={product.id}>
                    <ProductCard product={product} />
                </div>
            ))}
        </div>
    );
};
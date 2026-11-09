import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import type { Product } from '../models/Product';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    // Ajusta esto dependiendo de cómo esté estructurado tu CartContext
    const { addToCart } = useCart() as any; 

    return (
        <div className="card h-100 shadow-sm border-0 rounded-4 overflow-hidden">
            <div className="position-relative">
                <img 
                    src={product.imagenUrl} 
                    className="card-img-top" 
                    alt={product.nombre} 
                    style={{ height: '220px', objectFit: 'cover' }}
                />
                <span 
                    className={`position-absolute top-0 start-0 m-2 badge rounded-pill ${product.stock > 5 ? 'bg-success' : 'bg-warning text-dark'}`}
                >
                    {product.stock > 5 ? `Disponible (${product.stock})` : `Bajo Stock (${product.stock})`}
                </span>
            </div>
            
            <div className="card-body d-flex flex-column p-3">
                <h6 className="card-title fw-bold text-center mb-1" style={{ color: '#16498C' }}>
                    {product.nombre}
                </h6>
                <p className="text-muted small text-center mb-2">Categoría: {product.categoria}</p>
                <h5 className="fw-bold text-center mb-3" style={{ color: '#F2845C' }}>
                    ${product.precio.toLocaleString('es-CL')}
                </h5>

                <div className="mt-auto">
                    {/* APLICACIÓN DEL GRID SYSTEM DE BOOTSTRAP PARA RESPONSIVIDAD */}
                    <div className="row g-2">
                        {/* col-12: Ocupa 12 columnas en móvil. col-xl-6: Ocupa 6 columnas en pantallas extra grandes */}
                        <div className="col-12 col-xl-6">
                            <Link 
                                to={`/producto/${product.id}`} 
                                className="btn w-100 rounded-3 fw-semibold"
                                style={{ border: '2px solid #16498C', color: '#16498C' }}
                            >
                                Detalles
                            </Link>
                        </div>
                        <div className="col-12 col-xl-6">
                            <button 
                                className="btn w-100 rounded-3 text-white fw-semibold d-flex align-items-center justify-content-center gap-2" 
                                style={{ backgroundColor: '#F2845C' }}
                                onClick={() => addToCart(product)}
                            >
                                <i className="bi bi-cart-plus"></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 
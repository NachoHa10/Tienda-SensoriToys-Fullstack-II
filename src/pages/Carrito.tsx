import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Carrito = () => {
    // Asegúrate de extraer las funciones correctas de tu contexto
    const { cart, updateQuantity, clearCart } = useCart() as any; 

    const total = (cart || []).reduce((acc: number, item: any) => acc + (item.precio * item.cantidad), 0);

    return (
        <div className="container-fluid px-3 px-md-4 py-5" style={{ minHeight: '100vh', backgroundColor: '#f4f7fc' }}>
            <h2 className="fw-bold text-center mb-4" style={{ color: '#16498C', fontFamily: 'Fredoka, sans-serif' }}>
                Tu Carrito de Compras
            </h2>

            <div className="row justify-content-center g-4">
                <div className="col-12 col-lg-8">
                    {cart.length === 0 ? (
                        <div className="text-center py-5">
                            <h5 className="text-muted">Tu carrito está vacío.</h5>
                            <Link to="/" className="btn mt-3 text-white" style={{ backgroundColor: '#5F94D9' }}>Volver al Catálogo</Link>
                        </div>
                    ) : (
                        <>
                            {/* CONTENEDOR DE PRODUCTOS CON GRID APLICADO */}
                            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4">
                                {cart.map((item: any) => (
                                    <div key={item.id} className="row g-3 align-items-center py-3 border-bottom">
                                        
                                        {/* 1. Imagen y Textos (Ocupa 12 columnas en móvil, 5 en PC) */}
                                        <div className="col-12 col-md-5 d-flex align-items-center gap-3">
                                            <img 
                                                src={item.imagenUrl} 
                                                alt={item.nombre} 
                                                className="rounded-3 shadow-sm" 
                                                style={{ width: '80px', height: '80px', objectFit: 'cover' }} 
                                            />
                                            <div>
                                                <h6 className="fw-bold mb-1" style={{ color: '#16498C' }}>{item.nombre}</h6>
                                                <small className="text-muted">${item.precio.toLocaleString('es-CL')} c/u</small>
                                            </div>
                                        </div>

                                        {/* 2. Controles de cantidad (Ocupa 6 columnas en móvil, 4 en PC) */}
                                        <div className="col-6 col-md-4 d-flex justify-content-md-center">
                                            <div className="input-group input-group-sm" style={{ maxWidth: '120px' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.cantidad - 1)}>-</button>
                                                <input type="text" className="form-control text-center bg-white" value={item.cantidad} readOnly />
                                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.cantidad + 1)}>+</button>
                                            </div>
                                        </div>

                                        {/* 3. Precio Total (Ocupa 6 columnas en móvil, 3 en PC) */}
                                        <div className="col-6 col-md-3 text-end">
                                            <span className="fw-bold" style={{ color: '#5F94D9', fontSize: '1.1rem' }}>
                                                ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                                            </span>
                                        </div>
                                        
                                    </div>
                                ))}
                            </div>

                            {/* RESUMEN DE ORDEN EXACTO A TU IMAGEN */}
                            <div className="card border-0 shadow-sm rounded-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
                                <h4 className="fw-bold mb-4" style={{ color: '#16498C' }}>Resumen de Orden</h4>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fs-5">Total:</span>
                                    <span className="fw-bold fs-5" style={{ color: '#5F94D9' }}>${total.toLocaleString('es-CL')}</span>
                                </div>
                                
                                <button className="btn w-100 text-white rounded-3 py-2 mb-3 fw-semibold" style={{ backgroundColor: '#198754' }}>
                                    Proceder al Checkout
                                </button>
                                <button 
                                    className="btn w-100 rounded-3 py-2 fw-semibold" 
                                    style={{ color: '#dc3545', border: '1px solid #dc3545', backgroundColor: 'transparent' }}
                                    onClick={clearCart}
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}; 
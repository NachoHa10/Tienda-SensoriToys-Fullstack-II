import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import type { Product } from '../models/Product';

const initialProducts: Product[] = [
    { id: 1, nombre: "Mordedor Sensorial Silicona", descripcion: "Estimulación táctil", precio: 6990, stock: 10, categoria: "Táctil", edad: "0-3 años", imagenUrl: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&h=500&fit=crop" },
    { id: 2, nombre: "Lámpara de Burbujas Calmante", descripcion: "Estimulación visual", precio: 24990, stock: 3, categoria: "Visual", edad: "3-6 años", imagenUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&h=500&fit=crop" },
    { id: 3, nombre: "Squishy Anti-Estrés Conejo Rosa", descripcion: "Juguete blando", precio: 4990, stock: 15, categoria: "Táctil", edad: "3-6 años", imagenUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&h=500&fit=crop" },
    { id: 4, nombre: "Tubo de Burbujas LED", descripcion: "Luces cambiantes", precio: 30000, stock: 8, categoria: "Visual", edad: "6+ años", imagenUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?w=500&h=500&fit=crop" }
];

export const Home = () => {
    const [categoryFilter, setCategoryFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState('');

    const filteredProducts = initialProducts.filter(p => {
        const matchesCategory = categoryFilter ? p.categoria === categoryFilter : true;
        const matchesAge = ageFilter ? p.edad === ageFilter : true;
        return matchesCategory && matchesAge;
    });

    const clearFilters = () => {
        setCategoryFilter('');
        setAgeFilter('');
    };

    return (
        <div className="pb-5" style={{ backgroundColor: '#f4f7fc', minHeight: '100vh', width: '100%' }}>
            <div className="container-fluid px-4 px-lg-5 pt-4">
                
                <div 
                    className="position-relative rounded-4 overflow-hidden mb-4 shadow-sm d-flex align-items-center justify-content-center"
                    style={{ 
                        height: '320px', 
                        backgroundImage: `url('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&h=500&fit=crop')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}></div>
                    
                    <div className="position-relative text-center text-white p-4 rounded-4 shadow" style={{ backgroundColor: 'rgba(22, 73, 140, 0.85)', backdropFilter: 'blur(5px)', maxWidth: '600px' }}>
                        <h2 className="fw-bold mb-1 display-6" style={{ fontFamily: 'Fredoka, sans-serif' }}>Envío Gratis sobre $30.000</h2>
                        <p className="mb-0 fs-5 text-light">Despacho a todo Chile.</p>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 className="fw-bold mb-1 fs-2" style={{ color: '#16498C', fontFamily: 'Fredoka, sans-serif' }}>
                        Juguetes Sensoriales para el Desarrollo y Calma
                    </h3>
                    <p className="text-muted fs-6">Diseñados para la estimulación táctil, auditiva y autorregulación emocional.</p>
                </div>

                <div className="row g-4">
                    <div className="col-lg-3 col-xl-2">
                        <div className="card border-0 shadow-sm p-3 rounded-4 bg-white sticky-top" style={{ top: '20px' }}>
                            <h5 className="fw-bold mb-3 d-flex align-items-center" style={{ color: '#16498C' }}>
                                <i className="bi bi-funnel me-2"></i> Filtros
                            </h5>
                            
                            <div className="mb-3">
                                <label className="form-label small fw-semibold text-muted">Categoría</label>
                                <select className="form-select rounded-3" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                                    <option value="">Todas las categorías</option>
                                    <option value="Táctil">Táctil</option>
                                    <option value="Visual">Visual</option>
                                    <option value="Motricidad">Motricidad</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="form-label small fw-semibold text-muted">Edad Recomendada</label>
                                <select className="form-select rounded-3" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                                    <option value="">Todas las edades</option>
                                    <option value="0-3 años">0-3 años</option>
                                    <option value="3-6 años">3-6 años</option>
                                    <option value="6+ años">6+ años</option>
                                </select>
                            </div>

                            <button className="btn text-white w-100 rounded-3 py-2 fw-semibold" style={{ backgroundColor: '#5F94D9' }} onClick={clearFilters}>
                                Limpiar Filtros
                            </button>
                        </div>
                    </div>

                    <div className="col-lg-9 col-xl-10">
                        <div className="row g-3">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                                    <ProductCard product={product} />
                                </div>
                            ))}

                            {filteredProducts.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <p className="text-muted">No se encontraron productos con los filtros seleccionados.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
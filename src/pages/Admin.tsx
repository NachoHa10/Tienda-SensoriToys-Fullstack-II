import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../models/Product';

interface Order {
    id: string;
    cliente: string;
    detalle: string;
    total: number;
    estado: string;
}

interface User {
    id: number;
    usuario: string;
    rut: string;
    correo: string;
    rol: string;
    activo: boolean;
}

const initialProducts: (Product & { activo?: boolean })[] = [
    { id: 1, nombre: "Mordedor Sensorial Silicona", descripcion: "Estimulación táctil", precio: 6990, stock: 10, categoria: "Táctil", activo: true },
    { id: 2, nombre: "Lámpara de Burbujas Calmante", descripcion: "Estimulación visual", precio: 24990, stock: 3, categoria: "Visual", activo: true }
];

const initialUsers: User[] = [
    { id: 1, usuario: "Administrador Principal", rut: "11.111.111-1", correo: "admin@sensoritoys.cl", rol: "ADMIN", activo: true },
    { id: 2, usuario: "Juan Pérez", rut: "12.345.678-9", correo: "juan@correo.cl", rol: "CLIENTE", activo: true }
];

export const Admin = () => {
    const [isLoggedIn] = useState<boolean>(() => localStorage.getItem('isAdminLoggedIn') === 'true');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'productos' | 'pedidos' | 'usuarios'>('dashboard');
    
    // Estados principales
    const [products, setProducts] = useState<(Product & { activo?: boolean })[]>(initialProducts);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [orders, setOrders] = useState<Order[]>([]);

    // Estados para Modal de Producto
    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<(Product & { activo?: boolean }) | null>(null);
    const [formData, setFormData] = useState({ nombre: '', precio: 0, stock: 0, categoria: 'Táctil', descripcion: '' });

    // Estado para Modal Personalizado de Confirmación de Eliminación
    const [productToDelete, setProductToDelete] = useState<number | null>(null);

    // Estado para Modal de Edición de Usuario
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Cargar historial de pedidos desde localStorage al montar
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('db_orders') || '[]');
        setOrders(storedOrders);
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="container mt-5 text-center">
                <div className="card border-0 shadow-sm p-5 rounded-4 mx-auto" style={{ maxWidth: '500px' }}>
                    <i className="bi bi-shield-lock display-1 text-danger mb-3"></i>
                    <h3 className="fw-bold text-danger">Acceso Restringido</h3>
                    <p className="text-muted">Debes iniciar sesión con una cuenta de administrador para acceder a este panel.</p>
                    <Link to="/login" className="btn text-white rounded-3 mt-3" style={{ backgroundColor: '#16498C' }}>
                        Ir a Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    // Handlers para Productos
    const handleOpenCreateModal = () => {
        setEditingProduct(null);
        setFormData({ nombre: '', precio: 0, stock: 0, categoria: 'Táctil', descripcion: '' });
        setShowProductModal(true);
    };

    const handleOpenEditModal = (product: Product & { activo?: boolean }) => {
        setEditingProduct(product);
        setFormData({
            nombre: product.nombre,
            precio: product.precio,
            stock: product.stock,
            categoria: product.categoria,
            descripcion: product.descripcion || ''
        });
        setShowProductModal(true);
    };

    const handleSaveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
        } else {
            const newProduct = { id: Date.now(), ...formData, activo: true };
            setProducts([...products, newProduct]);
        }
        setShowProductModal(false);
    };

    const handleToggleProductStatus = (id: number) => {
        setProducts(products.map(p => p.id === id ? { ...p, activo: p.activo === undefined ? false : !p.activo } : p));
        if (editingProduct && editingProduct.id === id) {
            setEditingProduct(prev => prev ? { ...prev, activo: !prev.activo } : null);
        }
    };

    // Confirmar eliminación mediante Modal Personalizado
    const confirmDeleteProduct = () => {
        if (productToDelete !== null) {
            setProducts(products.filter(p => p.id !== productToDelete));
            setProductToDelete(null);
            setShowProductModal(false);
        }
    };

    // Handlers para Usuarios
    const handleSaveUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            setEditingUser(null);
        }
    };

    return (
        <div className="container-fluid px-4 py-4" style={{ backgroundColor: '#f4f7fc', minHeight: '100vh' }}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div className="rounded-circle p-3 text-white" style={{ backgroundColor: '#16498C' }}>
                        <i className="bi bi-speedometer2 fs-3"></i>
                    </div>
                    <div>
                        <h3 className="fw-bold mb-0" style={{ color: '#16498C' }}>Dashboard de Ventas</h3>
                        <small className="text-muted">Análisis métrico e indicadores clave de rendimiento (KPIs)</small>
                    </div>
                </div>
                <Link to="/" className="btn btn-sm text-white rounded-3 px-3 py-2" style={{ backgroundColor: '#5F94D9' }}>
                    <i className="bi bi-shop me-1"></i> Volver a la Tienda
                </Link>
            </div>

            {/* Navegación Pestañas */}
            <div className="d-flex gap-2 mb-4 flex-wrap">
                {[
                    { id: 'dashboard', label: 'Dashboard & Gráficos', icon: 'bi-graph-up' },
                    { id: 'productos', label: 'Gestión de Productos', icon: 'bi-box-seam' },
                    { id: 'pedidos', label: 'Historial de Pedidos', icon: 'bi-receipt' },
                    { id: 'usuarios', label: 'Gestión de Usuarios', icon: 'bi-people' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        className={`btn rounded-pill px-4 ${activeTab === tab.id ? 'text-white' : 'btn-light'}`}
                        style={{ backgroundColor: activeTab === tab.id ? '#16498C' : undefined }}
                        onClick={() => setActiveTab(tab.id as any)}
                    >
                        <i className={`bi ${tab.icon} me-2`}></i>{tab.label}
                    </button>
                ))}
            </div>

            {/* TAB 1: DASHBOARD */}
            {activeTab === 'dashboard' && (
                <div className="row g-4">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
                            <span className="text-muted small fw-semibold">Ventas Totales</span>
                            <h3 className="fw-bold mt-2 text-success">
                                ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('es-CL')}
                            </h3>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
                            <span className="text-muted small fw-semibold">Unidades Vendidas</span>
                            <h3 className="fw-bold mt-2" style={{ color: '#5F94D9' }}>{orders.length} pedidos</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: GESTIÓN DE PRODUCTOS */}
            {activeTab === 'productos' && (
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold text-dark mb-0">Inventario Registrado</h5>
                        <button className="btn text-white rounded-3" style={{ backgroundColor: '#5F94D9' }} onClick={handleOpenCreateModal}>
                            + Nuevo Producto
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td className="fw-bold">{p.nombre}</td>
                                        <td>{p.categoria}</td>
                                        <td>${p.precio.toLocaleString('es-CL')}</td>
                                        <td><span className="badge bg-success">{p.stock} unidades</span></td>
                                        <td>
                                            <span className={`badge ${p.activo !== false ? 'bg-primary' : 'bg-secondary'}`}>
                                                {p.activo !== false ? 'Activo' : 'Desactivado'}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenEditModal(p)}>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 3: HISTORIAL DE PEDIDOS */}
            {activeTab === 'pedidos' && (
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                    <h5 className="fw-bold text-dark mb-3">Historial de Ventas Registradas</h5>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>ID Pedido</th>
                                    <th>Cliente</th>
                                    <th>Detalle</th>
                                    <th>Total</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(o => (
                                    <tr key={o.id}>
                                        <td className="fw-bold">#{o.id}</td>
                                        <td>{o.cliente}</td>
                                        <td>{o.detalle}</td>
                                        <td className="fw-bold" style={{ color: '#5F94D9' }}>${o.total.toLocaleString('es-CL')}</td>
                                        <td><span className="badge bg-success">{o.estado}</span></td>
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-muted">No se han registrado pedidos aún.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* TAB 4: GESTIÓN DE USUARIOS */}
            {activeTab === 'usuarios' && (
                <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
                    <h5 className="fw-bold text-dark mb-3">Usuarios Registrados</h5>
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>RUT</th>
                                    <th>Correo</th>
                                    <th>Rol</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id}>
                                        <td className="fw-bold">{u.usuario}</td>
                                        <td>{u.rut}</td>
                                        <td>{u.correo}</td>
                                        <td><span className="badge bg-danger">{u.rol}</span></td>
                                        <td>
                                            <span className={`badge ${u.activo ? 'bg-success' : 'bg-secondary'}`}>
                                                {u.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => setEditingUser(u)}
                                            >
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL CREAR / EDITAR PRODUCTO */}
            {showProductModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow p-3">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="fw-bold modal-title" style={{ color: '#16498C' }}>
                                    {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowProductModal(false)}></button>
                            </div>
                            <form onSubmit={handleSaveProduct}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-semibold">Nombre del Producto</label>
                                        <input 
                                            type="text" 
                                            className="form-control rounded-3" 
                                            value={formData.nombre} 
                                            onChange={e => setFormData({ ...formData, nombre: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="row g-2 mb-3">
                                        <div className="col-6">
                                            <label className="form-label text-muted small fw-semibold">Precio ($)</label>
                                            <input 
                                                type="number" 
                                                className="form-control rounded-3" 
                                                value={formData.precio} 
                                                onChange={e => setFormData({ ...formData, precio: Number(e.target.value) })} 
                                                required 
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label text-muted small fw-semibold">Stock Inicial</label>
                                            <input 
                                                type="number" 
                                                className="form-control rounded-3" 
                                                value={formData.stock} 
                                                onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    {/* Opciones Avanzadas en Edición */}
                                    {editingProduct && (
                                        <div className="d-flex justify-content-between align-items-center border-top pt-3 mt-3">
                                            <button 
                                                type="button" 
                                                className={`btn btn-sm ${editingProduct.activo !== false ? 'btn-outline-secondary' : 'btn-outline-success'}`}
                                                onClick={() => handleToggleProductStatus(editingProduct.id)}
                                            >
                                                {editingProduct.activo !== false ? 'Desactivar Producto' : 'Activar Producto'}
                                            </button>

                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => setProductToDelete(editingProduct.id)}
                                            >
                                                Eliminar Producto
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer border-0 pt-0">
                                    <button type="submit" className="btn text-white w-100 rounded-3 py-2" style={{ backgroundColor: '#F2845C' }}>
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL PERSONALIZADO DE CONFIRMACIÓN DE ELIMINACIÓN */}
            {productToDelete !== null && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1060 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow p-3 text-center">
                            <div className="modal-body">
                                <i className="bi bi-exclamation-triangle-fill text-warning display-3 mb-3"></i>
                                <h5 className="fw-bold mb-2" style={{ color: '#16498C' }}>¿Confirmar Eliminación?</h5>
                                <p className="text-muted small mb-4">
                                    ¿Estás seguro de que deseas eliminar este producto permanentemente del inventario? Esta acción no se puede deshacer.
                                </p>
                                <div className="d-flex gap-2 justify-content-center">
                                    <button 
                                        type="button" 
                                        className="btn btn-light rounded-3 px-4"
                                        onClick={() => setProductToDelete(null)}
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-danger rounded-3 px-4"
                                        onClick={confirmDeleteProduct}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            
            {/* MODAL EDITAR USUARIO (ACTIVAR / DESACTIVAR) */}
            {editingUser && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0 rounded-4 shadow p-3">
                            <div className="modal-header border-0 pb-0">
                                <h5 className="fw-bold modal-title" style={{ color: '#16498C' }}>Editar Usuario</h5>
                                <button type="button" className="btn-close" onClick={() => setEditingUser(null)}></button>
                            </div>
                            <form onSubmit={handleSaveUser}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-semibold">Nombre de Usuario</label>
                                        <input 
                                            type="text" 
                                            className="form-control rounded-3" 
                                            value={editingUser.usuario} 
                                            onChange={e => setEditingUser({ ...editingUser, usuario: e.target.value })} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label text-muted small fw-semibold">Correo Electrónico</label>
                                        <input 
                                            type="email" 
                                            className="form-control rounded-3" 
                                            value={editingUser.correo} 
                                            onChange={e => setEditingUser({ ...editingUser, correo: e.target.value })} 
                                            required 
                                        />
                                    </div>

                                    {/* Control condicional: no permitir desactivar administradores */}
                                    {editingUser.rol === 'ADMIN' ? (
                                        <div className="alert alert-info border-0 rounded-3 text-muted small mt-4 mb-2" role="alert">
                                            <i className="bi bi-shield-check me-2 text-primary"></i>
                                            Las cuentas con rol de <strong>Administrador</strong> se mantienen siempre activas por seguridad del sistema.
                                        </div>
                                    ) : (
                                        <div className="form-check form-switch mt-4 mb-2">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="userStatusSwitch"
                                                checked={editingUser.activo} 
                                                onChange={e => setEditingUser({ ...editingUser, activo: e.target.checked })} 
                                            />
                                            <label className="form-check-label fw-bold" htmlFor="userStatusSwitch" style={{ color: '#16498C' }}>
                                                {editingUser.activo ? 'Cuenta de Usuario Activa' : 'Cuenta de Usuario Inactiva (Desactivada)'}
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer border-0 pt-0">
                                    <button type="submit" className="btn text-white w-100 rounded-3 py-2" style={{ backgroundColor: '#F2845C' }}>
                                        Guardar Cambios
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
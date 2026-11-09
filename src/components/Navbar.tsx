import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
    const { cart } = useCart() as any;
    const navigate = useNavigate();
    const location = useLocation();

    // 1. NUEVO ESTADO PARA EL MENÚ HAMBURGUESA
    const [isNavExpanded, setIsNavExpanded] = useState(false);

    const [isAdmin, setIsAdmin] = useState<boolean>(() => localStorage.getItem('isAdminLoggedIn') === 'true');
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(() => {
        return localStorage.getItem('isAdminLoggedIn') === 'true' || localStorage.getItem('isUserLoggedIn') === 'true';
    });

    useEffect(() => {
        const adminState = localStorage.getItem('isAdminLoggedIn') === 'true';
        const userState = localStorage.getItem('isUserLoggedIn') === 'true';
        setIsAdmin(adminState);
        setIsUserLoggedIn(adminState || userState);
        
        // 2. CERRAR EL MENÚ MÓVIL AUTOMÁTICAMENTE AL CAMBIAR DE RUTA
        setIsNavExpanded(false);
    }, [location]);

    const totalItems = (cart || []).reduce((acc: number, item: any) => acc + item.cantidad, 0);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('isUserLoggedIn');
        setIsAdmin(false);
        setIsUserLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg py-3 px-4 shadow-sm" style={{ backgroundColor: '#16498C', width: '100%' }}>
            <div className="container-fluid px-0">
                
                <Link className="navbar-brand text-white fw-bold fs-3 d-flex align-items-center me-4" to="/" style={{ fontFamily: 'Fredoka, sans-serif' }}>
                    <i className="bi bi-balloon-fill me-2" style={{ color: '#F2EA79' }}></i>
                    SensoriToys
                </Link>

                {/* 3. CONTROLAR EL CLIC DEL BOTÓN CON REACT */}
                <button 
                    className="navbar-toggler text-white border-0" 
                    type="button" 
                    onClick={() => setIsNavExpanded(!isNavExpanded)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* 4. AGREGAR LA CLASE 'show' DINÁMICAMENTE SI ESTÁ EXPANDIDO */}
                <div className={`collapse navbar-collapse ${isNavExpanded ? 'show' : ''}`} id="navbarSensori">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center gap-3 mt-3 mt-lg-0">
                        <li className="nav-item w-100 text-center text-lg-start">
                            <Link className="nav-link fw-bold" to="/" style={{ color: location.pathname === '/' ? '#F2EA79' : '#ffffff' }}>
                                Catálogo
                            </Link>
                        </li>

                        {isUserLoggedIn && (
                            <li className="nav-item w-100 text-center text-lg-start">
                                <Link className="nav-link fw-bold" to="/pedidos" style={{ color: location.pathname === '/pedidos' ? '#F2EA79' : '#ffffff' }}>
                                    Mis Pedidos
                                </Link>
                            </li>
                        )}

                        <li className="nav-item w-100 text-center text-lg-start">
                            <Link className="nav-link" to="/reclamos" style={{ color: location.pathname === '/reclamos' ? '#F2EA79' : '#ffffff' }}>
                                Reclamos y Reembolsos
                            </Link>
                        </li>

                        {isAdmin && (
                            <li className="nav-item w-100 text-center text-lg-start">
                                <Link className="nav-link fw-bold" to="/admin" style={{ color: location.pathname === '/admin' ? '#F2EA79' : '#ffffff' }}>
                                    Administración
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Contenedor de Búsqueda y Botones centrado en móvil */}
                    <div className="d-flex flex-column flex-lg-row align-items-center gap-3 mt-3 mt-lg-0">
                        <div className="input-group w-100" style={{ maxWidth: '300px' }}>
                            <input type="text" className="form-control border-0 px-3 py-2" style={{ borderRadius: '6px 0 0 6px' }} placeholder="Buscar juguete..." />
                            <button className="btn text-white px-3" style={{ backgroundColor: '#5F94D9', borderRadius: '0 6px 6px 0' }} type="button">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>

                        <div className="d-flex gap-3 mt-2 mt-lg-0">
                            {/* Botón Carrito Naranja */}
                            <Link 
                                to="/carrito" 
                                className="text-decoration-none position-relative d-flex align-items-center justify-content-center shadow-sm" 
                                style={{ 
                                    backgroundColor: '#F2845C', 
                                    color: '#ffffff', 
                                    borderRadius: '14px', 
                                    width: '56px', 
                                    height: '42px' 
                                }}
                            >
                                <i className="bi bi-cart fs-4"></i>
                                {totalItems > 0 && (
                                    <span 
                                        className="position-absolute translate-middle badge rounded-circle bg-danger"
                                        style={{ top: '0', left: '100%', fontSize: '0.85rem', padding: '0.35em 0.55em', border: '2px solid #16498C' }}
                                    >
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Botón Usuario Amarillo */}
                            {isUserLoggedIn ? (
                                <button 
                                    className="btn rounded-circle d-flex align-items-center justify-content-center border-0 shadow-sm p-0" 
                                    style={{ backgroundColor: '#F2EA79', color: '#16498C', width: '45px', height: '45px' }}
                                    onClick={handleLogout}
                                    title="Cerrar Sesión"
                                >
                                    <i className="bi bi-person-fill fs-3"></i>
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="text-decoration-none rounded-circle d-flex align-items-center justify-content-center shadow-sm p-0" 
                                    style={{ backgroundColor: '#F2EA79', color: '#16498C', width: '45px', height: '45px' }}
                                    title="Iniciar Sesión"
                                >
                                    <i className="bi bi-person-fill fs-3"></i>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};
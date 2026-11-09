import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">Página no encontrada</h2>
            <p className="text-muted mb-4">Lo sentimos, la ruta a la que intentas acceder no existe en nuestra Tienda Sensorial.</p>
            <Link to="/" className="btn btn-primary">Volver al Catálogo</Link>
        </div>
    );
};
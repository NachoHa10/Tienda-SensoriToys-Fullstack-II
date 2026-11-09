import { useParams, Link } from 'react-router-dom';

// Simulamos la base de datos para no complicar el componente:
const productosDB = [
    { id: 1, nombre: "Cubo Rubik Sensorial", precio: 15000, descripcion: "Cubo con diferentes texturas." },
    { id: 2, nombre: "Pelota de Masaje", precio: 8500, descripcion: "Pelota con picos suaves." },
    { id: 3, nombre: "Manta con Peso", precio: 45000, descripcion: "Manta terapéutica de 2kg." },
    { id: 4, nombre: "Tubo de Burbujas", precio: 30000, descripcion: "Tubo con luces LED." }
];

export const ProductDetail = () => {
    const { id } = useParams(); // Obtenemos el ID de la URL
    const product = productosDB.find(p => p.id === Number(id));

    if (!product) {
        return <div className="container mt-5 text-center"><h3>Producto no encontrado</h3><Link to="/">Volver</Link></div>;
    }

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2>{product.nombre}</h2>
                    <h4 className="text-primary">${product.precio}</h4>
                    <p className="mt-3">{product.descripcion}</p>
                    <Link to="/" className="btn btn-outline-secondary mt-3">Volver al catálogo</Link>
                </div>
            </div>
        </div>
    );
};
export interface Product {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    categoria: string;
    edad?: string;
    descripcion?: string;
    imagenUrl?: string;
}

export interface CartItem extends Product {
    cantidad: number;
}
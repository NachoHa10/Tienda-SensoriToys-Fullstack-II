import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@sensoritoys.cl' || email.includes('admin')) {
            localStorage.setItem('isAdminLoggedIn', 'true');
            alert('¡Sesión de Administrador iniciada correctamente!');
            navigate('/admin');
        } else {
            localStorage.setItem('isAdminLoggedIn', 'false');
            alert('¡Inicio de sesión cliente exitoso!');
            navigate('/');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                        <h3 className="text-center fw-bold mb-4" style={{ color: '#16498C' }}>Iniciar Sesión</h3>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label text-muted">Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    className="form-control rounded-3" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    placeholder="ej: admin@sensoritoys.cl"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label text-muted">Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control rounded-3" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                            </div>
                            <button type="submit" className="btn text-white w-100 rounded-3 py-2" style={{ backgroundColor: '#16498C' }}>
                                Ingresar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
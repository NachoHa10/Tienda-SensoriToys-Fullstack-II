import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Carrito } from './pages/Carrito';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Perfil } from './pages/Perfil';
import { Pedidos } from './pages/Pedidos';
import { Reclamos } from './pages/Reclamos';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { NotFound } from './pages/NotFound';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/reclamos" element={<Reclamos />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
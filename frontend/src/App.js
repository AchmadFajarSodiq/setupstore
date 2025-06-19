import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KategoriPage from './pages/KategoriPage';

import { CartProvider } from './contexts/CartContext';
import CartSidebar from './components/CartSidebar';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <CartSidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk/:kategori" element={<KategoriPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;

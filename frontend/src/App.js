import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import KategoriPage from './pages/KategoriPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produk/:kategori" element={<KategoriPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import KategoriDropdown from '../components/KategoriDropdown';
import ModalPreview from '../components/ModalPreview';
import './ProdukPage.css';
import Icon from 'feather-icons-react'; // Feather Icons
import { useCart } from '../contexts/CartContext'; // <-- Tambahkan ini

// Import gambar produk
import fantechVenom from '../assets/images/mouse/fantech-venom-wgc2.jpg';
import g102v2 from '../assets/images/mouse/g102-v2.jpg';
import razzerDeathAdder from '../assets/images/mouse/razzer-deathadder.jpg';
import aula75 from '../assets/images/keyboard/aulaf75.jpg';
import fantechmizu from '../assets/images/keyboard/fantechmizu-mk874v2.jpg';
import rexusLegionare from '../assets/images/keyboard/rexus-legionare-mx5.1.jpg';
import fantechWH05 from '../assets/images/headphone/fantech-wh05.jpg';
import gamenGH100 from '../assets/images/headphone/gamen-gh100.jpg';
import jetexG7 from '../assets/images/headphone/jetex-g7.jpg';
import asusVZ24EHE from '../assets/images/monitor/asus-vz24ehe.png';
import msiG24C from '../assets/images/monitor/msi-optix-g24c.jpg';
import xiaomiG24i from '../assets/images/monitor/xiaomi-g24i.jpg';
import jeteS5Pro from '../assets/images/speaker/jete-s5-pro.jpg';
import jeteSC101 from '../assets/images/speaker/jete-sc101.jpg';
import rexusAstroC300 from '../assets/images/speaker/rexus-astro-c300.jpg';

// Data produk
const produkData = {
  keyboard: [
    {
      id: 1,
      nama: 'Aula F75',
      harga: 450000,
      img: aula75,
      rating: 4,
      deskripsi: 'Keyboard mechanical Aula 75.',
      spesifikasi: ['75% Layout', 'RGB', 'Hot swappable'],
    },
    {
      id: 2,
      nama: 'Fantech Mizu MK874V2',
      harga: 500000,
      img: fantechmizu,
      rating: 4,
      deskripsi: 'Keyboard Fantech dengan desain modern.',
      spesifikasi: ['Full Size', 'RGB', 'Hot swappable'],
    },
    {
      id: 3,
      nama: 'Rexus Legionare MX5.1',
      harga: 600000,
      img: rexusLegionare,
      rating: 5,
      deskripsi: 'Keyboard gaming Rexus dengan switch premium.',
      spesifikasi: ['87 Keys', 'RGB', 'Anti-ghosting'],
    },
  ],
  mouse: [
    {
      id: 1,
      nama: 'Fantech Venom WGC2',
      harga: 250000,
      img: fantechVenom,
      rating: 4,
      deskripsi: 'Mouse wireless Fantech, nyaman dan responsif.',
      spesifikasi: ['Wireless', 'RGB', '1200 DPI'],
    },
    {
      id: 2,
      nama: 'Logitech G102 V2',
      harga: 200000,
      img: g102v2,
      rating: 4,
      deskripsi: 'Mouse gaming murah meriah dari Logitech.',
      spesifikasi: ['Wired', '8000 DPI', 'RGB'],
    },
    {
      id: 3,
      nama: 'Razzer DeathAdder',
      harga: 650000,
      img: razzerDeathAdder,
      rating: 5,
      deskripsi: 'Mouse gaming legendaris dari Razzer.',
      spesifikasi: ['Ergonomis', '16000 DPI', 'RGB'],
    },
  ],
  headphone: [
    {
      id: 1,
      nama: 'Fantech WH05',
      harga: 350000,
      img: fantechWH05,
      rating: 4,
      deskripsi: 'Headphones wireless Fantech.',
      spesifikasi: ['Bluetooth', 'Noise Cancelling', '20 jam baterai'],
    },
    {
      id: 2,
      nama: 'Gamen GH100',
      harga: 150000,
      img: gamenGH100,
      rating: 3,
      deskripsi: 'Headset gaming murah meriah.',
      spesifikasi: ['Wired', 'Mic', 'Comfortable'],
    },
    {
      id: 3,
      nama: 'JETEX G7',
      harga: 200000,
      img: jetexG7,
      rating: 4,
      deskripsi: 'Headset gaming dengan suara jernih.',
      spesifikasi: ['Wired', 'LED', 'Bass Boost'],
    },
  ],
  monitor: [
    {
      id: 1,
      nama: 'ASUS VZ24EHE',
      harga: 2100000,
      img: asusVZ24EHE,
      rating: 5,
      deskripsi: 'Monitor IPS ASUS 24 inch borderless.',
      spesifikasi: ['24"', 'IPS', '75Hz'],
    },
    {
      id: 2,
      nama: 'MSI Optix G24C',
      harga: 2200000,
      img: msiG24C,
      rating: 4,
      deskripsi: 'Monitor gaming curved dari MSI.',
      spesifikasi: ['24"', 'Curved', '144Hz'],
    },
    {
      id: 3,
      nama: 'Xiaomi G24i',
      harga: 1800000,
      img: xiaomiG24i,
      rating: 4,
      deskripsi: 'Monitor IPS Full HD dari Xiaomi.',
      spesifikasi: ['24"', 'IPS', '100Hz'],
    },
  ],
  speaker: [
    {
      id: 1,
      nama: 'JETE S5 Pro',
      harga: 300000,
      img: jeteS5Pro,
      rating: 4,
      deskripsi: 'Speaker portable dengan kualitas suara mantap.',
      spesifikasi: ['Bluetooth', 'Bass kuat', '12 jam baterai'],
    },
    {
      id: 2,
      nama: 'JETE SC101',
      harga: 250000,
      img: jeteSC101,
      rating: 4,
      deskripsi: 'Speaker mini cocok untuk setup meja.',
      spesifikasi: ['Wired', 'Bass Boost', 'Desain compact'],
    },
    {
      id: 3,
      nama: 'Rexus Astro C300',
      harga: 400000,
      img: rexusAstroC300,
      rating: 5,
      deskripsi: 'Soundbar gaming dari Rexus.',
      spesifikasi: ['Soundbar', 'RGB', 'Stereo'],
    },
  ],
};

// NOTE: KategoriList untuk landing page
const kategoriList = [
  {
    value: 'keyboard',
    label: 'Keyboard',
    icon: <i className="fa-solid fa-keyboard"></i>,
  },
  {
    value: 'mouse',
    label: 'Mouse',
    icon: <i className="fa-solid fa-computer-mouse"></i>,
  },
  {
    value: 'headphone',
    label: 'Headphones',
    icon: <i className="fa-solid fa-headphones"></i>,
  },
  {
    value: 'speaker',
    label: 'Speaker',
    icon: <i className="fa-solid fa-volume-high"></i>,
  },
  {
    value: 'monitor',
    label: 'Monitor',
    icon: <i className="fa-solid fa-desktop"></i>,
  },
];

export default function KategoriPage() {
  const { kategori } = useParams();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [previewProduk, setPreviewProduk] = useState(null);

  const { addToCart } = useCart(); // <-- Gunakan context cart

  const handlePilihKategori = (kat) => navigate(`/produk/${kat}`);

  // Landing page kategori
  if (!kategori) {
    return (
      <div className="kategori-landing-page">
        <h1 className="kategori-title">
          <span className="gold">Produk</span>Kami
        </h1>
        <div className="kategori-subtitle">
          Pilih produk yang kamu butuhkan untuk setup terbaikmu!
        </div>
        <div className="kategori-grid">
          {kategoriList.map((kat) => (
            <div
              className="kategori-card"
              key={kat.value}
              onClick={() => handlePilihKategori(kat.value)}
              tabIndex={0}
            >
              <div className="kategori-icon">{kat.icon}</div>
              <div className="kategori-label">{kat.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Halaman produk per kategori
  return (
    <div className="produk-page">
      <div className="produk-header">
        <button className="produk-back-btn" onClick={() => navigate(-1)}>
          <svg width="28" height="28" fill="none">
            <path d="M18 24l-8-8 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="produk-dropdown-kanan">
          <KategoriDropdown selected={kategori} onSelect={handlePilihKategori} />
        </div>
      </div>

      <div className="produk-grid">
        {produkData[kategori]?.length > 0 ? (
          produkData[kategori].map((item) => (
            <div
              className="produk-card"
              key={item.id}
              onClick={() => { setPreviewProduk(item); setModalOpen(true); }}
              style={{ cursor: 'pointer' }} 
            >
              {/* Overlay ikon */}
              <div className="produk-card-actions">
                <button
                  className="cart-btn"
                  title="Tambah ke Keranjang"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart({
                      id: item.id,
                      name: item.nama,
                      price: item.harga,
                      image: item.img
                    });
                  }}
                >
                  <Icon icon="shopping-cart" size={20} />
                </button>
                <button
                  className="preview-btn"
                  title="Preview Produk"
                  onClick={(e) => { e.stopPropagation(); setPreviewProduk(item); setModalOpen(true); }}
                >
                   <Icon icon="eye" size={20} />
                </button>
              </div>
              {/* Gambar produk */}
              <img
                src={item.img}
                alt={item.nama}
                className="produk-img"
                onClick={() => { setPreviewProduk(item); setModalOpen(true); }}
                style={{ cursor: 'pointer' }} 
              />
              {/* Info produk */}
              <div className="produk-info"
                   onClick={() => { setPreviewProduk(item); setModalOpen(true); }}
                   style={{ cursor: 'pointer' }}
              >
                <div className="produk-nama">{item.nama}</div>
                <div className="produk-rating">{'★'.repeat(item.rating)}</div>
                <div className="produk-harga">Rp {item.harga.toLocaleString()}</div>
              </div>
            </div>
          ))
        ) : (
          <div style={{color: "#fff", textAlign: 'center', width: '100%'}}>Tidak ada produk di kategori ini.</div>
        )}
      </div>
      <ModalPreview open={modalOpen} onClose={() => setModalOpen(false)} produk={previewProduk} />
    </div>
  );
}

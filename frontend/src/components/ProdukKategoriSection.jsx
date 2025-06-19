import './ProdukKategoriSection.css';
import { useNavigate } from 'react-router-dom';
import headphone from '../assets/icons/headphones.svg';
import keyboard from '../assets/icons/keyboard.svg';
import monitor from '../assets/icons/monitor.svg';
import mouse from '../assets/icons/mouse.svg';
import speaker from '../assets/icons/speaker.svg';

const produkList = [
  { name: 'Keyboard', icon: keyboard, slug: 'keyboard' },
  { name: 'Mouse', icon: mouse, slug: 'mouse' },
  { name: 'Headphone', icon: headphone, slug: 'headphone' },
  { name: 'Speaker', icon: speaker, slug: 'speaker' },
  { name: 'Monitor', icon: monitor, slug: 'monitor' },
];

export default function ProdukKategoriSection() {
  const navigate = useNavigate();

  return (
    <section className="produk-section" id="produk">
      <h2>
        <span className="produk-highlight">Produk</span>Kami
      </h2>
      <p className="produk-subtitle">
        Pilih produk yang kamu butuhkan untuk setup terbaikmu!
      </p>
      <div className="produk-grid-pyramid">
        <div className="produk-row produk-row-3">
          {produkList.slice(0, 3).map((produk, idx) => (
            <div
              className={`produk-card fade-up`}
              key={produk.slug}
              style={{ animationDelay: `${0.07 * idx}s` }}
              onClick={() => navigate(`/produk/${produk.slug}`)}
              tabIndex={0}
            >
              <div className="produk-icon">
                <img src={produk.icon} alt={produk.name} />
              </div>
              <div className="produk-name">{produk.name}</div>
            </div>
          ))}
        </div>
        <div className="produk-row produk-row-2">
          {produkList.slice(3, 5).map((produk, idx) => (
            <div
              className={`produk-card fade-up`}
              key={produk.slug}
              style={{ animationDelay: `${0.25 + 0.07 * idx}s` }}
              onClick={() => navigate(`/produk/${produk.slug}`)}
              tabIndex={0}
            >
              <div className="produk-icon">
                <img src={produk.icon} alt={produk.name} />
              </div>
              <div className="produk-name">{produk.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

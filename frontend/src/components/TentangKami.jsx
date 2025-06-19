import './TentangKami.css';
import logoSetupStore from '../assets/images/logo-setupstore.jpg';

export default function TentangKami() {
  return (
    <section className="about-section" id="tentang-kami">
      <h2>
        <span className="about-highlight">Tentang</span>Kami
      </h2>
      <div className="about-content">
        <div className="about-img">
          <img src={logoSetupStore} alt="Logo SetupStore" />
        </div>
        <div className="about-text">
          <h3>Kenapa Memilih SetupStore?</h3>
          <p>
            SetupStore hadir untuk membantu kamu yang ingin membuat setup laptop atau komputer menjadi lebih keren, nyaman, dan produktif. Kami menyediakan berbagai aksesoris, rekomendasi, dan inspirasi setup kekinian.
            <br /><br />
            Temukan produk terbaik dan tips menarik hanya di SetupStore!
          </p>
        </div>
      </div>
    </section>
  );
}

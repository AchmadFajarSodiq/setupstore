import './HeroSection.css';
import heroImg from '../assets/setup-hero.jpg';

export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="hero-overlay">
        <h1>
          Selamat Datang Di Setup <span className="accent">Store</span>
        </h1>
        <div className="hero-subtitle">
          Mari buat setup laptop kamu jadi lebih keren dengan Setup Store.
        </div>
      </div>
    </section>
  );
}

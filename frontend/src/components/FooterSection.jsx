import './FooterSection.css';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function FooterSection() {
  return (
    <footer className="footer-section" id="kontak">
      <div className="footer-social">
        <a href="https://instagram.com/f4jr_s" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://wa.me/6281330949567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <FaWhatsapp />
        </a>
        <a href="mailto:achmadfajar2020@gmail.com" className="footer-email">
          achmadfajar2020@gmail.com
        </a>
      </div>
      <div className="footer-copyright">
        © {new Date().getFullYear()} SetupStore. All Rights Reserved.
      </div>
    </footer>
  );
}

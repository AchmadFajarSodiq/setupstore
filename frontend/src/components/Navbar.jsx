import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useCart } from '../contexts/CartContext'; 

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { setShowCart, cartItems } = useCart(); 

  const cartCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Optional: close search when click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchInputRef.current &&
        !searchInputRef.current.parentNode.contains(event.target) &&
        showSearch
      ) {
        setShowSearch(false);
      }
    }
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
    setMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`navbar${isScrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="brand">
          <span className="brand-setup">Setup</span>
          <span className="brand-store">Store</span>
        </div>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <button
            className="close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup Menu"
            type="button"
          >
            &times;
          </button>
          <li><button className="nav-btn" onClick={() => handleNavClick('home')}>Home</button></li>
          <li><button className="nav-btn" onClick={() => handleNavClick('about')}>Tentang Kami</button></li>
          <li><button className="nav-btn" onClick={() => handleNavClick('produk')}>Produk</button></li>
          <li><button className="nav-btn" onClick={() => handleNavClick('kontak')}>Kontak</button></li>
        </ul>
        <div className="nav-icons">
          {/* SEARCH BOX */}
          <div className="search-box-navbar" style={{ position: 'relative' }}>
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="search-form-navbar">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="search-input-navbar"
                  autoFocus
                />
                <button
                  type="button"
                  className="close-search-btn"
                  onClick={() => setShowSearch(false)}
                  aria-label="Tutup Search"
                >
                  ×
                </button>
              </form>
            ) : (
              <button
                className="icon-btn search-btn-navbar"
                aria-label="Search"
                onClick={() => setShowSearch(true)}
                style={{ position: 'relative', zIndex: 10 }}
              >
                <svg className="icon-img" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                  <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
                </svg>
              </button>
            )}
          </div>
          <button
            className="icon-btn cart-btn-navbar"
            aria-label="Cart"
            onClick={() => setShowCart(true)}
            style={{ position: "relative" }}
          >
            <svg className="icon-img" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
            </svg>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          <button
            className={`icon-btn hamburger-btn${menuOpen ? ' open' : ''}`}
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
}

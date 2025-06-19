import React, { useState } from "react";
import "./CartSidebar.css";
import { useCart } from "../contexts/CartContext";
import { X, ArrowLeft } from "react-feather";
import AuthForm from "./AuthForm";
import ModalPopup from "./ModalPopup"; // tambahkan import ini

export default function CartSidebar() {
  const {
    cartItems,
    removeFromCart,
    updateQty,
    showCart,
    setShowCart,
    clearCart, // tambahkan clearCart di sini
  } = useCart();

  const [authMode, setAuthMode] = useState(null); // null | "login" | "register"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // state untuk modal popup

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setAuthMode("login");
    } else {
      // Simulasi proses checkout berhasil
      setShowModal(true); // Tampilkan modal sukses
      setShowCart(false); // Tutup sidebar cart
      clearCart(); // Kosongkan keranjang setelah checkout berhasil
    }
  };

  const handleLogin = (username, password) => {
    setIsLoggedIn(true);
    setUser({ username });
    setAuthMode(null);
  };

  const handleRegister = (form) => {
    setAuthMode("login");
  };

  const handleSwitchMode = (mode) => setAuthMode(mode);

  return (
    <>
      <div className={`cart-sidebar${showCart ? " open" : ""}`}>
        <div className="cart-header">
          <h3>Keranjang</h3>
          <button
            className="cart-close-btn"
            aria-label="Tutup Keranjang"
            onClick={() => setShowCart(false)}
          >
            <X size={32} />
          </button>
        </div>

        {authMode ? (
          <div className="auth-form-wrapper">
            <button
              className="cart-back-btn"
              aria-label="Kembali ke keranjang"
              onClick={() => setAuthMode(null)}
            >
              <ArrowLeft size={26} />
            </button>
            <AuthForm
              mode={authMode}
              onLogin={handleLogin}
              onRegister={handleRegister}
              onSwitchMode={handleSwitchMode}
            />
          </div>
        ) : (
          <>
            <div className="cart-content">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Keranjang kosong.</p>
              ) : (
                cartItems.map(item => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <div className="cart-item-title">{item.name}</div>
                      <div className="cart-item-price">
                        Rp {item.price.toLocaleString()}
                      </div>
                      <div className="cart-item-qty">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} disabled={item.qty === 1}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="cart-footer">
              <div className="cart-total">
                Total: <b>Rp {total.toLocaleString()}</b>
              </div>
              <button
                className="checkout-btn"
                disabled={cartItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <ModalPopup
        show={showModal}
        message="Selamat, checkout anda berhasil!! Pesanan sedang kami proses…"
        onClose={() => setShowModal(false)}
      />
    </>
  );
}

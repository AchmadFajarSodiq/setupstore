import './ModalPreview.css';

export default function ModalPreview({ open, onClose, produk, onAddCart }) {
  if (!open || !produk) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h3 className="modal-title">{produk.nama}</h3>
        <img
          src={produk.img}
          alt={produk.nama}
          className="modal-img"
        />
        <p className="modal-desc">{produk.deskripsi}</p>
        {produk.spesifikasi && (
          <>
            <h4 className="modal-subtitle">Spesifikasi:</h4>
            <ul className="modal-spec">
              {produk.spesifikasi.map((spes, i) => <li key={i}>{spes}</li>)}
            </ul>
          </>
        )}
        <button
          className="modal-add-cart-btn"
          onClick={() => onAddCart && onAddCart(produk)}
        >
          Tambahkan ke Keranjang
        </button>
      </div>
    </div>
  );
}

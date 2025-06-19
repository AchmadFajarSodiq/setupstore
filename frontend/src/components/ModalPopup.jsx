import React from "react";
import "./ModalPopup.css";

export default function ModalPopup({ show, message, onClose }) {
  if (!show) return null;
  return (
    <div className="modal-popup-backdrop">
      <div className="modal-popup-box">
        <div className="modal-popup-title">Checkout Berhasil!</div>
        <div className="modal-popup-message">{message}</div>
        <button className="modal-popup-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}

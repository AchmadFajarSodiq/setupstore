import React, { useState } from "react";

export default function AuthForm({ mode, onLogin, onRegister, onSwitchMode }) {
  // mode: "login" | "register"
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    nama: "",
    telepon: "",
    alamat: "",
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (mode === "login") {
      onLogin(form.username, form.password);
    } else {
      onRegister(form);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h3>{mode === "login" ? "Login" : "Register"}</h3>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        autoFocus
        value={form.username}
        onChange={handleChange}
      />
      {mode === "register" && (
        <>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="nama"
            placeholder="Nama Lengkap"
            required
            value={form.nama}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telepon"
            placeholder="No Telepon"
            required
            value={form.telepon}
            onChange={handleChange}
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            required
            value={form.alamat}
            onChange={handleChange}
          />
        </>
      )}
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit" className="auth-btn">
        {mode === "login" ? "Login" : "Register"}
      </button>
      <div className="auth-footer">
        {mode === "login" ? (
          <>
            <span>Belum punya akun?</span>
            <button
              type="button"
              className="link-btn"
              onClick={() => onSwitchMode("register")}
            >
              Daftar Sekarang
            </button>
          </>
        ) : (
          <>
            <span>Sudah punya akun?</span>
            <button
              type="button"
              className="link-btn"
              onClick={() => onSwitchMode("login")}
            >
              Login
            </button>
          </>
        )}
      </div>
    </form>
  );
}

import React from "react";
import { Shield } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import "./login.css";

export default function Login({ onBackToHome }) {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <Shield className="login-logo-icon" />
          </div>
          <h2 className="login-title">Bienvenida de nuevo</h2>
          <p className="login-subtitle">
            Inicia sesión para continuar protegida
          </p>
        </div>

        <div className="login-form">
          <div className="login-field">
            <label className="login-label">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="login-input"
            />
          </div>

          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              className="login-input"
            />
          </div>

          <div className="login-row">
            <label className="login-remember">
              <input type="checkbox" />
              <span>Recordarme</span>
            </label>
            <button className="login-link">¿Olvidaste tu contraseña?</button>
          </div>

          <button className="login-button">Iniciar Sesión</button>
        </div>

       <div className="login-footer">
         <p>
           ¿No tienes cuenta?{" "}
        <button
          className="login-link-strong"
         onClick={() => navigate('/register')}
        >
         Regístrate aquí
        </button>
       </p>
       </div>
       
        <button
           type="button"
           className="btn-test-dashboard"
          onClick={() => navigate('/dashboard')}
        >
          Prueba
         </button>

        <button
          type="button"
          className="login-back"
          onClick={() => {
            if (typeof onBackToHome === "function") {
              onBackToHome();
            } else {
              window.location.href = "/";
            }
          }}
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}

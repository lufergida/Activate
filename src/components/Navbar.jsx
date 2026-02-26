import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  const getLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Marca / Logo */}
        <button className="navbar-brand" onClick={handleLogoClick}>
          <Shield className="navbar-logo" />
          <span className="navbar-title">HerGuardianIA</span>
        </button>

        {/* Botón Hambu */}
        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menú"
        >
          {isOpen ? <X className="navbar-toggle-icon" /> : <Menu className="navbar-toggle-icon" />}
        </button>

        {/* Links */}
        <nav className={`navbar-links ${isOpen ? 'navbar-links-open' : ''}`}>
          <NavLink
            to="/"
            className={getLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/resources"
            className={getLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Recursos
          </NavLink>


          <NavLink
            to="/register"
            className={getLinkClass}
            onClick={() => setIsOpen(false)}
          >
           Registrarme
          </NavLink>


          <NavLink
            to="/login"
            className={({ isActive }) =>
              `nav-link nav-link-cta ${isActive ? 'nav-link-active-cta' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Iniciar sesión
          </NavLink>


        </nav>
      </div>
    </header>
  );
}

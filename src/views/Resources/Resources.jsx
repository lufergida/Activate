import React from 'react';
import { BookOpen, HeartHandshake, Shield, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './resources.css'; 
import Navbar from '../../components/Navbar';

export default function Resources() {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate('/');
  };

  const handleNavigateToHelp = () => {
    navigate('/help'); // opcional: ajusta según tus rutas
  };

  return (
    <div className="home-container">
        <Navbar />
        
      {/* HERO RESOURCES */}
      <div className="hero-section resources-hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <div className="hero-inner">
            <div className="hero-badge">
              <BookOpen className="badge-icon" />
              <span>Recursos para acompañarte</span>
            </div>

            <h1 className="hero-title">
              Biblioteca de <br />
              <span className="hero-highlight">Apoyo y Prevención</span>
            </h1>

            <p className="hero-description">
              Encuentra guías, artículos y herramientas prácticas para reconocer, 
              enfrentar y denunciar la violencia digital, además de cuidar tu bienestar emocional.
            </p>

            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={handleNavigateToHome}
              >
                Volver al Inicio
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleNavigateToHelp}
              >
                Necesito Ayuda Ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORÍAS DE RECURSOS */}
      <section className="features-section resources-section">
        <h2 className="features-title">Explora los recursos</h2>

        <div className="features-grid">
          <div className="feature-card resource-card">
            <div className="feature-icon feature-icon-purple">
              <Shield className="icon" />
            </div>
            <h3 className="feature-title">Seguridad Digital</h3>
            <p className="feature-description">
              Guías paso a paso para configurar privacidad en redes sociales, 
              bloquear agresores y denunciar contenido abusivo.
            </p>
            <ul className="resource-list">
              <li>Check-list de seguridad en Instagram</li>
              <li>Cómo recopilar evidencias de ciberacoso</li>
              <li>Plantillas para reportar contenido</li>
            </ul>
          </div>

          <div className="feature-card resource-card">
            <div className="feature-icon feature-icon-pink">
              <HeartHandshake className="icon" />
            </div>
            <h3 className="feature-title">Apoyo Emocional</h3>
            <p className="feature-description">
              Recursos para manejar el impacto emocional del ciberacoso 
              y fortalecer tu autoestima.
            </p>
            <ul className="resource-list">
              <li>Ejercicios de respiración guiada</li>
              <li>Diario emocional descargable</li>
              <li>Consejos para crear tu red de apoyo</li>
            </ul>
          </div>

          <div className="feature-card resource-card">
            <div className="feature-icon feature-icon-rose">
              <BookOpen className="icon" />
            </div>
            <h3 className="feature-title">Información Legal</h3>
            <p className="feature-description">
              Información clara y sencilla sobre tus derechos, 
              rutas de denuncia y tipos de violencia digital.
            </p>
            <ul className="resource-list">
              <li>Guía básica de ciberacoso y sextorsión</li>
              <li>Rutas de denuncia según tu país</li>
              <li>Preguntas frecuentes con abogadas aliadas</li>
            </ul>
          </div>

          <div className="feature-card resource-card">
            <div className="feature-icon feature-icon-indigo">
              <MessageCircle className="icon" />
            </div>
            <h3 className="feature-title">Comunidad y Talleres</h3>
            <p className="feature-description">
              Espacios seguros para aprender, compartir experiencias 
              y participar en talleres de prevención.
            </p>
            <ul className="resource-list">
              <li>Charlas en vivo con expertas</li>
              <li>Talleres para madres, cuidadoras y aliadxs</li>
              <li>Historias reales de supervivientes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* BLOQUE DESTACADO / CTA */}
      <section className="cta-section resources-cta">
        <div className="cta-content">
          <h2 className="cta-title">¿No sabes por dónde empezar?</h2>
          <p className="cta-description">
            Responde unas preguntas rápidas y te recomendaremos los recursos 
            más adecuados para tu situación actual.
          </p>
          <button className="btn btn-cta">
            Explorar recursos recomendados
          </button>
        </div>
      </section>

      {/* FOOTER (reutilizado) */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-brand">
                <Shield className="footer-icon" />
                <span className="footer-brand-name">HerGuardianIA</span>
              </div>
              <p className="footer-description">
                Protección digital impulsada por IA para mujeres
              </p>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Producto</h4>
              <ul className="footer-links">
                <li><a href="#">Características</a></li>
                <li><a href="#">Precios</a></li>
                <li><a href="#">Seguridad</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Recursos</h4>
              <ul className="footer-links">
                <li><a href="#">Blog</a></li>
                <li><a href="#">Guías</a></li>
                <li><a href="#">Ayuda</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#">Privacidad</a></li>
                <li><a href="#">Términos</a></li>
                <li><a href="#">Contacto</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            © 2025 HerGuardianIA. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useRef, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./home.css";

export default function ActivaLanding() {
  // ----- STATES -----
  const [panel, setPanel] = useState(0);
  const [selectedSegmento, setSelectedSegmento] = useState("profesional");

  const [industry, setIndustry] = useState("");
  const [years, setYears] = useState(15);
  const [team, setTeam] = useState("");
  const [crisis, setCrisis] = useState("");
  const [contacts, setContacts] = useState(40);

  const [score, setScore] = useState(0);
  const [scoreLevel, setScoreLevel] = useState("CALCULANDO...");
  const [scoreMessage, setScoreMessage] = useState("Calculando tu perfil...");

  const [bars, setBars] = useState({ exp: 0, team: 0, crisis: 0, net: 0 });

  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
    industry: "",
  });

  const [formSuccess, setFormSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(847);

  const waitlistRef = useRef(null);
  const navigate = useNavigate();

  // ----- HELPERS -----
  const scrollToWaitlist = () => {
    waitlistRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const nextPanel = () => setPanel((p) => Math.min(p + 1, 3));
  const prevPanel = () => setPanel((p) => Math.max(p - 1, 0));

  const calcScore = () => {
    const teamMap = {
      "Solo / Independiente": 1,
      "1 a 5 personas": 2,
      "6 a 20 personas": 3,
      "Más de 20 personas": 4,
    };
    const crisisMap = {
      "Sí, varias veces": 4,
      "Sí, una vez importante": 3,
      "Estuve cerca, como apoyo": 2,
      "No directamente": 1,
    };

    const teamScore = teamMap[team] ?? 2;
    const crisisScore = crisisMap[crisis] ?? 2;

    const expPct = Math.round((years / 40) * 100);
    const teamPct = Math.round((teamScore / 4) * 100);
    const crisisPct = Math.round((crisisScore / 4) * 100);
    const netPct = Math.round((contacts / 100) * 100);

    const total = Math.round(expPct * 0.3 + teamPct * 0.25 + crisisPct * 0.25 + netPct * 0.2);
    const finalScore = Math.round(600 + total * 3.5);
    const capped = Math.min(finalScore, 985);

    setBars({ exp: expPct, team: teamPct, crisis: crisisPct, net: netPct });
    setScore(capped);

    let level, message;
    if (capped >= 900) {
      level = "NIVEL: ÉLITE PLATEADO";
      message =
        "Tu perfil está en el top 5% de Activa. Hay oportunidades de consultoría estratégica esperándote con presupuestos entre S/. 5,000 y S/. 15,000. Tu experiencia es exactamente lo que el mercado no sabe que está buscando.";
    } else if (capped >= 800) {
      level = "NIVEL: SENIOR+";
      message =
        "Excelente perfil. Tu Score te da acceso a la mayoría de oportunidades del mercado. Con cada proyecto completado en Activa, tu Score sube y accedes a desafíos de mayor presupuesto y complejidad.";
    } else if (capped >= 700) {
      level = "NIVEL: SENIOR";
      message =
        "Buen perfil con gran potencial de crecimiento. Completar tu perfil en Activa y tomar tus primeros proyectos puede subir tu Score en 80-120 puntos en las primeras 8 semanas.";
    } else {
      level = "NIVEL: EN CONSTRUCCIÓN";
      message =
        "Activa tiene un track de desarrollo acelerado para perfiles en crecimiento. La experiencia que tienes hoy ya vale. Necesitas el canal correcto para hacerla visible.";
    }

    setScoreLevel(level);
    setScoreMessage(message);
    setPanel(3);
  };

  const submitForm = () => {
    const name = form.name.trim();
    const email = form.email.trim();

    if (!name || !email) {
      alert("Por favor completa tu nombre y correo electrónico.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor ingresa un correo electrónico válido.");
      return;
    }

    setSuccessEmail(email);
    setFormSuccess(true);
    setWaitlistCount((c) => c + 1);
  };

  // ----- Reveal animation -----
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ----- Ring offset -----
  const circumference = 502;
  const ringOffset = circumference - (score / 1000) * circumference;

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">
          ACTIVA<span>PERÚ</span>
        </div>

        <ul className="nav-links">
          <li><a href="#problema">El Problema</a></li>
          <li><a href="#score">Score Plateado</a></li>
          <li>
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => navigate("/mercado")}
            >
              Mercado
            </button>
          </li>
          <NavLink to="/academy" className="nav-link">
          Academy
         </NavLink>
          <li><a href="#waitlist">Únete</a></li>
        </ul>

        <button className="nav-cta" onClick={scrollToWaitlist}>
          Acceso Anticipado
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        <div className="hero-content">
          <div className="hero-eyebrow">Hackatón Plateada 50+ · 2026</div>

          <h1 className="hero-title">
            El Perú tiene un<br />
            <em>error de cálculo.</em>
            <span className="line-break">Ya lo encontramos.</span>
          </h1>

          <p className="hero-statement">
            8 millones de profesionales mayores de 50 años.<br />
            El sistema los llama carga. Nosotros los llamamos<br />
            el activo más subutilizado de la economía peruana.
          </p>

          <div className="hero-ctas">
            <a href="#score" className="btn-primary">
              Calcular mi Score Plateado
            </a>

            {/* ✅ Botón Mercado navega a /mercado */}
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate("/mercado")}
            >
              Ver el Mercado →
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="stat-card reveal">
            <div className="stat-number">8M+</div>
            <div className="stat-label">Profesionales 50+<br />sin canal digital</div>
          </div>
          <div className="stat-card reveal">
            <div className="stat-number">73%</div>
            <div className="stat-label">Sin asesoría<br />financiera formal</div>
          </div>
          <div className="stat-card reveal">
            <div className="stat-number">S/.847M</div>
            <div className="stat-label">Valor perdido anual<br />en jubilaciones sin transferencia</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PROBLEMA */}
      <section className="section" id="problema">
        <div className="problem-grid">
          <div className="problem-text reveal">
            <div className="section-label">// El problema real</div>
            <h2 className="section-title">
              El sistema tiene un<br /><em>bug estructural.</em>
            </h2>
            <p>
              Cuando un profesional peruano cumple 50 años, el mercado laboral empieza a tratarlo como si su valor hubiera empezado a decrecer...
            </p>
            <p>
              Pero los números dicen otra cosa. <strong>La experiencia acumulada no se deprecia. Se subutiliza.</strong>
            </p>
            <p>
              <strong>Activa</strong> es el sistema operativo que corrige ese error...
            </p>
          </div>

          <div className="data-cards reveal">
            <div className="data-card">
              <div className="big">68%</div>
              <div className="desc">de empresas peruanas prefieren candidatos menores de 45 años...</div>
            </div>
            <div className="data-card">
              <div className="big">45</div>
              <div className="desc">días promedio para encontrar trabajo después de los 50 años...</div>
            </div>
            <div className="data-card">
              <div className="big">43%</div>
              <div className="desc">de emprendedores mayores de 50 opera en informalidad...</div>
            </div>
            <div className="data-card accent">
              <div className="big">99.6%</div>
              <div className="desc">del tejido empresarial peruano son medianas y pequeñas empresas...</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SCORE */}
      <section className="section" id="score">
        <div className="score-section">
          <div className="score-header reveal">
            <div className="section-label">// Herramienta exclusiva</div>
            <h2 className="section-title">
              Calcula tu<br /><em>Score Plateado</em>
            </h2>
            <p style={{ color: "var(--silver)", fontSize: "0.9rem", marginTop: "0.8rem" }}>
              Descubre el valor de mercado de tu experiencia en menos de 2 minutos.
            </p>
          </div>

          <div className="simulator reveal">
            <div className="sim-progress">
              {["INDUSTRIA", "EXPERIENCIA", "RED", "RESULTADO"].map((t, i) => (
                <div
                  key={t}
                  className={`sim-step ${panel === i ? "active" : ""} ${panel > i ? "done" : ""}`}
                >
                  {t}
                </div>
              ))}
            </div>

            <div className="sim-body">
              {/* Panel 0 */}
              <div className={`sim-panel ${panel === 0 ? "active" : ""}`}>
                <p className="sim-question">
                  ¿En qué industria tienes tu mayor <em>profundidad de experiencia?</em>
                </p>
                <div className="options-grid">
                  {[
                    "🏦 Finanzas y Banca",
                    "🏭 Manufactura e Industria",
                    "🛒 Retail y Consumo Masivo",
                    "💻 Tecnología",
                    "🏥 Salud y Farmacia",
                    "📐 Construcción e Inmobiliario",
                    "📚 Educación",
                    "⚡ Energía y Minería",
                  ].map((opt) => (
                    <button
                      key={opt}
                      className={`option-btn ${industry === opt ? "selected" : ""}`}
                      onClick={() => setIndustry(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <div className="sim-nav">
                  <button className="btn-sim-next" onClick={nextPanel}>Continuar →</button>
                </div>
              </div>

              {/* Panel 1 */}
              <div className={`sim-panel ${panel === 1 ? "active" : ""}`}>
                <p className="sim-question">¿Cuántos años lleva trabajando en esa industria?</p>
                <div className="slider-container">
                  <div className="slider-label">
                    <span>0 años</span>
                    <span className="slider-value">{years} años</span>
                    <span>40+ años</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={years}
                    onChange={(e) => setYears(parseInt(e.target.value))}
                  />
                </div>

                <p className="sim-question" style={{ marginTop: "1.5rem" }}>
                  ¿Cuántas personas lideró en el punto más alto de su carrera?
                </p>
                <div className="options-grid">
                  {["Solo / Independiente", "1 a 5 personas", "6 a 20 personas", "Más de 20 personas"].map((opt) => (
                    <button
                      key={opt}
                      className={`option-btn ${team === opt ? "selected" : ""}`}
                      onClick={() => setTeam(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="sim-nav">
                  <button className="btn-sim-back" onClick={prevPanel}>← Atrás</button>
                  <button className="btn-sim-next" onClick={nextPanel}>Continuar →</button>
                </div>
              </div>

              {/* Panel 2 */}
              <div className={`sim-panel ${panel === 2 ? "active" : ""}`}>
                <p className="sim-question">
                  ¿Ha resuelto alguna <em>crisis empresarial mayor</em> en su carrera?
                </p>
                <div className="options-grid" style={{ marginBottom: "2rem" }}>
                  {["Sí, varias veces", "Sí, una vez importante", "Estuve cerca, como apoyo", "No directamente"].map((opt) => (
                    <button
                      key={opt}
                      className={`option-btn ${crisis === opt ? "selected" : ""}`}
                      onClick={() => setCrisis(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <p className="sim-question">¿Cuántos contactos activos tiene en su industria?</p>
                <div className="slider-container">
                  <div className="slider-label">
                    <span>0</span>
                    <span className="slider-value">{contacts} contactos</span>
                    <span>100+</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={contacts}
                    onChange={(e) => setContacts(parseInt(e.target.value))}
                  />
                </div>

                <div className="sim-nav">
                  <button className="btn-sim-back" onClick={prevPanel}>← Atrás</button>
                  <button className="btn-sim-next" onClick={calcScore}>Ver mi Score →</button>
                </div>
              </div>

              {/* Panel 3 */}
              <div className={`sim-panel ${panel === 3 ? "active" : ""}`}>
                <div className="score-result">
                  <div className="score-ring-container">
                    <svg className="score-ring" viewBox="0 0 180 180">
                      <circle className="ring-bg" cx="90" cy="90" r="80" />
                      <circle
                        className="ring-fill"
                        cx="90"
                        cy="90"
                        r="80"
                        style={{ strokeDashoffset: ringOffset }}
                      />
                    </svg>
                    <div className="score-number">
                      <span>{score}</span>
                      <small>SCORE</small>
                    </div>
                  </div>

                  <div className="score-level">{scoreLevel}</div>

                  <div className="score-bars">
                    {[
                      ["Experiencia sectorial", bars.exp],
                      ["Gestión de equipos", bars.team],
                      ["Resolución de crisis", bars.crisis],
                      ["Red de contactos", bars.net],
                    ].map(([label, val]) => (
                      <div className="score-bar-item" key={label}>
                        <span className="score-bar-label">{label}</span>
                        <div className="score-bar-track">
                          <div className="score-bar-fill" style={{ width: `${val}%` }} />
                        </div>
                        <span className="score-bar-val">{val}</span>
                      </div>
                    ))}
                  </div>

                  <div className="score-cta-box">
                    <p>{scoreMessage}</p>
                  </div>

                  <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                    <button className="btn-primary" style={{ flex: 1 }} onClick={scrollToWaitlist}>
                      Completar mi perfil completo →
                    </button>
                    <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setModalOpen(true)}>
                      Ver oportunidades disponibles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* WAITLIST */}
      <section className="section waitlist-section" id="waitlist" ref={waitlistRef}>
        <div className="waitlist-inner">
          <div className="waitlist-badge reveal">🟡 &nbsp; Lanzamiento Q2 2026 · Perú</div>

          <div className="reveal">
            <span className="waitlist-count">{waitlistCount}</span>
            <p style={{ color: "var(--silver)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
              profesionales ya están en la lista de espera
            </p>
            <h2 className="section-title" style={{ textAlign: "center", marginTop: "1rem" }}>
              Sé parte del primer grupo.<br />
              <em>El acceso anticipado es gratuito.</em>
            </h2>
          </div>

          <div className="form-container reveal">
            {!formSuccess ? (
              <div>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--silver)",
                    marginBottom: "1.5rem",
                    fontFamily: "DM Mono, monospace",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  ¿Quién eres en Activa?
                </p>

                <div className="form-segmento">
                  {[
                    ["profesional", "👤 Profesional 50+"],
                    ["empresa", "🏢 Empresa / PyME"],
                    ["startup", "🚀 Startup"],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      className={`seg-btn ${selectedSegmento === key ? "selected" : ""}`}
                      onClick={() => setSelectedSegmento(key)}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre completo</label>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad</label>
                    <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
                      <option value="">Seleccionar ciudad</option>
                      <option>Lima</option>
                      <option>Arequipa</option>
                      <option>Trujillo</option>
                      <option>Cusco</option>
                      <option>Piura</option>
                      <option>Otra ciudad</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Industria principal</label>
                    <select
                      value={form.industry}
                      onChange={(e) => setForm({ ...form, industry: e.target.value })}
                    >
                      <option value="">Seleccionar industria</option>
                      <option>Finanzas y Banca</option>
                      <option>Manufactura</option>
                      <option>Retail y Consumo</option>
                      <option>Tecnología</option>
                      <option>Salud</option>
                      <option>Construcción</option>
                      <option>Educación</option>
                      <option>Energía y Minería</option>
                      <option>Otra</option>
                    </select>
                  </div>
                </div>

                <button className="btn-submit" onClick={submitForm}>
                  Quiero acceso anticipado a ACTIVA →
                </button>

                <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", textAlign: "center", marginTop: "1rem" }}>
                  Sin spam. Sin costo. Solo te avisamos cuando tu acceso esté listo.
                </p>
              </div>
            ) : (
              <div className="success-message" style={{ display: "block" }}>
                <span className="success-icon">⭐</span>
                <h3>¡Bienvenido a ACTIVA!</h3>
                <p>
                  Tu lugar está reservado. Eres parte del primer grupo que transformará la economía plateada del Perú.
                  <br /><br />
                  Te contactaremos a <strong>{successEmail}</strong> cuando tu acceso esté listo.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">ACTIVA<span>PERÚ</span></div>
        <p className="footer-text">© 2026 · Hackatón Plateada 50+ · Emprende UP × BID Lab</p>
        <div className="footer-badge">MVP v0.1 · En construcción</div>
      </footer>

      {/* MODAL */}
      <div
        className={`modal-overlay ${modalOpen ? "open" : ""}`}
        id="modal"
        onClick={(e) => {
          if (e.target.id === "modal") setModalOpen(false);
        }}
      >
        <div className="modal" style={{ position: "relative" }}>
          <button className="modal-close" onClick={() => setModalOpen(false)}>✕</button>
          <h3>Esta función llega pronto</h3>
          <p>
            El Mercado de Problemas completo se lanzará en Q2 2026.
            Únete a la lista de espera y sé el primero en acceder cuando abramos las puertas.
          </p>
          <div className="modal-btns">
            <button
              className="btn-primary"
              onClick={() => {
                setModalOpen(false);
                scrollToWaitlist();
              }}
            >
              Unirme ahora →
            </button>
            <button className="btn-secondary" onClick={() => setModalOpen(false)}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
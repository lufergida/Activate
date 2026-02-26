import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./mercado.css";

const PROBLEMS = [

  { id: 1, cat: "finanzas", catLabel: "Finanzas", city: "Arequipa", title: "Restructurar deuda con proveedores sin afectar el flujo de caja operativo", desc: "Empresa de distribución regional con S/. 2.3M en deuda acumulada con 4 proveedores principales busca experto que diseñe plan de restructuración sin paralizar operaciones.", budget: 4800, weeks: 4, scoreMin: 820, applicants: 7, maxApplicants: 10, daysLeft: 5, tags: ["Restructuración", "Flujo de caja", "Negociación"], urgent: true },
  { id: 2, cat: "manufactura", catLabel: "Manufactura", city: "Lima", title: "Reducir mermas en línea de producción textil en 30 días con presupuesto limitado", desc: "Planta textil mediana con 120 operarios busca especialista en procesos para identificar y corregir puntos de desperdicio sin inversión en maquinaria nueva.", budget: 2500, weeks: 3, scoreMin: 750, applicants: 3, maxApplicants: 10, daysLeft: 8, tags: ["Lean", "Producción", "Eficiencia"], urgent: false },
  { id: 3, cat: "estrategia", catLabel: "Estrategia", city: "Trujillo", title: "Diseñar plan de expansión a mercado colombiano para empresa de alimentos regional", desc: "Empresa de alimentos del norte del Perú con 18 años en el mercado local quiere iniciar exportaciones a Colombia. Busca experto con experiencia en internacionalización.", budget: 8200, weeks: 6, scoreMin: 880, applicants: 12, maxApplicants: 15, daysLeft: 3, tags: ["Internacionalización", "Alimentos", "Go-to-market"], urgent: true },
  { id: 4, cat: "retail", catLabel: "Retail", city: "Cusco", title: "Mejorar márgenes en canal de distribución moderno sin perder presencia de góndola", desc: "Marca de consumo masivo con presencia en supermercados del sur del país enfrenta presión de precios. Busca estratega con experiencia en negociación con cadenas retail.", budget: 3100, weeks: 3, scoreMin: 790, applicants: 5, maxApplicants: 10, daysLeft: 6, tags: ["Trade marketing", "Márgenes", "Negociación"], urgent: false },
  { id: 5, cat: "finanzas", catLabel: "Finanzas", city: "Lima", title: "Implementar sistema de control de costos en empresa constructora familiar de segunda generación", desc: "Constructora con 35 años en el mercado que pasó de padre a hijos necesita profesionalizar su control financiero. Sin sistemas ERP. Procesos manuales en Excel.", budget: 5500, weeks: 5, scoreMin: 810, applicants: 2, maxApplicants: 10, daysLeft: 12, tags: ["Control de costos", "Construcción", "Empresa familiar"], urgent: false },
  { id: 6, cat: "estrategia", catLabel: "RR.HH.", city: "Lima", title: "Diseñar plan de sucesión para empresa familiar de 80 empleados previo al retiro del fundador", desc: "Fundador de 67 años planea retirarse en 18 meses. Dos hijos en la empresa con visiones distintas. Necesita mediador y estratega que diseñe proceso de transición.", budget: 6400, weeks: 8, scoreMin: 860, applicants: 9, maxApplicants: 10, daysLeft: 2, tags: ["Sucesión", "Empresa familiar", "Liderazgo"], urgent: true },
  { id: 7, cat: "manufactura", catLabel: "Manufactura", city: "Piura", title: "Optimizar cadena de suministro para reducir tiempos de entrega en 40% en sector agroindustrial", desc: "Empresa agroexportadora con operaciones en Piura busca especialista en logística y cadena de suministro para rediseñar flujo desde campo hasta puerto de embarque.", budget: 7200, weeks: 7, scoreMin: 840, applicants: 4, maxApplicants: 12, daysLeft: 9, tags: ["Logística", "Agroexportación", "Supply chain"], urgent: false },
  { id: 8, cat: "retail", catLabel: "Marketing", city: "Lima", title: "Relanzar marca de 20 años sin perder base de clientes leales mientras atrae segmento joven", desc: "Marca de ropa peruana reconocida en segmento 45+ quiere modernizar imagen sin alejar a sus clientes actuales. Reto de rebranding intergeneracional.", budget: 4200, weeks: 5, scoreMin: 800, applicants: 6, maxApplicants: 10, daysLeft: 7, tags: ["Branding", "Reposicionamiento", "Marketing"], urgent: false },

  { id: 9, cat: "oficios", catLabel: "Carpintería", city: "Lima", title: "Fabricación e instalación de muebles a medida para oficina", desc: "Startup necesita carpintero para diseñar e instalar escritorios y estanterías resistentes para equipo de 12 personas.", budget: 1800, weeks: 2, scoreMin: 600, applicants: 2, maxApplicants: 6, daysLeft: 6, tags: ["Carpintería", "Muebles", "Instalación"], urgent: false },
  { id: 10, cat: "oficios", catLabel: "Plomería", city: "Arequipa", title: "Reparación de filtración y cambio de tubería en baño principal", desc: "Vivienda con filtración recurrente necesita diagnóstico y reemplazo de tramo de tubería. Trabajo con garantía.", budget: 950, weeks: 1, scoreMin: 580, applicants: 3, maxApplicants: 6, daysLeft: 3, tags: ["Plomería", "Reparación", "Tuberías"], urgent: true },
  { id: 11, cat: "oficios", catLabel: "Electricidad", city: "Cusco", title: "Instalación de tablero eléctrico y reordenamiento de cableado en local", desc: "Local comercial requiere instalación segura, ordenada y con verificación de puntos críticos de energía.", budget: 1400, weeks: 1, scoreMin: 600, applicants: 4, maxApplicants: 8, daysLeft: 5, tags: ["Electricidad", "Instalación", "Seguridad"], urgent: false },
  { id: 12, cat: "oficios", catLabel: "Aseo", city: "Lima", title: "Limpieza profunda post-remodelación (polvo + residuos)", desc: "Departamento recién remodelado requiere limpieza profunda profesional, incluyendo ventanas, pisos y retiro de residuos.", budget: 650, weeks: 1, scoreMin: 520, applicants: 5, maxApplicants: 10, daysLeft: 2, tags: ["Aseo", "Limpieza profunda", "Post-obra"], urgent: true },
  { id: 13, cat: "oficios", catLabel: "Pintura", city: "Trujillo", title: "Pintado interior completo de 3 ambientes con acabado prolijo", desc: "Se requiere pintor para sala + 2 habitaciones. Incluye resane y acabado uniforme.", budget: 1100, weeks: 1, scoreMin: 560, applicants: 2, maxApplicants: 6, daysLeft: 7, tags: ["Pintura", "Acabados", "Resane"], urgent: false },
  { id: 14, cat: "oficios", catLabel: "Gasfitería", city: "Piura", title: "Instalación de terma y revisión de presión de agua", desc: "Instalar terma y revisar sistema de presión/llaves para evitar fugas y asegurar temperatura estable.", budget: 800, weeks: 1, scoreMin: 560, applicants: 1, maxApplicants: 5, daysLeft: 8, tags: ["Gasfitería", "Terma", "Mantenimiento"], urgent: false },
];

export default function Mercado() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("recent");
  const [currentSearch, setCurrentSearch] = useState("");
  const [applied, setApplied] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [currentProblemId, setCurrentProblemId] = useState(null);
  const [drawerStep, setDrawerStep] = useState(0);

  // Form
  const [proposal, setProposal] = useState("");
  const [availability, setAvailability] = useState("");
  const [email, setEmail] = useState("");

  const currentProblem = useMemo(
    () => PROBLEMS.find((p) => p.id === currentProblemId) || null,
    [currentProblemId]
  );

  const filtered = useMemo(() => {
    return PROBLEMS
      .filter((p) => currentFilter === "all" || p.cat === currentFilter)
      .filter((p) => {
        if (!currentSearch) return true;
        const q = currentSearch.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.city.toLowerCase().includes(q) ||
          p.catLabel.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (currentSort === "budget") return b.budget - a.budget;
        if (currentSort === "urgent") return a.daysLeft - b.daysLeft;
        if (currentSort === "score") return a.scoreMin - b.scoreMin;
        return a.id - b.id; // "Más recientes" según id
      });
  }, [currentFilter, currentSearch, currentSort]);

  const liveCount = filtered.length;

  function openDrawer(id) {
    setCurrentProblemId(id);
    setDrawerStep(0);
    setDrawerOpen(true);
    setOverlayOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    setDrawerOpen(false);
    setOverlayOpen(false);
    document.body.style.overflow = "";
    setProposal("");
    setAvailability("");
    setEmail("");
  }

  function clearSearch() {
    setCurrentSearch("");
  }

  function clearAll() {
    setCurrentFilter("all");
    setCurrentSearch("");
  }

  function submitApplication() {
    if (!proposal.trim() || !availability) {
      alert("Por favor completa tu propuesta y disponibilidad.");
      return;
    }
    if (!currentProblem) return;

    setApplied((prev) => (prev.includes(currentProblem.id) ? prev : [...prev, currentProblem.id]));
    setDrawerStep(2);
  }

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <Link className="nav-back" to="/">← Volver al inicio</Link>

        <div className="nav-logo">
          ACTIVA<span>PERÚ</span>
        </div>

        <div className="nav-right">
          <div className="live-dot"></div>
          <span className="live-label">
            {liveCount} problema{liveCount !== 1 ? "s" : ""} activo{liveCount !== 1 ? "s" : ""}
          </span>
        </div>
      </nav>


      <header className="header">
        <div className="header-bg"></div>
        <div className="header-grid"></div>

        <div className="header-content">
          <p className="eyebrow">// Mercado de Problemas · En vivo</p>
          <h1 className="h-title">
            Empresas con problemas<br />
            <em>reales esperando tu experiencia.</em>
          </h1>
          <p className="h-sub">
            Tu Score Plateado determina qué oportunidades ves primero.<br />
            Cada problema resuelto incrementa tu activo.
          </p>
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-num">S/. 49,900</span>
            <span className="stat-label">En presupuestos disponibles</span>
          </div>
          <div className="stat-div"></div>
          <div className="stat">
            <span className="stat-num">{PROBLEMS.length}</span>
            <span className="stat-label">Problemas activos ahora</span>
          </div>
          <div className="stat-div"></div>
          <div className="stat">
            <span className="stat-num">48</span>
            <span className="stat-label">Expertos aplicaron esta semana</span>
          </div>
        </div>
      </header>

      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="search"
            type="text"
            value={currentSearch}
            placeholder="Buscar por industria, habilidad u oficio..."
            onChange={(e) => setCurrentSearch(e.target.value)}
          />
          <button
            className="search-clear"
            style={{ display: currentSearch ? "block" : "none" }}
            onClick={clearSearch}
            aria-label="Limpiar búsqueda"
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="filters" id="filters">
          {[
            { key: "all", label: "Todos" },
            { key: "finanzas", label: "Finanzas" },
            { key: "manufactura", label: "Manufactura" },
            { key: "retail", label: "Retail" },
            { key: "estrategia", label: "Estrategia" },
            { key: "oficios", label: "Habilidades" }, 
          ].map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${currentFilter === f.key ? "active" : ""}`}
              onClick={() => setCurrentFilter(f.key)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>

        <select className="sort-sel" value={currentSort} onChange={(e) => setCurrentSort(e.target.value)}>
          <option value="recent">Más recientes</option>
          <option value="budget">Mayor presupuesto</option>
          <option value="urgent">Más urgentes</option>
          <option value="score">Menor Score requerido</option>
        </select>
      </div>


      <main className="main">
        <p className="results-count" id="results-count">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
        </p>

        <div className="grid" id="grid">
          {filtered.length === 0 ? (
            <div className="empty">
              <span className="empty-icon">◎</span>
              <p>No hay resultados para tu búsqueda.</p>
              <button className="filter-btn active" onClick={clearAll} type="button">
                Ver todos
              </button>
            </div>
          ) : (
            filtered.map((p, i) => {
              const pct = Math.round((p.applicants / p.maxApplicants) * 100);
              const isApplied = applied.includes(p.id);
              const dayStyle = { color: p.daysLeft <= 3 ? "var(--gold)" : "var(--silver)" };

              return (
                <article
                  key={p.id}
                  className="card"
                  style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => openDrawer(p.id)}
                >
                  {p.urgent ? <div className="urgent-badge">URGENTE</div> : null}

                  <div className="card-top">
                    <div className="card-tag">
                      <span className="tag-dot"></span>
                      {p.catLabel} · {p.city}
                    </div>
                    <div className="card-days" style={dayStyle}>
                      {p.daysLeft}d restantes
                    </div>
                  </div>

                  <h3 className="card-title">"{p.title}"</h3>

                  <div className="card-meta">
                    <div className="meta-item">
                      <span className="meta-label">Presupuesto</span>
                      <span className="meta-val">S/. {p.budget.toLocaleString()}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Duración</span>
                      <span className="meta-val">{p.weeks} semanas</span>
                    </div>
                  </div>

                  <div className="score-req">⭐ Score mínimo: {p.scoreMin}+</div>

                  <div className="card-tags">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="applicants">
                    <div className="app-label">
                      <span>{p.applicants} aplicaron</span>
                      <span>{pct}% ocupado</span>
                    </div>
                    <div className="bar-track">
                      <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                    </div>
                  </div>

                  <button
                    className={`card-cta ${isApplied ? "applied" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      openDrawer(p.id);
                    }}
                    type="button"
                  >
                    {isApplied ? "✓ Aplicación enviada" : "Ver detalle y aplicar →"}
                  </button>
                </article>
              );
            })
          )}
        </div>
      </main>


      <div className={`overlay ${overlayOpen ? "open" : ""}`} id="overlay" onClick={closeDrawer} />


      <aside className={`drawer ${drawerOpen ? "open" : ""}`} id="drawer">
        <button className="drawer-close" onClick={closeDrawer} type="button">
          ✕
        </button>

        <div id="drawer-content">
          {!currentProblem ? null : (
            <>
              {drawerStep === 0 && (
                <>
                  <div className="drawer-cat">
                    <span className="tag-dot"></span>
                    {currentProblem.catLabel} · {currentProblem.city}
                    {currentProblem.urgent ? <span className="urgent-inline">URGENTE</span> : null}
                  </div>

                  <h2 className="drawer-title">"{currentProblem.title}"</h2>
                  <p className="drawer-desc">{currentProblem.desc}</p>

                  <div className="drawer-metrics">
                    <div className="metric">
                      <span className="metric-val">S/. {currentProblem.budget.toLocaleString()}</span>
                      <span className="metric-label">Presupuesto</span>
                    </div>
                    <div className="metric">
                      <span className="metric-val">{currentProblem.weeks} sem.</span>
                      <span className="metric-label">Duración</span>
                    </div>
                    <div className="metric">
                      <span className="metric-val">{currentProblem.daysLeft}d</span>
                      <span className="metric-label">Restantes</span>
                    </div>
                    <div className="metric">
                      <span className="metric-val">{currentProblem.scoreMin}+</span>
                      <span className="metric-label">Score mín.</span>
                    </div>
                  </div>

                  <p className="section-label">Habilidades requeridas</p>
                  <div className="card-tags" style={{ marginBottom: "1.5rem" }}>
                    {currentProblem.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="section-label">Competencia actual</p>
                  {(() => {
                    const pct = Math.round((currentProblem.applicants / currentProblem.maxApplicants) * 100);
                    return (
                      <div className="applicants" style={{ marginBottom: "1.5rem" }}>
                        <div className="app-label">
                          <span>{currentProblem.applicants} aplicaron</span>
                          <span>{pct}% del cupo</span>
                        </div>
                        <div className="bar-track">
                          <div className="bar-fill" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="how-box">
                    <p className="section-label" style={{ marginBottom: ".8rem" }}>
                      ¿Cómo funciona?
                    </p>
                    {[
                      "Envías tu propuesta de solución en 3 pasos simples.",
                      "La empresa revisa los perfiles con Score más alto primero.",
                      "Si te seleccionan, Activa facilita el contrato y el pago.",
                      "Al completar el proyecto, tu Score sube automáticamente.",
                    ].map((t, i) => (
                      <div className="how-item" key={i}>
                        <span className="how-num">{i + 1}</span>
                        <span className="how-text">{t}</span>
                      </div>
                    ))}
                  </div>

                  {applied.includes(currentProblem.id) ? (
                    <div className="applied-notice">✓ Ya aplicaste a este problema. Te contactaremos pronto.</div>
                  ) : (
                    <button className="drawer-cta" onClick={() => setDrawerStep(1)} type="button">
                      Aplicar a este problema →
                    </button>
                  )}
                </>
              )}

              {drawerStep === 1 && (
                <>
                  <button className="back-btn" onClick={() => setDrawerStep(0)} type="button">
                    ← Volver al detalle
                  </button>

                  <h2 className="drawer-title" style={{ fontSize: "1.4rem", marginBottom: ".5rem" }}>
                    Tu propuesta de solución
                  </h2>

                  <p className="drawer-desc" style={{ marginBottom: "2rem" }}>
                    Describe cómo resolverías este problema. La empresa verá esto junto a tu Score Plateado.
                  </p>

                  <div className="form-group">
                    <label className="f-label">¿Cómo abordarías este problema?</label>
                    <textarea
                      className="f-textarea"
                      rows="5"
                      placeholder="Describe tu enfoque, metodología o experiencia relevante..."
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="f-label">¿Cuándo puedes empezar?</label>
                    <div className="radio-group">
                      {["Esta semana", "En 2 semanas", "En un mes"].map((opt) => (
                        <button
                          key={opt}
                          className={`radio-btn ${availability === opt ? "active" : ""}`}
                          onClick={() => setAvailability(opt)}
                          type="button"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="f-label">Tu correo de contacto</label>
                    <input
                      className="f-input"
                      type="email"
                      placeholder="tu@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <button className="drawer-cta" onClick={submitApplication} style={{ marginTop: "1rem" }} type="button">
                    Enviar propuesta →
                  </button>
                </>
              )}

              {drawerStep === 2 && (
                <div className="success">
                  <span className="success-icon">⭐</span>
                  <h2 className="success-title">¡Propuesta enviada!</h2>
                  <p className="success-text">
                    Tu propuesta para <strong>"{currentProblem.title}"</strong> fue recibida. Te contactaremos en los próximos 3 días hábiles.
                  </p>
                  <div className="success-score">Tu Score sube automáticamente cuando completes el proyecto</div>
                  <button className="drawer-cta" onClick={closeDrawer} type="button">
                    Ver más oportunidades →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </aside>

      <footer>
        <div className="footer-logo">
          ACTIVA<span>PERÚ</span>
        </div>
        <span className="footer-text">© 2026 · Hackatón Plateada 50+ · Emprende UP × BID Lab</span>
        <Link className="footer-link" to="/">← Volver al inicio</Link>
      </footer>
    </>
  );
}
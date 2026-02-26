import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./academy.css";


const IMGS = {
  whatsapp_perfil:
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
  whatsapp_catalogo:
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
  whatsapp_grupos:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
  ig_perfil:
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80",
  ig_publicacion:
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
  ig_contenido:
    "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80",
  fb_pagina:
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
  tiktok_intro:
    "https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?w=600&q=80",
  tiktok_grabar:
    "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&q=80",
  tiktok_ideas:
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80",
};

const CONTENT = [

  {
    id: 1,
    type: "leccion",
    platform: "whatsapp",
    platformLabel: "WhatsApp Business",
    platformTag: "tag-wa",
    icon: "💬",
    img: IMGS.whatsapp_perfil,
    title: "Cómo configurar tu perfil de WhatsApp Business desde cero",
    duration: "8 min",
    level: "basico",
    desc: "Aprende a transformar tu WhatsApp personal en una herramienta profesional de ventas. Configuraremos tu perfil, horarios, mensajes automáticos y catálogo de productos.",
    tags: ["Perfil", "Catálogo", "Mensajes automáticos"],
    featured: true,
    steps: [
      "Descarga WhatsApp Business desde tu tienda de apps (es gratis).",
      "Ve a Configuración → Herramientas para la empresa → Perfil de empresa.",
      "Agrega foto de tu negocio, descripción, dirección y horario.",
      "Crea tu mensaje de bienvenida: ve a Mensaje de bienvenida y actívalo.",
      "Activa el mensaje de ausencia para cuando no estés disponible.",
    ],
  },
  {
    id: 2,
    type: "leccion",
    platform: "whatsapp",
    platformLabel: "WhatsApp Business",
    platformTag: "tag-wa",
    icon: "💬",
    img: IMGS.whatsapp_catalogo,
    title: "Crea tu catálogo de productos o servicios en WhatsApp",
    duration: "12 min",
    level: "basico",
    desc: "El catálogo de WhatsApp Business es tu tienda virtual gratuita. Aprende a subir tus productos o servicios con fotos, precios y descripción para que tus clientes compren sin salir del chat.",
    tags: ["Catálogo", "Ventas", "Fotos"],
    featured: false,
    steps: [
      "Ve a Herramientas para la empresa → Catálogo.",
      "Toca el ícono + para agregar tu primer producto o servicio.",
      "Sube una foto clara (de día, fondo blanco si puedes).",
      "Escribe el nombre, precio y una descripción breve pero convincente.",
      "Comparte el enlace del catálogo en tu estado de WhatsApp diariamente.",
    ],
  },
  {
    id: 3,
    type: "guia",
    platform: "whatsapp",
    platformLabel: "WhatsApp Business",
    platformTag: "tag-wa",
    icon: "💬",
    img: IMGS.whatsapp_grupos,
    title: "Guía: Lista de difusión vs. Grupos — ¿cuándo usar cada uno?",
    duration: "6 min lectura",
    level: "intermedio",
    desc: "Muchos emprendedores confunden las listas de difusión con los grupos. Esta guía te explica cuándo usar cada herramienta para no saturar a tus clientes y vender más.",
    tags: ["Estrategia", "Listas", "Grupos"],
    featured: false,
    steps: [
      "Lista de difusión: envía el mismo mensaje a múltiples contactos sin que se vean entre ellos.",
      "Úsala para: promociones, novedades, recordatorios de pago.",
      "Grupo: todos los miembros se ven y pueden responder.",
      "Úsalo para: comunidades de clientes, soporte, grupos VIP.",
      "Regla de oro: nunca uses grupos para ventas masivas. Perderás contactos.",
    ],
  },

  {
    id: 4,
    type: "leccion",
    platform: "instagram",
    platformLabel: "Instagram & Facebook",
    platformTag: "tag-ig",
    icon: "📸",
    img: IMGS.ig_perfil,
    title: "Convierte tu Instagram personal en perfil de empresa en 5 minutos",
    duration: "5 min",
    level: "basico",
    desc: "El perfil de empresa en Instagram te da acceso a estadísticas, botón de contacto y herramientas de publicidad. Te mostramos cómo hacer el cambio sin perder tus seguidores actuales.",
    tags: ["Perfil empresa", "Configuración", "Gratis"],
    featured: true,
    steps: [
      "Ve a tu perfil → menú (☰) → Configuración y privacidad.",
      'Toca "Tipo de cuenta y herramientas" → "Cambiar a cuenta profesional".',
      'Elige "Empresa" y selecciona tu categoría (Emprendedor, Consultor, etc.).',
      "Conecta tu página de Facebook si tienes una (opcional pero recomendado).",
      "Completa tu bio con qué haces, a quién ayudas y cómo contactarte.",
    ],
  },
  {
    id: 5,
    type: "leccion",
    platform: "instagram",
    platformLabel: "Instagram & Facebook",
    platformTag: "tag-ig",
    icon: "📸",
    img: IMGS.ig_publicacion,
    title: "Tu primera publicación de negocio en Instagram: qué poner y cómo escribirlo",
    duration: "15 min",
    level: "basico",
    desc: "La primera publicación es la más difícil. Te damos una fórmula probada para presentar tu negocio de forma auténtica, contar tu historia y convertir seguidores en clientes.",
    tags: ["Contenido", "Redacción", "Primera vez"],
    featured: false,
    steps: [
      'Empieza con tu historia: "Después de X años haciendo Y, decidí..."',
      "Explica el problema que resuelves, no solo lo que vendes.",
      "Incluye una foto tuya trabajando — la autenticidad vende más que lo perfecto.",
      "Cierra con una pregunta o llamada a la acción clara.",
      "Usa entre 5 y 10 hashtags relevantes al final del texto.",
    ],
  },
  {
    id: 6,
    type: "guia",
    platform: "instagram",
    platformLabel: "Instagram & Facebook",
    platformTag: "tag-ig",
    icon: "📸",
    img: IMGS.ig_contenido,
    title: "Guía: Los 7 tipos de contenido que funcionan para emprendedores 50+",
    duration: "8 min lectura",
    level: "intermedio",
    desc: "No necesitas bailar ni hacer sketches. Hay 7 formatos de contenido que conectan con tu audiencia y muestran tu experiencia sin hacerte sentir fuera de lugar.",
    tags: ["Estrategia", "Ideas", "Formatos"],
    featured: false,
    steps: [
      "Antes y después: muestra un problema y cómo lo resolviste.",
      "Tips de tu industria: comparte una cosa que aprendiste en 30 años.",
      "Proceso de trabajo: muestra cómo haces lo que haces, paso a paso.",
      "Testimonios: pide a un cliente que grabe un video de 30 segundos.",
      "Preguntas frecuentes: responde las 3 preguntas que más te hacen.",
      "Tu historia: cuéntale a tu audiencia por qué empezaste este negocio.",
      "Detrás de escena: muestra tu espacio de trabajo y tus herramientas.",
    ],
  },
  {
    id: 7,
    type: "leccion",
    platform: "instagram",
    platformLabel: "Instagram & Facebook",
    platformTag: "tag-ig",
    icon: "📸",
    img: IMGS.fb_pagina,
    title: "Facebook para negocios: cómo crear y optimizar tu página de empresa",
    duration: "20 min",
    level: "basico",
    desc: "Facebook sigue siendo la red con más usuarios mayores de 45 años en Perú. Aprende a crear una página profesional y publicar contenido que venda.",
    tags: ["Facebook", "Página empresa", "Seguidores"],
    featured: false,
    steps: [
      "Ve a facebook.com/pages/create desde tu cuenta personal.",
      'Elige "Empresa o marca" e ingresa el nombre de tu negocio.',
      "Sube tu foto de perfil (tu logo o foto tuya) y foto de portada.",
      "Completa toda la información: horario, teléfono, dirección, sitio web.",
      "Invita a tus contactos de Facebook a seguir la página — empieza con 30 personas cercanas.",
    ],
  },

  {
    id: 8,
    type: "leccion",
    platform: "tiktok",
    platformLabel: "TikTok",
    platformTag: "tag-tiktok",
    icon: "🎵",
    img: IMGS.tiktok_intro,
    title: "TikTok para emprendedores 50+: por qué es la red más poderosa ahora mismo",
    duration: "10 min",
    level: "basico",
    desc: "TikTok no es solo para jóvenes que bailan. Es el motor de búsqueda más usado por menores de 40 años y la plataforma con mayor alcance orgánico gratuito.",
    tags: ["Introducción", "Por qué TikTok", "Alcance"],
    featured: true,
    steps: [
      "Descarga TikTok y crea tu cuenta con tu correo de negocio.",
      "Ve a Perfil → edita perfil → escribe una bio clara de tu negocio.",
      "Tu primer contenido no tiene que ser perfecto. Tiene que ser auténtico.",
      'Habla directo a cámara: "Soy X, tengo Y años de experiencia en Z".',
      "Publica 3 veces por semana mínimo durante el primer mes.",
    ],
  },
  {
    id: 9,
    type: "leccion",
    platform: "tiktok",
    platformLabel: "TikTok",
    platformTag: "tag-tiktok",
    icon: "🎵",
    img: IMGS.tiktok_grabar,
    title: "Cómo crear tu primer contenido para TikTok sin sentirte incómodo",
    duration: "18 min",
    level: "basico",
    desc: "El mayor obstáculo para emprendedores 50+ en TikTok es sentirse fuera de lugar. Esta lección te da técnicas prácticas para grabar con confianza desde tu teléfono.",
    tags: ["Grabar", "Confianza", "Primer contenido"],
    featured: false,
    steps: [
      "Busca buena luz natural: siéntate frente a una ventana durante el día.",
      "Apoya el teléfono en algo estable — no lo sostengas con la mano.",
      "Habla despacio y claro. Tu audiencia tiene 35-50 años, no 15.",
      "Graba en clips de 30-60 segundos para empezar. No necesitas más.",
      "Si te equivocas, para y vuelve a empezar. No edites, solo graba otra vez.",
    ],
  },
  {
    id: 10,
    type: "guia",
    platform: "tiktok",
    platformLabel: "TikTok",
    platformTag: "tag-tiktok",
    icon: "🎵",
    img: IMGS.tiktok_ideas,
    title: "Guía: 10 ideas de contenido para TikTok si tienes experiencia",
    duration: "5 min lectura",
    level: "intermedio",
    desc: "Nunca te quedes sin ideas. Estas 10 fórmulas funcionan especialmente bien para profesionales con experiencia y generan confianza instantánea con tu audiencia.",
    tags: ["Ideas", "Fórmulas", "Contenido"],
    featured: false,
    steps: [
      '"El error más caro que cometí en mis 20 años de negocio fue..."',
      '"Lo que nadie te dice sobre [tu industria]"',
      '"Tip rápido: cómo resolví [problema común] en 3 pasos"',
      '"Antes de contratar un [tu servicio], mira este contenido"',
      '"Un día en mi trabajo" — 60 segundos de tu jornada real',
      '"Respondo la pregunta que más me hacen sobre [tu tema]"',
      '"La diferencia entre un [profesional bueno] y uno mediocre es..."',
      '"Por qué cobro lo que cobro" — transparencia que genera confianza',
      '"Cometí este error a los 40 — no lo cometas tú"',
      '"Mi consejo para alguien empezando en [tu industria]"',
    ],
  },
];

const ARTICLES = [
  {
    id: "a1",
    platform: "whatsapp",
    platformLabel: "WhatsApp Business",
    icon: "💬",
    title: "Cómo escribir mensajes que venden sin parecer spam",
    desc: "La diferencia entre un mensaje que convierte y uno que molesta está en 3 elementos clave que te enseñamos aquí.",
    time: "4 min",
  },
  {
    id: "a2",
    platform: "instagram",
    platformLabel: "Instagram",
    icon: "📸",
    title: "La bio perfecta para un emprendedor 50+ en Instagram",
    desc: "Tu bio es lo primero que ve un potencial cliente. Te damos una fórmula de 4 líneas que funciona.",
    time: "3 min",
  },
  {
    id: "a3",
    platform: "tiktok",
    platformLabel: "TikTok",
    icon: "🎵",
    title: "Cómo usar los hashtags en TikTok para que te encuentren tus clientes",
    desc: "No son los mismos hashtags que en Instagram. Aprende la estrategia correcta para 2026.",
    time: "5 min",
  },
  {
    id: "a4",
    platform: "whatsapp",
    platformLabel: "WhatsApp Business",
    icon: "💬",
    title: "Plantillas de mensajes de venta para WhatsApp Business",
    desc: "12 plantillas listas para copiar y adaptar a tu negocio: seguimiento, promociones, confirmaciones y más.",
    time: "6 min",
  },
  {
    id: "a5",
    platform: "instagram",
    platformLabel: "Instagram & Facebook",
    icon: "📸",
    title: "Cómo responder comentarios negativos en redes sin dañar tu reputación",
    desc: "Los comentarios difíciles son oportunidades. Te enseñamos exactamente qué escribir.",
    time: "4 min",
  },
  {
    id: "a6",
    platform: "tiktok",
    platformLabel: "TikTok",
    icon: "🎵",
    title: "El mejor horario para publicar en TikTok si tu cliente está en Perú",
    desc: "Los datos muestran que publicar a ciertas horas puede duplicar tu alcance. Aquí están los números.",
    time: "3 min",
  },
];

function cap(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : "";
}

export default function Academy() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("todo");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState("content"); 
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featured = useMemo(() => CONTENT.filter((c) => c.featured), []);
  const featuredMain = featured[0] || null;
  const featuredSide = featured.slice(1);

  const tabs = [
    { key: "todo", label: "Todo", icon: "✦" },
    { key: "tiktok", label: "TikTok", icon: "🎵" },
    { key: "instagram", label: "Instagram & Facebook", icon: "📸" },
    { key: "whatsapp", label: "WhatsApp Business", icon: "💬" },
    { key: "guias", label: "Guías Escritas", icon: "📖" },
  ];

  const modules = useMemo(() => {
    if (currentTab === "guias") return [];
    return [
      {
        platform: "tiktok",
        icon: "🎵",
        title: "TikTok para tu Negocio",
        color: "mc-tiktok",
        lessons: CONTENT.filter((c) => c.platform === "tiktok"),
        tags: ["Videos cortos", "Algoritmo", "Autenticidad"],
      },
      {
        platform: "instagram",
        icon: "📸",
        title: "Instagram & Facebook Negocios",
        color: "mc-ig",
        lessons: CONTENT.filter((c) => c.platform === "instagram"),
        tags: ["Perfil empresa", "Reels", "Historias"],
      },
      {
        platform: "whatsapp",
        icon: "💬",
        title: "WhatsApp Business Pro",
        color: "mc-wa",
        lessons: CONTENT.filter((c) => c.platform === "whatsapp"),
        tags: ["Catálogo", "Automatización", "Ventas"],
      },
    ].filter((m) => currentTab === "todo" || m.platform === currentTab);
  }, [currentTab]);

  const lessonsForTab = useMemo(() => {
    if (currentTab === "todo") return [];
    if (currentTab === "guias") return CONTENT.filter((c) => c.type === "guia");
    return CONTENT.filter((c) => c.platform === currentTab);
  }, [currentTab]);

  const articlesForTab = useMemo(() => {
    if (currentTab === "todo") return ARTICLES;
    if (currentTab === "guias") return ARTICLES;
    return ARTICLES.filter((a) => a.platform === currentTab);
  }, [currentTab]);

  const openContent = (c) => {
    setSelectedContent(c);
    setSelectedArticle(null);
    setModalKind("content");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openArticle = (a) => {
    setSelectedArticle(a);
    setSelectedContent(null);
    setModalKind("article");
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContent(null);
    setSelectedArticle(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && modalOpen) closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  const scrollToContent = () => {
    const el = document.getElementById("academy-content");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <button className="nav-back" type="button" onClick={() => navigate("/")}>
          ← Inicio
        </button>
        <div className="nav-logo">
          ACTIVA<span> Academy</span>
        </div>
        <div className="nav-badge">GRATUITO · 50+</div>
      </nav>


<section className="hero">
  <div className="hero-bg"></div>
  <div className="hero-grid"></div>

  <div className="hero-container">
    <div className="hero-inner">

      <div className="hero-left">
        <div className="eyebrow">Academia Digital Plateada</div>

        <h1 className="hero-title">
          Tu negocio merece
          <br />
          <em>ser visto en redes.</em>
        </h1>

        <p className="hero-sub">
          Aprende a usar TikTok, Instagram, WhatsApp Business y más para
          promocionar tus servicios y emprendimientos. Explicado paso a paso,
          sin tecnicismos, diseñado para ti.
        </p>

        <div className="hero-platforms">
          <div className="plat-badge plat-tiktok">
            <span className="plat-icon">🎵</span> TikTok
          </div>
          <div className="plat-badge plat-ig">
            <span className="plat-icon">📸</span> Instagram & Facebook
          </div>
          <div className="plat-badge plat-wa">
            <span className="plat-icon">💬</span> WhatsApp Business
          </div>
        </div>

        <button className="hero-cta" type="button" onClick={scrollToContent}>
          Empezar a aprender →
        </button>
      </div>


      <div className="hero-right-wrapper">
        <div className="hero-right">

          <div className="hero-stat">
            <div className="hero-stat-num">24</div>
            <div className="hero-stat-label">
              Lecciones disponibles
              <br />
              sin costo
            </div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-num">3</div>
            <div className="hero-stat-label">
              Plataformas cubiertas
              <br />
              paso a paso
            </div>
          </div>

          <div className="hero-stat">
            <div className="hero-stat-num">+50</div>
            <div className="hero-stat-label">
              Diseñado para
              <br />
              tu generación
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</section>


      <div className="tabs-wrap">
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`tab ${currentTab === t.key ? "active" : ""}`}
              onClick={() => {
                setCurrentTab(t.key);
                scrollToContent();
              }}
            >
              <span className="tab-icon">{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="main" id="academy-content">

        {currentTab === "todo" && (
          <div id="section-featured">
            <div className="section-header">
<p className="section-label">
  {"//"} Empieza aquí
</p>
              <h2 className="section-title">
                Lecciones <em>más populares</em>
              </h2>
              <p className="section-sub">
                Estas son las lecciones que más han transformado el negocio de
                profesionales como tú.
              </p>
            </div>

            <div className="featured-grid">
              {featuredMain && (
                <div
                  className="featured-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openContent(featuredMain)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? openContent(featuredMain) : null
                  }
                >
                  <Thumb content={featuredMain} />
                  <div className="fc-body">
                    <div className="fc-type">
                      {featuredMain.type === "guia" ? "📖 GUÍA" : "📚 LECCIÓN"}
                    </div>
                    <h3 className="fc-title">{featuredMain.title}</h3>
                    <p className="fc-desc">{featuredMain.desc}</p>
                    <div className="fc-meta">
                      <span className="fc-meta-item">⏱ {featuredMain.duration}</span>
                      <span className={`fc-level level-${featuredMain.level}`}>
                        {cap(featuredMain.level)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="featured-side">
                {featuredSide.map((c) => (
                  <div
                    key={c.id}
                    className="featured-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => openContent(c)}
                    onKeyDown={(e) => (e.key === "Enter" ? openContent(c) : null)}
                  >
                    <Thumb content={c} tall />
                    <div className="fc-body">
                      <div className="fc-type">
                        {c.type === "guia" ? "📖 GUÍA" : "📚 LECCIÓN"}
                      </div>
                      <h3 className="fc-title fc-title-sm">{c.title}</h3>
                      <div className="fc-meta">
                        <span className="fc-meta-item">⏱ {c.duration}</span>
                        <span className={`fc-level level-${c.level}`}>
                          {cap(c.level)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {currentTab !== "guias" && (
          <div className="modules-section" id="section-modules">
            <div className="modules-label">Aprende por plataforma</div>
            <div className="modules-grid">
              {modules.map((m, idx) => (
                <div
                  key={m.platform}
                  className={`module-card ${m.color}`}
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  role="button"
                  tabIndex={0}
                  onClick={() => setCurrentTab(m.platform)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? setCurrentTab(m.platform) : null
                  }
                >
                  <span className="mc-icon">{m.icon}</span>
                  <div className="mc-num">
                    MÓDULO {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h3 className="mc-title">{m.title}</h3>
                  <p className="mc-lessons">
                    {m.lessons.length} lecciones · Videos + Guías
                  </p>
                  <div className="mc-tags">
                    {m.tags.map((t) => (
                      <span key={t} className="mc-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {currentTab === "todo" && (
          <div className="tips-banner">
            <div>
              <h3 className="tips-title">
                ¿Por dónde empezar si nunca usaste redes para tu negocio?
              </h3>
              <p className="tips-sub">Si eres nuevo en esto, te recomendamos este camino:</p>
              <div className="tips-list">
                <div className="tip-item">
                  <span className="tip-dot"></span>
                  <span>
                    Primero: configura tu <strong>WhatsApp Business</strong> — es la más fácil y la que más clientes ya usan.
                  </span>
                </div>
                <div className="tip-item">
                  <span className="tip-dot"></span>
                  <span>
                    Segundo: crea tu perfil de <strong>Instagram</strong> para que te encuentren visualmente.
                  </span>
                </div>
                <div className="tip-item">
                  <span className="tip-dot"></span>
                  <span>
                    Tercero: cuando te sientas cómodo, explora <strong>TikTok</strong> — tiene el mayor alcance orgánico.
                  </span>
                </div>
              </div>
            </div>
            <button className="tips-cta" type="button" onClick={() => openContent(CONTENT[0])}>
              Ver primera lección →
            </button>
          </div>
        )}


        {currentTab !== "todo" && (
          <div id="lessons-section">
            <div className="section-header">
<p className="section-label">
  {"//"} {lessonsForTab.length} lecciones disponibles
</p>
              <h2 className="section-title">
                Aprende a tu <em>propio ritmo</em>
              </h2>
            </div>

            <div className="lessons-grid">
              {lessonsForTab.map((c) => (
                <div
                  key={c.id}
                  className="featured-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => openContent(c)}
                  onKeyDown={(e) => (e.key === "Enter" ? openContent(c) : null)}
                >
                  <Thumb content={c} compact />
                  <div className="fc-body">
                    <h3 className="fc-title">{c.title}</h3>
                    <p className="fc-desc fc-desc-clamp">{c.desc}</p>
                    <div className="fc-meta">
                      <span className={`fc-level level-${c.level}`}>{cap(c.level)}</span>
                      <span className="fc-meta-item">⏱ {c.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div id="section-articles">
          <div className="section-header">
<div className="section-label">
  {"//"} Guías paso a paso
</div>
            <h2 className="section-title">
              Lee a tu <em>propio ritmo</em>
            </h2>
            <p className="section-sub">
              Guías detalladas con capturas de pantalla y ejemplos reales para cada plataforma.
            </p>
          </div>

          <div className="articles-grid">
            {articlesForTab.map((a, i) => (
              <div
                key={a.id}
                className="article-card"
                style={{ animationDelay: `${i * 0.06}s` }}
                role="button"
                tabIndex={0}
                onClick={() => openArticle(a)}
                onKeyDown={(e) => (e.key === "Enter" ? openArticle(a) : null)}
              >
                <div className="ac-plat">
                  <span className="ac-plat-icon">{a.icon}</span>
                  <span className="ac-plat-name">{a.platformLabel}</span>
                </div>
                <h3 className="ac-title">{a.title}</h3>
                <p className="ac-desc">{a.desc}</p>
                <div className="ac-footer">
                  <span className="ac-time">📖 {a.time}</span>
                  <span className="ac-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>


      <div
        className={`overlay ${modalOpen ? "open" : ""}`}
        onClick={(e) => {
     
          if (e.target.classList.contains("overlay")) closeModal();
        }}
      >
        <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Cerrar">
            ✕
          </button>

          {modalKind === "content" && selectedContent && (
            <ModalContent content={selectedContent} onClose={closeModal} />
          )}

          {modalKind === "article" && selectedArticle && (
            <ModalArticle article={selectedArticle} onClose={closeModal} />
          )}
        </div>
      </div>


      <footer>
        <div className="footer-logo">
          ACTIVA<span>PERÚ</span>
        </div>
        <span className="footer-text">© 2026 · Hackatón Plateada 50+ · Emprende UP × BID Lab</span>
        <button className="footer-link" type="button" onClick={() => navigate("/")}>
          ← Volver al inicio
        </button>
      </footer>
    </>
  );
}



function Thumb({ content, tall = false, compact = false }) {
  const pad = compact ? "58%" : tall ? "45%" : "56.25%";
  return (
    <div className="fc-thumb-inner" style={{ paddingTop: pad }}>
      <img className="fc-img" src={content.img} alt={content.title} loading="lazy" />
      <div className="fc-img-overlay"></div>
      <div className={`fc-platform-tag ${content.platformTag}`}>
        {content.icon} {content.platformLabel}
      </div>
      <div className="fc-duration">{content.duration}</div>
    </div>
  );
}

function ModalContent({ content, onClose }) {
  return (
    <>
      <div className="modal-img">
        <img src={content.img} alt={content.title} />
        <div className="modal-img-overlay"></div>
      </div>

      <div className="modal-body">
        <div className={`modal-platform-tag ${content.platformTag}`}>
          {content.icon} {content.platformLabel}
        </div>

        <h2 className="modal-title">{content.title}</h2>
        <p className="modal-desc">{content.desc}</p>

        <div className="modal-meta">
          <div className="modal-meta-item">
            <span className="modal-meta-label">Duración</span>
            <span className="modal-meta-val">⏱ {content.duration}</span>
          </div>

          <div className="modal-meta-item">
            <span className="modal-meta-label">Nivel</span>
            <span className="modal-meta-val">
              <span className={`fc-level level-${content.level}`}>{cap(content.level)}</span>
            </span>
          </div>

          <div className="modal-meta-item">
            <span className="modal-meta-label">Formato</span>
            <span className="modal-meta-val">{content.type === "guia" ? "📖 Guía" : "📚 Lección"}</span>
          </div>
        </div>

        <div className="modal-steps">
          <div className="modal-steps-title">Lo que aprenderás paso a paso</div>
          {content.steps.map((s, i) => (
            <div className="modal-step" key={i}>
              <span className="ms-num">{i + 1}</span>
              <span className="ms-text">{s}</span>
            </div>
          ))}
        </div>

        <div className="modal-cta-row">
          <button
            className="btn-gold"
            type="button"
            onClick={() => alert("Aquí iniciarías el video o abrirías la guía completa en tu MVP.")}
          >
            {content.type === "guia" ? "Leer guía completa →" : "Comenzar lección →"}
          </button>
          <button className="btn-outline" type="button" onClick={onClose}>
            Volver
          </button>
        </div>
      </div>
    </>
  );
}

function ModalArticle({ article, onClose }) {
  return (
    <div className="modal-body modal-body-article">
      <div className="modal-platform-tag tag-guia">
        {article.icon} {article.platformLabel}
      </div>

      <h2 className="modal-title">{article.title}</h2>
      <p className="modal-desc">{article.desc}</p>

      <div className="modal-meta">
        <div className="modal-meta-item">
          <span className="modal-meta-label">Tiempo de lectura</span>
          <span className="modal-meta-val">📖 {article.time}</span>
        </div>
        <div className="modal-meta-item">
          <span className="modal-meta-label">Formato</span>
          <span className="modal-meta-val">Guía escrita</span>
        </div>
      </div>

      <div className="modal-cta-row">
        <button
          className="btn-gold"
          type="button"
          onClick={() => alert("Próximamente.")}
        >
          Leer artículo completo →
        </button>
        <button className="btn-outline" type="button" onClick={onClose}>
          Volver
        </button>
      </div>
    </div>
  );
}
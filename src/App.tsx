import { useState, useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const T = {
  en: {
    available: "available for projects",
    role: "DevOps & Backend Engineer · Tashkent, UZ",
    tagline:
      "I build infrastructure that doesn't break at 3am. Backend systems, CI/CD pipelines, cloud deployments — from code to production.",
    viewWork: "View work",
    contactBtn: "Get in touch",
    nav: {
      about: "about",
      stack: "stack",
      projects: "projects",
      contact: "contact",
    },
    aboutLabel: "about me",
    aboutTitle: "WHO I AM",
    aboutP1:
      "Backend & DevOps engineer based in Tashkent, Uzbekistan. I focus on reliable infrastructure, scalable APIs, and clean deployment pipelines.",
    aboutP2:
      "I write frontend too — but my passion lives in the server room. Docker, Linux, CI/CD, cloud platforms, and everything that keeps services alive 24/7.",
    years: "years exp.",
    projectsStat: "projects shipped",
    based: "Tashkent, UZ",
    uptime: "target uptime",
    stackLabel: "tech stack",
    stackTitle: "TOOLS I USE",
    projectsLabel: "work",
    projectsTitle: "SELECTED PROJECTS",
    loading: "loading projects...",
    visitSite: "Visit site",
    contactLabel: "contact",
    contactTitle1: "LET'S",
    contactTitle2: "BUILD",
    contactTitle3: "SOMETHING",
    contactSub:
      "Open to freelance, full-time, and interesting DevOps / Backend challenges. Based in Tashkent — working globally.",
    copied: "✓ copied!",
    footer: "Tashkent, UZ · DevOps & Backend Engineer",
    formTitle: "Leave a Request",
    formName: "Your name",
    formTg: "Telegram username",
    formComment: "Message / comment",
    formSend: "Send request",
    formSending: "Sending...",
    formDone: "✓ Request sent!",
    formError: "Error. Try again.",
  },
  ru: {
    available: "открыт для проектов",
    role: "DevOps & Backend инженер · Ташкент, UZ",
    tagline:
      "Строю инфраструктуру которая не ломается в 3 ночи. Backend системы, CI/CD пайплайны, облачные деплои — от кода до продакшена.",
    viewWork: "Посмотреть работы",
    contactBtn: "Написать мне",
    nav: {
      about: "обо мне",
      stack: "стек",
      projects: "проекты",
      contact: "контакт",
    },
    aboutLabel: "обо мне",
    aboutTitle: "КТО Я",
    aboutP1:
      "Backend & DevOps инженер из Ташкента, Узбекистан. Специализируюсь на надёжной инфраструктуре, масштабируемых API и чистых деплой-пайплайнах.",
    aboutP2:
      "Умею писать фронтенд — но душа лежит к серверной части. Docker, Linux, CI/CD, облака и всё что держит сервисы живыми 24/7.",
    years: "лет опыта",
    projectsStat: "проектов сдано",
    based: "Ташкент, UZ",
    uptime: "целевой аптайм",
    stackLabel: "стек технологий",
    stackTitle: "ЧЕМ ПОЛЬЗУЮСЬ",
    projectsLabel: "работы",
    projectsTitle: "ПРОЕКТЫ",
    loading: "загружаем проекты...",
    visitSite: "Открыть сайт",
    contactLabel: "контакт",
    contactTitle1: "ДАВАЙ",
    contactTitle2: "СТРОИТЬ",
    contactTitle3: "ВМЕСТЕ",
    contactSub:
      "Открыт к фрилансу, full-time и интересным DevOps / Backend задачам. Работаю из Ташкента — дистанционно по всему миру.",
    copied: "✓ скопировано!",
    footer: "Ташкент, UZ · DevOps & Backend инженер",
    formTitle: "Оставить заявку",
    formName: "Ваше имя",
    formTg: "Ваш Telegram ник",
    formComment: "Сообщение / комментарий",
    formSend: "Отправить заявку",
    formSending: "Отправляем...",
    formDone: "✓ Заявка отправлена!",
    formError: "Ошибка. Попробуйте ещё раз.",
  },
  uz: {
    available: "loyihalar uchun ochiqman",
    role: "DevOps & Backend muhandis · Uzbekistan",
    tagline:
      "Tunda buzilmaydigan infratuzilma quraman. Backend tizimlar, CI/CD pipeline'lar, cloud deploy — koddan productiongacha.",
    viewWork: "Ishlarni ko'rish",
    contactBtn: "Bog'lanish",
    nav: {
      about: "haqimda",
      stack: "texnologiyalar",
      projects: "loyihalar",
      contact: "aloqa",
    },
    aboutLabel: "men haqimda",
    aboutTitle: "MEN KIMMAN",
    aboutP1:
      "O'zbekistondan backend & DevOps muhandisiman. Ishonchli infratuzilma, kengayadigan API va aniq deploy pipeline'lar — mening yo'nalishim.",
    aboutP2:
      "Frontend yoza olaman — lekin yuragim server tomonida. Docker, Linux, CI/CD, cloud platformalar va xizmatlarni 24/7 tirik saqlash — shu mening dunyom.",
    years: "yil tajriba",
    projectsStat: "loyiha topshirildi",
    based: "Uzbekistan",
    uptime: "maqsad uptime",
    stackLabel: "texnologiyalar",
    stackTitle: "NIMA ISHLATAMAN",
    projectsLabel: "ishlar",
    projectsTitle: "LOYIHALAR",
    loading: "loyihalar yuklanmoqda...",
    visitSite: "Saytga o'tish",
    contactLabel: "aloqa",
    contactTitle1: "KELING",
    contactTitle2: "BIRGA",
    contactTitle3: "QURAYLIQ",
    contactSub:
      "Freelance, full-time va qiziqarli DevOps / Backend vazifalariga ochiqman. Uzbekistan — dunyo bo'ylab masofaviy ishlayman.",
    copied: "✓ nusxalandi!",
    footer: "Uzbekistan · DevOps & Backend muhandis",
    formTitle: "Ariza qoldirish",
    formName: "Ismingiz",
    formTg: "Telegram nikiingiz",
    formComment: "Xabar / izoh",
    formSend: "Ariza yuborish",
    formSending: "Yuborilmoqda...",
    formDone: "✓ Ariza yuborildi!",
    formError: "Xato. Qayta urining.",
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────
type CatKey = "backend" | "devops" | "cloud" | "frontend";

interface StackItem {
  name: string;
  level: number;
  cat: CatKey;
}

interface Project {
  id?: number;
  title?: string;
  url?: string;
  image?: string;
  [key: string]: string | number | boolean | undefined;
}

// ─── Stack ────────────────────────────────────────────────────────────────────
const STACK: StackItem[] = [
  { name: "Node.js / NestJS / Express", level: 90, cat: "backend" },
  { name: "MySQL / PostgreSQL / MongoDB", level: 85, cat: "backend" },
  { name: "TypeScript / JavaScript", level: 88, cat: "backend" },
  { name: "Docker / Docker Compose", level: 88, cat: "devops" },
  { name: "Linux / Bash", level: 90, cat: "devops" },
  { name: "GitHub Actions / CI-CD", level: 85, cat: "devops" },
  { name: "Nginx", level: 83, cat: "devops" },
  { name: "VPS / VDS", level: 85, cat: "devops" },
  { name: "AWS", level: 72, cat: "cloud" },
  { name: "React / Angular", level: 75, cat: "frontend" },
];

const CAT_COLORS: Record<CatKey, string> = {
  backend: "#6eb5f0",
  devops: "#c8f06e",
  cloud: "#f0b86e",
  frontend: "#c06ef0",
};
const CATS = ["all", "backend", "devops", "cloud", "frontend"];
const NAV_KEYS = ["about", "stack", "projects", "contact"];
const API_URL = import.meta.env.VITE_API_URL;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function useInView(
  ref: React.RefObject<Element | null>,
  threshold = 0.1,
): boolean {
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setV(true);
      },
      { threshold },
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function FadeIn({
  children,
  delay = 0,
  style = {},
}: {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(22px)",
        transition: `opacity .65s ease ${delay}ms, transform .65s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang, setLang] = useState("ru");
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [stackFilter, setStackFilter] = useState("all");
  const cursorRef = useRef<HTMLDivElement>(null);
  const t = T[lang as keyof typeof T];

  // fetch projects
  useEffect(() => {
    setLoadingProjects(true);
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoadingProjects(false));
  }, []);

  // cursor
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  // active section
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV_KEYS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const filteredStack =
    stackFilter === "all" ? STACK : STACK.filter((s) => s.cat === stackFilter);

  return (
    <>
      <div ref={cursorRef} className="cursor" />

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" onClick={() => setMenuOpen(false)}>
          {NAV_KEYS.map((k) => (
            <a key={k} href={`#${k}`}>
              {t.nav[k as keyof typeof t.nav]}
            </a>
          ))}
          <div
            className="lang-switch"
            style={{ marginTop: "2rem" }}
            onClick={(e) => e.stopPropagation()}
          >
            {["en", "ru", "uz"].map((l) => (
              <button
                key={l}
                className={`lang-btn${lang === l ? " active" : ""}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Nav */}
      <nav>
        <a href="#hero" className="nav-logo">
          RU<span>ALISHER</span>
        </a>
        <ul className="nav-links">
          {NAV_KEYS.map((k) => (
            <li key={k}>
              <a href={`#${k}`} className={active === k ? "active" : ""}>
                {t.nav[k as keyof typeof t.nav]}
              </a>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="lang-switch">
            {["en", "ru", "uz"].map((l) => (
              <button
                key={l}
                className={`lang-btn${lang === l ? " active" : ""}`}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="nav-menu-btn" onClick={() => setMenuOpen(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-grid" />
        <div className="hero-blob" />
        <div className="container hero-content">
          <FadeIn>
            <div className="hero-available">
              <span className="dot" />
              {t.available}
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="hero-name">
              RU<span>ALISHER</span>
            </h1>
          </FadeIn>
          <FadeIn delay={160}>
            <div className="hero-role">{t.role}</div>
          </FadeIn>
          <FadeIn delay={220}>
            <p className="hero-tagline">{t.tagline}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="hero-ctas">
              <a href="#projects" className="btn-primary">
                {t.viewWork} →
              </a>
              <a href="#contact" className="btn-ghost">
                {t.contactBtn}
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={400}>
            <div className="hero-badges">
              {[
                "Node.js",
                "NestJS",
                "Docker",
                "Linux",
                "GitHub Actions",
                "PostgreSQL",
                "MongoDB",
                "Nginx",
                "AWS",
                "TypeScript",
              ].map((b) => (
                <span key={b} className="hero-badge">
                  {b}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          scroll
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <div className="about-grid">
            <FadeIn>
              <div className="section-label">{t.aboutLabel}</div>
              <h2 className="section-h">{t.aboutTitle}</h2>
              <p className="about-body">{t.aboutP1}</p>
              <p className="about-body" style={{ marginTop: "1rem" }}>
                {t.aboutP2}
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="stats-grid">
                {[
                  { num: "3+", label: t.years },
                  { num: "8+", label: t.projectsStat },
                  { num: "UZ", label: t.based },
                  { num: "99.9%", label: t.uptime },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="stat"
                    style={{
                      borderLeft:
                        i % 2 !== 0 ? "1px solid var(--border)" : "none",
                      borderTop: i >= 2 ? "1px solid var(--border)" : "none",
                    }}
                  >
                    <div className="stat-num">{s.num}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack">
        <div className="container">
          <FadeIn>
            <div className="section-label">{t.stackLabel}</div>
            <h2 className="section-h">{t.stackTitle}</h2>
          </FadeIn>
          <FadeIn delay={80}>
            <div className="cat-filters">
              {CATS.map((c) => (
                <button
                  key={c}
                  className={`cat-btn${stackFilter === c ? " active" : ""}`}
                  style={
                    stackFilter === c && c !== "all"
                      ? {
                          borderColor: CAT_COLORS[c as CatKey],
                          color: CAT_COLORS[c as CatKey],
                        }
                      : {}
                  }
                  onClick={() => setStackFilter(c)}
                >
                  {c}
                </button>
              ))}
              <div className="cat-legend">
                {Object.entries(CAT_COLORS).map(([k, v]) => (
                  <span key={k} className="legend-item">
                    <span className="legend-dot" style={{ background: v }} />
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
          <StackList items={filteredStack} />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <FadeIn>
            <div className="section-label">{t.projectsLabel}</div>
            <h2 className="section-h">{t.projectsTitle}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            {loadingProjects ? (
              <div className="projects-loading">{t.loading}</div>
            ) : (
              <div className="projects-grid">
                {projects.map((p, i) => (
                  <ProjectCard
                    key={p.id || i}
                    p={p}
                    i={i}
                    lang={lang}
                    visitLabel={t.visitSite}
                  />
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <FadeIn>
            <div className="contact-inner">
              <div className="section-label" style={{ alignSelf: "center" }}>
                {t.contactLabel}
              </div>
              <h2 className="contact-h">
                {t.contactTitle1}
                <br />
                <span className="c-accent">{t.contactTitle2}</span>
                <br />
                {t.contactTitle3}
              </h2>
              <p className="contact-sub">{t.contactSub}</p>
              <div className="contact-socials">
                {[
                  {
                    label: "GitHub",
                    sub: "@rual1sher",
                    url: "https://github.com/rual1sher",
                    color: "#e6edf3",
                    bg: "rgba(230,237,243,0.06)",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Threads",
                    sub: "@rual1sher",
                    url: "https://www.threads.com/@rual1sher",
                    color: "#fff",
                    bg: "rgba(255,255,255,0.05)",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.473 12.01v-.017c.027-3.579.879-6.43 2.525-8.482C5.845 1.207 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.592 12c.024 3.087.711 5.5 2.057 7.166 1.43 1.783 3.631 2.698 6.54 2.717 1.868-.011 3.405-.47 4.57-1.365 1.313-.994 2.148-2.584 2.38-4.457l.013-.103H12.78v-2.069h9.119l-.019.195c-.248 2.713-1.332 4.936-3.137 6.432-1.705 1.414-3.954 2.179-6.498 2.19z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Telegram",
                    sub: "@rual1sher",
                    url: "https://t.me/rual1sher",
                    color: "#29b6f6",
                    bg: "rgba(41,182,246,0.08)",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                    ),
                  },
                  {
                    label: "TG Channel",
                    sub: "rual1sher_code",
                    url: "https://t.me/rual1sher_code",
                    color: "#c8f06e",
                    bg: "rgba(200,240,110,0.07)",
                    icon: (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    className="social-card"
                    style={
                      {
                        "--sc": s.color,
                        "--sc-bg": s.bg,
                      } as React.CSSProperties
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span
                      className="social-card-icon"
                      style={{ color: s.color }}
                    >
                      {s.icon}
                    </span>
                    <span className="social-card-text">
                      <span className="social-card-label">{s.label}</span>
                      <span className="social-card-sub">{s.sub}</span>
                    </span>
                    <span className="social-card-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <ContactForm t={t} />
          </FadeIn>
        </div>
      </section>

      <footer>
        <span>© 2025 rualisher</span>
        <span>{t.footer}</span>
      </footer>
    </>
  );
}
// ─── Contact Form ─────────────────────────────────────────────────────────────
type FormLang = {
  formTitle: string;
  formName: string;
  formTg: string;
  formComment: string;
  formSend: string;
  formSending: string;
  formDone: string;
  formError: string;
};

const TG_BOT_TOKEN = import.meta.env.VITE_TG_BOT_TOKEN;
const TG_CHAT_ID = import.meta.env.VITE_TG_CHAT_ID;

function ContactForm({ t }: { t: FormLang }) {
  const [name, setName] = useState("");
  const [tgNick, setTgNick] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tgNick.trim()) return;
    setStatus("sending");

    const cleanTgNick = tgNick.replace(/^@/, "");

    const text =
      `<b>🚀 НОВОЕ УВЕДОМЛЕНИЕ</b>\n` +
      `<b>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</b>\n` +
      `👤 <b>Клиент:</b> <code>${name}</code>\n` +
      `📱 <b>Telegram:</b> <a href="https://t.me/${cleanTgNick}">@${cleanTgNick}</a>\n` +
      `💬 <b>Комментарий:</b>\n` +
      `<blockquote>${comment || "—"}</blockquote>\n` +
      `<b>⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯</b>\n` +
      `📅 <i>${new Date().toLocaleDateString("uz", { timeZone: "Asia/Tashkent" })}</i>\n` +
      `🔗 <u>rual1sher.uz</u>`;

    try {
      const res = await fetch(
        `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TG_CHAT_ID,
            text,
            parse_mode: "HTML",
          }),
        },
      );
      if (res.ok) {
        setStatus("done");
        setName("");
        setTgNick("");
        setComment("");
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="cf-title">{t.formTitle}</div>
      <div className="cf-fields">
        <input
          className="cf-input"
          type="text"
          placeholder={t.formName}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={status === "sending"}
        />
        <input
          className="cf-input"
          type="text"
          placeholder={`${t.formTg} (@username)`}
          value={tgNick}
          onChange={(e) => setTgNick(e.target.value)}
          required
          disabled={status === "sending"}
        />
        <textarea
          className="cf-input cf-textarea"
          placeholder={t.formComment}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          disabled={status === "sending"}
        />
        <button
          className={`cf-submit${status === "done" ? " done" : status === "error" ? " error" : ""}`}
          type="submit"
          disabled={status === "sending" || status === "done"}
        >
          {status === "sending"
            ? t.formSending
            : status === "done"
              ? t.formDone
              : status === "error"
                ? t.formError
                : t.formSend}
        </button>
      </div>
    </form>
  );
}

function ProjectCard({
  p,
  i,
  visitLabel,
  lang,
}: {
  p: Project;
  i: number;
  visitLabel: string;
  lang: string;
}) {
  const [imgErr, setImgErr] = useState(false);

  // Ищем перевод заголовка. Если в API есть title_ru или title_uz, берем их.
  const title = String(p[`title_${lang}`] || p.title || "Project");

  return (
    <a
      href={String(p.url ?? "#")}
      className="project-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="project-img-wrap">
        {!imgErr && p.image ? (
          <img
            src={p.image}
            alt={title}
            className="project-img"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="project-img-placeholder">
            <span>{String(i + 1).padStart(2, "0")}</span>
          </div>
        )}
        <div className="project-img-overlay">
          <span className="visit-btn">{visitLabel} ↗</span>
        </div>
      </div>
      <div className="project-info">
        <span className="project-num">0{i + 1}</span>
        <span className="project-title">{title}</span>
        <span className="project-arrow">↗</span>
      </div>
    </a>
  );
}

// ─── Stack List ───────────────────────────────────────────────────────────────
function StackList({ items }: { items: StackItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref);
  return (
    <div ref={ref} className="stack-list">
      {items.map((s, i) => (
        <div key={s.name} className="stack-item">
          <span
            className="stack-dot"
            style={{ background: CAT_COLORS[s.cat] }}
          />
          <span className="stack-name">{s.name}</span>
          <div className="stack-bar-wrap">
            <div
              className="stack-bar"
              style={{
                width: `${s.level}%`,
                background: CAT_COLORS[s.cat],
                transform: v ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: v ? `${i * 55}ms` : "0ms",
              }}
            />
          </div>
          <span className="stack-pct">{s.level}%</span>
        </div>
      ))}
    </div>
  );
}

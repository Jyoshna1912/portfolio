import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Mail,
  Menu,
  X,
  BriefcaseBusiness,
  MapPin,
  Linkedin,
} from "lucide-react";
import { projects, type Project } from "./data/projects";
import resumePdf from "./assets/Jyoshna-Rayadurgam-Resume.pdf";

const categories = ["All", "Websites", "Applications"] as const;
type Category = (typeof categories)[number];

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        className="project-image"
        src={project.image}
        alt={project.imageAlt ?? `${project.title} website preview`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="project-placeholder"
      aria-label={`Placeholder image for ${project.title}`}
    >
      <div className="placeholder-browser">
        <div className="placeholder-browser-bar">
          <span />
          <span />
          <span />
          <i>YOUR PROJECT PREVIEW</i>
        </div>
        <div className="placeholder-layout">
          <div className="placeholder-side">
            <b>
              JR<span>.</span>
            </b>
            <i />
            <i />
            <i />
          </div>
          <div className="placeholder-content">
            <small>PROJECT IMAGE PLACEHOLDER</small>
            <strong>{project.title}</strong>
            <span />
            <span />
            <div className="placeholder-blocks">
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const ids = ["about", "experience", "work", "contact"];
    let frame = 0;

    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Use a viewport activation line instead of relying on intersection ratios.
        // This keeps long sections such as Selected Work highlighted while scrolling
        // through their cards, even when the section is taller than the viewport.
        const activationY = Math.min(window.innerHeight * 0.32, 260);
        let current = ids[0];
        for (const id of ids) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= activationY) {
            current = id;
          }
        }
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 8
        ) {
          current = "contact";
        }
        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [activeCategory]);

  const visibleProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (activeCategory === "Websites")
          return (
            project.visual === "image" ||
            project.visual === "education" ||
            project.visual === "product"
          );
        if (activeCategory === "Applications")
          return project.visual === "pos" || project.visual === "dashboard";
        return true;
      }),
    [activeCategory],
  );
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <aside className="intro-panel">
        <div className="intro-copy" id="top">
          <p className="eyebrow">FRONTEND DEVELOPER</p>
          <h1>
            Jyoshna
            <br />
            Rayadurgam<span>.</span>
          </h1>
          <h2>I build thoughtful digital experiences.</h2>
          <p className="intro-summary">
            I turn ideas into clear, useful interfaces — from client websites to
            the workflows behind business applications.
          </p>
        </div>
        <button
          className="mobile-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />} <span>MENU</span>
        </button>
        <nav
          className={menuOpen ? "section-nav nav-open" : "section-nav"}
          aria-label="Page navigation"
        >
          {[
            ["about", "ABOUT"],
            ["experience", "EXPERIENCE"],
            ["work", "SELECTED WORK"],
            ["contact", "CONTACT"],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              onClick={closeMenu}
            >
              <span className="nav-line" />
              {label}
            </a>
          ))}
        </nav>
        <div className="intro-bottom">
          <a
            className="resume-link"
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
          >
            VIEW RESUME <ArrowUpRight size={15} />
          </a>
          <div className="social-links">
            <a
              href="mailto:rayadurgamjyoshnaroyal@gmail.com"
              aria-label="Email Jyoshna"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jyoshna-rayadurgam"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
          </div>
          <p>
            <MapPin size={13} /> Tirupati, India
          </p>
        </div>
      </aside>

      <main className="content-column">
        <section className="content-section about-section" id="about">
          <p className="mobile-eyebrow">FRONTEND DEVELOPER · TIRUPATI, INDIA</p>
          <div className="section-label">
            <span>01</span>
            <span>ABOUT</span>
            <i />
          </div>
          <div className="section-body" data-reveal>
            <p>
              I'm a frontend developer who enjoys bringing ideas to life on the
              web. What interests me most is how a website can tell a story —
              helping a business show people who they are, what they offer, and
              why it matters.
            </p>
            <p>
              My experience spans responsive client websites, admin interfaces,
              examination platforms, and an offline-first retail POS
              application. I enjoy figuring out how each interface can make a
              task clearer and easier for the person using it.
            </p>
            <p>
              Outside of coding, I love to travel. Discovering new places and
              seeing how people experience the world gives me fresh inspiration
              for the stories and experiences we build online.
            </p>
            <p className="about-emphasis">
              I like making the experience clear, useful, and considered.
            </p>
            <div className="skills-line">
              <span>React.js</span>
              <span>TypeScript</span>
              <span>JavaScript</span>
              <span>Tailwind CSS</span>
              <span>REST APIs</span>
              <span>Electron.js</span>
            </div>
          </div>
        </section>

        <section className="content-section" id="experience">
          <div className="section-label">
            <span>02</span>
            <span>EXPERIENCE</span>
            <i />
          </div>
          <div className="section-body">
            <article className="experience-card" data-reveal>
              <div className="experience-date">DEC 2024 — JUL 2026</div>
              <div className="experience-detail">
                <h3>
                  Frontend Developer <span>· Youngminds</span>
                </h3>
                <p>
                  Built React-based web and desktop interfaces, supported
                  production rollouts and worked with REST APIs across business
                  workflows.
                </p>
                <ul>
                  <li>
                    Developed cashier workflows for Custom ERP, including
                    billing, discounts, taxes, barcode scanning, order handling
                    and offline/online sync states.
                  </li>
                  <li>
                    Built administration modules for ETC Mentors, including
                    registration, exam creation and scheduling, reporting and
                    results.
                  </li>
                  <li>
                    Developed responsive business, educational and corporate
                    websites and admin panels.
                  </li>
                </ul>
                <div className="skill-tags">
                  <span>React</span>
                  <span>Javascript</span>
                  <span>TypeScript</span>
                  <span>Html</span>
                  <span>Css</span>
                  <span>Tailwind Css</span>
                </div>
              </div>
              <ArrowUpRight className="card-arrow" size={17} />
            </article>
            <article className="experience-card" data-reveal>
              <div className="experience-date">AUG 2023 — NOV 2024</div>
              <div className="experience-detail">
                <h3>
                  Business Process Associate <span>· Accenture</span>
                </h3>
                <p>
                  Built a foundation in client communication, process-driven
                  problem-solving and detail-oriented delivery before
                  transitioning into frontend development.
                </p>
              </div>
              <ArrowUpRight className="card-arrow" size={17} />
            </article>
          </div>
        </section>

        <section className="content-section work-section" id="work">
          <div className="section-label">
            <span>03</span>
            <span>SELECTED WORK</span>
            <i />
          </div>
          <div className="section-body">
            <p className="section-intro">
              A selection of websites and application interfaces I've worked on.
              Some client projects aren't publicly hosted, so those are shown
              with supplied screenshots or clearly labelled illustrative
              previews.
            </p>
            <div className="filter-list" aria-label="Filter projects">
              {categories.map((category) => (
                <button
                  key={category}
                  className={
                    activeCategory === category ? "filter active" : "filter"
                  }
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="project-list">
              {visibleProjects.map((project, index) => (
                <article
                  className="project-card"
                  key={project.title}
                  data-reveal
                  style={{
                    transitionDelay: `${Math.min(index % 3, 2) * 65}ms`,
                  }}
                >
                  <div className="project-thumb">
                    <ProjectVisual project={project} />
                    {project.links?.length ? (
                      <a
                        href={project.links[0].href}
                        target="_blank"
                        rel="noreferrer"
                        className="thumb-link"
                        aria-label={`Visit ${project.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : (
                      <span className="client-label">
                        <BriefcaseBusiness size={12} /> CLIENT PROJECT
                      </span>
                    )}
                  </div>
                  <div className="project-copy">
                    <div className="project-title-line">
                      <p className="project-category">{project.category}</p>
                      <h3>{project.title}</h3>
                    </div>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    {project.links?.length ? (
                      <a
                        className="project-link"
                        href={project.links[0].href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit website <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="project-private">
                        Private client work · Preview unavailable
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <p className="gallery-footnote">
              Illustrative previews for Custom ERP and admin interfaces are
              visual stand-ins, not screenshots of the actual products.
            </p>
          </div>
        </section>

        <section className="content-section contact-section" id="contact">
          <div className="section-label">
            <span>04</span>
            <span>CONTACT</span>
            <i />
          </div>
          <div className="section-body" data-reveal>
            <p className="contact-kicker">HAVE SOMETHING IN MIND?</p>
            <h2>
              Let's make something <em>useful.</em>
            </h2>
            <p>
              I'm open to conversations about frontend opportunities,
              interesting projects and thoughtful digital experiences.
            </p>
            <a
              className="email-cta"
              href="mailto:rayadurgamjyoshnaroyal@gmail.com"
            >
              rayadurgamjyoshnaroyal@gmail.com <ArrowUpRight size={16} />
            </a>
            <a
              className="linkedin-cta"
              href="https://www.linkedin.com/in/jyoshna-rayadurgam"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={16} /> Connect on LinkedIn
            </a>
          </div>
        </section>
        <footer className="site-footer">
          <span> JYOSHNA RAYADURGAM</span>
          <button
            type="button"
            className="back-to-top"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "auto"
                  : "smooth",
              });
              setMenuOpen(false);
            }}
          >
            BACK TO TOP ↑
          </button>
        </footer>
      </main>
    </div>
  );
}

export default App;

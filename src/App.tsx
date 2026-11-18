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
  Github,
  ChevronDown,
  Sun,
  Moon,
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
  const [expandedProjects, setExpandedProjects] = useState<string[]>([]);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = window.localStorage.getItem("jyoshna-portfolio-theme");
    return saved === "light" ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("jyoshna-portfolio-theme", theme);
  }, [theme]);

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
      projects
        .filter((project) => {
          if (activeCategory === "Websites")
            return (
              project.visual === "image" ||
              project.visual === "education" ||
              project.visual === "product"
            );
          if (activeCategory === "Applications")
            return project.visual === "pos" || project.visual === "dashboard";
          return true;
        })
        .sort(
          (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        ),
    [activeCategory],
  );
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio-shell">
      <aside className="intro-panel">
        <div className="intro-copy" id="top">
          <div className="hero-topline">
            <p className="eyebrow">SOFTWARE DEVELOPER</p>
            <button
              type="button"
              className="theme-toggle"
              onClick={() =>
                setTheme((current) => (current === "dark" ? "light" : "dark"))
              }
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
            </button>
          </div>
          <h1>
            Jyoshna
            <br />
            Rayadurgam<span>.</span>
          </h1>
          <h2>Software Developer building thoughtful digital experiences.</h2>
          <p className="intro-summary">
            I build responsive web applications and practical product
            experiences with React.js, JavaScript and TypeScript. My work spans
            polished interfaces, business workflows, REST API integration and
            Electron-based desktop applications, with experience connecting web
            interfaces to Node.js, Express.js and MySQL services.
          </p>
          <div className="hero-actions">
            <a className="hero-primary" href="#work">
              Explore my work <ArrowUpRight size={15} />
            </a>
            <a className="hero-secondary" href="#contact">
              Contact me
            </a>
          </div>
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
            download="Jyoshna_Rayadurgam_Resume.pdf"
          >
            DOWNLOAD RESUME <ArrowUpRight size={15} />
          </a>
          <div className="social-links">
            <a
              href="mailto:rayadurgamjyoshnaroyal@gmail.com"
              aria-label="Email Jyoshna"
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/jyoshna-rayadurgam/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Jyoshna1912/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
            >
              <Github size={18} />
            </a>
          </div>
          <p>
            <MapPin size={13} /> Tirupati, India
          </p>
        </div>
      </aside>

      <main className="content-column">
        <section className="content-section about-section" id="about">
          <p className="mobile-eyebrow">SOFTWARE DEVELOPER · TIRUPATI, INDIA</p>
          <div className="section-label">
            <span>01</span>
            <span>ABOUT</span>
            <i />
          </div>
          <div className="section-body" data-reveal>
            <p>
              I'm a Software Developer who enjoys building thoughtful,
              user-friendly digital experiences. I build responsive websites,
              web applications, admin panels and business interfaces using
              React.js, JavaScript and TypeScript. I enjoy translating product
              requirements into clear, intuitive experiences—from public-facing
              websites to feature-rich applications used in day-to-day business
              operations.
            </p>
            <p>
              My professional experience includes educational and corporate
              websites, administrative dashboards, product and service websites,
              and business applications. I've contributed to team-built products
              such as an offline-first retail POS/ERP and an examination
              management platform, developing user-facing workflows and
              integrating REST APIs. I have also worked with Node.js, Express.js
              and MySQL to connect application interfaces with booking and
              data-management workflows. I care about maintainable code,
              reliable interactions and the details that make software useful in
              real-world settings.
            </p>
            <p>
              Outside of coding, I love travelling, exploring new places, and
              taking a break from the usual routine. It's my way of finding
              fresh perspectives and coming back with a little more inspiration.
            </p>
            <p className="about-emphasis">
              I enjoy building software that feels clear, responsive and
              dependable—from the first interaction to the completed workflow.
            </p>
            <div className="skills-line">
              <span>React.js</span>
              <span>TypeScript</span>
              <span>JavaScript</span>
              <span>Tailwind CSS</span>
              <span>REST APIs</span>
              <span>Node.js</span>
              <span>Express.js</span>
              <span>MySQL</span>
              <span>Electron.js</span>
            </div>
          </div>
        </section>

        <section className="content-section" id="experience">
          <div className="section-label" style={{ marginTop: "15px" }}>
            <span>02</span>
            <span>EXPERIENCE</span>
            <i />
          </div>
          <div className="section-body">
            <article className="experience-card" data-reveal>
              <div className="experience-date">DEC 2024 — JUL 2026</div>
              <div className="experience-detail">
                <h3>
                  Software Developer <span>· Youngminds</span>
                </h3>
                <p>
                  Developed and maintained React.js and TypeScript features
                  across a retail ERP, an examination platform, and business and
                  educational websites, with a focus on frontend workflows and
                  API-connected application experiences.
                </p>
                <ul>
                  <li>
                    Developed frontend cashier modules for PastryChef ERP,
                    covering billing workflows, discount and tax calculations,
                    barcode scanning, customer lookup, payment handling and
                    order cancellation.
                  </li>
                  <li>
                    Implemented UI behavior for stock-aware product selection
                    and offline sales synchronization, including sync-status and
                    error states.
                  </li>
                  <li>
                    Contributed to ETC Mentors administration workflows for
                    registration, exam scheduling, reporting and results, plus
                    responsive websites and admin interfaces.
                  </li>
                </ul>
                <p className="experience-context">
                  The PastryChef ERP was used across 3 outlets and handled
                  approximately 100–200 transactions per day. These figures
                  describe the wider product, not an individually attributable
                  result.
                </p>
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
              Here are few featured projects, followed by additional client and
              team projects along with my contribution;
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
                    {project.featured && (
                      <span className="featured-label">FEATURED</span>
                    )}
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
                    <p style={{ fontSize: "14px" }}>{project.description}</p>
                    <p
                      className="project-contribution"
                      style={{ fontSize: "13px" }}
                    >
                      <strong>
                        {project.teamProject
                          ? "Team contribution:"
                          : "My contribution:"}
                      </strong>{" "}
                      {project.contribution}
                    </p>
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.links?.length ? (
                        <a
                          className="project-link subtle-blink"
                          style={{ fontSize: "11px" }}
                          href={project.links[0].href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Visit website
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span
                          className="project-private"
                          style={{ fontSize: "11px" }}
                        >
                          {project.teamProject
                            ? "Team project · My frontend contribution"
                            : "Client project · Preview only"}
                        </span>
                      )}
                      {project.caseStudy && (
                        <button
                          className="case-study-toggle"
                          type="button"
                          aria-expanded={expandedProjects.includes(
                            project.title,
                          )}
                          onClick={() =>
                            setExpandedProjects((current) =>
                              current.includes(project.title)
                                ? current.filter(
                                    (title) => title !== project.title,
                                  )
                                : [...current, project.title],
                            )
                          }
                        >
                          {expandedProjects.includes(project.title)
                            ? "Hide case study"
                            : "View case study"}
                          <ChevronDown
                            size={13}
                            className={
                              expandedProjects.includes(project.title)
                                ? "chevron-open"
                                : ""
                            }
                          />
                        </button>
                      )}
                    </div>
                    {project.caseStudy &&
                      expandedProjects.includes(project.title) && (
                        <div className="case-study-panel">
                          <p className="case-study-heading">My contribution</p>
                          <p>{project.caseStudy.context}</p>
                          <ul>
                            {project.caseStudy.highlights.map((highlight) => (
                              <li key={highlight}>- {highlight}</li>
                            ))}
                          </ul>
                          <p className="case-study-disclaimer">
                            Team-built product · These are some of the important
                            frontend contribution, i made for the full
                            application.
                          </p>
                        </div>
                      )}
                  </div>
                </article>
              ))}
            </div>
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
              I'm open to Software Developer and React-focused opportunities,
              interesting product work and projects where thoughtful interfaces
              make a practical difference.
            </p>
            <a
              className="email-cta"
              href="mailto:rayadurgamjyoshnaroyal@gmail.com"
            >
              rayadurgamjyoshnaroyal@gmail.com <ArrowUpRight size={16} />
            </a>
            <div className="contact-links">
              <a
                className="linkedin-cta"
                href="https://www.linkedin.com/in/jyoshna-rayadurgam/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> Connect on LinkedIn
              </a>
              <a
                className="linkedin-cta"
                href="https://github.com/Jyoshna1912/"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> View GitHub
              </a>
            </div>
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

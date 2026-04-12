import {
  ArrowRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import "./App.css";

const assetBase = import.meta.env.BASE_URL;

const navItems = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mahendra-ranwa/",
    icon: ExternalLink,
  },
  {
    label: "GitHub",
    href: "https://github.com/mahendra-04",
    icon: ExternalLink,
  },
  {
    label: "Resume",
    href: `${assetBase}MahendraRanwaCS.pdf`,
    icon: Download,
    download: true,
  },
];

const heroStats = [
  { value: "IT Support", label: "Target role focus" },
  { value: "Hands-on", label: "Troubleshooting approach" },
  { value: "Windows + Labs", label: "Support environment" },
];

const projects = [
  {
    title: "Personal Portfolio Website",
    type: "Front-end build",
    image: `${assetBase}mahendra.jpeg`,
    description:
      "Built a responsive portfolio website with React and Vite, improved deployment reliability, and refined the live GitHub Pages experience.",
    highlights: ["Responsive layout", "Vite deployment", "UI refinement"],
    href: "https://github.com/mahendra-04",
  },
  {
    title: "Raspberry Pi Smart Car System",
    type: "Hardware + software",
    image: `${assetBase}buggy.jpg`,
    description:
      "Configured Raspberry Pi OS, enabled SSH and VNC access, and integrated sensors for remote testing and hardware control.",
    highlights: ["Raspberry Pi setup", "Remote access", "Sensor integration"],
    href: "https://github.com/mahendra-04",
  },
  {
    title: "Embedded Diagnostics Workflow",
    type: "Technical troubleshooting",
    image: `${assetBase}embedded-control.jpg`,
    description:
      "Applied fault isolation, verification, and structured testing across embedded systems and lab-based technical environments.",
    highlights: ["Fault isolation", "System verification", "Lab support"],
    href: "https://github.com/mahendra-04",
  },
];

const serviceItems = [
  {
    title: "Desktop Support",
    text: "Set up Windows systems, install software, support shared workstations, and help users recover quickly from daily technical issues.",
  },
  {
    title: "Issue Troubleshooting",
    text: "Diagnose hardware, software, and connectivity problems using a calm, step-by-step process that leads to reliable fixes.",
  },
  {
    title: "Technical Operations",
    text: "Keep systems ready for labs, classrooms, and office use by handling setup, maintenance, and practical support requests.",
  },
];

const experience = [
  {
    role: "Support Technician",
    company: "Sheridan College IT Centre, Brampton",
    date: "Apr 2024 - Aug 2024",
    bullets: [
      "Provided support for hardware, software, and network issues in shared lab environments.",
      "Installed and configured Windows systems and academic software on multiple workstations.",
      "Diagnosed Wi-Fi, LAN, and IP configuration issues and restored connectivity.",
      "Helped users with login issues, system errors, and software access problems.",
    ],
  },
  {
    role: "Web Technician (Volunteer)",
    company: "U+ Toastmasters Academy",
    date: "Sep 2025 - Mar 2026",
    bullets: [
      "Maintained website functionality and handled technical issues affecting everyday use.",
      "Supported users with content updates, access-related questions, and troubleshooting requests.",
      "Worked with team members to improve reliability and resolve usability issues quickly.",
    ],
  },
];

const credentials = [
  "Computer Engineering Technology (Advanced Diploma), Sheridan College",
  "CompTIA A+ (Core 1 completed, Core 2 in progress)",
  "IT Service Desk: Service Management",
  "Computer Components and Peripherals for IT Technicians",
];

const contactItems = [
  {
    label: "Email",
    value: "mranwa100@gmail.com",
    href: "mailto:mranwa100@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+1 437-244-5424",
    href: "tel:+14372445424",
    icon: Phone,
  },
  {
    label: "Location",
    value: "Brampton, Ontario",
    href: "https://maps.google.com/?q=Brampton,Ontario",
    icon: MapPin,
  },
];

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro section-intro--animated">
      <span className="section-intro__eyebrow">{eyebrow}</span>
      <div className="section-intro__content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

function SocialLink({ item, className = "" }) {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      target={item.download ? undefined : "_blank"}
      rel={item.download ? undefined : "noreferrer noopener"}
      download={item.download || undefined}
      className={className}
    >
      <Icon size={16} />
      <span>{item.label}</span>
    </a>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onResize();
    onScroll();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="site-shell__gradient site-shell__gradient--one" aria-hidden="true" />
      <div className="site-shell__gradient site-shell__gradient--two" aria-hidden="true" />

      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <div className="topbar__inner">
          <a href="#hero" className="brand" onClick={closeMenu}>
            <span className="brand__name">Mahendra Ranwa</span>
            <span className="brand__role">IT Support | Help Desk | Technical Support</span>
          </a>

          <button
            type="button"
            className="topbar__toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className={`topbar__panel ${menuOpen ? "topbar__panel--open" : ""}`}>
            <nav className="topbar__nav" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="topbar__link" onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <a
            href={`${assetBase}MahendraRanwaCS.pdf`}
            download
            className="button button--ghost topbar__resume"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero__inner">
            <div className="hero__copy section-intro--animated">
              <span className="eyebrow">
                Entry-level IT support and technical operations
              </span>
              <h1>
                Building dependable support experiences for people, devices, and
                everyday systems.
              </h1>
              <p className="hero__lead">
                Computer Engineering Technology graduate focused on help desk,
                desktop support, troubleshooting, and system setup. I bring
                hands-on lab experience, clear communication, and a disciplined
                approach to resolving technical issues efficiently.
              </p>

              <div className="hero__actions">
                <a href="#work" className="button button--primary">
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </a>
                <a href="#contact" className="button button--secondary">
                  <span>Contact Me</span>
                </a>
              </div>

              <div className="hero__socials">
                {socialLinks.map((item) => (
                  <SocialLink key={item.label} item={item} className="inline-link" />
                ))}
              </div>
            </div>

            <div className="hero__panel section-intro--animated">
              <div className="hero-card hero-card--portrait">
                <div className="hero-card__media">
                  <img src={`${assetBase}mahendra.jpeg`} alt="Portrait of Mahendra Ranwa" />
                </div>
                <div className="hero-card__body">
                  <span className="hero-card__label">Current focus</span>
                  <h2>Professional support built on calm troubleshooting and dependable follow-through</h2>
                  <p>
                    Open to IT support, help desk, desktop support, and
                    technical operations roles where clear communication and
                    dependable execution matter most.
                  </p>
                </div>
              </div>

              <div className="hero__stats">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="stat-card">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section--work" id="work">
          <SectionIntro
            eyebrow="Selected work"
            title="Projects that reflect practical troubleshooting and technical execution."
            text="A focused set of builds and diagnostics work that demonstrates how I approach setup, problem solving, testing, and delivery."
          />

          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card section-intro--animated">
                <div className="project-card__media">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : (
                    <div className="project-card__fallback">
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
                <div className="project-card__body">
                  <span className="project-card__type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} highlights`}>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-action"
                  >
                    <span>View related work</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--about" id="about">
          <SectionIntro
            eyebrow="About"
            title="Practical support experience backed by structured troubleshooting."
            text="My background combines technical training, hands-on support work, and a user-focused mindset suited for entry-level IT support environments."
          />

          <div className="about-grid">
            <div className="about-panel section-intro--animated">
              <h3>Experience</h3>
              <div className="timeline">
                {experience.map((item) => (
                  <article key={item.role} className="timeline__item">
                    <div className="timeline__meta">
                      <span>{item.date}</span>
                      <h4>{item.role}</h4>
                      <p>{item.company}</p>
                    </div>
                    <ul>
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="about-side">
              <article className="info-card section-intro--animated">
                <h3>Credentials</h3>
                <ul className="info-list">
                  {credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="info-card section-intro--animated">
                <h3>Strengths</h3>
                <ul className="info-list">
                  <li>Desktop and workstation support</li>
                  <li>Hardware and software troubleshooting</li>
                  <li>Windows setup and application installation</li>
                  <li>User-facing communication and issue follow-through</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--services" id="services">
          <SectionIntro
            eyebrow="Services"
            title="Areas where I can contribute with immediate value."
            text="Focused on technical support work where reliability, clear communication, and practical troubleshooting all matter."
          />

          <div className="services-grid">
            {serviceItems.map((item) => (
              <article key={item.title} className="service-card section-intro--animated">
                <div className="service-card__icon">
                  <Wrench size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--contact" id="contact">
          <div className="contact-panel section-intro--animated">
            <div className="contact-panel__copy">
              <span className="section-intro__eyebrow">Contact</span>
              <h2>Let&apos;s talk about IT support, help desk, or technical operations roles.</h2>
              <p>
                I&apos;m open to opportunities where I can support users,
                maintain dependable systems, and help teams resolve technical
                issues with clarity and consistency.
              </p>
              <div className="contact-panel__actions">
                <a href="mailto:mranwa100@gmail.com" className="button button--primary">
                  <Mail size={16} />
                  <span>Email Me</span>
                </a>
                <SocialLink item={socialLinks[2]} className="button button--secondary" />
              </div>
            </div>

            <div className="contact-list">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.label === "Location" ? "_blank" : undefined}
                    rel={item.label === "Location" ? "noreferrer noopener" : undefined}
                    className="contact-card section-intro--animated"
                  >
                    <span className="contact-card__icon">
                      <Icon size={18} />
                    </span>
                    <span className="contact-card__meta">
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <p>Mahendra Ranwa</p>
          <div className="footer__links">
            {socialLinks.map((item) => (
              <SocialLink key={item.label} item={item} className="footer__link" />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

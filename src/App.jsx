import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Check,
  Copy,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Moon,
  Network,
  Phone,
  Send,
  ServerCog,
  ShieldCheck,
  Sun,
  Ticket,
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
  { id: "tools", label: "Tools" },
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
  { value: "Open to work", label: "IT support and help desk roles" },
  { value: "Hands-on", label: "Troubleshooting approach" },
  { value: "Windows + Labs", label: "Support environment" },
];

const projects = [
  {
    title: "Personal Portfolio Website",
    type: "Front-end build",
    icon: Monitor,
    image: `${assetBase}mahendra.jpeg`,
    metric: "Responsive redesign",
    summary: "Redesigned a recruiter-facing portfolio experience with clearer hierarchy and stronger deployment polish.",
    description:
      "Built a responsive portfolio website with React and Vite, improved deployment reliability, and refined the live GitHub Pages experience.",
    highlights: ["Responsive layout", "Vite deployment", "UI refinement"],
    href: "https://github.com/mahendra-04",
  },
  {
    title: "Raspberry Pi Smart Car System",
    type: "Hardware + software",
    icon: Cpu,
    image: `${assetBase}buggy.jpg`,
    metric: "Remote device control",
    summary: "Connected hardware, remote access, and sensor testing into one practical troubleshooting project.",
    description:
      "Configured Raspberry Pi OS, enabled SSH and VNC access, and integrated sensors for remote testing and hardware control.",
    highlights: ["Raspberry Pi setup", "Remote access", "Sensor integration"],
    href: "https://github.com/mahendra-04",
  },
  {
    title: "Embedded Diagnostics Workflow",
    type: "Technical troubleshooting",
    icon: Network,
    image: `${assetBase}embedded-control.jpg`,
    metric: "Structured fault isolation",
    summary: "Applied step-by-step system checks to isolate faults and verify technical fixes in lab environments.",
    description:
      "Applied fault isolation, verification, and structured testing across embedded systems and lab-based technical environments.",
    highlights: ["Fault isolation", "System verification", "Lab support"],
    href: "https://github.com/mahendra-04",
  },
];

const serviceItems = [
  {
    title: "Desktop Support",
    icon: Monitor,
    text: "Set up Windows systems, install software, support shared workstations, and help users recover quickly from daily technical issues.",
    points: ["Windows setup", "Software installs", "Shared workstation readiness"],
  },
  {
    title: "Issue Troubleshooting",
    icon: Headphones,
    text: "Diagnose hardware, software, and connectivity problems using a calm, step-by-step process that leads to reliable fixes.",
    points: ["Hardware checks", "Connectivity diagnosis", "Clear user communication"],
  },
  {
    title: "Technical Operations",
    icon: Network,
    text: "Keep systems ready for labs, classrooms, and office use by handling setup, maintenance, and practical support requests.",
    points: ["Lab preparation", "Routine maintenance", "Reliable support follow-through"],
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

const strengths = [
  {
    title: "User-first support",
    text: "Calm communication, clear explanations, and dependable follow-through when issues affect day-to-day work.",
    icon: BadgeCheck,
  },
  {
    title: "System setup",
    text: "Workstation imaging, software installs, account troubleshooting, and ready-for-use device preparation.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Technical diagnosis",
    text: "Step-by-step isolation across hardware, software, connectivity, and embedded environments.",
    icon: Cpu,
  },
];

const stackItems = [
  "Windows Support",
  "Help Desk",
  "Active Troubleshooting",
  "Raspberry Pi",
  "Networking Basics",
  "React + Vite",
];

const toolItems = [
  {
    title: "Windows & Device Setup",
    text: "Configuring workstations, peripherals, software installs, and getting shared systems ready for use.",
    icon: Monitor,
  },
  {
    title: "Ticketing & Support Flow",
    text: "Handling support requests with clear communication, prioritization, and dependable follow-through.",
    icon: Ticket,
  },
  {
    title: "Networking Basics",
    text: "Working through Wi-Fi, LAN, and IP issues with structured diagnosis and verification.",
    icon: ServerCog,
  },
  {
    title: "Security Mindset",
    text: "Supporting access issues, account setup, and user guidance with a careful, reliable approach.",
    icon: ShieldCheck,
  },
];

const featuredProject = {
  eyebrow: "Featured case study",
  title: "Portfolio Website Refresh",
  summary:
    "A focused rebuild of my portfolio to present IT support skills more clearly, improve recruiter scanning, and ship a faster, cleaner GitHub Pages experience.",
  challenge:
    "The original site communicated my background, but it lacked strong hierarchy, modern interaction details, and a more portfolio-like presentation.",
  approach:
    "I redesigned the information flow, strengthened calls to action, improved section structure, optimized image loading, and refined the interface for both desktop and mobile viewing.",
  outcome:
    "The result is a cleaner, more recruiter-friendly portfolio with clearer navigation, stronger project presentation, and more polished contact pathways.",
  tech: ["React", "Vite", "GitHub Pages", "Responsive CSS"],
};

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
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [copiedField, setCopiedField] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    role: "",
    message: "",
  });

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

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${contactForm.name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${contactForm.name}\nEmail: ${contactForm.email}\nRole interested in: ${contactForm.role}\n\n${contactForm.message}`
    );

    window.location.href = `mailto:mranwa100@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      window.setTimeout(() => setCopiedField(""), 1800);
    } catch {
      setCopiedField("");
    }
  };

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
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
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`topbar__link ${activeSection === item.id ? "topbar__link--active" : ""}`}
                  onClick={closeMenu}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={`${assetBase}MahendraRanwaCS.pdf`}
              download
              className="button button--primary topbar__mobile-resume"
              onClick={closeMenu}
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>

          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={`${assetBase}MahendraRanwaCS.pdf`}
            download
            className="button button--primary button--resume topbar__resume"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="hero">
          <div className="hero__inner">
            <div className="hero__copy section-intro--animated reveal-on-scroll">
              <span className="eyebrow hero__eyebrow">
                Entry-level IT support and technical operations
              </span>
              <p className="hero__kicker">Reliable troubleshooting. Clear communication. User-first support.</p>
              <h1>IT Support Technician focused on reliable troubleshooting and user-first support.</h1>
              <p className="hero__lead">
                Computer Engineering Technology graduate focused on help desk,
                desktop support, troubleshooting, and system setup. I bring
                hands-on lab experience, clear communication, and a disciplined
                approach to resolving technical issues efficiently.
              </p>
              <div className="hero__availability" aria-label="Availability details">
                <span>Based in Brampton, Ontario</span>
                <span>Open to on-site, hybrid, and entry-level support roles</span>
              </div>

              <div className="hero__actions">
                <a href={`${assetBase}MahendraRanwaCS.pdf`} download className="button button--primary">
                  <span>Download Resume</span>
                </a>
                <a href="#work" className="button button--secondary">
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="hero__socials">
                {socialLinks.map((item) => (
                  <SocialLink key={item.label} item={item} className="inline-link" />
                ))}
              </div>
            </div>

            <div className="hero__panel section-intro--animated reveal-on-scroll">
              <div className="hero-card hero-card--portrait">
                <div className="hero-card__media">
                  <img
                    src={`${assetBase}mahendra.jpeg`}
                    alt="Portrait of Mahendra Ranwa"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="hero-card__body">
                  <span className="hero-card__label">Current focus</span>
                  <h2>Professional support built on calm troubleshooting and dependable follow-through</h2>
                  <p>
                    Open to IT support, help desk, desktop support, and
                    technical operations roles where clear communication and
                    dependable execution matter most.
                  </p>
                  <div className="hero-card__badge">
                    <BadgeCheck size={16} />
                    <span>Available for support and technician roles</span>
                  </div>
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

        <section className="stack-band reveal-on-scroll" aria-label="Tech stack and support strengths">
          <div className="stack-band__label">Tech stack</div>
          <div className="stack-band__items">
            {stackItems.map((item) => (
              <span key={item} className="stack-pill">
                {item}
              </span>
            ))}
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
              <article key={project.title} className="project-card section-intro--animated reveal-on-scroll">
                <div className="project-card__media">
                  <div className="project-card__icon">
                    <project.icon size={18} />
                  </div>
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                  ) : (
                    <div className="project-card__fallback">
                      <span>{project.title}</span>
                    </div>
                  )}
                </div>
                <div className="project-card__body">
                  <div className="project-card__topline">
                    <span className="project-card__type">{project.type}</span>
                    <span className="project-card__metric">{project.metric}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  <p>{project.description}</p>
                  <div className="project-card__details" aria-label={`${project.title} details`}>
                    <div>
                      <strong>Tools</strong>
                      <span>{project.highlights.join(", ")}</span>
                    </div>
                    <div>
                      <strong>Role</strong>
                      <span>{project.type}</span>
                    </div>
                    <div>
                      <strong>Impact</strong>
                      <span>{project.metric}</span>
                    </div>
                  </div>
                  <ul className="tag-list" aria-label={`${project.title} highlights`}>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button button--secondary project-card__action"
                  >
                    <span>View Project</span>
                    <ExternalLink size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <article className="featured-project reveal-on-scroll">
            <div className="featured-project__intro">
              <span className="section-intro__eyebrow">{featuredProject.eyebrow}</span>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.summary}</p>
              <a
                href="https://github.com/mahendra-04/portfolio-website"
                target="_blank"
                rel="noreferrer noopener"
                className="button button--secondary featured-project__cta"
              >
                <FileText size={16} />
                <span>Case study: Portfolio site</span>
              </a>
            </div>

            <div className="featured-project__grid">
              <div className="featured-project__item">
                <strong>Problem</strong>
                <p>{featuredProject.challenge}</p>
              </div>
              <div className="featured-project__item">
                <strong>Action</strong>
                <p>{featuredProject.approach}</p>
              </div>
              <div className="featured-project__item">
                <strong>Result</strong>
                <p>{featuredProject.outcome}</p>
              </div>
            </div>

            <ul className="tag-list" aria-label="Featured project technologies">
              {featuredProject.tech.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="section section--about" id="about">
          <SectionIntro
            eyebrow="About"
            title="Practical support experience backed by structured troubleshooting."
            text="I am a Computer Engineering Technology graduate building a portfolio around dependable support, thoughtful communication, and hands-on technical execution. My background combines technical training, real support work, and a user-focused mindset suited for entry-level IT support environments."
          />

          <div className="about-grid">
            <div className="about-panel section-intro--animated reveal-on-scroll">
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
              <article className="profile-card section-intro--animated reveal-on-scroll">
                <div className="profile-card__media">
                  <img
                    src={`${assetBase}mahendra.jpeg`}
                    alt="Mahendra Ranwa portrait"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="profile-card__body">
                  <span className="section-intro__eyebrow">Profile</span>
                  <h3>Support-minded and detail-driven</h3>
                  <p>
                    I enjoy turning technical problems into clear next steps for users,
                    whether that means fixing access issues, setting up devices, or
                    keeping systems stable behind the scenes.
                  </p>
                </div>
              </article>

              <article className="info-card section-intro--animated reveal-on-scroll">
                <h3>Credentials</h3>
                <ul className="info-list">
                  {credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="info-card section-intro--animated reveal-on-scroll">
                <h3>Strengths</h3>
                <div className="strength-grid">
                  {strengths.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.title} className="strength-card">
                        <span className="strength-card__icon">
                          <Icon size={18} />
                        </span>
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
              <article key={item.title} className="service-card section-intro--animated reveal-on-scroll">
                <div className="service-card__icon">
                  <item.icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="service-points" aria-label={`${item.title} outcomes`}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--tools" id="tools">
          <SectionIntro
            eyebrow="Tools I Use"
            title="Core areas I use to keep support work practical, organized, and dependable."
            text="A snapshot of the environments and support habits I bring into day-to-day technical work."
          />

          <div className="tools-grid">
            {toolItems.map((item) => (
              <article key={item.title} className="tool-card reveal-on-scroll">
                <span className="tool-card__icon">
                  <item.icon size={18} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--contact" id="contact">
          <div className="contact-panel section-intro--animated reveal-on-scroll">
            <div className="contact-panel__copy">
              <span className="section-intro__eyebrow">Contact</span>
              <h2>Let&apos;s connect about IT support, help desk, or technical operations roles.</h2>
              <p>
                I&apos;m open to opportunities where I can support users,
                maintain dependable systems, and help teams resolve technical
                issues with clarity and consistency.
              </p>
              <p className="contact-panel__response">I usually respond within 24 hours.</p>
              <div className="contact-panel__actions">
                <a href="mailto:mranwa100@gmail.com" className="button button--primary">
                  <Mail size={16} />
                  <span>Email Me</span>
                </a>
                <SocialLink item={socialLinks[2]} className="button button--secondary" />
              </div>
            </div>

            <div className="contact-panel__side">
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <label className="contact-form__field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                  />
                </label>
                <label className="contact-form__field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                  />
                </label>
                <label className="contact-form__field">
                  <span>Role Interested In</span>
                  <select name="role" value={contactForm.role} onChange={handleContactChange} required>
                    <option value="">Select a role</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Help Desk">Help Desk</option>
                    <option value="Desktop Support">Desktop Support</option>
                    <option value="Technical Operations">Technical Operations</option>
                  </select>
                </label>
                <label className="contact-form__field">
                  <span>Message</span>
                  <textarea
                    name="message"
                    placeholder="Tell me about the role or project."
                    rows="5"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                  />
                </label>
                <button type="submit" className="button button--primary">
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>

              <div className="contact-list">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "Location" ? "_blank" : undefined}
                      rel={item.label === "Location" ? "noreferrer noopener" : undefined}
                      className="contact-card"
                    >
                      <span className="contact-card__icon">
                        <Icon size={18} />
                      </span>
                      <span className="contact-card__meta">
                        <strong>{item.label}</strong>
                        <span>{item.value}</span>
                      </span>
                      {item.label !== "Location" ? (
                        <button
                          type="button"
                          className="contact-card__copy"
                          aria-label={`Copy ${item.label}`}
                          onClick={(event) => {
                            event.preventDefault();
                            handleCopy(item.label, item.value);
                          }}
                        >
                          {copiedField === item.label ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      ) : null}
                    </a>
                  );
                })}
              </div>

              <div className="contact-map" aria-hidden="true">
                <div className="contact-map__pin">
                  <MapPin size={18} />
                </div>
                <div className="contact-map__content">
                  <span>Based in</span>
                  <strong>Brampton, Ontario</strong>
                  <p>Open to on-site, hybrid, and support-focused opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__meta">
            <p>© 2026 Mahendra Ranwa. Built for IT support and help desk opportunities.</p>
            <span className="footer__tagline">Reliable troubleshooting, clear communication, user-first support.</span>
          </div>
          <div className="footer__group">
            <div className="footer__nav">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="footer__link">
                  {item.label}
                </a>
              ))}
            </div>
            <div className="footer__links">
              {socialLinks.map((item) => (
                <SocialLink key={item.label} item={item} className="footer__link" />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

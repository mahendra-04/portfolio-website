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
import { useEffect, useRef, useState } from "react";
import "./App.css";

// Vite exposes the deployed base path through BASE_URL, which lets asset links
// work both locally and on GitHub Pages.
const assetBase = import.meta.env.BASE_URL;
const contactEmail = "mranwa100@gmail.com";
const contactEmailHref = `mailto:${contactEmail}`;
const fallbackWeb3FormsAccessKey = "b608a0cd-0cc9-446b-8495-fe9765b25ba3";

// Primary navigation items. Each id matches a section id in the page so links
// can scroll directly to the correct block.
const navItems = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

// Reusable external/profile links used in the hero, contact area, and footer.
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
    href: `${assetBase}Mahendra_Ranwa_IT_Helpdesk_Resume.pdf`,
    icon: Download,
    download: true,
  },
];

// Short credential-style highlights shown beside the hero portrait.
const heroStats = [
  { value: "Open to work", label: "Help desk and IT operations" },
  { value: "A+ Certified", label: "CompTIA A+ credential completed" },
  { value: "Lab-tested", label: "Shared labs and classroom environments" },
];

// Main project cards rendered in the Work section. The first item becomes the
// lead project visually because the UI renders this array in order.
const projects = [
  {
    title: "Raspberry Pi Smart Car System",
    type: "Hardware + software",
    icon: Cpu,
    image: `${assetBase}buggy.jpg`,
    metric: "Remote setup and testing workflow",
    summary: "Combined device setup, remote access, and hardware testing in one Raspberry Pi build.",
    description:
      "Configured Raspberry Pi OS, enabled SSH and VNC, connected sensors, and verified remote control for testing.",
    highlights: ["Raspberry Pi OS", "SSH/VNC setup", "Sensor testing"],
    href: "https://github.com/mahendra-04",
  },
  {
    title: "Personal Portfolio Website",
    type: "Front-end build",
    icon: Monitor,
    image: `${assetBase}mahendra.jpeg`,
    metric: "Improved mobile and recruiter UX",
    summary: "Rebuilt my portfolio to make it easier to scan.",
    description:
      "Built with React and Vite, improved responsiveness, and deployed it on GitHub Pages.",
    highlights: ["React + Vite", "Responsive layout", "GitHub Pages"],
    href: "https://github.com/mahendra-04/portfolio-website",
  },
  {
    title: "Embedded Diagnostics Workflow",
    type: "Diagnostics workflow",
    icon: Network,
    image: `${assetBase}embedded-control.jpg`,
    metric: "Step-by-step fault isolation",
    summary: "Used structured testing to isolate faults and verify fixes.",
    description:
      "Worked through embedded issues with repeatable checks, verification steps, and lab-based troubleshooting.",
    highlights: ["Fault isolation", "Verification", "Embedded lab work"],
    href: "https://github.com/mahendra-04",
  },
];

// Support areas shown as service cards.
const serviceItems = [
  {
    title: "Desktop Support",
    icon: Monitor,
    text: "Set up Windows systems, install software, and keep workstations ready.",
    points: ["Windows setup", "Software deployment", "Workstation readiness"],
  },
  {
    title: "Issue Troubleshooting",
    icon: Headphones,
    text: "Work through hardware, software, login, and connectivity issues with a clear, practical process.",
    points: ["Hardware checks", "Network troubleshooting", "User-facing support"],
  },
  {
    title: "Technical Operations",
    icon: Network,
    text: "Support labs, classrooms, and offices through setup and maintenance.",
    points: ["Lab preparation", "Routine maintenance", "Operational support"],
  },
];

// Timeline entries for the Experience block.
const experience = [
  {
    role: "Support Technician",
    company: "Sheridan College IT Centre, Brampton",
    date: "Apr 2024 - Aug 2024",
    bullets: [
      "Handled hardware, software, and network issues in shared lab environments.",
      "Installed Windows systems and academic software across shared workstations.",
      "Diagnosed Wi-Fi, LAN, and IP configuration issues and restored user connectivity.",
      "Helped users resolve login issues, software errors, and access-related problems.",
    ],
  },
  {
    role: "Web Technician (Volunteer)",
    company: "U+ Toastmasters Academy",
    date: "Sep 2025 - Mar 2026",
    bullets: [
      "Maintained website functionality and handled technical issues affecting regular site use.",
      "Helped team members with content updates, access questions, and issue resolution.",
      "Worked with team members to improve reliability and address usability problems quickly.",
    ],
  },
];

// Qualifications shown in the About sidebar.
const credentials = [
  "Computer Engineering Technology (Advanced Diploma), Sheridan College",
  "CompTIA A+ Certified",
  "IT Service Desk: Service Management",
  "Computer Components and Peripherals for IT Technicians",
];

// Short personal strengths shown in compact cards.
const strengths = [
  {
    title: "User support",
    text: "Communicate clearly, stay calm, and explain the next step.",
    icon: BadgeCheck,
  },
  {
    title: "System setup",
    text: "Prepare workstations, install software, and troubleshoot accounts.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Technical diagnosis",
    text: "Use structured checks to narrow issues and verify fixes.",
    icon: Cpu,
  },
];

// Quick tech/support keywords displayed in the horizontal stack band.
const stackItems = [
  "Windows Support",
  "Help Desk",
  "CompTIA A+ Certified",
  "Raspberry Pi",
  "Networking Basics",
  "React + Vite",
];

// Tool and workflow categories shown in the Tools section.
const toolItems = [
  {
    title: "Windows & Device Setup",
    text: "Configure workstations, peripherals, and software.",
    icon: Monitor,
  },
  {
    title: "Ticketing & Support Flow",
    text: "Handle requests with clear updates and solid follow-through.",
    icon: Ticket,
  },
  {
    title: "Networking Basics",
    text: "Work through Wi-Fi, LAN, and IP issues.",
    icon: ServerCog,
  },
  {
    title: "Security Mindset",
    text: "Support access issues, account setup, and user guidance.",
    icon: ShieldCheck,
  },
];

// Featured case study content for the large summary card under projects.
const featuredProject = {
  eyebrow: "Featured case study",
  title: "Portfolio Website Refresh",
  summary:
    "A rebuild focused on clarity, structure, and mobile usability.",
  challenge:
    "The earlier version made it too hard to find my key skills and projects.",
  approach:
    "I simplified the layout, tightened the copy, and improved responsiveness.",
  outcome:
    "The result is a clearer portfolio with better navigation and a stronger first impression.",
  tech: ["React", "Vite", "GitHub Pages", "Responsive CSS"],
};

// Direct contact methods rendered as clickable cards.
const contactItems = [
  {
    label: "Email",
    value: contactEmail,
    href: contactEmailHref,
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

// Shared section heading component so each section keeps the same layout and
// typography system.
function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="section-intro section-intro--animated">
      {/* Small uppercase label that sits to the left of each section heading. */}
      <span className="section-intro__eyebrow">{eyebrow}</span>
      <div className="section-intro__content">
        {/* Main section title and optional supporting text. */}
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

// Shared link renderer for social/footer links. It handles regular links and
// downloadable links from the same data shape.
function SocialLink({ item, className = "" }) {
  // The icon component is stored in the data object, so we pull it out here
  // and render it like any other React component.
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
  // Web3Forms uses a client-side access key. The env value can override the
  // checked-in fallback during local or GitHub Pages builds.
  const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || fallbackWeb3FormsAccessKey;

  // Ref used to detect clicks outside the header when the mobile menu is open.
  const headerRef = useRef(null);

  // Header/menu UI state.
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Theme preference is persisted so the chosen mode survives reloads.
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  // Stores which contact field was copied most recently so the UI can briefly
  // swap the copy icon to a check mark.
  const [copiedField, setCopiedField] = useState("");

  // Form submission feedback shown below the contact form button.
  const [contactStatus, setContactStatus] = useState({ type: "", message: "" });
  const [sendingMessage, setSendingMessage] = useState(false);

  // Controlled form state for the contact form inputs.
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Keeps desktop/mobile navigation behavior in sync with viewport size and
  // scroll position. On smaller screens, scrolling also closes the open menu.
  useEffect(() => {
    // If the screen grows back to desktop width, force-close the mobile menu so
    // the layout resets cleanly.
    const onResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    // Adds the "scrolled" header style after the page moves down a bit, and
    // also closes the mobile menu while the user scrolls on smaller screens.
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
      if (window.innerWidth <= 900) {
        setMenuOpen(false);
      }
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

  // Watches each page section and updates the active nav item based on what is
  // currently most visible in the viewport.
  useEffect(() => {
    // Build a list of actual section elements from the navigation config.
    const sectionIds = navItems.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // IntersectionObserver is cheaper and cleaner than manually tracking scroll
    // position for every section.
    const observer = new IntersectionObserver(
      (entries) => {
        // Multiple sections can overlap the viewport at once, so we choose the
        // visible section with the strongest intersection ratio.
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        // These values make the active link change around the middle of the
        // viewport instead of right at the top edge.
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Applies the theme to the root document element and saves the preference.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handles mobile-menu dismissal when the user clicks outside the header or
  // presses Escape.
  useEffect(() => {
    // Do not attach outside-click listeners if the menu is closed.
    if (!menuOpen) {
      return undefined;
    }

    // If the click/tap target is outside the header wrapper, close the menu.
    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    // Keyboard-friendly close behavior.
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  // Adds the "is-visible" class once elements scroll into view so the reveal
  // animation only runs once per element.
  useEffect(() => {
    // Every animated block uses the same class name, so one observer can
    // handle all of them.
    const items = document.querySelectorAll(".reveal-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // The CSS animation is controlled by this class switch.
            entry.target.classList.add("is-visible");

            // Stop observing after the first reveal so the animation does not
            // keep replaying while the user scrolls.
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Small helper used by several links/buttons that should always close the
  // mobile navigation.
  const closeMenu = () => setMenuOpen(false);

  // Immediately updates the highlighted nav item when a link is clicked, even
  // before the IntersectionObserver finishes updating.
  const handleNavClick = (id) => {
    setActiveSection(id);
    closeMenu();
  };

  // Generic input handler for the controlled contact form.
  const handleContactChange = (event) => {
    const { name, value } = event.target;

    // Because each input's "name" matches a key in contactForm, one handler is
    // enough for the whole form.
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  // Sends the contact form to Web3Forms, with a mailto fallback if the service
  // is not configured or cannot be reached.
  const handleContactSubmit = async (event) => {
    event.preventDefault();

    if (sendingMessage) {
      return;
    }

    const form = event.currentTarget;
    const subject = `Portfolio inquiry from ${contactForm.name || "a visitor"}`;
    const fallbackEmailHref = `${contactEmailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      [`Name: ${contactForm.name}`, `Email: ${contactForm.email}`, "", contactForm.message].join("\n")
    )}`;

    const openEmailFallback = () => {
      window.location.href = fallbackEmailHref;
    };

    setSendingMessage(true);
    setContactStatus({ type: "", message: "" });

    if (!web3FormsAccessKey) {
      openEmailFallback();
      setContactStatus({
        type: "success",
        message: "Your email app is opening with the message filled in. Press send there to finish.",
      });
      setSendingMessage(false);
      return;
    }

    try {
      const formData = new FormData(form);
      formData.append("access_key", web3FormsAccessKey);
      formData.append("subject", subject);
      formData.append("from_name", "Mahendra Portfolio");
      formData.append("replyto", contactForm.email);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { success: response.ok, message: await response.text() };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send message right now.");
      }

      // Reset the form only after a confirmed success.
      setContactForm({
        name: "",
        email: "",
        message: "",
      });
      setContactStatus({
        type: "success",
        message: "Message sent. You should receive it in your email and can reply from your phone.",
      });
    } catch {
      openEmailFallback();
      setContactStatus({
        type: "success",
        message: "I could not send it automatically, so your email app is opening with the message filled in. Press send there to finish.",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  // Copies contact details like email or phone number to the clipboard and
  // briefly shows success feedback in the relevant card.
  const handleCopy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);

      // Clear the temporary success state after a short delay so the icon can
      // switch back to the normal copy indicator.
      window.setTimeout(() => setCopiedField(""), 1800);
    } catch {
      // If clipboard access fails, avoid showing a misleading success state.
      setCopiedField("");
    }
  };

  return (
    <div className="site-shell">
      {/* Accessibility skip link for keyboard and screen-reader users. */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Decorative background layers controlled by CSS. */}
      <div className="site-shell__gradient site-shell__gradient--one" aria-hidden="true" />
      <div className="site-shell__gradient site-shell__gradient--two" aria-hidden="true" />

      {/* Sticky site header with brand, navigation, theme toggle, and resume CTA. */}
      <header ref={headerRef} className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <div className="topbar__inner">
          <a href="#hero" className="brand" onClick={closeMenu}>
            <span className="brand__name">Mahendra Ranwa</span>
            <span className="brand__role">IT Support | Help Desk | Technical Support</span>
          </a>

          {/* Mobile menu toggle. Hidden on larger screens through CSS. */}
          <button
            type="button"
            className="topbar__toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          {/* Navigation panel that becomes collapsible on smaller screens. */}
          <div className={`topbar__panel ${menuOpen ? "topbar__panel--open" : ""}`}>
            <nav className="topbar__nav" aria-label="Primary">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`topbar__link ${activeSection === item.id ? "topbar__link--active" : ""}`}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <a
              href={`${assetBase}Mahendra_Ranwa_IT_Helpdesk_Resume.pdf`}
              download
              className="button button--primary topbar__mobile-resume"
              onClick={closeMenu}
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Theme switcher toggles the light/dark data attribute on <html>. */}
          <button
            type="button"
            className="theme-toggle"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href={`${assetBase}Mahendra_Ranwa_IT_Helpdesk_Resume.pdf`}
            download
            className="button button--primary button--resume topbar__resume"
          >
            <Download size={16} />
            <span>Resume</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        {/* Hero: first impression, positioning, and primary actions. */}
        <section className="hero" id="hero">
          <div className="hero__inner">
            {/* Left side: positioning statement, quick summary, and key actions. */}
            <div className="hero__copy section-intro--animated reveal-on-scroll">
              <span className="eyebrow hero__eyebrow">
                Entry-level IT and desktop operations
              </span>
              <p className="hero__kicker">Windows setup. Fast fixes. Calm communication.</p>
              <h1>Turning "did you try restarting it?" into actual solutions.</h1>
              <p className="hero__lead">
                Computer Engineering Technology graduate with hands-on
                experience in lab support, Windows setup, and troubleshooting.
              </p>
              <div className="hero__availability" aria-label="Availability details">
                <span>Based in Brampton, Ontario</span>
                <span>Open to on-site, hybrid, and entry-level tech roles</span>
              </div>

              {/* Main calls to action: download resume or jump to project work. */}
              <div className="hero__actions">
                <a href={`${assetBase}Mahendra_Ranwa_IT_Helpdesk_Resume.pdf`} download className="button button--primary">
                  <span>Download Resume</span>
                </a>
                <a href="#work" className="button button--secondary">
                  <span>View Projects</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Reuses the shared social link component for consistency. */}
              <div className="hero__socials">
                {socialLinks.map((item) => (
                  <SocialLink key={item.label} item={item} className="inline-link" />
                ))}
              </div>
            </div>

            {/* Right-side hero panel with portrait and quick credibility points. */}
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
                  <h2>Focused on help desk and desktop support roles</h2>
                  <p>
                    Looking for a role where I can solve issues, support users,
                    and keep devices running smoothly.
                  </p>
                  <div className="hero-card__badge">
                    <BadgeCheck size={16} />
                    <span>Available for technician and operations roles</span>
                  </div>
                </div>
              </div>

              {/* These smaller cards are generated from heroStats for easy editing. */}
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

        {/* Quick keyword strip to make the page more scannable. */}
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

        {/* Work section: project cards plus one featured case study. */}
        <section className="section section--work" id="work">
          <SectionIntro
            eyebrow="Selected work"
            title="Projects that show how I work."
            text=""
          />

          {/* Standard project card grid driven by the projects array above. */}
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
                  {/* Card metadata gives quick context before the longer text. */}
                  <div className="project-card__topline">
                    <span className="project-card__type">{project.type}</span>
                    <span className="project-card__metric">{project.metric}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-card__summary">{project.summary}</p>
                  <p>{project.description}</p>
                  {/* Secondary details are grouped into a mini facts grid. */}
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
                  {/* Reusable tag list for quick tech scanning. */}
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

          {/* Larger project breakdown to explain process, not just output. */}
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

        {/* About section: experience on the left, supporting profile details on the right. */}
        <section className="section section--about" id="about">
          <SectionIntro
            eyebrow="About"
            title="Hands-on experience backed by technical training."
            text=""
          />

          <div className="about-grid">
            <div className="about-panel section-intro--animated reveal-on-scroll">
              <h3>Experience</h3>
              {/* Experience timeline built from the experience array. */}
              <div className="timeline">
                {experience.map((item) => (
                  <article key={item.role} className="timeline__item">
                    <div className="timeline__meta">
                      <span>{item.date}</span>
                      <h4>{item.role}</h4>
                      <p>{item.company}</p>
                    </div>
                    {/* Bullets are text-only now; the old decorative timeline dots were removed. */}
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
                  <h3>Reliable, practical, and ready to help</h3>
                  <p>
                    I like solving problems, preparing devices, and helping
                    people get back to work quickly.
                  </p>
                </div>
              </article>

              {/* Qualifications are kept separate so recruiters can scan them quickly. */}
              <article className="info-card section-intro--animated reveal-on-scroll">
                <h3>Credentials</h3>
                <ul className="info-list">
                  {credentials.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              {/* Compact strengths list for short, high-value personal traits. */}
              <article className="info-card section-intro--animated reveal-on-scroll">
                <h3>Strengths</h3>
                <div className="strength-grid">
                  {strengths.map((item) => {
                    // Each strength also stores its icon component in the data.
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

        {/* Services/support areas section: what the user can contribute day one. */}
        <section className="section section--services" id="services">
          <SectionIntro
            eyebrow="Support Areas"
            title="Areas where I can contribute from day one."
            text=""
          />

          {/* Same pattern as projects: the array drives the whole card layout. */}
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

        {/* Tools section: practical technical categories rather than exhaustive tools. */}
        <section className="section section--tools" id="tools">
          <SectionIntro
            eyebrow="Tools I Use"
            title="Technical areas I use in day-to-day work."
            text=""
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

        {/* Contact section: intro, form, direct contact cards, and location card. */}
        <section className="section section--contact" id="contact">
          <div className="contact-panel section-intro--animated reveal-on-scroll">
            <div className="contact-panel__copy">
              <span className="section-intro__eyebrow">Contact</span>
              <h2>Let&apos;s connect.</h2>
              <p>
                I&apos;m open to help desk, desktop support, and entry-level IT roles.
              </p>
              <p className="contact-panel__response">I usually respond within 24 hours.</p>
              <div className="contact-panel__actions">
                <a href={contactEmailHref} className="button button--primary">
                  <Mail size={16} />
                  <span>Email Me</span>
                </a>
                <SocialLink item={socialLinks[2]} className="button button--secondary" />
              </div>
            </div>

            <div className="contact-panel__side">
              {/* Controlled contact form that submits through Web3Forms. */}
              <form className="contact-form" onSubmit={handleContactSubmit} aria-busy={sendingMessage}>
                <input
                  type="checkbox"
                  name="botcheck"
                  className="contact-form__botcheck"
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                />
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
                <button type="submit" className="button button--primary" disabled={sendingMessage}>
                  <Send size={16} />
                  <span>{sendingMessage ? "Sending..." : "Send Message"}</span>
                </button>
                {/* Success and error states share the same output area with a
                    modifier class controlling the final styling. */}
                {contactStatus.message ? (
                  <p
                    className={`contact-form__status ${
                      contactStatus.type === "success" ? "contact-form__status--success" : "contact-form__status--error"
                    }`}
                    role="status"
                  >
                    {contactStatus.message}
                  </p>
                ) : null}
              </form>

              {/* Direct contact cards for people who prefer email/phone/map actions. */}
              <div className="contact-list">
                {contactItems.map((item) => {
                  // Contact cards can either copy data (email/phone) or behave
                  // like a normal external link (location).
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

              <a
                href="https://maps.google.com/?q=Brampton,Ontario"
                target="_blank"
                rel="noreferrer noopener"
                className="contact-map"
                aria-label="Open Brampton, Ontario in Google Maps"
              >
                <div className="contact-map__pin">
                  <MapPin size={18} />
                </div>
                <div className="contact-map__content">
                  <span>Based in</span>
                  <strong>Brampton, Ontario</strong>
                  <p>Open to on-site, hybrid, and entry-level tech roles.</p>
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer repeats the essentials and provides quick exit links. */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__meta">
            <p>&copy; 2026 Mahendra Ranwa. Built for help desk and entry-level IT opportunities.</p>
            <span className="footer__tagline">Windows setup, issue diagnosis, and clear communication.</span>
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

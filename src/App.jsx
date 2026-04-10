import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Briefcase,
  Cable,
  ChevronRight,
  Cpu,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Monitor,
  Phone,
  Sparkles,
  Wrench,
} from "lucide-react";
import "./App.css";

// Shared motion preset for simple upward reveal animations.
const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay, ease: "easeOut" },
  }),
};

// Shared stagger preset keeps section reveals paced consistently.
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Persistent keys and asset helpers used across the portfolio.
const assetBase = import.meta.env.BASE_URL;
const MODE_KEY = "portfolio-mode";
const PROJECT_KEY = "portfolio-project";
const OVERLAY_KEY = "portfolio-overlay-dismissed";

// Main navigation labels stay straightforward for fast scanning.
const navItems = [
  { id: "hero", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// External links shown in the header and footer.
const quickLinks = [
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

// Each mode changes the same resume-based story for different audiences.
const modeConfig = {
  recruiter: {
    name: "Recruiter Mode",
    heroTitle: "Mahendra Ranwa",
    heroSubtitle:
      "Entry-level IT support and help desk candidate with hands-on experience supporting Windows systems, troubleshooting technical issues, and assisting users.",
    heroLead:
      "Hands-on experience troubleshooting hardware, software, and network issues in academic environments. Comfortable with Windows setup, user support, connectivity troubleshooting, and practical issue resolution. Currently pursuing CompTIA A+ certification with Core 1 completed.",
    heroSignals: [
      "Brampton, ON",
      "IT Support / Help Desk / Desktop Support",
      "CompTIA A+ Core 1 completed",
    ],
    heroCards: [
      { title: "Best Fit", value: "IT Support, Help Desk, Desktop Support" },
      { title: "Core Strength", value: "Windows support, troubleshooting, and user assistance" },
      { title: "Current Focus", value: "CompTIA A+ in progress with hands-on technical learning" },
    ],
    markNotes: {
      profile: "A quick summary of experience, direction, and how the support work fits entry-level IT roles.",
      skills: "Technical skills grouped around operating systems, networking, tools, and hands-on support work.",
      projects: "Projects that show setup, troubleshooting, remote access, and technical problem solving in practice.",
      experience: "Support work, tutoring, education, and certifications presented as direct hiring evidence.",
      contact: "A direct closing section for recruiters and hiring managers.",
    },
  },
  technical: {
    name: "Technical Mode",
    heroTitle: "Mahendra Ranwa",
    heroSubtitle:
      "Windows support, diagnostics, and structured troubleshooting across hardware, software, networking, and workstation setup.",
    heroLead:
      "This view highlights the technical side of the resume: Windows 10/11, TCP/IP, DNS, DHCP, IP configuration, Office 365, Git, SSH, VNC, hardware support, and structured diagnostics across academic labs and technical projects.",
    heroSignals: ["Windows 10/11", "TCP/IP, DNS, DHCP", "SSH, VNC, and system setup"],
    heroCards: [
      { title: "Environment", value: "Lab systems, shared workstations, and project-based setups" },
      { title: "Technical Focus", value: "Diagnostics, configuration, remote access, and issue isolation" },
      { title: "Workflow", value: "Identify, test, verify, and document the issue path" },
    ],
    markNotes: {
      profile: "Technical framing centered on setup, diagnostics, troubleshooting, and support workflow.",
      skills: "Grouped to show the systems, tools, networking basics, and support tasks used across the resume.",
      projects: "Projects presented as technical cases with setup steps, troubleshooting, and outcomes.",
      experience: "Experience shown as practical support work rather than general summaries.",
      contact: "A concise close after the technical walkthrough.",
    },
  },
  narrative: {
    name: "Narrative Mode",
    heroTitle: "Mahendra Ranwa",
    heroSubtitle:
      "A guided portfolio view that connects support experience, technical projects, and career direction.",
    heroLead:
      "This path moves from profile to skills, projects, and experience so the portfolio reads like a clear introduction: who I am, what I can support, how I troubleshoot, and why I fit entry-level IT support and help desk roles.",
    heroSignals: ["Profile and direction", "Skills and projects", "Experience and credentials"],
    heroCards: [
      { title: "Start", value: "Role, support background, and current direction" },
      { title: "Middle", value: "Skills, projects, and troubleshooting examples" },
      { title: "Finish", value: "Experience, education, certifications, and contact" },
    ],
    markNotes: {
      profile: "The introduction section explains the support background and what kind of role this portfolio targets.",
      skills: "The skill section shows the technical base behind the support work.",
      projects: "The project section connects classroom and personal work to real troubleshooting ability.",
      experience: "The lower half turns the story into concrete proof from work, education, and certifications.",
      contact: "The final section keeps outreach simple and direct.",
    },
  },
};

// Profile cards introduce background, direction, and work style.
const profileCards = [
  {
    label: "Support Profile",
    title: "Hands-on support experience in academic environments",
    text:
      "Hands-on experience troubleshooting hardware, software, and network issues in Sheridan College lab environments while supporting users and keeping shared systems operational.",
  },
  {
    label: "Career Direction",
    title: "Focused on entry-level IT support, help desk, and desktop support roles",
    text:
      "Seeking opportunities where Windows support, issue diagnosis, workstation setup, and user assistance are part of the day-to-day work.",
  },
  {
    label: "Working Style",
    title: "Practical troubleshooting with clear user communication",
    text:
      "Approaches technical issues in a structured way, explains steps clearly, and aims to restore service with minimal disruption for the user.",
  },
];

// Strength cards summarize the support behaviors that matter most to hiring teams.
const strengths = [
  {
    icon: Wrench,
    title: "Troubleshooting",
    text: "Applies a practical troubleshooting process across hardware, software, and basic connectivity issues.",
    points: ["Hardware and software faults", "Wi-Fi, LAN, and IP issues", "Step-by-step issue diagnosis"],
  },
  {
    icon: Monitor,
    title: "Windows & Workstations",
    text: "Comfortable with Windows environments, shared workstations, software setup, and day-to-day desktop support tasks.",
    points: ["Windows 10/11", "System setup", "Software installation"],
  },
  {
    icon: Briefcase,
    title: "User Support",
    text: "Focuses on helping users through login issues, application problems, and technical questions with clear communication.",
    points: ["User-facing support", "Clear communication", "Dependable follow-through"],
  },
];

// Technical skills stay grouped in recruiter-friendly categories.
const skillGroups = [
  {
    icon: Monitor,
    title: "Operating Systems",
    items: ["Windows 10/11", "Linux/UNIX"],
  },
  {
    icon: Cable,
    title: "Networking",
    items: ["TCP/IP", "DNS", "DHCP", "IP configuration", "Basic troubleshooting"],
  },
  {
    icon: Cpu,
    title: "Tools & Platforms",
    items: ["Office 365", "Git", "Anaconda", "MPLAB X", "STM32CubeMX"],
  },
  {
    icon: Wrench,
    title: "Hardware & Support",
    items: ["PC assembly", "Peripherals", "Printers", "Ticket handling", "Issue diagnosis", "User support", "System setup", "Documentation"],
  },
];

// Project cases are written from the resume and kept practical.
const projects = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    category: "Project 01 / Portfolio Website",
    stack: "React, Vite, JavaScript, HTML, CSS",
    summary: "Responsive portfolio website built to present technical work clearly across desktop and mobile devices.",
    outcome: "Strengthened frontend troubleshooting, deployment, and production debugging skills.",
    image: "",
    actions: [
      "Developed and deployed the site using React, Vite, JavaScript, HTML, and CSS.",
      "Managed version control and deployment through Git and GitHub Pages.",
      "Resolved broken asset paths and production build issues during deployment.",
      "Improved layout and responsiveness for desktop and mobile viewing.",
    ],
    notes: ["Responsive design", "Deployment debugging", "Production fixes"],
  },
  {
    id: "smart-car",
    title: "Raspberry Pi Smart Car System",
    category: "Project 02 / Raspberry Pi System",
    stack: "Python, Raspberry Pi, SSH, VNC, sensors",
    summary: "Raspberry Pi project focused on system setup, remote access, sensor integration, and hardware troubleshooting.",
    outcome: "Improved troubleshooting across configuration, connectivity, power, and hardware interfacing.",
    image: `${assetBase}buggy.jpg`,
    actions: [
      "Built and configured a three-wheel smart car using motors, sensors, and control modules.",
      "Installed and configured Raspberry Pi OS and the system environment.",
      "Established SSH and VNC access for monitoring and remote control.",
      "Integrated an ultrasonic sensor for distance measurement and obstacle detection.",
    ],
    notes: ["Remote access", "Sensor integration", "Power and wiring"],
  },
  {
    id: "diagnostics",
    title: "System Troubleshooting & Diagnostics",
    category: "Project 03 / Diagnostics Work",
    stack: "Hardware diagnostics, debugging, system testing",
    summary: "Diagnostics-focused work centered on identifying faults and validating stable fixes.",
    outcome: "Built a more methodical approach to testing, fault isolation, and verification.",
    image: `${assetBase}embedded-control.jpg`,
    actions: [
      "Applied structured debugging methods across hardware and software faults.",
      "Performed system-level testing to isolate issues and confirm stable fixes.",
      "Used testing and verification to narrow down likely causes of faults.",
      "Focused on confirming stable fixes after troubleshooting work.",
    ],
    notes: ["Issue isolation", "Testing", "Verification"],
  },
];

// Experience bullets are kept close to the resume wording.
const experienceItems = [
  {
    role: "Support Technician",
    company: "Sheridan College IT Centre, Brampton",
    date: "Apr 2024 - Aug 2024",
    bullets: [
      "Provided technical support for hardware, software, and network issues in lab environments.",
      "Installed and configured Windows systems and academic software across multiple workstations.",
      "Diagnosed Wi-Fi, LAN, and IP configuration issues and restored connectivity.",
      "Assisted users with login issues, system errors, and application troubleshooting.",
      "Helped reduce downtime by resolving faults quickly in shared academic environments.",
    ],
  },
  {
    role: "Web Technician (Volunteer)",
    company: "U+ Toastmasters Academy",
    date: "Sep 2025 - Mar 2026",
    bullets: [
      "Maintained website functionality and resolved technical issues affecting day-to-day use.",
      "Supported users with content updates and access-related problems.",
      "Worked with team members to keep the site reliable and usable.",
    ],
  },
  {
    role: "Tutor - Electronics Fabrication",
    company: "Sheridan College",
    date: "May 2023 - Dec 2023",
    bullets: [
      "Assisted students with troubleshooting hardware and circuit-related issues.",
      "Guided proper use of tools, test equipment, and debugging techniques.",
      "Supported hands-on learning by helping students work through technical problems step by step.",
    ],
  },
];

// Education and certification entries support the hiring story.
const credentials = [
  {
    title: "Computer Engineering Technology (Advanced Diploma)",
    org: "Sheridan College",
    date: "Jan 2023 - Apr 2026",
  },
  {
    title: "CompTIA A+ (In Progress)",
    org: "Core 1 completed, Core 2 in progress",
    date: "Current",
  },
  {
    title: "IT Service Desk: Service Management",
    org: "Professional development",
    date: "Mar 2026",
  },
  {
    title: "Computer Components and Peripherals for IT Technicians",
    org: "Professional development",
    date: "Mar 2026",
  },
];

// Direct contact actions stay simple and recruiter-friendly.
const contactMethods = [
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

// Mini simulator cases mirror the kinds of problems shown in the resume.
const troubleshootingCases = [
  {
    id: "login",
    symptom: "User cannot log in",
    assessment: "Check username, password state, and whether the issue is local or account-related.",
    action: "Confirm credentials, test another account or device, and isolate whether the problem is workstation, application, or user-account specific.",
    result: "Restore access or escalate with clearer issue context.",
  },
  {
    id: "network",
    symptom: "Workstation is offline",
    assessment: "Check Wi-Fi or LAN state first, then confirm IP configuration and network behavior.",
    action: "Review adapter status, verify physical or wireless connection, test basic IP settings, and compare with a working system.",
    result: "Restore connectivity or narrow the issue to network, device, or configuration.",
  },
  {
    id: "software",
    symptom: "Application fails to launch",
    assessment: "Check whether the issue is installation-related, permission-related, or environment-specific.",
    action: "Verify software status, confirm prerequisites, test relaunch, and compare with a known-good workstation setup.",
    result: "Return the application to usable state or document the fault path clearly.",
  },
];

// Reads the saved storytelling mode from local storage.
function getSavedMode() {
  if (typeof window === "undefined") return "recruiter";
  return localStorage.getItem(MODE_KEY) ?? "recruiter";
}

// Restores the most recently selected project from local storage.
function getSavedProject() {
  if (typeof window === "undefined") return projects[0].id;
  return localStorage.getItem(PROJECT_KEY) ?? projects[0].id;
}

// Determines whether the entry overlay should appear on load.
function getInitialOverlayState() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(OVERLAY_KEY) !== "true";
}

// Derives a light-environment variant from the current time of day.
function getEnvironmentTheme() {
  const hour = new Date().getHours();
  if (hour < 6 || hour >= 19) return "night";
  if (hour < 12) return "morning";
  return "day";
}

// Adds subtle cursor-based 3D movement to cards.
function useInteractiveCard() {
  const handleMove = (event) => {
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
    element.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
    element.style.setProperty("--light-x", `${((x + 0.5) * 100).toFixed(2)}%`);
    element.style.setProperty("--light-y", `${((y + 0.5) * 100).toFixed(2)}%`);
  };

  const handleLeave = (event) => {
    const element = event.currentTarget;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--light-x", "50%");
    element.style.setProperty("--light-y", "50%");
  };

  return { onMouseMove: handleMove, onMouseLeave: handleLeave };
}

// Enables drag-to-scroll behavior for the horizontal project rail.
function useDragRail() {
  const ref = useRef(null);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return undefined;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onPointerDown = (event) => {
      isDown = true;
      startX = event.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      rail.classList.add("is-dragging");
    };

    const onPointerLeave = () => {
      isDown = false;
      rail.classList.remove("is-dragging");
    };

    const onPointerUp = () => {
      isDown = false;
      rail.classList.remove("is-dragging");
    };

    const onPointerMove = (event) => {
      if (!isDown) return;
      event.preventDefault();
      const x = event.pageX - rail.offsetLeft;
      const walk = (x - startX) * 1.1;
      rail.scrollLeft = scrollLeft - walk;
    };

    rail.addEventListener("pointerdown", onPointerDown);
    rail.addEventListener("pointerleave", onPointerLeave);
    rail.addEventListener("pointerup", onPointerUp);
    rail.addEventListener("pointermove", onPointerMove);

    return () => {
      rail.removeEventListener("pointerdown", onPointerDown);
      rail.removeEventListener("pointerleave", onPointerLeave);
      rail.removeEventListener("pointerup", onPointerUp);
      rail.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return ref;
}

// Renders the shared section heading block.
function SectionMark({ index, title, note }) {
  return (
    <div className="section-mark">
      <div className="section-mark__index">{index}</div>
      <div className="section-mark__text">
        <h2 className="section-mark__title">{title}</h2>
        <p className="section-mark__note">{note}</p>
      </div>
    </div>
  );
}

// Wraps cards with the reusable reactive light and tilt treatment.
function ReactiveCard({ className, children }) {
  const handlers = useInteractiveCard();
  return (
    <div className={`reactive-card ${className || ""}`.trim()} {...handlers}>
      <div className="reactive-card__shine" />
      {children}
    </div>
  );
}

// Main application component for the portfolio experience.
export default function App() {
  const [mode, setMode] = useState(getSavedMode);
  const [selectedProjectId, setSelectedProjectId] = useState(getSavedProject);
  const [overlayStage, setOverlayStage] = useState(() =>
    getInitialOverlayState() ? "active" : "hidden",
  );
  const [activeCase, setActiveCase] = useState(troubleshootingCases[0].id);
  const [environmentTheme, setEnvironmentTheme] = useState(getEnvironmentTheme);
  const [entryPreviewMode, setEntryPreviewMode] = useState(getSavedMode);
  const dragRailRef = useDragRail();

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? projects[0],
    [selectedProjectId],
  );

  const currentCase = useMemo(
    () => troubleshootingCases.find((item) => item.id === activeCase) ?? troubleshootingCases[0],
    [activeCase],
  );

  const currentMode = modeConfig[mode];
  const previewMode = modeConfig[entryPreviewMode];
  const overlayVisible = overlayStage !== "hidden";
  const overlayClosing = overlayStage === "closing";

  // Persists the selected storytelling mode between visits.
  useEffect(() => {
    localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  // Persists the currently selected project between visits.
  useEffect(() => {
    localStorage.setItem(PROJECT_KEY, selectedProjectId);
  }, [selectedProjectId]);

  // Applies the current environment theme as a data attribute for CSS.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.environment = environmentTheme;
  }, [environmentTheme]);

  // Refreshes the environment theme periodically so time-based colors stay current.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setEnvironmentTheme(getEnvironmentTheme());
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  // Tracks pointer position for ambient lighting effects.
  useEffect(() => {
    const handleMouseMove = (event) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Closes the entry overlay and stores that it has already been seen.
  const dismissOverlay = (nextMode) => {
    if (overlayClosing) return;
    setMode(nextMode);
    localStorage.setItem(OVERLAY_KEY, "true");
    setOverlayStage("closing");
    window.setTimeout(() => {
      setOverlayStage("hidden");
    }, 1500);
  };

  return (
    <div className="site-shell">
      {/* Cinematic entry overlay that also lets visitors choose a viewing mode. */}
      {overlayVisible ? (
        <motion.div
          className={`entry-sequence entry-sequence--${entryPreviewMode}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: overlayClosing ? 0 : 1 }}
          transition={{ duration: overlayClosing ? 1.15 : 0.2, ease: "easeInOut" }}
        >
          <div className="entry-sequence__space" aria-hidden="true">
            <motion.div
              className="entry-sequence__ring entry-sequence__ring--outer"
              initial={{ opacity: 0, scale: 0.84, rotate: -12 }}
              animate={{
                opacity: overlayClosing ? 0 : 1,
                scale: overlayClosing ? 1.24 : 1,
                rotate: overlayClosing ? 14 : 0,
              }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <motion.div
              className="entry-sequence__ring entry-sequence__ring--middle"
              initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
              animate={{
                opacity: overlayClosing ? 0 : 1,
                scale: overlayClosing ? 1.12 : 1,
                rotate: overlayClosing ? -10 : 0,
              }}
              transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
            />
            <motion.div
              className="entry-sequence__ring entry-sequence__ring--inner"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: overlayClosing ? 0 : 1, scale: overlayClosing ? 0.82 : 1 }}
              transition={{ duration: 1.2, delay: 0.25, ease: "easeOut" }}
            />
            <motion.div
              className="entry-sequence__core-light"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: overlayClosing ? 0 : 1, scale: overlayClosing ? 1.8 : 1 }}
              transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
            />
          </div>

          {entryPreviewMode === "technical" ? (
            <>
              <motion.div
                className="entry-sequence__door entry-sequence__door--top"
                initial={{ y: 0 }}
                animate={{ y: overlayClosing ? "-102%" : 0 }}
                transition={{ duration: 1.2, ease: [0.72, 0, 0.2, 1] }}
              />
              <motion.div
                className="entry-sequence__door entry-sequence__door--bottom"
                initial={{ y: 0 }}
                animate={{ y: overlayClosing ? "102%" : 0 }}
                transition={{ duration: 1.2, ease: [0.72, 0, 0.2, 1] }}
              />
            </>
          ) : entryPreviewMode === "narrative" ? (
            <motion.div
              className="entry-sequence__iris"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: overlayClosing ? 14 : 1, opacity: overlayClosing ? 0 : 1 }}
              transition={{ duration: 1.2, ease: [0.72, 0, 0.2, 1] }}
            />
          ) : (
            <>
              <motion.div
                className="entry-sequence__door entry-sequence__door--left"
                initial={{ x: 0 }}
                animate={{ x: overlayClosing ? "-102%" : 0 }}
                transition={{ duration: 1.2, ease: [0.72, 0, 0.2, 1] }}
              />
              <motion.div
                className="entry-sequence__door entry-sequence__door--right"
                initial={{ x: 0 }}
                animate={{ x: overlayClosing ? "102%" : 0 }}
                transition={{ duration: 1.2, ease: [0.72, 0, 0.2, 1] }}
              />
            </>
          )}

          <motion.div
            className="entry-sequence__core"
            initial={{ opacity: 0, scale: 0.9, rotateX: 14 }}
            animate={{
              opacity: overlayClosing ? 0 : 1,
              scale: overlayClosing
                ? entryPreviewMode === "narrative"
                  ? 1.08
                  : 0.9
                : 1,
              rotateX: overlayClosing
                ? entryPreviewMode === "technical"
                  ? -18
                  : 12
                : 0,
              y: overlayClosing
                ? entryPreviewMode === "recruiter"
                  ? -32
                  : entryPreviewMode === "technical"
                    ? 28
                    : 12
                : 0,
            }}
            transition={{ duration: 0.95, delay: 0.25, ease: "easeOut" }}
          >
            <div className="entry-sequence__chrome">
              <span />
              <span />
              <span />
            </div>
            <div className="entry-sequence__panel-mark">Portal 01</div>
            <div className="entry-sequence__eyebrow">{previewMode.name}</div>
            <h1 className="entry-sequence__title">Mahendra Ranwa</h1>
            <p className="entry-sequence__text">
              {previewMode.heroSubtitle} The site will remember how you explored it.
            </p>

            <div className="entry-sequence__signals">
              {previewMode.heroSignals.map((signal) => (
                <span key={signal} className="entry-sequence__signal">
                  {signal}
                </span>
              ))}
            </div>

            <div className="entry-sequence__modes">
              {Object.entries(modeConfig).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => dismissOverlay(key)}
                  onMouseEnter={() => setEntryPreviewMode(key)}
                  onFocus={() => setEntryPreviewMode(key)}
                  className="entry-sequence__mode"
                >
                  <span>{value.name}</span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => dismissOverlay(mode)}
              onMouseEnter={() => setEntryPreviewMode(mode)}
              className="entry-sequence__skip"
            >
              Continue with saved mode
            </button>
          </motion.div>
        </motion.div>
      ) : null}

      {/* Ambient background layers add motion and depth behind the site. */}
      <div className="ambient-layer" aria-hidden="true">
        <div className="ambient-layer__orb ambient-layer__orb--one" />
        <div className="ambient-layer__orb ambient-layer__orb--two" />
        <div className="ambient-layer__orb ambient-layer__orb--three" />
        <div className="ambient-layer__grid" />
        <div className="ambient-layer__cursor" />
      </div>

      {/* Top navigation keeps the resume, contact links, and section anchors visible. */}
      <header className="masthead">
        <a href="#hero" className="masthead__brand">
          Mahendra<span>.ranwa</span>
        </a>

        <nav className="masthead__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="masthead__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="masthead__actions">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.download ? undefined : "_blank"}
                rel={link.download ? undefined : "noreferrer"}
                download={link.download || undefined}
                className="masthead__action"
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </header>

      <main className="page-stack">
        {/* Hero section introduces the candidate and highlights the current viewing mode. */}
        <section id="hero" className="hero-assembly room room--hero">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="hero-assembly__headline"
          >
            <motion.div variants={fadeInUp} custom={0.03} className="hero-assembly__badge">
              <Sparkles size={14} />
              {currentMode.name}
            </motion.div>

            <motion.h1 variants={fadeInUp} custom={0.12} className="hero-assembly__title">
              {currentMode.heroTitle}
            </motion.h1>

            <motion.p variants={fadeInUp} custom={0.16} className="hero-assembly__role">
              {currentMode.heroSubtitle}
            </motion.p>

            <motion.p variants={fadeInUp} custom={0.22} className="hero-assembly__lead">
              {currentMode.heroLead}
            </motion.p>

            <motion.div variants={stagger} className="hero-assembly__signals">
              {currentMode.heroSignals.map((signal) => (
                <motion.span key={signal} variants={fadeInUp} className="hero-assembly__signal">
                  {signal}
                </motion.span>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} custom={0.3} className="hero-assembly__actions">
              <a href="#projects" className="cta cta--solid">
                View Projects
                <ArrowRight size={16} />
              </a>
              <a href="#skills" className="cta cta--ghost">
                View Skills
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.74, ease: "easeOut" }}
            className="hero-assembly__visuals"
          >
            <ReactiveCard className="hero-poster">
              <div className="hero-poster__top">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-poster__stage">
                <img
                  src={`${assetBase}mahendra.jpeg`}
                  alt="Mahendra Ranwa"
                  className="hero-poster__image"
                />
                <div className="hero-poster__stamp">
                  <div className="hero-poster__stamp-label">Active Mode</div>
                  <div className="hero-poster__stamp-value">{currentMode.name}</div>
                </div>
              </div>
            </ReactiveCard>

            <div className="mode-switch">
              {Object.entries(modeConfig).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  className={`mode-switch__button ${key === mode ? "mode-switch__button--active" : ""}`}
                >
                  {value.name}
                </button>
              ))}
            </div>

            <div className="hero-strip">
              {currentMode.heroCards.map((card) => (
                <ReactiveCard key={card.title} className="hero-strip__card">
                  <div className="hero-strip__title">{card.title}</div>
                  <div className="hero-strip__value">{card.value}</div>
                </ReactiveCard>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Transition label keeps the room-based story flow readable. */}
        <div className="section-transition">
          <span>Home to Profile</span>
        </div>

        {/* Profile section explains support background and career direction. */}
        <section id="profile" className="section-band room room--profile">
          <SectionMark index="01" title="Profile" note={currentMode.markNotes.profile} />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="profile-band"
          >
            {profileCards.map((card, index) => (
              <motion.article
                key={card.label}
                variants={fadeInUp}
                className={`profile-band__card ${index === 0 ? "profile-band__card--feature" : ""}`}
              >
                <ReactiveCard className="profile-band__interactive">
                  <div className="profile-band__eyebrow">{card.label}</div>
                  <h3 className="profile-band__title">{card.title}</h3>
                  <p className="profile-band__text">{card.text}</p>
                </ReactiveCard>
              </motion.article>
            ))}
          </motion.div>
        </section>

        <div className="section-transition">
          <span>Profile to Skills</span>
        </div>

        {/* Skills section combines strengths, grouped skills, and a troubleshooting example. */}
        <section id="skills" className="section-band section-band--contrast room room--system">
          <SectionMark index="02" title="Skills" note={currentMode.markNotes.skills} />

          <div className="skill-wall">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="skill-wall__strengths"
            >
              {strengths.map((strength) => {
                const Icon = strength.icon;
                return (
                  <motion.article key={strength.title} variants={fadeInUp}>
                    <ReactiveCard className="strength-panel">
                      <div className="strength-panel__icon">
                        <Icon size={18} />
                      </div>
                      <h3 className="strength-panel__title">{strength.title}</h3>
                      <p className="strength-panel__text">{strength.text}</p>
                      <ul className="strength-panel__list">
                        {strength.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </ReactiveCard>
                  </motion.article>
                );
              })}
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="skill-wall__grid"
            >
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <motion.article key={group.title} variants={fadeInUp}>
                    <ReactiveCard className="skill-panel">
                      <div className="skill-panel__icon">
                        <Icon size={18} />
                      </div>
                      <h3 className="skill-panel__title">{group.title}</h3>
                      <div className="skill-panel__items">
                        {group.items.map((item) => (
                          <span key={item} className="skill-panel__item">
                            {item}
                          </span>
                        ))}
                      </div>
                    </ReactiveCard>
                  </motion.article>
                );
              })}
            </motion.div>

            <ReactiveCard className="tool-simulator">
              <div className="tool-simulator__eyebrow">Support Example</div>
              <h3 className="tool-simulator__title">Troubleshooting Simulator</h3>
              <div className="tool-simulator__tabs">
                {troubleshootingCases.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCase(item.id)}
                    className={`tool-simulator__tab ${item.id === activeCase ? "tool-simulator__tab--active" : ""}`}
                  >
                    {item.symptom}
                  </button>
                ))}
              </div>
              <div className="tool-simulator__panel">
                <div className="tool-simulator__line">
                  <span>Symptom</span>
                  <p>{currentCase.symptom}</p>
                </div>
                <div className="tool-simulator__line">
                  <span>Assessment</span>
                  <p>{currentCase.assessment}</p>
                </div>
                <div className="tool-simulator__line">
                  <span>Action</span>
                  <p>{currentCase.action}</p>
                </div>
                <div className="tool-simulator__line">
                  <span>Result</span>
                  <p>{currentCase.result}</p>
                </div>
              </div>
            </ReactiveCard>
          </div>
        </section>

        <div className="section-transition">
          <span>Skills to Projects</span>
        </div>

        {/* Projects section presents resume-backed work as case files. */}
        <section id="projects" className="section-band room room--cases">
          <SectionMark index="03" title="Projects" note={currentMode.markNotes.projects} />

          <div className="project-stage">
            <motion.article
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <ReactiveCard className="project-stage__feature">
                <div className="project-stage__media">
                  {selectedProject.id === "portfolio" ? (
                    <div className="project-stage__mock">
                      <div className="project-stage__mock-top">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="project-stage__mock-title">Mahendra Ranwa</div>
                      <div className="project-stage__mock-subtitle">IT Support Portfolio</div>
                      <div className="project-stage__mock-line" />
                      <div className="project-stage__mock-line project-stage__mock-line--short" />
                      <div className="project-stage__mock-hero">
                        <div className="project-stage__mock-hero-copy">
                          Windows support, troubleshooting, and practical user assistance.
                        </div>
                        <div className="project-stage__mock-hero-badge">Open to IT Support Roles</div>
                      </div>
                      <div className="project-stage__mock-grid">
                        <div className="project-stage__mock-block">
                          <span>Profile</span>
                        </div>
                        <div className="project-stage__mock-block">
                          <span>Projects</span>
                        </div>
                        <div className="project-stage__mock-block">
                          <span>Contact</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="project-stage__image"
                    />
                  )}
                </div>

                <div className="project-stage__content">
                  <div className="project-stage__meta">
                    <span>{selectedProject.category}</span>
                    <span>{selectedProject.stack}</span>
                  </div>
                  <h3 className="project-stage__title">{selectedProject.title}</h3>
                  <p className="project-stage__summary">{selectedProject.summary}</p>

                  <div className="project-stage__outcome">
                    <div className="project-stage__outcome-label">Outcome</div>
                    <p>{selectedProject.outcome}</p>
                  </div>

                  <ul className="project-stage__list">
                    {selectedProject.actions.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="project-stage__notes">
                    {selectedProject.notes.map((note) => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>
                </div>
              </ReactiveCard>
            </motion.article>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="project-stage__rail-wrap"
            >
              <div ref={dragRailRef} className="project-stage__rail">
                {projects.map((project) => (
                  <motion.button
                    key={project.id}
                    type="button"
                    variants={fadeInUp}
                    onClick={() => setSelectedProjectId(project.id)}
                    className={`project-chooser ${project.id === selectedProject.id ? "project-chooser--active" : ""}`}
                  >
                    <span className="project-chooser__category">{project.category}</span>
                    <span className="project-chooser__title">{project.title}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="section-transition">
          <span>Projects to Experience</span>
        </div>

        {/* Experience section pairs work history with education and certifications. */}
        <section id="experience" className="section-band section-band--contrast room room--field">
          <SectionMark index="04" title="Experience" note={currentMode.markNotes.experience} />

          <div className="info-zone">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="info-zone__main"
            >
              {experienceItems.map((item) => (
                <motion.article key={item.role} variants={fadeInUp}>
                  <ReactiveCard className="experience-strip">
                    <div className="experience-strip__top">
                      <div>
                        <h3 className="experience-strip__title">{item.role}</h3>
                        <div className="experience-strip__company">{item.company}</div>
                      </div>
                      <div className="experience-strip__date">{item.date}</div>
                    </div>
                    <ul className="experience-strip__list">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </ReactiveCard>
                </motion.article>
              ))}
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="info-zone__side"
            >
              {credentials.map((credential) => (
                <motion.article key={credential.title} variants={fadeInUp}>
                  <ReactiveCard className="credential-tile">
                    <div className="credential-tile__icon">
                      <Award size={18} />
                    </div>
                    <div>
                      <h3 className="credential-tile__title">{credential.title}</h3>
                      <div className="credential-tile__org">{credential.org}</div>
                      <div className="credential-tile__date">{credential.date}</div>
                    </div>
                  </ReactiveCard>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-transition">
          <span>Experience to Contact</span>
        </div>

        {/* Contact section gives a clear hiring CTA and direct contact paths. */}
        <section id="contact" className="section-band room room--contact">
          <SectionMark index="05" title="Contact" note={currentMode.markNotes.contact} />

          <div className="contact-stage">
            <motion.article
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
            >
              <ReactiveCard className="contact-stage__feature">
                <div className="contact-stage__label">Available For</div>
                <h3 className="contact-stage__title">Entry-level IT support, help desk, and desktop support opportunities</h3>
                <p className="contact-stage__text">
                  If you are hiring for an entry-level support role, I would be glad to discuss how I can contribute through troubleshooting, system setup, and day-to-day user support.
                </p>

                <div className="contact-stage__actions">
                  <a href="mailto:mranwa100@gmail.com" className="cta cta--solid">
                    Email Me
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mahendra-ranwa/"
                    target="_blank"
                    rel="noreferrer"
                    className="cta cta--ghost"
                  >
                    LinkedIn
                  </a>
                </div>

                <div className="contact-stage__support-strip">
                  <span>Windows Support</span>
                  <span>User Assistance</span>
                  <span>Technical Troubleshooting</span>
                </div>
              </ReactiveCard>
            </motion.article>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="contact-stage__cards"
            >
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <motion.a
                    key={method.label}
                    href={method.href}
                    target={method.label === "Location" ? "_blank" : undefined}
                    rel={method.label === "Location" ? "noreferrer" : undefined}
                    variants={fadeInUp}
                    className="contact-card"
                  >
                    <ReactiveCard className="contact-card__inner">
                      <div className="contact-card__icon">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="contact-card__label">{method.label}</div>
                        <div className="contact-card__value">{method.value}</div>
                      </div>
                    </ReactiveCard>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer repeats the core role fit without repeating the full introduction. */}
      <footer className="footer-bar">
        <div>
          <div className="footer-bar__brand">Mahendra.ranwa</div>
          <p className="footer-bar__text">
            Entry-level IT support portfolio focused on Windows systems, troubleshooting, and practical user support.
          </p>
        </div>

        <div className="footer-bar__links">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel={link.download ? undefined : "noreferrer"}
              download={link.download || undefined}
              className="footer-bar__link"
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

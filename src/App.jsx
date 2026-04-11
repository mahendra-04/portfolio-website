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
      "IT Support Technician focused on diagnosing and resolving system, network, and hardware issues efficiently.",
    heroLead:
      "Recent Computer Engineering Technology graduate building toward IT Help Desk and Desktop Support roles through hands-on lab support, Windows setup, and structured troubleshooting.",
    heroSignals: [
      "CompTIA A+ Core 1 completed",
      "Hands-on with Windows, networking, and hardware troubleshooting",
      "Supported workstation setup, software installs, and issue resolution in shared labs",
    ],
    heroCards: [
      { title: "Role Focus", value: "IT Help Desk, Desktop Support, and Technical Support roles" },
      { title: "Core Strengths", value: "Windows support, endpoint setup, connectivity checks, and user-facing troubleshooting" },
      { title: "Proof", value: "IT Centre support experience, hands-on projects, and active certification progress" },
    ],
    markNotes: {
      profile: "A clear overview of my background, support experience, and direction in IT.",
      skills: "Technical skills grouped around operating systems, networking, tools, hardware, and troubleshooting.",
      projects: "Hands-on projects that show configuration, problem solving, and practical technical work.",
      experience: "Support, volunteer, and academic experience presented with a focus on troubleshooting and user assistance.",
      contact: "A direct closing section for hiring managers and recruiters.",
    },
  },
  technical: {
    name: "Technical Mode",
    heroTitle: "Mahendra Ranwa",
    heroSubtitle:
      "Systems support | networking fundamentals | diagnostics and remote access",
    heroLead:
      "Built technical depth through lab support, embedded systems work, remote access setup, and structured diagnostics across Windows systems, networking, and hardware.",
    heroSignals: ["Windows 10/11", "TCP/IP, DNS, DHCP", "SSH, VNC, and system setup"],
    heroCards: [
      { title: "Environment", value: "Shared labs, project systems, and user-facing technical environments" },
      { title: "Technical Focus", value: "Configuration, endpoint issues, connectivity, and remote access" },
      { title: "Workflow", value: "Identify the issue, isolate the cause, apply the fix, verify the result" },
    ],
    markNotes: {
      profile: "A technical summary of how I approach support, diagnostics, and hands-on system work.",
      skills: "Systems, tools, networking basics, and troubleshooting skills relevant to IT support roles.",
      projects: "Technical case studies showing configuration, debugging, and problem solving in practice.",
      experience: "Practical experience supporting systems, users, and shared technical environments.",
      contact: "A concise close for technical hiring conversations.",
    },
  },
  narrative: {
    name: "Narrative Mode",
    heroTitle: "Mahendra Ranwa",
    heroSubtitle:
      "Helping teams stay productive across systems, users, and networks.",
    heroLead:
      "This view connects my education, practical support experience, and hands-on projects to the kind of IT support career I am building.",
    heroSignals: ["Profile and direction", "Skills and projects", "Experience and credentials"],
    heroCards: [
      { title: "Start", value: "Background, support mindset, and career direction" },
      { title: "Middle", value: "Skills, projects, and hands-on troubleshooting examples" },
      { title: "Finish", value: "Experience, education, certifications, and next-step contact" },
    ],
    markNotes: {
      profile: "The introduction explains who I am, what I have worked on, and where I want to grow in IT.",
      skills: "The skills section shows the technical foundation behind my support and troubleshooting work.",
      projects: "The projects section connects hands-on learning to real IT support responsibilities.",
      experience: "The lower half turns the story into evidence through support work, labs, and credentials.",
      contact: "The final section keeps outreach simple and professional.",
    },
  },
};

// Profile cards introduce background, direction, and work style.
const profileCards = [
  {
    label: "Support Profile",
    title: "What I do",
    text:
      "Support users and shared systems by configuring workstations, resolving everyday technical issues, and keeping environments ready for use.",
  },
  {
    label: "Career Direction",
    title: "What I am good at",
    text:
      "Diagnosing workstation, software, login, and connectivity problems with a structured approach that reduces downtime and keeps communication clear.",
  },
  {
    label: "Working Style",
    title: "What I am building now",
    text:
      "Building deeper support readiness through CompTIA A+, lab-based diagnostics, and projects involving remote access, hardware setup, and system validation.",
  },
];

// Strength cards summarize the support behaviors that matter most to hiring teams.
const strengths = [
  {
    icon: Wrench,
    title: "Issue Analysis",
    text: "Diagnose hardware, software, and connectivity problems by working through symptoms, isolating causes, and verifying results.",
    points: ["Hardware and software faults", "Wi-Fi, LAN, and IP issues", "Root-cause analysis"],
  },
  {
    icon: Monitor,
    title: "Windows & Workstations",
    text: "Comfortable setting up and maintaining Windows workstations, installing software, and preparing systems for shared use.",
    points: ["Windows 10/11", "System setup", "Desktop troubleshooting"],
  },
  {
    icon: Briefcase,
    title: "Service Delivery",
    text: "Support users through login issues, application errors, setup requests, and routine technical questions with clear communication.",
    points: ["End-user support", "Clear communication", "Follow-through"],
  },
];

// Technical skills stay grouped in recruiter-friendly categories.
const skillGroups = [
  {
    icon: Monitor,
    title: "Core Skills",
    items: ["Windows 10/11", "Workstation setup", "Desktop troubleshooting", "User environment support"],
  },
  {
    icon: Cable,
    title: "Networking",
    items: ["TCP/IP", "DNS", "DHCP", "IP configuration", "Wi-Fi and LAN troubleshooting"],
  },
  {
    icon: Cpu,
    title: "Tools",
    items: ["Office 365", "Git", "SSH", "VNC", "Anaconda", "MPLAB X", "STM32CubeMX"],
  },
  {
    icon: Wrench,
    title: "Hardware",
    items: ["PC assembly", "Peripherals and printers", "Device setup", "Issue diagnosis", "Documentation"],
  },
  {
    icon: Briefcase,
    title: "Troubleshooting",
    items: ["Incident triage", "Login issues", "Software errors", "Connectivity testing", "Verification"],
  },
  {
    icon: Cpu,
    title: "Programming",
    items: ["Python", "Java", "C", "Command-line workflow", "Technical documentation"],
  },
];

// Project cases are written from the resume and kept practical.
const projects = [
  {
    id: "portfolio",
    title: "Personal Portfolio Website",
    category: "Project 01 / Portfolio Website",
    stack: "React, Vite, JavaScript, HTML, CSS",
    lens: "Frontend build",
    purpose: "Built a responsive portfolio website to present technical work clearly and reliably across desktop and mobile devices.",
    result: "Delivered a stable production build on GitHub Pages after resolving asset path, deployment, and responsive layout issues.",
    image: "",
    highlights: ["System: React and Vite frontend", "Logic: production debugging and responsive layout fixes", "Result: stable live deployment on GitHub Pages"],
    actions: [
      "Implemented the site in React, Vite, JavaScript, HTML, and CSS with a responsive layout for desktop and mobile screens.",
      "Managed source control, build workflow, and deployment through Git and GitHub Pages.",
      "Diagnosed broken asset paths, production build differences, and deployment issues until the live site matched the local version.",
      "Refined layout behavior, content hierarchy, and visual consistency to improve readability for recruiters.",
    ],
    notes: ["Responsive UI", "GitHub Pages", "Production debugging"],
  },
  {
    id: "smart-car",
    title: "Raspberry Pi Smart Car System",
    category: "Project 02 / Raspberry Pi System",
    stack: "Python, Raspberry Pi, SSH, VNC, sensors",
    lens: "Embedded systems",
    purpose: "Built and configured a Raspberry Pi smart car system for remote control, sensor input, and hardware interaction.",
    result: "Improved remote access, hardware integration, and fault isolation across power, wiring, and connectivity problems.",
    image: `${assetBase}buggy.jpg`,
    highlights: ["System: Raspberry Pi, sensors, and control modules", "Logic: remote access plus sensor-driven interaction", "Result: reliable testing across wiring, power, and connectivity"],
    actions: [
      "Built and configured a three-wheel smart car with motors, sensors, and control modules.",
      "Installed Raspberry Pi OS, prepared the environment, and verified core system configuration.",
      "Implemented SSH and VNC access for remote setup, monitoring, and control.",
      "Integrated an ultrasonic sensor for obstacle detection and distance measurement while testing hardware behavior end to end.",
    ],
    notes: ["Remote access", "Sensor control", "Hardware setup"],
  },
  {
    id: "diagnostics",
    title: "System Troubleshooting & Embedded Diagnostics",
    category: "Project 03 / Diagnostics Work",
    stack: "Hardware diagnostics, debugging, system testing",
    lens: "Diagnostics workflow",
    purpose: "Applied structured diagnostics to identify hardware and software faults in lab and embedded environments.",
    result: "Strengthened root-cause analysis, validation, and system-level troubleshooting through repeatable testing workflows.",
    image: `${assetBase}embedded-control.jpg`,
    highlights: ["System: embedded and lab-based test setups", "Logic: step-by-step fault isolation and validation", "Result: faster identification of hardware and software failures"],
    actions: [
      "Diagnosed hardware and software faults using structured debugging methods instead of trial-and-error fixes.",
      "Performed system-level testing to verify reliability, behavior, and expected output.",
      "Applied troubleshooting workflows across hardware, networking, and embedded lab environments.",
      "Documented findings clearly enough to isolate root causes and confirm working fixes.",
    ],
    notes: ["Fault isolation", "System testing", "Verification"],
  },
];

// Experience bullets are kept close to the resume wording.
const experienceItems = [
  {
    role: "Support Technician",
    company: "Sheridan College IT Centre, Brampton",
    date: "Apr 2024 - Aug 2024",
    bullets: [
      "Provided technical support for hardware, software, and network issues in shared lab environments.",
      "Installed and configured Windows systems and academic software across multiple workstations.",
      "Diagnosed Wi-Fi, LAN, and IP configuration issues and restored connectivity.",
      "Assisted users with login problems, system errors, and application access issues.",
      "Improved system availability by identifying root causes quickly and resolving technical faults before they escalated.",
    ],
  },
  {
    role: "Web Technician (Volunteer)",
    company: "U+ Toastmasters Academy",
    date: "Sep 2025 - Mar 2026",
    bullets: [
      "Maintained website functionality and resolved technical issues affecting everyday use.",
      "Supported users with content updates, access-related problems, and troubleshooting requests with clear communication.",
      "Worked with team members to improve reliability and respond quickly when issues affected usability.",
    ],
  },
  {
    role: "Tutor - Electronics Fabrication",
    company: "Sheridan College",
    date: "May 2023 - Dec 2023",
    bullets: [
      "Assisted students with troubleshooting hardware and circuit-related issues during lab work.",
      "Guided the proper use of lab tools, test equipment, and debugging techniques during hands-on work.",
      "Strengthened technical problem-solving by explaining faults clearly and helping students test fixes methodically.",
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
    assessment: "Check whether the issue is caused by incorrect credentials, account lockout, profile problems, or a local workstation issue.",
    action: "Confirm the username and password, test another account, check for account lock status, and compare with a known-good device.",
    result: "Restore access quickly or escalate with clear details about where the login process failed.",
  },
  {
    id: "network",
    symptom: "Workstation is offline",
    assessment: "Check whether the issue is with the cable, Wi-Fi connection, adapter status, or IP configuration.",
    action: "Verify the physical or wireless connection, check adapter settings, review IP details, and compare the system against a working machine.",
    result: "Restore connectivity or narrow the fault to the workstation, local configuration, or network side.",
  },
  {
    id: "software",
    symptom: "Application fails to launch",
    assessment: "Check whether the issue is related to installation, permissions, user profile settings, or missing dependencies.",
    action: "Confirm the application status, verify prerequisites, relaunch the software, and compare the setup with a working workstation.",
    result: "Return the application to a usable state or document the exact failure point for escalation.",
  },
  {
    id: "printer",
    symptom: "Printer is not responding",
    assessment: "Check whether the issue is local to the workstation, the printer connection, the print queue, or the driver.",
    action: "Verify printer power and connectivity, clear stuck jobs, confirm the selected printer, and test with another workstation if needed.",
    result: "Restore printing service or isolate the problem to hardware, queue management, or driver configuration.",
  },
  {
    id: "slow-system",
    symptom: "Computer is running slowly",
    assessment: "Check for high resource usage, startup load, software issues, or hardware limitations.",
    action: "Review running processes, check startup applications, test disk and memory usage, and restart or update the system where appropriate.",
    result: "Improve system performance or identify whether the slowdown is caused by software, hardware, or configuration.",
  },
  {
    id: "remote-access",
    symptom: "Remote access session will not connect",
    assessment: "Check whether the issue is caused by credentials, network reachability, remote service settings, or the client configuration.",
    action: "Confirm connectivity, verify the remote service is enabled, test credentials, and compare the settings against a working remote session.",
    result: "Restore remote access or identify whether the issue is with the host, network path, or client setup.",
  },
  {
    id: "email-sync",
    symptom: "Email is not syncing",
    assessment: "Check whether the issue is related to network access, account configuration, mailbox status, or the mail client.",
    action: "Verify internet connectivity, confirm account settings, test webmail access, and restart or re-sync the email client.",
    result: "Restore email access or isolate whether the issue is with the device, application, or account.",
  },
  {
    id: "audio",
    symptom: "No sound during a meeting",
    assessment: "Check whether the issue is caused by mute settings, the selected audio device, drivers, or the conferencing app.",
    action: "Verify speaker and microphone settings, test another audio device, confirm app permissions, and check system sound output.",
    result: "Restore audio for the meeting or identify whether the fault is device, driver, or application related.",
  },
  {
    id: "update",
    symptom: "System update fails",
    assessment: "Check whether the failure is caused by low storage, service interruption, corrupted update files, or restart requirements.",
    action: "Review update status, confirm available storage, retry the update, restart the system, and check for related error messages.",
    result: "Complete the update successfully or document the failure clearly for escalation.",
  },
  {
    id: "usb-device",
    symptom: "USB device is not detected",
    assessment: "Check whether the issue is with the port, cable, driver, power delivery, or the device itself.",
    action: "Test another USB port, reconnect the device, check Device Manager, and compare the device on another workstation if needed.",
    result: "Restore device recognition or isolate whether the issue is with the workstation or the peripheral.",
  },
  {
    id: "shared-drive",
    symptom: "Shared drive cannot be accessed",
    assessment: "Check whether the issue is caused by network reachability, permissions, mapping configuration, or server availability.",
    action: "Verify network access, test the shared path, confirm permissions, and compare the mapping against a working user account.",
    result: "Restore access to the shared drive or narrow the issue to permissions, connectivity, or server-side availability.",
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

function HeroScene({ currentMode }) {
  return (
    <div className="hero-scene">
      <div className="hero-scene__layer hero-scene__layer--halo-outer" aria-hidden="true">
        <motion.div
          className="hero-scene__halo hero-scene__halo--outer"
          animate={{ rotate: 360, scale: [1, 1.03, 1] }}
          transition={{ rotate: { duration: 28, repeat: Infinity, ease: "linear" }, scale: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
        />
      </div>
      <div className="hero-scene__layer hero-scene__layer--halo-inner" aria-hidden="true">
        <motion.div
          className="hero-scene__halo hero-scene__halo--inner"
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="hero-scene__layer hero-scene__layer--poster">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ReactiveCard className="hero-poster hero-poster--scene">
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
                <div className="hero-poster__stamp-label">Viewing Mode</div>
                <div className="hero-poster__stamp-value">{currentMode.name}</div>
              </div>
            </div>
          </ReactiveCard>
        </motion.div>
      </div>

      <div className="hero-scene__glow hero-scene__glow--one" aria-hidden="true" />
      <div className="hero-scene__glow hero-scene__glow--two" aria-hidden="true" />
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
            <div className="entry-sequence__panel-mark">Portfolio View</div>
            <div className="entry-sequence__eyebrow">{previewMode.name}</div>
            <h1 className="entry-sequence__title">Mahendra Ranwa</h1>
            <p className="entry-sequence__text">
              {previewMode.heroSubtitle} This site remembers your preferred view.
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
              Continue
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
            <HeroScene currentMode={currentMode} />

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
                          Clear structure, fast navigation, and a polished presentation of technical work.
                        </div>
                        <div className="project-stage__mock-hero-badge">Personal Website</div>
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
                    <div className="project-stage__image-wrap">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="project-stage__image"
                      />
                    </div>
                  )}
                </div>

                <div className="project-stage__content">
                  <div className="project-stage__header">
                    <div className="project-stage__meta">
                      <span>{selectedProject.category}</span>
                      <span>{selectedProject.lens}</span>
                    </div>
                    <div className="project-stage__stack">
                      {selectedProject.stack.split(", ").map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <h3 className="project-stage__title">{selectedProject.title}</h3>
                  <div className="project-stage__summary-block">
                    <div className="project-stage__list-label">Purpose</div>
                    <p className="project-stage__summary">{selectedProject.purpose}</p>
                  </div>

                  <div className="project-stage__highlights">
                    {selectedProject.highlights.map((item) => (
                      <div key={item} className="project-stage__highlight">
                        <span>Focus</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="project-stage__outcome">
                    <div className="project-stage__outcome-label">Result</div>
                    <p>{selectedProject.result}</p>
                  </div>

                  <div className="project-stage__list-label">What I implemented</div>
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
                    <span className="project-chooser__marker" />
                    <span className="project-chooser__category">{project.category}</span>
                    <span className="project-chooser__title">{project.title}</span>
                    <span className="project-chooser__summary">{project.purpose}</span>
                    <span className="project-chooser__footer">
                      <span>{project.lens}</span>
                      <span>{project.notes[0]}</span>
                    </span>
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
                <h3 className="contact-stage__title">Open to help desk and desktop support roles</h3>
                <p className="contact-stage__text">
                  Open to full-time IT support opportunities where I can contribute in workstation support, user issue resolution, software setup, and day-to-day technical operations.
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
                  <span>Desktop Support</span>
                  <span>Ticket Handling</span>
                  <span>System Setup</span>
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
            Portfolio focused on desktop support, systems work, and practical technical problem solving.
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

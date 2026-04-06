import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Cpu,
  Wrench,
  Terminal,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  Briefcase,
  User,
  FolderKanban,
  Award,
  Home,
  ExternalLink,
  Loader,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

const heroText = {
  hidden: { opacity: 0, y: 40, skewY: 4 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  }),
};

const heroImageVariant = {
  hidden: { opacity: 0, x: 50, scale: 0.92 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const introVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

const skills = [
  {
    icon: <Cpu size={22} />,
    title: "Systems Integration",
    items: ["Embedded firmware", "Microcontroller design", "Sensors & actuators", "ADC / PWM / UART", "Real-time control"],
  },
  {
    icon: <Terminal size={22} />,
    title: "Software & Networks",
    items: ["C / Python / Java", "Linux systems", "Networking fundamentals", "TCP/IP & Ethernet", "Protocol diagnostics"],
  },
  {
    icon: <Wrench size={22} />,
    title: "Lab & Support",
    items: ["PCB assembly", "Oscilloscopes & multimeters", "Circuit troubleshooting", "System validation", "User-facing support"],
  },
];

const projects = [
  {
    no: "01",
    title: "Digital Multimeter (DMM) Fabrication",
    tech: "Electrical Fabrication",
    image: "/digital-multimeter.png",
    points: [
      "Assembled and soldered a functional digital multimeter circuit",
      "Performed PCB-level soldering following electronic assembly practices",
      "Tested and verified voltage, current, and resistance measurements",
      "Diagnosed and corrected circuit faults during assembly",
      "Ensured accurate functionality through validation and troubleshooting",
    ],
  },
  {
    no: "02",
    title: "Embedded Control and Signal Processing System",
    tech: "C, STM32 (Nucleo L476)",
    image: "/embedded-control.jpg",
    points: [
      "Developed embedded applications using GPIO, timers, ADC, interrupts, PWM, and input capture",
      "Designed timer-based systems (TIM6, TIM7) for precise delays using PSC and ARR calculations",
      "Implemented interrupt-driven control with EXTI and timer interrupts for real-time response",
      "Generated and analyzed PWM signals and measured signal characteristics using input capture",
      "Integrated ADC and analog watchdog for real-time monitoring and system control",
    ],
  },
  {
    no: "03",
    title: "Embedded Systems Application (ADC, Timers, Interrupts, UART)",
    tech: "C, PIC24 (Explorer 16)",
    image: "/explorer16.jpg",
    points: [
      "Built multi-module system integrating ADC, timers, interrupts, GPIO, and UART communication",
      "Acquired and processed real-time sensor data with interrupt-driven ADC",
      "Transmitted formatted data via UART (9600 baud) to terminal interface",
      "Implemented LED control logic with variable timing and pattern generation",
      "Designed interrupt-based system for timing, control, and user interaction",
    ],
  },
  {
    no: "04",
    title: "Smart Car System (3-Wheel Buggy)",
    tech: "Raspberry Pi, Python",
    image: "/buggy.jpg",
    points: [
      "Built and assembled a 3-wheel smart car integrating motors, sensors, camera, and control modules",
      "Configured Raspberry Pi GPIO for motor control, sensor interfacing, and peripheral communication",
      "Implemented remote control and video streaming for real-time monitoring",
      "Integrated ultrasonic sensor for distance measurement and obstacle awareness",
      "Developed modular control logic for movement, sensing, and system coordination",
    ],
  },
];

const experience = [
  {
    role: "Web Technician (Volunteer)",
    company: "U+ Toastmasters Academy",
    date: "Sep 2025 – Mar 2026",
    points: [
      "Managed website updates and digital content for the community platform.",
      "Maintained system reliability and supported technical operations.",
      "Collaborated with teams to improve digital communication workflows.",
    ],
  },
  {
    role: "Support Technician",
    company: "Sheridan College IT Centre, Brampton",
    date: "Apr 2024 – Aug 2024",
    points: [
      "Provided technical support for hardware, software, and network issues.",
      "Installed and configured lab systems and academic software.",
      "Diagnosed and resolved system faults to minimize downtime.",
      "Assisted users with OS, connectivity, and application troubleshooting.",
    ],
  },
  {
    role: "Tutor (Electronics Fabrication)",
    company: "Sheridan College",
    date: "May 2023 – Dec 2023",
    points: [
      "Assisted students with soldering techniques, PCB assembly, and component placement.",
      "Guided troubleshooting of circuit faults and measurement using lab equipment.",
      "Explained electronic fabrication concepts and safe handling practices.",
      "Supported hands-on lab sessions to improve practical skills and accuracy.",
    ],
  },
];

const educationCertifications = [
  {
    role: "Computer Engineering Technology",
    company: "Sheridan College, Brampton",
    date: "Jan 2023 – Apr 2026",
    points: [
      "Specialized in embedded systems, microcontrollers, and hardware-software integration",
      "Completed courses in Embedded Systems, Digital Electronics, Microprocessor Design, Control Systems, Networking, and Capstone Engineering",
      "Worked in lab-based environments with STM32, PIC24, Arduino, Raspberry Pi, test equipment, and integrated systems",
      "Delivered practical projects that include smart vehicles, instrumentation systems, and real-time control solutions",
      "Prepared for professional certification and industry-ready work through capstone and co-op learning pathways",
    ],
  },
  {
    role: "IT Service Desk: Service Management",
    company: "Certification",
    date: "Completed",
    points: [
      "Mastered IT service management principles and helpdesk best practices",
      "Learned effective communication and problem-solving techniques for user support",
      "Gained knowledge in ticket management, system troubleshooting, and service delivery",
    ],
  },
  {
    role: "Computer Components and Peripherals for IT Technicians",
    company: "Certification",
    date: "Completed",
    points: [
      "Acquired in-depth knowledge of computer hardware components and peripherals",
      "Learned diagnostic techniques for hardware troubleshooting and repair",
      "Developed skills in system assembly, maintenance, and technical support operations",
    ],
  },
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowIntro(false), 4500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.page}
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            variants={introVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={styles.introOverlay}
          >
            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={styles.introGlow}
            />
            <motion.div style={styles.introCard}>
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={styles.introBadge}
              >
                <Sparkles size={14} />
                loading experience
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30, skewY: 6 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={styles.introTitle}
              >
                Hello,
                <br />
                I'm Mahendra.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                style={styles.introSubtitle}
              >
                A tech-driven portfolio for support, embedded systems, and modern problem solving.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, rotate: 360 }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.25 },
                  scale: { duration: 0.5, delay: 0.25 },
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" }
                }}
                style={styles.introLoader}
              >
                <Loader size={32} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.35 },
                  y: { duration: 0.7, delay: 0.35 },
                  backgroundPosition: { duration: 3, repeat: Infinity, ease: "linear" }
                }}
                style={styles.introBar}
              />

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                style={styles.introHint}
              >
                ✦ enjoy the animated entry and discover the projects below.
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              style={styles.introWave}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatedBackground />
      <SideNav />

      <header style={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.logo}>
            Mahendra<span style={styles.logoAccent}>.ranwa</span>
          </div>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={styles.nav}
        >
          <a href="#about" style={styles.navLink}>About</a>
          <a href="#skills" style={styles.navLink}>Skills</a>
          <a href="#projects" style={styles.navLink}>Projects</a>
          <a href="#experience" style={styles.navLink}>Experience</a>
          <a href="#education" style={styles.navLink}>Education</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </motion.nav>
      </header>

      <main style={styles.main}>
        <section id="home" style={styles.hero}>
          <motion.div             variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={styles.heroLeft}
          >
            <motion.div
              variants={heroText}
              custom={0.1}
              style={styles.badge}
            >
              <Sparkles size={14} />
              Portfolio Experience
            </motion.div>

            <motion.h1
              variants={heroText}
              custom={0.25}
              style={styles.heroTitle}
            >
              Building systems
              <br />
              that move from
              <br />
              <span style={styles.gradientText}>code to hardware.</span>
            </motion.h1>

            <motion.p
              variants={heroText}
              custom={0.35}
              style={styles.heroSubtitle}
            >
              Mahendra Ranwa · Computer Engineering Technology Graduate, Sheridan College
            </motion.p>

            <motion.p
              variants={heroText}
              custom={0.45}
              style={styles.heroDesc}
            >
              Sheridan College's Computer Engineering Technology program trains me to integrate hardware and software, design and test embedded devices, and maintain computer and network systems.
            </motion.p>

            <motion.div
              variants={heroText}
              custom={0.55}
              style={styles.heroButtons}
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                style={styles.primaryBtn}
                href="#projects"
              >
                View Projects <ArrowRight size={16} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                style={styles.secondaryBtn}
                href="/MahendraRanwaCS.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Open Resume
              </motion.a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              style={styles.heroMiniGrid}
            >
              <motion.div variants={scaleIn} style={styles.heroMiniCard}>
                <span style={styles.miniLabel}>Program</span>
                <strong style={styles.miniValue}>Computer Engineering Technology</strong>
              </motion.div>
              <motion.div variants={scaleIn} style={styles.heroMiniCard}>
                <span style={styles.miniLabel}>Focus</span>
                <strong style={styles.miniValue}>Embedded Systems & Networks</strong>
              </motion.div>
              <motion.div variants={scaleIn} style={styles.heroMiniCard}>
                <span style={styles.miniLabel}>Training</span>
                <strong style={styles.miniValue}>Lab, Capstone, Co-op</strong>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroImageVariant}
            initial="hidden"
            animate="show"
            style={styles.heroRight}
          >
            <motion.div
              animate={{
                opacity: [0.28, 0.72, 0.28],
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              style={styles.imageHalo}
            />
            <motion.div 
              whileHover={{ y: -10, scale: 1.01 }}
              animate={{ 
                y: [0, -14, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{ 
                type: "spring",
                stiffness: 140,
                damping: 16,
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut",
                rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
              }}
              style={styles.imageCard}
            >
              <img
                src="/mahendra.jpeg"
                alt="Mahendra Ranwa"
                style={styles.image}
              />
            </motion.div>
          </motion.div>
        </section>

        <Section id="about" title="About">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            style={styles.largeCard}
          >
            <p style={styles.paragraph}>
              I'm studying Computer Engineering Technology at Sheridan College, where I learn to integrate hardware and software, design embedded devices, and build computer systems that solve real problems.
            </p>
            <p style={styles.paragraph}>
              The program emphasizes lab-based learning, embedded systems development, and project-driven design. I train with sensors, microcontrollers, network systems, and real-time control while preparing for professional certification and industry work.
            </p>
            <p style={styles.paragraphLast}>
              I combine this technical foundation with hands-on IT support experience to deliver reliable system performance, strong troubleshooting, and clear communication for users and teams.
            </p>
          </motion.div>
        </Section>

        <Section id="skills" title="Skills">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={styles.grid}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                variants={scaleIn}
                whileHover={{ 
                  y: -6, 
                  scale: 1.01,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                style={styles.card}
              >
                <motion.div 
                  style={styles.iconBox}
                  whileHover={{ 
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.4 }
                  }}
                >
                  {skill.icon}
                </motion.div>
                <h3 style={styles.cardTitle}>{skill.title}</h3>
                <div>
                  {skill.items.map((item) => (
                    <div key={item} style={styles.itemPill}>
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="projects" title="Projects">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={styles.timelineWrap}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.no}
                variants={slideInLeft}
                whileHover={{ 
                  x: 4,
                  transition: { duration: 0.2 }
                }}
                style={styles.timelineCard}
              >
                <motion.div 
                  style={styles.timelineDot}
                  whileHover={{ 
                    scale: 1.25,
                    boxShadow: "0 0 16px rgba(34,211,238,0.8)",
                    transition: { duration: 0.3 }
                  }}
                />
                <div style={styles.timelineContent}>
                  <div style={styles.jobTop}>
                    <div>
                      <h3 style={styles.jobRole}>{project.title}</h3>
                      <p style={styles.jobCompany}>{project.tech}</p>
                    </div>
                    <span style={styles.jobDate}>{project.no}</span>
                  </div>

                  {project.image && (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      style={styles.projectImage}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
                      whileHover={{ scale: 1.03 }}
                    />
                  )}

                  <motion.ul 
                    style={styles.jobList}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 + index * 0.05, duration: 0.4 }}
                  >
                    {project.points.map((point, pointIndex) => (
                      <motion.li 
                        key={point} 
                        style={styles.jobPoint}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 + pointIndex * 0.04, duration: 0.35 }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Section>

        <Section id="experience" title="Experience">
          <div style={styles.timelineWrap}>
            {experience.map((job, index) => (
              <motion.div
                key={job.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.1}
                style={styles.timelineCard}
              >
                <div style={styles.timelineDot} />
                <div style={styles.timelineContent}>
                  <div style={styles.jobTop}>
                    <div>
                      <h3 style={styles.jobRole}>{job.role}</h3>
                      <p style={styles.jobCompany}>{job.company}</p>
                    </div>
                    <span style={styles.jobDate}>{job.date}</span>
                  </div>

                  <ul style={styles.jobList}>
                    {job.points.map((point) => (
                      <li key={point} style={styles.jobPoint}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="education" title="Education & Certifications">
          <div style={styles.timelineWrap}>
            {educationCertifications.map((item, index) => (
              <motion.div
                key={item.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={index * 0.1}
                style={styles.timelineCard}
              >
                <div style={styles.timelineDot} />
                <div style={styles.timelineContent}>
                  <div style={styles.jobTop}>
                    <div>
                      <h3 style={styles.jobRole}>{item.role}</h3>
                      <p style={styles.jobCompany}>{item.company}</p>
                    </div>
                    <span style={styles.jobDate}>{item.date}</span>
                  </div>

                  <ul style={styles.jobList}>
                    {item.points.map((point) => (
                      <li key={point} style={styles.jobPoint}>{point}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            style={styles.grid}
          >
            <ContactCard 
              icon={<Mail size={20} />} 
              value="mranwa100@gmail.com" 
              href="mailto:mranwa100@gmail.com"
              type="email"
            />
            <ContactCard 
              icon={<Phone size={20} />} 
              value="+1 437-244-5424" 
              href="tel:+14372445424"
              type="phone"
            />
            <ContactCard 
              icon={<MapPin size={20} />} 
              value="Brampton, Ontario" 
              href="https://maps.google.com/?q=Brampton,Ontario"
              type="link"
            />
            <ContactCard 
              icon={<ExternalLink size={20} />} 
              value="LinkedIn Profile" 
              href="https://www.linkedin.com/in/mahendra-ranwa-092396290/"
              type="link"
            />
          </motion.div>
        </Section>
      </main>
    </motion.div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function ContactCard({ icon, value, href, type = "link" }) {
  return (
    <motion.div 
      variants={scaleIn}
      whileHover={{ 
        y: -12, 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (type === "email") window.location.href = href;
        else if (type === "phone") window.location.href = href;
        else window.open(href, "_blank");
      }}
      style={{...styles.card, cursor: "pointer"}}
    >
      <motion.div 
        style={styles.iconBox}
        whileHover={{ 
          rotate: [0, -5, 5, 0],
          scale: 1.1,
          transition: { duration: 0.4 }
        }}
      >
        {icon}
      </motion.div>
      <p style={styles.contactText}>{value}</p>
    </motion.div>
  );
}

function SideNav() {
  const links = [
    { href: "#home", icon: <Home size={18} />, label: "Home" },
    { href: "#about", icon: <User size={18} />, label: "About" },
    { href: "#skills", icon: <Cpu size={18} />, label: "Skills" },
    { href: "#projects", icon: <FolderKanban size={18} />, label: "Projects" },
    { href: "#experience", icon: <Briefcase size={18} />, label: "Experience" },
    { href: "#education", icon: <Award size={18} />, label: "Education" },
    { href: "#contact", icon: <Mail size={18} />, label: "Contact" },
  ];

  return (
    <div style={styles.sideNav}>
      {links.map((link) => (
        <a key={link.href} href={link.href} style={styles.sideNavItem} title={link.label}>
          {link.icon}
        </a>
      ))}
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div style={styles.bgWrap}>
      <motion.div
        animate={{ 
          x: [0, 40, 0], 
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={styles.blob1}
      />
      <motion.div
        animate={{ 
          x: [0, -50, 0], 
          y: [0, -35, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={styles.blob2}
      />
      <motion.div
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={styles.blob3}
      />
      <div style={styles.gridOverlay} />
    </div>
  );
}

const glass = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050816",
    color: "white",
    fontFamily: "Arial, sans-serif",
    position: "relative",
    overflowX: "hidden",
  },

  bgWrap: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    overflow: "hidden",
  },

  blob1: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: "50%",
    background: "rgba(34,211,238,0.18)",
    filter: "blur(80px)",
    top: 20,
    left: -80,
  },

  blob2: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: "50%",
    background: "rgba(59,130,246,0.18)",
    filter: "blur(90px)",
    top: "25%",
    right: -100,
  },

  blob3: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "rgba(168,85,247,0.18)",
    filter: "blur(95px)",
    bottom: -120,
    left: "30%",
  },

  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
    backgroundSize: "70px 70px",
  },

  sideNav: {
    position: "fixed",
    right: 18,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 30,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  sideNavItem: {
    width: 46,
    height: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    color: "#cbd5e1",
    textDecoration: "none",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "clamp(12px, 3vw, 20px) clamp(16px, 4vw, 32px) clamp(12px, 3vw, 20px) clamp(16px, 10vw, 92px)",
    background: "rgba(5,8,22,0.6)",
    backdropFilter: "blur(14px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    flexWrap: "wrap",
    gap: "clamp(8px, 2vw, 12px)",
  },

  logo: {
    fontSize: 24,
    fontWeight: 900,
  },

  logoAccent: {
    color: "#22d3ee",
  },

  nav: {
    display: "flex",
    gap: "clamp(12px, 3vw, 24px)",
    flexWrap: "wrap",
  },

  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: 14,
  },

  main: {
    position: "relative",
    zIndex: 1,
  },

  hero: {
    maxWidth: 1280,
    margin: "0 auto",
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    alignItems: "center",
    gap: "clamp(20px, 5vw, 40px)",
    padding: "clamp(20px, 5vw, 40px) clamp(16px, 4vw, 32px) clamp(40px, 10vw, 80px) clamp(16px, 10vw, 92px)",
  },

  heroLeft: {
    maxWidth: 700,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 16px",
    borderRadius: 999,
    background: "rgba(34,211,238,0.1)",
    border: "1px solid rgba(34,211,238,0.15)",
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginBottom: 22,
  },

  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    lineHeight: 0.92,
    fontWeight: 900,
    margin: 0,
    letterSpacing: "-0.05em",
  },

  gradientText: {
    background: "linear-gradient(90deg, #67e8f9, #60a5fa, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    marginTop: 22,
    color: "#bfdbfe",
    fontSize: 20,
    fontWeight: 700,
  },

  heroDesc: {
    marginTop: 18,
    color: "#94a3b8",
    fontSize: 18,
    lineHeight: 1.8,
    maxWidth: 620,
  },

  heroButtons: {
    marginTop: 30,
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "15px 24px",
    borderRadius: 18,
    background: "white",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 700,
  },

  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "15px 24px",
    borderRadius: 18,
    background: "rgba(255,255,255,0.05)",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.12)",
  },

  heroMiniGrid: {
    marginTop: 32,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 35vw, 180px), 1fr))",
    gap: "clamp(12px, 2vw, 16px)",
    maxWidth: 760,
  },

  heroMiniCard: {
    ...glass,
    borderRadius: 22,
    padding: 18,
  },

  miniLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: 10,
    fontWeight: 700,
  },

  miniValue: {
    color: "white",
    fontSize: 16,
    fontWeight: 800,
  },

  heroRight: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },

  imageGlow: {
    position: "absolute",
    inset: -30,
    background: "linear-gradient(135deg, rgba(34,211,238,0.2), rgba(168,85,247,0.18))",
    filter: "blur(60px)",
    borderRadius: 40,
  },

  imageHalo: {
    position: "absolute",
    inset: -18,
    borderRadius: 999,
    background: "radial-gradient(circle, rgba(99,102,241,0.32), transparent 55%)",
    filter: "blur(30px)",
    zIndex: 0,
  },

  imageCard: {
    ...glass,
    position: "relative",
    padding: 16,
    borderRadius: 30,
    width: "100%",
    maxWidth: 380,
    zIndex: 1,
  },

  imageBadge: {
    position: "absolute",
    top: 24,
    left: 24,
    zIndex: 2,
    padding: "9px 14px",
    borderRadius: 999,
    background: "rgba(5,8,22,0.7)",
    border: "1px solid rgba(34,211,238,0.16)",
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
  },

  image: {
    width: "100%",
    borderRadius: 22,
    display: "block",
    objectFit: "cover",
  },

  introOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(5, 8, 22, 0.98)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    overflow: "hidden",
  },

  introGlow: {
    position: "absolute",
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "radial-gradient(circle at 30% 30%, rgba(99,102,241,0.22), transparent 40%), radial-gradient(circle at 70% 70%, rgba(56,189,248,0.18), transparent 42%)",
    filter: "blur(42px)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  introCard: {
    position: "relative",
    width: "min(88%, 560px)",
    padding: "44px 36px",
    borderRadius: 32,
    background: "rgba(10, 16, 33, 0.92)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 40px 120px rgba(0,0,0,0.35)",
    textAlign: "center",
    overflow: "hidden",
    zIndex: 2,
  },

  introBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 18px",
    borderRadius: 999,
    background: "rgba(59,130,246,0.14)",
    color: "#bfdbfe",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 18,
    border: "1px solid rgba(59,130,246,0.26)",
  },

  introTitle: {
    margin: 0,
    fontSize: "clamp(2.75rem, 5vw, 4.5rem)",
    letterSpacing: "-0.06em",
    fontWeight: 900,
    color: "white",
    lineHeight: 1.02,
  },

  introSubtitle: {
    marginTop: 20,
    color: "#cbd5e1",
    fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
    lineHeight: 1.8,
    maxWidth: 520,
    marginLeft: "auto",
    marginRight: "auto",
  },

  introLoader: {
    marginTop: 24,
    color: "#38bdf8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  introBar: {
    marginTop: 28,
    height: 6,
    borderRadius: 999,
    background: "linear-gradient(90deg, #7c3aed, #38bdf8, #7c3aed)",
    backgroundSize: "200% 100%",
    boxShadow: "0 0 26px rgba(56,189,248,0.28)",
  },

  introHint: {
    marginTop: 22,
    color: "#94a3b8",
    fontSize: 14,
    letterSpacing: "0.02em",
  },

  introWave: {
    position: "absolute",
    inset: 0,
    margin: "auto",
    width: "110%",
    height: "110%",
    backgroundImage: "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 24%), radial-gradient(circle at 50% 100%, rgba(56,189,248,0.08), transparent 20%)",
    opacity: 0.55,
    pointerEvents: "none",
    maskImage: "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 70%)",
    filter: "blur(12px)",
    zIndex: 1,
  },

  section: {
    maxWidth: 1280,
    margin: "0 auto",
    padding: "clamp(40px, 10vw, 90px) clamp(16px, 4vw, 32px) clamp(40px, 10vw, 90px) clamp(16px, 10vw, 92px)",
  },

  sectionTitle: {
    fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
    fontWeight: 900,
    marginBottom: "clamp(16px, 3vw, 28px)",
    letterSpacing: "-0.04em",
  },

  largeCard: {
    ...glass,
    borderRadius: 28,
    padding: 28,
  },

  paragraph: {
    color: "#cbd5e1",
    lineHeight: 1.9,
    marginBottom: 16,
    fontSize: 16,
  },

  paragraphLast: {
    color: "#cbd5e1",
    lineHeight: 1.9,
    fontSize: 16,
  },

  projectImage: {
    width: "100%",
    maxWidth: 400,
    height: 200,
    objectFit: "cover",
    borderRadius: 16,
    marginBottom: 20,
    border: "1px solid rgba(255,255,255,0.1)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 40vw, 240px), 1fr))",
    gap: "clamp(14px, 3vw, 22px)",
  },

  card: {
    ...glass,
    borderRadius: 26,
    padding: 24,
  },

  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(34,211,238,0.1)",
    color: "#67e8f9",
    marginBottom: 16,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 800,
    margin: "0 0 16px",
  },

  cardDesc: {
    color: "#94a3b8",
    fontSize: 14,
    lineHeight: 1.5,
    margin: "0 0 8px",
  },

  itemPill: {
    padding: "12px 14px",
    borderRadius: 14,
    background: "rgba(2,6,23,0.45)",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "#dbeafe",
    fontSize: 15,
    marginBottom: 10,
  },

  projectNo: {
    color: "#67e8f9",
    fontSize: 13,
    fontWeight: 900,
    letterSpacing: "0.18em",
    marginBottom: 10,
  },

  projectDesc: {
    color: "#94a3b8",
    lineHeight: 1.8,
    fontSize: 16,
  },

  timelineWrap: {
    display: "grid",
    gap: "clamp(14px, 3vw, 22px)",
  },

  timelineCard: {
    ...glass,
    borderRadius: 28,
    padding: 26,
    position: "relative",
  },

  timelineDot: {
    position: "absolute",
    left: -6,
    top: 34,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#22d3ee",
    boxShadow: "0 0 16px rgba(34,211,238,0.7)",
  },

  timelineContent: {},

  jobTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
    flexWrap: "wrap",
    marginBottom: 16,
  },

  jobRole: {
    margin: 0,
    fontSize: 24,
    fontWeight: 800,
  },

  jobCompany: {
    margin: "6px 0 0",
    color: "#94a3b8",
    fontSize: 16,
  },

  jobDate: {
    padding: "8px 12px",
    borderRadius: 999,
    background: "rgba(34,211,238,0.1)",
    border: "1px solid rgba(34,211,238,0.14)",
    color: "#a5f3fc",
    fontSize: 13,
    fontWeight: 700,
  },

  jobList: {
    margin: 0,
    paddingLeft: 18,
    color: "#cbd5e1",
    lineHeight: 1.9,
  },

  jobPoint: {
    marginBottom: 8,
  },

  contactText: {
    color: "white",
    fontSize: 17,
    fontWeight: 700,
    wordBreak: "break-word",
  },
};
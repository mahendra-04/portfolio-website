import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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

const assetBase = import.meta.env.BASE_URL;

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
    image: `${assetBase}digital-multimeter.png`,
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
    image: `${assetBase}embedded-control.jpg`,
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
    image: `${assetBase}explorer16.jpg`,
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
    image: `${assetBase}buggy.jpg`,
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

const navLinks = [
  { href: "#home", icon: <Home size={18} />, label: "Home" },
  { href: "#about", icon: <User size={18} />, label: "About" },
  { href: "#skills", icon: <Cpu size={18} />, label: "Skills" },
  { href: "#projects", icon: <FolderKanban size={18} />, label: "Projects" },
  { href: "#experience", icon: <Briefcase size={18} />, label: "Experience" },
  { href: "#education", icon: <Award size={18} />, label: "Education" },
  { href: "#contact", icon: <Mail size={18} />, label: "Contact" },
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const viewportWidth = useViewportWidth();
  const useBottomNav = viewportWidth <= 900;
  const isPhone = viewportWidth <= 640;
  const isCompactPhone = viewportWidth <= 400;
  const activeSection = useActiveSection(navLinks.map((link) => link.href.slice(1)));
  const cursor = useCustomCursor(viewportWidth > 900);

  useEffect(() => {
    const timeout = setTimeout(() => setShowIntro(false), 4500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        ...styles.page,
        ...(viewportWidth > 900 ? styles.pageCursorDesktop : null),
      }}
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
            <motion.div
              style={{
                ...styles.introCard,
                ...(isPhone ? styles.introCardPhone : null),
                ...(isCompactPhone ? styles.introCardCompactPhone : null),
              }}
            >
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
                style={{
                  ...styles.introSubtitle,
                  ...(isPhone ? styles.introSubtitlePhone : null),
                  ...(isCompactPhone ? styles.introSubtitleCompactPhone : null),
                }}
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
                animate={{
                  opacity: 1,
                  y: 0,
                  boxShadow: [
                    "0 0 0 rgba(56,189,248,0.0)",
                    "0 18px 40px rgba(56,189,248,0.18)",
                    "0 0 0 rgba(56,189,248,0.0)",
                  ],
                }}
                transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
                style={{
                  ...styles.introFun,
                  ...(isPhone ? styles.introFunPhone : null),
                  ...(isCompactPhone ? styles.introFunCompactPhone : null),
                }}
              >
                <Sparkles size={14} />
                <span>Have fun</span>
              </motion.div>

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

      <CustomCursor cursor={cursor} />

      <AnimatedBackground />
      {useBottomNav ? (
        <SideNav useBottomNav activeSection={activeSection} />
      ) : (
        <>
          <SideNav activeSection={activeSection} position="left" />
          <SideNav activeSection={activeSection} position="right" />
        </>
      )}

      <header
        style={{
          ...styles.header,
          ...(isPhone ? styles.headerPhone : null),
          ...(isCompactPhone ? styles.headerCompactPhone : null),
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{ ...styles.logo, ...(isPhone ? styles.logoPhone : null) }}>
            Mahendra<span style={styles.logoAccent}>.ranwa</span>
          </div>
        </motion.div>
      </header>

      <main
        style={{
          ...styles.main,
          ...(useBottomNav ? styles.mainWithBottomNav : null),
          ...(isPhone ? styles.mainPhone : null),
        }}
      >
        <section
          id="home"
          style={{
            ...styles.hero,
            ...(isPhone ? styles.heroPhone : null),
            ...(isCompactPhone ? styles.heroCompactPhone : null),
          }}
        >
          <motion.div             variants={staggerContainer}
            initial="hidden"
            animate="show"
            style={{
              ...styles.heroLeft,
              ...(isPhone ? styles.heroLeftPhone : null),
            }}
          >
            <motion.div
              variants={heroText}
              custom={0.1}
              style={{
              ...styles.badge,
              ...(isPhone ? styles.badgePhone : null),
              ...(isCompactPhone ? styles.badgeCompactPhone : null),
            }}
            >
              <Sparkles size={14} />
              Portfolio Experience
            </motion.div>

            <motion.h1
              variants={heroText}
              custom={0.25}
              style={{
                ...styles.heroTitle,
                ...(isCompactPhone ? styles.heroTitleCompactPhone : null),
              }}
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
              style={{
                ...styles.heroSubtitle,
                ...(isPhone ? styles.heroSubtitlePhone : null),
                ...(isCompactPhone ? styles.heroSubtitleCompactPhone : null),
              }}
            >
              Mahendra Ranwa · Computer Engineering Technology Graduate, Sheridan College
            </motion.p>

            <motion.p
              variants={heroText}
              custom={0.45}
              style={{
                ...styles.heroDesc,
                ...(isPhone ? styles.heroDescPhone : null),
                ...(isCompactPhone ? styles.heroDescCompactPhone : null),
              }}
            >
              Sheridan College's Computer Engineering Technology program trains me to integrate hardware and software, design and test embedded devices, and maintain computer and network systems.
            </motion.p>

            <motion.div
              variants={heroText}
              custom={0.55}
              style={{
                ...styles.heroButtons,
                ...(isPhone ? styles.heroButtonsPhone : null),
              }}
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                style={{
                ...styles.primaryBtn,
                ...(isPhone ? styles.heroButtonPhone : null),
                ...(isCompactPhone ? styles.heroButtonCompactPhone : null),
              }}
                href="#projects"
              >
                View Projects <ArrowRight size={16} />
              </motion.a>
              <motion.a
                whileHover={{ y: -2, scale: 1.02 }}
                style={{
                ...styles.secondaryBtn,
                ...(isPhone ? styles.heroButtonPhone : null),
                ...(isCompactPhone ? styles.heroButtonCompactPhone : null),
              }}
                href={`${assetBase}MahendraRanwaCS.pdf`}
                target="_blank"
                rel="noreferrer"
              >
                Open Resume
              </motion.a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              style={{
                ...styles.heroMiniGrid,
                ...(isPhone ? styles.heroMiniGridPhone : null),
              }}
            >
              <motion.div
                variants={scaleIn}
                style={{
                  ...styles.heroMiniCard,
                  ...(isPhone ? styles.heroMiniCardPhone : null),
                  ...(isCompactPhone ? styles.heroMiniCardCompactPhone : null),
                }}
              >
                <span style={styles.miniLabel}>Program</span>
                <strong style={styles.miniValue}>Computer Engineering Technology</strong>
              </motion.div>
              <motion.div
                variants={scaleIn}
                style={{
                  ...styles.heroMiniCard,
                  ...(isPhone ? styles.heroMiniCardPhone : null),
                  ...(isCompactPhone ? styles.heroMiniCardCompactPhone : null),
                }}
              >
                <span style={styles.miniLabel}>Focus</span>
                <strong style={styles.miniValue}>Embedded Systems & Networks</strong>
              </motion.div>
              <motion.div
                variants={scaleIn}
                style={{
                  ...styles.heroMiniCard,
                  ...(isPhone ? styles.heroMiniCardPhone : null),
                  ...(isCompactPhone ? styles.heroMiniCardCompactPhone : null),
                }}
              >
                <span style={styles.miniLabel}>Training</span>
                <strong style={styles.miniValue}>Lab, Capstone, Co-op</strong>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={heroImageVariant}
            initial="hidden"
            animate="show"
            style={{
              ...styles.heroRight,
              ...(isPhone ? styles.heroRightPhone : null),
              ...(isCompactPhone ? styles.heroRightCompactPhone : null),
            }}
          >
            <HeroVisual compact={isPhone} compactPhone={isCompactPhone} />
          </motion.div>
        </section>

        <Section id="about" title="About">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            whileHover={{
              rotateX: 4,
              rotateY: -4,
              y: -6,
              transition: { duration: 0.22 },
            }}
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
                  y: -10,
                  scale: 1.02,
                  rotateX: 7,
                  rotateY: -7,
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
                  x: 6,
                  y: -6,
                  rotateX: 4,
                  rotateY: -5,
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
                whileHover={{
                  y: -6,
                  rotateX: 4,
                  rotateY: -4,
                  transition: { duration: 0.22 },
                }}
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
                whileHover={{
                  y: -6,
                  rotateX: 4,
                  rotateY: -4,
                  transition: { duration: 0.22 },
                }}
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

function useViewportWidth() {
  const getWidth = () =>
    typeof window === "undefined" ? 1200 : window.innerWidth;

  const [viewportWidth, setViewportWidth] = useState(getWidth);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const handleResize = () => setViewportWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportWidth;
}

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "home");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      let nextActiveSection = sectionIds[0] ?? "home";

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (!element) continue;

        if (scrollPosition >= element.offsetTop) {
          nextActiveSection = sectionId;
        }
      }

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sectionIds]);

  return activeSection;
}

function useCustomCursor(enabled) {
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const scale = useMotionValue(0);
  const glowScale = useMotionValue(0);
  const opacity = useMotionValue(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      x.set(-120);
      y.set(-120);
      scale.set(0);
      glowScale.set(0);
      opacity.set(0);
      return undefined;
    }

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, summary, .cursor-hover';

    const handleMouseMove = (event) => {
      const hovering = Boolean(event.target.closest(interactiveSelector));
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);
      scale.set(hovering ? 0.8 : 1);
      glowScale.set(hovering ? 1.55 : 1);
    };

    const handleMouseLeave = () => {
      opacity.set(0);
      scale.set(0);
      glowScale.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled]);

  return { x, y, scale, glowScale, opacity };
}

function Section({ id, title, children }) {
  const isPhone = useViewportWidth() <= 640;

  return (
    <section
      id={id}
      style={{
        ...styles.section,
        ...(isPhone ? styles.sectionPhone : null),
      }}
    >
      <div style={styles.sectionGlow} />
      <h2 style={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}

function CustomCursor({ cursor }) {
  const glowX = useSpring(useTransform(cursor.x, (value) => value - 22), {
    stiffness: 280,
    damping: 22,
    mass: 0.6,
  });
  const glowY = useSpring(useTransform(cursor.y, (value) => value - 22), {
    stiffness: 280,
    damping: 22,
    mass: 0.6,
  });
  const dotX = useSpring(useTransform(cursor.x, (value) => value - 6), {
    stiffness: 420,
    damping: 28,
    mass: 0.45,
  });
  const dotY = useSpring(useTransform(cursor.y, (value) => value - 6), {
    stiffness: 420,
    damping: 28,
    mass: 0.45,
  });
  const glowScale = useSpring(cursor.glowScale, {
    stiffness: 280,
    damping: 22,
    mass: 0.6,
  });
  const dotScale = useSpring(cursor.scale, {
    stiffness: 420,
    damping: 28,
    mass: 0.45,
  });
  const cursorOpacity = useSpring(cursor.opacity, {
    stiffness: 300,
    damping: 26,
  });

  return (
    <>
      <motion.div style={{ ...styles.cursorGlow, x: glowX, y: glowY, scale: glowScale, opacity: cursorOpacity }} />
      <motion.div style={{ ...styles.cursorDot, x: dotX, y: dotY, scale: dotScale, opacity: cursorOpacity }} />
    </>
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

function HeroVisual({ compact = false, compactPhone = false }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 160,
    damping: 18,
  });
  const floatX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 20,
  });
  const floatY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 20,
  });

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.div
      style={{
        ...styles.heroVisualWrap,
        ...(compact ? styles.heroVisualWrapPhone : null),
        ...(compactPhone ? styles.heroVisualWrapCompactPhone : null),
      }}
      onMouseMove={handlePointerMove}
      onMouseLeave={resetPointer}
    >
      <motion.div
        animate={{
          opacity: [0.24, 0.7, 0.24],
          scale: [1, 1.08, 1],
        }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          ...styles.imageHalo,
          ...(compact ? styles.imageHaloPhone : null),
          ...(compactPhone ? styles.imageHaloCompactPhone : null),
        }}
      />

      <motion.div
        animate={{
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{
          ...styles.heroRing,
          ...(compact ? styles.heroRingPhone : null),
          ...(compactPhone ? styles.heroRingCompactPhone : null),
        }}
      />

      <motion.div
        style={{
          ...styles.imageCard3DWrap,
          ...(compact ? styles.imageCard3DWrapPhone : null),
          ...(compactPhone ? styles.imageCard3DWrapCompactPhone : null),
          rotateX,
          rotateY,
          x: floatX,
          y: floatY,
        }}
      >
        <motion.div
          animate={{
            y: [0, -12, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            ...styles.imageCard,
            ...(compact ? styles.imageCardPhone : null),
            ...(compactPhone ? styles.imageCardCompactPhone : null),
          }}
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
            }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              ...styles.heroChipTop,
              ...(compact ? styles.heroChipTopPhone : null),
              ...(compactPhone ? styles.heroChipTopCompactPhone : null),
            }}
          >
            Embedded Systems
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              x: [0, -6, 0],
            }}
            transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              ...styles.heroChipBottom,
              ...(compact ? styles.heroChipBottomPhone : null),
              ...(compactPhone ? styles.heroChipBottomCompactPhone : null),
            }}
          >
            Support + Hardware
          </motion.div>

          <div style={styles.imageDepthShadow} />
          <div style={styles.imageGradientPlane} />
          <img
            src={`${assetBase}mahendra.jpeg`}
            alt="Mahendra Ranwa"
            style={{
              ...styles.image,
              ...(compact ? styles.imagePhone : null),
              ...(compactPhone ? styles.imageCompactPhone : null),
            }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-3, 0, -3],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          ...styles.heroStatLeft,
          ...(compact ? styles.heroStatLeftPhone : null),
          ...(compactPhone ? styles.heroStatLeftCompactPhone : null),
        }}
      >
        <span style={styles.heroStatLabel}>Realtime</span>
        <strong style={styles.heroStatValue}>Systems</strong>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [3, 0, 3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          ...styles.heroStatRight,
          ...(compact ? styles.heroStatRightPhone : null),
          ...(compactPhone ? styles.heroStatRightCompactPhone : null),
        }}
      >
        <span style={styles.heroStatLabel}>Hands-on</span>
        <strong style={styles.heroStatValue}>Troubleshooting</strong>
      </motion.div>
    </motion.div>
  );
}

function SideNav({ useBottomNav, activeSection, position = "right" }) {
  const isPhone = useViewportWidth() <= 640;
  const isCompactPhone = useViewportWidth() <= 400;

  return (
    <nav
      aria-label="Section navigation"
      style={{
        ...styles.sideNav,
        ...(useBottomNav
          ? {
              ...styles.sideNavBottom,
              ...(isPhone ? styles.sideNavBottomPhone : null),
              ...(isCompactPhone ? styles.sideNavBottomCompactPhone : null),
            }
          : position === "left"
            ? styles.sideNavLeft
            : styles.sideNavRight),
      }}
    >
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.slice(1);

        return (
          <motion.a
            key={link.href}
            href={link.href}
            whileHover={{
              y: -3,
              scale: useBottomNav ? 1.02 : 1.06,
            }}
            whileTap={{ scale: 0.96 }}
            style={{
              ...styles.sideNavItem,
              ...(useBottomNav
                ? {
                    ...styles.sideNavItemBottom,
                    ...(isPhone ? styles.sideNavItemBottomPhone : null),
                    ...(isCompactPhone ? styles.sideNavItemBottomCompactPhone : null),
                  }
                : null),
              ...(isActive ? styles.sideNavItemActive : null),
            }}
            title={link.label}
            aria-label={link.label}
            aria-current={isActive ? "location" : undefined}
          >
            {link.icon}
          </motion.a>
        );
      })}
    </nav>
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

  pageCursorDesktop: {
    cursor: "none",
  },

  cursorGlow: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(103,232,249,0.28), rgba(96,165,250,0.12) 45%, transparent 72%)",
    pointerEvents: "none",
    zIndex: 80,
    mixBlendMode: "screen",
  },

  cursorDot: {
    position: "fixed",
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #67e8f9, #60a5fa)",
    boxShadow: "0 0 18px rgba(34,211,238,0.45)",
    pointerEvents: "none",
    zIndex: 81,
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
    transform: "perspective(1200px) rotateX(72deg) scale(1.35)",
    transformOrigin: "center bottom",
    opacity: 0.5,
  },

  sideNav: {
    position: "fixed",
    zIndex: 30,
    display: "flex",
    gap: 12,
    alignItems: "center",
  },

  sideNavRight: {
    top: 0,
    bottom: 0,
    right: 18,
    flexDirection: "column",
    justifyContent: "center",
    padding: "28px 0",
  },

  sideNavLeft: {
    top: 0,
    bottom: 0,
    left: 18,
    flexDirection: "column",
    justifyContent: "center",
    padding: "28px 0",
  },

  sideNavBottom: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    justifyItems: "center",
    alignItems: "center",
    left: 16,
    right: 16,
    bottom: 16,
    gap: 10,
    padding: 10,
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(9,14,30,0.82), rgba(5,8,22,0.72))",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    boxShadow: "0 18px 48px rgba(0,0,0,0.26)",
  },

  sideNavBottomPhone: {
    left: 10,
    right: 10,
    bottom: 10,
    gap: 8,
    padding: 8,
    borderRadius: 18,
  },

  sideNavBottomCompactPhone: {
    left: 8,
    right: 8,
    bottom: 8,
    gap: 6,
    padding: 6,
  },

  sideNavItem: {
    width: 46,
    height: 46,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "none",
    borderRadius: 14,
    color: "#cbd5e1",
    textDecoration: "none",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 10px 24px rgba(3,7,18,0.16)",
    transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease, opacity 0.2s ease",
  },

  sideNavItemBottom: {
    width: 46,
    height: 46,
    minWidth: 0,
  },

  sideNavItemBottomPhone: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },

  sideNavItemBottomCompactPhone: {
    width: 38,
    height: 38,
    borderRadius: 11,
  },

  sideNavItemActive: {
    color: "#ffffff",
    background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(96,165,250,0.18) 55%, rgba(255,255,255,0.12))",
    boxShadow: "0 14px 34px rgba(34,211,238,0.14), 0 0 24px rgba(96,165,250,0.08)",
    transform: "translateY(-2px)",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "clamp(12px, 3vw, 20px) clamp(16px, 4vw, 32px) clamp(12px, 3vw, 20px) clamp(16px, 10vw, 92px)",
    background: "rgba(5,8,22,0.6)",
    backdropFilter: "blur(14px)",
    flexWrap: "wrap",
    gap: "clamp(8px, 2vw, 12px)",
  },

  headerPhone: {
    padding: "12px 16px",
  },

  headerCompactPhone: {
    padding: "10px 12px",
  },

  logo: {
    fontSize: 24,
    fontWeight: 900,
  },

  logoPhone: {
    fontSize: 21,
  },

  logoAccent: {
    color: "#22d3ee",
  },

  main: {
    position: "relative",
    zIndex: 1,
    transformStyle: "preserve-3d",
  },

  mainWithBottomNav: {
    paddingBottom: 108,
  },

  mainPhone: {
    overflowX: "hidden",
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

  heroPhone: {
    minHeight: "auto",
    gridTemplateColumns: "1fr",
    gap: 28,
    padding: "24px 16px 48px",
  },

  heroCompactPhone: {
    gap: 22,
    padding: "20px 12px 42px",
  },

  heroLeft: {
    maxWidth: 700,
  },

  heroLeftPhone: {
    maxWidth: "100%",
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

  badgePhone: {
    padding: "8px 12px",
    fontSize: 11,
    letterSpacing: "0.1em",
    marginBottom: 18,
  },

  badgeCompactPhone: {
    fontSize: 10,
    padding: "7px 10px",
  },

  heroTitle: {
    fontSize: "clamp(3rem, 8vw, 6rem)",
    lineHeight: 0.92,
    fontWeight: 900,
    margin: 0,
    letterSpacing: "-0.05em",
  },

  heroTitleCompactPhone: {
    fontSize: "clamp(2.25rem, 12vw, 2.9rem)",
    lineHeight: 0.96,
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

  heroSubtitlePhone: {
    marginTop: 18,
    fontSize: 16,
    lineHeight: 1.5,
  },

  heroSubtitleCompactPhone: {
    fontSize: 15,
  },

  heroDesc: {
    marginTop: 18,
    color: "#94a3b8",
    fontSize: 18,
    lineHeight: 1.8,
    maxWidth: 620,
  },

  heroDescPhone: {
    marginTop: 14,
    fontSize: 15,
    lineHeight: 1.7,
  },

  heroDescCompactPhone: {
    fontSize: 14,
    lineHeight: 1.65,
  },

  heroButtons: {
    marginTop: 30,
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
  },

  heroButtonsPhone: {
    marginTop: 24,
    flexDirection: "column",
    alignItems: "stretch",
    gap: 12,
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

  heroButtonPhone: {
    width: "100%",
    justifyContent: "center",
    padding: "14px 18px",
  },

  heroButtonCompactPhone: {
    padding: "13px 16px",
    fontSize: 14,
  },

  heroMiniGrid: {
    marginTop: 32,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(140px, 35vw, 180px), 1fr))",
    gap: "clamp(12px, 2vw, 16px)",
    maxWidth: 760,
  },

  heroMiniGridPhone: {
    marginTop: 24,
    gridTemplateColumns: "1fr",
    gap: 12,
  },

  heroMiniCard: {
    ...glass,
    borderRadius: 22,
    padding: 18,
    transformStyle: "preserve-3d",
    background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.035))",
    boxShadow: "0 20px 42px rgba(2,6,23,0.22)",
  },

  heroMiniCardPhone: {
    padding: 16,
    borderRadius: 20,
  },

  heroMiniCardCompactPhone: {
    padding: 14,
    borderRadius: 18,
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
    textShadow: "0 8px 18px rgba(15,23,42,0.22)",
  },

  heroRight: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    minHeight: 540,
  },

  heroRightPhone: {
    minHeight: "auto",
  },

  heroRightCompactPhone: {
    marginTop: 4,
  },

  heroVisualWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 460,
    minHeight: 540,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: 1400,
    transformStyle: "preserve-3d",
  },

  heroVisualWrapPhone: {
    maxWidth: 360,
    minHeight: 410,
    margin: "0 auto",
  },

  heroVisualWrapCompactPhone: {
    maxWidth: 304,
    minHeight: 350,
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
    inset: 20,
    borderRadius: 999,
    background: "radial-gradient(circle, rgba(99,102,241,0.32), transparent 55%)",
    filter: "blur(36px)",
    zIndex: 0,
  },

  imageHaloPhone: {
    inset: 34,
    filter: "blur(24px)",
  },

  imageHaloCompactPhone: {
    inset: 28,
    filter: "blur(18px)",
  },

  heroRing: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: "50%",
    border: "1px solid rgba(103,232,249,0.14)",
    boxShadow: "0 0 0 22px rgba(255,255,255,0.015), 0 0 90px rgba(34,211,238,0.08)",
    zIndex: 0,
  },

  heroRingPhone: {
    width: 290,
    height: 290,
    boxShadow: "0 0 0 14px rgba(255,255,255,0.015), 0 0 56px rgba(34,211,238,0.08)",
  },

  heroRingCompactPhone: {
    width: 248,
    height: 248,
  },

  imageCard3DWrap: {
    position: "relative",
    width: "100%",
    maxWidth: 390,
    transformStyle: "preserve-3d",
    zIndex: 2,
  },

  imageCard3DWrapPhone: {
    maxWidth: 310,
  },

  imageCard3DWrapCompactPhone: {
    maxWidth: 270,
  },

  imageCard: {
    ...glass,
    position: "relative",
    padding: 18,
    borderRadius: 34,
    width: "100%",
    maxWidth: 380,
    zIndex: 1,
    overflow: "visible",
    transformStyle: "preserve-3d",
    boxShadow: "0 34px 90px rgba(2,6,23,0.38)",
  },

  imageCardPhone: {
    padding: 14,
    borderRadius: 26,
    maxWidth: 310,
  },

  imageCardCompactPhone: {
    padding: 12,
    borderRadius: 22,
    maxWidth: 270,
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
    borderRadius: 26,
    display: "block",
    objectFit: "cover",
    position: "relative",
    zIndex: 3,
    transform: "translateZ(44px)",
  },

  imagePhone: {
    borderRadius: 20,
  },

  imageCompactPhone: {
    borderRadius: 18,
  },

  imageDepthShadow: {
    position: "absolute",
    inset: "14% 12% -10% 12%",
    background: "radial-gradient(circle at 50% 50%, rgba(15,23,42,0.28), transparent 68%)",
    filter: "blur(28px)",
    transform: "translateZ(-20px)",
    zIndex: 1,
  },

  imageGradientPlane: {
    position: "absolute",
    inset: 0,
    borderRadius: 34,
    background: "linear-gradient(140deg, rgba(103,232,249,0.16), rgba(96,165,250,0.08) 40%, rgba(255,255,255,0.02) 62%, rgba(192,132,252,0.14))",
    transform: "translateZ(18px)",
    zIndex: 2,
    pointerEvents: "none",
    mixBlendMode: "screen",
  },

  heroChipTop: {
    position: "absolute",
    top: -18,
    left: -24,
    zIndex: 4,
    padding: "11px 16px",
    borderRadius: 999,
    background: "rgba(10,16,33,0.8)",
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    boxShadow: "0 18px 34px rgba(2,6,23,0.28)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    transform: "translateZ(80px)",
  },

  heroChipTopPhone: {
    top: 10,
    left: 10,
    padding: "8px 12px",
    fontSize: 10,
    letterSpacing: "0.08em",
    maxWidth: "calc(100% - 20px)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  heroChipTopCompactPhone: {
    top: 8,
    left: 8,
    fontSize: 9,
    padding: "7px 10px",
  },

  heroChipBottom: {
    position: "absolute",
    right: -28,
    bottom: 22,
    zIndex: 4,
    padding: "12px 16px",
    borderRadius: 18,
    background: "rgba(10,16,33,0.82)",
    color: "#dbeafe",
    fontSize: 13,
    fontWeight: 700,
    boxShadow: "0 18px 34px rgba(2,6,23,0.28)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    transform: "translateZ(78px)",
  },

  heroChipBottomPhone: {
    right: 10,
    bottom: 10,
    padding: "9px 12px",
    fontSize: 11,
    borderRadius: 14,
    maxWidth: "70%",
    textAlign: "center",
  },

  heroChipBottomCompactPhone: {
    right: 8,
    bottom: 8,
    fontSize: 10,
    padding: "8px 10px",
    maxWidth: "66%",
  },

  heroStatLeft: {
    ...glass,
    position: "absolute",
    left: -14,
    bottom: 110,
    zIndex: 3,
    padding: "16px 18px",
    borderRadius: 22,
    minWidth: 132,
    transform: "rotate(-8deg)",
  },

  heroStatLeftPhone: {
    left: 4,
    bottom: -6,
    minWidth: 118,
    padding: "12px 14px",
    borderRadius: 18,
    transform: "rotate(-4deg)",
  },

  heroStatLeftCompactPhone: {
    left: 2,
    bottom: -2,
    minWidth: 102,
    padding: "10px 12px",
  },

  heroStatRight: {
    ...glass,
    position: "absolute",
    right: -8,
    top: 88,
    zIndex: 3,
    padding: "16px 18px",
    borderRadius: 22,
    minWidth: 150,
    transform: "rotate(7deg)",
  },

  heroStatRightPhone: {
    right: 4,
    top: 18,
    minWidth: 128,
    padding: "12px 14px",
    borderRadius: 18,
    transform: "rotate(4deg)",
  },

  heroStatRightCompactPhone: {
    right: 2,
    top: 12,
    minWidth: 114,
    padding: "10px 12px",
  },

  heroStatLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    marginBottom: 8,
    fontWeight: 700,
  },

  heroStatValue: {
    display: "block",
    color: "white",
    fontSize: 16,
    lineHeight: 1.2,
    fontWeight: 800,
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
    transform: "perspective(1200px) rotateX(6deg)",
    transformStyle: "preserve-3d",
  },

  introCardPhone: {
    width: "min(92%, 420px)",
    padding: "30px 20px",
    borderRadius: 24,
    transform: "none",
  },

  introCardCompactPhone: {
    width: "min(94%, 360px)",
    padding: "24px 16px",
    borderRadius: 20,
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

  introSubtitlePhone: {
    marginTop: 16,
    fontSize: "0.98rem",
    lineHeight: 1.65,
  },

  introSubtitleCompactPhone: {
    fontSize: "0.92rem",
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
    display: "none",
    marginTop: 22,
    color: "#94a3b8",
    fontSize: 14,
    letterSpacing: "0.02em",
  },

  introFun: {
    marginTop: 22,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "12px 18px",
    borderRadius: 999,
    color: "#eff6ff",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, rgba(56,189,248,0.16), rgba(124,58,237,0.2), rgba(255,255,255,0.08))",
    border: "1px solid rgba(125,211,252,0.24)",
    boxShadow: "0 14px 32px rgba(14,165,233,0.14)",
    width: "fit-content",
    marginLeft: "auto",
    marginRight: "auto",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
  },

  introFunPhone: {
    fontSize: 11,
    padding: "10px 14px",
    letterSpacing: "0.08em",
  },

  introFunCompactPhone: {
    padding: "9px 12px",
    fontSize: 10,
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
    position: "relative",
    transformStyle: "preserve-3d",
  },

  sectionPhone: {
    padding: "32px 16px 64px",
  },

  sectionGlow: {
    position: "absolute",
    inset: "8% 10% auto 10%",
    height: 140,
    background: "radial-gradient(circle, rgba(56,189,248,0.08), transparent 70%)",
    filter: "blur(26px)",
    pointerEvents: "none",
    zIndex: 0,
  },

  sectionTitle: {
    fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
    fontWeight: 900,
    marginBottom: "clamp(16px, 3vw, 28px)",
    letterSpacing: "-0.04em",
    position: "relative",
    zIndex: 1,
    textShadow: "0 12px 32px rgba(34,211,238,0.12)",
  },

  largeCard: {
    ...glass,
    borderRadius: 28,
    padding: 28,
    position: "relative",
    zIndex: 1,
    transformStyle: "preserve-3d",
    background: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.035))",
    boxShadow: "0 30px 70px rgba(2,6,23,0.28)",
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
    boxShadow: "0 24px 48px rgba(2,6,23,0.24)",
    transform: "translateZ(30px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(clamp(200px, 40vw, 240px), 1fr))",
    gap: "clamp(14px, 3vw, 22px)",
    position: "relative",
    zIndex: 1,
  },

  card: {
    ...glass,
    borderRadius: 26,
    padding: 24,
    transformStyle: "preserve-3d",
    background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.035))",
    boxShadow: "0 26px 56px rgba(2,6,23,0.24)",
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
    boxShadow: "0 18px 28px rgba(34,211,238,0.12)",
    transform: "translateZ(22px)",
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
    boxShadow: "0 12px 22px rgba(2,6,23,0.12)",
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
    position: "relative",
    zIndex: 1,
  },

  timelineCard: {
    ...glass,
    borderRadius: 28,
    padding: 26,
    position: "relative",
    transformStyle: "preserve-3d",
    background: "linear-gradient(180deg, rgba(255,255,255,0.075), rgba(255,255,255,0.04))",
    boxShadow: "0 30px 68px rgba(2,6,23,0.26)",
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
    textShadow: "0 10px 22px rgba(15,23,42,0.2)",
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

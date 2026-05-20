import { motion } from 'framer-motion';
import { Download, Mail, ChevronRight, Terminal } from "lucide-react";
import { Github, Linkedin } from "./Icons";
import { profileLinks } from "../data/profile";

const supportChecks = [
  ["CompTIA A+", "verified"],
  ["Sheridan support experience", "ready"],
  ["45-day Help Desk project", "completed"],
  ["Windows / Microsoft 365", "ready"],
  ["Active Directory / PowerShell", "ready"],
  ["Networking / VPN triage", "ready"],
];

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 font-medium text-sm mb-6 border border-primary-200 dark:border-primary-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            CompTIA A+ Certified - Open to IT Support Roles
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            Mahendra Ranwa
          </h1>
          <h2 className="text-2xl lg:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-6">
            IT Helpdesk & Desktop Support Technician
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-xl leading-relaxed">
            Computer Engineering Technology graduate from Sheridan College with hands-on support experience and a completed 45-day Help Desk training project covering Windows, networking, printers, drivers, Active Directory concepts, Microsoft 365, and PowerShell basics.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={profileLinks.resume}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-bg"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
            <a 
              href="#resume-contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-dark-bg"
            >
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </div>
          
          <div className="flex items-center gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-dark-border">
            <a href={profileLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={profileLinks.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              <span className="sr-only">GitHub</span>
              <Github className="w-6 h-6" />
            </a>
            <a href="#skills" className="ml-auto inline-flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors group">
              View Skills
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
        
        {/* Animated support console */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative lg:h-[500px] w-full rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Mac-like header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 flex items-center text-sm text-slate-400 font-mono">
              <Terminal className="w-4 h-4 mr-2" />
              service-desk-readiness
            </div>
          </div>
          
          <div className="p-5 font-mono text-sm md:text-base overflow-hidden relative flex-1">
            <div className="space-y-4 text-green-400/90">
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.8 }}
              >
                <span className="text-blue-400">admin@helpdesk</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$</span> load-profile mahendra-ranwa
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 1.2 }}
                className="grid gap-2 text-slate-300"
              >
                <div>candidate.location: Brampton / Ontario</div>
                <div>education: Sheridan College, Computer Engineering Technology, 2026</div>
                <div>target: Helpdesk, Service Desk, Desktop Support</div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 2.0 }}
              >
                <span className="text-blue-400">admin@helpdesk</span>
                <span className="text-white">:</span>
                <span className="text-purple-400">~</span>
                <span className="text-white">$</span> support-check --core-skills
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 2.5 }}
                className="text-slate-300 space-y-1"
              >
                {supportChecks.map(([label, state]) => (
                  <div key={label} className="flex justify-between items-center max-w-md gap-4">
                    <span>[OK] {label}:</span>
                    <span className="text-green-400 font-bold uppercase">{state}</span>
                  </div>
                ))}
                <div className="mt-2 text-blue-400">Ready for user-first troubleshooting.</div>
              </motion.div>
              
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-4 bg-white/70 ml-1 translate-y-1"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

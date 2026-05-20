import { motion } from 'framer-motion';
import { MapPin, Briefcase, Award, Clock, Phone, Mail, CheckCircle2, GraduationCap } from 'lucide-react';
import { profileLinks } from '../data/profile';

export const QuickFacts = () => {
  const facts = [
    { icon: MapPin, label: "Location", value: "Brampton, Ontario" },
    { icon: Briefcase, label: "Target Roles", value: "Helpdesk, Service Desk, Desktop Support" },
    { icon: GraduationCap, label: "Education", value: "Sheridan Computer Engineering Technology" },
    { icon: Award, label: "Certification", value: "CompTIA A+" },
    { icon: Clock, label: "Support Background", value: "Sheridan support + completed 45-day Help Desk project" },
  ];

  const strengths = [
    "Client Service Excellence",
    "Windows Troubleshooting",
    "Microsoft 365 Support",
    "Network Connectivity",
    "Active Directory Concepts",
    "PowerShell Basics",
    "System Setup",
    "Hardware Diagnostics",
    "Ticket Documentation"
  ];

  return (
    <section className="py-14 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Recruiter Snapshot</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Focused on entry-level IT support roles where patient communication, clean documentation, structured troubleshooting, and hands-on Windows and networking support matter as much as technical knowledge.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          
          {/* Quick Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {facts.map((fact, index) => {
              const Icon = fact.icon;
              return (
                <motion.div 
                  key={fact.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-5 rounded-lg bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700"
                >
                  <Icon className="w-6 h-6 text-primary-500 mb-2" />
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-400">{fact.label}</div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">{fact.value}</div>
                </motion.div>
              );
            })}
          </div>

          {/* Core Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Core Strengths</h3>
            <div className="flex flex-wrap gap-3">
              {strengths.map((strength, index) => (
                <motion.span 
                  key={strength}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-sm shadow-primary-900/10 dark:bg-primary-500 dark:text-slate-950 border border-primary-500 dark:border-primary-300"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {strength}
                </motion.span>
              ))}
            </div>
            
            <div className="mt-7 flex flex-col sm:flex-row gap-4">
              <a href={profileLinks.email} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400">
                <Mail className="w-4 h-4" />
                mranwa100@gmail.com
              </a>
              <a href={profileLinks.phone} className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400">
                <Phone className="w-4 h-4" />
                (437) 244-5424
              </a>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

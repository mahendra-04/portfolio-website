import { motion } from 'framer-motion';
import { CheckCircle2, GraduationCap, Monitor, Network, ShieldCheck, Terminal } from 'lucide-react';

const focusAreas = [
  {
    icon: Monitor,
    title: "Windows Support",
    text: "Troubleshooting Windows 10/11, user profiles, updates, drivers, printers, peripherals, and desktop applications."
  },
  {
    icon: Network,
    title: "Networking Support",
    text: "Working knowledge of TCP/IP, DNS, DHCP, Wi-Fi, Ethernet, VPN access, mapped drives, and connectivity triage."
  },
  {
    icon: ShieldCheck,
    title: "Identity and Security",
    text: "Active Directory concepts, password resets, account lockouts, MFA awareness, least privilege, and endpoint security basics."
  },
  {
    icon: Terminal,
    title: "Documentation and PowerShell",
    text: "Ticket notes, knowledge base writing, PowerShell basics, command output review, and escalation-ready summaries."
  }
];

const profilePoints = [
  "Computer Engineering Technology graduate from Sheridan College.",
  "Strong interest in IT Support, Help Desk, System Administration, and Technical Support.",
  "Completed a structured 45-day Help Desk training project with 45 daily learning logs.",
  "Hands-on support exposure across Windows, networking, printers, drivers, Microsoft 365, Active Directory concepts, and PowerShell basics."
];

export const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2 text-sm font-semibold text-primary-700 border border-primary-100 dark:bg-primary-500/15 dark:text-primary-100 dark:border-primary-500/25 mb-5">
              <GraduationCap className="h-4 w-4" />
              Sheridan College Graduate
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-5">About Mahendra</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 mb-6">
              I am a Computer Engineering Technology graduate from Sheridan College focused on practical IT Support, Help Desk, System Administration, and Technical Support work. My portfolio connects campus support experience with a completed 45-day Help Desk learning project built around real support scenarios and professional documentation.
            </p>

            <ul className="space-y-3">
              {profilePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.article
                  key={area.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-700 dark:bg-primary-500/15 dark:text-primary-100">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{area.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{area.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

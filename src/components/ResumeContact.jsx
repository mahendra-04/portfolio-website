import { motion } from 'framer-motion';
import { Briefcase, CheckCircle2, Download, Mail, MapPin, Phone } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { profileLinks } from '../data/profile';

const recruiterNotes = [
  "CompTIA A+ certified with IT service desk training.",
  "Completed a 45-day IT Help Desk learning journey with 45 documented learning logs.",
  "Sheridan College technical support and lab assistance experience.",
  "Comfortable with Windows, Microsoft 365, network connectivity, printer and driver issues, Active Directory concepts, PowerShell basics, hardware diagnostics, and clear user communication.",
  "Based in Brampton, Ontario and focused on Helpdesk, Service Desk, Desktop Support, and Technical Support roles."
];

const targetRoles = [
  "IT Helpdesk Technician",
  "Service Desk Analyst",
  "Desktop Support Technician",
  "Technical Support Representative"
];

export const ResumeContact = () => {
  return (
    <section id="resume-contact" className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Resume & Contact</h2>
            <p className="text-gray-600 dark:text-slate-300 mb-8 text-lg">
              Open to entry-level IT support opportunities where I can combine structured troubleshooting, patient customer service, and hands-on systems knowledge.
            </p>

            <div className="bg-gray-50 dark:bg-slate-900 p-7 rounded-lg border border-gray-100 dark:border-slate-800 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mahendra Ranwa Resume</h3>
                  <p className="text-gray-600 dark:text-slate-300 text-sm">
                    PDF resume with support experience, Sheridan College education, certifications, and technical skills.
                  </p>
                </div>
                <a
                  href={profileLinks.resume}
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                >
                  <Download size={18} />
                  Download PDF
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <a href={profileLinks.email} className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-gray-700 transition-colors hover:border-blue-200 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10">
                <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-200">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Email</p>
                  <p className="font-semibold">mranwa100@gmail.com</p>
                </div>
              </a>

              <a href={profileLinks.phone} className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-gray-700 transition-colors hover:border-green-200 hover:bg-green-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-green-500/40 dark:hover:bg-green-500/10">
                <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-200">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Phone</p>
                  <p className="font-semibold">(437) 244-5424</p>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-lg border border-gray-100 bg-gray-50 p-4 text-gray-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <div className="p-3 bg-purple-100 dark:bg-purple-500/20 rounded-lg text-purple-600 dark:text-purple-200">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Location</p>
                  <p className="font-semibold">Brampton, Ontario</p>
                </div>
              </div>

              <div className="flex gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-slate-800 dark:bg-slate-900">
                <a
                  href={profileLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0A66C2]/10 px-4 py-2.5 text-sm font-semibold text-[#0A66C2] transition-colors hover:bg-[#0A66C2]/20 dark:bg-[#0A66C2]/20 dark:text-[#70B5F9]"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </a>
                <a
                  href={profileLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-lg border border-gray-100 bg-gray-50 p-7 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-100">
                <Briefcase size={22} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Hiring Snapshot</h3>
            </div>

            <div className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">Best Fit Roles</h4>
              <div className="flex flex-wrap gap-2">
                {targetRoles.map((role) => (
                  <span key={role} className="rounded bg-white px-3 py-2 text-sm font-semibold text-gray-800 border border-gray-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 mb-3">Why Reach Out</h4>
              <ul className="space-y-4">
                {recruiterNotes.map((note) => (
                  <li key={note} className="flex items-start gap-3 text-gray-700 dark:text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

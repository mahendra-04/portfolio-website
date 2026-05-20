import { motion } from 'framer-motion';
import { BookOpenCheck, ClipboardList, Cpu, ExternalLink, MailCheck } from 'lucide-react';
import { profileLinks } from '../data/profile';

const projects = [
  {
    title: "45-Day IT Help Desk Learning Journey",
    icon: BookOpenCheck,
    featured: true,
    status: "Completed",
    link: profileLinks.helpdeskJourney,
    scenario: "A structured long-term self-learning project built to demonstrate readiness for IT Help Desk, Service Desk, Desktop Support, and Technical Support roles.",
    systems: ["Windows 10/11", "Networking", "Active Directory concepts", "Microsoft 365", "PowerShell", "Ticketing systems"],
    action: "Completed 45 daily learning logs with objectives, concepts learned, real-world troubleshooting examples, documentation examples, ticket notes, and professional takeaways.",
    result: "Gives recruiters a clear view of consistent learning, practical troubleshooting process, support documentation habits, and job-ready technical focus.",
    metrics: ["45 days completed", "45 learning logs", "Real-world troubleshooting scenarios", "Windows and networking support skills"],
    skills: ["Help Desk readiness", "Windows support", "Networking support", "Microsoft 365", "Ticket documentation"]
  },
  {
    title: "Tier 1 Ticket Resolution Workflow",
    icon: ClipboardList,
    scenario: "Common user issues need a consistent triage path so the technician can capture impact, isolate the cause, and document the fix.",
    systems: ["Windows 10/11", "Active Directory basics", "Remote support"],
    action: "Mapped a practical workflow for password, profile, software, and connectivity issues using clear triage questions and step-by-step resolution notes.",
    result: "Shows how I approach support work: confirm user impact, test the likely causes first, resolve the issue, then leave clean documentation.",
    skills: ["Incident triage", "Ticket notes", "User support"]
  },
  {
    title: "Microsoft 365 / Outlook Sync Support",
    icon: MailCheck,
    scenario: "Users lose productivity when Outlook disconnects, mail profiles corrupt, or Microsoft 365 services stop syncing correctly.",
    systems: ["Microsoft 365", "Outlook", "Control Panel"],
    action: "Simulated Outlook profile recreation, Office quick repair, connectivity checks, and plain-language user communication during the re-sync process.",
    result: "Validates a repeatable support path for diagnosing and resolving common enterprise productivity issues.",
    skills: ["Microsoft 365", "Application support", "Client communication"]
  },
  {
    title: "Hardware & Electronics Lab Support",
    icon: Cpu,
    scenario: "Students and users need safe, patient guidance when physical components, lab equipment, or circuit assemblies fail.",
    systems: ["Lab equipment", "Multimeter", "PCB assembly"],
    action: "Coached circuit fault isolation, safe handling practices, soldering techniques, and hands-on repair validation in Sheridan lab settings.",
    result: "Connects desktop support fundamentals with real hardware diagnostic experience and calm instruction under pressure.",
    skills: ["Hardware diagnostics", "Training", "Safe handling"]
  }
];

export const Projects = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Projects & Support Evidence</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Practical examples that connect the resume to day-one helpdesk work: structured self-learning, triage, Microsoft 365 support, hardware diagnostics, documentation, and user communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-slate-50 dark:bg-slate-900/80 rounded-lg p-7 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col h-full ${project.featured ? 'lg:col-span-3' : ''}`}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-200" />
                  </div>
                  {project.status && (
                    <span className="rounded bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 border border-green-100 dark:bg-green-500/15 dark:text-green-100 dark:border-green-500/25">
                      {project.status}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{project.title}</h3>

                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">Scenario</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{project.scenario}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">Systems</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.systems.map((system) => (
                        <span key={system} className="rounded bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">Action</h4>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">{project.action}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">Result</h4>
                    <p className="text-sm text-slate-800 dark:text-white font-medium leading-relaxed">{project.result}</p>
                  </div>
                  {project.metrics && (
                    <div>
                      <h4 className="text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-1.5">Metrics</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {project.metrics.map((metric) => (
                          <span key={metric} className="rounded bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100"
                    >
                      View GitHub Repository
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1.5 rounded bg-primary-50 dark:bg-primary-500/20 text-xs font-semibold text-primary-700 dark:text-primary-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

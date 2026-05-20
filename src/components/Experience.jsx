import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2, MapPin } from 'lucide-react';

const experiences = [
  {
    role: "Technical Operations & Web Support",
    company: "Toastmasters U+",
    location: "Markham, Ontario",
    period: "09/2025 - 03/2026",
    tags: ["Digital support", "Workflow troubleshooting", "User communication"],
    bullets: [
      "Supported the Toastmasters U+ community platform by troubleshooting access, publishing, and workflow issues for members and organizers.",
      "Maintained website content and technical operations while communicating fixes clearly with non-technical stakeholders.",
      "Improved digital communication workflows and documented recurring issues to reduce repeat support requests."
    ]
  },
  {
    role: "Technical Support Representative",
    company: "Sheridan College",
    location: "Brampton, Ontario",
    period: "04/2024 - 08/2024",
    tags: ["Hardware/software support", "Network troubleshooting", "Lab systems"],
    bullets: [
      "Provided technical support for hardware, software, and network issues across Sheridan College environments.",
      "Diagnosed and resolved system faults promptly, minimizing downtime for end users.",
      "Troubleshot operating systems, connectivity, and applications to keep academic operations running smoothly.",
      "Configured lab systems and academic software to improve user experience and reduce recurring issues."
    ]
  },
  {
    role: "Learning Assistant",
    company: "Sheridan College",
    location: "Brampton, Ontario",
    period: "05/2023 - 12/2023",
    tags: ["Student support", "Hardware labs", "Training"],
    bullets: [
      "Coached students through circuit fault isolation with lab equipment, translating technical concepts into clear instructions.",
      "Guided students on electronic fabrication, safe handling practices, soldering techniques, and PCB assembly.",
      "Developed technical documentation and training materials to strengthen hands-on learning for peers."
    ]
  }
];

export const Experience = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Professional Experience</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Recent work reframed around the support outcomes recruiters care about: resolving user issues, maintaining reliable systems, documenting fixes, and communicating calmly with non-technical users.
          </p>
        </div>

        <div className="grid gap-5">
          {experiences.map((exp, index) => (
            <motion.article
              key={`${exp.company}-${exp.role}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800/80"
            >
              <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-300 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                  <div className="mt-3 space-y-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      {exp.company}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {exp.location}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="rounded bg-primary-50 px-2.5 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-500/20 dark:text-primary-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

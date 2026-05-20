import { motion } from 'framer-motion';
import { Award, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';

const certifications = [
  "CompTIA A+ Certified",
  "Computer Components and Peripherals for IT Technicians",
  "IT Service Desk: Service Management"
];

const supportSkillAreas = [
  "Microsoft 365 support",
  "Active Directory concepts",
  "PowerShell basics",
  "ITIL service desk practices",
  "Networking troubleshooting"
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-slate-900 transition-colors border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education & Certifications</h2>
          <p className="text-gray-600 dark:text-slate-300">
            A support-focused technical foundation: Sheridan College computer engineering training, CompTIA A+, service desk learning, and a completed 45-day Help Desk project covering Microsoft and identity fundamentals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-800 p-7 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-100 dark:bg-blue-500/20 rounded-lg text-blue-600 dark:text-blue-200">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-gray-900 dark:text-white">Computer Engineering Technology</p>
              <p className="text-gray-700 dark:text-slate-200">Sheridan College, Brampton, ON</p>
              <p className="text-sm font-semibold text-primary-700 dark:text-primary-200">Graduated 2026</p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="bg-white dark:bg-slate-800 p-7 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 dark:bg-green-500/20 rounded-lg text-green-600 dark:text-green-200">
                <Award size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Certifications</h3>
            </div>

            <ul className="space-y-4">
              {certifications.map((cert) => (
                <li key={cert} className="flex items-start gap-3 text-gray-700 dark:text-slate-200">
                  <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                  <span className="font-medium">{cert}</span>
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="bg-white dark:bg-slate-800 p-7 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-500/20 rounded-lg text-indigo-600 dark:text-indigo-200">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Support Skill Areas</h3>
            </div>

            <ul className="space-y-4">
              {supportSkillAreas.map((skill) => (
                <li key={skill} className="flex items-start gap-3 text-gray-700 dark:text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 flex-shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

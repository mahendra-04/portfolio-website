import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, Cpu, Server, Shield, Network, Users } from 'lucide-react';

const skillCategories = [
  { id: 'desktop', label: 'Desktop Support', icon: Monitor, skills: ['Windows 10/11', 'Operating system troubleshooting', 'Software installation support', 'Printer and peripheral support', 'System setup and optimization', 'Remote support basics'] },
  { id: 'ms', label: 'Microsoft Support', icon: Users, skills: ['Microsoft 365', 'Outlook sync support', 'Teams', 'OneDrive', 'SharePoint basics', 'Mail profile repair'] },
  { id: 'service', label: 'Service Desk', icon: Shield, skills: ['Incident triage', 'Ticket documentation', 'Ticketing systems', 'Client service excellence', 'Knowledge base notes', 'Follow-up communication'] },
  { id: 'network', label: 'Networking', icon: Network, skills: ['TCP/IP', 'DNS', 'DHCP', 'VPN troubleshooting', 'Wi-Fi troubleshooting', 'Connectivity troubleshooting'] },
  { id: 'hardware', label: 'Hardware & Labs', icon: Cpu, skills: ['Hardware diagnostics', 'Lab system setup', 'Circuit fault isolation', 'Soldering basics', 'PCB assembly basics', 'Safe handling practices'] },
  { id: 'concepts', label: 'Admin Concepts', icon: Server, skills: ['Active Directory basics', 'IT service management', 'System configuration', 'Linux/UNIX fundamentals', 'Network management', 'Technical documentation'] },
];

const topSkills = [
  'Windows 10/11',
  'Microsoft 365',
  'Hardware diagnostics',
  'Incident triage',
  'Active Directory basics',
  'Client service excellence'
];

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('desktop');

  return (
    <section id="skills" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technical & Support Skills</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Practical helpdesk skills shaped by campus support, a completed 45-day Help Desk learning journey, Microsoft 365 troubleshooting, and user-facing technical assistance.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tabs */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === category.id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeTab === category.id ? 'text-primary-500' : 'text-slate-400'}`} />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Skill Content */}
          <div className="flex-1 bg-slate-50 dark:bg-slate-800/70 rounded-lg p-6 md:p-8 border border-slate-100 dark:border-slate-700">
            <AnimatePresence mode="wait">
              {skillCategories.map((category) => (
                activeTab === category.id && (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                      <category.icon className="w-6 h-6 text-primary-500" />
                      {category.label}
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.skills.map((skill, index) => {
                        const isTopSkill = topSkills.includes(skill);
                        return (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-sm ${
                              isTopSkill
                                ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                            }`}
                          >
                            <div className={`w-2 h-2 rounded-full ${isTopSkill ? 'bg-primary-600 dark:bg-primary-400' : 'bg-primary-400 dark:bg-slate-500'}`}></div>
                            <span className={`text-sm ${isTopSkill ? 'font-bold text-primary-800 dark:text-primary-200' : 'font-medium text-slate-700 dark:text-slate-300'}`}>
                              {skill}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

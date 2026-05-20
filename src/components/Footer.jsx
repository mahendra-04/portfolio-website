import { Mail } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { profileLinks } from '../data/profile';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-slate-950 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex items-center gap-6">
          <a
            href={profileLinks.email}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href={profileLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>

      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        <p>&copy; {currentYear} Mahendra Ranwa. All rights reserved.</p>
      </div>
    </footer>
  );
};

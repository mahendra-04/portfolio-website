import { useState, useEffect } from 'react';
import { Mail, Send, X } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { QuickFacts } from './components/QuickFacts';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { ResumeContact } from './components/ResumeContact';
import { Footer } from './components/Footer';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') setStatus('idle');
  };

  const submitMessage = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: 'Portfolio contact request',
          from_name: formData.name,
          name: formData.name,
          email: formData.email,
          message: formData.reason
        })
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to send message');
      }

      setStatus('sent');
      setFormData({ name: '', email: '', reason: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] max-w-sm rounded-lg border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/20 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Send a Message</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">Share your contact details and reason for reaching out.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close contact form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={submitMessage}>
            <div>
              <label htmlFor="floating-name" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Name</label>
              <input
                id="floating-name"
                type="text"
                value={formData.name}
                onChange={(event) => updateField('name', event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label htmlFor="floating-email" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <input
                id="floating-email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="floating-reason" className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">Reason for Contact</label>
              <textarea
                id="floating-reason"
                rows={3}
                value={formData.reason}
                onChange={(event) => updateField('reason', event.target.value)}
                className="w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                placeholder="Role, interview, question, or project..."
                required
              />
            </div>

            {status === 'sent' && (
              <p className="rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:bg-green-500/10 dark:text-green-200">
                Message sent. Thank you for reaching out.
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-500/10 dark:text-red-200">
                Message could not be sent. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Send className="h-4 w-4" />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-12 items-center gap-2 rounded-full bg-slate-900 px-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 dark:focus:ring-offset-slate-900"
        aria-expanded={isOpen}
        aria-label="Open contact form"
      >
        <Mail className="h-5 w-5" />
        <span className="hidden sm:inline">Message Me</span>
      </button>
    </div>
  );
};

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-6 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all z-40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-slate-900"
      aria-label="Back to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans selection:bg-primary-500 selection:text-white relative">
        <ThemeToggle />
        
        <main>
          <Hero />
          <QuickFacts />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Certifications />
          <ResumeContact />
        </main>
        
        <Footer />
        <FloatingContact />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;

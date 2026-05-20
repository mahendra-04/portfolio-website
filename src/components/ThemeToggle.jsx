import { useTheme } from '../context/theme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
      aria-label="Toggle Dark Mode"
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
};

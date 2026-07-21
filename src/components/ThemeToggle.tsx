import { useEffect, useState } from 'react';

export function ThemeToggle({ standalone = true }: { standalone?: boolean }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial preference
    const root = window.document.documentElement;
    const isDarkGlobal = root.classList.contains('dark');
    setIsDark(isDarkGlobal);
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className={`${standalone ? 'fixed top-6 right-6 z-50 ' : ''}p-2 rounded-full bg-zinc-200 dark:bg-carbon-800 text-slate-700 dark:text-ash-400 hover:bg-zinc-300 dark:hover:bg-carbon-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ash-500`}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      )}
    </button>
  );
}

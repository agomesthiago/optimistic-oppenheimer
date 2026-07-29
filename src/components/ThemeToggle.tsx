import { useEffect, useState, useRef } from 'react';
import { Palette, Check } from 'lucide-react';

const THEME_KEY = 'vidas_masculinas_theme';

type ThemeOption = 'dark' | 'light' | 'cyan' | 'bw' | 'sepia';

const THEMES: { id: ThemeOption; label: string; dot: string }[] = [
  { id: 'dark', label: 'Escuro (Padrão)', dot: 'bg-red-600 border border-black' },
  { id: 'light', label: 'Claro (Padrão)', dot: 'bg-zinc-100 border border-zinc-400' },
  { id: 'cyan', label: 'Clinical Cyan', dot: 'bg-cyan-400 border border-slate-900' },
  { id: 'bw', label: 'Oppenheimer P&B', dot: 'bg-black border border-white' },
  { id: 'sepia', label: 'Dossiê Sepia', dot: 'bg-amber-700 border border-amber-200' },
];

export function ThemeToggle({ standalone = true }: { standalone?: boolean }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>('dark');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyThemeClass = (theme: ThemeOption) => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'theme-cyan', 'theme-bw', 'theme-sepia');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'cyan') {
      root.classList.add('dark', 'theme-cyan');
    } else if (theme === 'bw') {
      root.classList.add('dark', 'theme-bw');
    } else if (theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
    // 'light' has no extra classes
  };

  useEffect(() => {
    let storedTheme: ThemeOption = 'dark';
    try {
      storedTheme = (localStorage.getItem(THEME_KEY) as ThemeOption) || 'dark';
    } catch {
      storedTheme = 'dark';
    }
    setCurrentTheme(storedTheme);
    applyThemeClass(storedTheme);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectTheme = (theme: ThemeOption) => {
    setCurrentTheme(theme);
    applyThemeClass(theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Ignora exceções de armazenamento em modos restritos
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${standalone ? 'fixed top-6 right-6 z-50' : ''}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Escolher paleta de cores / tema"
        title="Alterar tema / paleta"
        className="p-2 rounded-full bg-zinc-200 dark:bg-carbon-800 text-slate-700 dark:text-ash-400 hover:bg-zinc-300 dark:hover:bg-carbon-700 transition-colors focus:outline-none focus:ring-2 focus:ring-ash-500 flex items-center justify-center"
      >
        <Palette size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-carbon-900 border border-zinc-200 dark:border-carbon-700 shadow-xl py-2 z-50 text-xs font-mono">
          <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-slate-400 dark:text-ash-500">
            Paleta de Cores
          </div>
          {THEMES.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => selectTheme(t.id)}
                className={`w-full px-3 py-2 flex items-center justify-between text-left hover:bg-zinc-100 dark:hover:bg-carbon-800 transition-colors ${
                  isSelected
                    ? 'text-slate-900 dark:text-ash-100 font-bold'
                    : 'text-slate-600 dark:text-ash-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${t.dot}`} />
                  <span>{t.label}</span>
                </div>
                {isSelected && <Check size={14} className="text-crimson-600 dark:text-ash-300" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

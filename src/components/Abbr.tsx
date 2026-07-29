interface AbbrProps {
  title: string;
  children: string;
}

/**
 * Componente Abbr para conformidade com WCAG 2.2 Nível AAA (Critério 3.1.4 — Siglas e Abreviações).
 * Envelopa siglas em marcação semântica <abbr> com indicação visual sutil e acessível.
 */
export function Abbr({ title, children }: AbbrProps) {
  return (
    <abbr
      title={title}
      className="underline decoration-dotted decoration-slate-400 dark:decoration-ash-500 underline-offset-4 cursor-help"
    >
      {children}
    </abbr>
  );
}

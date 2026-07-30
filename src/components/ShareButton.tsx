import { useState } from 'react';
import { Share2 } from 'lucide-react';

const SHARE_COPIES = [
  'Compartilhe esta realidade',
  'Leve este alerta adiante',
  'Ajude a conscientizar',
  'Espalhe esta mensagem',
  'Compartilhe este dado',
  'Mostre isso ao mundo',
  'Quebre o silêncio, compartilhe',
  'Faça sua parte, repasse',
  'Leve esta verdade aos stories',
  'Publique esta estatística',
  'Ajude a salvar vidas, espalhe',
  'Não ignore, compartilhe',
];

interface ShareButtonProps {
  onClick: () => void;
  isSharing: boolean;
  className?: string;
}

export function ShareButton({ onClick, isSharing, className = '' }: ShareButtonProps) {
  const [shareCopy] = useState(() => SHARE_COPIES[Math.floor(Math.random() * SHARE_COPIES.length)]);

  return (
    <button
      data-testid="share-button"
      onClick={onClick}
      disabled={isSharing}
      className={`group relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-zinc-300 dark:border-carbon-700 bg-white dark:bg-carbon-900 text-xs font-mono tracking-widest uppercase text-slate-700 dark:text-ash-300 hover:bg-zinc-50 dark:hover:bg-carbon-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/50 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-ash-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none ${className}`}
    >
      <Share2 size={12} className="transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
      {isSharing ? 'Preparando imagem...' : shareCopy}
    </button>
  );
}

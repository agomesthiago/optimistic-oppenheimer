import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import type { AspectRatio } from './CauseStoryCard';
import { useShare } from '../hooks/useShare';

interface SharePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  renderCard: (props: { aspectRatio: AspectRatio; id?: string; className?: string }) => React.ReactNode;
  exportElementId: string;
  exportValue?: number;
}

export function SharePreviewModal({
  isOpen,
  onClose,
  renderCard,
  exportElementId,
  exportValue,
}: SharePreviewModalProps) {
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const { isSharing, exportImage } = useShare();

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleExport = async () => {
    await exportImage(exportElementId, exportValue);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-sm">
      {/* Invisible actual-size card for html-to-image */}
      {renderCard({
        aspectRatio,
        id: exportElementId,
        className: 'fixed top-0 left-0 opacity-0 pointer-events-none -z-50'
      })}

      <div className="flex w-full max-w-4xl flex-col md:flex-row bg-zinc-900 overflow-hidden rounded-2xl shadow-2xl border border-zinc-800 max-h-[95dvh]">
        
        {/* Preview Area */}
        <div className="relative flex-1 bg-zinc-950 flex items-center justify-center p-4 sm:p-6 border-b md:border-b-0 md:border-r border-zinc-800 overflow-hidden min-h-[45vh] md:min-h-[60vh]">
          {/* Scale down the 1080px wide component to fit container */}
          <div className="relative w-full h-full flex items-center justify-center">
             <div 
               className="origin-center scale-[0.23] sm:scale-[0.25] md:scale-[0.35]"
             >
               {renderCard({
                 aspectRatio,
                 className: 'shadow-2xl shadow-black ring-1 ring-zinc-800'
               })}
             </div>
          </div>
        </div>

        {/* Controls Area */}
        <div className="w-full md:w-80 flex flex-col p-4 sm:p-6 text-zinc-100 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-400">Exportar</h3>
            <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full transition-colors" aria-label="Fechar modal">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3 block">Formato</label>
              <div className="flex flex-col gap-2">
                <FormatOption 
                  label="Stories (9:16)" 
                  desc="Instagram, WhatsApp, TikTok" 
                  active={aspectRatio === '9:16'} 
                  onClick={() => setAspectRatio('9:16')} 
                />
                <FormatOption 
                  label="Feed Portrait (1080x1440)" 
                  desc="Feed: Instagram, LinkedIn" 
                  active={aspectRatio === '3:4'} 
                  onClick={() => setAspectRatio('3:4')} 
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isSharing}
            className="mt-6 sm:mt-8 w-full py-3.5 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white font-mono font-bold tracking-wider uppercase transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSharing ? 'Processando...' : 'Salvar Imagem'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function FormatOption({ label, desc, active, onClick }: { label: string, desc: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
        active 
          ? 'border-crimson-500 bg-crimson-500/10' 
          : 'border-zinc-800 bg-zinc-900 hover:border-zinc-700'
      }`}
    >
      <div className={`font-mono text-sm font-bold ${active ? 'text-crimson-400' : 'text-zinc-300'}`}>{label}</div>
      <div className="text-xs text-zinc-500 font-mono mt-1">{desc}</div>
    </button>
  );
}

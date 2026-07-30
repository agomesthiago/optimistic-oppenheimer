import { useEffect } from 'react';

/**
 * VLibrasWidget — Componente de Acessibilidade em LIBRAS (Opção A - Governo Federal).
 * Injeta o widget oficial do VLibras (LVID/UFPB/MGI) para tradução automática em tempo real.
 */
export function VLibrasWidget() {
  useEffect(() => {
    if (document.getElementById('vlibras-script')) return;

    const loadVLibras = () => {
      if (document.getElementById('vlibras-script')) return;
      cleanup();
      const script = document.createElement('script');
      script.id = 'vlibras-script';
      script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
      script.async = true;
      script.onload = () => {
        // @ts-expect-error VLibras global init
        if (window.VLibras && window.VLibras.Widget) {
          // @ts-expect-error VLibras global init
          new window.VLibras.Widget('https://vlibras.gov.br/app');
        }
      };
      document.body.appendChild(script);
    };

    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    const cleanup = () => {
      events.forEach(ev => window.removeEventListener(ev, loadVLibras));
      clearTimeout(timer);
    };

    events.forEach(ev => window.addEventListener(ev, loadVLibras, { passive: true, once: true }));
    const timer = setTimeout(loadVLibras, 12000);

    return cleanup;
  }, []);

  return (
    <div {...{ vw: 'true' }} className="enabled z-[99999]">
      <div {...{ 'vw-access-button': 'true' }} className="active" />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}

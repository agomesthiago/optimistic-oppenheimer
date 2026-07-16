import { useState, useCallback } from 'react';

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareToStories = useCallback(async (elementId: string) => {
    const node = document.getElementById(elementId);
    if (!node) return;

    try {
      setIsSharing(true);
      
      // Dynamic import to reduce initial bundle size (html-to-image is only loaded when user shares)
      const { toPng } = await import('html-to-image');
      
      // Generate PNG
      const dataUrl = await toPng(node, {
        quality: 0.95,
        pixelRatio: 1, // Fixes scale issues on high DPI screens since node is fixed at 1080x1920
        style: { opacity: '1' }
      });

      // Convert to file
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], 'vidas-ceifadas.png', { type: blob.type });

      // Try Web Share API (Mobile native sharing)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Vidas Masculina',
          text: 'O peso da mortalidade masculina no Brasil.',
          files: [file],
        });
      } else {
        // Fallback for Desktop: direct download
        const link = document.createElement('a');
        link.download = 'vidas-ceifadas.png';
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('Failed to generate or share image', err);
      alert('Não foi possível gerar a imagem no momento. Tente novamente.');
    } finally {
      setIsSharing(false);
    }
  }, []);

  return { isSharing, shareToStories };
}

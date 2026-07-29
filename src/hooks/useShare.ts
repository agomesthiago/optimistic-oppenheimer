import { useState, useCallback } from 'react';

function dataUrlToBlob(dataUrl: string): Blob {
  const [meta, base64] = dataUrl.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] || 'image/png';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
  return new Blob([array], { type: mime });
}

export function useShare() {
  const [isSharing, setIsSharing] = useState(false);

  const shareToStories = useCallback(async (elementId: string, deaths?: number) => {
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
      const blob = dataUrlToBlob(dataUrl);
      const file = new File([blob], 'vidas-ceifadas.png', { type: blob.type });

      // Build dynamic share URL containing current death count for crawlable preview metadata
      const origin = window.location.origin;
      const shareUrl = deaths ? `${origin}/share/${Math.floor(deaths)}` : origin;

      // Try Web Share API (Mobile native sharing)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Vidas Masculinas',
          text: 'O peso da mortalidade masculina no Brasil.',
          url: shareUrl,
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

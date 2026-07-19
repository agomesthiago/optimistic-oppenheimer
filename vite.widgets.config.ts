import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        'embed': resolve(__dirname, 'src/widgets/embed.ts'),
        'web-component': resolve(__dirname, 'src/widgets/web-component.ts'),
      },
      formats: ['es'],
      name: 'VidasMasculinasWidgets',
    },
    outDir: 'dist/widgets',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name].[ext]',
      }
    }
  }
});

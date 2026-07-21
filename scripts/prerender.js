import { chromium } from 'playwright';
import { preview } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  console.log('Starting Vite preview server for prerendering...');
  const server = await preview({ preview: { port: 5000 } });
  
  console.log('Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:5000...');
  await page.goto('http://localhost:5000', { waitUntil: 'networkidle' });
  
  // Wait for React to mount and render content (we know it's ready when #root has children and reveal classes are applied)
  await page.waitForFunction(() => document.querySelector('#root')?.children.length > 0);
  // Give it a tiny bit of time for initial effects
  await page.waitForTimeout(500);

  // Extract HTML
  let html = await page.content();
  
  // Clean up scripts injected by vite preview if any
  html = html.replace(/<script[^>]*vite\/client[^>]*><\/script>/g, '');

  const indexPath = path.resolve(__dirname, '../dist/index.html');
  console.log(`Writing prerendered HTML to ${indexPath}...`);
  fs.writeFileSync(indexPath, html, 'utf-8');
  
  await browser.close();
  server.httpServer.close();
  console.log('Prerendering complete!');
}

prerender().catch((e) => {
  console.error('Prerendering failed:', e);
  process.exit(1);
});

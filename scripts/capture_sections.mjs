import { chromium } from 'playwright';
import path from 'path';

const OUTPUT_DIR = 'C:\\Users\\thiag\\.gemini\\antigravity\\brain\\9fba32d7-0376-4967-893b-46381e7f9e1d';
const SITE_URL = 'https://vidasmasculinas.vercel.app/';

// Seções do site com seus IDs e nomes para nomear os arquivos
const SECTIONS = [
  { id: 'hero',            file: 'sec_01_hero' },
  { id: 'estatisticas',   file: 'sec_02_stats' },
  { id: 'expectativa-vida', file: 'sec_03_expectativa' },
  { id: 'suicidios',      file: 'sec_04_suicidio' },
  { id: 'causas',         file: 'sec_05_causas' },
  { id: 'glossario',      file: 'sec_06_glossario' },
  { id: 'contexto',       file: 'sec_07_contexto' },
  { id: 'timeline',       file: 'sec_08_timeline' },
  { id: 'faq',            file: 'sec_09_faq' },
  { id: 'metodologia',    file: 'sec_10_metodologia' },
  { id: 'fontes',         file: 'sec_11_fontes' },
];

const browser = await chromium.launch({ headless: true });

// ── Desktop 1440px ──────────────────────────────────────────────────────────
const desktopCtx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const desktopPage = await desktopCtx.newPage();

console.log('Loading site (dark mode desktop)...');
await desktopPage.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await desktopPage.waitForTimeout(3000);

// Garante dark mode ligado (o site detecta prefers-color-scheme, mas também tem toggle)
// Verificamos se a classe .dark já está no html
const hasDark = await desktopPage.evaluate(() => document.documentElement.classList.contains('dark'));
if (!hasDark) {
  // Clica no toggle de tema (ThemeToggle)
  const toggleBtn = desktopPage.locator('button[aria-label="Alternar tema"]').first();
  if (await toggleBtn.count() > 0) await toggleBtn.click();
  await desktopPage.waitForTimeout(500);
}

// Hero acima do fold
await desktopPage.screenshot({
  path: path.join(OUTPUT_DIR, 'sec_01_hero.png'),
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('✓ Hero (desktop)');

// Cada seção pelo ID
for (const section of SECTIONS.slice(1)) { // pula hero (já capturado)
  const el = desktopPage.locator(`#${section.id}`).first();
  if (await el.count() === 0) {
    console.log(`  ⚠ #${section.id} não encontrado, pulando`);
    continue;
  }
  // Scroll suave até a seção
  await el.scrollIntoViewIfNeeded();
  await desktopPage.waitForTimeout(800);

  const box = await el.boundingBox();
  if (!box) { console.log(`  ⚠ boundingBox nula para #${section.id}`); continue; }

  await desktopPage.screenshot({
    path: path.join(OUTPUT_DIR, `${section.file}.png`),
    clip: {
      x: 0,
      y: Math.max(0, box.y),
      width: 1440,
      height: Math.min(box.height, 1400), // max 1400px por seção
    },
  });
  console.log(`✓ ${section.file}`);
}

// Full page desktop
await desktopPage.evaluate(() => window.scrollTo(0, 0));
await desktopPage.waitForTimeout(500);
await desktopPage.screenshot({
  path: path.join(OUTPUT_DIR, 'desktop_fullpage.png'),
  fullPage: true,
});
console.log('✓ Full page desktop');

// ── Mobile 390px ─────────────────────────────────────────────────────────────
const mobileCtx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
});
const mobilePage = await mobileCtx.newPage();

console.log('\nLoading site (mobile)...');
await mobilePage.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await mobilePage.waitForTimeout(3000);

// Hero mobile
await mobilePage.screenshot({
  path: path.join(OUTPUT_DIR, 'mobile_01_hero.png'),
  clip: { x: 0, y: 0, width: 390, height: 844 },
});
console.log('✓ Mobile hero');

// Seções mobile: stats, expectativa, suicidio, causas, faq
const mobileSections = [
  { id: 'estatisticas',   file: 'mobile_02_stats' },
  { id: 'expectativa-vida', file: 'mobile_03_expectativa' },
  { id: 'suicidios',      file: 'mobile_04_suicidio' },
  { id: 'causas',         file: 'mobile_05_causas' },
  { id: 'faq',            file: 'mobile_06_faq' },
];

for (const section of mobileSections) {
  const el = mobilePage.locator(`#${section.id}`).first();
  if (await el.count() === 0) { console.log(`  ⚠ mobile #${section.id} não encontrado`); continue; }
  await el.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(700);
  await mobilePage.screenshot({
    path: path.join(OUTPUT_DIR, `${section.file}.png`),
    clip: { x: 0, y: 0, width: 390, height: 844 },
  });
  console.log(`✓ ${section.file}`);
}

await browser.close();
console.log('\n🎉 ALL DONE');

import { chromium } from 'playwright';
import path from 'path';

const OUTPUT_DIR = 'C:\\Users\\thiag\\.gemini\\antigravity\\brain\\9fba32d7-0376-4967-893b-46381e7f9e1d';
const SITE_URL = 'https://vidasmasculinas.vercel.app/';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

console.log('Navigating to site...');
await page.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(4000);

// Desktop hero (above fold)
await page.screenshot({
  path: path.join(OUTPUT_DIR, 'screenshot_hero.png'),
  clip: { x: 0, y: 0, width: 1440, height: 900 },
});
console.log('Hero done');

// Full page desktop
await page.screenshot({
  path: path.join(OUTPUT_DIR, 'screenshot_desktop_full.png'),
  fullPage: true,
});
console.log('Full page done');

// Mobile viewport - hero
const mobilePage = await context.newPage();
await mobilePage.setViewportSize({ width: 390, height: 844 });
await mobilePage.goto(SITE_URL, { waitUntil: 'networkidle', timeout: 30000 });
await mobilePage.waitForTimeout(4000);

await mobilePage.screenshot({
  path: path.join(OUTPUT_DIR, 'screenshot_mobile_hero.png'),
  clip: { x: 0, y: 0, width: 390, height: 844 },
});
console.log('Mobile hero done');

await mobilePage.evaluate(() => window.scrollBy(0, 1800));
await mobilePage.waitForTimeout(1500);
await mobilePage.screenshot({
  path: path.join(OUTPUT_DIR, 'screenshot_mobile_mid.png'),
  clip: { x: 0, y: 0, width: 390, height: 844 },
});
console.log('Mobile mid done');

await mobilePage.evaluate(() => window.scrollBy(0, 2400));
await mobilePage.waitForTimeout(1500);
await mobilePage.screenshot({
  path: path.join(OUTPUT_DIR, 'screenshot_mobile_bottom.png'),
  clip: { x: 0, y: 0, width: 390, height: 844 },
});
console.log('Mobile bottom done');

await browser.close();
console.log('ALL DONE');

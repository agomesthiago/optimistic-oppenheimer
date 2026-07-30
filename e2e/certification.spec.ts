import { test, expect } from '@playwright/test';

test.describe('CERTIFICATION GATE INSTRUMENTED TEST SUITE', () => {

  test('GATE 4 & 5: Verificar presença obrigatória de tag <H1> única no DOM', async ({ page }) => {
    await page.goto('/');
    const h1Count = await page.locator('h1').count();
    console.log(`[INSTRUMENTED LOG] Total de tags <H1> encontradas no DOM: ${h1Count}`);
    expect(h1Count, 'A página deve possuir exatamente uma tag <H1> no DOM para semântica SEO/WCAG').toBe(1);
  });

  test('GATE 3: Testar Overflow Horizontal em Resolução 320px (Mobile SE / WCAG Reflow)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-mobile-320px', 'Executar apenas no profile móvel de 320px');
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verificar se existe transbordamento horizontal da página em 320px
    const metrics = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        counterText: document.querySelector('#main-counter-toggle')?.textContent || '',
      };
    });

    console.log('[INSTRUMENTED LOG] Viewport 320px Metrics:', JSON.stringify(metrics, null, 2));
    expect(
      metrics.scrollWidth <= metrics.clientWidth,
      `Overflow horizontal detectado em 320px: scrollWidth (${metrics.scrollWidth}px) > clientWidth (${metrics.clientWidth}px)`
    ).toBe(true);
  });

  test('GATE 6 & 9: Testar Blackout visual em ambiente sem JavaScript (Progressive Enhancement)', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-no-js', 'Executar apenas no profile sem JavaScript');
    await page.goto('/');

    // Sem JavaScript, verificar qual a opacidade computada das seções .reveal-on-scroll
    const statsSection = page.locator('#estatisticas');
    const computedOpacity = await statsSection.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    console.log(`[INSTRUMENTED LOG] Opacidade computada de #estatisticas SEM JavaScript: ${computedOpacity}`);
    expect(Number(computedOpacity), 'Seções .reveal-on-scroll não podem ficar com opacidade 0 em navegadores sem JavaScript').toBeGreaterThan(0);
  });

  test('GATE 2 & 9: Monkey Test — Spam de 10 Cliques Consecutivos no Botão Compartilhar', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium-no-js') {
      test.skip();
    }
    const errors: string[] = [];
    page.on('pageerror', (err) => {
      errors.push(err.message);
      console.error('[INSTRUMENTED LOG] Uncaught Page Error:', err.message);
    });

    await page.goto('/');
    const shareBtn = page.getByTestId('share-button').first();
    await shareBtn.waitFor({ state: 'visible' });

    console.log('[INSTRUMENTED LOG] Iniciando spam de 10 cliques em Compartilhar...');
    for (let i = 0; i < 10; i++) {
      await shareBtn.click({ force: true, noWaitAfter: true });
    }

    // Aguarda um ciclo curto para verificar se houve estouro de exceção
    await page.waitForTimeout(1000);
    console.log(`[INSTRUMENTED LOG] Total de exceções disparadas após 10 cliques: ${errors.length}`);
    expect(errors, `Erros não capturados na página durante click spam: ${errors.join(', ')}`).toEqual([]);
  });

  test('GATE 5: Verificar acessibilidade canônica de Sitemap e LLMS.txt nas meta tags', async ({ page }) => {
    await page.goto('/');
    // Verificar se há link para llms.txt no <head>
    const llmsLinkCount = await page.locator('head link[href*="llms.txt"]').count();
    console.log(`[INSTRUMENTED LOG] Total de tags <link> para llms.txt no head: ${llmsLinkCount}`);
    expect(llmsLinkCount, 'Manifesto llms.txt deve ser referenciado no <head> da página').toBeGreaterThan(0);
  });
});

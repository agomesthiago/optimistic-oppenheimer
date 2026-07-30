import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';
import fs from 'node:fs';
import path from 'node:path';

test.describe('Auditoria de Acessibilidade WCAG com @axe-core/playwright', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium-no-js') {
      test.skip();
    }
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Forçar todos os elementos animados com reveal-on-scroll a ficarem 100% visíveis
    // para evitar falsos positivos de contraste de cores no axe-core.
    await page.addStyleTag({
      content: '.reveal-on-scroll { opacity: 1 !important; transform: none !important; transition: none !important; }'
    });
  });

  test('1. Homepage sem violações WCAG automáticas (WCAG 2.0/2.1 A e AA)', async ({ page }, testInfo) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Cria diretório de relatório se não existir
    const reportDir = path.resolve('playwright-report');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Gera relatório HTML de acessibilidade
    const html = createHtmlReport({
      results,
      options: {
        projectKey: `vidas-masculinas-${testInfo.project.name}`,
        outputDir: 'playwright-report',
        reportFileName: `accessibility-${testInfo.project.name}.html`,
      },
    });
    fs.writeFileSync(path.join(reportDir, `accessibility-${testInfo.project.name}.html`), html);

    // Filtrar violações graves (excluindo falsos positivos de contraste se causados por gradiente em canvas/overlay)
    const criticalViolations = results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');

    expect(
      criticalViolations,
      `Encontradas ${criticalViolations.length} violações WCAG críticas/sérias na homepage: ${JSON.stringify(criticalViolations.map(v => ({ id: v.id, description: v.description, nodes: v.nodes.length })), null, 2)}`
    ).toEqual([]);
  });

  test('2. Auditoria acessível específica do Hero e Contador Principal', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .include('#hero')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      results.violations.filter(v => v.impact === 'critical' || v.impact === 'serious'),
      `Violações WCAG no Hero: ${JSON.stringify(results.violations.map(v => v.id))}`
    ).toEqual([]);
  });

  test('3. Auditoria acessível específica da seção de Metodologia e FAQ', async ({ page }) => {
    await page.goto('http://127.0.0.1:5173/#metodologia');
    const methodologyResults = await new AxeBuilder({ page })
      .include('#metodologia')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      methodologyResults.violations.filter(v => v.impact === 'critical' || v.impact === 'serious'),
      `Violações WCAG na Metodologia: ${JSON.stringify(methodologyResults.violations.map(v => v.id))}`
    ).toEqual([]);

    await page.goto('http://127.0.0.1:5173/#faq');
    const faqResults = await new AxeBuilder({ page })
      .include('#faq')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(
      faqResults.violations.filter(v => v.impact === 'critical' || v.impact === 'serious'),
      `Violações WCAG no FAQ: ${JSON.stringify(faqResults.violations.map(v => v.id))}`
    ).toEqual([]);
  });

  test('4. Auditoria acessível em fluxo Mobile em viewport emulada', async ({ page, isMobile: _isMobile }) => {
    // Roda verificação completa focando na acessibilidade em mobile/touch
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    const criticalViolations = results.violations.filter(v => v.impact === 'critical');
    expect(
      criticalViolations,
      `Violações críticas em mobile: ${JSON.stringify(criticalViolations.map(v => ({ id: v.id, help: v.help })))}`
    ).toEqual([]);
  });
});

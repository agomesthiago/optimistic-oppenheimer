import { test, expect } from '@playwright/test';

test.describe('Health-Check de SEO Técnico e Qualidade de Página', () => {
  test.beforeEach(async ({ page }, _testInfo) => {
    // Pular no-js se necessário, mas para tags estáticas do <head> no-js funciona perfeitamente!
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('1. Meta tags críticas: Título e Descrição', async ({ page }) => {
    // Título do site
    const title = page.locator('head > title');
    await expect(title).toBeAttached();
    const titleText = await page.title();
    expect(titleText).not.toBe('');
    expect(titleText.length).toBeGreaterThan(10);
    expect(titleText).toContain('Vidas Masculinas');

    // Meta descrição
    const description = page.locator('head > meta[name="description"]');
    await expect(description).toBeAttached();
    const content = await description.getAttribute('content');
    expect(content).not.toBeNull();
    expect(content!.length).toBeGreaterThan(30);
  });

  test('2. Link Canonical e Robots Meta Tag', async ({ page }) => {
    // Canonical URL
    const canonical = page.locator('head > link[rel="canonical"]');
    await expect(canonical).toBeAttached();
    const href = await canonical.getAttribute('href');
    expect(href).not.toBeNull();
    expect(href).toContain('vidasmasculinas.vercel.app');

    // Robots meta tag
    const robots = page.locator('head > meta[name="robots"]');
    if (await robots.count() > 0) {
      const content = await robots.getAttribute('content');
      expect(content).not.toContain('noindex');
      expect(content).not.toContain('nofollow');
    }
  });

  test('3. Open Graph e Twitter Cards', async ({ page }) => {
    // Open Graph
    const ogTitle = page.locator('head > meta[property="og:title"]');
    const ogDesc = page.locator('head > meta[property="og:description"]');
    const ogImage = page.locator('head > meta[property="og:image"]');

    await expect(ogTitle).toBeAttached();
    await expect(ogDesc).toBeAttached();
    await expect(ogImage).toBeAttached();

    expect(await ogTitle.getAttribute('content')).not.toBe('');
    expect(await ogDesc.getAttribute('content')).not.toBe('');
    expect(await ogImage.getAttribute('content')).not.toBe('');

    // Twitter Card
    const twitterCard = page.locator('head > meta[name="twitter:card"]');
    const twitterTitle = page.locator('head > meta[name="twitter:title"]');
    const twitterDesc = page.locator('head > meta[name="twitter:description"]');
    const twitterImage = page.locator('head > meta[name="twitter:image"]');

    await expect(twitterCard).toBeAttached();
    await expect(twitterTitle).toBeAttached();
    await expect(twitterDesc).toBeAttached();
    await expect(twitterImage).toBeAttached();
  });

  test('4. Estrutura de Headings (H1 único e ordem lógica)', async ({ page }, testInfo) => {
    // Sem JS, o React não monta e temos a versão estática de index.html
    if (testInfo.project.name === 'chromium-no-js') {
      test.skip();
    }

    const h1s = page.locator('h1');
    const count = await h1s.count();
    expect(count, 'Deve possuir exatamente um <h1> na página').toBe(1);

    // Valida se a ordem é lógica
    const headings = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      return els.map(el => parseInt(el.tagName[1]));
    });

    let currentLevel = 0;
    for (const level of headings) {
      if (currentLevel > 0) {
        expect(level - currentLevel, `Ordem de cabeçalho incorreta: h${currentLevel} seguido por h${level}`).toBeLessThanOrEqual(1);
      }
      currentLevel = level;
    }
  });

  test('5. Acessibilidade de Imagens e links descritivos', async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium-no-js') {
      test.skip();
    }

    const images = page.locator('img');
    const imgCount = await images.count();
    for (let i = 0; i < imgCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const isDecorative = await img.getAttribute('aria-hidden') === 'true';
      if (!isDecorative) {
        expect(alt, `Imagem #${i} de conteúdo sem atributo alt definido`).not.toBeNull();
        expect(alt, `Imagem #${i} de conteúdo com alt vazio`).not.toBe('');
      }
    }

    const links = page.locator('a');
    const linkCount = await links.count();
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const href = await link.getAttribute('href');
      
      // Evitar links genéricos como "clique aqui"
      if (text) {
        const cleanedText = text.trim().toLowerCase();
        expect(cleanedText, `Link para ${href} possui texto genérico não recomendado para SEO`).not.toContain('clique aqui');
        expect(cleanedText, `Link para ${href} possui texto genérico não recomendado para SEO`).not.toContain('saiba mais');
      }

      // Evitar href="#" vazio
      if (href) {
        expect(href, `Link de texto "${text}" está usando href="#" vazio sem tratamento`).not.toBe('#');
      }
    }
  });

  test('6. Ausência de termos lixo de desenvolvimento', async ({ page }) => {
    const textContent = await page.innerText('body');
    const forbiddenTerms = [
      /(?<![a-zA-ZÀ-ÿ])TODO(?![a-zA-ZÀ-ÿ])/,
      /(?<![a-zA-ZÀ-ÿ])lorem(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])ipsum(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])mock(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])debug(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])undefined(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])null(?![a-zA-ZÀ-ÿ])/i,
      /(?<![a-zA-ZÀ-ÿ])NaN(?![a-zA-ZÀ-ÿ])/
    ];

    for (const term of forbiddenTerms) {
      expect(textContent, `Página contém termo lixo: ${term.toString()}`).not.toMatch(term);
    }
  });
});

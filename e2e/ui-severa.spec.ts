import { test, expect } from '@playwright/test';

test.describe('Bateria Severa de Auditoria UI e Reconciliação Dinâmica', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    if (testInfo.project.name === 'chromium-no-js') {
      test.skip();
    }
    // Monitorar erros de console e exceções não tratadas
    page.on('pageerror', (err) => {
      throw new Error(`Erro de script na página: ${err.message}`);
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('1. UI Correta: carregamento, título, ausência de crash e tela em branco', async ({ page }) => {
    // Verifica título correto
    await expect(page).toHaveTitle(/Vidas Masculinas/i);

    // Verifica que o main está visível e não é tela em branco
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Verifica que o Hero e contador estão renderizados
    const heroSection = page.getByTestId('hero-section');
    await expect(heroSection).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('2. Ausência de resíduos legados e lixo textual em seções centrais', async ({ page }) => {
    // Lista de termos e valores legados que são estritamente proibidos em seções centrais
    const forbiddenPatterns = [
      'projeção matemática',
      'estimativa em tempo real',
      '~781',
      '~757',
      '~2.137',
      '~210.181',
      '31.557.600',
      '77,8%',
      '3,5:1',
      '≈'
    ];

    // Seções centrais que não podem conter resíduos
    const coreSectionIds = [
      'hero-section',
      'stats-section',
      'suicide-section',
      'causes-section',
      'methodology-section',
      'faq-section'
    ];

    for (const testId of coreSectionIds) {
      const section = page.getByTestId(testId);
      if (await section.count() > 0) {
        const textContent = await section.textContent();
        expect(textContent, `Seção ${testId} não deve ser nula`).not.toBeNull();
        
        for (const forbidden of forbiddenPatterns) {
          expect(
            textContent?.toLowerCase(),
            `Resíduo legado '${forbidden}' encontrado na seção ${testId}`
          ).not.toContain(forbidden.toLowerCase());
        }

        // Verifica que não há tilde '~' solto indicando aproximação/estimativa em números
        expect(
          textContent,
          `Caractere '~' indevido encontrado na seção ${testId}`
        ).not.toContain('~');
      }
    }
  });

  test('3. Correspondência entre números exibidos e base dinâmica reconciliada', async ({ page }) => {
    // 3.1 Contador principal do Hero deve exibir valor numérico dinâmico sem NaN, null ou undefined
    const heroSection = page.getByTestId('hero-section');
    const heroText = await heroSection.textContent();
    expect(heroText).not.toContain('NaN');
    expect(heroText).not.toContain('undefined');
    expect(heroText).not.toContain('null');

    // 3.2 Seção Estatísticas Gerais deve renderizar cards numéricos consistentes
    const statsSection = page.getByTestId('stats-section');
    await expect(statsSection).toBeVisible();
    const statsText = await statsSection.textContent();
    expect(statsText).not.toContain('NaN');
    expect(statsText).not.toContain('undefined');
    // Deve exibir ano 2024 (ano dos microdados oficiais consolidados SIM/PCDaS)
    expect(statsText).toContain('2024');

    // 3.3 Seção Suicídios deve renderizar métricas dinâmicas reprocessadas
    const suicideSection = page.getByTestId('suicide-section');
    await expect(suicideSection).toBeVisible();
    const suicideText = await suicideSection.textContent();
    expect(suicideText).not.toContain('NaN');
    expect(suicideText).not.toContain('undefined');
    expect(suicideText).toContain('2024');

    // 3.4 Seção Metodologia deve exibir o número de segundos civil correto do ano corrente (31.536.000 para ano comum)
    const methodologySection = page.getByTestId('methodology-section');
    await expect(methodologySection).toBeVisible();
    const methodologyText = await methodologySection.textContent();
    expect(methodologyText, 'Deve conter segundos civis do ano comum (31.536.000)').toContain('31.536.000');
    expect(methodologyText, 'Não deve conter segundos astronômicos legados (31.557.600)').not.toContain('31.557.600');
  });

  test('4. Experiência Mobile como prioridade: layout sem quebras nem overflow horizontal', async ({ page, isMobile }) => {
    // 4.1 Verificar ausência de overflow horizontal no viewport
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalOverflow, 'Página não deve apresentar scroll horizontal em mobile').toBe(false);

    // 4.2 Verificar que os headings principais estão visíveis e legíveis
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    // 4.3 Verificar que o CauseTicker/carrossel funciona sem estourar layout
    const causesSection = page.getByTestId('causes-section');
    await expect(causesSection).toBeVisible();
    const tickerOverflow = await causesSection.evaluate((el) => {
      return el.scrollWidth > el.clientWidth + 5; // pequena margem de tolerância
    });
    expect(tickerOverflow, 'Carrossel/Ticker de causas não deve estourar a largura do contêiner').toBe(false);

    // 4.4 Verificar que botões interativos têm área de clique adequada em mobile
    if (isMobile) {
      const buttons = page.locator('button:visible');
      const count = await buttons.count();
      for (let i = 0; i < Math.min(count, 10); i++) {
        const box = await buttons.nth(i).boundingBox();
        if (box) {
          expect(box.width >= 24 && box.height >= 24, `Botão #${i} muito pequeno para toque mobile`).toBe(true);
        }
      }
    }
  });

  test('5. Regressões estruturais e validação das seções', async ({ page }) => {
    // 5.1 Verificar visibilidade das seções fundamentais
    await expect(page.getByTestId('hero-section')).toBeVisible();
    await expect(page.getByTestId('stats-section')).toBeVisible();
    await expect(page.getByTestId('suicide-section')).toBeVisible();
    await expect(page.getByTestId('causes-section')).toBeVisible();
    await expect(page.getByTestId('methodology-section')).toBeVisible();
    await expect(page.getByTestId('faq-section')).toBeVisible();

    // 5.2 Verificar que FAQ é expansível e interativo
    const faqSection = page.getByTestId('faq-section');
    const firstQuestion = faqSection.locator('button').first();
    await expect(firstQuestion).toBeVisible();
    await firstQuestion.click();
    // Confirma que não houve quebra de layout após clique
    await expect(faqSection).toBeVisible();
  });
});

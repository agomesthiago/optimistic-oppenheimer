const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:5174';

(async () => {
  console.log('🚀 Iniciando simulação visual...');
  // Using chromium.launch directly
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext({
    viewport: { width: 414, height: 896 } // iPhone XR/11 size
  });
  
  const page = await context.newPage();
  
  try {
    await page.goto(TARGET_URL);
    
    console.log('👀 Observando a página (Aguardando 16s para verificar a troca automática de contador do GSAP)...');
    await page.waitForTimeout(16000);
    
    console.log('👆 Clicando no contador central para forçar a troca manual...');
    await page.click('#main-counter-toggle'); // This is the main counter area
    
    await page.waitForTimeout(3000);

    console.log('📸 Testando botão de Compartilhar (que deverá disparar o download no Desktop)...');
    
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 15000 }),
      page.click('button:has-text("Compartilhar")')
    ]);
    
    const path = await download.path();
    console.log(`✅ SUCESSO! A lógica funcionou perfeitamente. O arquivo de imagem foi salvo temporariamente em: ${path}`);
    
    await page.waitForTimeout(4000); // Wait a bit so user can see it finish
  } catch (err) {
    console.error('❌ Ocorreu um erro durante a simulação:', err);
  } finally {
    console.log('🎉 Simulação concluída. Fechando navegador...');
    await browser.close();
  }
})();

import { spawn, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const outDir = path.join(rootDir, 'docs', 'test-results');
fs.mkdirSync(outDir, { recursive: true });

console.log('[Lighthouse CI] Iniciando servidor de preview na porta 5173...');
const previewProcess = spawn('npx', ['--no-install', 'vite', 'preview', '--port', '5173', '--strictPort'], {
  cwd: rootDir,
  stdio: 'pipe',
  shell: true,
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runCI() {
  try {
    await wait(3000); // Aguarda subida do preview
    console.log('[Lighthouse CI] Servidor ativo. Executando Lighthouse em mobile mode...');

    const profileDir = path.join(rootDir, 'node_modules', '.cache', 'chrome-profile').replace(/\\/g, '/');
    const reportPathWithoutExt = path.join(outDir, 'lighthouse-ci-report');
    const cmd = `npx -y lighthouse http://127.0.0.1:5173/ --output=json --output=html --output-path="${reportPathWithoutExt}" --chrome-flags="--headless=new --no-sandbox --disable-gpu --user-data-dir=${profileDir}"`;

    try {
      execSync(cmd, { cwd: rootDir, stdio: 'inherit' });
    } catch (err) {
      const jsonPathCheck = `${reportPathWithoutExt}.report.json`;
      if (!fs.existsSync(jsonPathCheck)) {
        throw err;
      }
      console.log('[Lighthouse CI] Relatório gerado com sucesso (ignorando erro de permissão temporária do Windows na finalização do Chrome).');
    }

    const jsonPath = `${reportPathWithoutExt}.report.json`;
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Relatório JSON não encontrado em: ${jsonPath}`);
    }

    const reportData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const categories = reportData.categories;

    const perfScore = Math.round((categories.performance?.score || 0) * 100);
    const a11yScore = Math.round((categories.accessibility?.score || 0) * 100);
    const bpScore = Math.round((categories['best-practices']?.score || 0) * 100);
    const seoScore = Math.round((categories.seo?.score || 0) * 100);

    console.log('\n======================================================');
    console.log('            RESULTADOS — LIGHTHOUSE CI');
    console.log('======================================================');
    console.log(`Performance:    ${perfScore} (Meta: >= 95)`);
    console.log(`Accessibility:  ${a11yScore} (Meta: 100)`);
    console.log(`Best Practices: ${bpScore} (Meta: 100)`);
    console.log(`SEO:            ${seoScore} (Meta: 100)`);
    console.log('======================================================\n');

    let failed = false;
    if (perfScore < 95) {
      console.error(`[FALHA] Performance (${perfScore}) está abaixo da meta (95).`);
      failed = true;
    }
    if (a11yScore < 100) {
      console.error(`[FALHA] Accessibility (${a11yScore}) está abaixo da meta (100).`);
      failed = true;
    }
    if (bpScore < 100) {
      console.error(`[FALHA] Best Practices (${bpScore}) está abaixo da meta (100).`);
      failed = true;
    }
    if (seoScore < 100) {
      console.error(`[FALHA] SEO (${seoScore}) está abaixo da meta (100).`);
      failed = true;
    }

    if (failed) {
      console.error('\n[Lighthouse CI] Reprovado nos critérios de Go-Live.');
      process.exitCode = 1;
    } else {
      console.log('[Lighthouse CI] APROVADO! Todas as metas de Go-Live foram atingidas com sucesso.');
    }
  } catch (error) {
    console.error('[Lighthouse CI] Erro na execução:', error.message);
    process.exitCode = 1;
  } finally {
    if (!previewProcess.killed) {
      previewProcess.kill('SIGTERM');
    }
  }
}

runCI();

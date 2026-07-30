import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.resolve(__dirname, '../public/data/mortality-stats.json');
const tsPath = path.resolve(__dirname, '../src/utils/mortality.ts');

console.log('--- Iniciando Auditoria de Consistência Matemática ---');

// 1. Carregar e parsear o JSON
const jsonRaw = fs.readFileSync(jsonPath, 'utf8');
const stats = JSON.parse(jsonRaw);

// 2. Carregar o arquivo TypeScript
const tsRaw = fs.readFileSync(tsPath, 'utf8');

// 3. Validação do JSON
let errors = [];

// Checagem de proporções
const totalProportions = stats.causes.reduce((sum, c) => sum + c.proportion, 0);
console.log(`- Soma das proporções das causas: ${totalProportions.toFixed(4)} (Restante: ${(1 - totalProportions).toFixed(4)} para outras causas)`);
if (totalProportions > 1.0) {
  errors.push(`Erro: A soma das proporções das causas (${totalProportions}) excede 1.0`);
}

// Checagem de estimativas anuais
for (const cause of stats.causes) {
  const calculatedEstimate = Math.round(stats.total_male_deaths_per_year * cause.proportion);
  if (cause.annual_estimate !== calculatedEstimate) {
    errors.push(`Erro na causa "${cause.id}": annual_estimate é ${cause.annual_estimate}, mas deveria ser ${calculatedEstimate} com base em total_male_deaths_per_year (${stats.total_male_deaths_per_year}) * proportion (${cause.proportion})`);
  }
}

// Checagem de taxas gerais por segundo
const calculatedDeathsPerSecond = stats.total_male_deaths_per_year / stats.seconds_per_year;
if (Math.abs(stats.deaths_per_second - calculatedDeathsPerSecond) > 1e-9) {
  errors.push(`Erro: deaths_per_second no JSON (${stats.deaths_per_second}) difere do calculado (${calculatedDeathsPerSecond})`);
}

const calculatedSecondsPerDeath = 1 / stats.deaths_per_second;
if (Math.abs(stats.seconds_per_death - calculatedSecondsPerDeath) > 1e-6) {
  errors.push(`Erro: seconds_per_death no JSON (${stats.seconds_per_death}) difere do calculado (${calculatedSecondsPerDeath})`);
}

const calculatedDeathsPerDay = Math.round(stats.deaths_per_second * 86400);
if (stats.deaths_per_day !== calculatedDeathsPerDay) {
  errors.push(`Erro: deaths_per_day no JSON (${stats.deaths_per_day}) difere do calculado (${calculatedDeathsPerDay})`);
}

// Checagem de suicídios
const calculatedSuicideDeathsPerSecond = stats.suicide_deaths_per_year / stats.seconds_per_year;
if (Math.abs(stats.suicide_deaths_per_second - calculatedSuicideDeathsPerSecond) > 1e-9) {
  errors.push(`Erro: suicide_deaths_per_second no JSON (${stats.suicide_deaths_per_second}) difere do calculado (${calculatedSuicideDeathsPerSecond})`);
}

const calculatedSuicideSecondsPerDeath = 1 / stats.suicide_deaths_per_second;
if (Math.abs(stats.suicide_seconds_per_death - calculatedSuicideSecondsPerDeath) > 1e-6) {
  errors.push(`Erro: suicide_seconds_per_death no JSON (${stats.suicide_seconds_per_death}) difere do calculado (${calculatedSuicideSecondsPerDeath})`);
}

const calculatedSuicideDeathsPerDay = Math.round(stats.suicide_deaths_per_second * 86400);
if (stats.suicide_deaths_per_day !== calculatedSuicideDeathsPerDay) {
  errors.push(`Erro: suicide_deaths_per_day no JSON (${stats.suicide_deaths_per_day}) difere do calculado (${calculatedSuicideDeathsPerDay})`);
}

// 4. Comparação JSON vs TypeScript (Regex)
function verifyTSConstant(name, expectedValue) {
  const regex = new RegExp(`export\\s+const\\s+${name}\\s*=\\s*([^;\\n]+)`);
  const match = tsRaw.match(regex);
  if (!match) {
    errors.push(`Aviso: Constante "${name}" não encontrada no arquivo TypeScript.`);
    return;
  }
  const valExpr = match[1].trim();
  console.log(`  Verificando expressão de "${name}" no TS: ${valExpr}`);
  if (!isNaN(valExpr.replace(/_/g, ''))) {
    const num = Number(valExpr.replace(/_/g, ''));
    if (num !== expectedValue) {
      errors.push(`Erro: Constante "${name}" no TS tem valor numérico ${num}, mas no JSON é ${expectedValue}`);
    }
  }
}

console.log('- Comparando constantes estáticas com TypeScript:');
verifyTSConstant('SECONDS_PER_YEAR', stats.seconds_per_year);

// 4b. Validação de dessincronização da metodologia
const methodologyPath = path.resolve(__dirname, '../src/components/MethodologySection.tsx');
if (fs.existsSync(methodologyPath)) {
  const methodologyRaw = fs.readFileSync(methodologyPath, 'utf8');
  if (methodologyRaw.includes('31.557.600')) {
    errors.push('Erro: MethodologySection.tsx ainda contém a string hardcoded "31.557.600"');
  }
}

// 5. Conclusão
if (errors.length > 0) {
  console.error('\n🔴 Erros de consistência encontrados:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
} else {
  console.log('\n🟢 Validação concluída com sucesso! Todos os números são consistentes.');
  process.exit(0);
}

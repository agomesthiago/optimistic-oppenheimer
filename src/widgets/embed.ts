import {
  DEATHS_PER_SECOND,
  getCounterStartDate,
  formatDeathCount,
} from '../utils/mortality';
import { WIDGET_STYLES, getWidgetHtml } from './shared';

function initWidget() {
  const container = document.getElementById('vidas-masculinas-widget');
  if (!container) return;

  const showBorder = container.getAttribute('data-border') !== 'false';

  // Criar elemento de estilos isolados básicos apenas para layout e responsividade, herdando cores/fontes
  const styleEl = document.createElement('style');
  styleEl.innerHTML = WIDGET_STYLES;
  document.head.appendChild(styleEl);

  // Criar estrutura interna
  container.innerHTML = getWidgetHtml(showBorder, false);

  const counterValEl = document.getElementById('vm-counter-val');
  if (!counterValEl) return;

  const startTimestamp = getCounterStartDate().getTime();

  function updateCounter() {
    const elapsedSeconds = (Date.now() - startTimestamp) / 1000;
    const currentCount = elapsedSeconds * DEATHS_PER_SECOND;
    counterValEl!.innerText = formatDeathCount(currentCount);
  }

  // Atualização frequente para animação fluida (tabular-nums garante que não chacoalhe)
  updateCounter();
  setInterval(updateCounter, 1000);
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWidget);
} else {
  initWidget();
}

import {
  DEATHS_PER_SECOND,
  getCounterStartDate,
  formatDeathCount,
  getRateDescription
} from '../utils/mortality';

function initWidget() {
  const container = document.getElementById('vidas-masculinas-widget');
  if (!container) return;

  const showBorder = container.getAttribute('data-border') !== 'false';

  // Criar elemento de estilos isolados básicos apenas para layout e responsividade, herdando cores/fontes
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    .vm-widget-box {
      font-family: system-ui, -apple-system, sans-serif;
      padding: 1.5rem;
      border-radius: 0.75rem;
      text-align: center;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      max-width: 480px;
    }
    .vm-widget-border {
      border: 1px solid currentColor;
      opacity: 0.85;
    }
    .vm-widget-title {
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 1rem;
      opacity: 0.7;
      font-weight: 600;
    }
    .vm-widget-counter {
      font-size: 3rem;
      font-weight: 800;
      line-height: 1;
      margin-bottom: 0.75rem;
      font-variant-numeric: tabular-nums;
    }
    .vm-widget-subtext {
      font-size: 0.875rem;
      margin-bottom: 1.25rem;
      opacity: 0.7;
    }
    .vm-widget-link {
      font-size: 0.75rem;
      text-decoration: underline;
      opacity: 0.6;
      font-weight: 500;
      color: inherit;
    }
    .vm-widget-link:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(styleEl);

  // Criar o wrapper do widget
  const widgetBox = document.createElement('div');
  widgetBox.className = `vm-widget-box ${showBorder ? 'vm-widget-border' : ''}`;

  // Criar estrutura interna
  widgetBox.innerHTML = `
    <div class="vm-widget-title">Vidas Masculinas Perdidas este ano</div>
    <div class="vm-widget-counter" id="vm-counter-val">0</div>
    <div class="vm-widget-subtext">Taxa estimada: ${getRateDescription()}</div>
    <a href="https://vidasmasculinas.vercel.app" target="_blank" rel="noopener noreferrer" class="vm-widget-link">
      Acesse o painel completo →
    </a>
  `;

  container.appendChild(widgetBox);

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

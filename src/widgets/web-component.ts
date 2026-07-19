import {
  DEATHS_PER_SECOND,
  getCounterStartDate,
  formatDeathCount,
  getRateDescription
} from '../utils/mortality';

class VidasMasculinasCounter extends HTMLElement {
  private timerId: number | null = null;

  connectedCallback() {
    const showBorder = this.getAttribute('border') !== 'false';
    
    // Configura o estilo básico herdando as cores/fontes do elemento pai
    this.style.display = 'inline-block';
    this.style.width = '100%';
    this.style.maxWidth = '480px';
    this.style.boxSizing = 'border-box';

    // Cria a estrutura interna
    this.innerHTML = `
      <style>
        .vm-wc-box {
          font-family: inherit;
          padding: 1.5rem;
          border-radius: 0.75rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          width: 100%;
        }
        .vm-wc-border {
          border: 1px solid currentColor;
          opacity: 0.85;
        }
        .vm-wc-title {
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 1rem;
          opacity: 0.7;
          font-weight: 600;
        }
        .vm-wc-counter {
          font-size: 3rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.75rem;
          font-variant-numeric: tabular-nums;
        }
        .vm-wc-subtext {
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
          opacity: 0.7;
        }
        .vm-wc-link {
          font-size: 0.75rem;
          text-decoration: underline;
          opacity: 0.6;
          font-weight: 500;
          color: inherit;
        }
        .vm-wc-link:hover {
          opacity: 1;
        }
      </style>
      <div class="vm-wc-box ${showBorder ? 'vm-wc-border' : ''}">
        <div class="vm-wc-title">Vidas Masculinas Perdidas este ano</div>
        <div class="vm-wc-counter" id="vm-wc-val">0</div>
        <div class="vm-wc-subtext">Taxa estimada: ${getRateDescription()}</div>
        <a href="https://vidasmasculinas.com.br" target="_blank" rel="noopener noreferrer" class="vm-wc-link">
          Acesse o painel completo →
        </a>
      </div>
    `;

    const counterValEl = this.querySelector('#vm-wc-val') as HTMLDivElement | null;
    const startTimestamp = getCounterStartDate().getTime();

    const updateCounter = () => {
      const elapsedSeconds = (Date.now() - startTimestamp) / 1000;
      const currentCount = elapsedSeconds * DEATHS_PER_SECOND;
      if (counterValEl) {
        counterValEl.innerText = formatDeathCount(currentCount);
      }
    };

    updateCounter();
    this.timerId = window.setInterval(updateCounter, 1000);
  }

  disconnectedCallback() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }
}

// Registrar o custom element
if (!customElements.get('vidas-masculinas-counter')) {
  customElements.define('vidas-masculinas-counter', VidasMasculinasCounter);
}

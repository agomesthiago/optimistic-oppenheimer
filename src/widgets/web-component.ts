import {
  DEATHS_PER_SECOND,
  getCounterStartDate,
  formatDeathCount,
} from '../utils/mortality';
import { getWidgetHtml } from './shared';

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
    this.innerHTML = getWidgetHtml(showBorder, true);

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

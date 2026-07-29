import { getRateDescription } from '../utils/mortality';

export const WIDGET_STYLES = `
  .vm-box {
    font-family: inherit;
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
  .vm-border {
    border: 1px solid currentColor;
    opacity: 0.85;
  }
  .vm-title {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 1rem;
    opacity: 0.7;
    font-weight: 600;
  }
  .vm-counter {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 0.75rem;
    font-variant-numeric: tabular-nums;
  }
  .vm-subtext {
    font-size: 0.875rem;
    margin-bottom: 1.25rem;
    opacity: 0.7;
  }
  .vm-link {
    font-size: 0.75rem;
    text-decoration: underline;
    opacity: 0.6;
    font-weight: 500;
    color: inherit;
  }
  .vm-link:hover {
    opacity: 1;
  }
`;

export function getWidgetHtml(showBorder: boolean, isWebComponent: boolean) {
  return `
    ${isWebComponent ? `<style>${WIDGET_STYLES}</style>` : ''}
    <div class="vm-box ${showBorder ? 'vm-border' : ''}">
      <div class="vm-title">Vidas Masculinas Perdidas este ano</div>
      <div class="vm-counter" id="${isWebComponent ? 'vm-wc-val' : 'vm-counter-val'}">0</div>
      <div class="vm-subtext">Taxa estimada: ${getRateDescription()}</div>
      <a href="https://vidasmasculinas.vercel.app" target="_blank" rel="noopener noreferrer" class="vm-link">
        Acesse o painel completo →
      </a>
    </div>
  `;
}

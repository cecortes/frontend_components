"use strict";

export class ProduccionTotalesView {
  constructor() {}

  /**
   * @method renderTotales
   * @description Genera el HTML string para la tarjeta de totales.
   */
  renderTotales(data) {
    const totalNGRStr = data.totalNGR.toLocaleString();
    const totalBLNCStr = data.totalBLNC.toLocaleString();

    return `
      <div class="card" id="produccion-totales-component">
        <h3 style="border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
          Totales Acumulados
        </h3>
        <div class="totals-section">
          <div class="total-card">
            <div class="total-number ngr" id="totalNGR">${totalNGRStr}</div>
            <div class="total-label">Botella NGR</div>
          </div>

          <div class="total-card">
            <div class="total-number blnc" id="totalBLNC">${totalBLNCStr}</div>
            <div class="total-label">Botella BLNC</div>
          </div>
        </div>
      </div>
    `;
  }
}

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
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
          <h3 style="margin: 0;">
            Totales Acumulados
          </h3>
          <select id="rangoTiempo" style="padding: 0.5rem; border-radius: 4px; border: 1px solid var(--color-border-subtle); background-color: var(--color-surface); color: var(--color-text);">
            <option value="semanal" selected>Semanal</option>
            <option value="mensual">Mensual</option>
            <option value="anual">Anual</option>
          </select>
        </div>
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

  /**
   * @method bindRangoChange
   * @description Agrega el event listener al selector para cambio de rango de tiempo.
   */
  bindRangoChange(handler, root) {
    const rangoSelect = root.querySelector("#rangoTiempo");
    if (rangoSelect) {
      rangoSelect.addEventListener("change", (e) => {
        handler(e.target.value);
      });
    }
  }
}

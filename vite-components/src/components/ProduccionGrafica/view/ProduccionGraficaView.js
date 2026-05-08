"use strict";

export class ProduccionGraficaView {
  constructor() {}

  /**
   * @method getTemplate
   * @description Retorna el HTML base del componente de gráfica.
   */
  getTemplate() {
    return `
      <div class="card" style="margin-bottom: 2rem" id="produccion-grafica-component">
        <div class="chart-header">
          <h3>Producción Diaria</h3>
          <div class="chart-controls">
            <select id="productFilter">
              <option value="todos">Todos los Productos</option>
              <option value="ngr">Botella NGR</option>
              <option value="blnc">Botella BLNC</option>
            </select>
          </div>
        </div>

        <div class="chart-container" id="chartContainer">
          <div class="chart-grid">
            <div class="chart-grid-line"></div>
            <div class="chart-grid-line"></div>
            <div class="chart-grid-line"></div>
            <div class="chart-grid-line"></div>
            <div class="chart-grid-line"></div>
          </div>
          <!-- Los días se inyectarán dinámicamente aquí -->
        </div>
      </div>
    `;
  }

  /**
   * @method bindFilterChange
   * @description Agrega el event listener al selector para cambio de filtro.
   */
  bindFilterChange(handler, root) {
    const filter = root.querySelector("#productFilter");
    if (filter) {
      filter.addEventListener("change", (e) => {
        handler(e.target.value);
      });
    }
  }

  /**
   * @method renderChart
   * @description Pinta las barras de la gráfica según los datos y el filtro seleccionado.
   */
  renderChart(weeklyData, maxProduction, filterType, root) {
    const chartContainer = root.querySelector("#chartContainer");
    if (!chartContainer) return;

    // Limpiar gráfica manteniendo las líneas de fondo (chart-grid)
    const gridLines = chartContainer.querySelector(".chart-grid");
    chartContainer.innerHTML = "";
    if (gridLines) {
      chartContainer.appendChild(gridLines);
    }

    weeklyData.forEach((data) => {
      const dayWrapper = document.createElement("div");
      dayWrapper.className = "chart-day";

      const barsWrapper = document.createElement("div");
      barsWrapper.className = "bars-wrapper";

      const ngrHeight = (data.ngr / maxProduction) * 100;
      const blncHeight = (data.blnc / maxProduction) * 100;

      // Render Bar NGR
      if (filterType === "todos" || filterType === "ngr") {
        const barNgr = document.createElement("div");
        barNgr.className = "bar bar-ngr";
        barNgr.style.height = `${ngrHeight}%`;
        barNgr.setAttribute("data-value", data.ngr.toLocaleString());
        barsWrapper.appendChild(barNgr);
      }

      // Render Bar BLNC
      if (filterType === "todos" || filterType === "blnc") {
        const barBlnc = document.createElement("div");
        barBlnc.className = "bar bar-blnc";
        barBlnc.style.height = `${blncHeight}%`;
        barBlnc.setAttribute("data-value", data.blnc.toLocaleString());
        barsWrapper.appendChild(barBlnc);
      }

      const dayLabel = document.createElement("div");
      dayLabel.className = "day-label";
      dayLabel.textContent = data.day;

      dayWrapper.appendChild(barsWrapper);
      dayWrapper.appendChild(dayLabel);

      chartContainer.appendChild(dayWrapper);
    });
  }
}

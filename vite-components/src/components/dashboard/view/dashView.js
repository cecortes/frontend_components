"use strict";

export class DashboardView {
  constructor(icons = null) {
    this.icons = icons;
    this.element = null; // Almacena el elemento DOM principal
  }

  // Element Cache
  get $logoutBtn() {
    return this.element.querySelector("header .btn-secondary");
  }

  get $exportBtn() {
    return this.element.querySelector("header .btn-primary");
  }

  get $searchClient() {
    return this.element.querySelectorAll(".search-box input")[0];
  }

  get $searchProduct() {
    return this.element.querySelectorAll(".search-box input")[1];
  }

  get $searchOrder() {
    return this.element.querySelectorAll(".search-box input")[2];
  }

  /**
   * @method renderDashboard
   * @description
   * Genera el DOM principal para la vista del dashboard y lo almacena en la instancia.
   *
   * @returns {HTMLElement} El elemento DOM padre creado a partir del template del Dashboard.
   */
  renderDashboard(
    sidebarHTML = "",
    burgerHTML = "",
    tablaClientesHTML = "",
  ) {
    const html = `
      <div class="dashboard-wrapper" style="display: flex; min-height: 100vh; width: 100%; overflow-x: hidden;">
        ${this.getTemplate(sidebarHTML, burgerHTML, tablaClientesHTML)}
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    this.element = doc.body.firstElementChild;
    return this.element;
  }

  /**
   * @method getTemplate
   * @description
   * Retorna la plantilla estructurada de componentes del panel como un string HTML.
   *
   * @returns {string} Código HTML representativo del layout base del dashboard.
   */
  getTemplate(
    sidebarHTML = "",
    burgerHTML = "",
    tablaClientesHTML = "",
  ) {
    return `
    ${sidebarHTML}

    <!-- Contenido Principal -->
    <main class="main-container">
      <!-- Barra Superior -->
      <header class="top-bar">
        ${burgerHTML}

        <h2 style="font-size: 1.25rem; margin: 0">Resumen del Sistema</h2>

        <div style="display: flex; gap: 1rem">
          <button class="btn btn-secondary" style="padding: 0.5rem 1rem">
            ${this.icons.bell}
          </button>
          <button class="btn btn-primary" style="padding: 0.5rem 1rem">
            Exportar
          </button>
        </div>
      </header>

      <!-- Área de Contenido -->
      <div class="dashboard-content">
        <!-- SECCIÓN DE GRÁFICAS -->
        <section>
          <div class="section-header">
            <h3>Panel de Indicadores</h3>
            <p>Visualización en tiempo real del estado de almacén y pedidos.</p>
          </div>

          <div class="charts-grid">
            <div class="chart-card">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: start;
                "
              >
                <h4>Niveles de Inventario</h4>
                <span class="badge badge-normal">Actualizado</span>
              </div>
              <img
                src="/assets/inventory_chart.png"
                alt="Niveles de Inventario"
                class="chart-img"
              />
            </div>
            <div class="chart-card">
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: start;
                "
              >
                <h4>Movimiento de O.C.</h4>
                <span class="badge badge-low">Crítico 12</span>
              </div>
              <img
                src="/assets/sales_chart.png"
                alt="Movimientos de Ventas"
                class="chart-img"
              />
            </div>
          </div>
        </section>

        <!-- SECCIÓN DE TABLAS -->
        <section class="tables-section">
          <!-- Tabla de Productos -->
          <div class="table-container card">
            <div class="table-header">
              <h4>Inventario de Productos</h4>
              <div class="input-group search-box" style="margin-bottom: 0">
                <div class="input-wrapper">
                  <div class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="Buscar producto..."
                  />
                </div>
              </div>
            </div>

            <div class="data-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Nombre del Producto</th>
                    <th>Stock</th>
                    <th>Categoría</th>
                    <th>Estado Stock</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PRD-001</td>
                    <td>Microprocesador X1</td>
                    <td>45</td>
                    <td>Electrónica</td>
                    <td><span class="badge badge-low">Bajo Stock</span></td>
                  </tr>
                  <tr>
                    <td>PRD-045</td>
                    <td>Memoria RAM 16GB</td>
                    <td>120</td>
                    <td>Hardware</td>
                    <td><span class="badge badge-normal">Normal</span></td>
                  </tr>
                  <tr>
                    <td>PRD-102</td>
                    <td>Disco Duro SSD 1TB</td>
                    <td>12</td>
                    <td>Hardware</td>
                    <td><span class="badge badge-critical">Crítico</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Tabla de O.C. -->
          <div class="table-container card">
            <div class="table-header">
              <h4>Órdenes de Compra Recientes</h4>
              <div class="input-group search-box" style="margin-bottom: 0">
                <div class="input-wrapper">
                  <div class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="Buscar O.C. ..."
                  />
                </div>
              </div>
            </div>

            <div class="data-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Proveedor</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Estatus</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OC-2024-001</td>
                    <td>Tech Supply Co.</td>
                    <td>05/03/2024</td>
                    <td>$12,450.00</td>
                    <td><span class="badge badge-normal">En Proceso</span></td>
                  </tr>
                  <tr>
                    <td>OC-2024-002</td>
                    <td>LogiCorp</td>
                    <td>08/03/2024</td>
                    <td>$4,200.00</td>
                    <td><span class="badge badge-high">Entregada</span></td>
                  </tr>
                  <tr>
                    <td>OC-2024-003</td>
                    <td>MexComponents</td>
                    <td>09/03/2024</td>
                    <td>$8,900.00</td>
                    <td><span class="badge badge-critical">Cancelada</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          ${tablaClientesHTML}
        </section>
      </div>
    </main>
    `;
  }

  /**
   * @method bindLogout
   * @description
   * Enlaza un manejador de eventos al clic en el botón de cerrar sesión.
   *
   * @param {Function} handler - La función despachadora que resuelve el acto del logout.
   * @returns {void}
   */
  bindLogout(handler) {
    if (this.$logoutBtn) {
      this.$logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

  /**
   * @method bindExport
   * @description
   * Asocia una acción a la pulsación de exportación de recursos en la interfaz.
   *
   * @param {Function} handler - Función a ejecutar ante confirmación de exportar datos.
   * @returns {void}
   */
  bindExport(handler) {
    if (this.$exportBtn) {
      this.$exportBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      });
    }
  }

  /**
   * @method bindSearchClient
   * @description
   * Registra el evento de entrada ('input') a la casilla de búsqueda de clientes.
   *
   * @param {Function} handler - La función callback que acapara el texto de la casilla de registro del usuario.
   * @returns {void}
   */
  bindSearchClient(handler) {
    if (this.$searchClient) {
      this.$searchClient.addEventListener("input", (e) => {
        handler(e.target.value);
      });
    }
  }

  /**
   * @method bindSearchProduct
   * @description
   * Registra el evento de entrada ('input') a la casilla de búsqueda de artículos de producto.
   *
   * @param {Function} handler - Callback que procede y trata el texto del campo de productos.
   * @returns {void}
   */
  bindSearchProduct(handler) {
    if (this.$searchProduct) {
      this.$searchProduct.addEventListener("input", (e) => {
        handler(e.target.value);
      });
    }
  }

  /**
   * @method bindSearchOrder
   * @description
   * Registra el evento de entrada de datos ('input') asociado a la evaluación para las órdenes actuales.
   *
   * @param {Function} handler - Callback que se dispara y canaliza los textos del input hacia el controlador.
   * @returns {void}
   */
  bindSearchOrder(handler) {
    if (this.$searchOrder) {
      this.$searchOrder.addEventListener("input", (e) => {
        handler(e.target.value);
      });
    }
  }
}

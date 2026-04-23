"use strict";

export class ClientesView {
  constructor(icons = null) {
    this.icons = icons;
    this.element = null;
  }

  /**
   * @method renderClientes
   * @description Genera el DOM principal para la vista de Clientes.
   */
  renderClientes(sidebarHTML = "", burgerHTML = "", tablaClientesHTML = "") {
    const html = `
      <div class="dashboard-wrapper" style="display: flex; min-height: 100vh; width: 100%; overflow-x: hidden;">
        ${sidebarHTML}

        <!-- Contenido Principal -->
        <main class="main-container">
          <!-- Barra Superior -->
          <header class="top-bar">
            ${burgerHTML}

            <h2 style="font-size: 1.25rem; margin: 0">Administración de Clientes</h2>

            <div style="display: flex; gap: 1rem">
              <button class="btn btn-success" id="btnShowAddCliente" style="padding: 0.5rem 1rem">
                + Agregar Cliente
              </button>
              <button class="btn btn-secondary" style="padding: 0.5rem 1rem">
                ${this.icons?.bell || ""}
              </button>
            </div>
          </header>

          <!-- Área de Contenido -->
          <div class="dashboard-content">
            ${tablaClientesHTML}
          </div>
        </main>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    this.element = doc.body.firstElementChild;
    return this.element;
  }
}

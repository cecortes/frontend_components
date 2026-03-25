"use strict";

import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

export class TablaClientesView {
  constructor() {}

  /**
   * @method renderTable
   * @description Genera el cascarón de HTML de la tabla para inyectar al DOM.
   * La barra de búsqueda nativa fue removida para dejar que DataTables
   * inyecte la propia, la cual estilizaremos después.
   * @returns {string} Código HTML estático de la tabla sin datos.
   */
  renderTable() {
    return `
          <!-- Tabla de Clientes (Componente Extraído) -->
          <div class="table-container card">
            <div class="table-header">
              <h4>Gestión de Clientes</h4>
            </div>

            <div class="data-table-wrapper">
              <table id="clientes-table" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre del Cliente</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- DataTables poblará esto dinámicamente -->
                </tbody>
              </table>
            </div>
          </div>
    `;
  }

  /**
   * @method initDataTable
   * @description Inicializa la librería DataTables y aplica las estilizaciones correspondientes al estándar.
   * @param {Array} clientsData - Datos obtenidos del modelo asíncrono.
   */
  initDataTable(clientsData) {
    const config = {
      data: clientsData,
      info: false,
      paging: false,
      scrollY: "50vh",
      scrollCollapse: true,
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "ubicacion" },
        {
          data: "estado",
          render: function (data, type, row) {
            // Replicar los badges estéticos originales de Activo/Inactivo
            if (data === "Activo") {
              return `<span class="badge badge-high">Activo</span>`;
            } else {
              return `<span class="badge badge-low">Inactivo</span>`;
            }
          },
        },
        {
          data: null,
          orderable: false, // Fundamental para evitar que se ordene por HTML
          searchable: false, // Evita que busque atributos del HTML del botón
          render: function (data, type, row) {
            return `
              <button
                class="btn btn-secondary btn-view"
                data-id="${row.id}"
                style="padding: 4px 8px; font-size: 0.75rem"
              >
                Ver
              </button>
            `;
          },
        },
      ],
      language: {
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ registros",
        zeroRecords: "No se encontraron resultados",
        info: "Mostrando pág _PAGE_ de _PAGES_",
        infoEmpty: "No hay registros disponibles",
        infoFiltered: "(filtrado de _MAX_ totales)",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
      initComplete: function () {
        const table = document.getElementById("clientes-table");
        if (!table) return;

        // DataTables inyecta sus controles rodeando la tabla original
        const dtContainer = table.closest(".dt-container");
        if (!dtContainer) return;

        const dtSearch = dtContainer.querySelector(".dt-search");
        if (dtSearch) {
          dtSearch.classList.add("input-wrapper", "search-box");
          dtSearch.style.marginBottom = "0";

          const label = dtSearch.querySelector("label");
          if (label) {
            label.style.display = "none";
          }

          const input = dtSearch.querySelector(".dt-input");
          if (input) {
            input.classList.add("input-field");
            input.placeholder = "Buscar cliente...";

            // Inyectar el icono como ocurre en la tabla estática de referencias
            const iconHTML = `
              <div class="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            `;
            input.insertAdjacentHTML("beforebegin", iconHTML);
          }
        }
      },
    };

    // Inicializar mediante constructor
    new DataTable("#clientes-table", config);
  }
}

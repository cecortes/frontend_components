"use strict";

import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

export class TablaUsuariosView {
  constructor() {}

  /**
   * @method renderTable
   * @description Genera el cascarón de HTML de la tabla para inyectar al DOM.
   * @returns {string} Código HTML estático de la tabla sin datos.
   */
  renderTable() {
    return `
          <!-- Tabla de Usuarios (Componente Extraído) -->
          <div class="table-container card">
            <div class="table-header">
              <h4>Usuarios del Sistema</h4>
            </div>

            <div class="data-table-wrapper">
              <table id="usuarios-table" class="display" style="width:100%">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Mail</th>
                    <th>Usuario</th>
                    <th>Rol</th>
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
   * @description Inicializa la librería DataTables estática sobre el HTML.
   * @param {Array} usersData - Datos obtenidos del modelo.
   */
  initDataTable(usersData) {
    const config = {
      data: usersData,
      destroy: true,
      info: false,
      paging: false,
      scrollY: "50vh",
      scrollCollapse: true,
      columns: [
        { data: "nombre" },
        { data: "mail" },
        { data: "usuario" },
        { data: "rol" },
        {
          data: null,
          orderable: false,
          searchable: false,
          render: function (data, type, row) {
            return `
              <div style="display: flex; gap: 8px; justify-content: center;">
                <button class="btn btn-primary btn-edit" data-id="${row.usuario}" style="padding: 4px 8px; font-size: 0.75rem">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${row.usuario}" style="padding: 4px 8px; font-size: 0.75rem">Borrar</button>
              </div>
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
        const table = document.getElementById("usuarios-table");
        if (!table) return;

        // DataTables inyecta sus controles rodeando la tabla original
        const dtContainer = table.closest(".dt-container");
        if (!dtContainer) return;

        const dtSearch = dtContainer.querySelector(".dt-search");
        if (dtSearch) {
          dtSearch.classList.add("input-wrapper", "search-box");
          dtSearch.style.marginBottom = "0"; // Para estar al mismo nivel que el de "lengthMenu"

          const label = dtSearch.querySelector("label");
          if (label) {
            label.style.display = "none";
          }

          const input = dtSearch.querySelector(".dt-input");
          if (input) {
            input.classList.add("input-field");
            input.placeholder = "Buscar usuario...";

            // Inyectar el icono como ocurre en la tabla genérica
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

    // Inicializar mediante el import de ESM
    new DataTable("#usuarios-table", config);
  }
}

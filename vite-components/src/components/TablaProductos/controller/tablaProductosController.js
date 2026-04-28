"use strict";

export class TablaProductosController {
  constructor(
    model,
    view,
    modalEditarProductoController,
    modalBorrarProductoController,
  ) {
    this.model = model;
    this.view = view;
    this.modalEditarProductoController = modalEditarProductoController;
    this.modalBorrarProductoController = modalBorrarProductoController;
  }

  async init() {
    try {
      // 1. Renderizar la vista (cascarón HTML vacío)
      const html = this.view.renderTable();
      return html;
    } catch (error) {
      console.error(
        "[TablaProductosController] Error initializing component:",
        error,
      );
      return `<div class="card"><p class="text-error">Error cargando la tabla de productos.</p></div>`;
    }
  }

  async bindEvents() {
    // Polling asíncrono para esperar a que el layout renderizado por un agente superior inyecte nuestra tabla
    const checkExist = setInterval(async () => {
      const tableEl = document.getElementById("productos-table");
      if (tableEl && document.body.contains(tableEl)) {
        clearInterval(checkExist);

        try {
          // Obtener los datos mapeados del modelo (simulación backend con hardcode)
          this.tableData = await this.model.fetchProductosData();

          // Desplegar la lógica de UI y plugin DataTables
          this.view.initDataTable(this.tableData);

          // Escuchar eventos dinámicos renderizados por la tabla
          tableEl.addEventListener("click", (e) => {
            const btnEdit = e.target.closest(".btn-edit");
            const btnDelete = e.target.closest(".btn-delete");

            if (btnEdit) {
              const productoId = btnEdit.dataset.id;
              console.log("[TablaProductosController] Click en editar producto:", productoId);
              // Para el futuro: llamar a modalEditarProductoController.showModal(...)
            }

            if (btnDelete) {
              const productoId = btnDelete.dataset.id;
              console.log("[TablaProductosController] Click en borrar producto:", productoId);
              // Para el futuro: llamar a modalBorrarProductoController.showModal(...)
            }
          });
        } catch (error) {
          console.error(
            "[TablaProductosController] Error HTTP al cargar productos:",
            error.message,
          );
        }
      }
    }, 50);
  }
}

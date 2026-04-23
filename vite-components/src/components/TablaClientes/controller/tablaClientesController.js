"use strict";

export class TablaClientesController {
  constructor(
    model,
    view,
    modalEditarClienteController,
    modalBorrarClienteController,
  ) {
    this.model = model;
    this.view = view;
    this.modalEditarClienteController = modalEditarClienteController;
    this.modalBorrarClienteController = modalBorrarClienteController;
  }

  async init() {
    try {
      // 1. Renderizar la vista (cascarón HTML vacío)
      const html = this.view.renderTable();

      return html;
    } catch (error) {
      console.error(
        "[TablaUsuariosController] Error initializing component:",
        error,
      );
      return `<div class="card"><p class="text-error">Error cargando la tabla de usuarios.</p></div>`;
    }
  }

  async bindEvents() {
    // Polling asíncrono para esperar a que el layout renderizado por un agente superior inyecte nuestra tabla
    const checkExist = setInterval(async () => {
      const tableEl = document.getElementById("clientes-table");
      if (tableEl && document.body.contains(tableEl)) {
        clearInterval(checkExist);

        try {
          // Obtener los datos mapeados del modelo (fetch simulación backend)
          this.tableData = await this.model.fetchClientsData();

          // Desplegar la lógica de UI y plugin DataTables
          this.view.initDataTable(this.tableData);

          // Escuchar eventos dinámicos renderizados por la tabla
          tableEl.addEventListener("click", (e) => {
            const btnEdit = e.target.closest(".btn-edit");
            const btnDelete = e.target.closest(".btn-delete");

            if (btnEdit) {
              const clienteId = btnEdit.dataset.id;

              const clientData = this.tableData.find(
                (client) => String(client.id) === String(clienteId),
              );
              if (clientData && this.modalEditarClienteController) {
                this.modalEditarClienteController.showModal(
                  clientData,
                  async (updatedClient) => {
                    try {
                      this.tableData = await this.model.fetchClientsData();
                      this.view.initDataTable(this.tableData);
                    } catch (err) {
                      console.error(
                        "[TablaClientesController] Error recargando clientes:",
                        err,
                      );
                    }
                  },
                );
              }
            }

            if (btnDelete) {
              const clienteId = btnDelete.dataset.id;
              console.log(
                "[TablaClientesController] Borrar click en cliente:",
                clienteId,
              );

              const clientData = this.tableData.find(
                (client) => String(client.id) === String(clienteId),
              );

              if (clientData && this.modalBorrarClienteController) {
                this.modalBorrarClienteController.showModal(
                  clientData,
                  async (deletedClient) => {
                    console.log(
                      "[TablaClientesController] Cliente eliminado:",
                      deletedClient.id,
                    );
                    try {
                      console.log(
                        "[TablaClientesController] Recargando datos de la tabla tras eliminar...",
                      );
                      this.tableData = await this.model.fetchClientsData();
                      this.view.initDataTable(this.tableData);
                    } catch (err) {
                      console.error(
                        "[TablaClientesController] Error recargando clientes:",
                        err,
                      );
                    }
                  },
                );
              }
            }
          });
        } catch (error) {
          console.error(
            "[TablaClientesController] Error HTTP al cargar clientes:",
            error.message,
          );
        }
      }
    }, 50);
  }
}

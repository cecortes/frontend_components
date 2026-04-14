"use strict";

export class TablaClientesController {
  constructor(model, view, modalEditarClienteController) {
    this.model = model;
    this.view = view;
    this.modalEditarClienteController = modalEditarClienteController;
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
          let data = await this.model.fetchClientsData();

          // Desplegar la lógica de UI y plugin DataTables
          this.view.initDataTable(data);

          // Escuchar eventos dinámicos renderizados por la tabla
          tableEl.addEventListener("click", (e) => {
            const btnEdit = e.target.closest(".btn-edit");
            const btnDelete = e.target.closest(".btn-delete");

            if (btnEdit) {
              const clienteId = btnEdit.dataset.id;

              const clientData = data.find(
                (client) => String(client.id) === String(clienteId),
              );
              if (clientData && this.modalEditarClienteController) {
                this.modalEditarClienteController.showModal(
                  clientData,
                  async (updatedClient) => {
                    try {
                      const newData = await this.model.fetchClientsData();
                      data = newData;
                      this.view.initDataTable(data);
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

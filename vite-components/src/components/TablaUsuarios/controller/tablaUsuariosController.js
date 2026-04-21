"use strict";

export class TablaUsuariosController {
  constructor(view, model, modalEditarController, modalBorrarController) {
    this.view = view;
    this.model = model;
    this.modalEditarController = modalEditarController;
    this.modalBorrarController = modalBorrarController;
  }

  /**
   * @async
   * @method init
   * @description
   * Renderiza el cascarón estático de la tabla sin datos para inyectarse en el DOM.
   *
   * @returns {Promise<string>} String HTML de la tabla vacía lista para inyectarse.
   */
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

  /**
   * @async
   * @method reloadTable
   * @description
   * Vuelve a obtener los datos del modelo de manera asíncrona y reinicializa el DataTable
   * en la vista para reflejar inmediatamente los cambios (creación, edición, borrado).
   */
  async reloadTable() {
    try {
      console.log("[TablaUsuariosController] Recargando datos de la tabla...");
      this.tableData = await this.model.fetchUsersData();
      this.view.initDataTable(this.tableData);
    } catch (err) {
      console.error(
        "[TablaUsuariosController] Error recargando usuarios:",
        err,
      );
    }
  }

  /**
   * @method bindEvents
   * @description
   * Espera a que la tabla exista en el DOM. Hace fetch de datos e inicializa DataTables.
   * Modifica eventos con Event Delegation para DataTables.
   */
  bindEvents() {
    // Polling ligero para esperar a que el componente esté inyectado en el DOM
    const checkExist = setInterval(async () => {
      const tableEl = document.getElementById("usuarios-table");
      if (tableEl && document.body.contains(tableEl)) {
        clearInterval(checkExist);

        try {
          // 1. Obtener datos del modelo
          this.tableData = await this.model.fetchUsersData();

          // 2. Pasarle los datos a la Vista para inicializar DataTables
          this.view.initDataTable(this.tableData);

          // 3. Event Delegation para botones de la tabla renderizados dinámicamente
          tableEl.addEventListener("click", (e) => {
            const btnEdit = e.target.closest(".btn-edit");
            const btnDelete = e.target.closest(".btn-delete");

            if (btnEdit) {
              const userId = btnEdit.dataset.id;
              console.log(
                "[TablaUsuariosController] Editar click en usuario:",
                userId,
              );
              // Buscar información del usuario en test/data
              const userData = this.tableData.find((user) => user.usuario === userId);
              if (userData && this.modalEditarController) {
                this.modalEditarController.showModal(
                  userData,
                  async (updatedUser) => {
                    console.log(
                      "[TablaUsuariosController] Usuario modificado:",
                      updatedUser,
                    );
                    await this.reloadTable();
                  },
                );
              }
            }

            if (btnDelete) {
              const userId = btnDelete.dataset.id;
              console.log(
                "[TablaUsuariosController] Borrar click en usuario:",
                userId,
              );
              const userData = this.tableData.find((user) => user.usuario === userId);

              if (userData && this.modalBorrarController) {
                this.modalBorrarController.showModal(
                  userData,
                  async (userToDelete) => {
                    console.log(
                      "[TablaUsuariosController] Usuario eliminado:",
                      userToDelete.usuario,
                    );
                    await this.reloadTable();
                  },
                );
              }
            }
          });
        } catch (error) {
          console.error(
            "[TablaUsuariosController] Error HTTP al cargar usuarios:",
            error.message,
          );
        }
      }
    }, 50);
  }
}

"use strict";

export class TablaUsuariosController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  /**
   * @async
   * @method init
   * @description
   * Carga los datos de los usuarios desde el modelo y le pide a la vista renderizar y devolver el HTML.
   *
   * @returns {Promise<string>} String HTML de la tabla lista para inyectarse en el dashboard.
   */
  async init() {
    try {
      // 1. Cargar datos del modelo
      const data = await this.model.fetchUsersData();

      // 2. Renderizar la vista con los datos obtenidos
      const html = this.view.renderTable(data);

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
   * @method bindEvents
   * @description
   * Método preparado para enlazar eventos (ej: clics en Editar/Borrar, input de búsqueda) en el futuro
   * una vez que el HTML esté inyectado en el DOM principal. Note que esto se ejecutaría después de renderizar.
   */
  bindEvents() {
    // Aquí se agregarán los AddEventListeners buscando por selectores dentro de un elemento padre
    // console.log("[TablaUsuariosController] Eventos vinculados");
  }
}

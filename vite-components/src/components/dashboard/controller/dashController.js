"use strict";

/**
 * @class DashboardController
 * @description
 * Controlador principal para el componente Dashboard. Maneja la lógica de
 * inicialización, autenticación y coordinación entre vista y modelo.
 */
export class DashboardController {
  /**
   * @async
   * @method constructor
   * @description
   * Inicializa el controlador del Dashboard con las dependencias necesarias.
   *
   * @param {Object} view - Instancia de la vista del Dashboard.
   * @param {Object} model - Instancia del modelo del Dashboard.
   * @param {Object} storage - Instancia del servicio de almacenamiento (Storage).
   * @param {Object|null} modalController - Instancia opcional del controlador de modales.
   */
  constructor(view, model, storage, modalController = null) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.modalController = modalController;
  }

  /**
   * @async
   * @method init
   * @description
   * Inicializa el Dashboard verificando la autenticación del usuario,
   * renderizando la vista y retornando el HTML generado.
   *
   * @returns {Promise<string|void>} - El HTML renderizado del Dashboard o undefined si redirige a login.
   * @throws {Error} - Lanza error si falla la verificación de autenticación.
   */
  async init() {
    // CHECK AUTH <----- VERIFY THIS...
    this.storage.loadSessionStorage();
    if (!this.storage.Token) {
      window.location.href = "/"; // Redirigir a login
      return;
    }
    // CHECK AUTH <----- VERIFY THIS...

    // Render vista
    const html = this.view.renderDashboard();

    // Bind events
    //this.dashboardEventHandler();

    // Cargar datos
    //await this.loadDashboardData();

    return html;
  }

  /**
   * @todo
   * @method dashboardEventHandler
   * @description
   * Manejador de eventos para el Dashboard. Deberá vincular los eventos
   * del DOM (clics, submits, etc.) con sus respectivos handlers.
   *
   * @returns {void}
   */
  // dashboardEventHandler

  /**
   * @todo
   * @method loadDashboardData
   * @description
   * Carga los datos necesarios para el Dashboard desde el modelo.
   * Deberá realizar las llamadas asíncronas necesarias para obtener
   * y renderizar la información.
   *
   * @returns {Promise<void>}
   */
  //loadDashboardData
}

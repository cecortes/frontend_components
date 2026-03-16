"use strict";

export class DashboardController {
  constructor(
    view,
    model,
    storage,
    auth,
    modalController = null,
    sidebarController = null,
  ) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalController = modalController;
    this.sidebarController = sidebarController;
  }

  /**
   * @async
   * @method init
   * @description
   * Inicializa el dashboard, verifica la autenticación del usuario, renderiza la vista y carga los datos.
   *
   * @returns {Promise<HTMLElement|void>} Retorna el HTML del dashboard si la sesión es válida, de lo contrario redirige.
   */
  async init() {
    // CHECK AUTH
    const sessionData = this.storage.loadSessionStorage();

    // TODO: Implementar try catch para la validación del token, en caso de error mostrar modal de error y redirigir al login
    try {
      await this.auth.init(sessionData);
    } catch (error) {
      console.log(error.message);
      this.modalController.showError(error.message, () => {
        window.router.navigate("/");
      });
      return;
    }

    // Inicializar Sidebar Component
    const userData = { name: this.storage.UserName, role: this.storage.Role };
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("dashboard", userData)
      : "";
    const burgerHTML = this.sidebarController
      ? this.sidebarController.getBurgerHTML()
      : "";

    // Render vista (HTML Estático con MVC)
    const html = this.view.renderDashboard(sidebarHTML, burgerHTML);

    // Bind events
    this.dashboardEventHandler();

    // Llamada asíncrona de datos desde el Modelo
    await this.loadDashboardData();

    return html;
  }

  /**
   * @method dashboardEventHandler
   * @description
   * Asigna y enlaza todos los eventos generados desde la vista con los manejadores del controlador.
   *
   * @returns {void}
   */
  dashboardEventHandler() {
    this.view.bindLogout(() => this.handleLogout());
    this.view.bindExport(() => this.handleExportData());
    this.view.bindSearchClient((query) => this.handleSearchClient(query));
    this.view.bindSearchProduct((query) => this.handleSearchProduct(query));
    this.view.bindSearchOrder((query) => this.handleSearchOrder(query));
  }

  /**
   * @async
   * @method loadDashboardData
   * @description
   * Carga los datos esenciales para el dashboard invocando al modelo.
   *
   * @returns {Promise<void>}
   */
  async loadDashboardData() {
    try {
      const data = await this.model.fetchDashboardData();
      // En una implementación real más compleja se llamarían métodos "updateTables(data)" del dashboardView aquí.
      //console.log("[DashboardController] Dummy Data Fetched:", data);
    } catch (error) {
      console.error(
        "[DashboardController] Error fetching dashboard data:",
        error,
      );
    }
  }

  /**
   * @method handleLogout
   * @description
   * Maneja la acción de cerrado de sesión, eliminando el token y redirigiendo a la página principal.
   *
   * @returns {void}
   */
  handleLogout() {
    this.storage.removeItemStorage("Token");
    window.location.href = "/";
  }

  /**
   * @method handleExportData
   * @description
   * Maneja el evento de exportación de la información de la tabla a distintos formatos (CSV/PDF).
   *
   * @returns {void}
   */
  handleExportData() {
    console.log("[DashboardController] Exportando datos a CSV/PDF...");
  }

  /**
   * @method handleSearchClient
   * @description
   * Maneja la acción de filtrado dentro de la lista de clientes.
   *
   * @param {string} query - El término de búsqueda ingresado por el usuario.
   * @returns {void}
   */
  handleSearchClient(query) {
    console.log("[DashboardController] Filtrando clientes por:", query);
  }

  /**
   * @method handleSearchProduct
   * @description
   * Maneja la acción de búsqueda interaccionada dentro del listado de inventario.
   *
   * @param {string} query - El término a buscar en la tabla de productos.
   * @returns {void}
   */
  handleSearchProduct(query) {
    console.log("[DashboardController] Filtrando inventario por:", query);
  }

  /**
   * @method handleSearchOrder
   * @description
   * Maneja la acción de filtrado para las órdenes de compras registradas.
   *
   * @param {string} query - La porción de texto buscada para las órdenes.
   * @returns {void}
   */
  handleSearchOrder(query) {
    console.log("[DashboardController] Filtrando orden de compra por:", query);
  }
}

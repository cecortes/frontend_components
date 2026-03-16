"use strict";

export class SidebarController {
  constructor(view) {
    this.view = view;
  }

  /**
   * @method getSidebarHTML
   * @description Retorna el HTML del menú lateral interactivo completo.
   * @param {string} activeRoute - La ruta que se visualizará como activa.
   * @param {Object} userData - Datos a mostrar en el footer del aside.
   * @returns {string} HTML string del sidebar
   */
  getSidebarHTML(
    activeRoute = "dashboard",
    userData = { name: "Admin User", role: "Administrador" },
  ) {
    return this.view.getSidebarTemplate(activeRoute, userData);
  }

  /**
   * @method getBurgerHTML
   * @description Retorna el HTML del control móvil del menú hamburguesa.
   * @returns {string} HTML string del label
   */
  getBurgerHTML() {
    return this.view.getBurgerTemplate();
  }
}

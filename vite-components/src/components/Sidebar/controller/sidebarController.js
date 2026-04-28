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

  /**
   * @method bindNavigation
   * @description Enlaza los eventos de click en los enlaces del sidebar para usar el router SPA.
   * @param {HTMLElement} element - El elemento DOM contenedor principal (vista padre).
   * @returns {void}
   */
  bindNavigation(element) {
    const links = element.querySelectorAll(".sidebar-nav a");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const text = link.textContent.trim().toLowerCase();

        if (text.includes("dashboard")) {
          window.router.navigate("/dashboard");
        } else if (text.includes("usuarios")) {
          window.router.navigate("/usuarios");
        } else if (text.includes("clientes")) {
          window.router.navigate("/clientes");
        } else if (text.includes("productos")) {
          window.router.navigate("/productos");
        }
        // A futuro: añadir más rutas conforme se vayan creando
      });
    });
  }
}

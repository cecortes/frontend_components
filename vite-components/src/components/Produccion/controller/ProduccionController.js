"use strict";

export class ProduccionController {
  constructor(view, model, storage, auth, modalErrorController, sidebarController) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
  }

  async init() {
    const sessionData = this.storage.loadSessionStorage();

    // Tratamiento estandarizado para la validación de seguridad
    try {
      await this.auth.init(sessionData);
    } catch (error) {
      if (this.modalErrorController) {
        this.modalErrorController.showError(error.message, () => window.router.navigate("/"));
      } else {
        window.router.navigate("/");
      }
      return;
    }

    const userData = { name: this.storage.UserName, role: this.storage.Role };

    // CRÍTICO: El identificador "produccion" activará la propiedad CSS equivalente
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("produccion", userData)
      : "";
    const burgerHTML = this.sidebarController ? this.sidebarController.getBurgerHTML() : "";

    const html = this.view.renderProduccion(sidebarHTML, burgerHTML);

    // Vinculación estricta para navegación SPA
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }

    return html;
  }
}

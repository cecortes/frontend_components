"use strict";

export class ProduccionController {
  constructor(view, model, storage, auth, modalErrorController, sidebarController, produccionTotalesController = null, produccionGraficaController = null) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
    this.produccionTotalesController = produccionTotalesController;
    this.produccionGraficaController = produccionGraficaController;
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

    const totalesHTML = this.produccionTotalesController ? this.produccionTotalesController.init() : "";
    const graficaHTML = this.produccionGraficaController ? this.produccionGraficaController.init() : "";

    const html = this.view.renderProduccion(sidebarHTML, burgerHTML, totalesHTML, graficaHTML);

    // Vinculación estricta para navegación SPA
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }

    // Inicializar eventos de sub-componentes pasándoles el nodo raíz
    if (this.produccionGraficaController) {
      this.produccionGraficaController.bindEvents(html);
    }

    return html;
  }
}

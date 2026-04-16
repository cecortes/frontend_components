"use strict";

export class UsuariosController {
  constructor(
    view,
    model,
    storage,
    auth,
    modalErrorController,
    sidebarController = null,
  ) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
  }

  /**
   * @async
   * @method init
   * @description Inicializa la página de Usuarios, renderiza la vista y vincula la navegación.
   * @returns {HTMLElement|void} Retorna el HTML de la página o redirige en caso de no auth.
   */
  async init() {
    // Validar sesión a través del AuthController idéntico a Dashboard
    const sessionData = this.storage.loadSessionStorage();

    try {
      await this.auth.init(sessionData);
    } catch (error) {
      console.log(error.message);
      if (this.modalErrorController) {
        this.modalErrorController.showError(error.message, () => {
          window.router.navigate("/");
        });
      } else {
        window.router.navigate("/");
      }
      return; // Retornamos undefined por no autenticación
    }

    const userData = { name: this.storage.UserName, role: this.storage.Role };

    // Generar strings HTML de los subcomponentes
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("users", userData)
      : "";
    const burgerHTML = this.sidebarController
      ? this.sidebarController.getBurgerHTML()
      : "";

    // Renderizar la vista principal
    const html = this.view.renderUsuarios(sidebarHTML, burgerHTML);

    // Bind Navigation events para el Sidebar
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }

    // A futuro aquí iría la inyección de TablaUsuarios u otros eventos

    return html;
  }
}

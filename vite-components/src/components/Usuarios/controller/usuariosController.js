"use strict";

export class UsuariosController {
  constructor(
    view,
    model,
    storage,
    auth,
    modalErrorController,
    sidebarController = null,
    modalAddController = null,
    tablaUsuariosController = null,
  ) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
    this.modalAddController = modalAddController;
    this.tablaUsuariosController = tablaUsuariosController;
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

    // Inicializar TablaUsuarios Component
    const tablaUsuariosHTML = this.tablaUsuariosController
      ? await this.tablaUsuariosController.init()
      : "";

    // Renderizar la vista principal
    const html = this.view.renderUsuarios(sidebarHTML, burgerHTML, tablaUsuariosHTML);

    // Bind Navigation events para el Sidebar
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }

    // Activar Modal Agregar Usuario
    const addUsrBtn = html.querySelector("#btnShowAddUsuario");
    if (addUsrBtn && this.modalAddController) {
      addUsrBtn.addEventListener("click", () => {
        this.modalAddController.start(async (newData) => {
          // Callback para cuando se ha agregado el usuario exitosamente
          console.log("Usuario agregado desde el modal:", newData);
          if (this.tablaUsuariosController) {
            await this.tablaUsuariosController.reloadTable();
          }
        });
      });
    }

    // A futuro aquí iría la inyección de TablaUsuarios u otros eventos
    if (this.tablaUsuariosController) {
      this.tablaUsuariosController.bindEvents();
    }

    return html;
  }
}

"use strict";

export class ClientesController {
  constructor(
    view,
    model,
    storage,
    auth,
    modalErrorController,
    sidebarController = null,
    modalAddClienteController = null,
    tablaClientesController = null,
  ) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
    this.modalAddClienteController = modalAddClienteController;
    this.tablaClientesController = tablaClientesController;
  }

  /**
   * @async
   * @method init
   * @description Inicializa la página de Clientes, renderiza la vista y vincula la navegación.
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

    // Generar strings HTML de los subcomponentes con estado activo 'clients'
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("clients", userData)
      : "";
    const burgerHTML = this.sidebarController
      ? this.sidebarController.getBurgerHTML()
      : "";

    const tablaClientesHTML = this.tablaClientesController
      ? await this.tablaClientesController.init()
      : "";

    // Renderizar la vista principal
    const html = this.view.renderClientes(sidebarHTML, burgerHTML, tablaClientesHTML);

    // Bind Navigation events para el Sidebar
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }
    
    // Activar Modal Agregar Cliente
    const addClientBtn = html.querySelector("#btnShowAddCliente");
    if (addClientBtn && this.modalAddClienteController) {
      addClientBtn.addEventListener("click", () => {
        this.modalAddClienteController.start(async (newData) => {
          console.log("Cliente agregado desde el modal:", newData);
          if (this.tablaClientesController) {
            await this.tablaClientesController.reloadTable();
          }
        });
      });
    }

    if (this.tablaClientesController) {
      this.tablaClientesController.bindEvents();
    }

    return html;
  }
}

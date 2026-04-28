"use strict";

export class ProductosController {
  constructor(
    view,
    model,
    storage,
    auth,
    modalErrorController,
    sidebarController = null,
    modalAddProductoController = null,
    tablaProductosController = null,
  ) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.auth = auth;
    this.modalErrorController = modalErrorController;
    this.sidebarController = sidebarController;
    this.modalAddProductoController = modalAddProductoController;
    this.tablaProductosController = tablaProductosController;
  }

  /**
   * @async
   * @method init
   * @description Inicializa la página de Productos, renderiza la vista y vincula la navegación.
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

    // Generar strings HTML de los subcomponentes con estado activo 'productos'
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("productos", userData)
      : "";
    const burgerHTML = this.sidebarController
      ? this.sidebarController.getBurgerHTML()
      : "";

    const tablaProductosHTML = this.tablaProductosController
      ? await this.tablaProductosController.init()
      : "";

    // Renderizar la vista principal
    const html = this.view.renderProductos(sidebarHTML, burgerHTML, tablaProductosHTML);

    // Bind Navigation events para el Sidebar
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }
    
    // Activar Modal Agregar Producto (Placeholder para el futuro)
    const addProductBtn = html.querySelector("#btnShowAddProducto");
    if (addProductBtn && this.modalAddProductoController) {
      addProductBtn.addEventListener("click", () => {
        // Implementar futura lógica de agregar producto
        console.log("Abrir modal agregar producto");
      });
    }

    if (this.tablaProductosController) {
      this.tablaProductosController.bindEvents();
    }

    return html;
  }
}

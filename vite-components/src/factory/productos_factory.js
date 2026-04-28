"use strict";

import { ProductosView } from "../components/Productos/view/productosView.js";
import { ProductosModel } from "../components/Productos/model/productosModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { ProductosController } from "../components/Productos/controller/productosController.js";
import { AuthController } from "../components/Auth/controller/authController.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { ModalFactory } from "./modal_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";
import { TablaProductosFactory } from "./tabla_productos_factory.js";

export class ProductosFactory {
  /**
   * @method productosComponent
   * @description Crea e inicializa todo el árbol MVC de la página de Productos.
   * @returns {Object} Objeto conteniendo el elemento HTML y el controlador.
   */
  static async productosComponent() {
    const { element: modalErrorElement, controller: modalErrorController } =
      ModalFactory.modalComponent();

    const { element: modalOkElement, controller: modalOkController } =
      ModalFactory.modalOkComponent();

    const sidebarController = SidebarFactory.createSidebar();

    const tablaProductosController = TablaProductosFactory.createTablaProductos(
      null, // modalEditarProductoController - a futuro
      null, // modalBorrarProductoController - a futuro
    );

    const view = new ProductosView(icons);
    const model = new ProductosModel();
    const storage = new SessionStorage();
    const auth = new AuthController();

    const controller = new ProductosController(
      view,
      model,
      storage,
      auth,
      modalErrorController,
      sidebarController,
      null, // modalAddProductoController - a futuro
      tablaProductosController,
    );

    const element = await controller.init();

    return {
      element,
      modalError: modalErrorElement,
      modalOk: modalOkElement,
      controller,
    };
  }
}

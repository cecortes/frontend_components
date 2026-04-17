"use strict";

import { ClientesView } from "../components/Clientes/view/clientesView.js";
import { ClientesModel } from "../components/Clientes/model/clientesModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { ClientesController } from "../components/Clientes/controller/clientesController.js";
import { AuthController } from "../components/Auth/controller/authController.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { ModalFactory } from "./modal_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";

export class ClientesFactory {
  /**
   * @method clientesComponent
   * @description Crea e inicializa todo el árbol MVC de la página de Clientes.
   * @returns {Object} Objeto conteniendo el elemento HTML y el controlador.
   */
  static async clientesComponent() {
    const { element: modalErrorElement, controller: modalErrorController } =
      ModalFactory.modalComponent();
    const sidebarController = SidebarFactory.createSidebar();

    const view = new ClientesView(icons);
    const model = new ClientesModel();
    const storage = new SessionStorage();
    const auth = new AuthController();

    const controller = new ClientesController(
      view,
      model,
      storage,
      auth,
      modalErrorController,
      sidebarController,
    );

    const element = await controller.init();

    return {
      element,
      modalError: modalErrorElement,
      controller,
    };
  }
}

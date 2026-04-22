"use strict";

import { ClientesView } from "../components/Clientes/view/clientesView.js";
import { ClientesModel } from "../components/Clientes/model/clientesModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { ClientesController } from "../components/Clientes/controller/clientesController.js";
import { AuthController } from "../components/Auth/controller/authController.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { ModalFactory } from "./modal_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";
import { TablaClientesFactory } from "./tabla_clientes_factory.js";
import { ModalEditarClienteFactory } from "./modal_editar_cliente_factory.js";
import { ModalBorrarClienteFactory } from "./modal_borrar_cliente_factory.js";

export class ClientesFactory {
  /**
   * @method clientesComponent
   * @description Crea e inicializa todo el árbol MVC de la página de Clientes.
   * @returns {Object} Objeto conteniendo el elemento HTML y el controlador.
   */
  static async clientesComponent() {
    const { element: modalErrorElement, controller: modalErrorController } =
      ModalFactory.modalComponent();

    const { element: modalOkElement, controller: modalOkController } =
      ModalFactory.modalOkComponent();

    const {
      element: modalEditClientElement,
      controller: modalEditClientController,
    } = ModalEditarClienteFactory.createModal(
      modalErrorController,
      modalOkController,
    );

    const {
      element: modalDeleteClientElement,
      controller: modalDeleteClientController,
    } = ModalBorrarClienteFactory.createModal(
      modalErrorController,
      modalOkController,
    );

    const sidebarController = SidebarFactory.createSidebar();

    const tablaClientesController = TablaClientesFactory.createTablaClientes(
      modalEditClientController,
      modalDeleteClientController,
    );

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
      tablaClientesController,
    );

    const element = await controller.init();

    return {
      element,
      modalError: modalErrorElement,
      modalOk: modalOkElement,
      modalEditClient: modalEditClientElement,
      modalDeleteClient: modalDeleteClientElement,
      controller,
    };
  }
}

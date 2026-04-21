"use strict";

import { DashboardView } from "../components/Dashboard/view/dashView.js";
import { DashboardModel } from "../components/Dashboard/model/dashModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { DashboardController } from "../components/Dashboard/controller/dashController.js";
import { AuthController } from "../components/Auth/controller/authController.js";

import { ModalFactory } from "./modal_factory.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { TablaClientesFactory } from "./tabla_clientes_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";
import { ModalEditarClienteFactory } from "./modal_editar_cliente_factory.js";
import { ModalBorrarClienteFactory } from "./modal_borrar_cliente_factory.js";

export class DashboardFactory {
  /**
   * @async
   * @method dashComponent
   * @description
   * Crea y retorna el componente Dashboard completo inicializado.
   * Instancia la vista, modelo, storage y controlador del dashboard,
   * luego inicializa el controlador para renderizar el HTML.
   *
   * @returns {Promise<Object>} Objeto conteniendo el elemento HTML renderizado y el controlador del dashboard.
   * @example
   * const { element, modal, controller } = await DashboardFactory.dashComponent();
   */
  static async dashComponent() {
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

    const view = new DashboardView(icons);
    const model = new DashboardModel();
    const storage = new SessionStorage();
    const auth = new AuthController();
    const controller = new DashboardController(
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

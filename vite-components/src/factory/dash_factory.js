"use strict";

import { DashboardView } from "../components/Dashboard/view/dashView.js";
import { DashboardModel } from "../components/Dashboard/model/dashModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { DashboardController } from "../components/Dashboard/controller/dashController.js";
import { AuthController } from "../components/Auth/controller/authController.js";

import { ModalFactory } from "./modal_factory.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { TablaUsuariosFactory } from "./tabla_usuarios_factory.js";
import { createTablaClientes } from "../components/TablaClientes/tabla_clientes_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";

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
    const { element: modalElement, controller: modalController } =
      ModalFactory.modalComponent();

    const sidebarController = SidebarFactory.createSidebar();
    const tablaUsuariosController = TablaUsuariosFactory.createTablaUsuarios();
    const tablaClientesController = createTablaClientes().controller;

    const view = new DashboardView(icons);
    const model = new DashboardModel();
    const storage = new SessionStorage();
    const auth = new AuthController();
    const controller = new DashboardController(
      view,
      model,
      storage,
      auth,
      modalController,
      sidebarController,
      tablaUsuariosController,
      tablaClientesController,
    );

    const element = await controller.init();
    return { element, modal: modalElement, controller };
  }
}

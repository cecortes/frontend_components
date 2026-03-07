"use strict";

import { DashboardView } from "../components/Dashboard/view/dashView.js";
import { DashboardModel } from "../components/Dashboard/model/dashModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { DashboardController } from "../components/Dashboard/controller/dashController.js";

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
   * const { element, controller } = await DashboardFactory.dashComponent();
   */
  static async dashComponent() {
    const view = new DashboardView();
    const model = new DashboardModel();
    const storage = new SessionStorage();
    const controller = new DashboardController(view, model, storage);

    const element = await controller.init();
    return { element, controller };
  }
}

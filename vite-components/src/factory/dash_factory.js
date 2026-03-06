"use strict";

import { DashboardView } from "../components/Dashboard/view/dashView.js";
import { DashboardModel } from "../components/Dashboard/model/dashModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { DashboardController } from "../components/Dashboard/controller/dashController.js";

export class DashboardFactory {
  // Constructor no needed
  static dashComponent() {
    const view = new DashboardView();
    const model = new DashboardModel();
    const storage = new SessionStorage();
    const controller = new DashboardController(view, model, storage);

    // Dash DOM Element

    // Init Controller

    //return
    //return { element, controller };
    return controller.init().then((element) => ({ element, controller }));
  }
}

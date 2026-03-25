"use strict";

import { SidebarView } from "../components/Sidebar/view/sidebarView.js";
import { SidebarController } from "../components/Sidebar/controller/sidebarController.js";
import { icons } from "../components/Sidebar/icons/svg_icons.js";

export class SidebarFactory {
  /**
   * @method createSidebar
   * @description Crea la instancia del controlador de Sidebar inyectándole su respectiva vista y recuros.
   * @returns {SidebarController} Una instancia lista para usarse del SidebarController
   */
  static createSidebar() {
    const view = new SidebarView(icons);
    const controller = new SidebarController(view);
    return controller;
  }
}

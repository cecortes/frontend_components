"use strict";

import { TablaUsuariosView } from "../components/TablaUsuarios/view/tablaUsuariosView.js";
import { TablaUsuariosModel } from "../components/TablaUsuarios/model/tablaUsuariosModel.js";
import { TablaUsuariosController } from "../components/TablaUsuarios/controller/tablaUsuariosController.js";

export class TablaUsuariosFactory {
  /**
   * @method createTablaUsuarios
   * @description
   * Instancia la Vista y el Modelo, y los inyecta en el Controlador de TablaUsuarios.
   *
   * @returns {TablaUsuariosController} El controlador inicializado del componente.
   */
  static createTablaUsuarios() {
    const view = new TablaUsuariosView();
    const model = new TablaUsuariosModel();
    const controller = new TablaUsuariosController(view, model);
    return controller;
  }
}

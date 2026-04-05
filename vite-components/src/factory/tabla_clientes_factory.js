"use strict";

import { TablaClientesModel } from "../components/TablaClientes/model/tablaClientesModel.js";
import { TablaClientesView } from "../components/TablaClientes/view/tablaClientesView.js";
import { TablaClientesController } from "../components/TablaClientes/controller/tablaClientesController.js";
import { SessionStorage } from "../components/Storage/storage.js";

/**
 * @function TablaClientesFactory
 * @description Crea e inyecta las dependencias necesarias de la tabla de clientes devolviendo la instancia en controlador.
 */
export class TablaClientesFactory {
  static createTablaClientes() {
    const view = new TablaClientesView();
    const storage = new SessionStorage();
    storage.loadSessionStorage();
    const model = new TablaClientesModel(storage);
    const controller = new TablaClientesController(model, view);
    return controller;
  }
}

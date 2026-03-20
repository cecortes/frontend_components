"use strict";

import { TablaClientesModel } from "./model/tablaClientesModel.js";
import { TablaClientesView } from "./view/tablaClientesView.js";
import { TablaClientesController } from "./controller/tablaClientesController.js";

/**
 * @function createTablaClientes
 * @description Crea e inyecta las dependencias necesarias de la tabla de clientes devolviendo la instancia en controlador.
 */
export function createTablaClientes() {
  const model = new TablaClientesModel();
  const view = new TablaClientesView();
  const controller = new TablaClientesController(model, view);

  return { model, view, controller };
}

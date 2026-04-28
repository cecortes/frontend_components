"use strict";

import { TablaProductosModel } from "../components/TablaProductos/model/tablaProductosModel.js";
import { TablaProductosView } from "../components/TablaProductos/view/tablaProductosView.js";
import { TablaProductosController } from "../components/TablaProductos/controller/tablaProductosController.js";
import { SessionStorage } from "../components/Storage/storage.js";

/**
 * @function TablaProductosFactory
 * @description Crea e inyecta las dependencias necesarias de la tabla de productos devolviendo la instancia en controlador.
 */
export class TablaProductosFactory {
  static createTablaProductos(
    modalEditarProductoController = null,
    modalBorrarProductoController = null,
  ) {
    const view = new TablaProductosView();
    const storage = new SessionStorage();
    storage.loadSessionStorage();
    const model = new TablaProductosModel(storage);
    const controller = new TablaProductosController(
      model,
      view,
      modalEditarProductoController,
      modalBorrarProductoController,
    );
    return controller;
  }
}

"use strict";

import { ModalBorrarClienteModel } from "../components/ModalBorrarCliente/model/modalBorrarClienteModel.js";
import { ModalBorrarClienteView } from "../components/ModalBorrarCliente/view/modalBorrarClienteView.js";
import { ModalBorrarClienteController } from "../components/ModalBorrarCliente/controller/modalBorrarClienteController.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { icons } from "../components/ModalBorrarCliente/icons/svg_icons.js";

export class ModalBorrarClienteFactory {
  static createModal(modalErrorController, modalOkController) {
    // 1. Instanciar Storage y recuperar variables de sesión
    const storage = new SessionStorage();
    storage.loadSessionStorage();

    // 2. Instanciar MVC
    const model = new ModalBorrarClienteModel(storage);
    const view = new ModalBorrarClienteView(icons);
    const controller = new ModalBorrarClienteController(
      view,
      model,
      modalErrorController,
      modalOkController,
    );

    // 3. Crear el Elemento DOM y registrar eventos
    const element = view.renderModal();
    controller.modalEventHandler();

    return { element, controller };
  }
}

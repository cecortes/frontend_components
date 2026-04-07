"use strict";

import { ModalBorrarUsuarioView } from "../components/ModalBorrarUsuario/view/modalBorrarUsuarioView.js";
import { ModalBorrarUsuarioModel } from "../components/ModalBorrarUsuario/model/modalBorrarUsuarioModel.js";
import { ModalBorrarUsuarioController } from "../components/ModalBorrarUsuario/controller/modalBorrarUsuarioController.js";
import { icons } from "../components/ModalBorrarUsuario/icons/svg_icons.js";

import { SessionStorage } from "../components/Storage/storage.js";

export class ModalBorrarUsuarioFactory {
  /**
   * Instancia y ensambla el componente ModalBorrarUsuario completo (MVC).
   * Retorna el elemento DOM del modal y su controlador.
   *
   * @returns {{ element: HTMLElement, controller: ModalBorrarUsuarioController }}
   */
  static createModal(modalErrorController, modalOkController) {
    // 1. Inicializar almacenamiento de sesión
    const storage = new SessionStorage();
    storage.loadSessionStorage();

    const view = new ModalBorrarUsuarioView(icons);
    const model = new ModalBorrarUsuarioModel(storage);
    const controller = new ModalBorrarUsuarioController(
      view,
      model,
      modalErrorController,
      modalOkController,
    );

    // Renderiza el HTML y obtiene la referencia DOM
    const element = view.renderModal();

    // Bindea los eventos del controlador (click external, submit, close, etc)
    controller.modalEventHandler();

    return { element, controller };
  }
}

"use strict";

import { icons } from "../components/ModalEditarUsuario/icons/svg_icons.js";
import { ModalEditarUsuarioModel } from "../components/ModalEditarUsuario/model/modalEditarUsuarioModel.js";
import { ModalEditarUsuarioView } from "../components/ModalEditarUsuario/view/modalEditarUsuarioView.js";
import { ModalEditarUsuarioController } from "../components/ModalEditarUsuario/controller/modalEditarUsuarioController.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";

export class ModalEditarUsuarioFactory {
  /**
   * Instancia y ensambla el componente ModalEditarUsuario completo (MVC).
   * Retorna el elemento DOM del modal y su controlador.
   *
   * @returns {{ element: HTMLElement, controller: ModalEditarUsuarioController }}
   */
  static createModal() {
    // 1. Inicializar almacenamiento de sesión
    const storage = new SessionStorage();
    storage.loadSessionStorage();

    const view = new ModalEditarUsuarioView(icons);
    const model = new ModalEditarUsuarioModel(storage);
    const validator = new FieldsValidator();
    const controller = new ModalEditarUsuarioController(view, model, validator);

    // Renderiza el HTML y obtiene la referencia DOM
    const element = view.renderModal();

    // Bindea los eventos del controlador (click external, submit, close, etc)
    controller.modalEventHandler();

    return { element, controller };
  }
}

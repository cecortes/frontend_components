"use strict";

import { ModalEditarClienteView } from "../components/ModalEditarCliente/view/modalEditarClienteView.js";
import { ModalEditarClienteModel } from "../components/ModalEditarCliente/model/modalEditarClienteModel.js";
import { ModalEditarClienteController } from "../components/ModalEditarCliente/controller/modalEditarClienteController.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { icons } from "../components/ModalEditarCliente/icons/svg_icons.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";

export class ModalEditarClienteFactory {
  static createModal(modalErrorController, modalOkController) {
    const storage = new SessionStorage();
    storage.loadSessionStorage();

    const validator = new FieldsValidator();
    const view = new ModalEditarClienteView(icons);
    const model = new ModalEditarClienteModel(storage);

    const controller = new ModalEditarClienteController(
      view,
      model,
      validator,
      modalErrorController,
      modalOkController,
    );

    const element = view.renderModal();

    controller.modalEventHandler();

    return {
      element: element,
      controller: controller,
    };
  }
}

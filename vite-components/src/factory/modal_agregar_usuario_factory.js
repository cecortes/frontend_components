"use strict";

import { ModalAgregarUsuarioView } from "../components/ModalAgregarUsuario/view/modalAgregarUsuarioView.js";
import { ModalAgregarUsuarioModel } from "../components/ModalAgregarUsuario/model/modalAgregarUsuarioModel.js";
import { ModalAgregarUsuarioController } from "../components/ModalAgregarUsuario/controller/modalAgregarUsuarioController.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";

const ICONS = {
  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
};

export class ModalAgregarUsuarioFactory {
  static createModal(modalOkController, modalErrorController) {
    const view = new ModalAgregarUsuarioView(ICONS);
    const model = new ModalAgregarUsuarioModel();
    const validator = new FieldsValidator();

    const controller = new ModalAgregarUsuarioController(
      view,
      model,
      validator,
      modalOkController,
      modalErrorController,
    );

    // Renderizado inicial sin mostrar (hidden off-canvas)
    const element = view.renderModal();
    controller.bindEvents();

    // Se adjunta al body al construir la SPA para que la View pueda ser operada por Controller
    document.body.appendChild(element);

    return {
      view,
      model,
      controller,
      element,
    };
  }
}

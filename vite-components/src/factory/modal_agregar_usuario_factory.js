"use strict";

import { ModalAgregarUsuarioView } from "../components/ModalAgregarUsuario/view/modalAgregarUsuarioView.js";
import { ModalAgregarUsuarioModel } from "../components/ModalAgregarUsuario/model/modalAgregarUsuarioModel.js";
import { ModalAgregarUsuarioController } from "../components/ModalAgregarUsuario/controller/modalAgregarUsuarioController.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";

const ICONS = {
  close: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>`,
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

"use strict";

import { modalIcons } from "../components/ModalError/icons/modal_icons.js";
import { ModalModel } from "../components/ModalError/model/modalModel.js";
import { ModalView } from "../components/ModalError/view/modalView.js";
import { ModalController } from "../components/ModalError/controller/modalController.js";

export class ModalFactory {
  /**
   * @method modalComponent
   * @description
   * Instancia y ensambla el componente ModalError completo (MVC).
   * Retorna el elemento DOM del modal y su controlador para
   * permitir la inyección en otros componentes (ej. LoginController).
   *
   * @returns {{ element: HTMLElement, controller: ModalController }}
   * @example
   * const { element, controller } = ModalFactory.modalComponent();
   * document.body.append(element);
   * loginController.modalController = controller;
   */
  static modalComponent() {
    const view = new ModalView(modalIcons);
    const model = new ModalModel();
    const controller = new ModalController(view, model);

    // Modal DOM element
    const element = view.renderModal();

    // Binding Events
    controller.modalEventHandler();

    return { element, controller };
  }
}

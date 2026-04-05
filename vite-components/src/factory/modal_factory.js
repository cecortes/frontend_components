"use strict";

import { modalIcons } from "../components/ModalError/icons/modal_icons.js";
import { ModalModel } from "../components/ModalError/model/modalModel.js";
import { ModalView } from "../components/ModalError/view/modalView.js";
import { ModalController } from "../components/ModalError/controller/modalController.js";

import { modalIconsOk } from "../components/ModalOk/icons/modal_icons.js";
import { OkModel } from "../components/ModalOk/model/okModel.js";
import { OkView } from "../components/ModalOk/view/okView.js";
import { OkController } from "../components/ModalOk/controller/okController.js";

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

  /**
   * @method modalOkComponent
   * @description
   * Instancia y ensambla el componente ModalOk completo (MVC).
   * Retorna el elemento DOM del modal y su controlador.
   *
   * @returns {{ element: HTMLElement, controller: OkController }}
   */
  static modalOkComponent() {
    const view = new OkView(modalIconsOk);
    const model = new OkModel();
    const controller = new OkController(view, model);

    const element = view.renderModal();
    controller.modalEventHandler();

    return { element, controller };
  }
}

"use strict";

import { UsuariosView } from "../components/Usuarios/view/usuariosView.js";
import { UsuariosModel } from "../components/Usuarios/model/usuariosModel.js";
import { SessionStorage } from "../components/Storage/storage.js";
import { UsuariosController } from "../components/Usuarios/controller/usuariosController.js";
import { AuthController } from "../components/Auth/controller/authController.js";
import { SidebarFactory } from "./sidebar_factory.js";
import { ModalFactory } from "./modal_factory.js";
import { icons } from "../components/Dashboard/icons/svg_icons.js";
import { ModalAgregarUsuarioFactory } from "./modal_agregar_usuario_factory.js";

export class UsuariosFactory {
  /**
   * @method usuariosComponent
   * @description Crea e inicializa todo el árbol MVC de la página de Usuarios.
   * @returns {Object} Objeto conteniendo el elemento HTML y el controlador.
   */
  static async usuariosComponent() {
    const { element: modalErrorElement, controller: modalErrorController } =
      ModalFactory.modalComponent();

    // Rescatar ModalOk
    const { element: modalOkElement, controller: modalOkController } =
      ModalFactory.modalOkComponent();

    // Ensamblar Modal Agregar Usuario (Inyectando globales)
    const { element: modalAddElement, controller: modalAddController } =
      ModalAgregarUsuarioFactory.createModal(
        modalOkController,
        modalErrorController,
      );

    const sidebarController = SidebarFactory.createSidebar();

    const view = new UsuariosView(icons);
    const model = new UsuariosModel();
    const storage = new SessionStorage();
    const auth = new AuthController();

    const controller = new UsuariosController(
      view,
      model,
      storage,
      auth,
      modalErrorController,
      sidebarController,
      modalAddController,
    );

    const element = await controller.init();

    return {
      element,
      modalError: modalErrorElement,
      modalOk: modalOkElement,
      modalAdd: modalAddElement,
      controller,
    };
  }
}

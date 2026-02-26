"use strict";

import { icons } from "../components/LoginForm/icons/svg_icons.js";
import { LoginController } from "../components/LoginForm/controller/loginController.js";
import { LoginView } from "../components/LoginForm/view/loginView.js";
import { LoginModel } from "../components/LoginForm/model/loginModel.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";
import { ModalFactory } from "./modal_factory.js";

export class LoginFactory {
  // Constructor no longer needed.
  static loginComponent() {
    // Modal (created first so controller can be injected into Login)
    const { element: modalElement, controller: modalController } =
      ModalFactory.modalComponent();

    // Login
    const view = new LoginView(icons);
    const model = new LoginModel();
    const validator = new FieldsValidator();
    const controller = new LoginController(view, model, validator, modalController);

    // Login DOM element
    const htmlLoginForm = view.renderLoginForm();

    // Binding Events
    controller.loginEventHandler();

    // Return both elements for main.js to mount
    return { form: htmlLoginForm, modal: modalElement };
  }
}

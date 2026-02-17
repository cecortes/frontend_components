"use strict";

import { icons } from "../components/LoginForm/icons/svg_icons";
import { LoginController } from "../components/LoginForm/controller/loginController";
import { LoginView } from "../components/LoginForm/view/loginView";
import { FieldsValidator } from "../components/Validator/fieldsValidator";

export class LoginFactory {
  // Constructor no longer needed.
  static loginComponent() {
    const view = new LoginView(icons);
    const validator = new FieldsValidator();
    const controller = new LoginController(view, validator);

    // Login DOM element
    const htmlLoginForm = view.renderLoginForm();

    // Binding Events
    controller.loginEventHandler();

    // HTML DOM
    return htmlLoginForm;
  }
}

"use strict";

import { icons } from "../icons/svg_icons";
import { LoginController } from "../components/LoginForm/controller/loginController";
import { LoginView } from "../components/LoginForm/view/loginView";

export class LoginFactory {
  // Constructor no longer needed.
  static loginComponent() {
    const view = new LoginView(icons);
    const controller = new LoginController(view);

    // Login DOM element
    const htmlLoginForm = view.renderLoginForm();

    // Binding Events
    controller.loginEventHandler();

    // HTML DOM
    return htmlLoginForm;
  }
}

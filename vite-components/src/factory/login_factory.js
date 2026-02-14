"use strict";

import { icons } from "../icons/svg_icons";
// Import controller for the particulary component.
import { LoginView } from "../components/LoginForm/view/loginView";

export class LoginFactory {
  // Constructor no longer needed.
  static logingComponent() {
    const view = new LoginView(icons);
    // Instamce controller.
    const htmlLoginForm = view.renderLoginForm();
    // Event Binding
    return htmlLoginForm;
  }
}

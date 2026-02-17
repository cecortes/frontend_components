"use strict";

export class LoginController {
  constructor(view, fieldsValidator) {
    this.view = view;
    this.validator = fieldsValidator;
  }

  loginEventHandler() {
    // Destructuring values from LoginElements
    const {
      $logoTitle,
      $logoSubTitle,
      $form,
      $userInput,
      $passInput,
      $togglePassBtn,
      $loginBtn,
      $recoverPassLink,
      $userError,
      $passError,
    } = this.view.LoginElements;

    $logoTitle.addEventListener("click", ($logoTitle) => {
      $logoTitle.target.innerText = "Obligatorio usar Target";
      console.log($logoTitle.target.innerText);
    });

    $togglePassBtn.addEventListener("click", () => {
      this.view.togglePasswordType($passInput, $togglePassBtn);
    });

    $recoverPassLink.addEventListener("click", (e) => {
      e.preventDefault();
      const recoveryLink = import.meta.env.VITE_FORGOTPASS_LINK;
      window.location.href = recoveryLink;
    });

    // Validación del campo usuario en blur
    $userInput.addEventListener("blur", (element) => {
      const userField = element.target.value;
      const validation = this.validator.validateField(userField, "user");
      
      if (!validation.isValid) {
        this.view.showValidationError($userInput, $userError, validation.message);
      } else {
        this.view.hideValidationError($userInput, $userError);
      }
    });

    // Validación del campo contraseña en blur
    $passInput.addEventListener("blur", (element) => {
      const passField = element.target.value;
      const validation = this.validator.validateField(passField, "password");
      
      if (!validation.isValid) {
        this.view.showValidationError($passInput, $passError, validation.message);
      } else {
        this.view.hideValidationError($passInput, $passError);
      }
    });
  }
}

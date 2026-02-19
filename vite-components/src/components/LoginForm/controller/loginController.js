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

      this.loginInputsPopUp(validation, $userInput, $userError);
    });

    // Validación del campo contraseña en blur
    $passInput.addEventListener("blur", (element) => {
      const passField = element.target.value;
      const validation = this.validator.validateField(passField, "password");

      this.loginInputsPopUp(validation, $passInput, $passError);
    });

    // Submit Form
    $loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const validationUser = this.validator.validateField(
        $userInput.value,
        "user",
      );
      const validationPass = this.validator.validateField(
        $passInput.value,
        "password",
      );

      this.loginInputsPopUp(validationUser, $userInput, $userError);
      this.loginInputsPopUp(validationPass, $passInput, $passError);
    });
  }

  loginInputsPopUp(validatorObject, inputElement, errElement) {
    if (!validatorObject.isValid) {
      this.view.showValidationError(
        inputElement,
        errElement,
        validatorObject.message,
      );
    } else {
      this.view.hideValidationError(inputElement, errElement);
    }
  }
}

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
    $userInput.addEventListener("blur", () => {
      const validation = this.validator.validateField($userInput);

      this.loginInputsPopUp(validation, $userInput, $userError);
    });

    // Validación del campo contraseña en blur
    $passInput.addEventListener("blur", () => {
      const validation = this.validator.validateField($passInput);

      this.loginInputsPopUp(validation, $passInput, $passError);
    });

    // Submit Form
    $loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const validationUser = this.validator.validateField($userInput);
      const validationPass = this.validator.validateField($passInput);

      const userPopUp = this.loginInputsPopUp(
        validationUser,
        $userInput,
        $userError,
      );
      const passPopUp = this.loginInputsPopUp(
        validationPass,
        $passInput,
        $passError,
      );

      if (!userPopUp || !passPopUp) return;

      console.log("Get User and PAss");
    });
  }

  loginInputsPopUp(validatorObject, inputElement, errElement) {
    if (!validatorObject.isValid) {
      this.view.showValidationError(
        inputElement,
        errElement,
        validatorObject.message,
      );
      return false;
    } else {
      this.view.hideValidationError(inputElement, errElement);
      return true;
    }
  }
}

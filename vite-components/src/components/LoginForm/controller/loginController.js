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
      const validation = this.validateInput(element.target);
      console.log(validation);

      this.loginInputsPopUp(validation, $userInput, $userError);
    });

    // Validación del campo contraseña en blur
    $passInput.addEventListener("blur", (element) => {
      const validation = this.validateInput(element.target);

      this.loginInputsPopUp(validation, $passInput, $passError);
    });

    // Submit Form
    $loginBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const validationUser = this.validateInput($userInput);
      const validationPass = this.validateInput($passInput);

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

  validateInput(element) {
    switch (element.id) {
      case "username":
        return this.validator.validateField(element.value, element);
        break;
      case "password":
        return this.validator.validateField(element.value, element);
        break;
      default:
        throw new Error("Input Element not Found!!");
    }
  }
}

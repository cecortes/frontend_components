"use strict";

export class LoginController {
  /**
   * @method constructor
   * @description
   * Inicializa el controlador de login con su vista y validador correspondientes.
   *
   * @param {LoginView} view - Instancia de la vista del formulario de login.
   * @param {LoginModel} model - Instancia del modelo para el login.
   * @param {FieldsValidator} fieldsValidator - Instancia del validador de campos.
   * @returns {void}
   * @example
   * const controller = new LoginController(new LoginView(), new FieldsValidator());
   */
  constructor(view, loginModel, fieldsValidator) {
    this.view = view;
    this.model = loginModel;
    this.validator = fieldsValidator;
  }

  /**
   * @method loginEventHandler
   * @description
   * Configura y gestiona los escuchadores de eventos para los elementos del formulario de login.
   *
   * @returns {void}
   * @example
   * loginController.loginEventHandler();
   */
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

    /**
     * @method handleLogoTitleClick
     * @description
     * Cambia el texto del título del logo al hacer clic.
     *
     * @param {PointerEvent} $logoTitle - El objeto del evento de clic.
     * @example
     * $logoTitle.addEventListener("click", ($logoTitle) => { ... });
     */
    $logoTitle.addEventListener("click", ($logoTitle) => {
      $logoTitle.target.innerText = "Obligatorio usar Target";
      console.log($logoTitle.target.innerText);
    });

    /**
     * @method handleTogglePassClick
     * @description
     * Alterna la visibilidad de la contraseña entre texto plano y asteriscos.
     *
     * @example
     * $togglePassBtn.addEventListener("click", () => { ... });
     */
    $togglePassBtn.addEventListener("click", () => {
      this.view.togglePasswordType($passInput, $togglePassBtn);
    });

    /**
     * @method handleRecoverPassClick
     * @description
     * Redirige al usuario a la página de recuperación de contraseña.
     *
     * @param {PointerEvent} e - El objeto del evento de clic.
     * @example
     * $recoverPassLink.addEventListener("click", (e) => { ... });
     */
    $recoverPassLink.addEventListener("click", (e) => {
      e.preventDefault();
      const recoveryLink = import.meta.env.VITE_FORGOTPASS_LINK;
      window.location.href = recoveryLink;
    });

    // Validación del campo usuario en blur
    /**
     * @method handleUserBlur
     * @description
     * Valida el campo de usuario cuando pierde el foco.
     *
     * @example
     * $userInput.addEventListener("blur", () => { ... });
     */
    $userInput.addEventListener("blur", () => {
      const validation = this.validator.validateField($userInput);

      this.loginInputsPopUp(validation, $userInput, $userError);
    });

    // Validación del campo contraseña en blur
    /**
     * @method handlePassBlur
     * @description
     * Valida el campo de contraseña cuando pierde el foco.
     *
     * @example
     * $passInput.addEventListener("blur", () => { ... });
     */
    $passInput.addEventListener("blur", () => {
      const validation = this.validator.validateField($passInput);

      this.loginInputsPopUp(validation, $passInput, $passError);
    });

    // Submit Form
    /**
     * @method handleLoginClick
     * @description
     * Procesa el intento de inicio de sesión validando los campos y enviando el formulario.
     *
     * @param {PointerEvent} e - El objeto del evento de clic.
     * @example
     * $loginBtn.addEventListener("click", (e) => { ... });
     */
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

      // Model service for Login
      this.handleModelLogin($userInput, $passInput);
    });
  }

  /**
   * @method loginInputsPopUp
   * @description
   * Gestiona la visualización de mensajes de error en los inputs basándose en el resultado de la validación.
   *
   * @param {Object} validatorObject - Objeto que contiene el estado de validación (isValid y message).
   * @param {HTMLElement} inputElement - El elemento input del DOM que se está validando.
   * @param {HTMLElement} errElement - El elemento del DOM donde se mostrará el error.
   * @returns {boolean} - Retorna true si el campo es válido, false en caso contrario.
   * @example
   * const isValid = loginController.loginInputsPopUp(validation, $userInput, $userError);
   */
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

  handleModelLogin(userInput, passInput) {
    // Get user and password
    const userData = userInput.value;
    const passData = passInput.value;
    console.log(userData, passData);
  }
}

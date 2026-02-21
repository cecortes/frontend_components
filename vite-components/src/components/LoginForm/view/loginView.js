"use strict";

export class LoginView {
  /**
   * @method constructor
   * @description
   * Inicializa la clase LoginView con los iconos SVG necesarios para el formulario.
   *
   * @param {Object} icons - Objeto que contiene los iconos SVG para el formulario (logo, user, lock, eye, eyeOff)
   * @returns {void}
   */
  constructor(icons) {
    this.icons = icons;
    this.element = null; // Aquí guardaremos la referencia al DOM
  }

  /**
   * @method renderLoginForm
   * @description
   * Renderiza y retorna el formulario de login como elemento DOM.
   *
   * @returns {HTMLElement} - El elemento div.container del formulario de login
   */
  renderLoginForm() {
    const html = `
      <div class="login-container">
      <div class="login-card">
        <!-- Logo Section -->
        <div class="logo-section">
          <div class="logo-placeholder">
            ${this.icons.logo}
          </div>
          <h1 class="logo-title" id="logoTitle">WARESmart</h1>
          <p class="logo-subtitle" id="logoSubTitle">Control de Inventarios</p>
        </div>

        <!-- Login Form -->
        <form class="login-form" id="loginForm">
        
          <!-- Usuario Input -->
          <div class="input-group">
            <label for="username" class="input-label">Usuario</label>
            <div class="input-wrapper">
              <span class="input-icon">
                ${this.icons.user}
              </span>
              <input 
                type="text" 
                id="username" 
                name="username" 
                class="input-field" 
                placeholder="Ingresa tu usuario"
                autocomplete="username"
                required
              />
              <div class="validation-tooltip" id="usernameError" role="alert" aria-live="polite"></div>
            </div>
          </div>

          <!-- Contraseña Input -->
          <div class="input-group">
            <label for="password" class="input-label">Contraseña</label>
            <div class="input-wrapper">
              <span class="input-icon">
                ${this.icons.lock}
              </span>
              <input 
                type="password" 
                id="password" 
                name="password" 
                class="input-field" 
                placeholder="Ingresa tu contraseña"
                autocomplete="current-password"
                required
              />
              <button type="button" class="toggle-password" id="togglePassword" aria-label="Mostrar contraseña">
                ${this.icons.eye}
              </button>
              <div class="validation-tooltip" id="passwordError" role="alert" aria-live="polite"></div>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn-login" id="loginButton">
            Iniciar Sesión
          </button>

          <!-- Forgot Password Link -->
          <div class="forgot-password">
            <a href="#" class="forgot-link" id="forgotPasswordLink">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

        </form>

        <!-- Footer -->
        <div class="login-footer">
          <p class="footer-text">© 2026 WARESmart. Todos los derechos reservados.</p>
          <p class="footer-author">Made with 🤓 by <a href="https://www.cesarlopezcortes.com/" target="_blank" rel="noopener noreferrer" class="author-link">César López</a></p>
        </div>

      </div>
    </div>
    `;

    // Convertimos el string en un nodo real de DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.element = doc.body.firstElementChild;

    return this.element;
  }

  /**
   * @method LoginElements
   * @description
   * Retorna un objeto con todas las referencias a elementos del DOM.
   *
   * @returns {Object} - Objeto con las referencias a los elementos del DOM ($logoTitle, $logoSubTitle, $form, $userInput, $passInput, $togglePassBtn, $loginBtn, $recoverPassLink, $userError, $passError)
   */
  get LoginElements() {
    return {
      $logoTitle: this.element.querySelector("#logoTitle"),
      $logoSubTitle: this.element.querySelector("#logoSubTitle"),
      $form: this.element.querySelector("#loginForm"),
      $userInput: this.element.querySelector("#username"),
      $passInput: this.element.querySelector("#password"),
      $togglePassBtn: this.element.querySelector("#togglePassword"),
      $loginBtn: this.element.querySelector("#loginButton"),
      $recoverPassLink: this.element.querySelector("#forgotPasswordLink"),
      $userError: this.element.querySelector("#usernameError"),
      $passError: this.element.querySelector("#passwordError"),
    };
  }

  /**
   * @method togglePasswordType
   * @description
   * Alterna el tipo de input entre password y text para mostrar/ocultar la contraseña.
   *
   * @param {HTMLInputElement} toggleInput - El elemento input de contraseña
   * @param {HTMLElement} toggleElement - El elemento botón que contiene el icono del ojo
   * @returns {void}
   */
  togglePasswordType(toggleInput, toggleElement) {
    const elementWithIcon = toggleElement;
    const input = toggleInput;

    if (input.type === "password") {
      elementWithIcon.innerHTML = this.icons.eyeOff;
      input.type = "text";
    } else {
      elementWithIcon.innerHTML = this.icons.eye;
      input.type = "password";
    }
  }

  /**
   * @method showValidationError
   * @description
   * Muestra el error de validación para un campo del formulario.
   *
   * @param {HTMLInputElement} inputElement - El elemento input del campo
   * @param {HTMLElement} errorElement - El elemento del tooltip de error
   * @param {string} message - El mensaje de error a mostrar
   * @returns {void}
   */
  showValidationError(inputElement, errorElement, message) {
    // Añadir clase de error al input
    inputElement.classList.add("input-error");

    // Mostrar el tooltip con el mensaje
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  /**
   * @method hideValidationError
   * @description
   * Oculta el error de validación para un campo del formulario.
   *
   * @param {HTMLInputElement} inputElement - El elemento input del campo
   * @param {HTMLElement} errorElement - El elemento del tooltip de error
   * @returns {void}
   */
  hideValidationError(inputElement, errorElement) {
    // Remover clase de error del input
    inputElement.classList.remove("input-error");

    // Ocultar el tooltip
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

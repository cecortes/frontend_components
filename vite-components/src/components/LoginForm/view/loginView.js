"use strict";

/**
 *
 */
export class LoginView {
  constructor(icons) {
    this.icons = icons;
    this.element = null; // Aquí guardaremos la referencia al DOM
  }

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
    };
  }

  togglePasswordType() {
    const input = this.ui.passInput;
    input.type = input.type === "password" ? "text" : "password";
  }
}

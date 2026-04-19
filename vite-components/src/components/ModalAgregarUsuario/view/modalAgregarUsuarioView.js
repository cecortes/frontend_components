"use strict";

export class ModalAgregarUsuarioView {
  constructor(icons = {}) {
    this.icons = icons;
    this.element = null;
  }

  renderModal() {
    const userPlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>`;

    const html = `
      <div class="modal-overlay" id="modalAddOverlay" role="dialog" aria-modal="true" aria-labelledby="modalAddTitle" aria-hidden="true">
        <div class="modal-card" id="modalAddCard" style="border-top: 3px solid var(--color-primary-500); width: 100%; max-width: 480px;">
          
          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalAddCloseBtn" aria-label="Cerrar modal">
            ${this.icons.close || "✕"}
          </button>

          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background-color: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-primary-500);">
                ${this.icons.add || userPlusIcon}
            </div>
            <h3 class="modal-title" id="modalAddTitle" style="margin: 0; font-size: 1.25rem;">Agregar Nuevo Usuario</h3>
          </div>

          <!-- Content / Form -->
          <div class="modal-content" style="text-align: left; margin-bottom: 2rem;">
            <form id="formAgregarUsuario" style="display: flex; flex-direction: column; gap: 1rem;" novalidate>
                
                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addUsrUser" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Usuario</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addUsrUser" class="input-field" placeholder="Ej. aperez" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addUsrUserError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addUsrName" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Nombre Completo</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addUsrName" class="input-field" placeholder="Ej. Ana Pérez" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addUsrNameError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addUsrMail" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Correo Electrónico</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addUsrMail" class="input-field" placeholder="ejemplo@correo.com" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addUsrMailError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addUsrRole" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Rol</label>
                    <select id="addUsrRole" class="input-field" style="width: 100%; box-sizing: border-box; padding: 0.5rem 0.75rem; font-size: 0.875rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);">
                        <option value="" disabled selected>Selecciona un rol</option>
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                        <option value="guess">guess</option>
                    </select>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addUsrPassword" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Contraseña</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="password" id="addUsrPassword" class="input-field" placeholder="Define una contraseña" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <button type="button" class="toggle-password" id="addUsrTogglePassword" aria-label="Mostrar contraseña">
                          ${this.icons.eye}
                        </button>
                        <div class="validation-tooltip" id="addUsrPasswordError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

            </form>
          </div>

          <!-- Actions -->
          <div style="display: flex; justify-content: space-between; gap: 1rem;">
            <button type="button" class="btn btn-secondary" id="modalAddCancelBtn" style="padding: 4px 16px; font-size: 1rem;">
                Cancelar
            </button>
            <button type="submit" form="formAgregarUsuario" class="btn btn-primary" id="modalAddSaveBtn" style="padding: 4px 16px; font-size: 1rem;">
                Guardar Usuario
            </button>
          </div>

        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.element = doc.body.firstElementChild;
    return this.element;
  }

  get ModalElements() {
    return {
      $overlay: this.element,
      $card: this.element.querySelector("#modalAddCard"),
      $closeBtn: this.element.querySelector("#modalAddCloseBtn"),
      $cancelBtn: this.element.querySelector("#modalAddCancelBtn"),
      $form: this.element.querySelector("#formAgregarUsuario"),
      $inputUser: this.element.querySelector("#addUsrUser"),
      $inputName: this.element.querySelector("#addUsrName"),
      $inputMail: this.element.querySelector("#addUsrMail"),
      $inputRole: this.element.querySelector("#addUsrRole"),
      $inputPassword: this.element.querySelector("#addUsrPassword"),
      $togglePassBtn: this.element.querySelector("#addUsrTogglePassword"),
      $userError: this.element.querySelector("#addUsrUserError"),
      $nameError: this.element.querySelector("#addUsrNameError"),
      $mailError: this.element.querySelector("#addUsrMailError"),
      $passwordError: this.element.querySelector("#addUsrPasswordError"),
    };
  }

  show() {
    const { $overlay, $form } = this.ModalElements;
    $overlay.classList.add("modal-visible");
    $overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $form.reset();
  }

  hide() {
    const { $overlay } = this.ModalElements;
    $overlay.classList.remove("modal-visible");
    $overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

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

  showValidationError(inputElement, errorElement, message) {
    if (inputElement) inputElement.classList.add("input-error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("show");
    }
  }

  hideValidationError(inputElement, errorElement) {
    if (inputElement) inputElement.classList.remove("input-error");
    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
    }
  }
}

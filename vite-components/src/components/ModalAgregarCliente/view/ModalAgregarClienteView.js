"use strict";

export class ModalAgregarClienteView {
  constructor(icons = {}) {
    this.icons = icons;
    this.element = null;
  }

  renderModal() {
    const userPlusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>`;

    const html = `
      <div class="modal-overlay" id="modalAddClientOverlay" role="dialog" aria-modal="true" aria-labelledby="modalAddClientTitle" aria-hidden="true">
        <div class="modal-card" id="modalAddClientCard" style="border-top: 3px solid var(--color-primary-500); width: 100%; max-width: 480px;">
          
          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalAddClientCloseBtn" aria-label="Cerrar modal">
            ${this.icons.close || "✕"}
          </button>

          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background-color: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-primary-500);">
                ${this.icons.add || userPlusIcon}
            </div>
            <h3 class="modal-title" id="modalAddClientTitle" style="margin: 0; font-size: 1.25rem;">Agregar Nuevo Cliente</h3>
          </div>

          <!-- Content / Form -->
          <div class="modal-content" style="text-align: left; margin-bottom: 2rem;">
            <form id="formAgregarCliente" style="display: flex; flex-direction: column; gap: 1rem;" novalidate>
                
                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteNombre" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Nombre</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteNombre" class="input-field" placeholder="Ej. Empresa SA" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteNombreError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteCorreo" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Correo Electrónico</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteCorreo" class="input-field" placeholder="ejemplo@correo.com" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteCorreoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteTelefono" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Teléfono</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteTelefono" class="input-field" placeholder="555-1234" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteTelefonoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteRfc" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">RFC</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteRfc" class="input-field" placeholder="RFC123456789" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteRfcError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteDireccion" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Dirección</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteDireccion" class="input-field" placeholder="Calle Falsa 123" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteDireccionError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="addClienteContacto" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Contacto</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="addClienteContacto" class="input-field" placeholder="Nombre de contacto" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="addClienteContactoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <!-- Actions -->
                <div style="display: flex; justify-content: space-between; gap: 1rem; margin-top: 1rem;">
                  <button type="button" class="btn btn-secondary" id="modalAddClientCancelBtn" style="padding: 4px 16px; font-size: 1rem;">
                      Cancelar
                  </button>
                  <button type="submit" class="btn btn-primary" id="modalAddClientSaveBtn" style="padding: 4px 16px; font-size: 1rem;">
                      Guardar Cliente
                  </button>
                </div>

            </form>
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
      $card: this.element.querySelector("#modalAddClientCard"),
      $closeBtn: this.element.querySelector("#modalAddClientCloseBtn"),
      $cancelBtn: this.element.querySelector("#modalAddClientCancelBtn"),
      $form: this.element.querySelector("#formAgregarCliente"),
      
      $inputNombre: this.element.querySelector("#addClienteNombre"),
      $inputCorreo: this.element.querySelector("#addClienteCorreo"),
      $inputTelefono: this.element.querySelector("#addClienteTelefono"),
      $inputRfc: this.element.querySelector("#addClienteRfc"),
      $inputDireccion: this.element.querySelector("#addClienteDireccion"),
      $inputContacto: this.element.querySelector("#addClienteContacto"),
      
      $nombreError: this.element.querySelector("#addClienteNombreError"),
      $correoError: this.element.querySelector("#addClienteCorreoError"),
      $telefonoError: this.element.querySelector("#addClienteTelefonoError"),
      $rfcError: this.element.querySelector("#addClienteRfcError"),
      $direccionError: this.element.querySelector("#addClienteDireccionError"),
      $contactoError: this.element.querySelector("#addClienteContactoError"),
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

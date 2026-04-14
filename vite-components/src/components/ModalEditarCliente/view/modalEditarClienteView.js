"use strict";

export class ModalEditarClienteView {
  constructor(icons) {
    this.icons = icons;
    this.element = null;
  }

  renderModal() {
    const html = `
      <div class="modal-overlay" id="modalEditClientOverlay" role="dialog" aria-modal="true" aria-labelledby="modalEditClientTitle" aria-hidden="true">
        <div class="modal-card" id="modalEditClientCard">
          
          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalEditClientCloseBtn" aria-label="Cerrar modal">
            ${this.icons.close}
          </button>

          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background-color: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-primary-500);">
                ${this.icons.edit}
            </div>
            <h3 class="modal-title" id="modalEditClientTitle" style="margin: 0; font-size: 1.25rem;">Editar Cliente</h3>
          </div>

          <!-- Content / Form -->
          <div class="modal-content" style="text-align: left; margin-bottom: 2rem;">
            <form id="formEditarCliente" style="display: flex; flex-direction: column; gap: 1rem;">
                
                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteNombre" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Nombre</label>
                    <div class="input-wrapper" style="position: relative;">
                        <!-- CRITICAL: type="text" even for emails or names -->
                        <input type="text" id="editClienteNombre" class="input-field" placeholder="Ej. Empresa SA" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteNombreError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteCorreo" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Correo Electrónico</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="editClienteCorreo" class="input-field" placeholder="ejemplo@correo.com" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteCorreoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteTelefono" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Teléfono</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="editClienteTelefono" class="input-field" placeholder="555-1234" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteTelefonoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteRfc" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">RFC</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="editClienteRfc" class="input-field" placeholder="RFC123456789" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteRfcError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteDireccion" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Dirección</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="editClienteDireccion" class="input-field" placeholder="Calle Falsa 123" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteDireccionError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editClienteContacto" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Contacto</label>
                    <div class="input-wrapper" style="position: relative;">
                        <input type="text" id="editClienteContacto" class="input-field" placeholder="Nombre de contacto" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                        <div class="validation-tooltip" id="editClienteContactoError" role="alert" aria-live="polite"></div>
                    </div>
                </div>

            </form>
          </div>

          <!-- Actions -->
          <div style="display: flex; justify-content: space-between; gap: 1rem;">
            <button type="button" class="btn btn-danger" id="modalEditClientCancelBtn" style="padding: 4px 16px; font-size: 1rem;">
                Cancelar
            </button>
            <button type="submit" form="formEditarCliente" class="btn btn-primary" id="modalEditClientSaveBtn" style="padding: 4px 16px; font-size: 1rem;">
                Aplicar
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
      $card: this.element.querySelector("#modalEditClientCard"),
      $closeBtn: this.element.querySelector("#modalEditClientCloseBtn"),
      $cancelBtn: this.element.querySelector("#modalEditClientCancelBtn"),
      $form: this.element.querySelector("#formEditarCliente"),

      $inputNombre: this.element.querySelector("#editClienteNombre"),
      $inputCorreo: this.element.querySelector("#editClienteCorreo"),
      $inputTelefono: this.element.querySelector("#editClienteTelefono"),
      $inputRfc: this.element.querySelector("#editClienteRfc"),
      $inputDireccion: this.element.querySelector("#editClienteDireccion"),
      $inputContacto: this.element.querySelector("#editClienteContacto"),

      $nombreError: this.element.querySelector("#editClienteNombreError"),
      $correoError: this.element.querySelector("#editClienteCorreoError"),
      $telefonoError: this.element.querySelector("#editClienteTelefonoError"),
      $rfcError: this.element.querySelector("#editClienteRfcError"),
      $direccionError: this.element.querySelector("#editClienteDireccionError"),
      $contactoError: this.element.querySelector("#editClienteContactoError"),
    };
  }

  /**
   * Muestra el modal populando los datos del cliente
   */
  show(clientData) {
    const {
      $overlay,
      $inputNombre,
      $inputCorreo,
      $inputTelefono,
      $inputRfc,
      $inputDireccion,
      $inputContacto,
    } = this.ModalElements;

    // Populate form
    $inputNombre.value = clientData.nombre || "";
    $inputCorreo.value = clientData.correo || "";
    $inputTelefono.value = clientData.telefono || "";
    $inputRfc.value = clientData.rfc || "";
    $inputDireccion.value = clientData.direccion || "";
    $inputContacto.value = clientData.contacto || "";

    $overlay.classList.add("modal-visible");
    $overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  hide() {
    const { $overlay, $form } = this.ModalElements;

    $overlay.classList.remove("modal-visible");
    $overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    $form.reset();
  }

  showValidationError(inputElement, errorElement, message) {
    inputElement.classList.add("input-error");
    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  hideValidationError(inputElement, errorElement) {
    inputElement.classList.remove("input-error");
    errorElement.textContent = "";
    errorElement.classList.remove("show");
  }
}

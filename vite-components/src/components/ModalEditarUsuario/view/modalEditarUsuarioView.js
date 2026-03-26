"use strict";

export class ModalEditarUsuarioView {
  constructor(icons) {
    this.icons = icons;
    this.element = null;
  }

  renderModal() {
    const html = `
      <div class="modal-overlay" id="modalEditOverlay" role="dialog" aria-modal="true" aria-labelledby="modalEditTitle" aria-hidden="true">
        <div class="modal-card" id="modalEditCard">
          
          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalEditCloseBtn" aria-label="Cerrar modal">
            ${this.icons.close}
          </button>

          <!-- Header -->
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1.5rem;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background-color: var(--color-surface); display: flex; align-items: center; justify-content: center; color: var(--color-primary-500);">
                ${this.icons.edit}
            </div>
            <h3 class="modal-title" id="modalEditTitle" style="margin: 0; font-size: 1.25rem;">Editar Usuario</h3>
          </div>

          <!-- Content / Form -->
          <div class="modal-content" style="text-align: left; margin-bottom: 2rem;">
            <form id="formEditarUsuario" style="display: flex; flex-direction: column; gap: 1rem;">
                
                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editNombre" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Nombre Completo</label>
                    <input type="text" id="editNombre" class="input-field" placeholder="Ej. Juan Pérez" required style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editMail" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Correo Electrónico</label>
                    <input type="email" id="editMail" class="input-field" placeholder="ejemplo@correo.com" required style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);" />
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editUsuario" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Nombre de Usuario</label>
                    <input type="text" id="editUsuario" class="input-field" disabled placeholder="usuario123" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1px solid var(--color-border-subtle); border-radius: 8px; background-color: var(--color-background-secondary); color: var(--color-text-muted); cursor: not-allowed;" />
                </div>

                <div class="input-group" style="margin-bottom: 0;">
                    <label for="editRol" style="display: block; margin-bottom: 6px; font-size: 0.875rem; color: var(--color-text-secondary);">Rol</label>
                    <select id="editRol" class="input-field" style="width: 100%; box-sizing: border-box; padding: 0.5rem 0.75rem; font-size: 0.875rem; border: 1px solid var(--color-border-default); border-radius: 8px; background-color: var(--color-background-primary); color: var(--color-text-primary);">
                        <option value="Administrador">Administrador</option>
                        <option value="Usuario">Usuario</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Consultor">Consultor</option>
                    </select>
                </div>

            </form>
          </div>

          <!-- Actions -->
          <div style="display: flex; justify-content: space-between; gap: 1rem;">
            <button type="button" class="btn btn-danger" id="modalEditCancelBtn" style="padding: 4px 16px; font-size: 1rem;">
                Cancelar
            </button>
            <button type="submit" form="formEditarUsuario" class="btn btn-primary" id="modalEditSaveBtn" style="padding: 4px 16px; font-size: 1rem;">
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
      $card: this.element.querySelector("#modalEditCard"),
      $closeBtn: this.element.querySelector("#modalEditCloseBtn"),
      $cancelBtn: this.element.querySelector("#modalEditCancelBtn"),
      $form: this.element.querySelector("#formEditarUsuario"),
      $inputNombre: this.element.querySelector("#editNombre"),
      $inputMail: this.element.querySelector("#editMail"),
      $inputUsuario: this.element.querySelector("#editUsuario"),
      $selectRol: this.element.querySelector("#editRol"),
    };
  }

  /**
   * Muestra el modal populando los datos del usuario en los inputs
   */
  show(userData) {
    const { $overlay, $inputNombre, $inputMail, $inputUsuario, $selectRol } =
      this.ModalElements;

    // Populate form
    $inputNombre.value = userData.nombre || "";
    $inputMail.value = userData.mail || "";
    $inputUsuario.value = userData.usuario || "";

    if (userData.rol) {
      $selectRol.value = userData.rol;
    }

    $overlay.classList.add("modal-visible");
    $overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  hide() {
    const { $overlay, $form } = this.ModalElements;

    $overlay.classList.remove("modal-visible");
    $overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    // Opcional: limpiar el formulario al cerrar
    $form.reset();
  }
}

"use strict";

export class ModalBorrarUsuarioView {
  constructor(icons) {
    this.icons = icons;
    this.element = null;
  }

  /**
   * Genera y retorna el HTML del modal a partir de template literals.
   * @returns {string} String con el HTML del componente
   */
  renderModal() {
    const html = `
      <div id="modal-borrar-usuario" class="modal-overlay" style="display: none; align-items: center; justify-content: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; background-color: rgba(0,0,0,0.5);">
        <div class="modal-card ui-layer" id="modal-borrar-card" style="width: 100%; max-width: 400px; padding: 1.5rem; position: relative;">
          
          <button id="modal-borrar-close-btn" class="modal-close-btn" aria-label="Cerrar modal" style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; cursor: pointer; color: var(--text-color);">
            ${this.icons.close}
          </button>
          
          <div class="modal-content">
            <h2 class="text-xl font-bold mb-4" style="text-align: center;">Eliminar Usuario</h2>
            
            <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; gap: 1rem; text-align: center;">
              <div style="width: 48px; height: 48px; border-radius: 50%; background-color: var(--color-critical-500); display: flex; align-items: center; justify-content: center; color: white;">
                 ${this.icons.warning}
              </div>
              <p style="font-size: 1rem; color: var(--text-color);">
                ¿Estás seguro que deseas eliminar al usuario <strong id="modal-borrar-nombre" style="color: var(--color-primary);">[Nombre]</strong>?
              </p>
              <p style="font-size: 0.875rem; color: var(--text-color-muted); margin-top: -0.5rem;">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div style="display: flex; justify-content: space-between; gap: 1rem;">
              <button id="modal-borrar-cancel-btn" type="button" class="btn btn-danger" style="padding: 4px 16px; font-size: 1rem;">
                Cancelar
              </button>
              <button id="modal-borrar-confirm-btn" type="button" class="btn btn-primary" style="padding: 4px 16px; font-size: 1rem;">
                Eliminar
              </button>
            </div>
            
          </div>
        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.element = doc.body.firstElementChild;

    return this.element;
  }

  /**
   * Captura y almacena las referencias al DOM asociadas a la raíz de this.element.
   */
  get ModalElements() {
    return {
      $overlay: this.element,
      $card: this.element.querySelector("#modal-borrar-card"),
      $closeBtn: this.element.querySelector("#modal-borrar-close-btn"),
      $cancelBtn: this.element.querySelector("#modal-borrar-cancel-btn"),
      $confirmBtn: this.element.querySelector("#modal-borrar-confirm-btn"),
      $textoNombre: this.element.querySelector("#modal-borrar-nombre"),
    };
  }

  /**
   * Muestra el modal inyectando los datos correspondientes.
   * @param {Object} userData
   */
  show(userData) {
    // Inyectar el nombre o el usuario para mostrar en el texto
    const nombreMostrar =
      userData && userData.nombre
        ? userData.nombre
        : userData.usuario || "Seleccionado";
    this.ModalElements.$textoNombre.textContent = nombreMostrar;

    this.ModalElements.$overlay.style.display = "flex";
    this.ModalElements.$overlay.classList.add("modal-visible");
    this.ModalElements.$overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  /**
   * Oculta el modal reseteando el contenido dinámico.
   */
  hide() {
    if (!this.element) return;
    this.ModalElements.$overlay.style.display = "none";
    this.ModalElements.$overlay.classList.remove("modal-visible");
    this.ModalElements.$overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    this.ModalElements.$textoNombre.textContent = "";
  }
}

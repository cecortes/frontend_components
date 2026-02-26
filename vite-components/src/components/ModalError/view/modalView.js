"use strict";

export class ModalView {
  /**
   * @method constructor
   * @description
   * Inicializa la vista del modal con los iconos SVG necesarios.
   *
   * @param {Object} icons - Objeto con los iconos SVG del modal (error, close).
   * @returns {void}
   */
  constructor(icons) {
    this.icons = icons;
    this.element = null;
  }

  /**
   * @method renderModal
   * @description
   * Renderiza y retorna el modal como elemento DOM.
   *
   * @returns {HTMLElement} - El elemento raíz del modal (overlay).
   */
  renderModal() {
    const html = `
      <div class="modal-overlay" id="modalOverlay" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-hidden="true">
        <div class="modal-card" id="modalCard">

          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalCloseBtn" aria-label="Cerrar modal">
            ${this.icons.close}
          </button>

          <!-- Error Icon -->
          <div class="modal-icon-wrapper">
            ${this.icons.error}
          </div>

          <!-- Content -->
          <div class="modal-content">
            <h3 class="modal-title" id="modalTitle">Error de autenticación</h3>
            <p class="modal-message" id="modalMessage"></p>
          </div>

          <!-- Action Button -->
          <button type="button" class="modal-action-btn" id="modalActionBtn">
            Entendido
          </button>

        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    this.element = doc.body.firstElementChild;

    return this.element;
  }

  /**
   * @method ModalElements
   * @description
   * Retorna un objeto con todas las referencias a elementos del DOM del modal.
   *
   * @returns {Object} - Objeto con referencias a $overlay, $card, $closeBtn, $message, $actionBtn.
   */
  get ModalElements() {
    return {
      $overlay: this.element,
      $card: this.element.querySelector("#modalCard"),
      $closeBtn: this.element.querySelector("#modalCloseBtn"),
      $message: this.element.querySelector("#modalMessage"),
      $actionBtn: this.element.querySelector("#modalActionBtn"),
    };
  }

  /**
   * @method show
   * @description
   * Muestra el modal con el mensaje de error proporcionado.
   *
   * @param {string} message - El mensaje de error a mostrar.
   * @returns {void}
   */
  show(message) {
    const { $overlay, $message } = this.ModalElements;

    $message.textContent = message;
    $overlay.classList.add("modal-visible");
    $overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  /**
   * @method hide
   * @description
   * Oculta el modal.
   *
   * @returns {void}
   */
  hide() {
    const { $overlay } = this.ModalElements;

    $overlay.classList.remove("modal-visible");
    $overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
}

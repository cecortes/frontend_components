"use strict";

export class OkView {
  /**
   * @method constructor
   * @description
   * Inicializa la vista del modal de éxito con los iconos SVG necesarios.
   *
   * @param {Object} icons - Objeto con los iconos SVG del modal (ok, close).
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
      <div class="modal-overlay" id="modalOverlayOk" role="dialog" aria-modal="true" aria-labelledby="modalTitleOk" aria-hidden="true">
        <div class="modal-card modal-card-ok" id="modalCardOk">

          <!-- Close Button -->
          <button type="button" class="modal-close-btn" id="modalCloseBtnOk" aria-label="Cerrar modal">
            ${this.icons.close}
          </button>

          <!-- Success/Ok Icon -->
          <div class="modal-icon-wrapper modal-icon-wrapper-ok">
            ${this.icons.ok}
          </div>

          <!-- Content -->
          <div class="modal-content">
            <h3 class="modal-title" id="modalTitleOk">Operación Exitosa</h3>
            <p class="modal-message" id="modalMessageOk"></p>
          </div>

          <!-- Action Button -->
          <button type="button" class="modal-action-btn modal-action-btn-ok" id="modalActionBtnOk">
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
      $card: this.element.querySelector("#modalCardOk"),
      $closeBtn: this.element.querySelector("#modalCloseBtnOk"),
      $message: this.element.querySelector("#modalMessageOk"),
      $actionBtn: this.element.querySelector("#modalActionBtnOk"),
    };
  }

  /**
   * @method show
   * @description
   * Muestra el modal con el mensaje de éxito proporcionado.
   *
   * @param {string} message - El mensaje de éxito a mostrar.
   * @returns {void}
   */
  show(message) {
    const { $overlay, $message } = this.ModalElements;

    if ($message) $message.textContent = message;
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

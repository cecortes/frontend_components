"use strict";

export class OkController {
  /**
   * @method constructor
   * @description
   * Inicializa el controlador del modal de éxito con su vista y modelo correspondientes.
   *
   * @param {OkView} view - Instancia de la vista del modal.
   * @param {OkModel} model - Instancia del modelo del modal.
   * @returns {void}
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.onCloseCallback = null;
  }

  /**
   * @method modalEventHandler
   * @description
   * Configura y gestiona los escuchadores de eventos del modal:
   * botón cerrar, botón de acción, clic en el overlay y tecla ESC.
   *
   * @returns {void}
   */
  modalEventHandler() {
    const { $overlay, $card, $closeBtn, $actionBtn } = this.view.ModalElements;

    /**
     * @method handleCloseBtnClick
     * @description Cierra el modal al hacer clic en el botón de cierre.
     */
    if ($closeBtn) {
      $closeBtn.addEventListener("click", () => {
        this.handleClose();
      });
    }

    /**
     * @method handleActionBtnClick
     * @description Cierra el modal al hacer clic en el botón de acción.
     */
    if ($actionBtn) {
      $actionBtn.addEventListener("click", () => {
        this.handleClose();
      });
    }

    /**
     * @method handleOverlayClick
     * @description Cierra el modal al hacer clic en el overlay (fuera de la tarjeta).
     *
     * @param {PointerEvent} e - Evento de clic.
     */
    if ($overlay) {
      $overlay.addEventListener("click", (e) => {
        if ($card && !$card.contains(e.target)) {
          this.handleClose();
        }
      });
    }

    /**
     * @method handleKeyDown
     * @description Cierra el modal al presionar la tecla ESC.
     *
     * @param {KeyboardEvent} e - Evento de teclado.
     */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.model.getVisible()) {
        this.handleClose();
      }
    });
  }

  /**
   * @method handleClose
   * @description Actualiza el modelo y oculta el modal en la vista.
   *
   * @returns {void}
   */
  handleClose() {
    this.model.setVisible(false);
    this.view.hide();

    if (typeof this.onCloseCallback === "function") {
      const callback = this.onCloseCallback;
      this.onCloseCallback = null; // Limpiar antes de ejecutar
      callback();
    }
  }

  /**
   * @method showOk
   * @description
   * Método público para mostrar el modal con un mensaje de éxito.
   *
   * @param {string} message - Mensaje de éxito a mostrar.
   * @param {function|null} onClose - Callback opcional al cerrar el modal.
   * @returns {void}
   * @example
   * okController.showOk("El usuario ha sido creado.");
   */
  showOk(message, onClose = null) {
    this.onCloseCallback = onClose;
    this.model.setMessage(message);
    this.model.setVisible(true);
    this.view.show(message);
  }
}

"use strict";

export class ModalController {
  /**
   * @method constructor
   * @description
   * Inicializa el controlador del modal con su vista y modelo correspondientes.
   *
   * @param {ModalView} view - Instancia de la vista del modal.
   * @param {ModalModel} model - Instancia del modelo del modal.
   * @returns {void}
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;
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
    $closeBtn.addEventListener("click", () => {
      this.handleClose();
    });

    /**
     * @method handleActionBtnClick
     * @description Cierra el modal al hacer clic en el botón de acción.
     */
    $actionBtn.addEventListener("click", () => {
      this.handleClose();
    });

    /**
     * @method handleOverlayClick
     * @description Cierra el modal al hacer clic en el overlay (fuera de la tarjeta).
     *
     * @param {PointerEvent} e - Evento de clic.
     */
    $overlay.addEventListener("click", (e) => {
      if (!$card.contains(e.target)) {
        this.handleClose();
      }
    });

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
  }

  /**
   * @method showError
   * @description
   * Método público para mostrar el modal con un mensaje de error del backend.
   * Es llamado externamente por el LoginController.
   *
   * @param {string} message - Mensaje de error recibido del backend.
   * @returns {void}
   * @example
   * modalController.showError("INVALID_CREDENTIALS");
   */
  showError(message) {
    this.model.setMessage(message);
    this.model.setVisible(true);
    this.view.show(message);
  }
}

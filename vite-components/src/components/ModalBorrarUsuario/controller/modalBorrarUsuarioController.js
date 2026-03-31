"use strict";

export class ModalBorrarUsuarioController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.onConfirmCallback = null;
  }

  modalEventHandler() {
    const { $overlay, $card, $closeBtn, $cancelBtn, $confirmBtn } =
      this.view.ModalElements;

    // Cierra el modal al hacer clic en el botón de cierre (X)
    $closeBtn.addEventListener("click", () => {
      this.handleClose();
    });

    // Cierra el modal al hacer clic en Cancelar
    $cancelBtn.addEventListener("click", () => {
      this.handleClose();
    });

    // Cierra el modal al hacer clic fuera del card (overlay)
    $overlay.addEventListener("click", (e) => {
      if (!$card.contains(e.target)) {
        this.handleClose();
      }
    });

    // Cierra el modal con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.model.getVisible()) {
        this.handleClose();
      }
    });

    // Maneja la confirmación de la eliminación
    $confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const userData = this.model.getUserData();

      // Si existe un callback registrado para la confirmación
      if (typeof this.onConfirmCallback === "function") {
        this.onConfirmCallback(userData);
      }

      console.log(
        "[ModalBorrarUsuario] Usuario eliminado localmente:",
        userData,
      );

      // Cerrar tras confirmar
      this.handleClose();
    });
  }

  handleClose() {
    this.model.setVisible(false);
    this.view.hide();
  }

  /**
   * Muestra el modal asignando los datos y registrando el callback opcional.
   * @param {Object} userData
   * @param {Function} onConfirm
   */
  showModal(userData, onConfirm = null) {
    this.onConfirmCallback = onConfirm;
    this.model.setUserData(userData);
    this.model.setVisible(true);

    // Inyecta los datos a la vista y lo muestra
    this.view.show(userData);
  }
}

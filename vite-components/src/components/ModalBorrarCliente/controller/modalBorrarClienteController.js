"use strict";

export class ModalBorrarClienteController {
  constructor(view, model, modalErrorController, modalOkController) {
    this.view = view;
    this.model = model;
    this.modalErrorController = modalErrorController;
    this.modalOkController = modalOkController;
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
    $confirmBtn.addEventListener("click", async (e) => {
      e.preventDefault();

      const clientData = this.model.getClientData();

      try {
        const clientId = clientData.id;
        if (!clientId) {
          throw new Error(
            "No se pudo obtener el ID del cliente para enviar al servidor.",
          );
        }

        await this.model.deleteClient(clientId);

        // Si existe un callback registrado para la confirmación
        if (typeof this.onConfirmCallback === "function") {
          this.onConfirmCallback(clientData);
        }

        console.log(
          "[ModalBorrarCliente] Cliente eliminado localmente:",
          clientData,
        );

        // Cerrar tras confirmar
        this.handleClose();
        this.modalOkController.showOk("Cliente eliminado exitosamente.");
      } catch (error) {
        // Cerrar el modal y mostrar el error
        this.handleClose();
        this.modalErrorController.showError(
          error.message || "Error al eliminar cliente",
        );
      }
    });
  }

  handleClose() {
    this.model.setVisible(false);
    this.view.hide();
  }

  /**
   * Muestra el modal asignando los datos y registrando el callback opcional.
   * @param {Object} clientData
   * @param {Function} onConfirm
   */
  showModal(clientData, onConfirm = null) {
    this.onConfirmCallback = onConfirm;
    this.model.setClientData(clientData);
    this.model.setVisible(true);

    // Inyecta los datos a la vista y lo muestra
    this.view.show(clientData);
  }
}

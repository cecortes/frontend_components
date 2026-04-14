"use strict";

export class ModalEditarClienteController {
  constructor(view, model, validator, modalErrorController, modalOkController) {
    this.view = view;
    this.model = model;
    this.validator = validator;
    this.modalErrorController = modalErrorController;
    this.modalOkController = modalOkController;
    this.onSaveCallback = null;
  }

  modalEventHandler() {
    const {
      $overlay,
      $card,
      $closeBtn,
      $cancelBtn,
      $form,
      $inputNombre,
      $inputCorreo,
      $inputTelefono,
      $inputRfc,
      $inputDireccion,
      $inputContacto,
      $nombreError,
      $correoError,
      $telefonoError,
      $rfcError,
      $direccionError,
      $contactoError,
    } = this.view.ModalElements;

    // Validación de campos en blur
    $inputNombre.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputNombre),
        $inputNombre,
        $nombreError,
      );
    });
    $inputCorreo.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputCorreo),
        $inputCorreo,
        $correoError,
      );
    });
    $inputTelefono.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputTelefono),
        $inputTelefono,
        $telefonoError,
      );
    });
    $inputRfc.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputRfc),
        $inputRfc,
        $rfcError,
      );
    });
    $inputDireccion.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputDireccion),
        $inputDireccion,
        $direccionError,
      );
    });
    $inputContacto.addEventListener("blur", () => {
      this.validationPopUp(
        this.validator.validateField($inputContacto),
        $inputContacto,
        $contactoError,
      );
    });

    // Cierra el modal (X, overlay, cancel btn, esc)
    $closeBtn.addEventListener("click", () => this.handleClose());
    $cancelBtn.addEventListener("click", () => this.handleClose());
    $overlay.addEventListener("click", (e) => {
      if (!$card.contains(e.target)) this.handleClose();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.model.getVisible()) this.handleClose();
    });

    // Submit form
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const validationForms = [
        this.validationPopUp(
          this.validator.validateField($inputNombre),
          $inputNombre,
          $nombreError,
        ),
        this.validationPopUp(
          this.validator.validateField($inputCorreo),
          $inputCorreo,
          $correoError,
        ),
        this.validationPopUp(
          this.validator.validateField($inputTelefono),
          $inputTelefono,
          $telefonoError,
        ),
        this.validationPopUp(
          this.validator.validateField($inputRfc),
          $inputRfc,
          $rfcError,
        ),
        this.validationPopUp(
          this.validator.validateField($inputDireccion),
          $inputDireccion,
          $direccionError,
        ),
        this.validationPopUp(
          this.validator.validateField($inputContacto),
          $inputContacto,
          $contactoError,
        ),
      ];

      if (validationForms.some((isValid) => !isValid)) return;

      const updatedData = {
        nombre: $inputNombre.value,
        correo: $inputCorreo.value,
        telefono: $inputTelefono.value,
        rfc: $inputRfc.value,
        direccion: $inputDireccion.value,
        contacto: $inputContacto.value,
      };

      try {
        const clientId = this.model.getClientData().id;
        if (!clientId) {
          throw new Error(
            "No se pudo obtener el ID del cliente para enviar al servidor.",
          );
        }

        await this.model.updateClient(clientId, updatedData);

        this.model.setClientData(updatedData);

        if (typeof this.onSaveCallback === "function") {
          this.onSaveCallback(updatedData);
        }

        this.handleClose();
        this.modalOkController.showOk("Cliente modificado exitosamente.");
      } catch (error) {
        this.handleClose();
        this.modalErrorController.showError(
          error.message || "Error al actualizar cliente",
        );
      }
    });
  }

  handleClose() {
    this.model.setVisible(false);
    this.view.hide();
  }

  /**
   * Muestra el modal populando los datos y registrando opcionalmente un callback.
   * @param {Object} data - data for the client
   * @param {Function} onSave - Callback triggered on successful save
   */
  showModal(data, onSave = null) {
    this.onSaveCallback = onSave;
    this.model.setClientData(data);
    this.model.setVisible(true);
    this.view.show(data);
  }

  /**
   * Auxiliar visual para validation error
   */
  validationPopUp(validatorObject, inputElement, errElement) {
    if (!validatorObject.isValid) {
      this.view.showValidationError(
        inputElement,
        errElement,
        validatorObject.message,
      );
      return false;
    } else {
      this.view.hideValidationError(inputElement, errElement);
      return true;
    }
  }
}

"use strict";

export class ModalAgregarClienteController {
  constructor(view, model, validator, modalOkController, modalErrorController) {
    this.view = view;
    this.model = model;
    this.validator = validator;
    this.modalOkController = modalOkController;
    this.modalErrorController = modalErrorController;
    this.onSaveCallback = null;
  }

  start(onSave = null) {
    this.onSaveCallback = onSave;
    this.view.show();
  }

  bindEvents() {
    const {
      $overlay,
      $card,
      $inputNombre,
      $nombreError,
      $inputCorreo,
      $correoError,
      $inputTelefono,
      $telefonoError,
      $inputRfc,
      $rfcError,
      $inputDireccion,
      $direccionError,
      $inputContacto,
      $contactoError,
      $form,
      $cancelBtn,
      $closeBtn,
    } = this.view.ModalElements;

    const validateAll = () => {
      let isValid = true;

      const vNombre = this.validator.validateField($inputNombre);
      if (!this.validationPopUp(vNombre, $inputNombre, $nombreError)) isValid = false;

      const vCorreo = this.validator.validateField($inputCorreo);
      if (!this.validationPopUp(vCorreo, $inputCorreo, $correoError)) isValid = false;

      const vTelefono = this.validator.validateField($inputTelefono);
      if (!this.validationPopUp(vTelefono, $inputTelefono, $telefonoError)) isValid = false;

      const vRfc = this.validator.validateField($inputRfc);
      if (!this.validationPopUp(vRfc, $inputRfc, $rfcError)) isValid = false;

      const vDireccion = this.validator.validateField($inputDireccion);
      if (!this.validationPopUp(vDireccion, $inputDireccion, $direccionError)) isValid = false;

      const vContacto = this.validator.validateField($inputContacto);
      if (!this.validationPopUp(vContacto, $inputContacto, $contactoError)) isValid = false;

      return isValid;
    };

    $inputNombre.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputNombre), $inputNombre, $nombreError),
    );
    $inputCorreo.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputCorreo), $inputCorreo, $correoError),
    );
    $inputTelefono.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputTelefono), $inputTelefono, $telefonoError),
    );
    $inputRfc.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputRfc), $inputRfc, $rfcError),
    );
    $inputDireccion.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputDireccion), $inputDireccion, $direccionError),
    );
    $inputContacto.addEventListener("blur", () =>
      this.validationPopUp(this.validator.validateField($inputContacto), $inputContacto, $contactoError),
    );

    const handleCloseClick = () => this.handleClose();
    if ($cancelBtn) $cancelBtn.addEventListener("click", handleCloseClick);
    if ($closeBtn) $closeBtn.addEventListener("click", handleCloseClick);

    // Cierra el modal al hacer clic fuera del card (overlay)
    if ($overlay && $card) {
      $overlay.addEventListener("click", (e) => {
        if (e.target === $overlay) {
          this.handleClose();
        }
      });
    }

    // Cierra el modal con ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && $overlay?.classList.contains("modal-visible")) {
        this.handleClose();
      }
    });

    if ($form) {
      $form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!validateAll()) return;

        const data = {
          nombre: $inputNombre.value,
          correo: $inputCorreo.value,
          telefono: $inputTelefono.value,
          rfc: $inputRfc.value,
          direccion: $inputDireccion.value,
          contacto: $inputContacto.value,
        };

        try {
          const responseData = await this.model.saveCliente(data);

          if (typeof this.onSaveCallback === "function") {
            this.onSaveCallback(responseData);
          }

          this.handleClose();
          this.modalOkController.showOk(
            "Cliente registrado exitosamente.",
          );
        } catch (error) {
          this.handleClose();
          this.modalErrorController.showError(
            error.message || "Error al agregar cliente.",
          );
        }
      });
    }
  }

  validationPopUp(validatorObject, inputElement, errElement) {
    if (!validatorObject || !validatorObject.isValid) {
      this.view.showValidationError(
        inputElement,
        errElement,
        validatorObject ? validatorObject.message : "Campo requerido",
      );
      return false;
    } else {
      this.view.hideValidationError(inputElement, errElement);
      return true;
    }
  }

  handleClose() {
    this.view.hide();
  }
}

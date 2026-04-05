"use strict";

export class ModalEditarUsuarioController {
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
      $inputMail,
      $nombreError,
      $mailError,
    } = this.view.ModalElements;

    // Validación del campo nombre en blur
    $inputNombre.addEventListener("blur", () => {
      const validation = this.validator.validateField($inputNombre);
      this.validationPopUp(validation, $inputNombre, $nombreError);
    });

    // Validación del campo email en blur
    $inputMail.addEventListener("blur", () => {
      const validation = this.validator.validateField($inputMail);
      this.validationPopUp(validation, $inputMail, $mailError);
    });

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

    // Previene el submit por defecto y maneja el guardado
    $form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const {
        $inputNombre,
        $inputMail,
        $inputUsuario,
        $selectRol,
        $nombreError,
        $mailError,
      } = this.view.ModalElements;

      const validationNombre = this.validator.validateField($inputNombre);
      const validationMail = this.validator.validateField($inputMail);

      const nombrePopUp = this.validationPopUp(
        validationNombre,
        $inputNombre,
        $nombreError,
      );
      const mailPopUp = this.validationPopUp(
        validationMail,
        $inputMail,
        $mailError,
      );

      if (!nombrePopUp || !mailPopUp) return;

      const updatedData = {
        nombre: $inputNombre.value,
        mail: $inputMail.value,
        usuario: $inputUsuario.value, // Estará disabled, pero por completitud
        rol: $selectRol.value,
      };

      try {
        // Enviar datos al modelo para que los guarde en el backend
        const userId = this.model.getUserData().id;
        if (!userId) {
          throw new Error(
            "No se pudo obtener el ID del usuario para enviar al servidor.",
          );
        }

        await this.model.updateUser(userId, updatedData);

        // Actualizar datos de forma local luego de confirmar éxito
        this.model.setUserData(updatedData);

        // Si existe un callback registrado para cuando se guarde (útil para el padre)
        if (typeof this.onSaveCallback === "function") {
          this.onSaveCallback(updatedData);
        }

        // Cerrar tras guardado exitoso y mostrar mensaje
        this.handleClose();
        this.modalOkController.showOk("Usuario modificado exitosamente.");
      } catch (error) {
        this.handleClose();
        this.modalErrorController.showError(
          error.message || "Error al actualizar usuario",
        );
      }
    });
  }

  handleClose() {
    this.model.setVisible(false);
    this.view.hide();
  }

  /**
   * Muestra el modal populando los datos y registrando opcionalmente un callback de guardado.
   * @param {Object} userData
   * @param {Function} onSave
   */
  showModal(userData, onSave = null) {
    this.onSaveCallback = onSave;
    this.model.setUserData(userData);
    this.model.setVisible(true);

    // Inyecta los datos a la vista y lo muestra
    this.view.show(userData);
  }

  /**
   * Gestiona la visualización de mensajes de error en los inputs
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

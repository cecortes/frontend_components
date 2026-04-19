"use strict";

export class ModalAgregarUsuarioController {
  constructor(view, model, validator, modalOkController, modalErrorController) {
    this.view = view;
    this.model = model;
    this.validator = validator;
    this.modalOkController = modalOkController;
    this.modalErrorController = modalErrorController;
  }

  start() {
    this.view.show();
  }

  bindEvents() {
    const {
      $overlay,
      $card,
      $inputUser,
      $userError,
      $inputName,
      $nameError,
      $inputMail,
      $mailError,
      $inputRole,
      $inputPassword,
      $passwordError,
      $togglePassBtn,
      $form,
      $cancelBtn,
      $closeBtn,
    } = this.view.ModalElements;

    if ($togglePassBtn) {
      $togglePassBtn.addEventListener("click", () => {
        this.view.togglePasswordType($inputPassword, $togglePassBtn);
      });
    }

    const validateAll = () => {
      let isValid = true;

      const vUser = this.validator.validateField($inputUser);
      if (!this.validationPopUp(vUser, $inputUser, $userError)) isValid = false;

      const vName = this.validator.validateField($inputName);
      if (!this.validationPopUp(vName, $inputName, $nameError)) isValid = false;

      const vMail = this.validator.validateField($inputMail);
      if (!this.validationPopUp(vMail, $inputMail, $mailError)) isValid = false;

      const vPass = this.validator.validateField($inputPassword);
      if (!this.validationPopUp(vPass, $inputPassword, $passwordError))
        isValid = false;

      if (!$inputRole.value) {
        isValid = false;
        $inputRole.style.borderColor = "var(--color-error-500)";
      } else {
        $inputRole.style.borderColor = "var(--color-border-default)";
      }

      return isValid;
    };

    $inputUser.addEventListener("blur", () =>
      this.validationPopUp(
        this.validator.validateField($inputUser),
        $inputUser,
        $userError,
      ),
    );
    $inputName.addEventListener("blur", () =>
      this.validationPopUp(
        this.validator.validateField($inputName),
        $inputName,
        $nameError,
      ),
    );
    $inputMail.addEventListener("blur", () =>
      this.validationPopUp(
        this.validator.validateField($inputMail),
        $inputMail,
        $mailError,
      ),
    );
    $inputPassword.addEventListener("blur", () =>
      this.validationPopUp(
        this.validator.validateField($inputPassword),
        $inputPassword,
        $passwordError,
      ),
    );

    const handleCloseClick = () => this.handleClose();
    if ($cancelBtn) $cancelBtn.addEventListener("click", handleCloseClick);
    if ($closeBtn) $closeBtn.addEventListener("click", handleCloseClick);

    // Cierra el modal al hacer clic fuera del card (overlay)
    if ($overlay && $card) {
      $overlay.addEventListener("click", (e) => {
        if (!$card.contains(e.target)) {
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
          user: $inputUser.value,
          mail: $inputMail.value,
          name: $inputName.value,
          password: $inputPassword.value,
          role: $inputRole.value,
        };

        try {
          await this.model.saveUser(data);

          this.handleClose();
          this.modalOkController.showOk(
            "Usuario registrado exitosamente.",
          );
        } catch (error) {
          this.handleClose();
          this.modalErrorController.showError(
            error.message || "Error al agregar usuario.",
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

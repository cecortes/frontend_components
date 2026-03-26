"use strict";

export class ModalEditarUsuarioController {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.onSaveCallback = null;
  }

  modalEventHandler() {
    const { $overlay, $card, $closeBtn, $cancelBtn, $form } =
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

    // Previene el submit por defecto y maneja el guardado
    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      const { $inputNombre, $inputMail, $inputUsuario, $selectRol } =
        this.view.ModalElements;

      const updatedData = {
        nombre: $inputNombre.value,
        mail: $inputMail.value,
        usuario: $inputUsuario.value, // Estará disabled, pero por completitud
        rol: $selectRol.value,
      };

      this.model.setUserData(updatedData);

      // Si existe un callback registrado para cuando se guarde (útil para el padre)
      if (typeof this.onSaveCallback === "function") {
        this.onSaveCallback(updatedData);
      }

      console.log(
        "[ModalEditarUsuario] Datos guardados localmente:",
        updatedData,
      );

      // Cerrar tras simular guardado exitoso
      this.handleClose();
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
}

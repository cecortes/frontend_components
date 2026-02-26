"use strict";

export class ModalModel {
  /**
   * @method constructor
   * @description
   * Inicializa el modelo del modal con su estado por defecto.
   *
   * @returns {void}
   */
  constructor() {
    this.message = "";
    this.isVisible = false;
  }

  /**
   * @method setMessage
   * @description Establece el mensaje de error a mostrar en el modal.
   *
   * @param {string} message - Mensaje de error del backend.
   * @returns {void}
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   * @method getMessage
   * @description Retorna el mensaje de error actual.
   *
   * @returns {string}
   */
  getMessage() {
    return this.message;
  }

  /**
   * @method setVisible
   * @description Establece la visibilidad del modal.
   *
   * @param {boolean} value
   * @returns {void}
   */
  setVisible(value) {
    this.isVisible = value;
  }

  /**
   * @method getVisible
   * @description Retorna si el modal está visible.
   *
   * @returns {boolean}
   */
  getVisible() {
    return this.isVisible;
  }
}

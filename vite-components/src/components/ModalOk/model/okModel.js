"use strict";

export class OkModel {
  /**
   * @method constructor
   * @description
   * Inicializa el modelo del modal de éxito con su estado por defecto.
   *
   * @returns {void}
   */
  constructor() {
    this.message = "";
    this.isVisible = false;
  }

  /**
   * @method setMessage
   * @description Establece el mensaje de éxito a mostrar en el modal.
   *
   * @param {string} message - Mensaje de éxito de la operación.
   * @returns {void}
   */
  setMessage(message) {
    this.message = message;
  }

  /**
   * @method getMessage
   * @description Retorna el mensaje de éxito actual.
   *
   * @returns {string}
   */
  getMessage() {
    return this.message;
  }

  /**
   * @method setVisible
   * @description Establece la visibilidad del modal de éxito.
   *
   * @param {boolean} value
   * @returns {void}
   */
  setVisible(value) {
    this.isVisible = value;
  }

  /**
   * @method getVisible
   * @description Retorna si el modal de éxito está visible.
   *
   * @returns {boolean}
   */
  getVisible() {
    return this.isVisible;
  }
}

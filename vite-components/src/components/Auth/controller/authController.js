"use strict";

import { AuthModel } from "../model/authModel.js";

/**
 * @class AuthController
 * @description
 * Orquesta el Modelo de autenticación del usuario
 * Contiene la lógica para permitir continuar en la
 * páginas protegidas
 */

export class AuthController {
  /**
   * @method constructor
   * @description
   * Inicializa el controlador con el modelo de autenticación
   *
   * @returns {void}
   * @example
   * const authController = new AuthController();
   */
  constructor() {
    this.model = new AuthModel();
  }

  /**
   * @function init
   * @description
   * Inicializa el controlador vinculando el validateToken
   *
   * @returns {void}
   * @example
   * const authController = new AuthController();
   * authController.init();
   */
  init(sessionData) {
    return this.model.validateToken(sessionData);
  }
}

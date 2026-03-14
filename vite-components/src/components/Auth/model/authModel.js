"use strict";

/**
 * @class AuthModel
 * @description
 * Maneja la lógica de autenticación del usuario
 * Contiene la lógica para permitir continuar en la
 * páginas protegidas
 */

export class AuthModel {
  /**
   * @method constructor
   * @description
   * Inicializa el modelo con el almacenamiento de sesión
   * @returns {void}
   */
  constructor() {
    this.apiBaseUrl = import.meta.env.VITE_API_URL;
  }

  /**
   * @function validateToken
   * @description
   * Valida el token de sesión, si es válido
   * permite abrir la url, si es inválido redirige al
   * login
   *
   * @returns {void}
   */
  async validateToken(sessionData) {
    if (!sessionData || !sessionData.token) {
      throw new Error("Token inválido o expirado");
    }

    try {
      const token = sessionData.token;

      const response = await fetch(`${this.apiBaseUrl}/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token inválido o expirado");
      }
    } catch (error) {
      // Relanzar el error para que el controlador superior lo maneje y muestre el modal
      throw new Error(error.message || "Token inválido o expirado");
    }
  }
}

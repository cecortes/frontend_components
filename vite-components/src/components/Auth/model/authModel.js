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
  validateToken(sessionData) {
    const token = sessionData.token;

    if (!token) {
      console.log("Token inválido o expirado");
      throw new Error("Token inválido o expirado");
    }

    // TODO: Implementar en un modelo para no tener el fetch en el storage
    try {
      const response = fetch(`${this.apiBaseUrl}/verify-token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // TODO: Los errores se muestran en el modal de error, no en la consola.
      if (!response.ok) {
        throw new Error("Token inválido o expirado");
      }
    } catch (error) {
      // TODO: Mostrar error en el modal de error, no en la consola.
      console.error("Error validando token:", error.message);
      // TODO: Redirigir al login
      // window.location.href = "../../../index.html";
    }
  }
}

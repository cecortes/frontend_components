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
      const error = new Error("Token inválido o expirado");
      error.isAuthError = true;
      throw error;
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
        const error = new Error("Token inválido o expirado");
        if (response.status === 401 || response.status === 403) {
          error.isAuthError = true;
        }
        throw error;
      }
    } catch (error) {
      // Si el error ya fue marcado como error de autenticación, relanzarlo
      if (error.isAuthError) {
        throw error;
      }
      // En caso contrario (ej. error de red "Failed to fetch"), relanzarlo como error normal
      throw new Error(error.message || "Error al verificar el token");
    }
  }
}

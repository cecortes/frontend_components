"use strict";

export class SessionStorage {
  /**
   * @method constructor
   * @description
   * Inicializa la clase creando un objeto "Single Source of Truth" para la aplicación
   * con la clave 'token' inicializada en valor vacío.
   *
   * @returns {void}
   * @example
   * const session = new SessionStorage();
   */
  constructor() {
    this.sessionData = {
      token: "",
    };
  }

  /**
   * @method getToken
   * @description
   * Obtiene el token guardado en el objeto "Single Source of Truth".
   *
   * @returns {string} - El token almacenado en el objeto.
   * @example
   * const token = session.getToken();
   */
  getToken() {
    return this.sessionData.token;
  }

  /**
   * @method setToken
   * @description
   * Escribe un nuevo token en el objeto "Single Source of Truth".
   *
   * @param {string} token - El token a guardar.
   * @returns {void}
   * @example
   * session.setToken("nuevo_token_aqui");
   */
  setToken(token) {
    if (typeof token !== "string" || token.trim() === "") {
      throw new Error("El token debe ser un string válido no vacío");
    }
    this.sessionData.token = token;
  }

  /**
   * @method saveSessionStorage
   * @description
   * Guarda el objeto "Single Source of Truth" en formato JSON dentro del sessionStorage
   * usando la clave 'sessionData'.
   *
   * @returns {void}
   * @throws {Error} - Lanza un error si el sessionStorage no está disponible.
   * @example
   * session.saveSessionStorage();
   */
  saveSessionStorage() {
    try {
      const sessionDataJSON = JSON.stringify(this.sessionData);
      window.sessionStorage.setItem("sessionData", sessionDataJSON);
    } catch (error) {
      throw new Error("No se pudo guardar en sessionStorage: " + error.message);
    }
  }

  /**
   * @method loadSessionStorage
   * @description
   * Carga el objeto "Single Source of Truth" desde el sessionStorage del navegador.
   * Si no existe datos previos, inicializa con valores por defecto.
   *
   * @returns {void}
   * @example
   * session.loadSessionStorage();
   */
  loadSessionStorage() {
    try {
      const data = window.sessionStorage.getItem("sessionData");
      if (data) {
        this.sessionData = JSON.parse(data);
      }
    } catch (error) {
      console.error("No se pudo cargar desde sessionStorage:", error.message);
    }
  }

  /**
   * @method clearSession
   * @description
   * Limpia el objeto "Single Source of Truth" y elimina los datos del sessionStorage.
   * Útil para cerrar sesión.
   *
   * @returns {void}
   * @example
   * session.clearSession();
   */
  clearSession() {
    this.sessionData = { token: "" };
    window.sessionStorage.removeItem("sessionData");
  }
}

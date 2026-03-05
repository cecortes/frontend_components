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
      user: "",
      role: "",
    };
  }

  /**
   * @method getToken
   * @description
   * Obtiene el token guardado en el objeto "Single Source of Truth".
   *
   * @returns {string} - El token almacenado en el objeto.
   * @example
   * const token = session.Token;
   */
  get Token() {
    return this.sessionData.token;
  }

  /**
   * @method UserName
   * @description
   * Obtiene el usuario guardado en el objeto "Single Source of Truth".
   *
   * @returns {string} - El usuario almacenado en el objeto.
   * @example
   * const UserName = session.UserName;
   */
  get UserName() {
    return this.sessionData.user;
  }

  /**
   * @method Role
   * @description
   * Obtiene el Rol guardado en el objeto "Single Source of Truth".
   *
   * @returns {string} - El Rol almacenado en el objeto.
   * @example
   * const Rol = session.Rol;
   */
  get Role() {
    return this.sessionData.role;
  }

  /**
   * @method setToken
   * @description
   * Escribe un nuevo token en el objeto "Single Source of Truth".
   *
   * @param {string} token - El token a guardar.
   * @returns {void}
   * @example
   * session.Token = "nuevo_token_aqui";
   */
  set Token(token) {
    if (typeof token !== "string") {
      throw new Error("El token debe ser un string válido");
    }
    this.sessionData.token = token;
  }

  /**
   * @method UserName
   * @description
   * Escribe un nuevo username en el objeto "Single Source of Truth".
   *
   * @param {string} user - El username a guardar.
   * @returns {void}
   * @example
   * session.UserName = "nuevo_username_aqui";
   */
  set UserName(user) {
    if (typeof user !== "string") {
      throw new Error("El usuario debe ser un string válido");
    }
    this.sessionData.user = user;
  }

  /**
   * @method Role
   * @description
   * Escribe un nuevo role en el objeto "Single Source of Truth".
   *
   * @param {string} role - El rol a guardar.
   * @returns {void}
   * @example
   * session.Role = "nuevo_rol_aqui";
   */
  set Role(role) {
    if (typeof role !== "string") {
      throw new Error("El rol debe ser un string válido");
    }
    this.sessionData.role = role;
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

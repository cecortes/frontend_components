"use strict";

export class TablaUsuariosModel {
  constructor(storage) {
    this.users = [];
    this.storage = storage;
  }

  /**
   * @async
   * @method fetchUsersData
   * @description
   * Simula la llamada al backend para obtener la lista de usuarios.
   * Por ahora retorna datos "hardcodeados".
   *
   * @returns {Promise<Array>} Promesa que resuelve con el arreglo de usuarios.
   */
  async fetchUsersData() {
    try {
      const url = import.meta.env.VITE_API_USERS_ALL;
      const token = this.storage.Token;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(
          `HTTP ${response.status}: ${json.message || response.statusText}`,
        );
      }

      return json.data.map((user) => ({
        id: user.users_id,
        nombre: user.users_name,
        mail: user.users_mail,
        usuario: user.users_user,
        rol: user.users_role,
      }));
    } catch (error) {
      throw error;
    }
  }
}

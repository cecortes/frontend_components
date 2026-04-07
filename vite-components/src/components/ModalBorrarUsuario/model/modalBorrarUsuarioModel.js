"use strict";

export class ModalBorrarUsuarioModel {
  constructor(storage) {
    this.storage = storage;
    this.visible = false;
    this.userData = null;
  }

  setVisible(state) {
    this.visible = state;
  }

  getVisible() {
    return this.visible;
  }

  setUserData(data) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }

  /**
   * Envía el ID del usuario a eliminar al backend.
   * @param {number|string} userId - ID del usuario a eliminar.
   * @returns {Promise<Object>} Promesa que resuelve la respuesta del servidor en caso de éxito.
   */
  async deleteUser(userId) {
    try {
      const url = import.meta.env.VITE_API_USERS_DEL_BY_ID;
      const token = this.storage.Token;

      const bodyData = {
        id: userId,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(
          `HTTP ${response.status}: ${json.message || response.statusText}`,
        );
      }

      return json;
    } catch (error) {
      throw error;
    }
  }
}

"use strict";

export class ModalEditarUsuarioModel {
  constructor(storage) {
    this.storage = storage;
    this.visible = false;
    this.userData = {
      nombre: "",
      mail: "",
      usuario: "",
      rol: "",
    };
  }

  /**
   * Set the visibility state of the modal
   * @param {boolean} visible
   */
  setVisible(visible) {
    this.visible = visible;
  }

  /**
   * Get the visibility state of the modal
   * @returns {boolean}
   */
  getVisible() {
    return this.visible;
  }

  /**
   * Update the user data currently being edited
   * @param {Object} data
   */
  setUserData(data) {
    this.userData = { ...this.userData, ...data };
  }

  /**
   * Get the user data being edited
   * @returns {Object}
   */
  getUserData() {
    return this.userData;
  }

  /**
   * Envía los datos actualizados del usuario al backend.
   * @param {number|string} userId - ID del usuario a modificar.
   * @param {Object} updateData - Nuevos datos del usuario procedentes de la vista.
   * @returns {Promise<Object>} Promesa que resuelve la respuesta del servidor en caso de éxito.
   */
  async updateUser(userId, updateData) {
    try {
      const url = import.meta.env.VITE_API_USERS_EDIT_BY_ID;
      const token = this.storage.Token;

      const bodyData = {
        id: userId,
        updateData: {
          name: updateData.nombre,
          mail: updateData.mail,
          user: updateData.usuario,
          role: updateData.rol,
        },
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

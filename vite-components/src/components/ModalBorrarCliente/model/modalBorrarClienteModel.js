"use strict";

export class ModalBorrarClienteModel {
  constructor(storage) {
    this.storage = storage;
    this.visible = false;
    this.clientData = null;
  }

  setVisible(state) {
    this.visible = state;
  }

  getVisible() {
    return this.visible;
  }

  setClientData(data) {
    this.clientData = data;
  }

  getClientData() {
    return this.clientData;
  }

  /**
   * Envía el ID del cliente a eliminar al backend.
   * @param {number|string} clientId - ID del cliente a eliminar.
   * @returns {Promise<Object>} Promesa que resuelve la respuesta del servidor en caso de éxito.
   */
  async deleteClient(clientId) {
    try {
      const url = import.meta.env.VITE_API_CLIENTS_DEL_BY_ID;
      const token = this.storage.Token;

      const bodyData = {
        id: parseInt(clientId, 10),
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

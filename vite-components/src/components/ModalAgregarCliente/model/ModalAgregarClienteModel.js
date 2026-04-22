"use strict";

export class ModalAgregarClienteModel {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Guarda un nuevo cliente en la API.
   * @param {Object} clientData
   * @returns {Promise<Object>}
   */
  async saveCliente(clientData) {
    try {
      // Usamos una variable de entorno hipotética o directa
      const url = import.meta.env.VITE_API_CLIENTS_ADD || "http://localhost:3000/api/waresmart/clients/add";
      const token = this.storage ? this.storage.Token : "";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clientData),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(
          json.message || `Error HTTP ${response.status}: ${response.statusText}`,
        );
      }

      return json;
    } catch (error) {
      throw error;
    }
  }
}

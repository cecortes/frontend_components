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
      const url = import.meta.env.VITE_API_CLIENTS_NEW;
      const token = this.storage ? this.storage.Token : "";

      const bodyData = {
        name: clientData.nombre,
        mail: clientData.correo,
        phone: clientData.telefono ? clientData.telefono.replace(/\D/g, "") : "",
        rfc: clientData.rfc,
        address: clientData.direccion,
        contact: clientData.contacto,
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
          json.message || `Error HTTP ${response.status}: ${response.statusText}`,
        );
      }

      return json;
    } catch (error) {
      throw error;
    }
  }
}

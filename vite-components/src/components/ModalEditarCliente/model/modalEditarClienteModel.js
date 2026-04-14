"use strict";

export class ModalEditarClienteModel {
  constructor(storage) {
    this.storage = storage;
    this.visible = false;
    this.clientData = {
      nombre: "",
      correo: "",
      telefono: "",
      rfc: "",
      direccion: "",
      contacto: "",
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
   * Update the client data currently being edited
   * @param {Object} data
   */
  setClientData(data) {
    this.clientData = { ...this.clientData, ...data };
  }

  /**
   * Get the client data being edited
   * @returns {Object}
   */
  getClientData() {
    return this.clientData;
  }

  /**
   * Envía los datos actualizados del cliente al backend.
   * @param {number|string} clientId - ID del cliente a modificar.
   * @param {Object} updateData - Nuevos datos del cliente procedentes de la vista.
   */
  async updateClient(clientId, updateData) {
    try {
      const url = import.meta.env.VITE_API_CLIENTS_EDIT_BY_ID;
      const token = this.storage.Token;

      const bodyData = {
        id: clientId,
        updateData: {
          name: updateData.nombre,
          mail: updateData.correo,
          phone: updateData.telefono,
          rfc: updateData.rfc,
          address: updateData.direccion,
          contact: updateData.contacto,
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

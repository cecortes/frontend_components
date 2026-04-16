"use strict";

export class TablaClientesModel {
  constructor(storage) {
    this.clients = [];
    this.storage = storage;
  }

  /**
   * @async
   * @method fetchClientsData
   * @description
   * Realiza la llamada al backend para obtener la lista de clientes.
   *
   * @returns {Promise<Array>} Promesa que resuelve con el arreglo de clientes.
   */
  async fetchClientsData() {
    try {
      const url = import.meta.env.VITE_API_CLIENTS_ALL;
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

      return json.data.map((client) => ({
        id: client.clients_id,
        nombre: client.clients_name,
        correo: client.clients_mail,
        telefono: client.clients_phone,
        rfc: client.clients_rfc || "",
        direccion: client.clients_address || "",
        contacto: client.clients_contact || "",
      }));
    } catch (error) {
      throw error;
    }
  }
}

"use strict";

export class ProduccionTotalesModel {
  constructor(storage) {
    this.storage = storage;
  }

  /**
   * Obtiene los totales de producción de un producto en un periodo determinado.
   * @param {string} sku - SKU del producto.
   * @param {string} startDate - Fecha inicial del periodo (ej: '2023-10-01 00:00:00').
   * @param {string} endDate - Fecha final del periodo (ej: '2023-10-07 23:59:59').
   * @returns {Promise<Array>} Arreglo de objetos devueltos por el servidor.
   */
  async fetchTotalesByPeriod(sku, startDate, endDate) {
    const sessionData = this.storage.loadSessionStorage();
    const token = sessionData ? sessionData.token : "";

    const payload = {
      sku,
      startDate,
      endDate
    };

    const apiUrl = import.meta.env.VITE_API_PRODUCCION_BY_PERIOD || "http://localhost:3000/api/waresmart/produccion/get/byPeriodProduct";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      const error = new Error(result.message || "Error al obtener totales de producción.");
      if (response.status === 401 || response.status === 403) {
        error.isAuthError = true;
      }
      throw error;
    }

    return result.data;
  }
}

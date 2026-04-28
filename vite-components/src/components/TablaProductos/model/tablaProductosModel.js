"use strict";

export class TablaProductosModel {
  constructor(storage) {
    this.productos = [];
    this.storage = storage;
  }

  /**
   * @async
   * @method fetchProductosData
   * @description
   * Retorna los datos hardcode de productos, preparado para futura llamada al backend.
   *
   * @returns {Promise<Array>} Promesa que resuelve con el arreglo de productos.
   */
  async fetchProductosData() {
    return new Promise((resolve) => {
      // Simular delay de red
      setTimeout(() => {
        resolve([
          { id: 1, sku: "PRD-001", nombre: "Microprocesador X1", stock: 45, categoria: "Electrónica", estado: "Bajo Stock" },
          { id: 2, sku: "PRD-045", nombre: "Memoria RAM 16GB", stock: 120, categoria: "Hardware", estado: "Normal" },
          { id: 3, sku: "PRD-102", nombre: "Disco Duro SSD 1TB", stock: 12, categoria: "Hardware", estado: "Crítico" },
        ]);
      }, 100);
    });
  }
}

"use strict";

export class DashboardModel {
  constructor() {
    this.inventoryStats = null;
    this.clients = [];
    this.products = [];
    this.orders = [];
  }

  /**
   * @async
   * @method fetchDashboardData
   * @description
   * Realiza una llamada simulada para obtener los datos del dashboard desde una API.
   *
   * @returns {Promise<Object>} Promesa que resuelve con un objeto conteniendo listas de clientes, productos y órdenes.
   */
  async fetchDashboardData() {
    // Simulated API call (Mock Data Based on HTML Markup)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          clients: [
            {
              id: "C-1001",
              name: "Tech Solutions S.A.",
              loc: "Ciudad de México",
              status: "Activo",
            },
            {
              id: "C-1002",
              name: "Global Logistics Ltd.",
              loc: "Monterrey",
              status: "Activo",
            },
            {
              id: "C-1003",
              name: "Industrial Regia",
              loc: "Guadalajara",
              status: "Inactivo",
            },
          ],
          products: [
            {
              id: "PRD-001",
              name: "Microprocesador X1",
              stock: 45,
              cat: "Electrónica",
              status: "Bajo Stock",
            },
            {
              id: "PRD-045",
              name: "Memoria RAM 16GB",
              stock: 120,
              cat: "Hardware",
              status: "Normal",
            },
            {
              id: "PRD-102",
              name: "Disco Duro SSD 1TB",
              stock: 12,
              cat: "Hardware",
              status: "Crítico",
            },
          ],
          orders: [
            {
              id: "OC-2024-001",
              vendor: "Tech Supply Co.",
              date: "05/03/2024",
              amount: "$12,450.00",
              status: "En Proceso",
            },
            {
              id: "OC-2024-002",
              vendor: "LogiCorp",
              date: "08/03/2024",
              amount: "$4,200.00",
              status: "Entregada",
            },
            {
              id: "OC-2024-003",
              vendor: "MexComponents",
              date: "09/03/2024",
              amount: "$8,900.00",
              status: "Cancelada",
            },
          ],
        });
      }, 300);
    });
  }
}

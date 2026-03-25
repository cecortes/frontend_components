"use strict";

export class TablaClientesModel {
  constructor() {
    this.clients = [];
  }

  /**
   * @async
   * @method fetchClientsData
   * @description
   * Simula la llamada al backend para obtener la lista de clientes.
   * Retorna datos "hardcodeados" con su estado "Activo" o "Inactivo".
   *
   * @returns {Promise<Array>} Promesa que resuelve con el arreglo de clientes.
   */
  async fetchClientsData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: "C-1001",
            nombre: "Tech Solutions S.A.",
            ubicacion: "Ciudad de México",
            estado: "Activo",
          },
          {
            id: "C-1002",
            nombre: "Global Logistics Ltd.",
            ubicacion: "Monterrey",
            estado: "Activo",
          },
          {
            id: "C-1003",
            nombre: "Industrial Regia",
            ubicacion: "Guadalajara",
            estado: "Inactivo",
          },
          {
            id: "C-1004",
            nombre: "Constructora del Norte",
            ubicacion: "Chihuahua",
            estado: "Activo",
          },
          {
            id: "C-1005",
            nombre: "Comercializadora Pacífico",
            ubicacion: "Tijuana",
            estado: "Inactivo",
          },
          {
            id: "C-1006",
            nombre: "Distribuidora Central",
            ubicacion: "Toluca",
            estado: "Activo",
          },
          {
            id: "C-1007",
            nombre: "Asociados en Tecnología",
            ubicacion: "Querétaro",
            estado: "Activo",
          },
          {
            id: "C-1008",
            nombre: "Importaciones y Exportaciones del Valle",
            ubicacion: "Puebla",
            estado: "Activo",
          },
          {
            id: "C-1009",
            nombre: "Materiales Especializados",
            ubicacion: "León",
            estado: "Inactivo",
          },
          {
            id: "C-1010",
            nombre: "Sistemas Inteligentes",
            ubicacion: "Mérida",
            estado: "Activo",
          },
          {
            id: "C-1011",
            nombre: "Logística Nacional",
            ubicacion: "Torreón",
            estado: "Activo",
          },
          {
            id: "C-1012",
            nombre: "Comercio Globalizado",
            ubicacion: "San Luis Potosí",
            estado: "Activo",
          },
          {
            id: "C-1013",
            nombre: "Ferreterías Unidas",
            ubicacion: "Aguascalientes",
            estado: "Inactivo",
          },
          {
            id: "C-1014",
            nombre: "Proveedora de Oficinas",
            ubicacion: "Saltillo",
            estado: "Activo",
          },
          {
            id: "C-1015",
            nombre: "Compañía Cerámica",
            ubicacion: "Hermosillo",
            estado: "Activo",
          },
          {
            id: "C-1016",
            nombre: "Equipos Médicos S.A.",
            ubicacion: "Culiacán",
            estado: "Activo",
          },
          {
            id: "C-1017",
            nombre: "Tecnología Avanzada",
            ubicacion: "Mexicali",
            estado: "Inactivo",
          },
          {
            id: "C-1018",
            nombre: "Servicios Aduanales",
            ubicacion: "Veracruz",
            estado: "Activo",
          },
          {
            id: "C-1019",
            nombre: "Maquinaria Industrial",
            ubicacion: "Cancún",
            estado: "Activo",
          },
          {
            id: "C-1020",
            nombre: "Surtidora Eléctrica",
            ubicacion: "Villahermosa",
            estado: "Activo",
          },
        ]);
      }, 100);
    });
  }
}

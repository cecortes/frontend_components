"use strict";

export class TablaUsuariosModel {
  constructor() {
    this.users = [];
  }

  /**
   * @async
   * @method fetchUsersData
   * @description
   * Simula la llamada al backend para obtener la lista de usuarios.
   * Por ahora retorna datos "hardcodeados".
   *
   * @returns {Promise<Array>} Promesa que resuelve con el arreglo de usuarios.
   */
  async fetchUsersData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            nombre: "Ana García",
            mail: "ana.g@waresmart.com",
            usuario: "agarcia",
            rol: "Administrador",
          },
          {
            nombre: "Carlos López",
            mail: "carlos.l@waresmart.com",
            usuario: "clopez",
            rol: "Operador",
          },
          {
            nombre: "María Fernanda",
            mail: "maria.f@waresmart.com",
            usuario: "mfernanda",
            rol: "Almacenista",
          },
          {
            nombre: "Juan Pérez",
            mail: "juan.p@waresmart.com",
            usuario: "jperez",
            rol: "Reportes",
          },
          {
            nombre: "Sofía Martínez",
            mail: "sofia.m@waresmart.com",
            usuario: "smartinez",
            rol: "Operador",
          },
        ]);
      }, 100);
    });
  }
}

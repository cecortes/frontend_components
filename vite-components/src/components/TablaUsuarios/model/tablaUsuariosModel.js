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
          {
            nombre: "Ricardo Torres",
            mail: "ricardo.t@waresmart.com",
            usuario: "rtorres",
            rol: "Administrador",
          },
          {
            nombre: "Elena Rivas",
            mail: "elena.r@waresmart.com",
            usuario: "erivas",
            rol: "Operador",
          },
          {
            nombre: "Miguel Ángel",
            mail: "miguel.a@waresmart.com",
            usuario: "mangel",
            rol: "Almacenista",
          },
          {
            nombre: "Lucía Méndez",
            mail: "lucia.m@waresmart.com",
            usuario: "lmendez",
            rol: "Reportes",
          },
          {
            nombre: "Fernando Soto",
            mail: "fernando.s@waresmart.com",
            usuario: "fsoto",
            rol: "Operador",
          },
          {
            nombre: "Gabriela Luna",
            mail: "gabriela.l@waresmart.com",
            usuario: "gluna",
            rol: "Administrador",
          },
          {
            nombre: "Roberto Valdez",
            mail: "roberto.v@waresmart.com",
            usuario: "rvaldez",
            rol: "Operador",
          },
          {
            nombre: "Patricia Solís",
            mail: "patricia.s@waresmart.com",
            usuario: "psolis",
            rol: "Almacenista",
          },
          {
            nombre: "Daniel Ortega",
            mail: "daniel.o@waresmart.com",
            usuario: "dortega",
            rol: "Reportes",
          },
          {
            nombre: "Laura Castro",
            mail: "laura.c@waresmart.com",
            usuario: "lcastro",
            rol: "Operador",
          },
          {
            nombre: "Andrés Silva",
            mail: "andres.s@waresmart.com",
            usuario: "asilva",
            rol: "Administrador",
          },
          {
            nombre: "Beatriz Peña",
            mail: "beatriz.p@waresmart.com",
            usuario: "bpena",
            rol: "Operador",
          },
          {
            nombre: "Hugo Delgado",
            mail: "hugo.d@waresmart.com",
            usuario: "hdelgado",
            rol: "Almacenista",
          },
          {
            nombre: "Mónica Ruiz",
            mail: "monica.r@waresmart.com",
            usuario: "mruiz",
            rol: "Reportes",
          },
          {
            nombre: "Javier Morales",
            mail: "javier.m@waresmart.com",
            usuario: "jmorales",
            rol: "Operador",
          },
        ]);
      }, 100);
    });
  }
}

export class ModalAgregarUsuarioModel {
  constructor() {
    // En una ejecución real, aquí se inyectaría un manejador de peticiones o storage
  }

  /**
   * Simula la llamada asíncrona al API para guardar un nuevo usuario
   * @param {Object} userData
   * @returns {Promise<boolean>}
   */
  async saveUserMock(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulador de éxito después de 1 segundo
        resolve(true);

        // Si quisieramos probar el ModalError, descomentaríamos el reject:
        // reject(new Error("Conexión perdida. El usuario no pudo ser agregado."));
      }, 1000);
    });
  }
}

export class ModalAgregarUsuarioModel {
  constructor() {
  }

  /**
   * Guarda un nuevo usuario en la API.
   * @param {Object} userData
   * @returns {Promise<Object>}
   */
  async saveUser(userData) {
    try {
      const url = import.meta.env.VITE_API_USERS_REGISTER;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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

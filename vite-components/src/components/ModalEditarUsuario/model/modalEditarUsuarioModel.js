"use strict";

export class ModalEditarUsuarioModel {
  constructor() {
    this.visible = false;
    this.userData = {
      nombre: "",
      mail: "",
      usuario: "",
      rol: "",
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
   * Update the user data currently being edited
   * @param {Object} data
   */
  setUserData(data) {
    this.userData = { ...this.userData, ...data };
  }

  /**
   * Get the user data being edited
   * @returns {Object}
   */
  getUserData() {
    return this.userData;
  }
}

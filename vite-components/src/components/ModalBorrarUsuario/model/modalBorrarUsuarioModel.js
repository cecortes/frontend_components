"use strict";

export class ModalBorrarUsuarioModel {
  constructor() {
    this.visible = false;
    this.userData = null;
  }

  setVisible(state) {
    this.visible = state;
  }

  getVisible() {
    return this.visible;
  }

  setUserData(data) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }
}

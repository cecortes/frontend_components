"use strict";

export class DashboardController {
  constructor(view, model, storage, modalController = null) {
    this.view = view;
    this.model = model;
    this.storage = storage;
    this.modalController = modalController;
  }

  async init() {
    // CHECK AUTH <----- VERIFY THIS...
    this.storage.loadSessionStorage();
    if (!this.storage.Token) {
      window.location.href = "./index.html"; // Redirigir a login
      return;
    }
    // CHECK AUTH <----- VERIFY THIS...

    // Render vista
    const html = this.view.renderDashboard();

    // Bind events
    //this.dashboardEventHandler();

    // Cargar datos
    //await this.loadDashboardData();

    return html;
  }

  // dashboardEventHandler

  //loadDashboardData
}

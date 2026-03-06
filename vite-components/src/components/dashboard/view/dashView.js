"use strict";

export class DashboardView {
  constructor(icons) {
    this.icons = icons;
    this.element = null;
  }

  renderDashboard() {
    const html = `
      <div class="dashboard-container">
        <header class="dashboard-header">
          <h1>Dashboard</h1>
          <button id="logoutBtn" class="btn-logout">Cerrar Sesión</button>
        </header>
        <div class="dashboard-stats" id="statsContainer">
          <!-- Stats cards here -->
        </div>
      </div>
    `;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    this.element = doc.body.firstElementChild;

    return this.element;
  }
}

"use strict";

export class SidebarView {
  constructor(icons) {
    this.icons = icons;
  }

  /**
   * Renderiza el template principal del sidebar (menú lateral y configuraciones técnicas como el checkbox)
   * @param {string} activeRoute - La ruta activa actual ("dashboard", "users", etc.)
   * @param {Object} userData - Información del usuario (nombre, rol)
   * @returns {string} HTML string del sidebar
   */
  getSidebarTemplate(
    activeRoute = "dashboard",
    userData = { name: "Admin User", role: "Administrador" },
  ) {
    const isActive = (route) => (activeRoute === route ? 'class="active"' : "");

    return `
<input type="checkbox" id="menu-toggle" />

    <!-- Overlay Invisible para Cierre en Móvil -->
    <label for="menu-toggle" class="sidebar-overlay"></label>

    <!-- Sidebar de Navegación -->
    <aside class="sidebar">
      <a href="#" class="sidebar-logo">
        <div class="logo-symbol">W</div>
        <h2
          style="font-size: 1.5rem; margin: 0; color: var(--color-primary-400)"
        >
          WARESmart
        </h2>
      </a>

      <ul class="sidebar-nav">
        <li class="nav-item">
          <a href="#" ${isActive("dashboard")}>
            ${this.icons.dashboard}
            Dashboard
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("users")}>
            ${this.icons.users}
            Usuarios
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("clients")}>
            ${this.icons.clients}
            Clientes
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("products")}>
            ${this.icons.products}
            Productos
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("orders")}>
            ${this.icons.orders}
            O.C.
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("entries")}>
            ${this.icons.entries}
            Entradas
          </a>
        </li>
        <li class="nav-item">
          <a href="#" ${isActive("outcomes")}>
            ${this.icons.outcomes}
            Salidas
          </a>
        </li>
      </ul>

      <div
        style="
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid var(--color-border-subtle);
          display: flex;
          align-items: center;
          gap: 12px;
        "
      >
        <div
          style="
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: var(--color-surface-hover);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          "
        >
          ${this.icons.profile}
        </div>
        <div>
          <p
            style="
              font-size: 0.875rem;
              font-weight: 600;
              margin: 0;
              color: var(--color-text-primary);
            "
          >
            ${userData.name}
          </p>
          <p
            style="
              font-size: 0.75rem;
              margin: 0;
              color: var(--color-text-muted);
            "
          >
            ${userData.role}
          </p>
        </div>
      </div>
    </aside>
    `;
  }

  /**
   * Renderiza el template del botón de hamburguesa para dispositivos móviles
   * @returns {string} HTML string del label del menú hamburguesa
   */
  getBurgerTemplate() {
    return `
        <label for="menu-toggle" class="burger-label">
          <div class="burger-line"></div>
          <div class="burger-line"></div>
          <div class="burger-line"></div>
        </label>
    `;
  }
}

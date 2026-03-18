"use strict";

export class TablaUsuariosView {
  constructor() {}

  /**
   * @method renderTable
   * @description Genera el string HTML completo de la tarjeta de la tabla de Usuarios.
   * @param {Array} usersData - Los datos de los usuarios a renderizar en la tabla.
   * @returns {string} Código HTML de la tabla estructurada.
   */
  renderTable(usersData) {
    const rowsHTML = usersData
      .map(
        (user) => `
                  <tr>
                    <td>${user.nombre}</td>
                    <td>${user.mail}</td>
                    <td>${user.usuario}</td>
                    <td>${user.rol}</td>
                    <td>
                      <div style="display: flex; gap: 8px; justify-content: center;">
                        <button class="btn btn-primary" style="padding: 4px 8px; font-size: 0.75rem">Editar</button>
                        <button class="btn btn-danger" style="padding: 4px 8px; font-size: 0.75rem">Borrar</button>
                      </div>
                    </td>
                  </tr>
      `,
      )
      .join("");

    return `
          <!-- Tabla de Usuarios (Componente Extraído) -->
          <div class="table-container card">
            <div class="table-header">
              <h4>Usuarios del Sistema</h4>
              <div class="input-group search-box" style="margin-bottom: 0">
                <div class="input-wrapper">
                  <div class="input-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </div>
                  <input
                    type="text"
                    class="input-field"
                    placeholder="Buscar usuario..."
                    id="search-usuarios-input"
                  />
                </div>
              </div>
            </div>

            <div class="data-table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Mail</th>
                    <th>Usuario</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHTML}
                </tbody>
              </table>
            </div>
          </div>
    `;
  }
}

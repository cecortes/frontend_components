"use strict";

export class TablaClientesController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init() {
    // Si se inyecta desde la fábrica global, el dashboard controlará cuándo llamar a bindEvents()
    // Retornamos de inmediato el layout base.
    return this.view.renderTable();
  }

  async bindEvents() {
    // Polling asíncrono para esperar a que el layout renderizado por un agente superior inyecte nuestra tabla
    const checkExist = setInterval(async () => {
      const tableEl = document.getElementById("clientes-table");
      if (tableEl && document.body.contains(tableEl)) {
        clearInterval(checkExist);

        try {
          // Obtener los datos mapeados del modelo (fetch simulación backend)
          const data = await this.model.fetchClientsData();

          // Desplegar la lógica de UI y plugin DataTables
          this.view.initDataTable(data);

          // Escuchar eventos dinámicos renderizados por la tabla
          tableEl.addEventListener("click", (e) => {
            const btnView = e.target.closest(".btn-view");
            if (btnView) {
              const clienteId = btnView.dataset.id;
              console.log("Acción: Ver Cliente ID ->", clienteId);
            }
          });
        } catch (error) {
          console.error("Error inicializando DataTables de Clientes:", error);
        }
      }
    }, 50);
  }
}

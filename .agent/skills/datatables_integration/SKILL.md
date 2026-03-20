---
name: "Integración Estandarizada de DataTables"
description: "Paso a paso para integrar, inicializar y estilizar 'datatables.js' en un componente tipo tabla del proyecto siguiendo el ciclo de vida del DOM y la arquitectura MVC."
---

# Skill: Integración de DataTables en Tablas MVC

Esta _skill_ provee el canon oficial a seguir y debe ser utilizada indiscriminadamente **cada vez que se desee implementar o integrar la librería `datatables.net-dt` (DataTables) en un componente de tabla** en el dashboard WARESmart.

## 1. Comprendiendo el Paradigma (Por qué)

DataTables manipula pesadamente el DOM, y requiere que el elemento base (`<table id="...">`) exista "físicamente" en el documento antes de ejecutarse.
Bajo un patrón MVC asíncrono, si intentamos generar el HTML como un puro string en el `init()` y forzamos a inicializar la librería inmediatamente allí, causará errores porque el navegador aún no pinta la pantalla.

Por esto, dividimos exhaustivamente:

- **La Vista pinta el cascarón (Empty Shell):** El primer HTML que se entrega.
- **El Controlador delega la activación:** Espera a que el DOM exista, pide la BD al Modelo, y ordena a la Vista inicializar.

## 2. Instrucciones para la Vista (View)

La Vista encapsulará el diseño y la conexión con la librería de terceros, aislando por completo al Controlador de dependencias externas en el manejo del DOM.

### 2.1 El método de renderizado (`renderTable`)

Debe retornar la estructura maestra estática, un `<table>` con un `ID` único que DataTables atrapará. Nunca interar o generar los `<div/tr/td>` manualmente.

```javascript
renderTable() {
  return \`
    <div class="table-container card">
      <div class="table-header">
        <h4>Título de la Tabla</h4>
      </div>
      <div class="data-table-wrapper">
        <table id="mi-nueva-tabla" class="display" style="width:100%">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <!-- Cabeceras necesarias -->
            </tr>
          </thead>
          <tbody>
            <!-- VACÍO. DataTables se encargará. -->
          </tbody>
        </table>
      </div>
    </div>
  \`;
}
```

### 2.2 Inyección Modular (MANDATORIO)

Siempre debes requerir directamente el módulo base y los estilos de la librería dentro de tu Vista (`.js`), al inicio del archivo:

```javascript
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
```

### 2.3 Mutación y Empaquetamiento de Estilos de DataTables (`initComplete`)

Para asegurar la cohesión del diseño premium sin afectar los CSS globales, debemos inyectar la lupa en SVG nativa y forzar la clase `.input-field` al buscador dinámico de DataTables aplicando esta rutina obligatoria dentro de la propiedad `initComplete`:

```javascript
initDataTable(dataCollection) {
  const config = {
    data: dataCollection,
    // Configuraciones de visualización para formato "Panel con Scroll"
    info: false,
    paging: false,
    scrollY: "50vh",
    scrollCollapse: true,
    columns: [
      { data: "id" },     /* Las claves que vienen del Objeto JSON */
      { data: "nombre" },
      /* Columna de Acciones Personalizada */
      {
        data: null,
        orderable: false, // OBLIGATORIO: Evita intentar organizar por HTML
        searchable: false, // OBLIGATORIO: Evita que el buscador filtre texto en los botones
        render: function (data, type, row) {
          return `
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="btn btn-primary btn-edit" data-id="${row.id}" style="padding: 4px 8px; font-size: 0.75rem">Editar</button>
              <button class="btn btn-danger btn-delete" data-id="${row.id}" style="padding: 4px 8px; font-size: 0.75rem">Borrar</button>
            </div>
          `;
        }
      }
    ],
    language: {
       search: "Buscar:",
       lengthMenu: "Mostrar _MENU_ registros",
       zeroRecords: "No se encontraron resultados",
       info: "Mostrando pág _PAGE_ de _PAGES_",
       infoEmpty: "No hay registros disponibles",
       infoFiltered: "(filtrado de _MAX_ totales)",
       paginate: { first: "Primero", last: "Último", next: "Siguiente", previous: "Anterior" }
    },
    // INYECCIÓN VISUAL Y DOM MUTATION
    initComplete: function () {
      const table = document.getElementById("mi-nueva-tabla"); // CAMBIAR POR EL ID DECLARADO ARRIBA
      if (!table) return;

      const dtContainer = table.closest(".dt-container");
      if (!dtContainer) return;

      const dtSearch = dtContainer.querySelector(".dt-search");
      if (dtSearch) {
        dtSearch.classList.add("input-wrapper", "search-box");
        dtSearch.style.marginBottom = "0";

        const label = dtSearch.querySelector("label");
        if (label) label.style.display = "none";

        const input = dtSearch.querySelector(".dt-input");
        if (input) {
          input.classList.add("input-field");
          input.placeholder = "Buscar...";

          const iconHTML = \`
            <div class="input-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          \`;
          input.insertAdjacentHTML("beforebegin", iconHTML);
        }
      }
    }
  };

  // Instanciación
  new DataTable("#mi-nueva-tabla", config);
}
```

## 3. Instrucciones para el Controlador (Controller)

El Controlador es el cerebro. Proveerá el cascarón HTML al renderizador superior a través de un método `init()`, y paralelamente (o inmediatamente después, dependiendo de la cadena que inyecte la vista al body) ejecutará un ciclo de repetición (polling) dentro de `bindEvents()` para enlazar DataTables garantizando que la vista ya exista en el DOM.

```javascript
async init() {
  // Retorna el cascarón (Empty Shell) estático
  return this.view.renderTable();
}

async bindEvents() {
  // Polling seguro para esperar el Pintado del DOM dictado por el Router superior
  const checkExist = setInterval(async () => {
    const tableEl = document.getElementById("mi-nueva-tabla");
    if (tableEl && document.body.contains(tableEl)) {
      clearInterval(checkExist); // Apagamos el reloj

      try {
        // Pedir Datos
        const data = await this.model.fetchMyData();

        // Lanzar Biblioteca (La vista hace el trabajo de front)
        this.view.initDataTable(data);

        // OBLIGATORIO: Usar delegación de eventos al CONTENEDOR MAYOR (#mi-nueva-tabla) p/ los botones que recodifica dataTables
        tableEl.addEventListener("click", (e) => {
          const btnCustom = e.target.closest(".btn-accion-personalizada");
          if (btnCustom) {
            console.log("Activado el ID:", btnCustom.dataset.id);
          }
        });
      } catch (error) {
        console.error("Error vinculando DataTables", error);
      }
    }
  }, 50); // Muestreo ligero de 50ms
}
```

## 4. Instanciación (Patrón Factory)

El acoplamiento final del MVC dentro del ecosistema asíncrono debe realizarse siempre delegando la inyección de dependencias a un archivo de fábrica (`_factory.js`) local del componente. Ningún componente superior debe instanciar directamente los módulos MVC para mantener limpieza del cógido y alta mantenibilidad.

```javascript
import { MiModelo } from "./model/miModelo.js";
import { MiVista } from "./view/miVista.js";
import { MiControlador } from "./controller/miControlador.js";

export function createMiComponente() {
  const model = new MiModelo();
  const view = new MiVista();
  const controller = new MiControlador(model, view);

  return { model, view, controller };
}
```

## 5. Notas Arquitectónicas Cruciales

- **No tocar `style.css` global en cada tabla nueva:** Las reglas visuales ya están blindadas globalmente para sobreescribir `.dt-search .input-field` evitando duplicidad. Al hacer que el `<input>` reciba `.input-field` en _JS_, hereda todo.
- **Aislamiento del Modelo:** El modelo no requiere en lo absoluto adaptación para DataTables, su trabajo final es arrojar Promesas con Matrices/Subarreglos puras `(JSON)`.
- **Reuso estricto del HTML y Layout:** Al aplicar esta _skill_, un humano o tú, garantiza no corromper integraciones visuales, haciendo lucir el dashboard increíblemente cohesionado y estético siempre.
- **`Scroll vs Paginación` en layouts compactos:** Si el contenedor visual lo requiere (ej: un modal ancho o un un panel delimitado en el dashboard), es preferible desactivar la paginación tradicional y habilitar el scroll vertical usando `paging: false`, `info: false` adjuntando propiedades como `scrollY: "50vh"` y `scrollCollapse: true`. Esto estandariza la vista y mantiene el _grid_ alineado dentro del contenedor.
- **Columnas de Botones Limpias:** Siempre utiliza las flags `orderable: false` y `searchable: false` en las columnas que rendericen HTML estático (como botones de control "Editar/Borrar") para evitar comportamientos defectuosos o errores lógicos en el filtrado de DataTables.
- **Rigurosidad Asíncrona del Modelo:** El Modelo debe estar estructurado como Clase y sus métodos encargados de solicitar datos (`fetchMyData`) obligatoriamente deben retornar Promesas (`Promise<Array>`) para soportar y asimilar asincronismo real de red e inyección escalable con bases de datos.

# Especificación: Componentización de Tabla de Gestión de Clientes

## 1. Visión General

Este documento describe los requerimientos, la estructura y la implementación de la extracción de la tabla de "Gestión de Clientes" desde la vista estática del `Dashboard` hacia un componente independiente, reactivo y altamente estandarizado bajo la arquitectura **MVC** y el patrón **Factory** del ecosistema **WARESmart**. Además, este componente marca la pauta oficial para la integración de la librería `DataTables.js`.

## 2. Motivación y Objetivos

La tabla de clientes, anteriormente hardcodeada como una estructura HTML estática en `dashView.js`, ha sido refactorizada para cumplir con los siguientes objetivos:

- **Estandarización con DataTables:** Implementar la librería `datatables.net-dt` siguiendo estrictamente el canon definido en `SKILL.md`.
- **Desacoplamiento Funcional:** Aislar la lógica de negocio y visual de los clientes de la vista principal del dashboard.
- **Asincronismo Realista:** Utilizar un modelo de datos basado en `Promises` que simula la latencia de una API externa, facilitando la transición futura a servicios backend.
- **UX Premium (Scroll Panel):** Sustituir la paginación tradicional por un panel con scroll vertical dinámico (`50vh`), mejorando la integración visual en el layout del dashboard.
- **Mantenibilidad:** Centralizar la gestión de eventos (delegación de eventos) y la lógica de renderizado de estados y acciones.

## 3. Arquitectura y Estructura de Archivos

El componente se localiza en el directorio `vite-components/src/components/TablaClientes/` y se compone de los siguientes elementos:

- **`model/tablaClientesModel.js`**: Implementa el método `fetchClientsData()`, el cual retorna una promesa con un arreglo de 20 clientes generados dinámicamente.
- **`view/tablaClientesView.js`**:
  - `renderTable()`: Retorna el "cascarón" HTML (Card + Table ID).
  - `initDataTable()`: Configura el plugin de DataTables, inyecta la búsqueda estilizada con SVG y gestiona el renderizado de badges de estado ("Activo"/"Inactivo").
- **`controller/tablaClientesController.js`**: Orquestador que inicializa el componente mediante polling al DOM y vincula los eventos de los botones de acción.
- **`tabla_clientes_factory.js`**: Fábrica encargada de instanciar y ensamblar las piezas MVC para su consumo externo.

## 4. Lógica de Implementación y Decisiones Arquitectónicas

### 4.1. Integración de DataTables (Canon SKILL.md)

Se ha aplicado la configuración avanzada de DataTables para WARESmart:

- **Layout:** `paging: false`, `info: false`, `scrollY: "50vh"`, `scrollCollapse: true`.
- **Búsqueda Personalizada:** Se oculta el label nativo de búsqueda de DataTables y se inyecta un `input-wrapper` con icono SVG para mantener la cohesión visual con el resto del dashboard.
- **Optimización de Columnas:** Las columnas de "Estado" y "Acciones" utilizan funciones `render` personalizadas. La columna de acciones tiene explícitamente `orderable: false` y `searchable: false`.

### 4.2. Inyección de Dependencias y Ciclo de Vida

El componente es inyectado desde `dash_factory.js` hacia el `DashboardController`. El ciclo de vida de inicialización sigue este orden:

1. El Dashboard solicita el HTML base al controlador de clientes mediante `init()`.
2. Una vez que el Dashboard pinta la vista completa, el controlador de clientes detecta la presencia de la tabla en el DOM (polling).
3. Se solicitan los datos al modelo asíncrono.
4. Se inicializa el plugin DataTables sobre el elemento existente.

### 4.3. Estilo Visual y Componentización

- **Badges Dinámicos:** Se replican los estilos `badge-high` (Activo) y `badge-low` (Inactivo) mediante lógica de renderizado en la vista.
- **Posicionamiento:** La tabla se ha ubicado estratégicamente como penúltimo elemento de la sección de tablas, justo antes de la tabla de usuarios.

## 5. Criterios de Aceptación (Completados)

1. [x] **Arquitectura MVC y Factory:** Separación total de responsabilidades y ensamble mediante fábrica.
2. [x] **Cumplimiento de SKILL.md:** Implementación exacta de la integración de DataTables (Scroll vertical, búsqueda SVG).
3. [x] **Modelo Asíncrono:** Uso de `fetchClientsData()` retornando promesas con 20 registros.
4. [x] **Preservación Estética:** Identidad visual idéntica a la tabla original hardcodeada.
5. [x] **Integración sin Side-Effects:** El dashboard principal no sufrió alteraciones en sus otras funcionalidades (Órdenes, Productos, Usuarios).

## 6. Resultado Final

Se ha logrado un componente robusto y escalable que sirve como referencia técnica para futuras tablas en el proyecto. El uso de `DataTables.js` dota al dashboard de una capacidad de filtrado y visualización profesional, manteniendo la limpieza arquitectónica que caracteriza a **WARESmart**.

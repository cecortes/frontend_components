# Estrategia de Migración: Dashboard a Componente MVC

## 1. Objetivo

Migrar el mockup estático ubicado en `test/dashboard.html` hacia la arquitectura de componentes basada en el patrón MVC establecida en el proyecto (Vite/ESM), garantizando la reutilización, modularidad y apego estricto a la regla `@dacs/styles/mvc_pattern.dac`.

## 2. Análisis del Estado Actual

- **Mockup Estático (`test/dashboard.html`)**: Contiene la estructura completa (Sidebar, Top-bar, seccion de gráficas, y tablas de datos) más ~350 líneas de CSS embebido con variables de colores y temas. El comportamiento del menú lateral y overlay se maneja con un hack de CSS (checkbox silencioso).
- **Componente Base (`vite-components/src/components/dashboard/`)**: Ya cuenta con un esqueleto MVC (`dashController.js`, `dashModel.js`, `view/dashView.js`), pero actualmente renderiza un HTML mínimo y estático ("El Dash"). El controlador tiene base para inicialización y rutas.

## 3. Plan de Acción Arquitectónico

### A. La Vista (`dashView.js`)

De acuerdo con las reglas MVC, la Vista es responsable únicamente del marcado HTML, inserción en el DOM y captura de eventos.

1. **Migración de HTML**: Todo el cuerpo del mockup de `dashboard.html` (desde el input checkbox `#menu-toggle`, el `sidebar`, y el `main-container` que incluye las gráficas y tablas) será movido a `getTemplate()` o concatenado en las propiedades de renderizado de la clase `DashboardView` en `dashView.js`.
2. **Css y Estilos**:
   - Para no duplicar estilos, los estilos específicos del dashboard se integrarán y unificarán en el archivo global `vite-components/src/style.css`, procurando reutilizar selectores o variables que ya existan.
3. **Manejo de Eventos Nativos**:
   - Mantendremos el hack de CSS para el comportamiento del menú lateral y overlay, ya que maximiza el rendimiento y elimina la dependencia de JS puro para la UI básica.
   - Crearemos métodos de "binding" en `dashView.js` (`bindLogout`, `bindExport`, `bindSearchClients`) que capturan el click del usuario en esos elementos y ejecutan la función delegada (callback) inyectada por el Controlador.

### B. El Controlador (`dashController.js`)

El Controlador maneja la orquestación y el flujo de datos.

1. **Inicialización (`init()`)**: Requerirá instanciar (o recibir) la correcta View, inicializar sus oyentes de eventos y luego invocar el renderizado HTML.
2. **Carga de Datos (`loadDashboardData()`)**: Hará solicitud al `dashModel` para obtener datos de Tablas y Gráficas de manera asíncrona (Mock Data) y mandará actualizar la vista si es necesario (o pasarlos previamente a la vista en el renderizado inicial).
3. **Manejadores (Handlers)**:
   - Funciones como `handleLogout()`, `handleExportRequest()` y `handleSearchRequest(query)` que conectarán la Vista y el Modelo de manera bidireccional.

### C. El Modelo (`dashModel.js`)

Responsable únicamente de los datos y la lógica de estado (Completamente aislado del DOM).

1. **Datos Temporales (Mock Data)**: Trasladar el contenido "quemado" (hardcoded) de los clientes, inventario de productos y Órdenes de Compra presentes en las tablas a estructuras JS (JSON/Arreglos) alojadas en el modelo simulando una Base de Datos en memoria.
2. **Métodos de Recuperación**: Definir métodos asíncronos (`async fetchClients()`, `async fetchInventory()`, `async fetchOrders()`) que el Controlador llamará. En el futuro, estos métodos se reemplazarán por llamadas a APIs con `fetch()`.

## 4. Pasos de Implementación Recomendados

1. _Aislamiento del CSS_: Mover todos los bloques `<style>` de `dashboard.html` a un nuevo archivo `view/dash.css`.
2. _Migración de Estructura_: Copiar el `HTML` del body a un string dentro del método `renderDashboard()` en `dashView.js`.
3. _Separación de Datos_: Mover el listado de clientes y productos a `dashModel.js` creando métodos que retornan Promises.
4. _Binding de Lógica_: Actualizar `dashController.js` para ligar eventos UI con los métodos del modelo.
5. _Prueba final_: Ejecutar `npm run dev` para corroborar congruencia visual con el mockup original.

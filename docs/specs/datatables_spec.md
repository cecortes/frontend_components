# Especificación: Integración de DataTables en Tabla de Usuarios

## 1. Visión General

Este documento detalla la implementación técnica, arquitectónica y visual de la librería `datatables.net-dt` (DataTables) dentro del componente `TablaUsuarios` del sistema **WARESmart**. Se describen los cambios exhaustivos realizados para dotar a la tabla de funcionalidades interactivas (búsqueda, paginación, ordenamiento) respetando el diseño premium preexistente y el patrón MVC.

## 2. Motivación y Objetivos

La tabla original de usuarios carecía de interactividad nativa. La integración de DataTables busca cumplir con los siguientes objetivos:

- **Interactividad Inmediata:** Proveer paginación, ordenamiento por columnas y filtrado global sin requerir desarrollos algorítmicos complejos.
- **Mantener la Guía de Estilos:** Asegurar que los componentes inyectados por la librería (especialmente el buscador) asuman visualmente la estética uniforme del Dashboard (inputs oscuros, íconos SVG consistentes y bordes elegantes).
- **Respeto a la Arquitectura Funcional:** Implementar la librería de terceros limitando su intrusión a la capa de presentación y protegiendo el ciclo de vida del DOM gobernado por el patrón MVC de la aplicación.

## 3. Arquitectura y Lógica de Implementación (Qué y Por Qué)

La naturaleza manipuladora de la librería (la cual opera incisivamente sobre el DOM), exigió separar el instante de su inicialización del proceso estático inicial de renderizado.

### 3.1. Reestructuración de la Vista (`tablaUsuariosView.js`)

- **Qué:** Se modificó `renderTable()` para devolver un cascarón HTML vacío (solo el esqueleto `<table>` y el `<thead>`), removiendo la interpolación manual de filas `<tr>`.
  - **Por qué:** DataTables administra internamente el iterado de datos y exige acoplarse sobre una estructura de `table` pura. Seguir inyectando datos directamente como string interfería con el motor de inyección en JavaScript de la librería.
- **Qué:** Se creó un método encapsulado `initDataTable(usersData)` que recibe los perfiles de usuarios e inicializa de manera nativa ESM con la clase `new DataTable()`.
  - **Por qué:** Respeta sagradamente el Modelo de Vista, blindando esa parte para ser la única encargada de conocer e instanciar bibliotecas gráficas. Allí también se mudaron las propiedades visuales de los botones "Editar" y "Borrar".
- **Qué:** En las configuraciones de la tabla, se empleó el callback `initComplete` para mutar en tiempo de vida el contenedor original de búsqueda (`.dt-search`).
  - **Por qué:** Fue la ventana perfecta para inyectar dinámicamente las variables globales del proyecto (`.input-wrapper`, `.input-field`) y el ícono visual propio de la plataforma en SVG. Esto forzó al input orgánico de DataTables a absorber la identidad WARESmart previniendo ensayar de cero estilos CSS y mantener el _DRY (Don't Repeat Yourself)_.

### 3.2. Sincronización en el Controlador (`tablaUsuariosController.js`)

- **Qué:** Se refactorizó `init()` logrando que devuelva en _string asíncrono puro_ únicamente el cascarón html de la vista.
  - **Por qué:** Al montar el Dashboard principal su inicialización se efectúa drásticamente rápido; un cuello de botella solicitando datos detendría la aparición o el rendering fluido del dashboard.
- **Qué:** Se volvió un método asíncrono robusto a `bindEvents()` agregándole además un modelo de **Polling Liviano** con un ciclo (`setInterval` de 50ms).
  - **Por qué:** DataTables se crashearía mortalmente si intenta leer nodos sin parentesco al navegador. Este _Poller_ asegura que solo hasta encontrar físicamente que el div ha sido insertado al `document.body` por el Router, pida datos a DB e inicialice seguidamente la DataTables.
- **Qué:** Se centralizó el manejo de clics sobre los botones interinos bajo la estrategia algorítmica de **Event Delegation**.
  - **Por qué:** La paginación o el propio filtro en tiempo real elimina y recrea los botones en el HTML en milisegundos. Un puente clásico (`addEventListener` al botón en sí) se extinguiría y cortaría las transmisiones al instante de cambiar página; la delegación, impuesta en el envolvente inamovible de la tabla misma, escucha con éxito los nodos que sean redibujados interactivamente sin importar la página o filtro actual.

### 3.3. Neutralización Directa en Hoja de Uso Común (`style.css`)

- **Qué:** Se formuló una adición imperativa resguardada al final del archivo con sintaxis `div.dt-container .dt-search .input-field`.
  - **Por qué:** DataTables inyecta un set primario hostil sobre el `input`. Re-estableciendo la autoridad con prioridades forzadas (`!important`), el archivo maestro restablece el orden dictando sus propias formas visuales para el `border-radius`, margen y el padding original.

### 3.4. Integración Asíncrona Oficial y Autenticación Centralizada

- **Qué:** Se eliminaron los mocks (datos en duro y `setTimeout`) del `tablaUsuariosModel.js` transformando la petición en un `fetch` dinámico hacia el endpoint real del backend desde las variables de entorno (`.env`). La información cruda asimétrica (`users_name`, `users_role`) fue capturada y mapeada directamente a los keys visuales de la vista.
  - **Por qué:** Aseguró la persistencia real de la base de datos preservando al milímetro el diseño original de la vista de DataTables. Delegar el parseo internamente en el modelo salvó a la vista de quebrarse o tener que conocer prefijos o llaves agenas al frontend.
- **Qué:** Se integró la comunicación de tokens usando `SessionStorage` a través de inyección de dependencias en la factoría (`tabla_usuarios_factory.js`).
  - **Por qué:** Consumir ingenuamente un string plano llamado `token` mediante `localStorage` resultaba invariablemente en fallos tipo `HTTP 403 Forbidden` dados los estándares de la App; inyectar la clase autorizada `SessionStorage` (Single Source of Truth) a la creación del modelo erradica la posibilidad de desintonización en las peticiones.
- **Qué:** Se configuró una pared interceptora de código de estatus HTTP en `tablaUsuariosController.js` para los errores de retorno devueltos por el backend.
  - **Por qué:** Blindó firmemente la fluidez del navegador protegiendo contra inicializaciones crasheadas o malogradas hacia la librería DataTables si la base de datos se corta, restringiendo las fallas a códigos explícitos en consola resguardando al usuario corriente de interrupciones o fallos blancos.

## 4. Criterios de Aceptación (Completados)

1. [x] **Funcionalidad Completa:** Búsqueda inmediata, paginación visual y ordenamiento simétrico.
2. [x] **Integridad MVC Afianzada:** El proceso separó de manera nítida los datos asíncronos en Controller y la inicialización de recursos gráficos al View.
3. [x] **Integridad UI WARESmart:** Fusión absoluta con el campo de búsqueda tradicional y sus componentes de Tailwind/CSS base.
4. [x] **Tolerancia a Latencias de Redirección:** El flujo resiste la cadencia irregular del DOM mediante _Polling_ de seguridad protegiendo que DataTables encuentre su mesa de dibujo íntegra antes de desplegarse.

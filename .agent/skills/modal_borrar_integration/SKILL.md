---
name: modal_borrar_integration
description: Guía paso a paso para crear e integrar un Modal de Confirmación de Borrado (MVC) conectado a un componente tipo tabla en el entorno del Dashboard.
---

# Integración de Modal de Confirmación de Borrado (MVC)

Esta skill documenta el proceso estandarizado para implementar un modal funcional de confirmación asíncrona de borrado, asociado a las acciones destructivas de una tabla (ej. botón "Borrar" o icono de la papelera en DataTables), respetando de principio a fin la arquitectura estricta del proyecto WARESmart.

## Pre-requisitos Imperativos (¡Atención IA y Programador!)

Antes de escribir código o generar un plan de implementación para el modal de borrado, debes garantizar la obtención de la siguiente información:

1. **Variables de Entorno del Endpoint:** SIEMPRE DEBES preguntar explícitamente al usuario qué variable de entorno define la URL del endpoint (ej. `VITE_API_USERS_DEL_BY_ID`) dentro de `vite-components/.env`. No asumas ninguna ruta.
2. **Estructura del Payload (Body) y Método HTTP:** SIEMPRE DEBES pedirle al usuario el método que espera el backend (GET, POST, DELETE) y un ejemplo exacto de la estructura JSON ("body") necesaria (ej. `{"id": 4}`).

> [!IMPORTANT]
> En caso de que el usuario no te proporcione estas informaciones esenciales en el prompt inicial, **DEBES negarte a escribir código y preguntarle nuevamente** sin excepción hasta conseguir respuesta.

## Arquitectura Requerida (MVC + Factory)

Para cada nuevo modal de borrado (ej. `ModalBorrarUsuario`), se debe replicar la siguiente estructura de archivos:

1. **`icons/svg_icons.js`**:
   - Exporta un objeto `icons` con los SVG necesarios (`warning`, `close`).

2. **`model/modal[Nombre]Model.js`**:
   - Mantiene el estado del modal (`visible: boolean`) y los metadatos del elemento a eliminar (`userData: Object`).
   - Inyecta `SessionStorage` a través del `constructor` para acceder orgánicamente a `this.storage.Token`.
   - Emplea un método asíncrono para ejecutar el endpoint (ej. `async deleteEntity(id)`), consumiendo la variable de entorno solicitada, inyectando la cabecera `Authorization: Bearer` con el token y formateando el ID según lo requerido. Si la respuesta es `!ok`, invoca un `throw new Error(...)` descriptivo.

3. **`view/modal[Nombre]View.js`**:
   - Devuelve la vista empleando exclusivamente **`DOMParser()`** para convertir el HTML literal crudo a un Elemento Node: `parser.parseFromString(html, "text/html");`.
   - Utiliza `.modal-overlay`, `.modal-card`, `.modal-content` y `.modal-close-btn`. Presenta visualmente el icono de Warning arriba y la pregunta al usuario. Reduce los botones a `padding: 4px 16px`.
   - En la visibilidad, adjunta u oculta `modal-open` del body y `modal-visible` del overlay correspondiente.

4. **`controller/modal[Nombre]Controller.js`**:
   - **Inyección de Controladores de Mensajes:** Obliga a añadir al constructor las instancias para alertas globales (`modalErrorController`, `modalOkController`).
   - Suscribe el borrado al `<button>` afirmativo. Transfórmalo en un listener `async (e) => { ... }` para envolver la petición HTTP al Model con un bloque `try...catch`.
   - **Flujo Exitoso:** `await deleteEntity(...)`, propagación del `onConfirmCallback(userData)`, cierre de todo con `handleClose()` y llamada visual al usuario `this.modalOkController.showOk('Borrado Exitoso')`.
   - **Flujo de Error:** Ataja con el `catch`, efectúa de inmediato `handleClose()` (para limpiar la interfaz base) y delega la responsabilidad visual abriendo el `this.modalErrorController.showError()`.

5. **`factory/modal_[nombre]_factory.js`**:
   - Efectúa obligatoriamente un render anticipado `const element = view.renderModal();`.
   - Extrae dependencias inyectadas en su configuración de fábrica `static createModal(modalErrorController, modalOkController)` y ensambla `SessionStorage` llamando a `storage.loadSessionStorage()` antes de pasarlo al Modelo.

## Integración de Componentes Superiores (Dashboard y Tabla)

1. **Inyección en `dash_factory.js`:**
   - Importar e instanciar el Factory del respectivo modal.
   - **¡ATENCIÓN! Inyección Crítica:** Se deben remitir obligatoriamente los punteros (`modalErrorController`, `modalOkController`) construidos al inicio del sistema como argumentos del `ModalBorrar[Nombre]Factory.createModal(...)` para evitar que se declaren como indefinidos.

2. **Recepción en el Controlador de la Tabla (`tabla[Nombre]Controller.js`):**
   - Transaccionar vía **Event Delegation** del datatable comprobando la clase del botón de destrucción `.btn-delete`.
   - Extraer vía `dataset.id` e instanciar en caliente `this.modalBorrarController.showModal(userData, async (deletedUser) => { ... })`.
   - **Recarga de Tabla Reactiva:** En el callback exitoso (paso anterior), volver forzosamente a consultar la BD al modelo `data = await this.model.fetchData()` y sobrescribir reiniciando `this.view.initDataTable(data)` asegurando que la grilla del DataTables se refleje correctamente sin F5.

## Errores Comunes Identificados en Sesiones Anterior y Troubleshooting

- **Desalineación de Dependencias Inyectadas en Fábrica Múltiple:**
  - _Síntoma en consola:_ `TypeError: Cannot read properties of undefined (reading 'showError')` (u ocasionalmente `'showOk'`).
  - _Causa:_ El archivo raigambre `dash_factory.js` olvidó mandar `modalErrorController` o `modalOkController` en los paréntesis de llamado a `createModal()`. El controlador exitoso dispara `.showOk(...)` sobre el vacío, arroja error intrínseco, cae en el bloque catch que intenta abrir el error también inexistente y colapsa el Call Stack.
  - _Solución:_ Modificar el ensamblaje en el DashFactory (raíz) añadiendo los respectivos constructores interceptores.

- **Fallo de Actualización Dinámica del DOM (Data Persistence):**
  - _Síntoma:_ El registro se elimina íntegramente de la base de datos (se refleja un estatus Network en 200 HTTP) pero visualmente sobrevive en la vista `DataTables` provocando comportamientos erróneos.
  - _Solución:_ Emplear una reconstrucción asíncrona dentro de la subscripción de `onConfirmCallback`. Hacer un `fetch`, actualizar la referencia let que provee al Array inicial y redibujar con `.initDataTable(nuevaData)`.

- **Inyección de Nodo Huérfano en el Router Principal (`main.js`):**
  - _Síntoma:_ Al disparar el evento del botón asignado, la consola no marca errores y el código del controlador se ejecuta debidamente, pero el modal jamás se muestra en la pantalla (permanece invisible).
  - _Causa:_ En el árbol de fábricas de dependencias (Factories), si bien el elemento Node se empaquetó (`element`) y devolvió correctamente desde local a `dash_factory.js`, fue olvidado/omitido en el archivo renderizador final `main.js`. El modal existe operativamente en la memoria pero nunca es adjuntado físicamente a la interfaz debido a que faltó realizar el `document.body.append()`.
  - _Solución:_ Modificar el bloque del layout maestro en `main.js` (o en su debido router), garantizando la destructuración formal del Node Element retornado por la factoría asíncrona, e incluirlo explícitamente en el conjunto inyectado de `document.body.append(..., nuevoElementoModal)`.

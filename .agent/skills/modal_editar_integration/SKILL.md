---
name: modal_editar_integration
description: Guía paso a paso para crear e integrar un Modal de Edición (MVC) conectado a un componente tipo tabla en el entorno del Dashboard.
---

# Integración de Modal de Edición para Tablas (MVC)

Esta skill documenta el proceso estandarizado para implementar un modal funcional de edición asociado a las acciones de una tabla de acuerdo a la arquitectura del proyecto WARESmart.

## Pre-requisitos Imperativos (¡Atención IA y Programador!)

Antes de escribir código o generar un plan de implementación para el modal de edición, debes garantizar la obtención de la siguiente información:

1. **Variables de Entorno del Endpoint:** SIEMPRE DEBES preguntar explícitamente al usuario qué variable de entorno define la URL del endpoint (ej. `VITE_API_USERS_EDIT_BY_ID`). No asumas ninguna ruta.
2. **Estructura del Payload (Body):** SIEMPRE DEBES pedirle al usuario un ejemplo exacto de la estructura JSON (el "body") que espera el backend para realizar la edición (ej. llaves específicas como `id`, `updateData` u otras).

> [!IMPORTANT]
> En caso de que el usuario no te proporcione estas dos informaciones (Variable de Entorno y Estructura del Payload) en el prompt inicial, **DEBES negarte a escribir código y preguntarle nuevamente** hasta que te las proporcione claramente.

## Arquitectura Requerida (MVC + Factory)

Para cada nuevo modal de edición (ej. `ModalEditarUsuario`, `ModalEditarCliente`), se debe replicar la siguiente estructura de carpetas y archivos dentro de `vite-components/src/components/Modal[Nombre]`:

1. **`icons/svg_icons.js`**:
   - Exporta un objeto `icons` con los SVG necesarios (`edit`, `close`, etc.).
2. **`model/modal[Nombre]Model.js`**:
   - Mantiene el estado del modal (ej. `visible: boolean`) y los datos del elemento a editar (`data: Object`).
   - El constructor DEBE recibir el `storage` (instancia de `SessionStorage`) para tener acceso al `this.storage.Token`.
   - Contiene los setters y getters correspondientes: `setVisible()`, `getVisible()`, `setUserData()`, `getUserData()`.
   - Contiene el método asíncrono `updateX(id, updatedData)` el cual lee el endpoint desde `import.meta.env.*`, prepara el body (mapeando con precisión al payload exigido por el usuario) y realiza la petición `fetch` con método `POST` enviando la cabecera `Authorization: Bearer ${token}`.
   - Si la respuesta `!response.ok` o `!json.success`, arroja un `Error` con su respectivo mensaje HTTP.

3. **`view/modal[Nombre]View.js`**:
   - Contiene el cascarón HTML generado por template literals (`renderModal()`).
   - **Estilos Generales**: Debe reutilizar las clases `.modal-overlay`, `.modal-card`, `.modal-close-btn` y `.modal-content` existentes.
   - **Formulario**: Agrupar los elementos en divs con clase `.input-group` añadiendo `style="margin-bottom: 0;"`. Usar `.input-field` para los inputs. En los campos `<select>`, ajustar el padding y fuente (`padding: 0.5rem 0.75rem; font-size: 0.875rem;`) para centrar el texto verticalmente.
   - **Reglas para Selects `<select>`**:
     - La IA **siempre debe preguntar** al usuario cuáles son los valores esperados que deben tener las etiquetas `<option>` antes de generar el código.
     - Los atributos `value` de las `<option>` deben definirse en un formato estandarizado (ej: minúsculas sin espacios: `value="admin"`).
   - **Botones de Acción**: Usar un div en la parte inferior con `style="display: flex; justify-content: space-between; gap: 1rem;"`. Incluir el botón "Cancelar" (`.btn-danger`) y el botón "Aplicar" (`.btn-primary`), ambos reducidos de tamaño con `padding: 4px 16px; font-size: 1rem;`.
   - Contiene los métodos `show(data)` para inyectar datos y abrir el modal, y `hide()` para cerrarlo y resetear el formulario. **Importante:** Al inyectar datos en un `<select>`, el valor del dato entrante (ej. `userData.rol` de la tabla) **debe normalizarse** (ej. aplicándole `.trim().toLowerCase()`) antes de asignarse a `.value`, para garantizar que se seleccione automáticamente sin importar cómo venga escrito textualmente (mayúsculas o espacios extra).

4. **`controller/modal[Nombre]Controller.js`**:
   - Suscribe y administra los eventos (`modalEventHandler`): Cierre via botón 'X', botón 'Cancelar', click en el 'overlay' oscuro, y tecla 'ESC'.
   - Captura el submit del formulario mediante un evento `async (e) => { e.preventDefault(); ... }`.
   - Debe envolver la invocación al modelo (`await this.model.updateX(...)`) dentro de un bloque `try...catch`.
   - Si es exitoso: Llama a `onSaveCallback(updatedData)` y, solo entonces, cierra el modal.
   - En el bloque `catch`: Maneja el error reportando `console.error(...)` e impide que el modal se cierre (para que el usuario vea que falló y pueda corregir o reintentar).

5. **`factory/modal_[nombre]_factory.js`**:
   - Ensambla el patrón MVC: Instancia View, Model y Controller.
   - **Inyección de Dependencias:** Debe instanciar la clase `SessionStorage` (importada de `../components/Storage/storage.js`), invocar `loadSessionStorage()` sobre ella, y enviarla como parámetro al constructor del Model.
   - Ejecuta la renderización base HTML y liga los eventos del controller de inicio.
   - Retorna un objeto desestructurable: `{ element: HTMLElement, controller: Controller }`.

## Integración de Componentes Superiores

1. **Inyección en `dash_factory.js`:**
   - Importar e instanciar el Factory del nuevo modal.
   - Pasar la instancia retornada de su controlador (`modal[Nombre]Controller`) como parámetro al factory de la tabla principal que lo requiere (ej. `Tabla[Nombre]Factory.createTabla(modal[Nombre]Controller)`).
   - Extraer el `.element` del modal y retornarlo en el objeto contenedor general del Dashboard (`dashComponent`) para que el `main.js` lo inyecte apropiadamente en el `document.body`.

2. **Recepción en el Controlador de la Tabla (`tabla[Nombre]Controller.js`):**
   - En el `constructor`, inyectar y recibir el controlador del modal recién parametrizado.
   - **Prevención de Closures Obsoletos:** Los datos base con los que la tabla se renderiza deben ser declarados en el contexto global de la función (ej. `let data = await this.model.fetchData()`) en lugar de `const data`, para permitir su reasignación.
   - En el método `bindEvents()`, capturar el clic en base a _Event Delegation_ del datatable. Al identificar la clase del botón de editar (ej. `if (btnEdit)`), extraer el ID (`dataset.id`).
   - Buscar el registro en el arreglo global de los datos de la tabla (ej. `data.find(row => row.id === rowId)`).
   - Realizar la apertura del modal enviando los datos del registro y declarando el callback como **asíncrono**: `this.modal[Nombre]Controller.showModal(rowData, async (updatedData) => { ... })`.
   - **Recarga de Datos Tras Éxito:** Dentro del callback, solicitar de nuevo al servidor la lista fresca de registros (`const newData = await this.model.fetchData();`), sobrescribir el contenedor local (`data = newData;`) para corregir problemas de persistencia en futuros clics, y re-inicializar gráficamente recargando el array mediante `this.view.initDataTable(data);` asumiendo que el datatable posee configuración `destroy: true`.

## Reglas Críticas Adicionales

- **Nombres de Archivos Estándar:** La carpeta de iconos debe crear estrictamente el archivo `svg_icons.js` exportando la constante `icons`.
- **Botones Optimizados:** Asegurarse de mantener la reducción geométrica (`4px 16px`) y los colores (`btn-danger` a la izquierda, `btn-primary` a la derecha) indicados arriba sin excepción, adaptándose al layout WARESmart.
- **Fuentes de Datos Restantes:** La mutación base del Array general ante un callback "Aplicar" es decisión de cada tabla, este scope se limita a abrir el Modal y enviar las peticiones.

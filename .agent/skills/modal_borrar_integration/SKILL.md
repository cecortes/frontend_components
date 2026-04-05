---
name: modal_borrar_integration
description: Guía paso a paso para crear e integrar un Modal de Confirmación de Borrado (MVC) conectado a un componente tipo tabla en el entorno del Dashboard.
---

# Integración de Modal de Confirmación de Borrado (MVC)

Esta skill documenta el proceso estandarizado para implementar un modal funcional de confirmación asíncrona de borrado, asociado a las acciones destructivas de una tabla (ej. botón "Borrar" o icono de la papelera en DataTables), respetando de principio a fin la arquitectura estricta del proyecto WARESmart.

## Arquitectura Requerida (MVC + Factory)

Para cada nuevo modal de borrado (ej. `ModalBorrarUsuario`, `ModalBorrarCliente`), se debe replicar la siguiente estructura de carpetas y archivos dentro de `vite-components/src/components/Modal[Nombre]`:

1. **`icons/svg_icons.js`**:
   - Exporta un objeto `icons` con los SVG necesarios (`warning`, `close`).

2. **`model/modal[Nombre]Model.js`**:
   - Mantiene el estado del modal (`visible: boolean`) y los metadatos del elemento a eliminar (`userData: Object`).
   - Contiene sus setters y getters apropiados: `setVisible()`, `getVisible()`, `setUserData()`, `getUserData()`.

3. **`view/modal[Nombre]View.js`**:
   - Devuelve la vista empleando exclusivamente **`DOMParser()`** para convertir el HTML literal crudo a un Elemento Node estructurado:

     ```javascript
     const html = \`...\`;
     const parser = new DOMParser();
     const doc = parser.parseFromString(html, "text/html");
     this.element = doc.body.firstElementChild;
     return this.element;
     ```

   - **Estilos Generales UI**: El recuadro del Modal usa las clases base `.modal-overlay`, `.modal-card`, `.modal-content` y `.modal-close-btn`.
   - **Contenido y Layout**: Se omite la generación de formularios. Presenta visualmente el icono de Warning arriba (dentro de un contenedor circular con fondo `var(--color-critical-500)` e ícono en color blanco), seguido de la pregunta "¿Estás seguro que deseas eliminar...?" centrada y destacando en negritas o en color primario el identificador del registro.
   - **Botones de la Acción Destructiva**: El contenedor de `<div style="display: flex; justify-content: space-between; gap: 1rem;">` presentará el botón "Cancelar" (`.btn-danger`) a la izquierda y el botón de "Eliminar" (`.btn-primary`) a la derecha, para mantener una estricta coherencia con el modal de edición, estandarizado en (`padding: 4px 16px; font-size: 1rem;`).
   - **Visibilidad (CRÍTICO)**:
     - La función `show()` DEBE aplicar: `$overlay.classList.add("modal-visible");` y `document.body.classList.add("modal-open");`.
     - La función `hide()` DEBE retirar dichas clases: `$overlay.classList.remove("modal-visible");` y `document.body.classList.remove("modal-open");`.

4. **`controller/modal[Nombre]Controller.js`**:
   - Suscribe y administra los eventos de cierre (botón X, cancelar, click en overlay externo y tecla Escape).
   - Registra el `addEventListener("click")` en el botón de eliminación, lee el modelo (`this.model.getUserData()`) y desencadena el `this.onConfirmCallback(userData)`. Oculta el modal al finalizar con `this.handleClose()`.

5. **`factory/modal_[nombre]_factory.js`**:
   - Ensambla el patrón MVC instanciando View, Model y Controller.
   - Efectúa obligatoriamente el render anticipado `const element = view.renderModal();` antes de la asignación de eventos en el controlador (`controller.modalEventHandler()`).
   - Retorna `{ element, controller }`.

## Integración de Componentes Superiores

1. **Inyección en `dash_factory.js`:**
   - Importar e instanciar la Factory del respectivo modal.
   - Pasar su controlador instanciado como argumento al factory de la tabla principal (`Tabla[Nombre]Factory.createTabla(...)`).
   - Exportar su representación en el DOM, `element`, a la variable agrupadora que retorna el Dashboard component. Esta la insertará un script en el `body` principal mediante `document.body.append()`.

2. **Recepción en el Controlador de la Tabla (`tabla[Nombre]Controller.js`):**
   - Inyectar el controlador de confirmación de borrado en el `constructor()` del Controlador de Tabla.
   - En el método `bindEvents()`, abstraer el clic usando **Event Delegation** del datatable (`if (btnDelete)` capturando la clase base del botón).
   - Extraer el ID correspondiente del botón presionado (ej. `dataset.id`).
   - Localizar la data global (`data.find()`) y pasar los parámetros en caliente llamando al método `this.modal[Nombre]Controller.showModal(rowData, (targetData) => { ... })`
   - Dentro del callback devuelto, proceder con la lógica o llamada HTTP pertinente hacia los servicios del backend para finalizar la eliminación.

## Lecciones del Entorno y Bug Fixes

- **Aislamiento del Shadow DOM vs Selectores Globales**: Previo a instanciar los Eventos, garantice que el script de visualización NO dependa en lo absoluto de `document.getElementById(...)` si el string no ha sido incrustado al body. Emplee siempre el `DOMParser()` para construir el objeto del modal en el vacío y apóyese únicamente sobre sub-selectores `this.element.querySelector(...)`.

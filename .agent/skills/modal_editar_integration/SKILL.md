---
name: modal_editar_integration
description: Guía paso a paso para crear e integrar un Modal de Edición (MVC) conectado a un componente tipo tabla en el entorno del Dashboard.
---

# Integración de Modal de Edición para Tablas (MVC)

Esta skill documenta el proceso estandarizado para implementar un modal funcional de edición asociado a las acciones de una tabla (ej. botón "Editar" en DataTables) de acuerdo a la arquitectura del proyecto WARESmart.

## Arquitectura Requerida (MVC + Factory)

Para cada nuevo modal de edición (ej. `ModalEditarUsuario`, `ModalEditarCliente`), se debe replicar la siguiente estructura de carpetas y archivos dentro de `vite-components/src/components/Modal[Nombre]`:

1. **`icons/svg_icons.js`**:
   - Exporta un objeto `icons` con los SVG necesarios (`edit`, `close`, etc.).
2. **`model/modal[Nombre]Model.js`**:
   - Mantiene el estado del modal (ej. `visible: boolean`) y los datos del elemento a editar (`data: Object`).
   - Contiene los setters y getters correspondientes: `setVisible()`, `getVisible()`, `setUserData()`, `getUserData()`.

3. **`view/modal[Nombre]View.js`**:
   - Contiene el cascarón HTML generado por template literals (`renderModal()`).
   - **Estilos Generales**: Debe reutilizar las clases `.modal-overlay`, `.modal-card`, `.modal-close-btn` y `.modal-content` existentes.
   - **Formulario**: Agrupar los elementos en divs con clase `.input-group` añadiendo `style="margin-bottom: 0;"`. Usar `.input-field` para los inputs. En los campos `<select>`, ajustar el padding y fuente (`padding: 0.5rem 0.75rem; font-size: 0.875rem;`) para centrar el texto verticalmente.
   - **Botones de Acción**: Usar un div en la parte inferior con `style="display: flex; justify-content: space-between; gap: 1rem;"`. Incluir el botón "Cancelar" (`.btn-danger`) y el botón "Aplicar" (`.btn-primary`), ambos reducidos de tamaño con `padding: 4px 16px; font-size: 1rem;`.
   - Contiene los métodos `show(data)` para inyectar datos y abrir el modal, y `hide()` para cerrarlo y resetear el formulario.

4. **`controller/modal[Nombre]Controller.js`**:
   - Suscribe y administra los eventos (`modalEventHandler`): Cierre via botón 'X', botón 'Cancelar', click en el 'overlay' oscuro, y tecla 'ESC'.
   - Captura el submit del formulario mediante `e.preventDefault()`, lee los valores ingresados desde los selectores DOM de la vista, actualiza el modelo y dispara el callback opcional `onSaveCallback(updatedData)`.

5. **`factory/modal_[nombre]_factory.js`**:
   - Ensambla el patrón MVC: Instancia View, Model y Controller.
   - Ejecuta la renderización base HTML y liga los eventos del controller de inicio.
   - Retorna un objeto desestructurable: `{ element: HTMLElement, controller: Controller }`.

## Integración de Componentes Superiores

1. **Inyección en `dash_factory.js`:**
   - Importar e instanciar el Factory del nuevo modal.
   - Pasar la instancia retornada de su controlador (`modal[Nombre]Controller`) como parámetro al factory de la tabla principal que lo requiere (ej. `Tabla[Nombre]Factory.createTabla(modal[Nombre]Controller)`).
   - Extraer el `.element` del modal y retornarlo en el objeto contenedor general del Dashboard (`dashComponent`) para que el `main.js` lo inyecte apropiadamente en el `document.body`.

2. **Recepción en el Controlador de la Tabla (`tabla[Nombre]Controller.js`):**
   - En el `constructor`, inyectar y recibir el controlador del modal recién parametrizado.
   - En el método `bindEvents()`, capturar el clic en base a _Event Delegation_ del datatable. Al identificar la clase del botón de editar (ej. `if (btnEdit)`), extraer el ID (`dataset.id`).
   - Buscar el registro en el arreglo global de los datos de la tabla (ej. `data.find(row => row.id === rowId)`).
   - Realizar la apertura del modal con la información precisa: `this.modal[Nombre]Controller.showModal(rowData, (updatedData) => { ... })`.

## Reglas Críticas Adicionales

- **Nombres de Archivos Estándar:** La carpeta de iconos debe crear estrictamente el archivo `svg_icons.js` exportando la constante `icons`.
- **Botones Optimizados:** Asegurarse de mantener la reducción geométrica (`4px 16px`) y los colores (`btn-danger` a la izquierda, `btn-primary` a la derecha) indicados arriba sin excepción, adaptándose al layout WARESmart.
- **Fuentes de Datos Restantes:** La mutación base del Array general ante un callback "Aplicar" es decisión de cada tabla, este scope se limita a abrir el Modal y enviar las peticiones.

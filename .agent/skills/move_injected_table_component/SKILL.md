---
name: move_injected_table_component
description: Guía detallada y paso a paso para mover un componente MVC tipo 'Tabla' (html inyectado) y sus modales dependientes desde una vista origen hacia una vista destino, evitando fugas en el enrutador (error undefined).
---

# Guía para Mover Componentes Tipo Tabla (HTML Inyectado)

**ESTADO: ACTIVO**

Esta guía dicta el flujo de trabajo estándar, arquitectónico y preventivo para migrar o mover la inyección de un componente tipo 'Tabla' (o similar) de una vista (Componente Origen) hacia otra vista distinta (Componente Destino) dentro de un entorno MVC que utiliza Factories e Inyección de Dependencias.

## 1. El Flujo de Migración Paso a Paso

Para mover de forma limpia un componente MVC, el proceso se divide en 3 fases obligatorias:

### FASE 1: Inyección en el Entorno Destino (Target)
1. **Modificar Factory Destino (`target_factory.js`)**:
   - Importar la factoría de la Tabla y las factorías de los Modales dependientes (ej. ModalEditar, ModalBorrar).
   - Instanciar los modales dependientes pasando los modales globales (`modalError`, `modalOk`).
   - Instanciar el controlador de la tabla inyectándole dichos modales dependientes.
   - Pasar el controlador de la tabla recién creado como parámetro final al constructor del `TargetController`.
   - **Retornar** en el objeto final de la factoría las variables generadas por los modales para que el router pueda procesarlos.

2. **Modificar Controlador Destino (`targetController.js`)**:
   - Recibir el controlador de la tabla en el constructor y guardarlo en la instancia (`this.tablaController`).
   - En el método `init()`, inicializar el controlador de forma asíncrona: `const tablaHTML = await this.tablaController.init()`.
   - Pasar `tablaHTML` al método `renderTarget(..., tablaHTML)` de la vista destino.
   - Vincular los eventos de la tabla justo antes de retornar el HTML principal: `this.tablaController.bindEvents()`.

3. **Modificar Vista Destino (`targetView.js`)**:
   - Recibir el parámetro `tablaHTML` en el método generador de la plantilla.
   - Interpolar `\${tablaHTML}` dinámicamente en el lugar del DOM donde debe mostrarse.

### FASE 2: Limpieza en el Entorno Origen (Source)
1. **Limpiar Factory Origen (`source_factory.js`)**:
   - Remover las importaciones, instanciaciones e inyecciones asociadas al componente tabla y a sus modales.
   - Retirar del `return` final del factory las referencias a los elementos DOM de dichos modales.

2. **Limpiar Controlador Origen (`sourceController.js`)**:
   - Eliminar del constructor el parámetro que recibía el controlador de la tabla.
   - Remover las llamadas a su `init()` y a su `bindEvents()`.
   - Quitar la variable asociada de los argumentos enviados a la Vista.

3. **Limpiar Vista Origen (`sourceView.js`)**:
   - Remover el parámetro del controlador de la vista.
   - Borrar la variable interpolada `\${tablaHTML}` del template literal, limpiando el layout.

---

## 2. El Error Inadvertido del Enrutador ("undefinedundefined")

**NUNCA OLVIDES LA FASE 3.** Durante migraciones de este tipo, el principal punto de quiebre recae en el **Enrutador Global (`main.js`)**, resultando en un texto visual bizarro en la pantalla de origen.

### El Síntoma
Después de realizar la Fase 1 y Fase 2, en el Componente Origen (donde la tabla solía estar inyectada), aparece repentinamente el texto estático `"undefinedundefined"` adherido en la base del layout (o en el lugar que ocupaba el componente previo), arruinando la vista.

### Análisis y Causa Raíz
El componente origen delegaba al `Router` (`main.js`) la inyección a nivel superior (body) de sus modales. Al completarse la Fase 2, la `source_factory.js` **dejó de retornar** los objetos de modales (`modalEdit`, `modalDelete`). 

Sin embargo, el destructuring dentro del enrutador seguía intentando extraerlos para agregarlos al body:
```javascript
// Causa del error en el Router (main.js)
const { element, modalEdit, modalDelete } = await SourceFactory.sourceComponent();

// Si modalEdit y modalDelete ya no son retornados por la factoría, valdrán `undefined`
document.body.append(modalEdit, modalDelete); 
```
**Comportamiento de la API nativa:** Cuando le pasamos la primitiva `undefined` al método `document.body.append()`, el navegador hace una coerción de tipo y lo parsea como la cadena de texto literal `"undefined"`. Al adjuntar dos de estas, las pega como `"undefinedundefined"` al final del cuerpo del HTML, provocando el error visual.

### FASE 3: Corrección Crítica (Modificación del Router / `main.js`)

Para prevenir y solucionar este fenómeno, siempre que muevas un componente con modales, debes reescribir sus referencias en el archivo enrutador:

1. **Limpieza de Ruta de Origen:**
   Ve a la definición de la ruta origen en `main.js` y remueve la deestructuración de las variables de modales extintas, asegurándote de no inyectarlas en el `document.body.append()`.

2. **Migración a la Ruta Destino:**
   Ve a la definición de la ruta destino en `main.js`, recibe en la deestructuración los modales que retorna tu nueva configuración de la `target_factory.js`, e inyéctalos en el DOM de forma defensiva para asegurar funcionalidad global y evitar bugs de lectura:

```javascript
// Corrección obligatoria en el enrutador para la ruta DESTINO
"/ruta-destino": async () => {
    const { element, modalError, modalOk, modalEdit, modalDelete } = await TargetFactory.targetComponent();
    
    // Adjuntar los modales al body de forma segura:
    if (modalError) document.body.append(modalError);
    if (modalOk) document.body.append(modalOk);
    if (modalEdit) document.body.append(modalEdit);
    if (modalDelete) document.body.append(modalDelete);
    
    return element;
}
```

> **Regla de Oro:** Siempre que extraigas un componente que dependa de modales u overlays globales, el enrutador principal (`main.js`) es el eslabón final que debe actualizarse. Las referencias huérfanas en el `append` generarán inyecciones de strings de texto (undefined) en tu aplicación.

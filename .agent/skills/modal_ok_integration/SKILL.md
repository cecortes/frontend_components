---
name: Integración de ModalOk (MVC & Factory)
description: Guía obligatoria y detallada para implementar el componente de éxito ModalOk dentro de cualquier otro componente tipo Modal en el proyecto WARESmart.
---

# Guía para la Integración de ModalOk en Modales

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta Skill dicta el procedimiento estandarizado que debes seguir sin excepción al implementar, inyectar o desplegar el manejador de éxitos visuales (`ModalOk`) como respuesta de éxito dentro de cualquier otro flujo del proyecto (e.g. `ModalEditarUsuario`, `ModalBorrarUsuario`, etc.).

---

## 1. REQUISITO BLOQUEANTE EXTREMO: Identificación del Componente

Antes de mirar código, lanzar herramientas de consola o proponer soluciones técnicas, **TIENES QUE DETENERTE Y REALIZAR LA SIGUIENTE PREGUNTA ESTRICTA:**

> "¿En qué componente de tipo Modal deseas implementar el ModalOk?"

**REGLA DE TOLERANCIA CERO:** Si el usuario ignora, contesta otra cosa o su respuesta es ambigua, **DEBES REPETIR LA PREGUNTA Y NEGARTE A AVANZAR**. La ejecución de esta skill no puede comenzar sin el nombre exacto del Componente/Factory objetivo.

---

## 2. Prevención de Errores Críticos e Históricos

A partir del historial del proyecto, han surgido dos fallas críticas en este flujo que **DEBES** confirmar y solventar durante tu fase de análisis:

### A. Prevención "Invalid form control is not focusable"

Cuando vayas a inyectar lógica asíncrona liderada por nuestro validador JS (`FieldsValidator`), es vital asegurarse de que en la vista (`*View.js`) del componente emisor **se eliminen todos los atributos HTML `required`** de la plantilla `<form>`.

- _Lección_: Usar validación nativa HTML5 (`required`) interfiere con el validador JS porque el navegador secuestra el evento y, al ser modal oculto o dinámico, provoca crasheos fatales por no encontrar los elementos o carecer de atributos `name`.

### B. Prevención de "Nodos Fantasma / Huérfanos"

Si al montar un nuevo Modal, tu código se ejecuta bien pero **no se ve por pantalla**, esto significa que el DOM virtual no fue inyectado en el nivel principal.

- _Lección_: Al retornar el `$element` del `ModalOk` a través de los Factories Globales (`dash_factory.js`), DEBES rastrear inmediatamente hacia dónde viaja ese objeto y confirmar que el enrutador (`main.js` o `router.js`) haga la destructuración de la variable y active la orden imperativa `document.body.append(modalOk)`.

---

## 3. Integración Directa (Paso a Paso - Patrón Factory)

Una vez confirmados los riesgos anteriores y validado el nombre del componente, este es el modelo que debes instaurar:

### Paso 1: Ensamblador Global (`dash_factory.js`)

El orquestador en jefe es el encargado de generar e hidratar ambos modales universales (Error y Ok).

1. Crea/recibe el `modalOkController`.
2. Suminístraselo inyectado al creador del componente dependiente (Ej. `MiModalInteresadoFactory.createModal(..., modalOkController)`).
3. Exporta imperativamente la llave del Node DOM (ej. `modalOk: modalOkElement`).

### Paso 2: Factory del Componente Base (`*Factory.js`)

El constructor principal o `createModal()` del componente interesado debe:

1. Actualizar su firma admitiendo `modalOkController` como parámetro.
2. Inyectarlo directamente pasándolo como argumento hacia el constructor de su propio `[Nombre]Controller`.

### Paso 3: Controlador del Componente Base (`*Controller.js`)

Lleva a cabo la sustitución principal de manejo de estado:

1. Guardar la referencia en su propio constructor: `this.modalOkController = modalOkController`.
2. Localizar la lógica exitosa post-backend (bloque Try tras fetch/updateUser).
3. Eliminar todo rastro de `console.log()` que demuestre éxito.
4. Invocar el flujo orquestado de dos pasos: primero esconder el de edición, y luego mostrar el de Éxito.

   ```javascript
   // 1. Cerrar vista local (edit) tras guardado
   this.handleClose();

   // 2. Destacar en pantalla un popup limpio verde
   this.modalOkController.showOk("El elemento se actualizó correctamente.");
   ```

### Paso 4: Cierre con Router (`main.js`)

Siguiendo la lección descrita en 2.B, dirígete automáticamente a la clase que captura las constantes resultantes de `dash_factory.js` y asegúrate de añadir la variable a la lista separada por comas dentro de `document.body.append(..., modalOk, ...)`.

---

## 4. Testing Manual para el Usuario

Al terminar, exige al usuario comprobar la visualización para dar por validado el proceso:

1. Activar el respectivo Modal emisor e intentar realizar cambios en algún input o validación con base a lo esperado.
2. Confirmar que los tooltips se disparan en vez de reventar error en consola de "_Invalid form control_".
3. Someter los cambios. Comprobar cómo el card desaparece sin trazo secundario y brota imponentemente en verde `ModalOk` de cara al usuario bloqueando interacciones erróneas secundarias.

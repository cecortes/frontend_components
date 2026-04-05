---
description: Regla para forzar el uso de la Skill modal_editar_integration. Esta regla se aplicará SIEMPRE que se solicite implementar o modificar un botón o acción de "Editar" dentro de cualquier componente tipo tabla del proyecto.
---

# Regla: Integración Modal de Edición (Tablas)

Esta regla garantiza que la experiencia de usuario (UX) y la interfaz de usuario (UI) para la edición de registros en tablas mantengan una estética, funcionalidad y arquitectura MVC estandarizada según el componente original `ModalEditarUsuario` y el diseño base de `WARESmart`.

## Cuándo Aplicar

**SIEMPRE** que se cumplan las siguientes condiciones:

1. Se solicite crear o implementar una acción de "Editar" en una tabla de datos (DataTables u otro componente de UI tabular).
2. Se requiera abrir un Modal con un formulario para editar la información de un renglón/registro específico.
3. Se pida agregar los botones de edición dentro de los `render` de DataTables.

## Instrucción Exigida (Obligatoria)

Al detectar la necesidad de crear un componente que edite elementos de una tabla mediante un modal, el modelo (Tú, el Agente Inteligente) **DEBES LEER PRIMERO Y OBLIGATORIAMENTE** la siguiente habilidad (SKILL):

👉 `@.agent/skills/modal_editar_integration/SKILL.md`

### Flujo Exacto

1. Usa tu herramienta `view_file` para leer por completo el archivo `.agent/skills/modal_editar_integration/SKILL.md`.
2. Una vez leído, aplica **TODOS LOS PASOS** descritos en su estructura (Modelo, Vista, Controlador, Factory y Conexión con Controlador Padre).
3. **Restricción de Diseño:** Está ESTRICTAMENTE PROHIBIDA la modificación de clases base `.modal-overlay`, `.modal-card`, `.modal-close-btn` y márgenes/paddings (`4px 16px` y colores `btn-primary / btn-danger`). No inventes estilos CSS a menos que la Skill lo indique explícitamente. Las dimensiones, posiciones (Cancel izquierda, Aplicar derecha) y apariencia del componente están aprobadas por diseño y deben replicarse de manera idéntica.
4. **Restricción Arquitectónica:** No modifiques el comportamiento directo de inyección. Recuerda instanciar y retornar los controladores del modal desde el Factory superior (ej: `dash_factory.js`) e inyectarlos localmente.

El incumplimiento de utilizar la Skill referida en esta regla causará inconsistencias arquitectónicas severas (UI y código espagueti) en la aplicación y es inaceptable.

---
description: Regla para forzar el uso de la Skill modal_borrar_integration. Esta regla se aplicará SIEMPRE que se solicite implementar o modificar un botón o acción destructiva de "Borrar" o "Eliminar" dentro de cualquier componente tipo tabla del proyecto.
---

# Regla: Integración Modal de Borrado (Tablas)

Esta regla garantiza que la experiencia de usuario (UX) y la arquitectura para la eliminación asíncrona de registros en tablas mantengan la estética, resiliencia DOM y robustez de inyección de dependencias estandarizada por el modelo central de `WARESmart`.

## Cuándo Aplicar

**SIEMPRE** que se cumplan las siguientes condiciones:

1. Se solicite crear o implementar una acción de "Borrar" / "Eliminar" (como un icono de papelera) en una tabla de datos (DataTables u otro componente).
2. Se requiera abrir un Modal de Confirmación antes de ejecutar la llamada asíncrona (endpoint REST) destructiva de un renglón específico.
3. Se modifique o agregue el botón de eliminación mediante `render` dinámico de columnas HTML en Javascript.

## Instrucción Exigida (Obligatoria)

Al detectar la necesidad de crear un componente que dispare eliminaciones confirmadas mediante un modal interactivo superpuesto, el modelo (Tú, el Agente Inteligente) **DEBES LEER PRIMERO Y OBLIGATORIAMENTE** la siguiente habilidad (SKILL):

👉 `@[.agent/skills/modal_borrar_integration/SKILL.md]`

### Flujo Exacto

1. Usa tu herramienta `view_file` para leer por completo el archivo `.agent/skills/modal_borrar_integration/SKILL.md`.
2. Aplica **TODOS LOS PASOS** descritos en su estructura (Iconos SVG, Modelo Asíncrono, Vista pura con `DOMParser`, Controlador de Event Delegation y Factory).
3. **Restricción de Renderizado (CRÍTICO):** La Vista NO PUEDE hacer `return` directo de strings HTML crudos. Se PROHÍBE tajantemente invocar `this.element.querySelector(...)` sin antes haber parseado el literal a un Objeto Nodo empleando la clase `DOMParser()`.
4. **Restricción de Visibilidad (CSS):** Es obligación absoluta manejar explícitamente las transiciones inyectando la clase `.modal-visible` y los atributos ARIA al overlay durante el método `show()`, así como la clase espanta-scrolls `.modal-open` sobre el `document.body`.
5. **Estética y UI:** Mantén los estilos inquebrantables del Delete Modal. El círculo exterior del ícono de _Warning_ usa el background base del proyecto `var(--color-critical-500)`. Los botones mantienen la jerarquía `.btn-danger` a la izquierda y `.btn-primary` a la derecha.

El incumplimiento de utilizar la Skill referida bajo esta regla causará colapsos severos en la interfaz visual (`TypeError` de Nodos nulos o falsos "modales transparentes" al inyectarlos al Virtual DOM), violando por completo los estándares de calidad del proyecto.

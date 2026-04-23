---
name: Generación y Actualización de Entradas en Log
description: Guía obligatoria para generar o agregar nuevas entradas al archivo docs/log.md, asegurando el formato, la preservación de datos y el uso correcto de la fecha actual.
---

# Guía para la Generación de Entradas en `docs/log.md`

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta skill dicta el protocolo inquebrantable que debes seguir siempre que el usuario solicite generar, agregar o modificar una entrada en el archivo `docs/log.md`.

## 1. Análisis y Comprensión del Formato (Mandatorio)

Antes de realizar cualquier modificación en `docs/log.md`, debes analizar y comprender a detalle su contenido actual.
El estilo del documento consiste en un encabezado principal `# Code Log` seguido de entradas listadas de forma cronológica (las más recientes al final), separadas por la etiqueta `---`.
Cada entrada tiene el siguiente formato estricto:

```markdown
---

## DD-MM-YY - Título descriptivo de la entrada

- [x] Tarea principal o descripción general.
  - [x] Sub-tarea o detalle específico completado.
  - [-] Sub-tarea en progreso.
  - [ ] Sub-tarea pendiente.
```

**Regla:** Siempre debes mantener el mismo estilo, formato y tipo de contenido del archivo `docs/log.md`. Esto es mandatorio y no negociable.

## 2. Uso de la Fecha Actual del Sistema (Mandatorio)

- **NUNCA** debes inventar o agregar una entrada con una fecha que no corresponda a la fecha actual del sistema. Esto es mandatorio y no negociable.
- Para obtener la fecha actual, debes basarte SIEMPRE en el tiempo local actual del sistema provisto en tus metadatos (por ejemplo, `The current local time is: ...`).
- El formato de la fecha en el título del log debe ser exactamente `DD-MM-YY`.

## 3. Lógica de Inserción y Preservación de Datos (Mandatorio)

Si la instrucción del prompt es "Genera una nueva entrada", **DEBES VERIFICAR PRIMERO** si ya existe una entrada con la fecha actual en `docs/log.md`.

### Caso A: La entrada con la fecha actual YA EXISTE
- **AGREGA** el nuevo contenido al final de la entrada existente.
- **NO DEBES ELIMINAR** el contenido previo correspondiente a esa fecha. La preservación del historial del día es mandatoria y no negociable.
- **MODIFICA EL TÍTULO** de la entrada existente para que refleje tanto el trabajo anterior como el nuevo, pero **MANTENIENDO LA FECHA INTACTA**. Esto es mandatorio y no negociable.
  - *Ejemplo Original:* `## 21-04-26 - Implementación de Protocolo`
  - *Ejemplo Modificado:* `## 21-04-26 - Implementación de Protocolo y Creación de Skill de Log`

### Caso B: La entrada con la fecha actual NO EXISTE
- Crea una nueva entrada al final del documento.
- Añade el separador `---` antes de la nueva entrada.
- Escribe el título con la fecha actual y un título representativo de los cambios.
- Redacta el contenido siguiendo estrictamente la estructura de viñetas con checkboxes.

## 4. Checklist de Verificación Antes de Modificar el Archivo

Antes de aplicar cualquier cambio sobre `docs/log.md`, debes confirmar internamente:
- [ ] ¿He revisado la fecha actual del sistema en mis metadatos en lugar de inventar una?
- [ ] ¿He verificado en `docs/log.md` si ya existe un encabezado `## DD-MM-YY` con la fecha de hoy?
- [ ] Si la fecha de hoy ya existía, ¿estoy agregando el contenido nuevo SIN borrar el anterior?
- [ ] Si la fecha de hoy ya existía, ¿he actualizado el título de la entrada conservando la fecha intacta?
- [ ] ¿El formato de mi aporte coincide exactamente con el uso de listas anidadas, checkboxes (`[x]`, `[-]`, `[ ]`) y el separador `---` del documento original?

Cualquier desviación de estas reglas constituye una violación directa a las directivas del proyecto.

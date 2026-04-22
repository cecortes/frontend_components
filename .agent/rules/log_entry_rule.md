# Regla de Actualización de Log (Log Entry Rule)

**ESTADO: CRÍTICO Y OBLIGATORIO**
**TRIGGER:** always_on

Esta regla dicta el comportamiento inquebrantable de la IA cuando el usuario solicita generar, modificar, actualizar o agregar entradas, o modificar cualquier tipo de contenido en el archivo `docs/log.md`.

## 1. Directiva Principal

Si recibes instrucciones para realizar alguna acción relacionada con el archivo `docs/log.md` (como crear una nueva entrada, agregar contenido a una fecha, actualizar el registro del día, etc.), **TIENES QUE DETENERTE Y LEER** la guía estandarizada antes de utilizar herramientas de edición de archivos.

Utiliza la herramienta `view_file` para cargar en tu contexto la siguiente ruta absoluta:
`/.agent/skills/log_entry_generation/SKILL.md`

## 2. Motivo de la Restricción

Para mantener un registro de cambios ("Code Log") profesional, coherente y cronológicamente correcto, es imperativo que las entradas sigan estrictamente la estructura de listas con checkboxes preestablecida en el ecosistema WARESmart. Además, se debe garantizar que se utilice la fecha real del sistema extraída de los metadatos y que nunca se sobrescriba o destruya trabajo previo registrado bajo la misma fecha.

## 3. Comprobación Final (Post-Modificación)

Una vez que hayas modificado el archivo `docs/log.md`, debes realizar una comprobación final obligatoria evaluando tus propios cambios antes de dar por terminada la tarea:

- [ ] ¿Obtuve la fecha actual basándome de forma estricta en el `local time` de mis metadatos (en formato `DD-MM-YY`)?
- [ ] ¿Validé primero si ya existía una entrada con la fecha de hoy?
- [ ] Si la entrada de hoy ya existía, ¿agregué el contenido nuevo preservando intacto el contenido anterior?
- [ ] Si la entrada de hoy ya existía, ¿actualicé el título englobando todos los temas tratados conservando la misma fecha?
- [ ] ¿El diseño visual de mis cambios respeta de forma idéntica los separadores `---` y los estados de los checkboxes (`[x]`, `[-]`, `[ ]`)?

Si la respuesta a alguna de estas preguntas es NO, debes corregir inmediatamente el documento basándote en la _Skill_ referenciada.

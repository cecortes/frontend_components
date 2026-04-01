---
trigger: always_on
description: Regla de oro para la validación. Dispara la visualización de la skill base (.agent/skills/validator_integration/SKILL.md) siempre que se pida crear o modificar validaciones en formularios o modales.
---

# Regla de Integración de Validación (Validator Rule)

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta regla dicta el comportamiento inquebrantable de la IA cuando se enfrenta a tareas u objetivos que impliquen validar datos, campos de entrada (inputs), formularios o modales en este proyecto.

## 1. Directiva Principal

Si el usuario te pide implementar, modificar o revisar validaciones en la Interfaz de Usuario, **TIENES QUE DETENERTE Y LEER** la guía estandarizada antes de escribir cualquier código de la vista o el controlador.

Utiliza la herramienta `view_file` para cargar en tu contexto la siguiente ruta absoluta:
`/.agent/skills/validator_integration/SKILL.md`

## 2. Motivo de la Restricción

En iteraciones pasadas, la omisión de esta guía causó dos fallos críticos en la arquitectura que están terminantemente prohibidos:

1. **Romper el Patrón MVC:** Importar librerías de utilidad (`FieldsValidator`) directamente en el Controlador en vez de ser inyectadas desde el Factory.
2. **Conflicto con Validadores Nativos:** Usar tipos de input HTML predeterminados (como `type="email"`) combinados con `required`, provocando que el navegador secuestre el evento `submit` y evite que nuestras animaciones y herramientas visuales de error personalizadas ("pops") se desplieguen.

## 3. Comprobación Final (Post-Implementación)

Cada vez que finalices la integración de la validación, debes revisar tu propio código y responder internamente a estas tres preguntas:

- [ ] ¿Cambié explícitamente el `<input>` a `type="text"` para sortear el validador nativo y ceder el control al JS?
- [ ] ¿Están todos los campos envueltos en su debido `<div class="input-wrapper">` acompañados por su `<div class="validation-tooltip">`?
- [ ] ¿Importé el `FieldsValidator` única y exclusivamente dentro del archivo `_factory.js` para inyectarlo al inicializar el Controlador?

Si la respuesta a alguna es NO, estás rompiendo el estándar del proyecto y debes corregirlo de inmediato guiándote por la _Skill_ mencionada.

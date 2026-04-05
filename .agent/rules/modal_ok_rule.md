---
trigger: always_on
description: Regla de oro para la integración de ModalOk. Dispara la obligatoriedad de la skill base (.agent/skills/modal_ok_integration/SKILL.md) siempre que se pida crear, implementar o integrar el componente ModalOk en cualquier parte del proyecto.
---

# Regla de Integración de ModalOk (ModalOk Rule)

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta regla dicta el comportamiento inquebrantable de la IA cuando se enfrenta a tareas u objetivos que impliquen presentar mensajes de éxito, o implementar/crear interfaces relacionadas al componente `ModalOk`.

## 1. Directiva Principal

Si el usuario te pide implementar, modificar o usar el componente `ModalOk` dentro de cualquier otro componente del proyecto, **TIENES QUE DETENERTE Y LEER** la guía estandarizada antes de escribir o proponer cualquier código.

Utiliza la herramienta `view_file` para cargar en tu contexto la siguiente ruta absoluta:
`/.agent/skills/modal_ok_integration/SKILL.md`

## 2. Motivo de la Restricción

En iteraciones pasadas, proceder de manera precipitada y sin revisar esta skill causó fallos críticos en la arquitectura y en el flujo del usuario que están terminantemente prohibidos:

1. **Inyección de Nodos Huérfanos:** Retornar el controlador y el elemento de un Modal pero omitir inyectar `modalOkElement` desde las dependencias superiores o desde el enrutador principal en `document.body.append()`, provocando que el código se ejecute invisiblemente en memoria pero nunca en pantalla.
2. **Conflicto con Validadores Nativos:** Mantener etiquetas `required` dentro de `<input>` asumiendo validaciones sin tomar en cuenta la intervención del framework. El navegador reventará con error `"Invalid form control is not focusable"` frustrando el final exitoso si la validación se cruza con las manipulaciones de visibilidad.

## 3. Comprobación Final (Post-Implementación)

Cada vez que finalices la integración del `ModalOk`, debes revisar tu propia implementación y contestar a estas tres afirmaciones:

- [ ] ¿Interrogué forzosamente al usuario para conocer el Componente Target (y me negué a avanzar si no lo dictaminó)?
- [ ] ¿El `modalOkController` fue inyectado originándose en la cascada desde el Factory Máster hasta llegar al Controlador del Componente interesado?
- [ ] ¿Aseguré que la variable conteniendo el dom element de `ModalOk` sea importada y adjuntada orgánicamente al enrutador (router) dentro de la ejecución general de sus scripts (`document.body.append(..., modalOk, ...)`)?

Si la respuesta a alguna es NO, estás rompiendo el estándar del proyecto y debes retroceder al archivo _Skill_ para encauzar tu solución.

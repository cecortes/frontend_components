---
trigger: always_on
description: Regla mandatoria para la generación de mensajes de commit. Dispara la visualización de la skill (.agent/skills/git_commit_standard/SKILL.md) siempre que se pida realizar un commit de Git.
---

# Regla de Estándar de Commits (Git Commit Rule)

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta regla dicta el comportamiento inquebrantable de la IA cuando el usuario solicita realizar un commit de los cambios realizados en el repositorio.

## 1. Directiva Principal

Si el usuario te pide realizar un "commit", "subir los cambios" o cualquier acción relacionada con el registro de versiones en Git, **TIENES QUE DETENERTE Y LEER** la guía estandarizada.

Utiliza la herramienta `view_file` para cargar la siguiente ruta absoluta:
`/.agent/skills/git_commit_standard/SKILL.md`

## 2. Motivo de la Restricción

Para mantener un historial de cambios profesional, coherente y legible por humanos y máquinas, es imperativo que los mensajes no sean genéricos (como "update files"). Deben seguir una estructura técnica, estar en inglés y detallar las acciones clave realizadas.

## 3. Comprobación Final (Post-Generación)

Antes de entregar el comando de commit al usuario, debes verificar:

- [ ] ¿El mensaje está redactado íntegramente en Inglés?
- [ ] ¿Empieza exactamente con la instrucción `git commit -m` seguido de comillas?
- [ ] ¿El título es imperativo y descriptivo?
- [ ] ¿Se detallan los cambios importantes usando el carácter `-` para cada punto?
- [ ] ¿La longitud es adecuada para la terminal?

Si la respuesta a alguna es NO, debes corregir el mensaje basándote en la _Skill_ antes de presentarlo.

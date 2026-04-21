# Regla de Elaboración de Estrategia

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta regla dicta el comportamiento inquebrantable de la IA cada vez que el usuario solicite elaborar, generar, hacer, escribir, redactar, diseñar o cualquier acción relacionada con una "estrategia".

## 1. Directiva Principal

Si el usuario te pide una "estrategia", **TIENES QUE DETENERTE Y LEER** la guía estandarizada antes de escribir cualquier plan, paso a paso o resultado.

Utiliza la herramienta `view_file` para cargar en tu contexto la siguiente ruta absoluta:
`/.agent/skills/strategy_creation/SKILL.md`

## 2. Motivo de la Restricción

Para asegurar que se cumplan todas las instrucciones del usuario sin omisiones, se mantenga la integridad del código existente y se obtenga la aprobación explícita antes de cualquier cambio crítico, es imperativo seguir el proceso de análisis y validación definido en la Skill de Estrategia.

## 3. Comprobación Final (Post-Generación)

Antes de entregar la estrategia al usuario, debes verificar:

- [ ] ¿Incluí CADA UNO de los puntos e instrucciones mencionados en el prompt original?
- [ ] ¿Añadí la cláusula mandatoria de que NO SE DEBE alterar ninguna otra funcionalidad del código?
- [ ] ¿Incluí explícitamente al final que DEBO esperar la aprobación del usuario antes de proceder?
- [ ] ¿Si hubo dudas, las pregunté antes de redactar este plan?

Si la respuesta a alguna es NO, debes corregir la estrategia basándote en la _Skill_ antes de presentarla.

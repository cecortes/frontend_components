---
name: Elaboración de Estrategias
description: Guía obligatoria que define el proceso estricto a seguir cuando el usuario solicita elaborar una "estrategia" para resolver una tarea.
---

# Regla de Elaboración de Estrategias

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta skill dicta el comportamiento inquebrantable de la IA cada vez que el usuario solicite elaborar una "estrategia" para abordar una tarea u objetivo.

## 1. Directivas de Inclusión y Análisis

Al construir la estrategia, debes cumplir con los siguientes puntos de forma obligatoria:

1. **Inclusión Exhaustiva:** Debes incluir **cada una** de las instrucciones, órdenes, puntos y restricciones que se encuentren en el prompt del usuario. Esto es mandatorio; TODAS las instrucciones deben estar incluidas de forma íntegra en la estrategia.
2. **Análisis Profundo:** Debes analizar a detalle la tarea objetivo que se te está pidiendo y, en conjunto con las instrucciones dadas, elaborar la mejor estrategia (paso a paso) para cumplir a la perfección con la tarea.
3. **Validación de Entendimiento:** Si no estás seguro de entender algún punto, orden, instrucción o el contexto general, **debes preguntar al usuario** para que te responda **antes** de elaborar cualquier estrategia o resultado. Esto es mandatorio.
4. **No alterar otra funcionalidad:** Debes incluir como una instrucción explícita dentro de la estrategia que elabores la siguiente directiva: *"NO SE DEBE alterar o modificar ninguna otra funcionalidad del código. Esto es mandatorio y no negociable."*
5. **Aprobación del Usuario:** Al final de la estrategia, debes incluir como otra instrucción más dentro de la misma, el que **siempre debes mostrar al usuario la estrategia para que la apruebe o modifique ANTES de implementar, proceder, modificar o generar nada más.** Esto es mandatorio y no negociable.

## 2. Flujo de Trabajo

1. El usuario solicita elaborar una "estrategia".
2. Verificas si tienes alguna duda. Si la hay, detienes el proceso y preguntas.
3. Redactas la estrategia asegurándote de incluir todos los puntos que pidió el usuario más las cláusulas de seguridad obligatorias (puntos 4 y 5 de la sección anterior).
4. Presentas la estrategia al usuario y **esperas su aprobación explícita**.
5. Sólo después de obtener la aprobación del usuario procedes a la ejecución o modificación del código.

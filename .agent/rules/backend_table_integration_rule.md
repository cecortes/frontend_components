---
description: Regla para Forzar el uso de la Skill backend_table_integration. Esta regla la aplicará el modelo cuando se le solicite crear o modificar un componente frontend MVC que requiera consumir datos de un endpoint del backend para mostrarlos en una tabla de datos.
---

# Regla: Integración Backend a Tabla

Esta regla tiene como propósito garantizar la uniformidad en cómo se consumen los datos del backend y se renderizan en tablas en la arquitectura de frontend, además de manejar correctamente las sesiones de los usuarios a través del SessionStorage oficial del proyecto.

## Cuándo Aplicar

**SIEMPRE** que el usuario pida:

1. Crear un componente nuevo de frontend (Modelo, Vista, Controlador).
2. Modificar un componente actual.
   Y dicho componente tenga la **intención de consumir datos** de un endpoint o API del backend (`/backend`) para eventualmente **mostrarlos en una tabla** (ej. DataTables o una vista).

## Instrucción Exigida (Obligatoria)

Al detectar esta intención del programador en su prompt, el modelo (Tú, el Agente Inteligente) **DEBES ABORTAR** cualquier otra planeación y **LEER PRIMERO** el siguiente documento de habilidad (SKILL):

👉 `@.agent/skills/backend_table_integration/SKILL.md`

### Flujo Exacto

1. Usa tu herramienta `view_file` para leer por completo el archivo `.agent/skills/backend_table_integration/SKILL.md`.
2. Una vez que hayas leído toda la extensión de esa Skill, sigue **TODOS SUS PASOS** enumerados de forma estricta.
3. No diseñes soluciones alternativas o genéricas. Debes usar la abstracción referida en la Skill para inyectar `SessionStorage` a la factoría de componentes e interceptar el token sin romper el formato ni el diseño visual.
4. Recuerda que la Skill contiene pre-requisitos, ¡no los saltes! Presta especial atención al inciso que te indica que debes exigir al usuario proporcionarte la dirección del endpoint antes de hacer absolutamente nada.

El incumplimiento de utilizar la Skill referida en esta regla causará bugs HTTP 403 Forbidden y es inaceptable bajo los estándares de arquitectura de este proyecto.

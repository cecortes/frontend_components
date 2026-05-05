# Regla de Integración de Página de Navegación (Navigation Page Rule)

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta regla dicta el comportamiento inquebrantable de la IA cuando se enfrenta a tareas u objetivos que impliquen crear, elaborar, diseñar o implementar un nuevo componente que funcione como una página de navegación o vista principal en el proyecto (ej. Producción, Configuración, etc.).

## 1. Directiva Principal

Si el usuario te pide crear, implementar, modificar o elaborar la estrategia de un nuevo componente que actúe como página de navegación SPA (generalmente accesible desde el Sidebar), **TIENES QUE DETENERTE Y LEER** la guía estandarizada antes de proponer o escribir cualquier código.

Utiliza la herramienta `view_file` para cargar en tu contexto la siguiente ruta absoluta:
`/.agent/skills/navigation_page_integration/SKILL.md`

## 2. Motivo de la Restricción

En iteraciones pasadas, proceder sin una guía estricta para este tipo de vistas provocó fallos críticos en la arquitectura y compilación de la aplicación:

1. **Bug de Renderizado UI:** Escapar accidentalmente los delimitadores de interpolación en Template Literals de JavaScript (ej. `\${sidebarHTML}`) durante la inyección de HTML, causando que el navegador imprima variables en pantalla literalmente y colapse la estructura del DOM.
2. **Crash Crítico de Compilación (Vite):** Utilizar rutas equivocadas para importar `SessionStorage` (error de minúsculas/mayúsculas) o fallar en la importación de `svg_icons.js` desde la Factoría, abortando inmediatamente el comando `npm run build`.

## 3. Comprobación Final (Post-Implementación)

Cada vez que finalices la integración de una nueva página de navegación, debes revisar tu propia implementación y contestar a estas afirmaciones:

- [ ] ¿Elaboré y solicité aprobación de mi estrategia paso a paso usando la skill correspondiente antes de escribir el código?
- [ ] ¿Aseguré que los literales dinámicos (como `${sidebarHTML}`, `${burgerHTML}`) en el View **NO** contengan barras invertidas (`\`) de escape?
- [ ] ¿Importé el `SessionStorage` desde la ruta exacta `../components/Storage/storage.js` en minúsculas y heredé correctamente los iconos globales en la factoría?
- [ ] ¿Ejecuté y comprobé exitosamente el comando `npm run build` en la terminal local como mecanismo final para asegurar que ninguna importación está rota?

Si la respuesta a alguna es NO, estás rompiendo el estándar del proyecto y debes retroceder inmediatamente al archivo _Skill_ para corregir y encauzar tu código.

---
name: Integración de Componente Página de Navegación (MVC)
description: Guía paso a paso y estricta para crear un nuevo componente tipo página de navegación principal, replicando el patrón MVC, el enrutamiento y evitando fallos críticos de renderizado y compilación.
---

# Guía para la Creación de Componentes Tipo Página de Navegación

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta guía dicta el protocolo que la Inteligencia Artificial debe seguir cuando el usuario solicite la creación de un nuevo componente que funcione como una página de navegación de nivel superior (Ej. "Produccion", "Configuracion"). Estas páginas actúan como "cascarones" estructurales para mostrar información o acciones bajo la arquitectura Single Page Application (SPA) del proyecto WARESmart.

## 0. Estrategia y Análisis Previo (Mandatorio)
Antes de proponer o escribir cualquier código, **TIENES LA OBLIGACIÓN** de analizar cómo están implementados componentes maestros similares (como `Usuarios`, `Clientes` y `dashboard`) para absorber la lógica de navegación e inyección de dependencias. 
Posteriormente, deberás elaborar y mostrar una estrategia paso a paso y solicitar la **aprobación explícita del usuario** antes de continuar, siguiendo la regla de Elaboración de Estrategias.

## 1. Arquitectura de Directorios y Estructura Visual (View)
Deberás crear un nuevo componente independiente en `vite-components/src/components/<NombreVista>` con las subcarpetas `model`, `view` y `controller`.

**Vista (`<nombreVista>View.js`)**:
Debe replicar estrictamente la disposición visual global (Dashboard).
Debe incluir explícitamente la cabecera `top-bar` con una etiqueta `<h2>` y el contenedor `.dashboard-content` para futuras inyecciones.

> [!CAUTION]
> **Bug Crítico de Renderizado de Plantillas (Lección Aprendida):**
> Al redactar o inyectar el código HTML usando Template Literals (con backticks \` \` \`), **NUNCA** escapes los delimitadores de interpolación introduciendo barras invertidas (`\${...}`).
> Debes escribirlos de forma limpia y exacta: `${sidebarHTML}`, `${burgerHTML}` y `${this.icons?.bell || ""}`. 
> *Síntoma del Error:* Escapar las variables provocará que el navegador imprima literalmente la cadena de texto `"${sidebarHTML}"` en la pantalla, rompiendo por completo la visibilidad de la UI, anulando el menú y fallando la carga de íconos.

## 2. Autenticación y Estado Activo en el Controlador (`Controller`)
Tu `<nombreVista>Controller.js` debe delegar la seguridad al subcontrolador externo **Auth** dentro del flujo de su método asíncrono `init()`.

**Flujo Obligatorio:**
1. Cargar datos de sesión: `const sessionData = this.storage.loadSessionStorage();`
2. Validar credenciales en un `try...catch` llamando a `await this.auth.init(sessionData)`.
3. Manejar el fallo ejecutando `this.modalErrorController.showError(...)` y redireccionando a `"/"`.
4. Renderizar el Sidebar HTML pasando el identificador correcto (ej. `"produccion"`) para activar el resaltado CSS correspondiente, el cual debe estar mapeado y sincronizado de antemano en `SidebarController.js`.
5. Enlazar la navegación global usando `this.sidebarController.bindNavigation(html)`.

## 3. Ensamblaje en la Factoría (`Factory`)
Debes crear la factoría centralizadora en `vite-components/src/factory/<nombre_vista>_factory.js`. Su objetivo es proveer las dependencias (`ModalError`, `SidebarController`, `AuthController`, `SessionStorage`) al controlador para no romper el patrón MVC.

> [!WARNING]
> **Crash Crítico de Compilación de Dependencias (Lecciones Aprendidas):**
> Se identificaron históricamente dos fallos mortales al compilar el código (`npm run build`) originados desde la Factoría:
> 1. **Fallo de Storage:** El archivo correcto es `../components/Storage/storage.js` (en minúsculas), **NO** `SessionStorage.js`. Errar esto aborta la compilación de Vite.
> 2. **Fallo de Íconos SVG:** Si el componente no tiene un archivo propio de íconos en su carpeta, **NUNCA** inventes la ruta. Debes importar y heredar los íconos globales del Dashboard: `import { icons } from "../components/Dashboard/icons/svg_icons.js";`. Cualquier ruta huérfana de SVG resultará en Exit Code 1.

## 4. Adaptación en Enrutador (`main.js`)
En tu entorno de registro `main.js`, debes inyectar destructuradamente tu nueva factoría mapeada bajo la nueva ruta (ejemplo: `"/produccion"`), acoplando el `modalError` devuelto al `document.body` y retornando el componente principal (element).

## 5. Verificación Final de Compilación
Inmediatamente después de aplicar los cambios en el código, **TIENES LA OBLIGACIÓN** de correr la herramienta de terminal para ejecutar `npm run build`. Este es el único mecanismo absoluto para verificar que ninguna de las ramas de imports inyectadas esté rota y garantizar la salud de la aplicación (Exit code: 0).

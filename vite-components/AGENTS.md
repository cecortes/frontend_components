# Análisis del Proyecto WARESmart

Este documento contiene un análisis detallado del proyecto `frontend_components` (WARESmart), abarcando tanto el backend en Node.js como el frontend desarrollado con Vanilla JavaScript y Vite.

## Resumen del Proyecto
WARESmart es un sistema web enfocado (según el frontend) en el **Control de Inventarios**. La aplicación está dividida en dos partes principales:
1. **Backend**: Desarrollado con Node.js, Express y MySQL, para proveer una API RESTful.
2. **Frontend**: Desarrollado con JavaScript puro (Vanilla JS) y empaquetado con Vite, destacándose por no usar frameworks externos gigantes (como React o Vue) sino un sistema propio basado en arquitectura MVC.

---

## � Estructura del Proyecto

- **`backend/`**: Contiene todo el proyecto del servidor backend. El comando para correr el servidor es `node server.js`.
- **`docs/`**: Contiene toda la documentación del proyecto.
    - **`architecture.md`**: Define la arquitectura estructural del proyecto (Patrón MVC).
    - **`log.md`**: Registro de cambios y bitácora del proyecto.
    - **`logica_de_negocio.md`**: Detalla la lógica de implementación y procesos de negocio.
    - **`regla_de_estilo.md`**: Guía maestra de estilos y diseño UI.
    - **`decisions/`**: Carpeta que contiene las decisiones técnicas (ADRs).
    - **`specs/`**: Carpeta que contiene los requerimientos de nuevas funcionalidades.

---


## �📜 Reglas del Proyecto (Patrón MVC)

**Guía de estilo obligatoria para implementar el patrón Model-View-Controller (MVC) en Componentes Frontend Modernos.**

> [!IMPORTANT]
> Esta sección es solo un resumen. El modelo DEBE buscar el contenido completo sobre roles, responsabilidades y restricciones del patrón MVC consultando el archivo de fuente de verdad.
> 👉 **Archivo de reglas completas (MVC):** `docs/architecture.md`

### Resumen del Patrón MVC:
1. **El Modelo (Model)**: Gestiona el estado local del componente y las peticiones de red asíncronas (`fetch`). No debe tener referencias a la vista o al DOM.
2. **La Vista (View)**: Construye el HTML y expone métodos (`bind...`) para vincular eventos, sin contener lógica de negocio. Usa el prefijo `$` para referenciar elementos DOM.
3. **El Controlador (Controller)**: Inicializa el modelo y la vista, y orquesta el flujo de datos bidireccional, sirviendo como pegamento.
4. **Restricciones Generales**: Implementación obligatoria mediante Módulos ES6, uso de Clases para instanciación múltiple y separación estricta en tres archivos para cada componente.

---

## 📐 Reglas de Estilo JavaScript (Clases y Métodos)

**Convenciones y mejores prácticas obligatorias al escribir CUALQUIER archivo .js para los componentes de este proyecto.**

> [!IMPORTANT]
> Esta sección es solo un resumen. El modelo DEBE buscar el contenido y convenciones completas sobre JS consultando el archivo de fuente de verdad.
> 👉 **Archivo de reglas completas (JavaScript):** `.agent/rules/js_functions.md`

### Resumen de Guía de Estilos JS:
1. **Nomenclatura**: Uso estructurado y semántico de `camelCase` (métodos), `PascalCase` (Clases) y establecimiento de un verbo explícito como prefijo de funciones (`handle...`, `render...`, `fetch...`).
2. **Comentarios (JSDoc)**: Todos los métodos de clase deben venir precedidos rigurosamente por un bloque `@async`, `@method`, `@param` y `@returns` de JSDoc.
3. **Estructura ES6**: Prohibición total de usar `var`. Uso preferente de `const`, y adopción obligatoria de `Arrow Functions` (`=>`) como callbacks para preservar el contexto interno de las clases (`this`).

---

## 🧩 Patrones de Diseño Implementados

1. **Patrón MVC (Model-View-Controller)**:
   - Presente de forma purista en el Frontend. Las vistas no saben nada del modelo, los modelos no tocan el DOM y los controladores intermedian (Ej. `loginController.js`, `loginModel.js`, `loginView.js`).
   - El backend adapta este patrón en una variación de Controladores y Servicios, separando la lógica HTTP de la lógica de persistencia.

2. **Patrón Factory (Fábrica de Componentes)**:
   - Se evidencia fuertemente en el Frontend (Ej. `login_factory.js`). Las fábricas son responsables de instanciar todas las partes de un componente (View, Model, Controller) y ensamblarlas con Inyección de Dependencias.
   - *Por qué se usó*: Encapsula el complejo proceso de creación y limpieza general.

3. **Inyección de Dependencias (Dependency Injection)**:
   - En lugar de que el `LoginController` importe clases e instancie objetos globalmente, la *Factory* se los pasa por el constructor: `new LoginController(view, model, validator, storage, modalController)`. Esto facilita enormemente las pruebas (testing) y hace el código altamente desacoplado.

4. **Patrón Singleton (Pool de Conexiones DB)**:
   - En el backend (`config/db.js`), el Pool de MySQL es inicializado una única vez y exportado para ser reciclado importándolo en todos los servicios.
   - En el frontend, el módulo `SessionStorage` también emula un almacenamiento único centralizado en memoria del navegador.

5. **Patrón Observer / Event Listener**:
   - Predominante en la capa de la vista/controlador en el frontend con el `window.addEventListener("popstate")` para el Router y el mapeo de eventos clic, blur y validación.


---

## 🎨 Reglas de Estilos y Diseño UI

**Establece las reglas y el Sistema de Diseño (CSS/HTML) que mantiene la consistencia visual y estética en el proyecto WARESmart.**

> [!IMPORTANT]
> Esta sección es solo un resumen. El modelo DEBE buscar el contenido, tokens y la guía completa cuando trabaja con CSS/HTML consultando el archivo de fuente de verdad.
> 👉 **Archivo de reglas completas:** `docs/regla_de_estilo.md`

### Resumen de Guía de Estilos:
1. **Filosofía**: Enfoque *Mobile-First* y tema *Refined Dark Theme* usando tonos grisáceos oscuros (Steel Gray) en lugar de negros puros.
2. **Tipografía**: Uso estricto de **Work Sans** para todos los títulos, textos y jerarquías (`h1`-`h6`, `p`).
3. **Design Tokens (Colores)**: Obligatoriedad de utilizar variables CSS `--color-...` definidas en `style.css` (Ej: `--color-primary-500` para Soft Cyan, `--color-critical-500` para Error). **Prohibido quemar códigos Hexadecimales.**
4. **Elementos UI Base**: Uso de estilos globales encapsulados para botones (`.btn`, `.btn-primary`), tarjetas (`.card`), badges de nivel de inventario (`.badge`), e inputs de formulario (`.input-group`).
5. **Efectos y Tailwind**: Transiciones y hovers interactivos incorporados (traslaciones y 'glows'). Uso de Tailwind limitado o para apoyo híbrido.

---

## 🚀 Conclusión Analítica
El proyecto evidencia un enfoque **altamente disciplinado** hacia la escritura de código limpio y desacoplado, demostrando habilidades avanzadas en Javascript. Al no optar por React o Vue, el sistema construido "desde cero" con MVC y Factory Components logra una aplicación escalable, modular y comprensible, siendo una excelente pieza de ingeniería de software. El backend complementa estupendamente esta estructura con endpoints semánticos, middlewares de seguridad, y un manejo aislado de excepciones.

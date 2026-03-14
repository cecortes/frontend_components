---
description: Regla de Diseño Arquitectónico (MVC). Esta regla DEBE APLICARSE SIEMPRE al generar o modificar cualquier componente Frontend (Vite/ESM), sin excepciones.
---

# @dacs/styles/mvc_pattern.dac

#

# Declarative Agent Communication (DAC)

# Guía de estilo obligatoria para implementar el patrón

# Model-View-Controller (MVC) en Componentes Frontend Modernos (Vite/ESM).

# Metadatos

dac_id: pattern_mvc
version: "2.0.0"
type: guideline
description: >
Define la estructura, responsabilidades y flujo de datos obligatorios
para implementar componentes frontend reutilizables bajo el patrón MVC
usando Clases ES6 y Módulos.
stack:

- javascript
- vite
  scope: global

# Instrucciones Generales para el Agente

# Al generar CUALQUIER componente (ej. LoginForm, UserTable, Modal, etc.):

# 1. DEBES separar el código estrictamente en 3 archivos dentro de la carpeta del componente.

# 2. DEBES utilizar sintaxis de `class` (Clases ES6) para permitir múltiples instancias.

# 3. DEBES utilizar `export` nombrado (no default) para facilitar el tree-shaking.

# 4. El flujo de datos es UNIDIRECCIONAL en la renderización y BIDIRECCIONAL en eventos a través del Controlador.

# ---

# 1. El Modelo (Model) - {Componente}Model.js

- **Responsabilidad:** Gestionar el estado local del componente y la comunicación con APIs externas.
- **MANDATORY:** Debe ser una `class`.
- **MANDATORY:** NO DEBE tener referencias al DOM ni a la Vista.
- **MANDATORY:** NO DEBE manipular ni manejar errores UI (ej. abrir modales, hacer alertas) ni mostrarlos en consola silenciosamente. Su responsabilidad es exponer la validez o invalidez relanzando los errores (`throw`) para que el Controlador decida cómo presentarlos.
- **Ejemplo:**
  `export class UserModel {`
  `  constructor() { this.users = []; }`
  `  async fetchUsers() { /* fetch API */ return data; }`
  `  addUser(user) { this.users.push(user); }`
  `}`

  **Ejemplo Avanzado (Validez de Datos y Errores - authModel.js):**

  ```javascript
  export class AuthModel {
    async validateToken(sessionData) {
      if (!sessionData || !sessionData.token) {
        throw new Error("Token inválido o expirado"); // El error se delega al controlador
      }
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error del servidor");
      } catch (error) {
        throw new Error(error.message); // Nunca hacer console.error ni abrir un Modal aquí
      }
    }
  }
  ```

# 2. La Vista (View) - {Componente}View.js

- **Responsabilidad:** Construir el HTML, insertarlo en el DOM y capturar eventos nativos.
- **MANDATORY:** Debe ser una `class`.
- **MANDATORY:** Debe recibir o definir un elemento raíz (`this.root`) donde se renderizará el componente.
- **MANDATORY:** NO DEBE contener lógica de negocio.
- **MANDATORY:** Debe exponer métodos `bind{Evento}` para que el Controlador inyecte la lógica.
- **Convención de Nombramiento:**
  - Elementos del DOM guardados en propiedades deben usar prefijo `$` (ej. `this.$submitBtn`).
- **Ejemplo:**
  `export class UserView {`
  `  constructor(rootElement) {`
  `    this.root = rootElement;`
  `    this.$form = null;`
  `  }`
  `  getTemplate() { return '<form id="user-form">...</form>'; }`
  `  render() {`
  `    this.root.innerHTML = this.getTemplate();`
  `    this.$form = this.root.querySelector('#user-form');`
  `  }`
  `  bindAddUser(handler) {`
  `    this.$form.addEventListener('submit', e => {`
  `      e.preventDefault();`
  `      handler(formData);`
  `    });`
  `  }`
  `}`

# 3. El Controlador (Controller) - {Componente}Controller.js

- **Responsabilidad:** Inicializar el Modelo y la Vista, y coordinar la comunicación.
- **MANDATORY:** Debe ser una `class`.
- **MANDATORY:** Debe instanciar el Modelo y la Vista (o recibirlos en el constructor).
- **MANDATORY:** Es el único lugar donde se importan `Model.js` y `View.js`.
- **MANDATORY:** Define los métodos `handle...` que se pasan a la Vista.
- **Ejemplo:**
  `import { UserModel } from './UserModel.js';`
  `import { UserView } from './UserView.js';`
  ` `
  `export class UserController {`
  `  constructor(rootElement) {`
  `    this.model = new UserModel();`
  `    this.view = new UserView(rootElement);`
  `    `
  `    // Render inicial`
  `    this.view.render();`
  `    // Binding de eventos`
  `    this.view.bindAddUser(this.handleAddUser.bind(this));`
  `  }`
  ` `
  `  async handleAddUser(data) {`
  `    await this.model.addUser(data);`
  `    this.view.showSuccess();`
  `  }`
  `}`

# 4. Flujo de Datos (Data Flow) Actualizado

- **Paso 1 (Inicialización):** `main.js` u otro componente instancia `new Controller(elementoDOM)`.
- **Paso 2 (Render):** El Controlador ejecuta `view.render()`.
- **Paso 3 (Interacción):** Usuario hace click -> `View` captura evento -> ejecuta `handler` del Controlador.
- **Paso 4 (Proceso):** Controlador recibe datos -> llama a `model.metodo()`.
- **Paso 5 (Actualización):** Controlador recibe respuesta del Modelo -> llama a `view.update()` o `view.render()`.

# Restricciones de Implementación (Vite/ESM)

- **Imports:** SIEMPRE incluir la extensión del archivo. (ej. `import ... from './UserView.js'`).
- **Estilos:** Si el componente tiene CSS, debe importarse en el `View.js` o en el `Controller.js` según la estrategia de estilos global.

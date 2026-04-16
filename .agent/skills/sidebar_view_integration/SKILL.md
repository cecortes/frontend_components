---
name: Integración de Vistas por Sidebar (Sidebar View MVC)
description: Guía paso a paso y obligatoria para crear e integrar nuevas vistas navegables (como 'Clientes', 'Productos', etc.) accesibles directamente desde el componente Sidebar, replicando el patrón y estandarizando la cabecera y el estado activo.
---

# Regla de Generación de Nuevas Vistas desde el Sidebar

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta guía dicta los pasos inflexibles para crear nuevas vistas maestras de nivel superior en la aplicación WARESmart procedentes de los botones del menú lateral.

## 0. Interrogatorio Obligatorio (Paso Bloqueante)

Antes de proponer o escribir cualquier código, la Inteligencia Artificial **TIENE LA OBLIGACIÓN DE DETENERSE Y PREGUNTAR AL USUARIO** explícitamente:

**"¿Qué vista debe ser generada exactamente en este momento? (Por ejemplo: 'Clientes', 'Productos', 'Entradas', etc.)"**

**NO DEBES, bajo NINGUNA CIRCUNSTANCIA,** continuar elaborando planes o código hasta que el usuario haya estipulado claramente la página o vista que espera crear. **ESTO NO ES NEGOCIABLE**.

## 1. Arquitectura de Directorios y Estructura Visual (View)

Deberás crear un nuevo componente independiente en `vite-components/src/components/<NombreVista>` respetando el modelo MVC.
Componentes estándar a crear:

- `model/<nombreVista>Model.js`: Estructura base vacía para la lógica de negocio subyacente.
- `view/<nombreVista>View.js`: Debe replicar estrictamente la disposición visual global que tiene el resto del Dashboard. **CRÍTICO:** Debe incluir explícitamente la cabecera `top-bar` con una etiqueta `<h2>` que contenga el título dinámico e identificativo de la vista generada, tal y como existe actualmente en 'Usuarios'. Así mismo, debe incluir el contenedor para inyecciones.
  _Ejemplo Obligatorio:_
  ```html
  <div
    class="dashboard-wrapper"
    style="display: flex; min-height: 100vh; width: 100%; overflow-x: hidden;"
  >
    ${sidebarHTML}
    <main class="main-container">
      <header class="top-bar">
        ${burgerHTML}
        <!-- Título obligatorio de la Vista -->
        <h2 style="font-size: 1.25rem; margin: 0">
          Título de la Vista (Ej. Administración de Clientes)
        </h2>
        <div style="display: flex; gap: 1rem">
          <button class="btn btn-secondary" style="padding: 0.5rem 1rem">
            ${this.icons?.bell || ""}
          </button>
        </div>
      </header>
      <div class="dashboard-content">
        <!-- Espacio en blanco para tablas/datos -->
      </div>
    </main>
  </div>
  ```

## 2. Autenticación y Estado Activo en el Controlador (`Controller`)

Las lecciones pasadas nos dejaron un punto ciego por el cual la página arrojaba `router.js:88 returning undefined` al no validar exitosamente `Token`. Tu `<nombreVista>Controller.js` debe delegar todo al subcontrolador externo **Auth** dentro del flujo de su método asíncrono `init()`.

**ESTADO ACTIVO DEL MENÚ:** Para que el botón correspondiente en el menú lateral aparezca como activo (resaltado), es fundamental que el parámetro enviado a `getSidebarHTML` empate uno a uno con el indicador numérico o de string (`isActive(route)`) codificado dentro de la clase `SidebarView`. Tal como sucede para 'Usuarios' (`getSidebarHTML("users")`) o 'Dashboard' (`getSidebarHTML("dashboard")`).

```javascript
  async init() {
    const sessionData = this.storage.loadSessionStorage();

    // Tratamiento estandarizado para la validación de seguridad
    try {
      await this.auth.init(sessionData);
    } catch (error) {
      if (this.modalErrorController) {
        this.modalErrorController.showError(error.message, () => window.router.navigate("/"));
      } else {
        window.router.navigate("/");
      }
      return;
    }

    const userData = { name: this.storage.UserName, role: this.storage.Role };

    // CRÍTICO: El identificador "nombreAtributoSidebar" activará la propiedad CSS equivalente
    const sidebarHTML = this.sidebarController
      ? this.sidebarController.getSidebarHTML("<nombreAtributoSidebar>", userData)
      : "";
    const burgerHTML = this.sidebarController ? this.sidebarController.getBurgerHTML() : "";

    const html = this.view.render<NombreVista>(sidebarHTML, burgerHTML);

    // Vinculación estricta para navegación SPA
    if (this.sidebarController) {
      this.sidebarController.bindNavigation(html);
    }

    return html;
  }
```

## 3. Dependencias desde la Factoría

Tu factoría en `vite-components/src/factory/<nombre_vista>_factory.js` **TIENE LA OBLIGACIÓN** de inyectar y proveer `ModalError`, `SidebarController` y `AuthController` a tu Controlador:

```javascript
/* Imports correspondientes... */
export class <NombreVista>Factory {
  static async <nombreVista>Component() {
    const { element: modalErrorElement, controller: modalErrorController } = ModalFactory.modalComponent();
    const sidebarController = SidebarFactory.createSidebar();

    const view = new <NombreVista>View(icons);
    const model = new <NombreVista>Model();
    const storage = new SessionStorage();
    const auth = new AuthController();

    const controller = new <NombreVista>Controller(
      view, model, storage, auth, modalErrorController, sidebarController
    );
    const element = await controller.init();

    return { element, modalError: modalErrorElement, controller };
  }
}
```

## 4. Adaptación en Enrutador (`main.js`)

En tu entorno de registro `main.js`, debes inyectar destructuradamente tu nueva factoría mapeada bajo la nueva ruta (ejemplo: `"/clientes"`), acoplando visualmente cualquier modal subyacente.

```javascript
  "/<tuNuevaRuta>": async () => {
    const { element, modalError } = await <NombreVista>Factory.<nombreVista>Component();
    if (modalError) document.body.append(modalError);
    return element;
  },
```

## 5. Verificadores Finales de Enlace en `Sidebar` (Paso Fundamental)

Para que toda esta conexión fluya correctamente, el usuario al seleccionar el botón en su barra lateral debe ser dirigido asíncronamente desde el Router.
Acude a revisar `sidebarController.js` y asegúrate de modificar su bucle reactivo `bindNavigation`, inyectando formalmente el mapeo textual nativo de tu ruta al arreglo condicional existente (ejemplo: si es `productos`, llamar a `window.router.navigate("/productos")`). Tienes prohibido permitir que el link recargue forzosamente el DOM global.

/**
 * @class
 * @description
 * Clase Router simple para manejar la navegación en una SPA.
 * Intercepta eventos del navegador y renderiza componentes basados en la URL.
 */
export class Router {
  /**
   * @method constructor
   * @description
   * Inicializa el Router con un mapa de rutas.
   * Configura el listener para el botón atrás del navegador.
   *
   * @param {Object} routes - Objeto clave-valor donde la clave es la ruta (path)
   *                          y el valor es una función que retorna un HTMLElement o una Promesa.
   */
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("popstate", () => this.handleRoute());
    this.handleRoute();
  }

  /**
   * @method navigate
   * @description
   * Cambia la URL del navegador sin recargar la página y ejecuta el Router.
   *
   * @param {string} path - La ruta a la que navegar (ej. '/dashboard').
   */
  navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this.handleRoute();
  }

  /**
   * @async
   * @method handleRoute
   * @description
   * Método principal que se ejecuta en cada cambio de URL.
   * Obtiene la ruta actual, busca su manejador, lo ejecuta y renderiza el resultado.
   *
   * @returns {void}
   */
  async handleRoute() {
    // 1. Obtener la ruta actual desde la URL
    const path = window.location.pathname;

    // 2. Buscar la función asociada a esa ruta en nuestro mapa de rutas
    const routeHandler = this.routes[path];

    // 3. Verificar si la ruta existe
    if (!routeHandler) {
      console.warn(">>DEBUG: No se encontró definición para la ruta:", path);
      return;
    }

    // 4. Ejecutar la función de la ruta (que puede ser asíncrona)
    try {
      const viewElement = await routeHandler();

      // 5. Renderizar el resultado en el DOM
      this.renderView(viewElement);
    } catch (error) {
      console.error(">>DEBUG: Error al manejar la ruta:", error);
    }
  }

  /**
   * @method renderView
   * @description
   * Método privado (interno) que inyecta el contenido en el contenedor
   * principal de la aplicación (#app).
   *
   * @param {HTMLElement} viewElement - El elemento DOM a renderizar.
   * @returns {void}
   */
  renderView(viewElement) {
    const app = document.getElementById("app");

    if (!app) {
      console.error("DEBUG: No se encontró el elemento #app");
      return;
    }

    app.innerHTML = "";

    if (!(viewElement instanceof HTMLElement)) {
      console.warn(
        "DEBUG: El resultado de la ruta no es un HTMLElement:",
        viewElement,
      );
      return;
    }

    app.append(viewElement);
  }
}

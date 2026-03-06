export class Router {
  constructor(routes) {
    this.routes = routes;
    window.addEventListener("popstate", () => this.handleRoute());
    this.handleRoute();
  }

  navigate(path) {
    window.history.pushState({}, path, window.location.origin + path);
    this.handleRoute();
  }

  async handleRoute() {
    const path = window.location.pathname;
    const route = this.routes[path];

    console.log("DEBUG: Path actual:", path);
    console.log("DEBUG: Ruta encontrada:", route);

    if (route) {
      try {
        const result = await route();
        console.log("DEBUG: Resultado de route():", result);

        const app = document.getElementById("app");
        if (!app) {
          console.error("DEBUG: No se encontró el elemento #app");
          return;
        }

        app.innerHTML = "";
        // Si result es un elemento DOM, lo añadimos.
        // Si es una función (lo cual no parece ser el caso en main.js), la ejecutamos.
        if (result instanceof HTMLElement) {
          app.append(result);
        } else if (typeof result === "function") {
          app.append(await result());
        } else {
          console.warn(
            "DEBUG: El resultado de la ruta no es un HTMLElement ni una función:",
            result,
          );
        }
      } catch (error) {
        console.error("DEBUG: Error al manejar la ruta:", error);
      }
    } else {
      console.warn("DEBUG: No se encontró definición para la ruta:", path);
    }
  }
}

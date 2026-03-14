/**
 * @fileoverview Archivo principal de la aplicación que configura el router
 * y define las rutas disponibles para la navegación entre páginas.
 *
 * @description
 * Este archivo inicializa el sistema de rutas de la aplicación, estableciendo
 * la correspondencia entre URLs y los componentes que deben renderizarse.
 * Importa las fábricas de componentes necesarias y configura el Router de la aplicación.
 *
 * @module main
 * @requires ./style.css
 * @requires ./router/router.js
 * @requires ./factory/login_factory.js
 * @requires ./factory/dash_factory.js
 */
import "./style.css";
import { Router } from "./router/router.js";
import { LoginFactory } from "./factory/login_factory.js";
import { DashboardFactory } from "./factory/dash_factory.js";

/*
const loginElement = document.querySelector("#LoginForm");

const { form, modal } = LoginFactory.loginComponent();

loginElement.append(form);
document.body.append(modal);
*/

/**
 * @constant {Object}
 * @description
 * Mapa de rutas de la aplicación que define los componentes asociados
 * a cada ruta URL. Cada clave representa una ruta y el valor es una
 * función asíncrona que retorna el elemento del componente corresponding.
 *
 * @property {Function} / - Ruta raíz que renderiza el componente de login.
 * @property {Function} /dashboard - Ruta del dashboard que renderiza el componente de dashboard.
 *
 * @example
 * // Objeto de rutas
 * {
 *   "/": async () => { /* retorna formulario de login *\/ },
 *   "/dashboard": async () => { /* retorna elemento del dashboard *\/ }
 * }
 */
const routes = {
  "/": async () => {
    const { form, modal } = LoginFactory.loginComponent();

    document.getElementById("app").append(form);
    document.body.append(modal);
    return form;
  },
  "/dashboard": async () => {
    const { element, modal } = await DashboardFactory.dashComponent();
    document.body.append(modal);
    return element;
  },
};

/**
 * @description
 * Inicialización del router de la aplicación. Se crea una nueva instancia
 * de la clase Router pasando el objeto de rutas definido y se asigna
 * al objeto window para hacerlo accesible globalmente.
 *
 * @throws {Error} Si el Router falla durante la inicialización.
 *
 * @example
 * // El router queda disponible en window.router
 * window.router.navigate('/dashboard');
 */
// Inicializar router
window.router = new Router(routes);

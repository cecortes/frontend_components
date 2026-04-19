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
import { UsuariosFactory } from "./factory/usuarios_factory.js";
import { ClientesFactory } from "./factory/clientes_factory.js";

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
    const {
      element,
      modalError,
      modalOk,
      modalEdit,
      modalDelete,
      modalEditClient,
      modalDeleteClient,
    } = await DashboardFactory.dashComponent();

    document.body.append(
      modalError,
      modalOk,
      modalEdit,
      modalDelete,
      modalEditClient,
      modalDeleteClient,
    );

    return element;
  },
  "/usuarios": async () => {
    const { element, modalError, modalOk } = await UsuariosFactory.usuariosComponent();
    
    // Adjuntar los modales globales al body para que puedan ser mostrados
    if (modalError) document.body.append(modalError);
    if (modalOk) document.body.append(modalOk);
    
    return element;
  },
  "/clientes": async () => {
    const { element, modalError } = await ClientesFactory.clientesComponent();
    if (modalError) {
      document.body.append(modalError);
    }
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

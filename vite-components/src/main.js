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

// Definir rutas
const routes = {
  "/": async () => {
    const { form, modal } = LoginFactory.loginComponent();

    document.getElementById("app").append(form);
    document.body.append(modal);
    return form;
  },
  "/dashboard": async () => {
    const { element } = await DashboardFactory.dashComponent();
    return element;
  },
};

// Inicializar router
window.router = new Router(routes);

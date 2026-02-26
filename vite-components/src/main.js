import "./style.css";
import { LoginFactory } from "./factory/login_factory.js";

const loginElement = document.querySelector("#LoginForm");

const { form, modal } = LoginFactory.loginComponent();

loginElement.append(form);
document.body.append(modal);

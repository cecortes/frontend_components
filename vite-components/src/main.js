import "./style.css";
import { LoginFactory } from "./factory/login_factory";

const loginElement = document.querySelector("#LoginForm");

const loginComponent = LoginFactory.loginComponent();

loginElement.append(loginComponent);

# Code Log

## 12-02-26 - Starting the code log

- Started the project in vite, the goal is create simple components such as login form, dashboard, etc. Components that we can re use in the future.

- Install tailwindcss and @tailwindcss/vite via npm.
  - [x] Create the vite project.
  - [x] Install tailwindcss and @tailwindcss/vite via npm.
  - [x] Add the @tailwindcss/vite plugin to your Vite configuration.
  - [x] Add an @import to your CSS file that imports Tailwind CSS.

- [x] Merge the /setup branch to /main, and delete the /setup branch.

- [x] Create a /dev branch to work on the development of the components, and a /main branch to merge the final code.

- Copy the necessary DACS templates.
  - [x] Create a new DACS template for the scaffold of the components.
  - [x] Create the MVC pattern DACS template, which will be used as a base for the components.
  - [x] TODO: Create the JS functions DACS template, which will be used to create the necessary JS functions for the components.

---

## 13-02-26 - Coding the login form component.

- [x] Create the login form component, starting with the HTML structure, then the CSS styles, and finally the JS functions.
  - [x] Create the HTML structure of the login form component.
  - [x] Create the CSS styles for the login form component.

---

## 14-02-26 - Coding the login business logic.

- [x] Create the Factory pattern for the login form component.
  - [x] Code view logic for the login form component.
  - [x] Show the login form component in the browser, and test that it works as expected.
  - [x] Create the Controller logic for the login form component, which will handle the user interactions and the business logic of the component.

---

## 15-02-26 - Coding the toogle password component.

- [x] Code the toogle password logic.
  - [x] When the user clicks on the toogle password button, the password input field should change its type from "password" to "text", and vice versa.
  - [x] The toogle password button should also change its icon from an eye to an eye with a slash, and vice versa.
  - [x] Test the toogle password functionality in the browser, and make sure it works as expected.
- [x] Code recovery password logic.
  - [x] When the user clicks on the recovery password link, the user should redirect to a new page with a form to recover the password.
  - [x] The recovery link must be a env variable, so we can change it in the future without having to change the code.
  - [x] Test the recovery password functionality in the browser, and make sure it works as expected.

---

## 16-02-26 - Coding the validators rules for the login form component.

- [x] Code the validators rules for the login form component.
  - [x] The user input field should be required, and should have a valid format.
  - [x] The password input field should be required, and should have a minimum length of 8 characters.
  - [x] Test the validators rules in the browser, and make sure they work as expected.

---

## 17-02-26 - Starting Backend.

- [x] Start the backend development for the login form component, which will handle the authentication logic and the communication with the database.
  - [x] Create the necessary endpoints for the login form component, such as the login endpoint, middleware for authentication, etc.
  - [x] Test the backend endpoints using a tool like Postman, and make sure they work as expected.

---

## 18-02-26 - Refactoring backend for the login form component.

- [x] Refactor the backend code for the login form component, to make it more modular and maintainable.
  - [x] Create a separate file for the authentication logic, which will handle the authentication process and the communication with the database.
  - [x] Create a separate file for the user logic, which will handle the user-related operations, such as creating a new user, updating user information, etc.
  - [x] Test the refactored backend code using a tool like Postman, and make sure it works as expected.
- [x] Create a .env template file, wich will contain the instructions for the necessary environment variables.
- [-] Code the submit logic for the login form component, which will handle the form submission and the communication with the backend.

---

## 19-02-26 - Coding the submit logic for the login form component.

- [-] When the user submits the login form, the component should send a request to the login endpoint if the form is valid, with the user input and password as parameters.
  - [] The component should also handle the response from the backend, and show an error message if the login fails, or redirect to the dashboard if the login is successful.
  - [] Test the submit logic in the browser, and make sure it works as expected.

---

## 20-02-26 - Refactoring the login form logic.

- [x] Refactor the login form logic, to make it more modular and maintainable.
  - [x] Simplify the login controller logic, refactoring methods and functions to make them more concise and easier to understand.
  - [x] Refactoring validator to use element attributes to define the validation rules, instead of hardcoding them in the JS code.
  - [x] Completing the JSDoc for login controller and login view.

---

## 23-02-26 - Completing Login Form Component.

- [x] Make a function to get user and password values from the form, and use it in the submit logic, instead of getting the values directly from the DOM.

---

## 24-02-26 - Coding the model for the login form component.

- [x] Create a Model to handle the endpoint communication, and use it in the login controller, instead of making the fetch request directly in the controller.
  - [x] The model should use a env variable to get the base URL of the backend, so we can change it in the future without having to change the code.
  - [x] The model need a method to send the login request to the backend, and handle the response, returning the necessary data to the controller.
  - [x] Test the model in the browser, and make sure it works as expected.
  - [x] Modify the validator to allow a password without capital letters.

---

## 09-03-26 - Creación del Spec y Mockup del Dashboard

- [x] Generar el documento de especificación (`docs/specs/dashboard_spec.md`) para el componente Dashboard, estableciendo el diseño "Mobile-First" sin el uso de JavaScript ni patrón MVC por el momento.
- [x] Crear el mockup estático (`test/dashboard.html`) implementando la estructura del menú lateral (hamburguesa usando solo CSS) y contenedores para métricas de inventario/ventas y tablas para Usuarios, O.C. y Componentes.
- [x] Corregir la integración de `Design Tokens` nativos en el HTML debido a incompatibilidades directas leyendo el `@theme` de Tailwind 4 desde el navegador, forzando los colores reales (Steel Gray y Soft Cyan) y un aspecto completamente profesional.
- [x] Agregar la carga global de la fuente `Work Sans` desde Google Fonts y forzar el renderizado en todo el documento para coincidir con la identidad visual estipulada.

---

## 10-03-26 - Migración de Dashboard a Componente MVC y Documentación JSDoc

- [x] Migración del archivo estático `dashboard.html` a la arquitectura de componentes MVC del proyecto, logrando que el dashboard funcione como un módulo de visualización y control reutilizable.
  - [x] **Vista (`dashView.js`)**: Se encapsuló la estructura HTML del dashboard dentro del método `getTemplate()`. Se generó dinámicamente el DOM incrustando selectores para buscar e identificar elementos interactivos (barra de búsqueda, botones de cabecera) y se expusieron métodos para enlazar dichos eventos (`bindLogout`, `bindExport`, `bindSearchClient`, etc.).
  - [x] **Controlador (`dashController.js`)**: Se implementó la lógica de inicialización en el componente mediante `init()`. Se protegió el acceso verificando si el token de sesión es válido; si lo es, conecta la vista con el modelo simulando el consumo de la DB y registra las acciones a través de `dashboardEventHandler()`.
  - [x] **Modelo (`dashModel.js`)**: Se definió un modelo robusto con estado para clientes, productos y órdenes. Se implementó una respuesta asíncrona simulada (mock object) en la función `fetchDashboardData()` lista para conectarse directamente al backend de la aplicación cuando exista.
- [x] Se añadió la documentación JSDoc obligatoria a los métodos principales de las clases `DashboardModel`, `DashboardController` y `DashboardView`.
- [x] La documentación se generó siguiendo estrictamente la guía de estilo para JavaScript definida en `.agent/rules/js_functions.md`, garantizando uniformidad sin alterar la lógica de negocio ni la funcionalidad de los componentes.

---

## 14-03-26 - Validación de Token y Redirección al Login

- [x] **Implementación de Estrategia de Redirección**: Se desarrolló un flujo completo para manejar sesiones expiradas o tokens inválidos, asegurando que el usuario sea notificado mediante un modal antes de ser redirigido al login.
  - [x] **Modelo (`authModel.js`)**: Se eliminó el manejo silencioso de errores. Ahora el modelo valida la presencia del token y lanza excepciones (`throw Error`) para que el controlador gestione la respuesta visual.
  - [x] **Controlador de Modal (`modalController.js`)**: Se extendió la funcionalidad de `showError` para aceptar un callback `onClose`. Este callback se ejecuta justo cuando el usuario cierra el modal, permitiendo acciones post-notificación.
  - [x] **Controlador de Dashboard (`dashController.js`)**: Se configuró la captura de errores en el método `init`. Al detectar un fallo de autenticación, se invoca el modal de error y se le pasa una función de navegación que usa `window.router.navigate("/")` para volver al inicio de forma fluida (SPA).
  - [x] **Factory y Main (`dash_factory.js`, `main.js`)**: Se corrigió un bug de inyección donde el Dashboard carecía de un controlador de modal. Ahora se instancia mediante `ModalFactory` y el elemento HTML se adjunta al `body` para garantizar su visibilidad.
- [x] **Actualización de Reglas de Desarrollo**:
  - [x] Se modificó `.agent/rules/mvc_pattern.md` para prohibir formalmente que los Modelos manipulen la UI o la consola, reforzando la separación de responsabilidades donde el Controlador es el único encargado de decidir cómo presentar los errores al usuario.

---

## 15-03-26 - Gestión Modular de Assets SVG y Refactorización de Vistas

- [x] **Gestión de Recursos por Componente**: Se estableció la regla de que cada componente debe tener sus propios recursos. Se crearon archivos `svg_icons.js` específicos en `src/components/LoginForm/icons/` y `src/components/Dashboard/icons/` para guardar los iconos SVG de cada módulo, resolviendo la redundancia de HTML en las vistas.
- [x] **Refactorización de Componentes (MVC)**:
  - [x] **Vistas (`LoginView.js`, `dashView.js`)**: Se actualizaron para recibir el objeto de iconos correspondiente a través del constructor. Se implementó el uso de variables dinámicas (`${this.icons.name}`) en las plantillas HTML, lo que reduce el peso de los archivos y facilita su lectura.
  - [x] **Factories (`login_factory.js`, `dash_factory.js`)**: Se integró la lógica de inyección de dependencias. Cada factory importa exclusivamente los iconos de su componente y los provee a la vista correspondiente.
- [x] **Optimización de Mantenibilidad e Independencia**: Esta estructura garantiza el encapsulamiento; si un componente es reutilizado o movido en el futuro, lleva consigo sus propios recursos visuales sin depender de un archivo centralizado, respetando así la alta cohesión.

---

## 16-03-26 - Extracción de Componente Sidebar y Aplicación de Patrón Factory

- [x] **Modularización del Menú de Navegación**: Se extrajo con éxito la barra de navegación lateral del `Dashboard` para convertirla en el componente independiente `Sidebar`, permitiendo su reutilización en futuros módulos (Usuarios, Clientes, etc.).
- [x] **Implementación de Componente Sidebar (MVC)**:
  - [x] **Vista (`sidebarView.js`)**: Se diseñó para retornar bloques de HTML separados (_Aside_ y _Burger Button_), permitiendo su inyección estratégica en el layout sin romper el funcionamiento del CSS actual (checkbox hack).
  - [x] **Controlador (`sidebarController.js`)**: Se implementó para gestionar la lógica de presentación, recibiendo por inyección la vista y permitiendo dinamizar la ruta activa (`activeRoute`) y los datos del usuario (`userData`).
  - [x] **Iconos (`svg_icons.js`)**: Se trasladaron y aislaron los SVG de navegación al nuevo directorio del componente para asegurar su autonomía.
- [x] **Refactorización de Arquitectura y Patrón Factory**:
  - [x] **Fábrica de Sidebar (`sidebar_factory.js`)**: Se creó para centralizar la creación del componente Sidebar y sus dependencias.
  - [x] **Inyección de Dependencias (DI)**: Se refactorizó el `DashboardController` y su fábrica (`dash_factory.js`) para recibir el componente Sidebar a través del constructor, eliminando importaciones directas y instanciaciones acopladas dentro de los controladores, cumpliendo así con las reglas de arquitectura del proyecto.
  - [x] **Integración con Storage**: Se vinculó la visualización del perfil en el sidebar con los datos reales del `SessionStorage` (`UserName` y `Role`).
- [x] **Documentación Técnica**:
  - [x] **Especificación (`SideBar_Spec.md`)**: Se detalló el flujo de datos, la lógica de implementación por bloques y los criterios de aceptación.
  - [x] **Decisión Arquitectónica (`001_sidebar_extraction_decision.md`)**: Se registró formalmente la decisión de desacoplar la navegación y el uso de DI para mejorar la escalabilidad del sistema.

---

## 17-03-26 - Implementación y Componentización de Tabla de Usuarios

- [x] **Implementación de Tabla de Usuarios**: Se agregó una nueva sección de "Usuarios del Sistema" al final del Dashboard, manteniendo la consistencia visual y funcional con las tablas existentes.
  - [x] **Estilos y UI**: Se creó la clase `.btn-danger` en `style.css` para los botones de borrado y se aplicó una regla global para centrar los títulos (`<th>`) de todas las tablas del proyecto.
- [x] **Componentización de TablaUsuarios (MVC)**: Se extrajo la lógica de la tabla de usuarios a su propio componente independiente para mejorar la mantenibilidad y escalabilidad.
  - [x] **Modelo (`tablaUsuariosModel.js`)**: Implementa la carga asíncrona de datos simulada mediante promesas.
  - [x] **Vista (`tablaUsuariosView.js`)**: Genera el HTML dinámico de la tabla y sus filas a partir de los datos del modelo.
  - [x] **Controlador (`tablaUsuariosController.js`)**: Gestiona el ciclo de vida del componente y la obtención de datos.
  - [x] **Factoría (`tabla_usuarios_factory.js`)**: Centraliza la instanciación e inyección de dependencias del componente.
- [x] **Inyección de Dependencias y Refactorización**:
  - [x] Se modificó `dash_factory.js` para integrar `TablaUsuariosFactory`.
  - [x] Se refactorizó `DashboardController` para recibir el controlador de usuarios por inyección de dependencias.
  - [x] Se actualizó `dashView.js` para inyectar el HTML del componente dinámicamente, eliminando el código hardcodeado previo.
- [x] **Documentación Técnica**:
  - [x] **Especificación (`UserTable_spec.md`)**: Se detallaron los requerimientos, estructura MVC y resultados visuales.
  - [x] **Decisión Arquitectónica (`002_user_table_componentization_decision.md`)**: Se registró la justificación técnica de la modularización y el uso del patrón Factory.
- [ ] **Tareas Pendientes (Backlog)**:
  - [ ] Modificar `tablaUsuariosModel.js` para realizar peticiones reales al backend.
  - [ ] Migrar la visualización de la tabla de usuarios para utilizar la librería `datatable.js`.

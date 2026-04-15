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
  - [x] **Decisión Arquitectónica (`002_user_table_componentization_decision.md`)**: Se registró la justificación técnica de la modularización y el uso des patrón Factory.

---

## 18-03-26 - Integración de DataTables en Tabla de Usuarios y Estandarización de Estilos

- [x] **Integración de DataTables en TablaUsuarios**: Se migró el renderizado manual de filas a la librería interactiva `datatables.js` para proveer capacidades de búsqueda, ordenamiento y paginación.
  - [x] **Instalación de Dependencias**: Se instaló `datatables.net-dt` mediante NPM para un manejo modular (ESM).
  - [x] **Refactorización de Vista (`tablaUsuariosView.js`)**: Se adaptó el `renderTable` para entregar el cascarón estático y se creó `initDataTable` para la inicialización dinámica.
  - [x] **Refactorización de Controlador (`tablaUsuariosController.js`)**: Se implementó una lógica de "Polling" (setInterval) en `bindEvents` para garantizar la existencia física del elemento en el DOM antes de la instanciación de la librería. Se adoptó la delegación de eventos (`Event Delegation`) para las acciones de Editar/Borrar.
  - [x] **Orquestación en Dashboard**: Se vinculó el ciclo de vida del componente hijo (`TablaUsuarios`) con el `DashboardController` invocando sus eventos tras el renderizado principal.
- [x] **Alineación Estética y Diseño Premium**:
  - [x] **Personalización del Buscador**: Se utilizó el callback `initComplete` de DataTables para mutar dinámicamente el DOM del buscador, inyectando las clases institucionales (`.input-wrapper`, `.input-icon`, `.input-field`) y el SVG de la lupa.
  - [x] **Sobrescritura de Estilos CSS**: Se añadieron reglas específicas en `style.css` con selectores de alta prioridad para neutralizar el diseño nativo de DataTables y asegurar la coherencia visual con el resto del Dashboard (bordes, fondos y paddings corregidos).
- [x] **Pruebas y Datos**: Se expandió el `TablaUsuariosModel` con 15 usuarios adicionales (Total 20) para validar el comportamiento fluido de la paginación y los filtros globales.
- [x] **Documentación y Transferencia de Conocimiento**:
  - [x] **Skill de Proyecto (`datatables_integration/SKILL.md`)**: Se creó una guía maestra "paso a paso" que documenta el flujo oficial para futuras integraciones de tablas dinámicas siguiendo el ciclo de vida del DOM y MVC.
  - [x] **Especificación Técnica (`datatables_spec.md`)**: Se detalló el "Qué, Para Qué y Por Qué" de cada cambio técnico efectuado.
  - [x] **Decisión Arquitectónica (`003_datatables_integration_decision.md`)**: Se registró formalmente la adopción de la librería y las estrategias de gestión de eventos elegidas.

---

## 19-03-26 - Componentización de Gestión de Clientes, Evolución de DataTables y Refactorización MVC

- [x] **Evolución del Canon de Integración (`SKILL.md`)**:
  - [x] Se analizó la implementación de `TablaUsuarios` para mejorar la guía maestra de DataTables, añadiendo el patrón de "Panel con Scroll" (`50vh`) como alternativa preferente a la paginación para layouts de dashboard compactos.
  - [x] Se estandarizó la lógica de columnas de acciones inyectando flags obligatorias (`orderable: false`, `searchable: false`) en las columnas con HTML (botones) para evitar errores lógicos en el filtrado.
  - [x] Se incorporó formalmente la sección de **Instanciación (Patrón Factory)** y la rigurosidad asíncrona en los **Modelos** (`fetchData` retornando `Promises`) dentro del documento de la skill.
- [x] **Componentización de Tabla de Clientes (`TablaClientes`)**:
  - [x] **Modelo (`tablaClientesModel.js`)**: Se implementó una capa de datos asíncrona que simula un delay de red y retorna una promesa con 20 registros de clientes corporativos (IDs, Nombres, Ubicaciones y Estados).
  - [x] **Vista (`tablaClientesView.js`)**: Se diseñó siguiendo el nuevo canon de `SKILL.md`. Implementa un layout de scroll vertical, badges dinámicos para estados ("Activo"/"Inactivo") y la mutación del buscador de DataTables para integrar el icono SVG institucional de búsqueda.
  - [x] **Controlador (`tablaClientesController.js`)**: Se desacopló el ciclo de vida, proveyendo un método `init()` para el cascarón HTML y un `bindEvents()` con polling para la inicialización segura del plugin tras la inyección en el DOM.
  - [x] **Fábrica (`tabla_clientes_factory.js`)**: Se creó para encapsular la instanciación y ensamble de las dependencias MVC del componente.
- [x] **Reorganización y Refactorización del Dashboard**:
  - [x] **Reubicación Visual**: Se movió la tabla de "Gestión de Clientes" a la penúltima posición del dashboard, justo antes de los usuarios, optimizando el flujo de lectura del Panel de Resumen.
  - [x] **Inyección de Dependencias (DI)**: Se refactorizó `dash_factory.js` y `DashboardController.js` para recibir e inyectar el componente de clientes de forma dinámica a través del constructor, eliminando todo el HTML estático persistente en `dashView.js`.
- [x] **Documentación Técnica y Soporte de IA**:
  - [x] **Especificación (`ClientsTable_spec.md`)**: Se generó el documento detallando requerimientos, arquitectura de archivos y decisiones de diseño para el nuevo componente.

- [ ] **Tareas Pendientes (Backlog)**:
  - [ ] Implementar la componentización de la tabla de "Órdenes de Compra Recientes" siguiendo el nuevo estándar.
  - [ ] Migrar el `DashboardModel` para centralizar las peticiones asíncronas de todos los sub-componentes.
  - [ ] Modificar `tablaUsuariosModel.js` para realizar peticiones reales al backend.

---

## 23-03-26 - Integración de Backend, Corrección de Storage y Reglas de Tablas MVC

- [x] **Integración Real del Backend para Tabla Usuarios**:
  - [x] Se analizó la estructura del backend (rutas, controladores y responses en `/users/get/all`) para diseñar la estrategia de consumo.
  - [x] Se modificó `tablaUsuariosModel.js` para reemplazar los datos "hardcodeados" con una llamada asíncrona (`fetch`) real tipo `POST`, inyectando el token en los headers (`Authorization: Bearer <token>`). El modelo asume la responsabilidad de procesar la respuesta devolviendo un objeto de `Error` o mapeando las variables del JSON (`users_name` -> `nombre`, etc.) asegurando que la vista y las columnas de la tabla permanezcan inquebrantables.
  - [x] Se modificó `tablaUsuariosController.js` para interceptar proactivamente la excepción del modelo en caso de fallas de conexión (Ej. `HTTP 500` o `HTTP 403`) y mostrar un mensaje explícito sólo por consola, protegiendo al frontend de crash.
- [x] **Corrección de Arquitectura de Autenticación (Bug 403 Forbidden)**:
  - [x] Se detectó y resolvió un fallo donde `localStorage.getItem("token")` de forma directa retornaba nulo, debido a que el estándar del proyecto utiliza `sessionStorage` encapsulado en formato JSON mediante la clase centralizada.
  - [x] Se modificó `tabla_usuarios_factory.js` para instanciar la clase `SessionStorage` de manera correcta, invocar `loadSessionStorage()` y posteriormente inyectarla como dependencia indispensable en la instanciación del `TablaUsuariosModel()`.
  - [x] Se refactorizó el modelo para asimilar y recuperar la sesión en curso consumiéndola de manera limpia desde el objeto Inyectado (`this.storage.Token`).
- [x] **Creación de Nueva Skill y Reglas Automáticas de Desarrollo**:
  - [x] Se documentó un archivo de `SKILL.md` (`.agent/skills/backend_table_integration/SKILL.md`) con las prácticas aprendidas como un protocolo obligatorio futuro para peticiones a backend renderizadas a tablas en DataTables, ordenando variables en `.env`.
  - [x] Se escribió una Regla Automática condicional (Workflow/Rule) dictando a la IA que aplique dicha Skill inevitablemente siempre que deba diseñar componentes MVC que impliquen tablas con datos de conexión real, previniendo bugs e inconsistencias estructurales.

---

## 24-03-26 - Integración de Backend a Tabla Clientes y Evolución de Skill

- [x] **Integración Real del Backend para Tabla Clientes**:
  - [x] Se analizó la estructura del backend para consumirlo desde el endpoint `/clients/get/all` e integrarlo al componente de `TablaClientes`, aplicando estrictamente la regla y skill de `backend_table_integration`.
  - [x] Se refactorizó la arquitectura MVC (`tablaClientesModel.js`, `tablaClientesView.js`, `tablaClientesController.js`) y su factoría para inyectar `SessionStorage` y consumir de forma segura mediante asincronía y headers autorizados (`Bearer`).
  - [x] Se estandarizó visualmente la tabla replicando los estilos, manejo de estado vacío ("") y botones dinámicos ('Editar' y 'Borrar') presentes en `TablaUsuarios`.
  - [x] Se ajustó el mapeo JSON desde el backend para extraer y renderizar únicamente 5 columnas requeridas visualmente (`Nombre del Cliente`, `Correo`, `Teléfono`, `Estado`, `Acciones`), filtrando datos sobrantes pero preservando el `id` oculto internamente para su uso lógico con los botones de acción.
- [x] **Evolución y Enriquecimiento de la Skill `backend_table_integration`**:
  - [x] **Verificación HTTP**: Se añadió directiva para nunca asumir peticiones 'GET' basadas en sintaxis de endpoints y validar obligatoriamente (ej. `POST` requerido).
  - [x] **Fallbacks Nulos**: Se documentó el protocolo para rellenar variables de UI requeridas con `strings` vacíos cuando el backend las omita, protegiendo DataTables.
  - [x] **Aislamiento de Llaves Lógicas**: Se reforzó la retención de `id`s primarios en el mapeo incluso cuando una columna se oculte textualmente, salvaguardando la operatividad.
  - [x] **Congruencia HTML y JS**: Se estableció una sección explícita que demanda paridad milimétrica de columnas entre los elementos estáticos `<th>` y los arreglos interactivos de `columns:` en DataTables.

---

## 25-03-26 - Implementación Modal de Edición de Usuarios y Generación de Skill

- [x] **Arquitectura y Creación de Componente ModalEditarUsuario**:
  - [x] Se analizó la estructura del `Dashboard`, `TablaUsuarios` y `ModalError` para diseñar una estrategia arquitectónica (MVC + Factory) que extendiera la funcionalidad de edición.
  - [x] Se crearon los archivos base para el nuevo componente: `modalEditarUsuarioModel.js`, `modalEditarUsuarioView.js` y `modalEditarUsuarioController.js`.
  - [x] Se desarrolló una UI consistente, reciclando los estilos globales del proyecto (`.modal-overlay`, `.modal-card`, `.modal-close-btn`). Se implementó un formulario con los campos "Nombre Completo", "Correo Electrónico", "Nombre de Usuario" (deshabilitado) y "Rol" (mediante un select dropdown).
  - [x] Se afinó el diseño acortando el tamaño de los botones principales a `padding: 4px 16px; font-size: 1rem;` y reposicionando el layout (`justify-content: space-between`). El botón "Cancelar" adoptó el color institucional rojo (`btn-danger`) y el botón principal se renombró a "Aplicar".
  - [x] Se eliminaron márgenes inferiores redundantes en los contenedores `.input-group` y se optimizó el interlineado visual de los textos en los selectores.
  - [x] Se renombró orgánicamente el archivo local de iconos a `svg_icons.js` para converger con la convención estándar global del proyecto y se actualizaron las referencias cruzadas.
- [x] **Integración Funcional e Inyección Dinámica (Dashboard)**:
  - [x] Se creó la fábrica `modal_editar_usuario_factory.js`.
  - [x] Se enlazó el modal en el orquestador principal (`dash_factory.js`) e inyectó su respectivo controlador como dependencia hacia la fábrica de la tabla (`TablaUsuariosFactory`).
  - [x] En el enrutador `main.js`, se anexó el nodo del DOM del modal retornado (`modalEditElement`) para coexistir en el `document.body`.
  - [x] Dentro de `tablaUsuariosController.js`, se implementó la lectura del evento click mediante _Event Delegation_ para la clase `.btn-edit`. Al recibir el trigger, extrae el identificador base, busca al usuario iterando el estado completo de la petición backend y despliega imperativamente el componente modal auto-poblando la información en sus entradas (`inputs`).
- [x] **Generación de Skill y Reglas Obligatorias de Proyecto**:
  - [x] Se compuso y expuso a revisión una nueva Antigravity Skill basada milimétricamente en el historial de este componente. Tras su validación humana, se provisionó firmemente en la ruta local `.agent/skills/modal_editar_integration/SKILL.md`. Documenta a rajatabla todo el patrón arquitectónico a reproducir en futuros formularios de edición orientados a tablas.
  - [x] Se introdujo una regla ineludible en `.agent/rules/modal_editar_integration_rule.md` que fuerza a la IA a interrumpir ejecuciones automáticas injustificadas para priorizar firmemente la asimilación preventiva de la Skill referida antes de comenzar a trabajar en tablas y modales, blindando la pureza de la UI/UX actual.

---

## 26-03-26 - Implementación Modal de Borrado de Usuarios y Resolución de Bugs UI

- [x] **Arquitectura y Creación de Componente ModalBorrarUsuario**:
  - [x] Se replicó y adaptó la estructura arquitectónica (MVC + Factory) utilizada para la edición, creando los archivos `modalBorrarUsuarioModel.js`, `modalBorrarUsuarioView.js` y `modalBorrarUsuarioController.js`.
  - [x] Se diseñó un layout enfocado en la confirmación destructiva, omitiendo formularios y presentando en el centro una advertencia gráfica dinámica resaltando el nombre o identificador del usuario en cuestión.
- [x] **Corrección de Bugs Críticos en el Ciclo de Vida del DOM**:
  - [x] **Bug de Referencia Nula (`TypeError`)**: Se solucionó un crash severo que ocurría durante la fase del _Factory_. La vista estaba generando el modal en crudo a través de un simple _template literal_, provocando que el controlador no pudiese ligar los eventos (`this.element.querySelector` leía `null`).
  - [x] **Implementación de `DOMParser()`**: Se refactorizó la función `renderModal()` en la Vista para parsear limpiamente el texto HTML convirtiéndolo en un elemento tipo Nodo o _HTMLElement_ válido antes de regresarlo a la factoría.
- [x] **Resolución de Bugs de Visibilidad (CSS vs Lógica)**:
  - [x] **Modal Oculto**: Pese a que el componente de Borrar se integró exitosamente al DOM, este continuaba invisible al ojo (`opacity: 0`, `visibility: hidden`) heredado por la clase base del framework.
  - [x] Se inyectaron dinámicamente las clases faltantes `.modal-visible` y los atributos ARIA pertinentes sobre el `overlay`, junto con la instrucción de anular el scroll documentando un bloqueo sobre el `body` (`.modal-open`).
- [x] **Estandarización Visual de Iconos y Botones Corporativos**:
  - [x] Los componentes de acción se alinearon al mismo estándar gráfico del componente de Edición, asignando las clases prefabricadas del proyecto (`.btn-danger` para Cancelar, `.btn-primary` para Eliminar).
  - [x] Se corrigió el contenedor del Ícono central de advertencia, erradicando colores inventados (`var(--color-danger)`) e implementando el token real del _Design System_ del proyecto: `var(--color-critical-500)`. El icono SVG en sí heredó el estado blanco (`color: white`) sin clases tailwind adosadas (`text-warning` removido).
- [x] **Generación de Skill de Proyecto (`modal_borrar_integration`)**:
  - [x] Se documentó oficial y minuciosamente toda la odisea como un nuevo skill bajo `.agent/skills/modal_borrar_integration/SKILL.md`. La guía plasma el diseño paso a paso, layout, y las lecciones aprendidas sobre variables CSS y Shadow DOM para regir la lógica de todas las futuras tareas de componentes de eliminación del Dashboard.

---

## 30-03-26 - Integración Backend para Edición de Usuarios y Evolución de Skill

- [x] **Conexión Real Backend en ModalEditarUsuario**:
  - [x] Se analizó el endpoint `/users/upd/byId` y se configuró la variable de entorno `VITE_API_USERS_EDIT_BY_ID` con el protocolo correcto (`http://`).
  - [x] **Modelo (`modalEditarUsuarioModel.js`)**: Se implementó el método asíncrono `updateUser` que recupera el token de `SessionStorage` (inyectado vía Factory) y envía un `POST` con la estructura exacta requerida por el backend: `{ id, updateData: { name, mail, user, role } }`.
  - [x] **Controlador (`modalEditarUsuarioController.js`)**: Se transformó el evento `submit` en una función asíncrona con manejo robusto de `try...catch`, garantizando que el modal solo se cierre tras una confirmación exitosa (`success: true`) del servidor.
- [x] **Sincronización de Datos y Corrección de "Stale Closures"**:
  - [x] **Bug de Datos Obsoletos**: Se identificó un error donde abrir el modal por segunda vez mostraba datos viejos debido a una referencia `const data` inmutable en el controlador de la tabla.
  - [x] **Refactorización de Tabla (`tablaUsuariosController.js`)**: Se cambió la declaración a `let data` y se implementó la reasignación de la variable local (`data = newData`) tras la recarga exitosa. Se integró la flag `destroy: true` en la vista de la tabla para permitir reinicializaciones limpias de DataTables sin errores de instancia previa.
- [x] **Actualización de Skill Maestra (`modal_editar_integration`)**:
  - [x] Se modificó `SKILL.md` para elevar a "Pre-requisito Imperativo" la solicitud de la variable de entorno y la estructura del payload antes de iniciar cualquier desarrollo de edición.
  - [x] Se incorporaron formalmente las lecciones sobre inyección de `SessionStorage`, controladores asíncronos y técnicas de recarga de tablas tras edición exitosa para estandarizar futuros desarrollos.

---

## 31-03-26 - Integración de Validator en Modal de Edición, Refactorización Arquitectónica y Creación de Skill

- [x] **Integración Visual y Lógica de Validator en ModalEditarUsuario**:
  - [x] **Extensión de Validator (`fieldsValidator.js`)**: Se añadieron los métodos `validateName` y `validateEmail` diseñados con expresiones regulares estrictas (e.g., ignorando números y símbolos en nombres) para evaluar los campos `$inputNombre` y `$inputMail`.
  - [x] **Vista (`modalEditarUsuarioView.js`)**: Se envolvieron los inputs dentro de contenedores `<div class="input-wrapper">` y se implementaron las burbujas personalizadas de error (`<div class="validation-tooltip">`). También se agregaron los métodos visuales `showValidationError` y `hideValidationError`.
  - [x] **Conflictos con la Validación HTML5**: Se descubrió un bug persistente donde el submit se bloqueaba sin mostrar tooltips personalizados para correos electrónicos. Se solucionó modificando explícitamente el atributo `<input type="email">` a `type="text"`, permitiendo que el Event Listener atrape el submit manual y despliegue las animaciones CSS dictadas por JS en lugar del popup default del navegador.

- [x] **Refactorización Arquitectónica (Protección del Patrón MVC & Factory)**:
  - [x] Inicialmente, se detectó una importación directa de la clase utilitaria `FieldsValidator` dentro del archivo del Controlador, rompiendo los principios de Inyección de Dependencias.
  - [x] Se trasladó la importación e instanciación estricta al archivo `modal_editar_usuario_factory.js`, pasándolo como argumento de inyección hacia el `ModalEditarUsuarioController`.
  - [x] Dentro del Controlador, se programó la evaluación asíncrona validando campos en el evento `blur` y deteniendo prematuramente (bloqueo real) del evento `submit` cuando `validateField` retorna error.

- [x] **Generación de Skill de Proyecto (`validator_integration`)**:
  - [x] Se elaboró exhaustivamente una guía maestra documentada (`.agent/skills/validator_integration/SKILL.md`) detallando la estrategia de arquitectura paso por paso. Expone los fragmentos de código, resalta la regla de instanciación Factory Obligatoria y plasma las precauciones con el `type="email"`.

- [x] **Implementación de Regla Automática Persistente (Workflow Rule)**:
  - [x] Se inyectó una regla inquebrantable (`.agent/rules/validator_rule.md`) seteada con el 'trigger' de `always_on`, orquestando a la IA a leer obligatoriamente la nueva skill previamente mencionada siempre que reciba directivas para modificar interacciones de UI, validaciones de formularios y campos, protegiendo así al entorno ante malas prácticas o sobre-escritura funcional.

---

## 05-04-26 - Integración de ModalOk en ModalEditarUsuario y Creación de Skill

- [x] **Creación e Integración Arquitectónica de Componente ModalOk**:
  - [x] Se crearon los archivos base para el nuevo componente visual de éxito (`okModel.js`, `okView.js`, `okController.js` e `modal_icons.js`) replicando con exactitud la arquitectura validada por `ModalError`.
  - [x] Se personalizó el diseño de bordes e íconos adoptando la constante de éxito corporativa `--color-high-500` (verde) en el `style.css`.
  - [x] Se orquestó su instancia en el factor intermedio `dash_factory.js` y se exportó al enrutador.

- [x] **Inyección Dinámica de ModalOk sobre ModalEditarUsuario**:
  - [x] Se propagó el controlador `modalOkController` mediante la inyección directa de dependencias a través de los métodos Factory (evitando el anti-patrón de instanciación global).
  - [x] Al ser contactada la API del backend asíncronamente con un Success, el Controlador orquesta la destrucción de su propia vista (cerrar modal editar) e inicia el proceso visual de invocar la pre-carga del ModalOk en color verde.
  - [x] El viejo indicio por `console.log()` ha sido erradicado del ecosistema de edición.

- [x] **Depuración Intensiva de Sistema Front-End**:
  - [x] **Nodos Huérfanos**: Se reparó una desconexión crítica donde el Array de Salida del Factory enviaba el Object, pero el enrutador en `main.js` no lo destructuraba, flotando en memoria vacía sin apender al `document.body` y previniendo que se mostrase de cara al cliente.
  - [x] **Conflictos "Chrome Form Validator" vs DOM Framework**: Se extirpó el crasheo visual (`Invalid form control is not focusable`) causado por mantener etiquetas `required` dentro de `HTML inputs` invisibles operados por JS estricto. La validación ahora reposa orgánicamente en `FieldsValidator`.

- [x] **Expansión de Antigravity Skills y Reglas Persistentes de IA**:
  - [x] Se transcribió el historial de fallos documentados y patrones obligados a la skill local `.agent/skills/modal_ok_integration/SKILL.md`.
  - [x] Se generó y blindó el documento de reglas global `.agent/rules/modal_ok_rule.md` que se ejecuta perpetuamente evaluando intenciones para forzar al agente a la lectura previa de las precauciones antes de proponer código sobre el ModalOk.

---

## 06-04-26 - Integración Asíncrona de ModalBorrarUsuario y Evolución de Skill

- [x] **Conexión Real Backend en ModalBorrarUsuario**:
  - [x] Se analizó y adaptó el endpoint dictado en `.env` bajo la variable `VITE_API_USERS_DEL_BY_ID`.
  - [x] **Modelo (`modalBorrarUsuarioModel.js`)**: Se integró inyección de dependencias recuperando el token (`SessionStorage`) en el constructor. Se implementó la resolución del método asíncrono para enviar el `POST` esperado con la estructura `{"id": id}`.
  - [x] **Controlador (`modalBorrarUsuarioController.js`)**: Se refactorizó la acción a asíncrona (try...catch). Al resolver favorablemente, el flujo destruye la visibilidad del modal de borrado e invoca exitosamente `modalOkController`. Si la asincronía reporta caídas, invoca a `modalErrorController`.

- [x] **Depuración Intensiva y Solución de Crash de Dependencias (Factory)**:
  - [x] **Nulidad de Callbacks**: Se detectó un error arquitectónico mayor al integrar la visualización del ModalOk. Javascript resolvía `"Cannot read properties of undefined (reading 'showOk/Error')"` originado por un Factory ausente.
  - [x] **Sincronización `dash_factory.js`**: Se refactorizó el ensamblador origen `dash_factory.js` permitiendo que `ModalBorrarUsuarioFactory.createModal(...)` recibiera directamente los controladores `modalErrorController` y `modalOkController` globales, reestableciendo la armonía del software.

- [x] **Interactividad Reactiva Local DataTables (Recarga en Caliente)**:
  - [x] Se sobreescribió el listener inyectado (`this.onConfirmCallback`) dentro del controlador de la Tabla (`tablaUsuariosController.js`). Al destruir con éxito un registro, la promesa aguarda un refresh mediante lógica asíncrona que vuelve a pedir todos los datos llamando al modelo, evitando vistas falsas persistentes.

  - [x] Se sobrescribió exhaustivamente la guía obligando terminantemente a pedir los endpoints, métodos, body target y pasos a inyecciones. Los casos descubiertos de nulidad arquitectónica y problemas de UI pasaron a nutrir la guía garantizando la no repetición de dicho error en todo WARESmart.

---

## 13-04-26 - Implementación Modal Editar Cliente, Extensión de UI y Troubleshooting Crítico de DataTables

- [x] **Arquitectura y Creación de Componente ModalEditarCliente**:
  - [x] Se aplicó la guía `modal_editar_integration` para crear la vista, el modelo y el controlador que permiten modificar información de los clientes (Nombre, Correo, Teléfono, RFC, Dirección, Contacto).
  - [x] Se inyectó global y exitosamente al DOM a través de la factoría concentradora `dash_factory.js` y el enrutador `main.js`.

- [x] **Refactorización Visual y de Negocio en Tabla Clientes**:
  - [x] Se sustituyó la columna genérica de estado a favor de mapear y mostrar "RFC", "Dirección" y "Contacto", adaptando tanto la vista HTML (sus _headers_) como la resolución del JSON extraído por `fetchClientsData()` en el modelo.

- [x] **Extensión y Re-adaptación de Validadores Globales (`fieldsValidator.js`)**:
  - [x] Se corrigió una barrera sistémica donde campos no contemplados originariamente reportaban siempre invalidez. Se integró el soporte para `editClienteNombre`, `editClienteContacto`, `editClienteCorreo` apuntándolos a reglas de Regex existentes.
  - [x] Se generó y habilitó `validateGenericText()` permitiendo aprobar de forma obligatoria inputs de texto libre que deban alojar números permitidos (Ej. Teléfonos, Códigos Postales, Direcciones con numerales).

- [x] **Depuración Crítica (Troubleshooting) del Ciclo MVC y DataTables**:
  - [x] **Fallo Crítico por Referencia Nula (Aviso Temprano)**: Se extirpó y diagnosticó profundamente el error `Cannot read properties of null (reading 'querySelector')` derivado al intentar atar lógicas a un DOM Virtual que aún no había sido ordenado a "parsearse" por el Factory (omisión de `view.renderModal()`).
  - [x] **Atascamiento de Reactividad (Cannot reinitialise DataTable)**: Se descubrió que la librería prohibe montar un dataTable nuevo sobre otro ya incrustado cuando le hacíamos el "refresh". Se mitigó permanentemente integrando la bandera `destroy: true` dentro de las variables de configuración nativas de estas vistas.

- [x] **Maduración de la Antigravity Skill Maestra (`modal_editar_integration/SKILL.md`)**:
  - [x] Todo el aprendizaje extraído del Crash Visual de DOM Parsing y el bloqueo de DataTables al repopularse, pasaron a grabarse exitosamente como el Anexo Final de las directivas, dictaminando reglas arquitectónicas preventivas para todo el ciclo de iteraciones futuro WARESmart sin mutilar ningún canon pre-existente.

---

## 14-04-26 - Implementación Modal Borrar Cliente, Integración de Backend y Resolución de Nodo Huérfano

- [x] **Arquitectura y Creación de Componente ModalBorrarCliente**:
  - [x] Se aplicó la guía `modal_borrar_integration` para crear el nuevo componente MVC que permite la eliminación asíncrona de clientes.
  - [x] **Modelo (`modalBorrarClienteModel.js`)**: Configurado para consumir el endpoint `VITE_API_CLIENTS_DEL_BY_ID` mediante peticiones `POST` enviando el ID del cliente y autorizando con el token de `SessionStorage`.
  - [x] **Vista (`modalBorrarClienteView.js`)**: Implementada con `DOMParser` para renderizar un modal de advertencia visualmente coherente con el Design System, incluyendo iconos SVG dinámicos.
  - [x] **Controlador (`modalBorrarClienteController.js`)**: Maneja la confirmación de borrado, vincula el éxito con `ModalOk` y el error con `ModalError`, cerrando el flujo asíncrono limpiamente.

- [x] **Integración y Reactividad en Tabla Clientes**:
  - [x] Se modificó `TablaClientesFactory` y `TablaClientesController` para recibir e inyectar el nuevo controlador de borrado.
  - [x] Se implementó un callback de confirmación reactivo que, tras un borrado exitoso, realiza un nuevo fetch al modelo y actualiza la grilla de DataTables mediante `this.view.initDataTable(data)`, logrando una actualización en vivo sin refrescar el navegador.

- [x] **Depuración de Inyección en el DOM (Bug del Nodo Huérfano)**:
  - [x] **Diagnóstico**: Se identificó un error donde el botón de borrar no mostraba el modal pese a que el código se ejecutaba. La causa fue que el elemento Node retornado por la factoría no estaba siendo adjuntado al `document.body` en `main.js`.
  - [x] **Solución**: Se actualizó el router principal en `main.js` para extraer el `modalDeleteClientElement` del dashboard y añadirlo formalmente al DOM mediante `append`.

- [x] **Evolución de Skills Maestras**:
  - [x] Se enriqueció la skill `.agent/skills/modal_borrar_integration/SKILL.md` con un nuevo apartado de troubleshooting sobre "Inyección de Nodo Huérfano", documentando el síntoma y la solución para prevenir su repetición en futuros componentes del dashboard.

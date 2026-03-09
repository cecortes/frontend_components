# Lógica de Implementación y de Negocio

## ⚙️ Lógica de Implementación y de Negocio

### Lógica de Autenticación
- El frontend recoge Usuario/Password, valida que los campos no estén vacíos o corruptos previamente vía `fieldsValidator`, y los envía al backend (Model `login`).
- El backend (`authRoutes.js` -> `handleLogin`) valida en la BD. Si el usuario existe, se genera un JSON Web Token (JWT) firmado que se le devuelve al frontend.
- El frontend guarda este Token y rol del usuario en `SessionStorage`.
- Las futuras peticiones al backend (por ejemplo, buscar todos los usuarios) están envueltas por un middleware (`authenticateToken` en el backend) que exige que el JWT viaje en las cabeceras `Authorization: Bearer <token>`.

### Flujo de Navegación del Router
- Al autenticarse con éxito, el `LoginController` da la instrucción al `window.router.navigate("/dashboard")`.
- El Router limpia el contenedor raíz (`app.innerHTML = ""`) e inyecta la plantilla generada por el `DashboardFactory`. 

### Manejo de Errores Uniforme (ModalError)
- El frontend ha desacoplado un componente específicamente para mostrar errores llamado `ModalError`. En caso de que el `try/catch` del controlador atrape un error arrojado por el modelo, se llama al `modalController.showError()`, reutilizando una vista unificada para todas las interfaces emergentes.

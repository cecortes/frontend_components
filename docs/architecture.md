# Arquitectura del Proyecto

## 🏗️ Arquitectura del Proyecto

### Backend (Arquitectura por Capas / MVC-like)
El backend mantiene una separación de responsabilidades muy limpia mediante una arquitectura basada en capas:
- **Routes (`/routes`)**: Define los endpoints de la API y vincula las peticiones HTTP con los controladores apropiados.
- **Controllers (`/controllers`)**: Contiene la lógica orquestadora. Recibe las peticiones HTTP (`req`, `res`), valida los parámetros de entrada y llama a los servicios correspondientes. Maneja las respuestas de éxito y error.
- **Services (`/services`)**: Contiene la **Lógica de Negocio** y el acceso a datos. Es aquí donde se ejecutan las consultas SQL mediante el `dbPool`.
- **Configuración (`/config`)**: Scripts de inicio, como la conexión a la base de datos MySQL (Patrón Singleton de pool de conexiones).
- **Middlewares (`/middlewares`)**: Lógica intermedia, en este caso, la verificación de tokens JWT (`authenticateToken`) para proteger endpoints privados.

### Frontend (Arquitectura Custom MVC + SPA)
El frontend imita el comportamiento de una Single Page Application (SPA) y Frameworks robustos usando Vanilla JS:
- **Router Propio (`/router/router.js`)**: Modifica el historial de navegación (History API) e intercepta el estado de recarga para inyectar componentes dinámicamente en el div `#app` sin recargar la página.
- **Estructura de Componentes MVC**:
  Cada funcionalidad principal o "página" (como Login, Dashboard o Modales) se divide en tres partes:
  - **View (`*View.js`)**: Se encarga exclusiva y declarativamente de renderizar el HTML (por medio de strings construidos dinámicamente y el `DOMParser`) y de retornar referencias a los elementos DOM (`LoginElements`).
  - **Model (`*Model.js`)**: Gestiona los datos y se comunica con las APIs externas mediante `fetch` hacia el backend.
  - **Controller (`*Controller.js`)**: Actúa de pegamento. Inyecta eventos (`addEventListener`) a la View y comunica las acciones al Model. También utiliza clases auxiliares, como validadores o gestores de almacenamiento (`SessionStorage`).

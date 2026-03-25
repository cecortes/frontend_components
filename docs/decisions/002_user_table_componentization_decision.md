# Decisión Arquitectónica: Componentización de la Tabla de Usuarios e Inyección mediante Factory

- **Fecha:** 17 de Marzo de 2026
- **Módulo:** UI Frontend (Gestión de Usuarios y Dashboard)
- **Patrones:** MVC, Factory, DI (Dependency Injection), Async Mocking

## Contexto

El `Dashboard` original contenía una estructura estática y hardcodeada para la visualización de diferentes tablas (Clientes, Productos, Órdenes). Al añadir una nueva tabla para "Usuarios del Sistema", incluirla directamente en el ya extenso archivo `dashView.js` aumentaba el acoplamiento y dificultaba la futura evolución hacia una gestión de usuarios CRUD (Create, Read, Update, Delete) conectada a un backend. Además, el diseño visual requería una alineación más limpia en las cabeceras de tabla y un estilo distintivo para las acciones de eliminación.

## Decisión

Se decidió **extraer la lógica y el renderizado de la tabla de usuarios** hacia su propio componente modular e independiente (`TablaUsuarios`), siguiendo rigurosamente las convenciones arquitectónicas del proyecto **WARESmart**.

1. **Implementación MVC Completa**: Se crearon archivos independientes para `Model`, `View` y `Controller` dentro de la subcarpeta `src/components/TablaUsuarios/`.
   - **Model**: Implementa `fetchUsersData()` como una promesa asíncrona, preparando el terreno para llamadas reales vía `fetch` sin alterar el resto del sistema.
   - **View**: Genera el HTML de forma dinámica iterando sobre un array de objetos de usuario, en lugar de usar HTML estático.
   - **Controller**: Orquesta la carga y el renderizado, permitiendo un manejo de eventos aislado en el futuro.

2. **Ensamblaje mediante Patrón Factory**: Se construyó `src/factory/tabla_usuarios_factory.js` para centralizar la instanciación de las dependencias del componente y devolver el controlador listo para su uso.

3. **Inyección de Dependencias (DI) en el Dashboard**: Para evitar cambios disruptivos en el `Dashboard`, se inyectó el controlador de `TablaUsuarios` en el constructor de `DashboardController` a través de `dash_factory.js`. El dashboard ahora delega la generación del fragmento HTML de la tabla de usuarios a este nuevo componente inyectado.

4. **Refinamiento de Reglas de Estilo**:
   - Se definió la clase `.btn-danger` en `style.css` utilizando la variable global de color crítico del proyecto (`--color-critical-500`) para el botón de "Borrar".
   - Se estableció una regla global CSS para centrar el texto en todos los elementos `<th>` de las tablas, asegurando simetría visual en todo el sistema.

## Consecuencias

- **Positivas:**
  - **Single Responsibility (SRP)**: El Dashboard se libera de la lógica de renderizado de la tabla de usuarios.
  - **Escalabilidad**: El componente de usuarios puede ser fácilmente reutilizado en una vista dedicada de "Gestión de Usuarios" o "Configuración de Perfil".
  - **Flexibilidad de Backend**: Cambiar de datos hardcodeados a una API real solo requiere modificar el archivo `Model` del componente.
  - **Código Limpio**: Reducción de la longitud de los archivos del Dashboard y mejora en la legibilidad.

- **Negativas / Consideraciones:**
  - **Aumento de la verbosidad**: El componente requiere ahora 4 archivos (M, V, C y Factory) en lugar de una sección simple de HTML. Esto es un costo aceptado para garantizar la madurez arquitectónica del proyecto.
  - **Dependencia de Fábrica**: Cualquier nueva vista que integre esta tabla de forma modular deberá importar y usar su respectiva `Factory`.

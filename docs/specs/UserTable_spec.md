# Especificación: Componentización de Tabla de Usuarios

## 1. Visión General

Este documento describe los requerimientos, la estructura y la implementación de la extracción de la tabla de "Usuarios del Sistema" desde la vista estática del `Dashboard` hacia un componente independiente y reutilizable denominado `TablaUsuarios` dentro del ecosistema **WARESmart**.

## 2. Motivación y Objetivos

Originalmente, la tabla de usuarios se encontraba hardcodeada directamente en el template del Dashboard. Esta refactorización busca:

- **Modularización:** Aislar la lógica de gestión de usuarios del resto de los indicadores del dashboard.
- **Preparación para Backend:** Implementar una capa de modelo asíncrona que facilite la futura integración con una API real de Node.js sin afectar la vista o el controlador.
- **Mantenibilidad:** Reducir la complejidad y el tamaño del archivo `dashView.js`.
- **Consistencia Estética:** Aplicar refinamientos visuales (botones de acción estilizados y centrado de cabeceras) de manera centralizada en el nuevo componente.

## 3. Arquitectura y Estructura de Archivos

Se ha seguido estrictamente el patrón **MVC** y el patrón **Factory** del proyecto. El componente reside en:

- `vite-components/src/components/TablaUsuarios/`
  - `model/tablaUsuariosModel.js`: Encargado de la obtención de datos (actualmente simula un fetch con una promesa y datos estáticos).
  - `view/tablaUsuariosView.js`: Genera el fragmento HTML de la tabla, iterando sobre los datos recibidos para crear las filas dinámicamente.
  - `controller/tablaUsuariosController.js`: Actúa como mediador, inicializando la carga de datos y solicitando el renderizado a la vista.
- `vite-components/src/factory/tabla_usuarios_factory.js`: Responsable de la creación y ensamblaje del componente inyectando sus dependencias.

## 4. Lógica de Implementación y Decisiones Arquitectónicas

### 4.1. Carga Asíncrona de Datos

A diferencia de las tablas originales del Dashboard que eran puramente estáticas en el HTML, `TablaUsuarios` utiliza un `Model` que retorna una `Promise`. El `Controller` espera (`await`) a que los datos estén listos antes de solicitar el renderizado, emulando fielmente el flujo de una aplicación productiva.

### 4.2. Inyección de Dependencias (DI)

El componente `TablaUsuarios` no se instancia directamente dentro del `Dashboard`. En su lugar, es inyectado desde la `dash_factory.js` hacia el `DashboardController`. El controlador del Dashboard es el responsable de llamar al `init()` del componente de usuarios e incrustar el HTML resultante en la posición adecuada de la vista principal.

### 4.3. Refinamiento Visual y Estilos

- **Botones de Acción:** Se implementó visualmente el botón "Editar" (`btn-primary`) y "Borrar" (`btn-danger`).
- **Centrado de Columnas:** Se añadió una regla CSS global en `style.css` para centrar los elementos `<th>` de todas las tablas, mejorando el balance visual.
- **Flexbox:** El contenedor de acciones utiliza `display: flex; gap: 8px; justify-content: center;` para asegurar una alineación uniforme de los botones.

## 5. Criterios de Aceptación (Completados)

1. [x] **Arquitectura MVC:** Separación clara en Model, View y Controller.
2. [x] **Ensamblaje mediante Factory:** Uso de `TablaUsuariosFactory` para la creación del componente.
3. [x] **Inyección en Dashboard:** Integración limpia en `DashboardController` sin romper funcionalidades existentes.
4. [x] **Estilo WARESmart:** Cumplimiento de la guía de estilos (tema oscuro, botones primary/danger).
5. [x] **Datos Dinámicos (Simulados):** Renderizado basado en un array de objetos (5 usuarios de prueba).

## 6. Resultado Final

Se logró un componente desacoplado que renderiza la tabla de usuarios al final de la sección de tablas del Dashboard. El código del Dashboard ahora es más limpio y el sistema es más escalable para futuras incorporaciones de gestión de usuarios.

# Especificación: Extracción de Componente Sidebar

## 1. Visión General

Este documento detalla los requerimientos, la estrategia y los resultados de la extracción de la barra de navegación lateral (Sidebar) desde el componente original `Dashboard` hacia un componente independiente y reutilizable dentro del proyecto **WARESmart**.

## 2. Motivación y Objetivos

El objetivo principal de esta refactorización fue convertir el menú estático inicial en un componente global **plug-and-play**, de manera que pueda ser consumido por el resto de vistas de la aplicación (Usuarios, Clientes, Productos, etc.) sin incurrir en la duplicación de código HTML ni de lógica de presentación.

- **Reusabilidad:** La barra de navegación debe poder instanciarse y renderizarse en otras vistas.
- **Mantenibilidad:** Preservar intacta la lógica visual fundamentada netamente en HTML/CSS, incluyendo el _CSS Trick_ (hack con _checkbox_) para ocultar elementos en dispositivos móviles, el _overlay_ de _blur_ para enfoque visual, y las transiciones fluidas de los botones de hamburguesa y la barra lateral en sí.
- **Desacoplamiento:** Promover que el componente `Dashboard` se enfoque únicamente en su negocio (gráficas, resúmenes e indicadores) desligándose de la topología principal de la navegación.

## 3. Arquitectura y Estructura de Archivos

Al refactorizar, se siguió minuciosamente la **arquitectura MVC y Patrón de Fábrica (Factory)** establecidas en las convenciones del repositorio. El nuevo componente se ubica bajo su propio directorio encapsulado:

- `vite-components/src/components/Sidebar/`
  - `view/sidebarView.js`: Genera los nodos del DOM (`<aside>` y `<label>`).
  - `controller/sidebarController.js`: Orquesta la vista recibiendo inyecciones (ej. íconos, estado activo y objeto de datos del perfil `userData`).
  - `icons/svg_icons.js`: Matriz de íconos exportada e independizada del listado de iconos originarios del Dashboard.

## 4. Lógica de Implementación y Decisiones Arquitectónicas

### 4.1. División del Template HTML en Múltiples Inyecciones

Para respetar íntegramente la fidelidad visual, la inyección del componente a la vista no pudo ser a través de un simple nodo raíz, ya que el **botón "hamburguesa"** forma parte visual de un `<header>` en el layout final, mientras que el menú `<aside>` reside a nivel parejo con el sub-sistema.

- **Decisión:** El `sidebarView.js` fue configurado para retornar dos bloques separados a través de métodos independientes (`getSidebarTemplate` y `getBurgerTemplate`), inyectados estratégicamente desde el controlador anfitrión (ej. `DashboardController`) al método de renderización de `dashView.js`.

### 4.2. Inyección de Estado, Contexto y Enrutamiento Activo

Para dar flexibilidad al Sidebar en contextos diferentes a "Dashboard", el controlador principal de navegación (`sidebarController.js`) se diseñó para tomar estado inicial por parámetros:

- **`activeRoute`**: (ej. "dashboard", "users"). Se usa a lo largo del menú para dinamizar el atributo dinámico `class="active"`.
- **`userData`**: Datos informativos inyectados desde el Storage, que permiten renderizar el nombre y rol del operador logueado en la base inferior del _aside_.

### 4.3. Encapsulamiento Limpio de Recursos Estéticos (SVG)

Los SVG que en conjunto representaban la navegación (Usuarios, Inventario, Ordenes, Menú Principal, Logotipo) fueron removidos del vector general del Dashboard y trasladados exclusivamente a los dominios del nuevo Sidebar.

## 5. Criterios de Aceptación (Completados)

1. [x] **Arquitectura Propia:** El componente Sidebar ahora vive en un módulo encapsulado con su propia `View`, `Controller` y archivo `icons`.
2. [x] **No Mutación del DOM:** El CSS asociado al sistema no se vio alterado en absoluto.
3. [x] **Comportamiento Funcional:** El menú hamburguesa (en entornos `< 640px`) detona consistentemente la apertura y superposición del _aside_, activando los overlays tal como dicta el estándar.
4. [x] **Cumplimiento Integral de Inyección:** Integrado limpiamente por Inyección de Dependencias (DI) desde el nivel fábrica (`sidebar_factory.js`), y transferido a consumibles superiores (`dash_factory.js`).

## 6. Resultado Final

Se completó exitosamente la disociación. El _Dashboard_ sigue operando, renderizando visualmente el layout global sin errores, ahora soportado dinámicamente. El proyecto está preparado estructuralmente para importar y acoplar universalmente el `Sidebar` en páginas futuras.

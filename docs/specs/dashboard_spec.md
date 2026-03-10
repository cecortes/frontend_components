# Especificación del Dashboard (Mockup)

## 1. Visión General

Este documento define las especificaciones para la creación del **Dashboard Frontend** del proyecto WARESmart. Esta fase consistirá únicamente en la maquetación visual (mockup) del dashboard, garantizando que el diseño sea fiel a la guía de estilos principal.

> [!IMPORTANT]
> **Naturaleza del entregable (Mockup)**
> Este dashboard se diseñará como un _mockup_ estático. Los datos (usuarios, clientes, productos, etc.) serán insertados directamente en el código de forma simulada (hardcoded) sin realizar consultas a bases de datos. No existirá lógica de negocio, integración con el backend, ni código en JavaScript; el funcionamiento y presentación visual serán implementados **puramente con HTML y CSS**.

## 2. Arquitectura de Archivos y Estructura

Por el momento, el diseño será completamente auto-contenido. Para esta iteración **NO se seguirá el patrón MVC** del proyecto (no habrá carpetas separadas para `view`, `controller` ni `model`).

- **Ubicación:** Se creará un único archivo HTML llamado `dashboard.html`.
- **Directorio:** El archivo debe alojarse obligatoriamente dentro de una nueva carpeta llamada `test/` en la raíz del frontend o en el directorio que se designe para pruebas funcionales.
- **Hoja de Estilos:** Se debe enlazar y utilizar estrictamente el archivo principal de estilos del proyecto de componentes (`src/style.css` / `vite-components/src/style.css`), asegurando que todos los _Design Tokens_ y utilidades CSS (Tailwind incluido) ya configuradas operen sobre el nuevo archivo HTML.

## 3. Disposición General e Interfaz

El diseño de la interfaz se apegará al patrón visual establecido en la regla de **Refined Dark Theme** (`design_style.md`).

### 3.1. Filosofía Mobile-First

La construcción del HTML/CSS debe iniciarse para pantallas de dispositivos móviles, escalando progresivamente a resoluciones mayores (tablets y monitores de escritorio).

### 3.2. Estructura de Navegación (Sidebar)

El dashboard contará con una barra de navegación lateral para el acceso a los módulos principales.

- **Pantallas pequeñas y móviles (`< 640px`):** La barra de navegación estará oculta por defecto. Se dispondrá en la parte superior del dashboard de un botón tipo "hamburguesa" que permita desplegar o solapar la barra de menú. _(La apertura/cierre se implementará usando técnicas CSS puras, como el hack de checkbox, dado el requerimiento de no usar JS)._
- **Pantallas medianas y grandes (`>= 640px`):** La barra de navegación se mantendrá fija y visible en el lado izquierdo de la ventana.

**Elementos del Menú de Navegación:**
La barra debe contener los enlaces (o botones estilizados) hacia las siguientes secciones:

1. Usuarios
2. Clientes
3. Productos
4. O.C. (Órdenes de Compra)
5. Entradas
6. Salidas

### 3.3. Área de Contenido Principal

El área central (a la derecha de la barra lateral en pantallas medianas, o abarcando todo el ancho en móviles) contendrá la vista principal.

1. **Sección Superior - Gráficas:**
   - Debe reservarse un área principal en la parte superior para mostrar gráficas (_charts_).
   - Como no se han definido los indicadores concretos, se deberá colocar un _placeholder_ (o gráfica estática creada con HTML/CSS) que represente información genérica relacionada a inventarios o compras.

2. **Sección de Tablas de Datos:**
   Debajo del área de gráficas, se dispondrán de contenedores (preferentemente utilizando la clase `.card`) para alojar las siguientes tablas de datos simulados:
   - **Tabla de Clientes**
   - **Tabla de Productos**
   - **Tabla de O.C. (Órdenes de Compra)**

   **Requisito de Interfaz para Tablas:**
   - Cada una de estas tablas debe incluir en su cabecera o bloque superior un **campo de búsqueda** (input) maquetado visualmente (sin funcionalidad real).

## 4. Estilos y Componentes Visuales a Reutilizar

La creación del HTML debe aprovechar exhaustivamente las clases base definidas en el CSS del proyecto:

- **Fondos y Textos:** Usar variables responsivas como `--color-background-primary`, `--color-surface` y las tipografías correspondientes.
- **Botones:** Implementar `.btn` y `.btn-primary` o `.btn-secondary` para las diferentes acciones.
- **Tarjetas:** Envolver las gráficas y las tablas en contenedores con clase `.card` para aprovechar los bordes sutiles, elevaciones y el comportamiento hover.
- **Inputs de Búsqueda:** Utilizar el grupo de utilitarios `.input-group > .input-wrapper > .input-field` con sus respectivos iconos de búsqueda insertados visualmente.
- **Etiquetas de Estado:** (Opcional) Si las tablas muestran estados de inventario, enriquecer visualmente las celdas con las clases `.badge` (`.badge-normal`, `.badge-high`, etc.).

## 5. Criterios de Aceptación

1. [x] Se ha creado el archivo estático `test/dashboard.html`.
2. [x] Se consumen correctamente los estilos principales definidos en el CSS del sistema (y se inyectan variables/fuentes nativamente para la demo estática).
3. [x] El diseño cumple íntegramente con un flujo "mobile-first".
4. [x] Se ha logrado una barra de navegación adaptativa (sidebar izquierdo en pantallas grandes y botón hamburguesa en móviles).
5. [x] Las secciones de gráfica y las tres tablas (con su repectivo campo de búsqueda) están presentes en el diseño.
6. [x] No se implementa ni incorpora ningún script (JavaScript); el comportamiento de la UI depende únicamente de HTML/CSS.
7. [x] La presentación visual exuda un acabado elegante y profesional.

## 6. Resultado Final

El mockup del dashboard fue desarrollado y aprobado con éxito respetando las guías arquitectónicas y de UI del proyecto WARESmart.

**Características de la Implementación:**

- **Ruta del Archivo:** `test/dashboard.html`
- **Técnicas CSS Empleadas:** Flexbox y CSS Grid para la disposición de tarjetas y tablas. Aplicación del hack de checkbox (`<input type="checkbox">` oculto referenciado por un `<label>`) para alternar la visibilidad de la barra lateral en la vista móvil de manera interactiva sin usar código JS.
- **Tipografía y Colores:** Se lee e inyecta la fuente oficial `Work Sans` y se configuraron en un bloque de `:root` local las variables de entorno de Tailwind v4 (`--color-background-primary: #1a1f2e`, etc.) a fin de mantener la fidelidad con el "Refined Dark Theme" en un entorno pre-compilado.
- **Activos Multimedia:** Se generaron gráficas ilustrativas para la sección "Panel de Indicadores" en lugar de componentes codificados para agilizar la previsualización del diseño general (_Niveles de Inventario_ y _Movimientos de O.C._).
- **Tablas:** Total de tres tablas integradas y enlazadas con clases de estado de inventario `.badge` (Normal, Critico, Bajo Stock).

El archivo HTML queda como una línea base visual confiable para posteriormente ser desagregado en componentes según el patrón arquitectónico del producto final.

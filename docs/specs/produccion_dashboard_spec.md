# Especificación del Dashboard de Producción (UI / Mockup)

## 1. Visión General

Este documento define las especificaciones para el **Dashboard de Producción** del proyecto WARESmart. La fase actual consiste en la creación de un _mockup_ funcional (pre-diseño) operando con HTML, CSS y JavaScript Vanilla. El objetivo es validar la disposición visual (gráficas, selectores y métricas) garantizando la estricta fidelidad a la guía de estilos principal (**Refined Dark Theme**) antes de su futura migración a la arquitectura MVC final de la aplicación.

## 2. Historia y Evolución del Componente

Este pre-diseño se construyó a través de un proceso iterativo detallado a continuación, el cual establece los precedentes de las decisiones técnicas tomadas:

1. **Petición Inicial**: Se ordenó elaborar una estrategia y diseñar la página `test/Produccion.html` utilizando el sistema de diseño de Google Stitch. Se exigió de forma estricta no utilizar ningún estilo fuera del proyecto. Se incluyó como requerimiento funcional: una gráfica de barras (Lunes a Domingo), un selector de filtros ('Todos', 'Botella NGR', 'Botella BLNC') y tarjetas de totales acumulados.
2. **Incidencia Crítica de Estilos (CSS)**: Al lanzar la vista previa mediante Vite (`npx vite .`), se detectó un fallo donde los colores y variables no se aplicaban (la pantalla se mostraba transparente). 
3. **Análisis y Solución Arquitectónica**: Se diagnosticó que el archivo fuente `style.css` utiliza la directiva `@theme` propia de la nueva arquitectura de **Tailwind CSS v4**, la cual es ilegible de forma nativa por los navegadores sin previa compilación. Como Vite se ejecutó desde la raíz y no desde la carpeta `vite-components`, el plugin compilador fue evadido. La solución aplicada fue modificar el archivo `Produccion.html` para consumir directamente el _asset_ pre-compilado alojado en `../vite-components/dist/assets/index-DrR2l9Vp.css`. Esto garantizó que las variables nativas funcionaran perfectamente sin depender del servidor de desarrollo activo.
4. **Refinamiento Visual**: Posteriormente, se solicitó cambiar el color del producto 'Botella BLNC'. Se procedió a reemplazar las variables ámbar (`--color-secondary-400`) por la tonalidad verde corporativa (`--color-high-400` / `--color-high-600`), recalculando matemáticamente el `box-shadow` y `text-shadow` al rgb exacto `(47, 184, 101)` para conservar el diseño de neón sutil.

## 3. Arquitectura de Archivos y Estructura

Por el momento, el diseño es auto-contenido y **NO sigue el patrón MVC** de la aplicación principal.

*   **Ruta del Archivo:** `test/Produccion.html`
*   **Hoja de Estilos Enlazada:** `../vite-components/dist/assets/index-DrR2l9Vp.css` (Garantiza acceso a tokens como `--color-background-primary`, `--color-surface-elevated`, etc.).

## 4. Disposición General e Interfaz

La página se divide en las siguientes áreas visuales integradas bajo la regla de **"No-Line"**, priorizando separaciones mediante capas de elevación (`background-color`) sobre el uso de bordes sólidos:

### 4.1. Cabecera (Header)
*   Contiene el título de la página "Control de Producción".
*   Incluye un indicador `.badge.badge-normal` con el texto "Semana Actual".

### 4.2. Tarjeta de Gráfica de Producción
*   **Controles**: Selector desplegable (Dropdown `<select>`) estilizado sin fondo blanco, permitiendo elegir entre la vista global o el desglose por producto.
*   **Gráfica**: Contenedor Flexbox estático con líneas guías en el fondo (`chart-grid`). Cada día representa un flex-column.

### 4.3. Tarjeta de Totales Acumulados
*   Un Grid o Flex-container con tarjetas individuales (`.total-card`) por producto.
*   Cada tarjeta exuda un número destacado (`.total-number`) formateado con separadores de miles y acompañado de una suave sombra paralela (`text-shadow`) simulando iluminación ambiental.

## 5. Especificación Funcional (Deep Dive)

Aunque actualmente la gráfica funciona con datos "hardcodeados" en Vanilla JS (`weeklyData`), la lógica futura cuando el componente se migre a la arquitectura oficial MVC deberá ceñirse a las siguientes directrices funcionales:

### 5.1. Origen de los Datos
Los datos (`weeklyData` y totales) **vendrán directamente de una única llamada a la API**, la cual regresará toda la información de la semana ya pre-calculada desde el backend. El cliente no debe solicitar días individuales ni procesar agrupaciones de rangos de fechas.

### 5.2. Escalabilidad de Productos (La Gráfica)
Actualmente el diseño soporta de manera óptima dos barras (NGR y BLNC). Si en un futuro la fábrica manufactura más productos (ej. 5 o 10 variantes), **la gráfica deberá mostrar todos los productos en formato de barras diminutas** por cada día de la semana siempre que el selector se encuentre en la posición "Todos los Productos". No se obligará al usuario a filtrar obligatoriamente.

### 5.3. Escalamiento Dinámico (Max Production)
**No existirá un límite fijo** ni un objetivo estático de producción (anteriormente seteado en 5,000 para el pre-diseño). La lógica que renderiza las alturas en porcentaje (`%`) deberá iterar previamente la información otorgada por la API para encontrar el "Día con mayor producción total" de la semana. Ese valor máximo será el tope dinámico (100%) para escalar correctamente el resto de las barras y evitar desbordamientos visuales.

### 5.4. Días Sin Producción
Para aquellos días de la semana en los que la API devuelva un valor de `0` (ej. Domingos o días festivos), la gráfica simplemente no dibujará ninguna altura. **La columna del día debe quedar completamente limpia**; no se implementará ningún mensaje de "Cerrado", ni guiones "-", ni alertas visuales complementarias.

## 6. Criterios de Aceptación (Mockup)

1.  [x] El archivo `test/Produccion.html` carga los colores sin depender de configuraciones complejas de Vite en la raíz.
2.  [x] El componente respeta los lineamientos del _Refined Dark Theme_.
3.  [x] La Botella NGR muestra un gradiente Cian (`primary`) y la Botella BLNC un gradiente Verde (`high`).
4.  [x] El selector en Vanilla JS filtra exitosamente la inyección de nodos `div.bar`.
5.  [x] Se documentó la escalabilidad y directrices futuras para la inyección de datos provenientes de la API.

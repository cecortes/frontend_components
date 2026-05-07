# Decisión Arquitectónica: Creación y Desvinculación Estilística del Dashboard de Producción (Mockup)

- **Fecha:** 06 de Mayo de 2026
- **Módulo:** UI Frontend (Pre-diseño / Mockup)
- **Patrones:** Prototipado Aislado, CSS Variables Nativas, Vanilla JS

## Contexto

El sistema WARESmart requirió iniciar el pre-diseño visual de la interfaz del **Control de Producción** de la fábrica. Este esfuerzo inicial debía materializarse como un archivo aislado (`test/Produccion.html`) estrictamente acoplado al "Refined Dark Theme" y a las reglas de no utilizar estilos ajenos a la guía maestra de la aplicación. 

Durante el desarrollo de la interfaz utilizando la asistencia de Google Stitch (que implementó una gráfica de barras de lunes a domingo y tarjetas de totalizadores), surgió un fallo crítico de renderizado: el navegador mostraba la pantalla completamente transparente, ignorando todos los colores. 
El análisis profundo reveló que la hoja de estilos central (`vite-components/src/style.css`) emplea la nueva arquitectura de **Tailwind CSS v4** y su directiva `@theme default { ... }`. Los navegadores no pueden interpretar esta directiva de manera nativa sin un paso de pre-compilación. Al levantar el servidor `vite` desde la raíz del proyecto y no desde la carpeta de componentes, la configuración de Tailwind fue ignorada, enviando al navegador CSS ilegible y destruyendo todas las variables (como `--color-background-primary`).

## Decisión

Se tomaron las siguientes decisiones fundamentales para garantizar la fidelidad estética y funcionalidad del pre-diseño de Producción:

1. **Desvinculación del Servidor de Desarrollo (Pre-compilación Activa)**: En lugar de reconfigurar la raíz del proyecto para forzar la compilación en tiempo de ejecución de Tailwind, se decidió enlazar `Produccion.html` directamente al asset pre-compilado existente (`../vite-components/dist/assets/index-DrR2l9Vp.css`).
   - Esto expone un bloque `:root` puro de variables al navegador.
   - Garantiza portabilidad total del archivo de prueba, permitiendo que corra incluso en un servidor HTTP de Python nativo o abriéndolo directamente desde el explorador de archivos.
2. **Refinamiento de la Identidad Cromática Corporativa**: Atendiendo a una orden directa sobre el esquema de colores, se reemplazó matemáticamente el tono de la "Botella BLNC". Se eliminó el uso de los tokens ámbar (`--color-secondary-400`) para migrar al Soft Green del proyecto (`--color-high-400`). 
   - Para mantener el estándar arquitectónico de iluminación "No-Line", se recalcularon los difuminados en cascada de `box-shadow` y `text-shadow` al `rgba(47, 184, 101, 0.2 / 0.3)`, logrando el resplandor exigido por la guía de diseño.
3. **Motor Matemático en Vanilla JS**: Se optó por construir la interpolación de los porcentajes de altura de la gráfica y la inyección de los sub-nodos del filtro iterativo ("Todos", "NGR", "BLNC") apoyados pura y exclusivamente en JavaScript Vanilla como pre-molde lógico para la futura Controladora MVC.

## Consecuencias

- **Positivas:**
  - El diseño puede ser validado inmediatamente en cualquier entorno sin dependencias activas del framework Node/Vite, acelerando la revisión del layout.
  - La fidelidad a los Design Tokens es del 100%, validando que el *Refined Dark Theme* escala perfectamente para interfaces complejas como gráficas superpuestas.
  - El algoritmo de la gráfica ya contiene la semilla resolutiva para inyectar un porcentaje dinámico y animado basado en los "Días", lo que acortará el tiempo de migración futura.
- **Negativas / Consideraciones para el Equipo de Desarrollo:**
  - **Volatilidad del Hash CSS:** Al depender temporalmente del archivo de la carpeta `dist/assets/index-DrR2l9Vp.css`, cualquier re-construcción (`npm run build`) en la carpeta `vite-components` generará un hash diferente, lo que corrompería temporalmente el enlace de estilos del archivo HTML hasta que se actualice manualmente su etiqueta `<link>`.
  - **Refactorización Pendiente:** El código de estilos en bloque `<style>` y todo el motor de JavaScript interno al final del `<head>` / `<body>` es estricto a su naturaleza de prototipo, por ende deberá ser completamente reescrito, desglosado y re-inyectado en el estándar de Clases de Componente cuando la Vista y el Controlador `Produccion` se incorporen oficialmente a la arquitectura MVC de WARESmart.

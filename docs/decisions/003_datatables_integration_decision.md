# Decisión Arquitectónica: Integración de DataTables en Tablas de Gestión

- **Fecha:** 18 de Marzo de 2026
- **Módulo:** UI Frontend (Componente Tabla Usuarios)
- **Patrones/Técnicas:** DataTables, Modulación ESM, DOM Lifecycle Polling, Event Delegation, CSS Selector Override

## Contexto

El sistema WARESmart cuenta con una visión generalista y directiva a ser administrado principalmente mediante métricas y tabulaciones (Gestión de Listas de Clientes, Inventarios, Órdenes y Usuarios). El prototipo inicial pre-dibujaba las estructuras a manera "Static-HTML interpolado manual" iterando iterativamente código nativo a strings.

Aunque este esquema operaba eficazmente permitiendo previsualizar el dashboard base, carecía de interacción crítica y escalable para una SPA real. Ingestar listados nutridos demanda mecánicas visuales pesadas tales como filtros globales dinámicos, segmentación en páginas controladas (_Paginación_) para evitar latencias de navegador, y la manipulación ordenada de columnas mediante click al alza/baja.

Establecer algoritmos y re-renders puros en JavaScript Vanilla desde cero para estas tres particularidades suponía un innecesario rediseño abismal que consumiría una fracción indeseada del foco de la lógica de negocio, violando el principio y escalabilidad frente al mercado libre.

## Decisión

Se optó resueltamente por la adopción de la biblioteca gráfica madura y robusta open-source **`datatables.js`** en su variante moderna modular ESM, para regir y simplificar la injerencia e inmersión sobre el universo del DOM de las entidades tabulares.

La implementación oficial piloto fue instaurada mediante la transformación orgánica sobre el componente `TablaUsuarios`.

1. **Adopción de Librería Integrada Frontend**: Toda recarga sobre la base algorítmica para filtros, páginas de 10 a 50 registros, layout dinámico interactivo, y reacomodo general quedó provisto bajo la sintaxis y métodos naturales contenidos en el esqueleto base `View` dentro del módulo.
2. **Postergación y Monitoreo del Ciclo de Vida**: Bajo mandatos firmes dictaminados en el Controlador para no colisionar en los tiempos atómicos del pintado HTML por parte de Vite; la matriz cambió desde un "Render total en la llamada temprana `Init()`", hacia una mecánica "Pintado Cascarón en el momento y Poblamiento reactivo tras _Polling Seguro_ del DOM en `bindEvents()`". Resolviendo un _crasheo_ donde DataTables necesita obligatoriamente objetos físicos reales alojados en el `document`.
3. **Restructuración Minimalista en Estilos y Mutación Reactiva**: Evitando recurrir a los engorrosos paneles Bootstrap u oponentes gigantescos nativos para la apariencia de DataTables que desfigurarían la temática del proyecto _WARESmart Dark Theme_; se manipuló a las capas inferiores el callback maestro de inicialización localizando virtualmente elementos HTML generados por el motor DataTable, arrebatándolos y dotándoles las clases formales de nuestro entorno como el envolvente `.input-wrapper` lo cual preserva los diseños institucionales ante el futuro en modo de herencia pura de la misma forma que inyectando jerarquía `!important` a una clase neutra desde la hoja global de estilos.

## Consecuencias

- **Positivas:**
  - **Experiencia de Usuario (UX) Intuitiva**: Manipulación de datos masiva inmediata sin latencia backend (buscadores fluidos y filtros combinados auto administrables).
  - **Progresión de Rendimiento Integral**: La documentación generada como herencia a lo que fue la _skill_ elaborada permitirá re-equipar visualmente a futuro todas o cualquier otra tabla estática o semi-estática por parte de ingeniería a una quinta parte del tiempo de concepción inicial de ideas algorítmicas propias nativas.
  - **Identidad Resiliente**: Conservando íntegra la herencia en el CSS de directivas matrices, la caja de búsqueda adaptada repelerá alteraciones locales o inconsistencias al permanecer alineada sin generar nueva hoja de estilos duplicadora.

- **Negativas / Consideraciones Adicionales:**
  - **Aclaración y Asincronización Compleja:** El `Controller` ahora conlleva noción obligatoria de eventos y promesas de monitorización latente (_JS setInterval/clear_), precisando el uso de `Event Delegation`, agregando un escalafón moderado en la madurez esperada de compresión y de depuración para desarrolladores base.
  - **Gestión Cuidadosa de Bibliotecas (`Vendor lock-in` menor)**: La plataforma integra su dependencia primaria externa visual post-integración y las posibles transiciones desde la versión _2.1x_ de _DataTables_ exigirán verificaciones exclusivas sobre el renombre del preprocesado como la clase original nativa `.dt-search`.

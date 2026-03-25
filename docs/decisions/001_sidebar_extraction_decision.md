# Decisión Arquitectónica: Extracción del Componente Sidebar e Inyección de Dependencias

- **Fecha:** 16 de Marzo de 2026
- **Módulo:** UI Frontend (Componentes de Navegación)
- **Patrones:** MVC, Factory, DI (Dependency Injection)

## Contexto

El diseño base original del `Dashboard` incorporaba transversalmente un panel de navegación integral (Sidebar) compuesto por ítems para navegar entre diferentes vistas del sistema de Inventariado y Órdenes. Toda la topología, interactividad orientada a CSS responsivo y lógica semántica del DOM del respectivo menú se encontraba fuertemente entrelazada a lo largo de `dashView.js` y `dashController.js`.
Este acoplamiento bloqueaba la capacidad de escalar la aplicación porque instanciar el componente para vistas separadas e indispensables (como `Users`, `Products` o `Orders`) forzaba la re-copia sistemática del código estático del layout o la imposibilidad metodológica de modular la vista.

## Decisión

Se decidió **extraer por completo la barra de navegación** desde el `Dashboard` y transformarla en su propia entidad modular con rango de primer nivel (`Sidebar`), acatando obligatoriamente el estándar Módulo de Fabrica y los principios de Arquitectura MVC e Inyección de Dependencias del proyecto **WARESmart**.

1. **Estructura MVC Independiente**: El módulo `Sidebar` implementa un flujo purista encapsulado mediante sus sub-directorios: `controller`, `view` e `icons`. Se volvió totalmente agnóstico al componente que lo aloje.
2. **Método Dividido de Renderizado Múltiple**: Para dar cumplimiento íntegro a los lineamientos estéticos (el CSS _checkbox hack_ del menú, el overlay, etc.), la vista base inyectora forzaba al menú a operar en dos capas jerárquicas contrapuestas:
   - Una etiqueta `<label>` usada como disparador (_burger button_) de tipo Toggle ubicada físicamente en el `<header>` de la app.
   - El contenedor visual asíncrono primario `<aside>` y su control directo, operando paralelamente en la base de la vista.
     Para solventar este reto nativo sin alterar el CSS base, la vista `sidebarView.js` fue implementada para devolver ambos bloques de HTML bajo demanda por canales distintos que logran ser inyectados simultáneamente en el render principal.
3. **Inyección de Dependencias Pura (Patrón Factory)**: Se evitó deliberadamente la instanciación acoplada o "hardcoding" (`new SidebarController()`) dentro de la lógica del `DashboardController`.
   En su defecto, se construyó el archivo envoltura `src/factory/sidebar_factory.js`. La fábrica jerárquica padre, `dash_factory.js`, fue refactorizada para delegar a la de Sidebar la construcción del objeto subyacente y posteriormente **engancharlo inyectado** explícitamente dentro del constructor.

## Consecuencias

- **Positivas:**
  - La barra de navegación es finalmente global, escalable (`plug-and-play`) y consistente.
  - La reducción de peso en los archivos de la vista principal del Dashboard (`dashView.js`) facilita su entendimiento orgánico.
  - El cumplimiento del principio DRY (Don't Repeat Yourself) previene bugs futuros por desfase de versiones de estilos.
- **Negativas / Consideraciones para el Equipo de Desarrollo:**
  - Las nuevas fábricas (_Factories_) o vistas que abarquen secciones del administrador general de _WARESmart_ y necesiten renderizar esta interfaz, deberán recordar incorporar forzosamente a la fábrica `sidebar_factory.js` para proveer sus dependencias (instanciador, vista e íconos) desde el nivel más alto del ensamblaje.

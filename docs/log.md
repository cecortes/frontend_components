# Code Log

---

## 16-05-26 - Integración de Datos Reales en Producción y Refactorización de Seguridad

- [x] Implementación completa del flujo de datos reales para Totales de Producción y optimización de la gestión de sesiones.
  - [x] Configuración de inyección de dependencias (`SessionStorage`, `ModalError`) en el Factory de Producción.
  - [x] Desarrollo del método `fetchTotalesByPeriod` en el Modelo para consumo de API con token JWT.
  - [x] Implementación de lógica de cálculo de rangos de fecha y procesamiento de totales (multiplicación x40) en el Controlador.
  - [x] Refactorización de la gestión de errores para diferenciar fallos de red de errores de autenticación mediante `isAuthError`.
  - [x] Implementación de redirección selectiva al LoginForm únicamente ante la expiración o invalidez del token.
  - [x] Estandarización de endpoints en el Modelo utilizando variables de entorno y actualización de `.env` y `.env.template`.

---

## 18-05-26 - Implementación de Datos Reales en Gráfica de Producción

- [x] Integración de endpoint `/produccion/get/byPeriodProduct` en el componente ProduccionGrafica.
  - [x] Inyección de dependencias (`storage` y `modalErrorController`) en el Factory.
  - [x] Implementación de la lógica de red y agrupación temporal de los datos devueltos en el Modelo.
  - [x] Adaptación del componente para calcular correctamente los totales y agrupar datos según el rango (Semanal, Mensual, Anual).
  - [x] Actualización del Controlador para el manejo de los filtros locales en memoria evitando peticiones de red redundantes.

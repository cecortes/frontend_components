---
name: backend_add_entity_integration
description: Guía estricta y paso a paso para crear o modificar modales y componentes destinados a agregar nuevas entidades (Clientes, Productos, Proveedores, etc.) que interactúan directamente con el backend, documentando errores históricos de arquitectura MVC.
---

# Skill: Integración Backend-Frontend (Agregar Entidad)

Esta **SKILL** **DEBE** ser utilizada de manera estricta y obligatoria siempre que se solicite integrar o crear la lógica para agregar una nueva entidad (como un nuevo Cliente, Producto, Proveedor, etc.) enviando datos desde un modal del frontend hacia el backend.

Esta guía recopila errores históricos críticos que corrompieron el enrutamiento, la autenticación, y los datos en la base de datos durante la creación del flujo "Agregar Cliente".

## Pre-requisitos Imperativos (Fase de Análisis)

Antes de generar o modificar una sola línea de código, **TIENES QUE DETENERTE** y realizar un análisis del backend:

1. **Analizar el proyecto Backend (`/backend`):** Debes inspeccionar los controladores y rutas (ej. `backend/controllers/clients/controller.js`) para determinar:
   - **Endpoint exacto:** ¿Cuál es la ruta completa?
   - **Verbo HTTP:** ¿Es un `POST`, `PUT`, `GET`?
   - **Autenticación:** ¿Requiere `Bearer Token` u otro formato de autorización?
   - **Esquema del Body:** ¿Qué variables exactas (`name`, `mail`, `phone`) espera el `req.body`?
   - **Esquema de la Base de Datos (Opcional pero recomendado):** Revisa el tipo de dato en la base de datos (Ej. `VARCHAR` vs `INT`).
2. **Preguntar en caso de duda:** Si el endpoint no existe o no tienes certidumbre sobre cómo formatea los datos el backend, **DETENTE** y consúltalo con el usuario.

---

## Flujo de Implementación y Lecciones Aprendidas

### Paso 1: Configurar Variables de Entorno

Debes añadir la nueva variable para el endpoint que vas a utilizar:

- **`vite-components/.env`**: Define el valor (ej. `VITE_API_CLIENTS_NEW = "http://localhost:3000/api/waresmart/clients/new"`).
- **`vite-components/.env.template`**: Agrega la definición descriptiva manteniendo el estilo consistente y sin valores sensibles.

### Paso 2: El Factory y la Autenticación (Prevención de Error 401)

El modelo asíncrono necesita interactuar con la sesión para extraer el Token. Un error histórico causó llamadas `401 (Unauthorized)` porque la clase `SessionStorage` fue instanciada pero nunca cargada en memoria dentro de las dependencias inyectadas.

**En el Factory (`*_factory.js`)**:

```javascript
import { SessionStorage } from "../components/Storage/storage.js";

// INSTANCIACIÓN CORRECTA:
const storage = new SessionStorage();
storage.loadSessionStorage(); // CRÍTICO: Esto carga los datos del navegador a la instancia.

const model = new ModalAgregarEntityModel(storage); // Inyección por dependencia.
```

### Paso 3: El Modelo (Manejo de Datos y Prevención de Desbordamiento)

El modelo formatea los datos extraídos de la vista (Controller) hacia el objeto que espera el Backend.

**Lección Aprendida (Integer Overflow en MySQL):**
Históricamente, enviar números de teléfono a 10 dígitos (ej. `5551234567`) hacia un backend donde la base de datos estaba configurada como `INT(10)` provocó un Desbordamiento de Enteros, haciendo que MySQL truncara el valor al máximo posible (`2147483647`). Esto causaba que la tabla mostrara números "totalmente distintos" y detonara errores en los validadores nativos de UI en ediciones subsecuentes.

**Solución Estándar:**

- Asegurar (mediante análisis o sugiriendo migraciones) que columnas como `phone` o claves numéricas largas sean tratadas en el Backend como `VARCHAR(20)`.
- Si el campo en Backend es estricto, el Modelo Frontend debe encargarse de la sanitización previa al `fetch`:

```javascript
const body = {
  // Si la DB lo exige numérico sin espacios:
  phone: updateData.telefono ? updateData.telefono.replace(/\D/g, "") : "",
};
```

- Realizar la petición enviando el `Bearer Token`:

```javascript
const response = await fetch(import.meta.env.VITE_API_ENTITY_NEW, {
  method: "POST", // O el verbo analizado
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.storage.Token}`,
  },
  body: JSON.stringify(body),
});
```

### Paso 4: El Controlador y la Redirección Asíncrona (Prevención de Errores Críticos)

Al igual que en otras entidades, los errores de autenticación (ej. sesión vencida) deben expulsar al usuario.

- En `ModalAgregarEntityController.js`, captura el error HTTP.
- Si detectas que se trata de un `401 Unauthorized` o `403 Forbidden` disparado por el Modelo, invoca una expulsión directa al Login: `window.location.hash = "/";`. No intentes mostrar errores locales que se crucen con el flujo de expulsión.

### Paso 5: Refresco de la Interfaz y el "Closure Trap" (Prevención de Fallos en Edición)

Una vez que se agrega con éxito una entidad, la Tabla que la enlista debe recargarse.

**Regla Mandatoria: NUNCA crees métodos redundantes (como `reloadTable()`).** Reutiliza la lógica estructural `fetchData()` seguida de `initDataTable()` sobre el controlador padre.

**Lección Aprendida (Closure Scope & Pérdida de Listeners):**
Históricamente, al utilizar variables aisladas o letales dentro de `bindEvents()` del controlador de tabla (`let tableData = ...`), la recarga invocada desde el callback anónimo del Modal "Agregar" pisaba la variable local pero desfasaba a los detectores de eventos (`addEventListener("click")`). Como resultado, los botones de "Editar" dejaban de abrir su modal para la misma entidad recién creada o modificada.

**Solución Estándar (Variables de Instancia):**
Siempre usa variables de clase (propiedades de instancia) para la data viva de una tabla.

```javascript
// EN EL TABLA_CONTROLLER (Forma Correcta)
this.tableData = await this.model.fetchData();
this.view.initDataTable(this.tableData);

// AL INTERCEPTAR EL CALLBACK DEL MODAL (Forma Correcta)
this.modalAgregarController.showModal(async (newData) => {
    try {
        // Se muta la propiedad global de la instancia, no un 'let' cerrado
        this.tableData = await this.model.fetchData();
        this.view.initDataTable(this.tableData);
    } catch (err) { ... }
});
```

---

## Revisión Final (Auto-Check)

Antes de dar por concluida la implementación de la función "Agregar", contesta a ti mismo:

- [ ] ¿Analicé profundamente los esquemas del endpoint en el directorio `backend/` antes de escribir el fetch?
- [ ] ¿Añadí `storage.loadSessionStorage()` en el Factory antes de inyectarlo?
- [ ] ¿Mantuve la arquitectura intacta reutilizando el `this.tableData` para la recarga en lugar de crear un método nuevo como `reloadTable`?
- [ ] ¿Me aseguré de que los datos enviados en el Body (ej. Teléfonos, RFCs) son compatibles y no causarán "Integer Overflows" o rechazos de esquema en el backend?

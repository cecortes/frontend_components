---
name: backend_table_integration
description: Guía exhaustiva y paso a paso para crear o modificar un componente MVC para consumir datos del backend y mostrarlos en una tabla, manejando autenticación con SessionStorage y mapeo de datos.
---

# Skill: Integración Backend-Frontend para Tablas

Esta **SKILL** **DEBE** ser utilizada de manera estricta y obligatoria siempre que se solicite crear o modificar un componente del lado frontend que necesite solicitar datos al backend para desplegarlos en formato de **tabla**. Cumple una arquitectura MVC e integra correctas políticas de variables de entorno y sesión.

## Pre-requisitos Imperativos (¡Atención IA y Programador!)

Antes de escribir código o generar un plan de implementación, debes garantizar los siguientes pasos:

1. **Preguntar el Endpoint:** SIEMPRE DEBES detenerte y preguntar al programador/usuario la **dirección y ruta completa** del endpoint que se va a integrar. No asumas URLs a menos que te las hayan dado explícitamente.
2. **Analizar el backend (`/backend`):** SIEMPRE DEBES analizar los archivos de la carpeta respectiva de backend para entender a la perfección:
   - Los endpoints requeridos.
   - Qué cabeceras o cuerpo (body) requiere la petición (ej. tokens de autenticación).
   - Qué estructura tiene la respuesta JSON y qué datos devuelve.
   - Qué códigos HTTP devuelve en caso de error y qué forma tiene ese objeto de error.
3. **Analizar `.env.template`:** Antes de crear variables de entorno, lee la plantilla para acoplarte al estilo (usualmente formato `CLAVE = Descripción`).
4. **No alterar lo existente:** NO DEBES alterar ni modificar ninguna otra funcionalidad no solicitada (las columnas de vista o el diseño no deben ser truncados por el formato del backend).

---

## Flujo de Trabajo y Modificaciones (Paso a Paso)

Una vez obtenida la información (Endpoint, backend revisado, etc.), sigue meticulosamente estos pasos de implementación.

### Paso 1: Configurar Variables de Entorno

Debes guardar la URL del endpoint centralizada en variables de entorno autodescriptivas.

- **En `vite-components/.env.template`**: Agrega la definición descriptiva de la variable manteniendo el estilo.
  _Ejemplo:_ `VITE_API_CLIENTS_ALL = URL para obtener todos los clientes de la API`
- **En `vite-components/.env`**: Define el valor de la dirección.
  _Ejemplo:_ `VITE_API_CLIENTS_ALL = "http://localhost:3000/api/waresmart/clients/get/all"`

### Paso 2: Inyectar Dependencias de Autenticación (Factoría)

El token de autorización **NUNCA** debe leerse invocando `localStorage.getItem("token")` directamente. La aplicación cuenta con una clase "Single Source of Truth" llamada `SessionStorage` en `vite-components/src/components/Storage/storage.js`.

**En el Factory (`*_factory.js`)**:

1. Importa la clase `SessionStorage`.
2. Instancia la clase: `const storage = new SessionStorage();`
3. Carga la memoria viva del navegador: `storage.loadSessionStorage();`
4. Inyecta `storage` al instanciar el modelo: `new TablaModelo(storage);`

### Paso 3: Petición HTTP Analítica y Mapeo en el Modelo

El Componente del Modelo es el encargado de interactuar con el endpoint. NO DEBE regresar datos "crudos" si estos alteran las llaves esperadas por la Vista.

**En el Modelo (`*Model.js`)**:

1. **Constructor:** Modifica el constructor para inicializar `this.storage = storage`.
2. **Variable Endpoint:** Declara la url consumiendo la variable de entorno: `const url = import.meta.env.VITE_NOMBRE_VARIABLE`.
3. **Obtener el token:** Consume el token desde el getter encapsulado: `const token = this.storage.Token`.
4. **Fetch:** Haz la solicitud `fetch` usando el método dictado por el backend, adjuntando la cabecera `Authorization: Bearer ${token}`.
5. **Manejo de Errores Backend:** Valida respuesta. Si `!response.ok` o el json de éxito es falso, **arroja** (`throw`) un objeto `Error` formulado con el Código de Estado HTTP y el mensaje devuelto por el servidor (con base a tu análisis previo).
6. **Mapeo:** Devuelve un arreglo de objetos realizando una **traducción o mapeo** desde la estructura original de variables del backend (ej. `user_id`) hacia los keys exactos que espera la vista frontend (ej. `id`), de modo que la vista no se quebre.

### Paso 4: Capturar Errores en el Controlador

**En el Controlador (`*Controller.js`)**:

- En la función que detona la carga de los datos (`bindEvents()` u otra), el llamado a `this.model.fetchData()` debe estar envuelto en un `try...catch`.
- **En el `catch (error)`**: Inmortaliza el error HTTP arrojado previamente por el modelo. Imprímelo de manera explícita en consola con `console.error()`, informando plenamente del error del backend (ej. `[TablaController] Error HTTP 500: Server disconnected`).

### Post-implementación

Incentiva la validación del código a nivel cliente de manera integral garantizando que la inserción de registros remotos no desacomoda las columnas ni los botones de acciones de la vista estática o de librerías como DataTables.

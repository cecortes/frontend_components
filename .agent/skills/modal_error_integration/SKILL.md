---
name: Integración de ModalError (MVC & Factory)
description: Guía obligatoria y paso a paso para implementar el componente de manejo de errores global (ModalError) dentro de cualquier otro componente tipo Modal en el proyecto.
---

# Guía para la Integración de ModalError en Modales

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta Skill dicta el procedimiento estricto que la IA debe seguir cuando se le pida implementar, usar o desplegar el manejador de errores estandarizado del proyecto (`ModalError`) dentro del flujo de trabajo de algún otro Modal (ej. Editar Usuario, Borrar Usuario, etc.).

## 1. REQUISITO BLOQUEANTE: Identificación del Componente

Antes de lanzar comandos, modificar código o proponer soluciones técnicas, **TIENES QUE DETENERTE Y PREGUNTAR AL USUARIO:**

> "¿En qué componente de tipo Modal deseas implementar el ModalError?"

**REGLA CRÍTICA:** Si el usuario no te ha dado una respuesta explícita o su respuesta es ambigua, DEBES seguir preguntando. **Está estrictamente prohibido continuar** a las fases de análisis o código sin haber definido claramente cuál será el componente objetivo.

## 2. Fase de Análisis Obligatoria

Una vez el usuario identifique el componente objetivo, lleva a cabo un paso a paso explícito en tu cadena de análisis que incluya:

- [ ] 1. **Analizar el proyecto y documentos:** Repasar `docs/logica_de_negocio.md` y `docs/architecture.md` para entender cómo se aplica el "Manejo de Errores Uniforme" y el enfoque "Custom MVC + SPA" del proyecto.
- [ ] 2. **Analizar Lógica de Negocio y Arquitectura:** Comprender que el desacople requiere Inyección de Dependencias a través de los archivos Factory, prohibiendo inicializar (`new Model()`) o usar importaciones globales en los Controladores para gestionar ventanas emergentes.
- [ ] 3. **Analizar el Componente a Modificar:** Localizar con precisión su Controlador (`*Controller.js`) y su Factory (`*Factory.js`). Evaluar dónde ocurre la acción transaccional o el `try/catch` que requiere interceptar el error.

## 3. Implementación (Inyección por Factory)

Sigue estas modificaciones en base al contexto histórico y los lineamientos de arquitectura del front-end:

### A. Modificar el Ensamblador General (`dash_factory.js` u otro orquestador)

Ubica en el Factory principal el momento o punto donde se extrae el controlador de errores usando `ModalFactory.modalComponent()`.
Inyecta ese controlador (`modalErrorController`) como argumento en el momento en que se instancia el componente del cual se originará el posible fallo:

```javascript
const { element: modalTargetElement, controller: modalTargetController } =
  ModalTargetFactory.createModal(modalErrorController);
```

### B. Modificar el Factory del Componente `createModal()`

Actualiza la firma estática en el Factory del componente objetivo para recibir la instancia del controlador de errores, y posteriormente inyéctalo en la creación de su Componente interno Controlador:

```javascript
static createModal(modalErrorController) {
    // ...
    const view = new ModalTargetView(icons);
    const model = new ModalTargetModel(storage);
    const controller = new ModalTargetController(view, model, ..., modalErrorController);
    // ...
}
```

### C. Modificar el Controlador del Componente

Adáptalo en su constructor e invócalo garantizando mantener la vista limpia al sustituir el modal actual con la advertencia:

```javascript
// 1. En el constructor
constructor(view, model, ..., modalErrorController) {
    // ...
    this.modalErrorController = modalErrorController;
}

// 2. En el try/catch que engloba la petición (onSubmit)
try {
    // ... Petición de manipulación remota
} catch (error) {
    this.handleClose(); // Esencial: Cierra el modal de origen para generar una visión limpia en pantalla.
    this.modalErrorController.showError(error.message || "Error genérico del sistema");
}
```

## 4. Fase de Comprobación y Verificación de Testing

Al finalizar la inyección del código propón o instruye al usuario a validar la implementación usando las siguientes directrices de revisión manual:

1. **Simulación de Falla:** Sugiere al usuario navegar a la interfaz, abrir el modal modificado e intentar una operación induciendo mecánicamente un error de protocolo (utilizando el modo "Offline" de Network en Chrome DevTools).
2. **Cierre Automático:** Comprobar que al lanzar la acción de error, el modal original se cierra instantáneamente sin superposición en el navegador.
3. **Visibilidad de Respuesta de Error:** Confirmar que solo el componente `ModalError` pasa a la vista del usuario con el reporte extraído de la excepción que mandó el Catcher.
4. **Verificación Estrecha de Inyección:** Inspeccionar si accidentalmente el Controller del modal referenciado crea alguna clase explícitamente y rectificar inmediatamente en caso que su uso no transite vía inyección desde Factory.

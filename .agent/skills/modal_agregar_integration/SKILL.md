---
name: Integración de ModalAgregar (MVC & Factory)
description: Guía crítica y obligatoria para crear, estilizar e integrar nuevas vistas modales destinadas a crear/agregar entidades (ej. Usuarios, Clientes), enlazando correctamente el flujo lógico y visual.
---

# Skill: Integración de Modales de Creación (Agregar Entidad)

**ESTADO: CRÍTICO Y OBLIGATORIO**

Esta _skill_ define el comportamiento obligatorio que la IA debe adoptar cuando el usuario solicita diseñar, crear o modificar un componente de tipo Modal destinado a agregar nuevas entidades (Ej. `ModalAgregarUsuario`, `ModalAgregarCliente`).
Esta guía fue extraída tras fallas del sistema identificadas en el uso ambiguo de CSS en línea y la desconexión del componente padre en los flujos principales del proyecto WARESmart.

## 1. Fase de Preparación (Reconocimiento Padre)

Antes de generar código y crear la triada MVC del nuevo modal, debes indagar y confirmar el contexto de dónde va a vivir (ej. sobre la vista `Usuarios`).

**REGLA CRÍTICA:** Nunca inicies la programación ni emitas respuestas sin haber localizado o comprobado si existe la **Vista Padre** y el **Controlador Padre** donde este Modal va a operar y se va a anclar.

## 2. Paso 1: El Anclaje al DOM (The DOM Hook)

Una falla recurrente histórica y arquitectónica fue crear un componente de modal ciego y nunca inyectarlo. Tras crear tus archivos MVC básicos, debes de inmediato interceptar al Componente Principal Orchestrador (ej. `Usuarios` o `Dashboard`):

1. **Creación y Extracción (Local Factory):** En el main Factory (`dash_factory.js` o `usuarios_factory.js`), importa tu nuevo generador (Ej. `ModalAgregarClienteFactory`).
2. **Inyección de Dependencias Rezagadas:** Pásale los mismos controladores base `.createModal(modalOk, modalError)` que se exigen para retroalimentación en tu proyecto WARESmart y recoge el nuevo objeto `$Controller` interno extraído por destructuring desde el `return`.
3. **Inyección Inversa (El Hook):** Toma ese objeto `modalAddController` y pásalo transaccionalmente por argumentos (Inyección de dependencias controlada) hacia dentro del generador de tu Vista Principal (`new UsuariosController(..., modalAddController)`).
4. **Disparador Estático en Vista Principal:** Localiza la vista primaria o \`\*View.js\` Principal y agrega físicamente el prototipo HTML del botón (`<button class="btn btn-primary" id="btnShowAdd[Entity]">`). En el bucle de `init()` o `bindEvents()` de tu Controlador Principal, escúchalo e invoca la inicialización delegada de esta forma: `modalAddController.start()`.

## 3. Paso 2: Clonación del "Steel Ledger Style"

Está estrictamente prohibido divagar, inventar contenedores ambiguos (como usar `class="card"` aislada) para modales de autoridad total o pantalla completa.

- Obligatorio el uso de un contenedor superior maestro **`<div class="modal-overlay">`**. Esta clase en `style.css` garantiza desenfoque en `backdrop-filter: blur(4px)`, emparejamiento flex total, superposición en la pantalla y visibilidad fluida mediante la opacidad.
- Obligatorio el sub-uso del contenedor tarjeta estricto para diálogos **`<div class="modal-card">`**.
- **Sobreescritura de Bordes Contextual:** Todos los "Error" traen rojo, todas las agregaciones traen cyan/primary. Para el modal de añadir, utiliza la directriz inyectando contextualmente el atributo: `style="border-top: 3px solid var(--color-primary-500);"`.

## 4. Paso 3: Escalado UI Consistente (Desincentivar el Inline Styling)

Si al momento de designar colores de botón requieres invocar o alterar la paleta interactiva de las variables primarias del proyecto (como `--color-success-500`, `--color-high-500`), es altamente propable que el botón no posea una clase maestra compilable construida estáticamente (como la clase `.btn-success`).

**REGLA ANTI-PARCHE:** Te está terminantemente PROHIBIDO colorear iterativamente interacciones UI profundas (Backgrounds y sombras _hover_) en el HTML vía `style=" background-color: var(...)"` dentro de los botones `.btn` para tratar de aparentar en diseño. Debes concurrir de inmediato al documento `/vite-components/src/style.css` y generar permanentemente el bloque estructural y global faltante de botón (ej. declarando `.btn-[entidad] { ... }` ; `.btn-[entidad]:hover { ... }`) usando las variables reales y persistidas de la base. Tras declararlo en CSS, asimílalo referenciándolo limpia y convencionalmente al esquema de clases en el DOM.

## 5. Prevención Integrada de Conflicto de Validadores (Regla Base Común)

Este modal de llenado de Add Entity adhiere a la obligación principal instruida también para otros subcomponentes y referenciada en `validator_integration/SKILL.md`:

- Protege visualmente los Inputs encapsulándolos mediante su correspondiente padre contenedor `.input-wrapper`.
- Desmantela toda existencia natural de etiquetas nativas HTML5 como validadores (`<input required>`, `pattern=...`). El HTML y el navegador no son las fuentes de validación en modales asíncronos ocultos; si se requiere restringir a formato, remueve sintagmas predefinidos (`type="email"`) sustituyéndolos por genéricos (`type="text"`) para dar libre pase al sistema central asíncrono JS y FieldsValidator.
- En éxito puro post-petición (`try { ... }`), acata el ocultamiento y desmontado orgánico del bloque local actual `this.handleClose()` o `this.hide()` garantizado como suceso percutor previo a despertar con fluidez la orden positiva universal de `this.modalOkController.showOk();`.

---

**Paso de Autoevaluación Final al implementar esta guía:**

- [ ] ¿El nuevo Modal fue anclado asíncronamente desde el Factory Superior hacia un controlador con acceso al DOM explícito (Botón Disparador físico existiendo)?
- [ ] ¿El modal descansa estructuradamente bajo el patrón central `.modal-overlay / .modal-card` con anulación correcta de colorizaciones de cabecera pre-incluidas?
- [ ] ¿Verifiqué y extendí coherentemente `style.css` generando los constructos iterativos requeridos en lugar de rebanar estilizaciones inline profundas?
- [ ] ¿Cambié mis tipos de input HTML estrictos por primitivos para desarmar el dictado nativo HTML5?

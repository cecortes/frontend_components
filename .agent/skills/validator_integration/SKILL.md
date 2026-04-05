---
name: "Integración de Validator (MVC & Factory)"
description: "Guía paso a paso para integrar validaciones personalizadas en inputs UI utilizando FieldsValidator, resolviendo conflictos nativos y manteniendo los patrones de inyección de dependencias."
---

# Skill: Integración de Validator en Componentes UI

Esta _skill_ define el estándar arquitectónico que debes seguir rigurosamente al implementar validadores de campos (`FieldsValidator`) en formularios, modales o inputs dentro de la aplicación WARESmart.

## 1. Comprendiendo el Paradigma (Por qué)

El sistema utiliza validaciones asíncronas visuales basadas en tooltips o "pops". Para que estos tooltips se rendericen consistente y correctamente sobre cada campo (ya sea durante el evento `blur` o al hacer `submit`), necesitamos tener **control absoluto** sobre los eventos de Javascript.
Si permitimos que el navegador HTML5 tome el control con sus validaciones nativas obstructivas (como el formateo estricto del correo electrónico en `<input type="email">`), el evento `submit` jamás llegará al Controlador y nuestra lógica visual fallará. Además, mantener un Desacoplamiento de Código estricto (MVC & Factory) garantiza que las clases utilitarias como `FieldsValidator` no creen mallas de dependencias en los Controladores.

## 2. Instrucciones para la Vista (View)

La Vista encapsula la representación y los contenedores de los tooltips de error, pero **no** ejecuta la lógica de validación.

### 2.1 Envoltura en `input-wrapper`

Para que los tooltips floten y se anclen bajo el input correcto, cada campo debe estar envuelto dentro de un `<div class="input-wrapper">` e incluir un elemento `.validation-tooltip` que enlace al ID correspondiente.

```html
<div class="input-group">
  <label for="editMail">Correo Electrónico</label>
  <div class="input-wrapper" style="position: relative;">
    <!-- ¡IMPORTANTE! Usar type="text" -->
    <input
      type="text"
      id="editMail"
      class="input-field"
      placeholder="ejemplo@correo.com"
      required
    />
    <div
      class="validation-tooltip"
      id="editMailError"
      role="alert"
      aria-live="polite"
    ></div>
  </div>
</div>
```

### 2.2 Manejo de Tipos Nativos (Crucial)

**NUNCA debes usar `type="email"` o tipos restrictivos nativos si deseas disparar "pops" de error personalizados al hacer Submit.**

- Si usas `type="email"`, el navegador asume el monopolio del error, mostrando la burbuja estándar nativa y bloqueando el evento JS `submit`.
- Al usar `type="text"`, te aseguras de que el navegador sólo valide la presencia del campo (por el atributo `required`), dejando el formato a completa disposición de `FieldsValidator`.

### 2.3 Referencias y Métodos Visuales

Debes capturar las referencias a los tooltips en tu listado de Elementos del DOM y añadir los métodos orquestadores de la clase `input-error`:

```javascript
// Obtención en getter ModalElements o FormElements
$mailError: this.element.querySelector("#editMailError")

// Métodos Obligatorios en la Vista
showValidationError(inputElement, errorElement, message) {
  inputElement.classList.add("input-error");
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

hideValidationError(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}
```

## 3. Instrucciones para el Controlador (Controller)

El Controlador es el punto de ensamble donde los eventos disparan la evaluación, sin embargo, **no debe conocer de dónde viene el Validator**, solo debe recibirlo.

### 3.1 Inyección Pura en el Constructor

El controlador _DEBE_ recibir la clase validador por su constructor de forma explícita:

```javascript
export class MiComponenteController {
  constructor(view, model, validator) {
    this.view = view;
    this.model = model;
    this.validator = validator; // Inyectado
  }
}
```

### 3.2 Integración de Eventos (`blur` y `submit`)

Se debe llamar a un método auxiliar `validationPopUp()` para manejar los tooltips sin repetir código. Primero evaluar cada campo en el evento `blur`, y forzosamente evaluarlos durante el `submit` para interceptar y bloquear la acción.

```javascript
bindEvents() {
  const { $inputMail, $mailError, $form } = this.view.Elements;

  // Validación al salir del campo (blur)
  $inputMail.addEventListener("blur", () => {
    const validation = this.validator.validateField($inputMail);
    this.validationPopUp(validation, $inputMail, $mailError);
  });

  // Intercepción del formulario (submit)
  $form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const validationMail = this.validator.validateField($inputMail);
    const isMailValid = this.validationPopUp(validationMail, $inputMail, $mailError);

    // Bloqueo estricto
    if (!isMailValid) return;

    // Aquí procedes con éxito hacia this.model.save() u otros flujos
  });
}

// Helper obligatorio
validationPopUp(validatorObject, inputElement, errElement) {
  if (!validatorObject.isValid) {
    this.view.showValidationError(inputElement, errElement, validatorObject.message);
    return false;
  } else {
    this.view.hideValidationError(inputElement, errElement);
    return true;
  }
}
```

## 4. Instanciación Segura (Patrón Factory)

**REGLA DE ACERO:** **No está permitido** hacer importaciones de `FieldsValidator` fuera de un archivo _Factory_. Los Controladores no deben instanciar jamás dependencias externas, ya que rompe la inyección de dependencias modular.

El ensamblaje debe realizarse exactamente en `_factory.js`:

```javascript
// Correcto: Importación en el archivo Factory
import { MiComponenteView } from "./view/miComponenteView.js";
import { MiComponenteModel } from "./model/miComponenteModel.js";
import { MiComponenteController } from "./controller/miComponenteController.js";
import { FieldsValidator } from "../components/Validator/fieldsValidator.js";

export class MiComponenteFactory {
  static createComponent() {
    const view = new MiComponenteView();
    const model = new MiComponenteModel();
    const validator = new FieldsValidator(); // <-- Instanciación aquí

    // Inyección de la dependencia hacia el controlador
    const controller = new MiComponenteController(view, model, validator);

    return { view, model, controller };
  }
}
```

## 5. Errores Comunes y Troubleshooting

Basado en fallas reales del proyecto durante la adopción:

1. **Violación del patrón MVC (Importar directo en el Controller):**
   - **Síntoma:** El sistema falla por acoplamiento y se rompe el principio de una única responsabilidad si se escribe `import { FieldsValidator } from ...` dentro del Controlador y se hace `this.validator = new FieldsValidator()`.
   - **Solución:** Mover la importación y el comando `new FieldsValidator()` explícitamente al archivo Factory, pasándolo como argumento final al constructor del controlador.

2. **Glitches en Tooltips (Los pops personalizados no aparecen al hacer Submit en correos):**
   - **Síntoma:** Tienes un input de correo con propiedades correctas de visualización de error. Al hacer submit con un valor erróneo (como "prueba"), el formato no muestra nuestro `.validation-tooltip`, sino que salta el aviso nativo del navegador ("Por favor, incluye un signo '@'..."), o bien, no pasa nada y el request nunca sale.
   - **Diagnóstico:** El evento `submit` en JavaScript es bloqueado en seco por el navegador cuando hay un `<input type="email">` con contenido inválido según las reglas internas del estándar HTML5. Al cancelarse el evento internamente, nuestro `addEventListener("submit")` nunca despierta.
   - **Solución:** Reemplazar de inmediato `<input type="email">` por `<input type="text">` en la plantilla HTML (_View_). De esta manera, el navegador ignorará la sintaxis estricta, permitiéndole a nuestra directiva en Javascript encender la evaluación manual delegada a `FieldsValidator` y desplegar exitosamente nuestras burbujas animadas.

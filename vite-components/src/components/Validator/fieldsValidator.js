/**
 * @class FieldsValidator
 * @description
 * Clase encargada de la validación de campos de entrada siguiendo reglas específicas de negocio.
 */
export class FieldsValidator {
  /**
   * @method validateField
   * @description
   * Método principal que redirige la validación según el tipo de campo proporcionado.
   *
   * @param {HTMLElement} element - Elemento HTML a evaular.
   * @returns {Object} - Objeto con {isValid: boolean, message: string, id: element.id || null}
   * @example
   * // returns {isValid: true, message: '', id: ''}
   * validator.validateField(element);
   */
  validateField(element) {
    const fieldName = element.name || element.id;
    if (fieldName === "username") {
      return this.validateUser(element);
    }
    if (fieldName === "password") {
      return this.validatePassword(element);
    }
    if (fieldName === "editNombre" || fieldName === "nombre") {
      return this.validateName(element);
    }
    if (fieldName === "editMail" || fieldName === "mail") {
      return this.validateEmail(element);
    }
    return { isValid: false, message: "Tipo de campo no válido" };
  }

  /**
   * @method validateUser
   * @description
   * Valida un nombre de usuario basado en reglas específicas:
   * - Al menos 4 caracteres.
   * - Sin caracteres especiales (excepto vocales con acentos en español y ñ/Ñ).
   * - Sin números.
   *
   * @param {HTMLElement} HTMLElement.value El nombre de usuario a validar.
   * @returns {Object} Objeto con {isValid: boolean, message: string}
   */
  validateUser(element) {
    if (!element.value || element.value.length < 4) {
      return { isValid: false, message: "Usuario inválido" };
    }

    // Al menos 4 caracteres, sin números, solo letras y acentos/ñ permitidos.
    // ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$ - Permitimos espacios si fuera necesario,
    // pero la regla dice "sin caracteres especiales" y lista los permitidos.
    // Usaremos una regex estricta:
    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4,}$/;
    const isValid = userRegex.test(element.value);

    return {
      isValid,
      message: isValid ? "" : "Usuario inválido",
      id: element.id,
    };
  }

  /**
   * @method validateName
   * @description
   * Valida un nombre completo basado en reglas específicas:
   * - Solo letras (incluyendo acentos y ñ/Ñ) y espacios.
   * - Sin números ni caracteres especiales como '.,-+' etc.
   * - Al menos 3 caracteres.
   *
   * @param {HTMLElement} element El elemento input a validar.
   * @returns {Object} Objeto con {isValid: boolean, message: string, id: string}
   */
  validateName(element) {
    if (!element.value || element.value.trim().length < 3) {
      return { isValid: false, message: "Nombre inválido", id: element.id };
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const isValid = nameRegex.test(element.value);

    return {
      isValid,
      message: isValid
        ? ""
        : "Nombre inválido. No se permiten números ni caracteres especiales.",
      id: element.id,
    };
  }

  /**
   * @method validateEmail
   * @description
   * Valida una dirección de correo electrónico.
   *
   * @param {HTMLElement} element El elemento input a validar.
   * @returns {Object} Objeto con {isValid: boolean, message: string, id: string}
   */
  validateEmail(element) {
    const value = element.value ? element.value.trim() : "";

    if (!value) {
      return { isValid: false, message: "Correo inválido", id: element.id };
    }

    // Regex robusta para validación de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailRegex.test(value);

    return {
      isValid,
      message: isValid ? "" : "Dirección de correo electrónico inválida",
      id: element.id,
    };
  }

  /**
   * @method validatePassword
   * @description
   * Valida una contraseña basada en reglas específicas:
   * - Al menos 6 caracteres.
   * - Al menos una mayúscula.
   * - Al menos un caracter especial de este set: @#!$_*& o al menos un número.
   * - Ningún otro caracter especial permitido.
   * - Sin acentos ni puntos.
   *
   * @param {HTMLElement} HTMLElement.value - La contraseña a validar.
   * @returns {Object} - Objeto con {isValid: boolean, message: string}
   */
  validatePassword(element) {
    if (!element.value || element.value.length < 6) {
      return { isValid: false, message: "Contraseña inválida" };
    }

    // Regla: Sin acentos ni puntos.
    // Regla: Solo letras (sin acentos), números o el set especial @#!$_*&
    const allowedCharsRegex = /^[a-zA-Z0-9@#!$_*&]+$/;
    if (!allowedCharsRegex.test(element.value)) {
      return { isValid: false, message: "Contraseña inválida" };
    }

    // Regla: Al menos una mayúscula.
    // const hasUppercase = /[A-Z]/.test(element.value);
    // if (!hasUppercase) {
    //   return { isValid: false, message: "Contraseña inválida" };
    // }

    // Regla: Al menos un caracter especial de @#!$_*& O al menos un número.
    const hasSpecialOrNumber = /[@#!$_*&0-9]/.test(element.value);
    if (!hasSpecialOrNumber) {
      return { isValid: false, message: "Contraseña inválida" };
    }

    return { isValid: true, message: "" };
  }
}

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
   * @param {string} value - El valor del campo a validar.
   * @param {string} type - El tipo de campo ('user' o 'password').
   * @returns {Object} - Objeto con {isValid: boolean, message: string}
   * @example
   * // returns {isValid: true, message: ''}
   * validator.validateField('UsuarioVálido', 'user');
   */
  validateField(value, type) {
    if (type === "user") {
      return this.validateUser(value);
    }
    if (type === "password") {
      return this.validatePassword(value);
    }
    return { isValid: false, message: 'Tipo de campo no válido' };
  }

  /**
   * @method validateUser
   * @description
   * Valida un nombre de usuario basado en reglas específicas:
   * - Al menos 4 caracteres.
   * - Sin caracteres especiales (excepto vocales con acentos en español y ñ/Ñ).
   * - Sin números.
   *
   * @param {string} value - El nombre de usuario a validar.
   * @returns {Object} - Objeto con {isValid: boolean, message: string}
   */
  validateUser(value) {
    if (!value || value.length < 4) {
      return { isValid: false, message: 'Usuario inválido' };
    }

    // Al menos 4 caracteres, sin números, solo letras y acentos/ñ permitidos.
    // ^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$ - Permitimos espacios si fuera necesario,
    // pero la regla dice "sin caracteres especiales" y lista los permitidos.
    // Usaremos una regex estricta:
    const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]{4,}$/;
    const isValid = userRegex.test(value);
    
    return {
      isValid,
      message: isValid ? '' : 'Usuario inválido'
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
   * @param {string} value - La contraseña a validar.
   * @returns {Object} - Objeto con {isValid: boolean, message: string}
   */
  validatePassword(value) {
    if (!value || value.length < 6) {
      return { isValid: false, message: 'Contraseña inválida' };
    }

    // Regla: Sin acentos ni puntos.
    // Regla: Solo letras (sin acentos), números o el set especial @#!$_*&
    const allowedCharsRegex = /^[a-zA-Z0-9@#!$_*&]+$/;
    if (!allowedCharsRegex.test(value)) {
      return { isValid: false, message: 'Contraseña inválida' };
    }

    // Regla: Al menos una mayúscula.
    const hasUppercase = /[A-Z]/.test(value);
    if (!hasUppercase) {
      return { isValid: false, message: 'Contraseña inválida' };
    }

    // Regla: Al menos un caracter especial de @#!$_*& O al menos un número.
    const hasSpecialOrNumber = /[@#!$_*&0-9]/.test(value);
    if (!hasSpecialOrNumber) {
      return { isValid: false, message: 'Contraseña inválida' };
    }

    return { isValid: true, message: '' };
  }
}
